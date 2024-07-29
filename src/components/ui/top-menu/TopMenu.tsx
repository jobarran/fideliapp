'use client';


import { logout } from "@/actions";
import { User } from "@/interfaces";
import { useState } from "react";

import { FaSearch } from "react-icons/fa";
import { login } from '../../../actions/auth/login';
import { LoginModal } from "./LoginModal";


interface Props {
  user: User | null;
}

export const TopMenu = ({ user }: Props) => {

  const [loginModal, setLoginModal] = useState(false)

  return (

    <nav className="bg-white border-b-2 border-b-gray-200 h-12">

      <LoginModal
        loginModal={loginModal}
        setLoginModal={() => setLoginModal(!loginModal)}
      />

      <div className="flex justify-between items-center h-full px-4">

        {/* Left Side */}
        <div className="flex items-center">
          <a href="/">
            <h1 className="text-xl font-bold text-slate-800">FideliApp</h1>
          </a>
        </div>

        {/* Center - Icons */}
        <div className="flex justify-center items-center space-x-2">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg p-1 pl-3"
            placeholder="Buscar locales"
            required
          />
          <button
            type="submit"
            className="p-2 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-950">
            <FaSearch />
            <span className="sr-only">Search</span>
          </button>
        </div>

        {/* Right Side - User Name & Avatar */}
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              {/* User Name */}
              <span className="hidden lg:inline text-sm">Hola {user.name}</span>
              {/* Logout button or icon */}
              <button onClick={logout} className="text-sm text-blue-500 hover:underline">Logout</button>
            </>
          ) : (
            <button onClick={()=>setLoginModal(true)} className="text-xs text-slate-800">Iniciar sesión</button>
          )}
        </div>

      </div>
    </nav>

  )
}
