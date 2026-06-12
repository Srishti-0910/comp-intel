"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { fetchCompany } from "@/lib/api";
import { getLevelColor } from "@/lib/utils";
import { clsx } from "clsx";

export default function CompanyPage() {
  const params = useParams();
  const name = params.name as string;
  const [salaries, setSalaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompany(name).then((data) => {
      setSalaries(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [name]);

  const avgTotal = salaries.length ? (salaries.reduce((a, b) => a + b.totalComp, 0) / salaries.length).toFixed(1) : 0;
  const avgBase = salaries.length ? (salaries.reduce((a, b) => a + b.base, 0) / salaries.length).toFixed(1) : 0;
  const avgBonus = salaries.length ? (salaries.reduce((a, b) => a + b.bonus, 0) / salaries.length).toFixed(1) : 0;
  const avgStock = salaries.length ? (salaries.reduce((a, b) => a + b.stock, 0) / salaries.length).toFixed(1) : 0;
  const maxTotal = salaries.length ? Math.max(...salaries.map(s => s.totalComp)) : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/salaries" className="text-sm text-indigo-500 hover:underline">← Back to Salaries</Link>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : (
          <>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-6">
              <h1 className="text-4xl font-black text-gray-900 mb-2 capitalize">{name}</h1>
              <p className="text-gray-400">{salaries.length} salary entries</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { label: "Avg Total", value: "₹" + avgTotal + "L", color: "text-indigo-600" },
                  { label: "Avg Base", value: "₹" + avgBase + "L", color: "text-blue-600" },
                  { label: "Avg Bonus", value: "₹" + avgBonus + "L", color: "text-amber-600" },
                  { label: "Avg Stock", value: "₹" + avgStock + "L", color: "text-emerald-600" },
                ].map((s) => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className={"text-2xl font-black " + s.color}>{s.value}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-indigo-50 border-b border-gray-200">
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Role</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Level</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Location</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Total</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Base</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Bonus</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Stock</th>
                    <th className="text-left px-5 py-4 font-semibold text-gray-600">Exp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {salaries.map((s) => (
                    <tr key={s._id} className="hover:bg-indigo-50/30 transition-colors">
                      <td className="px-5 py-4 text-gray-700">{s.role}</td>
                      <td className="px-5 py-4">
                        <span className={clsx("px-2 py-0.5 rounded-full text-xs font-semibold", getLevelColor(s.level))}>{s.level}</span>
                      </td>
                      <td className="px-5 py-4 text-gray-400 text-xs">📍 {s.location}</td>
                      <td className="px-5 py-4 font-bold text-gray-900">₹{s.totalComp}L</td>
                      <td className="px-5 py-4 text-gray-600">₹{s.base}L</td>
                      <td className="px-5 py-4 text-amber-600">₹{s.bonus}L</td>
                      <td className="px-5 py-4 text-indigo-600">₹{s.stock}L</td>
                      <td className="px-5 py-4 text-gray-400 text-xs">{s.yearsOfExperience} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </main>
  );
}