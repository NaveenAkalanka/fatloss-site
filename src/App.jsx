// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ClipboardList, ArrowLeft } from "lucide-react";
import { Routes, Route, useParams, useNavigate, Link } from "react-router-dom";
import { plan } from "./data/plan";
import { Badge, Card, CardContent, CardHeader, CardTitle, ProgressBar, Button } from "./components/ui";
import { DaySummaryCard, DayDetailCard } from "./components/day/DayPlan";

const STORAGE_KEY = "fatloss_6day_progress_v1";

function Sidebar() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-gray-700" />
          <CardTitle>Cheap Protein & Recovery</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
          <li>Eggs, chickpeas, lentils, soy/soya meat, peanuts, curd, dried fish.</li>
          <li>Target ~1.6 g protein/kg (do your best with budget).</li>
          <li>After training: water + pinch of salt + banana before the main meal.</li>
          <li>Sleep 7–9h; walk on Sunday for recovery.</li>
        </ul>
      </CardContent>
    </Card>
  );
}

/* ---------------- HOME ---------------- */
function Home() {
  // progress for header bar
  const weeklyTotalSets = useMemo(
    () => plan.reduce((t, d) => t + d.blocks.filter((b) => b.ex && b.sets).reduce((a, b) => a + Number(b.sets || 0), 0), 0),
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

  // tab state for desktop
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7fb] to-[#eef7ff]">
      <header className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white/70 p-6 backdrop-blur md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tight">6-Day Fat-Loss Plan · No Equipment</h1>
            <p className="mt-1 text-sm text-gray-600">Tap a day for full plan • Responsive for any device</p>
          </div>
          <div className="w-full max-w-xs md:w-72">
            <p className="mb-1 text-xs font-medium text-gray-600">Weekly completion</p>
            <ProgressBar value={progress} />
            <p className="mt-1 text-right text-xs text-gray-500">{progress}%</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:px-8">
        {/* Desktop tabs (lg+) */}
        <div className="hidden lg:block">
          {/* Tab strip */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3">
            {plan.map((d, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ring-1 ring-gray-200
                ${active === i ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
              >
                {d.day}
              </button>
            ))}
          </div>

          {/* Equal-size cards in one horizontal row */}
          <div className="mt-4 flex flex-nowrap gap-4 overflow-x-auto">
            {plan.map((d, i) => (
              <DaySummaryCard key={i} d={d} index={i} to={`/day/${i}`} equal />
            ))}
          </div>

          {/* Active detail below tabs */}
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <DayDetailCard d={plan[active]} idx={active} />
            <div className="space-y-5">
              <Sidebar />
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-gray-700" /><CardTitle>How to Progress</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                    <li>Add 1 set to a push exercise and +1 sprint each week or +1–2 reps/set.</li>
                    <li>When 6×12 push-ups are easy, elevate feet or add tempo (3s down).</li>
                    <li>For pull-ups: move from negatives → band-assisted when ready.</li>
                    <li>Keep Thursday easy and Sunday off.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: vertical cards */}
        <div className="lg:hidden grid grid-cols-1 gap-4">
          {plan.map((d, i) => (
            <DaySummaryCard key={i} d={d} index={i} to={`/day/${i}`} />
          ))}
        </div>
      </main>
    </div>
  );
}

/* ---------------- DAY PAGE (mobile route) ---------------- */
function DayPage() {
  const { i } = useParams();
  const idx = Number.isInteger(Number(i)) ? Number(i) : NaN;
  const navigate = useNavigate();

  useEffect(() => {
    if (Number.isNaN(idx) || idx < 0 || idx >= plan.length) navigate("/");
  }, [idx, navigate]);

  if (Number.isNaN(idx) || idx < 0 || idx >= plan.length) return null;

  const d = plan[idx];
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7fb] to-[#eef7ff]">
      <header className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <div className="flex items-center justify-between">
          <Button as={Link} to="/" variant="soft" className="!px-3"><ArrowLeft className="h-4 w-4" /> Home</Button>
          <div />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 md:px-8">
        <DayDetailCard d={d} idx={idx} />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Sidebar />
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-gray-700" /><CardTitle>How to Progress</CardTitle></div>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                <li>Add 1 set or 1–2 reps weekly where possible.</li>
                <li>Switch to band-assisted pull-ups once negatives are easy.</li>
                <li>Keep one easy recovery day and one full rest day.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

/* ---------------- ROUTES ---------------- */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/day/:i" element={<DayPage />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
