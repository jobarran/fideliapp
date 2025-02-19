"use client";

import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaArrowRightToBracket } from "react-icons/fa6";
import { logout as serverLogout } from "@/actions/auth/logout";
import Link from "next/link";
import { userDropdownNavItems } from "@/config/userDropdownNavItems";

interface Props {
  userName: string;
  userLastName: string;
  userId: string;
}

export const UserDropdownMenu = ({ userName, userLastName, userId }: Props) => {
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

  // Generate user initials
  const getInitials = (name: string, lastName: string) => {
    return `${name.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="relative flex items-center cursor-pointer dropdown-toggle"
      >
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-white font-bold relative">
          {getInitials(userName, userLastName)}
          <FaAngleDown
            className={`absolute -bottom-1 -right-1 text-sm bg-slate-200 text-slate-800 border-2 border-white rounded-full p-0.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {dropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-36 py-1 bg-white border border-gray-200 rounded z-10 shadow-md"
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
