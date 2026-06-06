"use client";

import { useState } from "react";
import { salaries } from "@/data/salaries";
import Navbar from "@/components/Navbar";
import Filters from "@/components/Filters";
import SalaryTable from "@/components/SalaryTable";
import SalaryChart from "@/components/SalaryChart";
import { TrendingUp, Users, Building2, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [level, setLevel] = useState("");

  const filtered = salaries.filter((s) => {
    const matchSearch =
      s.company.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase());
    const matchCompany = company ? s.company === company : true;
    const matchRole = role ? s.role === role : true;
    const matchLocation = location ? s.location === location : true;
    const matchLevel = level ? s.level === level : true;
    return matchSearch && matchCompany && matchRole && matchLocation && matchLevel;
  });

  const avgTotal = Math.round(salaries.reduce((a, b) => a + b.total, 0) / salaries.length);
  const maxTotal = Math.max(...salaries.map(s => s.total));
  const topCompany = salaries.find(s => s.total === maxTotal)?.company;

  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #faf5ff 50%, #f0fffe 100%)" }}>
      <Navbar />

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 40%, #0891b2 100%)" }}>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "300px", height: "300px", background: "rgba(255,255,255,0.07)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "-100px", left: "-60px", width: "350px", height: "350px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "40px", left: "30%", width: "150px", height: "150px", background: "rgba(255,255,255,0.04)", borderRadius: "50%" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center text-white">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold mb-6" style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
            🇮🇳 India's #1 Compensation Intelligence Platform
          </div>
          <h1 className="font-black tracking-tight mb-5 leading-tight" style={{ fontSize: "clamp(36px, 6vw, 72px)" }}>
            Know Your Worth.
            <br />
            <span style={{ color: "#fde68a" }}>Compare Smarter. 🚀</span>
          </h1>
          <p className="mb-10 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: "18px", opacity: 0.85 }}>
            Real salary data from top tech companies in India.
            Filter by role, level, and location to make smarter career decisions.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Link href="/compare" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-indigo-700 transition-all hover:scale-105" style={{ background: "white", fontSize: "14px" }}>
              ⚖️ Compare Companies <ArrowRight size={14} />
            </Link>
            <Link href="/research" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.2)", border: "2px solid rgba(255,255,255,0.3)", fontSize: "14px" }}>
              🔬 View Research
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: "Salary Entries", value: salaries.length, icon: "📋", color: "#818cf8" },
              { label: "Top Companies", value: new Set(salaries.map(s => s.company)).size, icon: "🏢", color: "#34d399" },
              { label: "Roles Tracked", value: new Set(salaries.map(s => s.role)).size, icon: "👨‍💻", color: "#f472b6" },
              { label: "Cities Covered", value: new Set(salaries.map(s => s.location)).size, icon: "📍", color: "#fbbf24" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl p-5 text-center transition-all hover:scale-105" style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-4xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs mt-1 font-medium opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HIGHLIGHTS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Avg Total Comp", value: `₹${(avgTotal/100000).toFixed(1)}L`, icon: "💰", gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", sub: "Across all companies" },
            { label: "Highest Package", value: `₹${(maxTotal/100000).toFixed(1)}L`, icon: "🏆", gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", sub: `At ${topCompany}` },
            { label: "Cities Available", value: `${new Set(salaries.map(s => s.location)).size} Cities`, icon: "🌍", gradient: "linear-gradient(135deg, #10b981, #0891b2)", sub: "Pan India coverage" },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1" style={{ background: card.gradient }}>
              <div className="text-4xl mb-3">{card.icon}</div>
              <div className="text-3xl font-black mb-1">{card.value}</div>
              <div className="text-sm font-semibold opacity-90">{card.label}</div>
              <div className="text-xs opacity-70 mt-1">{card.sub}</div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <Filters
            search={search} setSearch={setSearch}
            company={company} setCompany={setCompany}
            role={role} setRole={setRole}
            location={location} setLocation={setLocation}
            level={level} setLevel={setLevel}
          />
        </div>

        <div className="mb-6">
          <SalaryChart data={filtered} />
        </div>

        <div className="flex items-center justify-between mb-4 bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-pulse" />
            <p className="text-sm text-gray-500">
              Showing <span className="font-black text-indigo-600 text-base">{filtered.length}</span> of <span className="font-bold text-gray-800">{salaries.length}</span> entries
            </p>
          </div>
          {filtered.length !== salaries.length && (
            <button
              onClick={() => { setSearch(""); setCompany(""); setRole(""); setLocation(""); setLevel(""); }}
              className="text-xs font-bold text-white px-4 py-1.5 rounded-full transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
            >
              ✕ Clear filters
            </button>
          )}
        </div>

        <SalaryTable data={filtered} />

        <div className="mt-8 rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #eef2ff, #f5f3ff)" }}>
          <p className="text-sm text-indigo-600 font-medium">
            💡 Click on any <span className="font-bold">company name</span> to view detailed stats · Use <span className="font-bold">Compare</span> to compare up to 3 companies side by side
          </p>
        </div>
      </div>
    </main>
  );
}