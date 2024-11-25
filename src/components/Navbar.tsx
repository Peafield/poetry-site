"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BurgerIcon, CloseIcon } from "./icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 h-16 w-full">
      <div className="flex items-center justify-between p-4 pb-2 bg-primary bg-opacity-35 drop-shadow-md">
        <div>
          <Link href="/">
            <h1 className="font-playfair_display font-medium mobile:text-xl md:text-3xl hover:underline">
              Wendi&apos;s Worminghall Whimsies
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex space-x-16">
          <Link href="/about">
            <h2 className="font-playfair_display font-medium text-2xl hover:underline">
              About
            </h2>
          </Link>
          <Link href="/poems">
            <h2 className="font-playfair_display font-medium text-2xl  hover:underline">
              Poems
            </h2>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="focus:outline-none"
          >
            <div className="relative w-6 h-6">
              <div
                className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${
                  isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <BurgerIcon className="w-6 h-6" />
              </div>
              <div
                className={`absolute inset-0 transform transition-all duration-500 ease-in-out ${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                }`}
              >
                <CloseIcon className="w-6 h-6" />
              </div>
            </div>
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`
    md:hidden
    flex flex-col 
    float-end 
    bg-primary
    bg-opacity-95
    rounded-bl-xl 
    p-4
    transform
    origin-top
    transition-transform
    duration-500
    ease-in-out
    ${isOpen ? "scale-y-100" : "scale-y-0"}
  `}
      >
        <div className="space-y-4 sm:px-3">
          <div>
            <Link href="/about">
              <h2 className="font-playfair_display text-xl hover:underline">
                About
              </h2>
            </Link>
          </div>
          <div>
            <Link href="/poems">
              <h2 className="font-playfair_display text-xl hover:underline">
                Poems
              </h2>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
