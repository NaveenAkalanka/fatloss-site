import React from "react";
import { Flame, Zap, RefreshCcw, Link as LinkIcon } from "lucide-react";

export const STORAGE_KEY = "fatloss_6day_progress_v1";

const yt = (q) => `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
const g = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

export const EXERCISES = {
  pushups: { name: "Push-ups", links: [{ label: "YouTube guide", url: yt("push up proper form") }, { label: "Form tips", url: g("push up cues elbows tucked scapula") }] },
  dips: { name: "Bench/Bar Dips", links: [{ label: "YouTube guide", url: yt("bench dips vs bar dips form shoulders safe") }, { label: "Form tips", url: g("dips shoulder safety scapular depression") }] },
  pike: { name: "Pike Push-ups", links: [{ label: "YouTube guide", url: yt("pike push up form") }, { label: "Form tips", url: g("pike push up cues head between hands") }] },
  squatJumps: { name: "Squat Jumps", links: [{ label: "YouTube guide", url: yt("jump squats proper form") }] },
  negatives: { name: "Negative Pull-ups (slow lower)", links: [{ label: "YouTube guide", url: yt("negative pull up tutorial") }] },
  planks: { name: "Plank", links: [{ label: "YouTube guide", url: yt("plank proper form") }] },
  sidePlank: { name: "Side Plank", links: [{ label: "YouTube guide", url: yt("side plank form") }] },
  legRaises: { name: "Hanging/Bar Leg Raises (or lying)", links: [{ label: "YouTube guide", url: yt("leg raises hanging form") }, { label: "Alternative (lying)", url: yt("lying leg raises form") }] },
  burpees: { name: "Burpees", links: [{ label: "YouTube guide", url: yt("how to burpee step by step") }] },
  jumpSquats: { name: "Jump Squats", links: [{ label: "YouTube guide", url: yt("jump squats tutorial") }] },
  mountainClimbers: { name: "Mountain Climbers", links: [{ label: "YouTube guide", url: yt("mountain climbers form") }] },
  highKnees: { name: "High Knees (in place)", links: [{ label: "YouTube guide", url: yt("high knees drill technique") }] },
  sprints100: { name: "Track Sprints 100m", links: [{ label: "Sprint technique", url: yt("sprint running technique beginner") }] },
  diamondPU: { name: "Diamond Push-ups", links: [{ label: "YouTube guide", url: yt("diamond push up form") }] },
  splitSquat: { name: "Bulgarian Split Squat (bench or bar)", links: [{ label: "YouTube guide", url: yt("bulgarian split squat bodyweight form") }] },
  declinePU: { name: "Decline Push-ups (feet up)", links: [{ label: "YouTube guide", url: yt("decline push up form") }] },
  broadJumps: { name: "Broad Jumps", links: [{ label: "YouTube guide", url: yt("standing broad jump technique") }] },
  barHangs: { name: "Bar Hangs + Scapular Pulls", links: [{ label: "YouTube guide", url: yt("scapular pull up tutorial") }] },
  walk: { name: "Brisk Walk (Track)", links: [{ label: "Walking for fat loss", url: yt("walking fat loss brisk pace tips") }] },
  skipping: { name: "Light Skipping (low impact rounds)", links: [{ label: "Skipping basics", url: yt("jump rope beginner tutorial") }] },
  yogaMobility: { name: "Yoga/Mobility Sequence", links: [{ label: "Hip & back mobility", url: yt("beginner mobility routine hips back") }] },
  sprint50s: { name: "Sprint 50m + Walk 50m", links: [{ label: "Technique", url: yt("how to sprint technique beginner") }] },
};

export const plan = [
  {
    day: "Monday",
    type: "Power · Phosphagen",
    icon: <Zap className="h-4 w-4" />, color: "bg-yellow-500/15 text-yellow-700 ring-1 ring-yellow-500/30",
    summary: "Explosive strength to protect muscle while cutting fat.",
    blocks: [
      { ex: EXERCISES.pushups, sets: 6, reps: "max quality", rest: "90s", notes: "Elbows ~45°, core tight. Stop 1–2 reps before failure first 3 sets." },
      { ex: EXERCISES.dips, sets: 6, reps: "6–10", rest: "90s", notes: "Use bench dips if bar dips are too hard. Shoulders down/back." },
      { ex: EXERCISES.pike, sets: 5, reps: "6–12", rest: "90s", notes: "Head between hands, slow negative." },
      { ex: EXERCISES.squatJumps, sets: 6, reps: "10", rest: "60–90s", notes: "Land softly. Full rest between sets to keep power high." },
      { divider: true, label: "Pull-up Skill" },
      { ex: EXERCISES.negatives, sets: 6, reps: "5 (3–5s lowering)", rest: "90s", notes: "Jump to top, slow lower. Add bar hangs between sets if needed." },
      { divider: true, label: "Core Finish" },
      { ex: EXERCISES.planks, sets: 3, reps: "45–60s", rest: "45s", notes: "Squeeze glutes; neutral spine." },
      { ex: EXERCISES.sidePlank, sets: 3, reps: "30–45s/side", rest: "30s", notes: "Stack feet, keep hips high." },
      { ex: EXERCISES.legRaises, sets: 3, reps: "8–12", rest: "45s", notes: "Posterior tilt." },
    ],
  },
  {
    day: "Tuesday",
    type: "Burn · Glycolytic",
    icon: <Flame className="h-4 w-4" />, color: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/30",
    summary: "HIIT + sprints for aggressive fat burn.",
    blocks: [
      { divider: true, label: "HIIT Circuit · 40s work / 20s rest · 3 rounds" },
      { ex: EXERCISES.burpees, sets: 3, reps: "40s on", rest: "20s", notes: "Step back if needed." },
      { ex: EXERCISES.jumpSquats, sets: 3, reps: "40s on", rest: "20s", notes: "Maintain rhythm." },
      { ex: EXERCISES.pushups, sets: 3, reps: "40s on", rest: "20s", notes: "Knees-down if needed." },
      { ex: EXERCISES.mountainClimbers, sets: 3, reps: "40s on", rest: "20s", notes: "Hips level." },
      { ex: EXERCISES.highKnees, sets: 3, reps: "40s on", rest: "20s", notes: "Light feet." },
      { divider: true, label: "Track Sprints" },
      { ex: EXERCISES.sprints100, sets: "8–10", reps: "100m sprint", rest: "Walk back full", notes: "Run tall; full recovery." },
    ],
  },
  {
    day: "Wednesday",
    type: "Power · Phosphagen",
    icon: <Zap className="h-4 w-4" />, color: "bg-yellow-500/15 text-yellow-700 ring-1 ring-yellow-500/30",
    summary: "Alternate power focus and pull-up prep.",
    blocks: [
      { ex: EXERCISES.diamondPU, sets: 6, reps: "6–12", rest: "90s", notes: "Elbows in, control tempo." },
      { ex: EXERCISES.splitSquat, sets: 6, reps: "8–12/leg", rest: "60–90s", notes: "Knee tracks toes." },
      { ex: EXERCISES.declinePU, sets: 6, reps: "6–12", rest: "90s", notes: "Ribcage down." },
      { ex: EXERCISES.broadJumps, sets: 6, reps: "6–8", rest: "90s", notes: "Reset between reps." },
      { ex: EXERCISES.barHangs, sets: 4, reps: "30–45s hold + 8–10 scap pulls", rest: "60–90s", notes: "Depress & retract." },
      { ex: EXERCISES.legRaises, sets: 3, reps: "8–12", rest: "45s", notes: "Quality over quantity." },
    ],
  },
  {
    day: "Thursday",
    type: "Recovery · Oxidative",
    icon: <RefreshCcw className="h-4 w-4" />, color: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/30",
    summary: "Long easy cardio + mobility.",
    blocks: [
      { ex: EXERCISES.walk, sets: 1, reps: "60–90 min brisk", rest: "—", notes: "Able to talk; steady sweat." },
      { ex: EXERCISES.skipping, sets: 10, reps: "2–3 min easy", rest: "60s", notes: "Soft surface." },
      { ex: EXERCISES.yogaMobility, sets: 1, reps: "20–30 min", rest: "—", notes: "Hips, calves, t-spine, hammies." },
    ],
  },
  {
    day: "Friday",
    type: "Power · Phosphagen",
    icon: <Zap className="h-4 w-4" />, color: "bg-yellow-500/15 text-yellow-700 ring-1 ring-yellow-500/30",
    summary: "Repeat power; keep reps clean.",
    blocks: [
      { ex: EXERCISES.pushups, sets: 6, reps: "max quality", rest: "90s", notes: "Beat Monday by 1–2 reps." },
      { ex: EXERCISES.dips, sets: 6, reps: "6–10", rest: "90s", notes: "Pause at bottom." },
      { ex: EXERCISES.negatives, sets: 6, reps: "5 (3–5s lower)", rest: "90s", notes: "Add mid-hold if easy." },
      { ex: EXERCISES.sprint50s, sets: 12, reps: "50m fast + 50m walk", rest: "Walk back", notes: "Relax shoulders." },
      { ex: EXERCISES.planks, sets: 3, reps: "45–60s", rest: "45s", notes: "Nasal breathing." },
    ],
  },
  {
    day: "Saturday",
    type: "Burn · Glycolytic",
    icon: <Flame className="h-4 w-4" />, color: "bg-rose-500/10 text-rose-700 ring-1 ring-rose-500/30",
    summary: "Longer circuits; finish with sprints.",
    blocks: [
      { divider: true, label: "Circuit · 3–4 rounds · 2 min rest between" },
      { ex: EXERCISES.burpees, sets: 1, reps: "30", rest: "—", notes: "10/10/10." },
      { ex: EXERCISES.pushups, sets: 1, reps: "50 (break as needed)", rest: "—", notes: "Strict form." },
      { ex: EXERCISES.jumpSquats, sets: 1, reps: "60", rest: "—", notes: "Swap to BW squats if needed." },
      { ex: EXERCISES.mountainClimbers, sets: 1, reps: "40/side", rest: "—", notes: "Wrists stacked." },
      { divider: true, label: "Track Finish" },
      { ex: EXERCISES.sprint50s, sets: 12, reps: "50m fast + 50m walk", rest: "Walk back", notes: "Last 3 strong." },
      { ex: EXERCISES.yogaMobility, sets: 1, reps: "10–15 min cool-down", rest: "—", notes: "Extend exhale." },
    ],
  },
];
