"use client";

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
        🔍 Filter Salaries
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
}