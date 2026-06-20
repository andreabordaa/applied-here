import "./globals.css";

export const metadata = {
  title: "Applied Here",
  description: "Track your job applications",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
