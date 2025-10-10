"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Box, ShoppingBag, School } from 'lucide-react';

const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/my-experiences", icon: Box, label: "Minhas Experiências" },
    { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
    { href: "/my-school", icon: School, label: "Minha Escola" },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
            <div className="h-16 border-b flex items-center px-6">
                <h1 className="text-xl font-bold text-gray-800">Immersify</h1>
            </div>
            <nav className="flex-1 px-4 py-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-indigo-100 text-indigo-700'
                                            : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};
