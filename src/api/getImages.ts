import { supabaseAdmin } from "../helpers/supabaseClient";

export async function getImages() {
  const { data } = await supabaseAdmin.from("images").select("*").order("id");
  return {
    images: data,
  };
}
