import "./globals.css";
import "@fontsource/inter/300";
import "@fontsource/inter/400";
import "@fontsource/inter/600";

export const metadata = {
  title: "Applied Here",
  description: "Track your job applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 min-h-screen">{children}</body>
    </html>
  );
}
