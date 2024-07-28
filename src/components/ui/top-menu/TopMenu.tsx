'use client';


import Link from "next/link";
import { Avatar } from "./Avatar";
import { logout } from "@/actions";
import { User } from "@/interfaces";
import { useState } from "react";
import { useUiStore } from "@/store";
import { ChangeObraModal } from "./ChangeObraModal";
import { TopMenuIcon } from "./TopMenuIcon";
import { usePathname } from "next/navigation";
import { FaExchangeAlt } from "react-icons/fa";


interface Props {
  user: User,
}

export const TopMenu = ({ user }: Props) => {

  return (

    <nav className="bg-white border-b-2 border-b-gray-200">

      <div className="flex justify-between items-center px-4">

        {/* Left Side */}
        <div className="flex items-center">
          <a href="/">
            <h1 className="text-xl font-bold">FideliApp</h1>
          </a>

        </div>

        {/* Center - Icons */}
        <div className="flex justify-center items-center space-x-4">



        </div>

        {/* Right Side - User Name & Avatar */}
        <div className="flex items-center space-x-2">
          {/* User Name */}
          <span className="hidden lg:inline text-sm">{user.name} {user.lastName}</span>
          {/* User Avatar */}
          <Avatar
            initials={user.name[0]! + user.lastName[0]! || ''}
            id={user.id || ''}
            image={user.image || undefined}
            logout={logout}
          />
        </div>
      </div>
    </nav>

  )
}
