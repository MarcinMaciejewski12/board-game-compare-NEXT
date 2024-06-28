"use client";
import { SignIn, useAuth } from "@clerk/nextjs";
import supabase from "@/lib/supabaseClient";

export default function Login() {
  // const { getToken } = useAuth();
  //
  // const fetchData = async () => {
  //   // TODO #1: Replace with your JWT template name
  //   const token = await getToken({ template: "boardgame-compare" });
  //
  //   // @ts-ignore
  //   supabase.auth.setAuth(token);
  //
  //   // TODO #2: Replace with your database table name
  //   const { data, error } = await supabase.from("your_table").select();
  //
  //   // TODO #3: Handle the response
  // };
  //
  // return (
  //   <button
  //     type="button"
  //     className="z-50 cursor-pointer absolute"
  //     onClick={fetchData}
  //   >
  //     Fetch data
  //   </button>
  // );

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
