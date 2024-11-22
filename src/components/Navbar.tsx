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
    <nav className="bg-scrim-dark absolute z-10 w-dvw h-16">
      <div className="flex items-center justify-between p-4">
        <div>
          <Link href="/">
            <h1 className="font-playfair_display mobile:text-xl md:text-3xl text-primary hover:text-secondary">
              Wendi&apos;s Worminghall Whimsies
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/about">
            <h2 className="font-playfair_display text-2xl text-primary hover:text-secondary">
              About
            </h2>
          </Link>
          <Link href="/poems">
            <h2 className="font-playfair_display text-2xl text-primary hover:text-secondary">
              Poems
            </h2>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="text-primary focus:outline-none hover:text-secondary"
          >
            {isOpen ? (
              <CloseIcon className="w-6 h-6" />
            ) : (
              <BurgerIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`
    md:hidden
    flex flex-col 
    float-end 
    bg-scrim-dark 
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
              <h2 className="font-playfair_display text-xl text-primary hover:text-secondary">
                About
              </h2>
            </Link>
          </div>
          <div>
            <Link href="/poems">
              <h2 className="font-playfair_display text-xl text-primary hover:text-secondary">
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
