export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }
  return `₹${amount.toLocaleString()}`;
}

export function getCompanySlug(company: string): string {
  return company.toLowerCase().replace(/\s+/g, "-");
}

export function getLevelColor(level: string): string {
  const colors: Record<string, string> = {
    L3: "bg-green-100 text-green-700",
    L4: "bg-blue-100 text-blue-700",
    L5: "bg-purple-100 text-purple-700",
    L6: "bg-orange-100 text-orange-700",
    SDE1: "bg-green-100 text-green-700",
    SDE2: "bg-blue-100 text-blue-700",
    SDE3: "bg-purple-100 text-purple-700",
    E4: "bg-blue-100 text-blue-700",
    E5: "bg-purple-100 text-purple-700",
    SWE2: "bg-blue-100 text-blue-700",
    SWE3: "bg-purple-100 text-purple-700",
    MTS2: "bg-blue-100 text-blue-700",
    MTS3: "bg-purple-100 text-purple-700",
  };
  return colors[level] || "bg-gray-100 text-gray-700";
}