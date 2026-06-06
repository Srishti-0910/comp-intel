"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { salaries } from "@/data/salaries";
import { formatCurrency, getLevelColor } from "@/lib/utils";
import { clsx } from "clsx";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const companies = [...new Set(salaries.map((s) => s.company))];

function getStats(company: string) {
  const data = salaries.filter((s) => s.company === company);
  if (data.length === 0) return null;
  return {
    company,
    entries: data.length,
    avgTotal: Math.round(data.reduce((a, b) => a + b.total, 0) / data.length),
    avgBase: Math.round(data.reduce((a, b) => a + b.base, 0) / data.length),
    avgBonus: Math.round(data.reduce((a, b) => a + b.bonus, 0) / data.length),
    avgStock: Math.round(data.reduce((a, b) => a + b.stock, 0) / data.length),
    avgExp: Math.round(data.reduce((a, b) => a + b.experience, 0) / data.length),
    roles: [...new Set(data.map((s) => s.role))],
    levels: [...new Set(data.map((s) => s.level))],
  };
}

const COLORS = ["#6366f1", "#f59e0b", "#10b981"];
const BG_COLORS = ["bg-indigo-50", "bg-amber-50", "bg-emerald-50"];
const BORDER_COLORS = ["border-indigo-200", "border-amber-200", "border-emerald-200"];
const TEXT_COLORS = ["text-indigo-600", "text-amber-600", "text-emerald-600"];
const BADGE_COLORS = ["bg-indigo-600", "bg-amber-500", "bg-emerald-500"];

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>([]);

  function toggleCompany(company: string) {
    if (selected.includes(company)) {
      setSelected(selected.filter((c) => c !== company));
    } else if (selected.length < 3) {
      setSelected([...selected, company]);
    }
  }

  const stats = selected.map(getStats).filter(Boolean);

  const radarData = [
    { metric: "Total Comp", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgTotal / 100000)])) },
    { metric: "Base", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgBase / 100000)])) },
    { metric: "Bonus", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgBonus / 100000)])) },
    { metric: "Stock", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgStock / 100000)])) },
    { metric: "Exp", ...Object.fromEntries(stats.map((s) => [s!.company, s!.avgExp * 5])) },
  ];

  const barData = [
    { name: "Total Comp", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgTotal / 100000)])) },
    { name: "Base", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgBase / 100000)])) },
    { name: "Bonus", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgBonus / 100000)])) },
    { name: "Stock", ...Object.fromEntries(stats.map((s) => [s!.company, Math.round(s!.avgStock / 100000)])) },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Compare Companies
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Select up to <span className="font-semibold text-blue-600">3 companies</span> to compare side by side
          </p>
        </div>

        {/* Company Selector */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
          <p className="text-sm font-medium text-gray-500 mb-3">
            {selected.length}/3 selected
          </p>
          <div className="flex flex-wrap gap-2">
            {companies.map((company) => {
              const idx = selected.indexOf(company);
              const isSelected = idx !== -1;
              return (
                <button
                  key={company}
                  onClick={() => toggleCompany(company)}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-200",
                    isSelected
                      ? `${BADGE_COLORS[idx]} text-white border-transparent shadow-md scale-105`
                      : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                  )}
                >
                  {isSelected && <span className="mr-1">✓</span>}
                  {company}
                </button>
              );
            })}
          </div>
        </div>

        {/* Empty State */}
        {selected.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">⚖️</div>
            <p className="text-xl font-semibold text-gray-400">No companies selected</p>
            <p className="text-gray-400 mt-1">Pick companies above to start comparing</p>
          </div>
        )}

        {stats.length > 0 && (
          <>
            {/* Comparison Cards */}
            <div className={clsx(
              "grid gap-6 mb-8",
              stats.length === 1 ? "grid-cols-1 max-w-sm mx-auto" :
              stats.length === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"
            )}>
              {stats.map((s, i) => (
                <div key={s!.company} className={clsx(
                  "rounded-2xl border-2 p-6 shadow-sm",
                  BG_COLORS[i], BORDER_COLORS[i]
                )}>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className={clsx("text-2xl font-extrabold", TEXT_COLORS[i])}>
                        {s!.company}
                      </h2>
                      <p className="text-xs text-gray-400 mt-0.5">{s!.entries} data entries</p>
                    </div>
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg",
                      BADGE_COLORS[i]
                    )}>
                      {i + 1}
                    </div>
                  </div>

                  {/* Total Comp Highlight */}
                  <div className="bg-white rounded-xl p-4 mb-4 text-center shadow-sm">
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Avg Total Comp</p>
                    <p className={clsx("text-3xl font-extrabold", TEXT_COLORS[i])}>
                      {formatCurrency(s!.avgTotal)}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="space-y-2">
                    {[
                      { label: "Base Salary", value: formatCurrency(s!.avgBase), icon: "💼" },
                      { label: "Bonus", value: formatCurrency(s!.avgBonus), icon: "🎯" },
                      { label: "Stock (ESOPs)", value: formatCurrency(s!.avgStock), icon: "📈" },
                      { label: "Avg Experience", value: `${s!.avgExp} years`, icon: "🏅" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center bg-white rounded-lg px-3 py-2">
                        <span className="text-sm text-gray-500">{row.icon} {row.label}</span>
                        <span className="text-sm font-bold text-gray-800">{row.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Levels */}
                  <div className="mt-4">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Levels</p>
                    <div className="flex flex-wrap gap-1">
                      {s!.levels.map((l) => (
                        <span key={l} className={clsx(
                          "px-2 py-0.5 rounded-full text-xs font-semibold",
                          getLevelColor(l)
                        )}>
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="mt-3">
                    <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Roles</p>
                    <div className="flex flex-wrap gap-1">
                      {s!.roles.map((r) => (
                        <span key={r} className="px-2 py-0.5 bg-white rounded-full text-xs text-gray-600 border border-gray-200">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Side by Side */}
            {stats.length > 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">

                {/* Bar Chart */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-base font-bold text-gray-800 mb-4">
                    📊 Compensation Breakdown (in Lakhs)
                  </h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={barData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip
                        formatter={(v: any) => [`₹${v}L`, ""]}
                        contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
                      />
                      {stats.map((s, i) => (
                        <Bar key={s!.company} dataKey={s!.company} fill={COLORS[i]} radius={[4, 4, 0, 0]} />
                      ))}
                      <Legend />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Radar Chart */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <h2 className="text-base font-bold text-gray-800 mb-4">
                    🕸️ Compensation Radar
                  </h2>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                      {stats.map((s, i) => (
                        <Radar
                          key={s!.company}
                          name={s!.company}
                          dataKey={s!.company}
                          stroke={COLORS[i]}
                          fill={COLORS[i]}
                          fillOpacity={0.2}
                        />
                      ))}
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

              </div>
            )}

            {/* Winner Banner */}
            {stats.length > 1 && (
              <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 text-white text-center shadow-lg">
                <p className="text-sm uppercase tracking-widest mb-1 opacity-80">🏆 Highest Average Total Comp</p>
                <p className="text-3xl font-extrabold">
                  {stats.reduce((a, b) => a!.avgTotal > b!.avgTotal ? a : b)!.company}
                </p>
                <p className="text-lg mt-1 opacity-90">
                  {formatCurrency(Math.max(...stats.map(s => s!.avgTotal)))} avg total compensation
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}