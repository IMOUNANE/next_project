import React, { useEffect, useState } from "react";

import { supabaseAdmin } from "../helpers/supabaseClient";

export default function App() {
  const [user, setUser] = useState(null);
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
          break;
        case "SIGNED_OUT":
          setUser(null);
          break;
        default:
      }
    });
  }, []);

  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      {user ? (
        <div>
          <h1> Auth</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </div>
  );
}
