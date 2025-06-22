'use client';

import { useState } from 'react';
import { CircleUserRound } from 'lucide-react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Submenu from '../submenu/Submenu';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="navbar-bg text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="logo">
          <Link href="/">LensShop</Link>
        </div>

        {/* Desktop Menu */}
        <div className="flex items-center justify-between gap-5">
          <nav className="hidden navbar-text md:flex gap-5">
            <Link
              href="/"
              className="navItem font-semibold">
              Home
            </Link>
            <Link
              href="/products"
              className="navItem font-semibold">
              Products
            </Link>
            <Link
              href="/about"
              className="navItem font-semibold">
              About Us
            </Link>
            <Link
              href="/contact"
              className="navItem font-semibold">
              Contact
            </Link>
          </nav>

          <button className="pill hidden md:flex gap-1 items-center bg-white text-sky-950 hover:bg-sky-200 transition-colors !font-[500]">
            <CircleUserRound size={18} />
            <p>Login / SignUp</p>
          </button>

          <button className="hover:!text-sky-100 transition-colors navbar-text flex items-center justify-center hover:bg-sky-500 rounded-full p-[5px] h-[1.9rem] w-[1.9rem] ">
            <ShoppingCart size={22} />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden navbar-text focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden navbar-bg">
          <nav className="flex flex-col space-y-4 p-4 navbar-text">
            <Link
              href="/"
              className="navItem">
              Home
            </Link>
            <Link
              href="/products"
              className="navItem">
              Products
            </Link>
            <Link
              href="/about"
              className="navItem">
              About Us
            </Link>
            <Link
              href="/contact"
              className="navItem">
              Contact
            </Link>
          </nav>
        </div>
      )}

      <Submenu />
    </header>
  );
}
