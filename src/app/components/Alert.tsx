"use client";
import { LuAlertTriangle } from "react-icons/lu";
import { useState } from "react";
import { useEffect } from "react";

interface AlertProps {
  message: string;
  type?: "error" | "success";
  timeout?: number;
}

const Alert = ({ message, type = "error", timeout = 3000 }: AlertProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setVisible(false);
    }, timeout);

    return () => clearTimeout(time);
  }, [timeout]);

  if (visible === false) return null;

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2
    flex flex-col items-center px-14 py-2 rounded-lg shadow-lg transition-opacity ${
      type === "error" ? "bg-[#332957]" : "bg-green-500"
    } text-[#F5EFFB]`}
    >
      <LuAlertTriangle className="text-5xl mb-3 text-[#D10000]" />
      {message}
    </div>
  );
};
export default Alert;
