"use client";

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
        <p className="text-sm text-indigo-600 font-semibold">Avg: ₹{payload[0].value}L</p>
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
          <YAxis tickFormatter={(v) => "₹" + v + "L"} tick={{ fontSize: 11, fill: "#6b7280" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6" }} />
          <Bar dataKey="avg" radius={[6, 6, 0, 0]} maxBarSize={60}>
            {chartData.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}