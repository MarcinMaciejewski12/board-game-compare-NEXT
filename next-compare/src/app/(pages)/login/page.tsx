import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
