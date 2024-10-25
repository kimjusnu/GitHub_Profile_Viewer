"use client";

import "./globals.css";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>GitHub Profile Viewer</title>
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};
export default layout;
