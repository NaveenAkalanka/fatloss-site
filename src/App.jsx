export default function App() {
  const days = [
    { day: "Monday", type: "Power · Phosphagen", details: ["Push-ups", "Dips", "Jump Squats", "Negatives", "Core"] },
    { day: "Tuesday", type: "Burn · Glycolytic", details: ["HIIT Circuit", "Burpees", "Sprints"] },
    { day: "Wednesday", type: "Power · Phosphagen", details: ["Diamond Pushups", "Split Squats", "Broad Jumps"] },
    { day: "Thursday", type: "Recovery · Oxidative", details: ["Brisk Walk", "Skipping", "Mobility/Yoga"] },
    { day: "Friday", type: "Power · Phosphagen", details: ["Pushups", "Dips", "Negatives", "Sprints"] },
    { day: "Saturday", type: "Burn · Glycolytic", details: ["Bodyweight Circuit", "Sprints", "Stretching"] },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <header className="mx-auto max-w-4xl px-6 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">🔥 6-Day Fat Loss Workout Plan 🔥</h1>
        <p className="mt-2 text-gray-600">Train before your night meal · No equipment needed</p>
      </header>

      <main className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-6 pb-12 sm:grid-cols-2 lg:grid-cols-3">
        {days.map((d, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{d.day}</h2>
            <p className="text-sm text-gray-500">{d.type}</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700 list-disc list-inside">
              {d.details.map((ex, j) => (
                <li key={j}>{ex}</li>
              ))}
            </ul>
          </div>
        ))}
      </main>

      <footer className="text-center text-xs text-gray-500 py-6">
        Built with React + Vite + Tailwind
      </footer>
    </div>
  )
}
