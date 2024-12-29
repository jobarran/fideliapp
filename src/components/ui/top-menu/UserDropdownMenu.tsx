'use client';

import { useState, useEffect, useRef } from "react";
import { FaAngleDown, FaHome } from "react-icons/fa";
import { logout as serverLogout } from "@/actions/auth/logout"; // Update import path
import Link from "next/link";
import { FaArrowRightArrowLeft, FaArrowRightToBracket, FaHeart, FaUser } from "react-icons/fa6";

interface Props {
  userName: string;
  userId: string
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

  useEffect(() => {
    if (dropdownOpen && dropdownRef.current) {
      const dropdownRect = dropdownRef.current.getBoundingClientRect();
      const isOutOfViewport = dropdownRect.bottom > window.innerHeight;

      if (isOutOfViewport) {
        dropdownRef.current.style.top = `-${dropdownRect.height}px`;
      } else {
        dropdownRef.current.style.top = "100%";
      }
    }
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await serverLogout();
    window.location.href = '/'; // Redirect to home page after logout
    setDropdownOpen(false)
  };

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
            <li>
              <Link
                onClick={toggleDropdown}
                href={`/`}
                className="flex px-4 pt-2 pb-1 text-xs text-gray-700 hover:bg-gray-100 items-center"
              >
                <FaHome className="text-xs mr-1" />
                Inicio
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleDropdown}
                href={`/user/${userId}?tab=favoritos`}
                className="flex px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 items-center"
              >
                <FaHeart className="text-xs mr-1" />
                Mis favoritos
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleDropdown}
                href={`/user/${userId}?tab=movimientos`}
                className="flex px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 items-center"
              >
                <FaArrowRightArrowLeft className="text-xs mr-1" />
                Mis movimientos
              </Link>
            </li>
            <li>
              <Link
                onClick={toggleDropdown}
                href={`/user/${userId}`}
                className="flex px-4 py-1 text-xs text-gray-700 hover:bg-gray-100 items-center"
              >
                <FaUser className="text-xs mr-1" />
                Perfil
              </Link>
            </li>
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
