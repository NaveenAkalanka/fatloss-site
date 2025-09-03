// src/components/day/DayPlan.jsx
import React, { useEffect, useState } from "react";
import { Link as LinkIcon, Timer as TimerIcon, ClipboardList, CheckCircle2 } from "lucide-react";
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, ProgressBar } from "../ui";
import { STORAGE_KEY } from "../../data/plan";

function useProgress() {
  const [state, setState] = useState({});
  useEffect(() => {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) setState(JSON.parse(raw)); } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }, [state]);
  return [state, setState];
}

export const Timer = ({ preset = 40, label = "Work" }) => {
  const [running, setRunning] = useState(false);
  const [input, setInput] = useState(preset);
  const [seconds, setSeconds] = useState(preset);
  useEffect(() => setSeconds(preset), [preset]);
  useEffect(() => { if (!running) return; const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000); return () => clearInterval(id); }, [running]);
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3">
      <TimerIcon className="h-5 w-5 text-gray-700" />
      <span className="text-sm font-semibold text-gray-800 w-16">{label}</span>
      <span className="w-16 text-center text-lg font-mono">{fmt(seconds)}</span>
      <input className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm" type="number" min={5} value={input} onChange={(e) => setInput(Number(e.target.value || 0))} />
      <Button variant="soft" onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Start"}</Button>
      <Button variant="outline" onClick={() => setSeconds(input)}>Reset</Button>
    </div>
  );
};

export const ExerciseRow = ({ dayIdx, blockIdx, block }) => {
  const [progress, setProgress] = useProgress();
  const id = `${dayIdx}-${blockIdx}-${(block.ex?.name || block.label).toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;
  const total = Number(block.sets) || 0;
  const done = progress[id]?.done || 0;
  const pct = total ? (done / total) * 100 : 0;
  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-100 p-3 md:grid-cols-[1fr_auto] md:items-center">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{block.ex?.name}</p>
          <div className="hidden md:block w-40"><ProgressBar value={pct} /></div>
        </div>
        <p className="mt-1 text-[13px] text-gray-700"><span className="font-medium">Prescription:</span> {block.sets ? `${block.sets} sets` : "—"}{block.reps ? ` · ${block.reps}` : ""}{block.rest ? ` · Rest ${block.rest}` : ""}</p>
        {block.notes && <p className="mt-1 text-[13px] text-gray-600">{block.notes}</p>}
        <div className="mt-2 flex flex-wrap gap-2">
          {block.ex?.links?.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-xs hover:bg-gray-50">
              <LinkIcon className="h-3.5 w-3.5" /> {l.label}
            </a>
          ))}
        </div>
      </div>
      {total > 0 && (
        <div className="flex items-center gap-2 md:justify-end">
          <Button variant="soft" onClick={() => setProgress((s) => ({ ...s, [id]: { done: Math.min(total, (s[id]?.done || 0) + 1) } }))} className="!px-2.5 !py-1.5 text-xs">
            Mark set <span className="ml-1 rounded bg-black/80 px-1 text-white">+1</span>
          </Button>
          <Button variant="outline" onClick={() => setProgress((s) => ({ ...s, [id]: { done: 0 } }))} className="!px-2.5 !py-1.5 text-xs">Reset</Button>
          <Badge className="bg-gray-900/90 text-white">{done}/{total}</Badge>
        </div>
      )}
    </div>
  );
};

export const DaySummaryCard = ({ d, index, to, equal }) => (
  <Card className={` ${equal ? "min-w-[280px] max-w-[280px]" : ""} h-full`}>
    <CardHeader>
      <div className="flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${d.color}`}>{d.icon}</div>
        <div>
          <CardTitle>{d.day}</CardTitle>
          <p className="text-[13px] text-gray-600">{d.type}</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-gray-700 line-clamp-3">{d.summary}</p>
      <ul className="mt-3 text-xs text-gray-600 list-disc list-inside space-y-1">
        {d.blocks.filter(b => b.ex).slice(0,3).map((b, idx) => <li key={idx}>{b.ex.name}</li>)}
      </ul>
      <div className="mt-4">
        <Button as="a" href={to} className="w-full">View plan</Button>
      </div>
    </CardContent>
  </Card>
);

export const DayDetailCard = ({ d, idx }) => {
  const totalSets = d.blocks.filter((b) => b.ex && b.sets).reduce((acc, b) => acc + Number(b.sets || 0), 0);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${d.color}`}>{d.icon}</div>
          <div>
            <CardTitle>{d.day}</CardTitle>
            <p className="text-[13px] text-gray-600">{d.type}</p>
          </div>
        </div>
        <Badge className="bg-indigo-600 text-white">{totalSets} sets</Badge>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-gray-700">{d.summary}</p>
        {d.type.includes("Glycolytic") && (
          <div className="mb-4 grid gap-2 sm:grid-cols-2">
            <Timer preset={40} label="Work 40s" />
            <Timer preset={20} label="Rest 20s" />
          </div>
        )}
        <div className="space-y-3">
          {d.blocks.map((b, i) =>
            b.divider ? (
              <div key={i} className="mt-6 flex items-center gap-2">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{b.label}</span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
            ) : (
              <ExerciseRow key={i} dayIdx={idx} blockIdx={i} block={b} />
            )
          )}
        </div>
        <div className="mt-5 rounded-xl bg-gray-50 p-3 text-xs text-gray-700">
          <p className="mb-1 font-semibold">Session tips</p>
          <ul className="list-inside list-disc space-y-1">
            <li>Warm-up 10 min: easy skipping + dynamic mobility.</li>
            <li>Stop 1–2 reps before form breaks (except last set).</li>
            <li>Nasal breathing on easy work; mouth for sprints.</li>
            <li>Hydrate with water + pinch of salt before the meal.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
