"use client";

import "./globals.css";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>GitHub Profile Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};
export default layout;
