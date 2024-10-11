// Footer.js
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
    return (
        <footer className="bg-white shadow border-t-2 border-t-gray-200 p-4">
            <div className="w-full mx-auto max-w-screen-xl p-2 flex flex-col items-center md:flex-row md:items-center md:justify-between">
                <ul className="flex flex-wrap items-center justify-center text-sm font-semibold text-gray-500">
                    <li>
                        <Link href="/about" className="hover:underline me-4 md:me-6">
                            Quiénes somos
                        </Link>
                    </li>
                    <li>
                        <Link href="/terms" className="hover:underline me-4 md:me-6">
                            Términos y condiciones
                        </Link>
                    </li>
                    <li>
                        <Link href="/companies/create">
                            <h1 className="hover:underline me-4 md:me-6">Registrar tu negocio</h1>
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:underline">
                            Contáctanos
                        </Link>
                    </li>
                </ul>
                <div className="border-t border-gray-300 dark:border-gray-700 w-full md:w-auto my-2 md:my-0" />
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-2 md:mb-0">
                    © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};