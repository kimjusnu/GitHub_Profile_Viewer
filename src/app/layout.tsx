"use client";

import "./globals.css";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head>
        <title>GitHub Profile Viewer</title>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GitHub Profile Viewer",
            url: "https://github-profile-viewer-mu.vercel.app/",
            author: {
              "@type": "Person",
              name: "김준수",
              affiliation: "한국공학대학교 컴퓨터공학부",
            },
            description:
              "GitHub 유저의 프로필과 활동을 시각적으로 쉽게 확인할 수 있는 웹 애플리케이션입니다.",
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://github-profile-viewer-mu.vercel.app/search?user={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          })}
        </script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
