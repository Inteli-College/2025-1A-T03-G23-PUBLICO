"use client";

import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Box, ShoppingBag, School, Bell, ShoppingCart } from 'lucide-react';

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/my-experiences", icon: Box, label: "Minhas Experiências" },
    { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
    { href: "/my-school", icon: School, label: "Minha Escola" },
];

const Sidebar = () => {
    const [pathname, setPathname] = useState('');
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPathname(window.location.pathname);
        }
    }, []);

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden lg:flex">
            <div className="h-16 border-b flex items-center px-6">
                <h1 className="text-xl font-bold text-gray-800">Immersify</h1>
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

const Header = () => {
    const [pathname, setPathname] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPathname(window.location.pathname);
        }
    }, []);

    const showCart = pathname.includes('/marketplace');

    return (
        <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 flex items-center justify-end px-6">
            <div className="flex items-center gap-4">
                {showCart && (
                     <button className="relative text-gray-500 hover:text-gray-700">
                        <ShoppingCart size={22} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                    </button>
                )}
                <button className="relative text-gray-500 hover:text-gray-700">
                    <Bell size={22} />
                </button>
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40?u=AnaSilva"
                        alt="Avatar do utilizador"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div>
                        <p className="font-semibold text-sm text-gray-800">Ana Silva</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

