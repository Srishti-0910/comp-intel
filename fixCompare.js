const fs = require('fs');

const content = `"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { compareCompanies, fetchCompanies } from "@/lib/api";
import { formatCurrency, getLevelColor } from "@/lib/utils";
import { clsx } from "clsx";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  Legend, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];
const BG_COLORS = ["bg-indigo-50", "bg-amber-50", "bg-emerald-50"];
const BORDER_COLORS = ["border-indigo-200", "border-amber-200", "border-emerald-200"];
const TEXT_COLORS = ["text-indigo-600", "text-amber-600", "text-emerald-600"];
const BADGE_COLORS = ["bg-indigo-600", "bg-amber-500", "bg-emerald-500"];

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [stats, setStats] = useState<any[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);

  useEffect(() => {
    fetchCompanies().then((data: any[]) => {
      setCompanies(data.map((c: any) => c._id));
    });
  }, []);

  useEffect(() => {
    if (selected.length === 0) { setStats([]); return; }
    compareCompanies(selected).then((data: any[]) => setStats(data));
  }, [selected]);

  function toggleCompany(company: string) {
    if (selected.includes(company)) {
      setSelected(selected.filter((c) => c !== company));
    } else if (selected.length < 3) {
      setSelected([...selected, company]);
    }
  }

  const radarData = [
    { metric: "Total Comp", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgTotal)])) },
    { metric: "Base", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgBase)])) },
    { metric: "Bonus", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgBonus)])) },
    { metric: "Stock", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgStock)])) },
  ];

  const barData = [
    { name: "Total Comp", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgTotal)])) },
    { name: "Base", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgBase)])) },
    { name: "Bonus", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgBonus)])) },
    { name: "Stock", ...Object.fromEntries(stats.map((s) => [s._id, Math.round(s.avgStock)])) },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Compare Companies</h1>
          <p className="text-gray-500 mt-2 text-lg">Select up to <span className="font-semibold text-blue-600">3 companies</span> to compare side by side</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <p className="text-sm font-medium text-gray-500 mb-3">{selected.length}/3 selected</p>
          <div className="flex flex-wrap gap-2">
            {companies.map((company) => {
              const idx = selected.indexOf(company);
              const isSelected = idx !== -1;
              return (
                <button key={company} onClick={() => toggleCompany(company)}
                  className={clsx("px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200",
                    isSelected ? clsx(BADGE_COLORS[idx], "text-white border-transparent shadow-md scale-105")
                    : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600")}>
                  {isSelected && <span className="mr-1">✓</span>}{company}
                </button>
              );
            })}
          </div>
        </div>

        {selected.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">⚖️</div>
            <p className="text-xl font-semibold text-gray-400">No companies selected</p>
            <p className="text-gray-400 mt-1">Pick companies above to start comparing</p>
          </div>
        )}

        {stats.length > 0 && (
          <>
            <div className={clsx("grid gap-6 mb-8",
              stats.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
              stats.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3")}>
              {stats.map((s, i) => (
                <div key={s._id} className={clsx("rounded-2xl border-2 p-6 shadow-sm", BG_COLORS[i], BORDER_COLORS[i])}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className={clsx("text-2xl font-extrabold", TEXT_COLORS[i])}>{s._id}</h2>
                      <p className="text-xs text-gray-400 mt-0.5">{s.count} data entries</p>
                    </div>
                    <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg", BADGE_COLORS[i])}>{i + 1}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 mb-4 text-center shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Avg Total Comp</p>
                    <p className={clsx("text-3xl font-extrabold", TEXT_COLORS[i])}>₹{s.avgTotal.toFixed(1)}L</p>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: "Base Salary", value: "₹" + s.avgBase.toFixed(1) + "L", icon: "💼" },
                      { label: "Bonus", value: "₹" + s.avgBonus.toFixed(1) + "L", icon: "🎯" },
                      { label: "Stock (ESOPs)", value: "₹" + s.avgStock.toFixed(1) + "L", icon: "📈" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center bg-white rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-500">{row.icon} {row.label}</span>
                        <span className="text-sm font-bold text-gray-800">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {stats.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-base font-bold text-gray-800 mb-4">📊 Compensation Breakdown (in Lakhs)</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip formatter={(value: any) => ["₹" + value + "L", ""]} contentStyle={{ borderRadius: "8px", fontSize: "12px" }} />
                      {stats.map((s, i) => (<Bar key={s._id} dataKey={s._id} fill={COLORS[i]} radius={[4, 4, 0, 0]} />))}
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-base font-bold text-gray-800 mb-4">🕸️ Compensation Radar</h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      {stats.map((s, i) => (<Radar key={s._id} name={s._id} dataKey={s._id} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.2} />))}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {stats.length > 1 && (
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 text-white text-center shadow-lg">
                <p className="text-sm uppercase tracking-widest mb-1 opacity-80">🏆 Highest Average Total Comp</p>
                <p className="text-3xl font-extrabold">{stats.reduce((a, b) => a.avgTotal > b.avgTotal ? a : b)._id}</p>
                <p className="text-lg mt-1 opacity-90">₹{Math.max(...stats.map(s => s.avgTotal)).toFixed(1)}L avg total compensation</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}`;

fs.writeFileSync('src/app/compare/page.tsx', content);
console.log('Fixed compare page!');