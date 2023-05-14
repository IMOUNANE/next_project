import React, { useEffect, useState } from "react";

import "../styles/globals.css";

import { supabaseAdmin } from "../helpers/supabaseClient";
import Gallery from "./gallery";
import { getImages } from "../api/getImages";

export default function App() {
  const [user, setUser] = useState(null);
  const [gallery, setGallery] = useState([]);
  const login = async () => {
    await supabaseAdmin.auth.signInWithOAuth({
      provider: "github",
    });
  };
  const logout = async () => {
    await supabaseAdmin.auth.signOut();
  };

  useEffect(() => {
    const session = supabaseAdmin.auth.getSession();
    session.then(({ data }: { data: any }) => {
      const user = data.session?.user;
      setUser(user);
    });

    supabaseAdmin.auth.onAuthStateChange((event, session: any) => {
      switch (event) {
        case "SIGNED_IN":
          setUser(session.user);
          getImages().then(({ images }: any) => {
            setGallery(images);
          });

          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }
    });
  }, []);

  return (
    <div>
      {user ? (
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1> Auth</h1>
          <button className="bg-[#FDDA22] p-3 rounded-r-lg" onClick={logout}>
            Logout
          </button>
          <Gallery gallery={gallery} />
        </div>
      ) : (
        <button className="bg-[#FDDA22] p-3 rounded-r-lg" onClick={login}>
          Login
        </button>
      )}
    </div>
  );
}
