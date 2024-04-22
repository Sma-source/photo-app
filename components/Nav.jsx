import React from "react";
import Link from "next/link";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 p-4 z-10">
      <ul className="flex space-x-4">
        <li>
          <Link href="/photos" className="text-gray-300 hover:text-gray-100">
            Photos
          </Link>
        </li>
        <li>
          <Link href="/favorites" className="text-gray-300 hover:text-gray-100">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
