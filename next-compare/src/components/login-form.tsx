"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FormData {
  login: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", formData);
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setFormData({ login: "", password: "" });
    }
  };
  return (
    <form onSubmit={formSubmit}>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            id="login"
            name="login"
            value={formData.login}
            onChange={inputHandler}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={inputHandler}
          />
        </div>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
