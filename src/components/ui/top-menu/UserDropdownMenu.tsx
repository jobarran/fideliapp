"use client";

import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaArrowRightToBracket } from "react-icons/fa6";
import { logout as serverLogout } from "@/actions/auth/logout";
import Link from "next/link";
import { userDropdownNavItems } from "@/config/userDropdownNavItems";

interface Props {
  userName: string;
  userId: string;
}

export const UserDropdownMenu = ({ userName, userId }: Props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".dropdown-toggle")
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await serverLogout();
    window.location.href = "/"; // Redirect to home page after logout
    setDropdownOpen(false);
  };

  const navItems = userDropdownNavItems(userId);

  return (
    <div className="relative">
      <span
        onClick={toggleDropdown}
        className="text-xs text-slate-800 cursor-pointer flex items-center dropdown-toggle"
      >
        <FaAngleDown
          className={`mr-1 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""
            }`}
        />
        Hola <span className="font-bold ml-1">{userName}</span>!
      </span>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded z-10"
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  onClick={toggleDropdown}
                  href={item.href}
                  className="flex px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 items-center"
                >
                  <item.icon className="text-xs mr-1" />
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleLogout}
                className="flex w-full text-left px-4 pt-1 pb-2 text-xs text-gray-700 hover:bg-gray-100 items-center"
              >
                <FaArrowRightToBracket className="text-xs mr-1" />
                Cerrar sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
