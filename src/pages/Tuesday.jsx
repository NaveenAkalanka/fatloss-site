import React from "react";
import { Link } from "react-router-dom";
import { plan } from "../data/plan.jsx";
import { Button, Card, CardContent, CardHeader, CardTitle } from "../components/ui.jsx";
import { DayDetailCard } from "../components/day/DayDetail.jsx";

export default function Monday() {
  const idx = 0;
  const d = plan[idx];
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f7f7fb] to-[#eef7ff]">
      <header className="mx-auto max-w-7xl px-5 pt-8 md:px-8">
        <div className="flex items-center justify-between">
          <Button as={Link} to="/" variant="soft" className="!px-3">← Home</Button>
          <Card className="hidden md:block">
            <CardHeader><CardTitle>{d.day}</CardTitle></CardHeader>
            <CardContent className="pt-0 text-sm text-gray-600">{d.type}</CardContent>
          </Card>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8 md:px-8">
        <DayDetailCard d={d} idx={idx} />
      </main>
    </div>
  );
}
