"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { TrendingUp, BarChart2, GitCompare, BookOpen } from "lucide-react";

const links = [
  { href: "/", label: "Salaries", icon: BarChart2 },
  { href: "/compare", label: "Compare", icon: GitCompare },
  { href: "/research", label: "Research", icon: BookOpen },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-indigo-600 to-blue-500 p-2 rounded-lg shadow-sm group-hover:shadow-md transition-all">
              <TrendingUp className="text-white" size={18} />
            </div>
            <div>
              <span className="font-extrabold text-lg text-gray-900">CompIntel</span>
              <span className="hidden sm:block text-xs text-gray-400 leading-none">
                Compensation Intelligence
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <Icon size={15} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}