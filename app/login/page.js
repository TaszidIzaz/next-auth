"use client";

import { useRouter, useSearchParams } from "next/navigation";
import nodemailer from "nodemailer";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const email = formData.get("email");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password, email }),
    });
    const { success } = await res.json();

    if (success) {
      const nextUrl = searchParams.get("next");
      router.push(nextUrl ?? "/");
      router.refresh();

      // Send verification email
      const transporter = nodemailer.createTransport({
        service: "smtp",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAILER_EMAIL,
          password: process.env.MAILER_PASSWORD,
        },
      });

      const mailOptions = {
        from: "your_email_address",
        to: email,
        subject: "Verify Your Account",
        body: `
          Hi,

          Please verify your account

          Thanks,
          The Team
        `,
      };

      transporter.sendMail(mailOptions);
      
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <label className="block mb-4">
          <span className="text-gray-700">Username:</span>
          <input 
            type="text" 
            name="username" 
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Password:</span>
          <input 
            type="password" 
            name="password" 
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Email:</span>
          <input 
            type="email" 
            name="email" 
            className="mt-1 p-2 w-full border rounded-md"
          />
        </label>
        <button 
          type="submit" 
          className="w-full p-2 bg-purple-500 text-white rounded hover:bg-purple-400"
        >
          Login
        </button>
      </form>
    </div>
  );
}