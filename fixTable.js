const fs = require('fs');

const content = `"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpDown, TrendingUp } from "lucide-react";
import { getCompanySlug, getLevelColor } from "@/lib/utils";
import { clsx } from "clsx";

type Props = {
  data: any[];
};

type SortKey = "totalComp" | "base" | "bonus" | "stock" | "yearsOfExperience";

const COMPANY_COLORS: Record<string, string> = {
  Google: "bg-blue-100 text-blue-700",
  Meta: "bg-indigo-100 text-indigo-700",
  Microsoft: "bg-cyan-100 text-cyan-700",
  Amazon: "bg-orange-100 text-orange-700",
  Flipkart: "bg-yellow-100 text-yellow-700",
  Swiggy: "bg-red-100 text-red-700",
  Zomato: "bg-rose-100 text-rose-700",
  Uber: "bg-gray-100 text-gray-700",
  Adobe: "bg-red-100 text-red-800",
  Razorpay: "bg-blue-100 text-blue-800",
};

export default function SalaryTable({ data }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("totalComp");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  }

  const sorted = [...data].sort((a, b) => {
    return sortOrder === "asc" ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
  });

  const headers: { label: string; key: SortKey }[] = [
    { label: "Total Comp", key: "totalComp" },
    { label: "Base", key: "base" },
    { label: "Bonus", key: "bonus" },
    { label: "Stock", key: "stock" },
    { label: "Experience", key: "yearsOfExperience" },
  ];

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 py-20 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-gray-400 font-medium">No results found</p>
        <p className="text-gray-300 text-sm mt-1">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-gray-200">
            <th className="text-left px-5 py-4 font-semibold text-gray-600">#</th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Company</th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Role</th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Level</th>
            <th className="text-left px-5 py-4 font-semibold text-gray-600">Location</th>
            {headers.map((h) => (
              <th key={h.key} className="text-left px-5 py-4 font-semibold cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => handleSort(h.key)}>
                <div className="flex items-center gap-1.5">
                  {h.label}
                  <ArrowUpDown size={13} className={clsx("transition-colors", sortKey === h.key ? "text-indigo-600" : "text-gray-300")} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {sorted.map((s, index) => (
            <tr key={s._id} className="hover:bg-indigo-50/40 transition-colors group">
              <td className="px-5 py-4 text-gray-300 font-medium text-xs">{index + 1}</td>
              <td className="px-5 py-4">
                <Link href={"/company/" + getCompanySlug(s.company)} className="flex items-center gap-2">
                  <span className={clsx("px-2.5 py-1 rounded-lg text-xs font-bold", COMPANY_COLORS[s.company] || "bg-gray-100 text-gray-700")}>
                    {s.company}
                  </span>
                </Link>
              </td>
              <td className="px-5 py-4 text-gray-600">{s.role}</td>
              <td className="px-5 py-4">
                <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold", getLevelColor(s.level))}>{s.level}</span>
              </td>
              <td className="px-5 py-4 text-gray-400 text-xs">📍 {s.location}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={13} className="text-emerald-500" />
                  <span className="font-bold text-gray-900">₹{s.totalComp}L</span>
                </div>
              </td>
              <td className="px-5 py-4 text-gray-600 font-medium">₹{s.base}L</td>
              <td className="px-5 py-4 text-amber-600 font-medium">₹{s.bonus}L</td>
              <td className="px-5 py-4 text-indigo-600 font-medium">₹{s.stock}L</td>
              <td className="px-5 py-4 text-gray-400 text-xs">🏅 {s.yearsOfExperience} yrs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}`;

fs.writeFileSync('src/components/SalaryTable.tsx', content);
console.log('Fixed SalaryTable!');