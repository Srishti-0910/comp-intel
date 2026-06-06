import Navbar from "@/components/Navbar";

const features = [
  { feature: "Salary by Level", levels: "✅", figr: "✅", ambition: "❌", glassdoor: "⚠️ Partial", built: "✅" },
  { feature: "Total Comp Breakdown", levels: "✅", figr: "✅", ambition: "❌", glassdoor: "❌", built: "✅" },
  { feature: "Company Pages", levels: "✅", figr: "✅", ambition: "✅", glassdoor: "✅", built: "✅" },
  { feature: "Compare Companies", levels: "✅", figr: "❌", ambition: "❌", glassdoor: "❌", built: "✅" },
  { feature: "Radar Chart", levels: "❌", figr: "❌", ambition: "❌", glassdoor: "❌", built: "✅" },
  { feature: "Filter by Role", levels: "✅", figr: "✅", ambition: "✅", glassdoor: "✅", built: "✅" },
  { feature: "Filter by Level", levels: "✅", figr: "✅", ambition: "❌", glassdoor: "❌", built: "✅" },
  { feature: "Filter by Location", levels: "✅", figr: "✅", ambition: "✅", glassdoor: "✅", built: "✅" },
  { feature: "Salary Visualization", levels: "✅", figr: "⚠️ Partial", ambition: "❌", glassdoor: "⚠️ Partial", built: "✅" },
  { feature: "Anonymous Submissions", levels: "✅", figr: "✅", ambition: "❌", glassdoor: "✅", built: "✅" },
  { feature: "Mobile Responsive", levels: "✅", figr: "✅", ambition: "✅", glassdoor: "✅", built: "✅" },
  { feature: "Stock/Bonus Split", levels: "✅", figr: "✅", ambition: "❌", glassdoor: "❌", built: "✅" },
];

const observations = [
  { platform: "Levels.fyi", note: "Best-in-class for level-based compensation. Focuses on total comp breakdown including base, bonus, and stock. Strongest for FAANG companies." },
  { platform: "6figr", note: "India-focused salary data. Good level mapping but limited company coverage. Strong filtering but no comparison feature." },
  { platform: "AmbitionBox", note: "Large dataset but lacks level-based breakdown. More focused on job titles than engineering levels. No total comp visualization." },
  { platform: "Glassdoor", note: "Broad coverage but compensation data is often incomplete. Missing stock/bonus breakdown. No level-based filtering." },
];

export default function ResearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Research & Analysis</h1>
          <p className="text-gray-500 mt-1">
            Competitive analysis of compensation intelligence platforms
          </p>
        </div>

        {/* Key Observations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Observations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {observations.map((o) => (
              <div key={o.platform} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-semibold text-blue-600 mb-2">{o.platform}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{o.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">Feature</th>
                  <th className="text-center px-4 py-3 font-medium">Levels.fyi</th>
                  <th className="text-center px-4 py-3 font-medium">6figr</th>
                  <th className="text-center px-4 py-3 font-medium">AmbitionBox</th>
                  <th className="text-center px-4 py-3 font-medium">Glassdoor</th>
                  <th className="text-center px-4 py-3 font-medium text-blue-600">CompIntel ✨</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((row) => (
                  <tr key={row.feature} className="hover:bg-blue-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-700">{row.feature}</td>
                    <td className="px-4 py-3 text-center">{row.levels}</td>
                    <td className="px-4 py-3 text-center">{row.figr}</td>
                    <td className="px-4 py-3 text-center">{row.ambition}</td>
                    <td className="px-4 py-3 text-center">{row.glassdoor}</td>
                    <td className="px-4 py-3 text-center font-semibold">{row.built}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  );
}