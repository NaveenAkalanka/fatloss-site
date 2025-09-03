// src/pages/Home.jsx
import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { plan } from "../data/plan.jsx";
import { Button, Card, CardContent, CardHeader, CardTitle, ProgressBar } from "../components/ui.jsx";

const STORAGE_KEY = "fatloss_6day_progress_v1";

const DaySummaryCard = ({ d, to }) => (
  <Card className="h-full flex flex-col">
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${d.color}`}>{d.icon}</div>
        <div>
          <CardTitle>{d.day}</CardTitle>
          <p className="text-[13px] text-gray-600">{d.type}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex flex-col flex-1">
      <p className="text-sm text-gray-700 line-clamp-3">{d.summary}</p>
      <ul className="mt-3 text-xs text-gray-600 list-disc list-inside space-y-1">
        {d.blocks.filter(b => b.ex).slice(0,3).map((b, idx) => <li key={idx}>{b.ex.name}</li>)}
      </ul>
      <div className="mt-auto pt-4">
        <Button as={Link} to={to} className="w-full">View plan</Button>
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  const weeklyTotalSets = useMemo(
    () => plan.reduce((t, d) => t + d.blocks.filter(b => b.ex && b.sets).reduce((a, b) => a + Number(b.sets || 0), 0), 0),
    []
  );
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const obj = JSON.parse(raw || "{}");
      const done = Object.values(obj).reduce((a, v) => a + (v?.done || 0), 0);
      setProgress(Math.min(100, Math.round((done / weeklyTotalSets) * 100)));
    } catch {}
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7fb] to-[#eef7ff]">
      <header className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white/70 p-6 backdrop-blur md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">6-Day Fat-Loss Plan · No Equipment</h1>
            <p className="mt-1 text-sm text-gray-600">Pick a day to open the full plan.</p>
          </div>
          <div className="w-full max-w-xs md:w-72">
            <p className="mb-1 text-xs font-medium text-gray-600">Weekly completion</p>
            <ProgressBar value={progress} />
            <p className="mt-1 text-right text-xs text-gray-500">{progress}%</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* No horizontal scroll. Always show all 6 cards. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <DaySummaryCard d={plan[0]} to="/day/monday" />
          <DaySummaryCard d={plan[1]} to="/day/tuesday" />
          <DaySummaryCard d={plan[2]} to="/day/wednesday" />
          <DaySummaryCard d={plan[3]} to="/day/thursday" />
          <DaySummaryCard d={plan[4]} to="/day/friday" />
          <DaySummaryCard d={plan[5]} to="/day/saturday" />
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/70 ring-1 ring-gray-200">
            <CheckCircle2 className="h-4 w-4" />
            Fully responsive · No scrolling on home · Click any card to view details
          </div>
        </div>
      </main>
    </div>
  );
}
