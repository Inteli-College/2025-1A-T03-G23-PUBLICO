"use client";

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Bell, ShoppingCart } from 'lucide-react';

export const Header = () => {
    const pathname = usePathname();
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
                    <Image
                        src="https://i.pravatar.cc/40?u=AnaSilva"
                        alt=""
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
