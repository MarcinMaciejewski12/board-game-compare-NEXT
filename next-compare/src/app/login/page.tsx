"use client";
import { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  login: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    login: "",
    password: "",
  });
  const [val, setVal] = useState("");
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <input
        type="text"
        onChange={(e) => setVal(e.target.value)}
        value={val}
        className="absolute"
      />
    </div>
  );
}
