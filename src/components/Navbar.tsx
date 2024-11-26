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
    <nav className="fixed inset-x-0 top-0 z-10 w-full">
      <div className="flex items-center justify-between bg-primary/95 p-4 pb-2 drop-shadow-md">
        <div>
          <Link href="/">
            <h1 className="font-playfair_display font-medium hover:underline mobile:text-xl md:text-3xl">
              Wendi&apos;s Worminghall Whimsies
            </h1>
          </Link>
        </div>
        <div className="hidden space-x-16 md:flex">
          <Link href="/about">
            <h2 className="font-playfair_display text-2xl font-medium hover:underline">
              About
            </h2>
          </Link>
          <Link href="/poems">
            <h2 className="font-playfair_display text-2xl font-medium  hover:underline">
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
            <div className="relative size-6">
              <div
                className={`absolute inset-0 transition-all duration-500 ease-in-out${
                  isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                }`}
              >
                <BurgerIcon className="size-6" />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-500 ease-in-out${
                  isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                }`}
              >
                <CloseIcon className="size-6" />
              </div>
            </div>
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`
    float-end
    flex origin-top 
    flex-col 
    rounded-bl-xl
    bg-primary/95
    p-4
    transition-transform
    duration-500
    ease-in-out
    md:hidden
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
