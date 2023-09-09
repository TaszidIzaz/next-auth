import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export async function Header() {
  const auth = await useAuth.fromServer();

  return (
    <header className="bg-purple-500 text-white py-4">
      <div className="container mx-auto flex justify-center items-center">
        
        <Link href="/">
          <span className="cursor-pointer mx-2 hover:underline">Home</span>
        </Link>
        
        <nav className="ml-4">
          {auth ? (
            <Link href="/panel">
              <span className="cursor-pointer mx-2 hover:underline">Panel Logged In</span>
            </Link>
          ) : (
            <Link href="/login">
              <span className="cursor-pointer mx-2 hover:underline">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
