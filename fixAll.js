const fs = require('fs');

// Fix SalaryChart - change s.total to s.totalComp
const chart = `"use client";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Cell,
} from "recharts";

type Props = {
  data: any[];
};

const COLORS = [
  "#6366f1", "#3b82f6", "#10b981", "#f59e0b",
  "#ef4444", "#8b5cf6", "#ec4899", "#14b8a6",
  "#f97316", "#06b6d4",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3">
        <p className="font-bold text-gray-800 mb-1">{label}</p>
        <p className="text-sm text-indigo-600 font-semibold">Avg: \u20b9{payload[0].value}L</p>
      </div>
    );
  }
  return null;
};

export default function SalaryChart({ data }: Props) {
  const grouped: Record<string, number[]> = {};
  data.forEach((s) => {
    if (!grouped[s.company]) grouped[s.company] = [];
    grouped[s.company].push(s.totalComp);
  });

  const chartData = Object.entries(grouped).map(([company, totals]) => ({
    company,
    avg: Math.round(totals.reduce((a, b) => a + b, 0) / totals.length),
  })).sort((a, b) => b.avg - a.avg);

  if (chartData.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-gray-900">Average Total Compensation</h2>
          <p className="text-xs text-gray-400 mt-0.5">Sorted by highest avg comp</p>
        </div>
        <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">
          {chartData.length} companies
        </span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="company" tick={{ fontSize: 12, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => "\u20b9" + v + "L"} tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="avg" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {chartData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}`;

// Fix Filters - remove static data imports, use hardcoded lists
const filters = `"use client";

import { Search, Building2, Briefcase, MapPin, Layers } from "lucide-react";

const companies = ["Google", "Microsoft", "Amazon", "Meta", "Flipkart", "Swiggy", "Zomato", "Uber", "Adobe", "Razorpay"];
const roles = ["Software Engineer", "Backend Engineer", "Frontend Engineer"];
const locations = ["Bangalore", "Hyderabad", "Chennai", "Gurgaon", "Noida"];
const levels = ["L4", "L5", "SDE2", "SDE3", "E4", "E5", "SWE2", "SWE3", "MTS2", "MTS3"];

type FiltersProps = {
  search: string;
  setSearch: (v: string) => void;
  company: string;
  setCompany: (v: string) => void;
  role: string;
  setRole: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
};

export default function Filters({ search, setSearch, company, setCompany, role, setRole, location, setLocation, level, setLevel }: FiltersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-5">
      <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-4">
        \uD83D\uDD0D Filter Salaries
      </p>
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
          <input type="text" placeholder="Search company or role..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-indigo-100 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 bg-indigo-50/30 transition-all" />
        </div>
        <div className="relative min-w-[160px]">
          <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
          <select value={company} onChange={(e) => setCompany(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-indigo-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-indigo-50/30 appearance-none cursor-pointer transition-all">
            <option value="">All Companies</option>
            {companies.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="relative min-w-[160px]">
          <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
          <select value={role} onChange={(e) => setRole(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-indigo-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-indigo-50/30 appearance-none cursor-pointer transition-all">
            <option value="">All Roles</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className="relative min-w-[160px]">
          <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
          <select value={location} onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-indigo-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-indigo-50/30 appearance-none cursor-pointer transition-all">
            <option value="">All Locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        <div className="relative min-w-[140px]">
          <Layers size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
          <select value={level} onChange={(e) => setLevel(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border-2 border-indigo-100 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-indigo-50/30 appearance-none cursor-pointer transition-all">
            <option value="">All Levels</option>
            {levels.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}`;

// Fix company page
const companyPage = `"use client";

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
          <Link href="/salaries" className="text-sm text-indigo-500 hover:underline">\u2190 Back to Salaries</Link>
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
                  { label: "Avg Total", value: "\u20b9" + avgTotal + "L", color: "text-indigo-600" },
                  { label: "Avg Base", value: "\u20b9" + avgBase + "L", color: "text-blue-600" },
                  { label: "Avg Bonus", value: "\u20b9" + avgBonus + "L", color: "text-amber-600" },
                  { label: "Avg Stock", value: "\u20b9" + avgStock + "L", color: "text-emerald-600" },
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
                      <td className="px-5 py-4 font-bold text-gray-900">\u20b9{s.totalComp}L</td>
                      <td className="px-5 py-4 text-gray-600">\u20b9{s.base}L</td>
                      <td className="px-5 py-4 text-amber-600">\u20b9{s.bonus}L</td>
                      <td className="px-5 py-4 text-indigo-600">\u20b9{s.stock}L</td>
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
}`;

fs.mkdirSync('src/app/company/[name]', { recursive: true });
fs.writeFileSync('src/components/SalaryChart.tsx', chart);
fs.writeFileSync('src/components/Filters.tsx', filters);
fs.writeFileSync('src/app/company/[name]/page.tsx', companyPage);
console.log('All fixed!');