import NavBar from "./NavBar";

export default function PublicLayout({ children }) {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <NavBar />
      {children}
    </div>
  );
}
