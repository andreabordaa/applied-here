import NavBar from "./NavBar";

export default function PublicLayout({ children }) {
  return (
    <div className="bg-bg-page min-h-screen text-text-primary">
      <NavBar />
      {children}
    </div>
  );
}
