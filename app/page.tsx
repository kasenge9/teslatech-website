"use client";

import React, { useMemo, useState } from "react";

type ModuleKey =
  | "dashboard"
  | "students"
  | "staff"
  | "attendance"
  | "exams"
  | "curriculum"
  | "fees"
  | "payroll"
  | "library"
  | "transport"
  | "parents"
  | "notices"
  | "analytics"
  | "aiTutor"
  | "gamification"
  | "voice"
  | "settings";

type Module = {
  key: ModuleKey;
  label: string;
  icon: string;
  description: string;
};

const modules: Module[] = [
  { key: "dashboard", label: "Dashboard", icon: "📊", description: "Live school overview" },
  { key: "students", label: "Students", icon: "🧒", description: "Register, enrolment, profiles" },
  { key: "staff", label: "Teachers & Staff", icon: "🧑‍🏫", description: "Staff records and timetable" },
  { key: "attendance", label: "Attendance", icon: "✅", description: "Daily and monthly attendance" },
  { key: "exams", label: "Exams & Results", icon: "📝", description: "Ranking, grades, averages" },
  { key: "curriculum", label: "Curriculum", icon: "📚", description: "Lesson plan tracking" },
  { key: "fees", label: "Fee Management", icon: "💳", description: "M-Pesa and fee timelines" },
  { key: "payroll", label: "Payroll", icon: "💼", description: "Gross/net pay and deductions" },
  { key: "library", label: "Library", icon: "📖", description: "Books, QR scans, overdue" },
  { key: "transport", label: "Transport & GPS", icon: "🚌", description: "Routes, live status, parent alerts" },
  { key: "parents", label: "Parent Portal", icon: "👨‍👩‍👧", description: "Inbox, SMS, notifications" },
  { key: "notices", label: "Notice Board", icon: "📢", description: "Color-coded school notices" },
  { key: "analytics", label: "Analytics", icon: "📈", description: "AI insights and risk flags" },
  { key: "aiTutor", label: "AI Tutor", icon: "🤖", description: "Live tutor, quiz, recommendations" },
  { key: "gamification", label: "Gamification", icon: "🏅", description: "Leaderboard and badges" },
  { key: "voice", label: "Voice Commands", icon: "🎙️", description: "Mic actions and command history" },
  { key: "settings", label: "Settings & Security", icon: "⚙️", description: "2FA, users, integrations" },
];

const kpis = [
  { title: "Students", value: "1,248", trend: "+3.2%" },
  { title: "Attendance Today", value: "94%", trend: "+1.1%" },
  { title: "Fees Collected", value: "KES 2.4M", trend: "+8.9%" },
  { title: "Teachers On Duty", value: "54", trend: "100%" },
];

const smallBar = (value: number, label: string) => (
  <div key={label} className="space-y-1">
    <div className="flex items-center justify-between text-xs text-slate-500">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 rounded-full bg-slate-200">
      <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${value}%` }} />
    </div>
  </div>
);

function card(title: string, body: React.ReactNode) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      {body}
    </div>
  );
}

export default function Home() {
  const [activeModule, setActiveModule] = useState<ModuleKey>("dashboard");

  const active = useMemo(() => modules.find((m) => m.key === activeModule), [activeModule]);

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return (
          <div className="grid gap-5 lg:grid-cols-3">
            {kpis.map((kpi) =>
              card(
                kpi.title,
                <div>
                  <p className="text-3xl font-bold text-slate-900">{kpi.value}</p>
                  <p className="mt-1 text-xs font-medium text-emerald-600">{kpi.trend} this month</p>
                </div>
              )
            )}
            {card(
              "Attendance Trend",
              <div className="space-y-3">{[72, 79, 83, 89, 94].map((v, i) => smallBar(v, `Week ${i + 1}`))}</div>
            )}
            {card(
              "Fee Gauge",
              <div className="space-y-3">
                <p className="text-sm text-slate-600">Target: KES 3,000,000</p>
                <div className="h-4 rounded-full bg-slate-200">
                  <div className="h-4 rounded-full bg-indigo-600" style={{ width: "80%" }} />
                </div>
                <p className="text-xs text-slate-500">80% collected</p>
              </div>
            )}
            {card(
              "Recent Notices",
              <ul className="space-y-2 text-sm text-slate-700">
                <li>📌 CBC workshop — April 6</li>
                <li>📌 Term 2 fee reminder sent</li>
                <li>📌 Grade 6 trip consent deadline</li>
              </ul>
            )}
          </div>
        );
      case "students":
        return sectionTemplate("Student Register", ["Search by name/admission no", "New enrolment modal", "Profile tabs: info, results, attendance heatmap"]);
      case "staff":
        return sectionTemplate("Teachers & Staff", ["Staff performance bars", "Department filter", "Weekly class timetable"]);
      case "attendance":
        return sectionTemplate("Attendance Center", ["Daily biometric register", "Monthly heatmap", "Auto SMS alerts for absentees"]);
      case "exams":
        return sectionTemplate("Exams & Results", ["Ranked result table", "Grade distribution chart", "Subject averages"]);
      case "curriculum":
        return sectionTemplate("Curriculum Planner", ["Subject tabs", "Lesson completion status", "Coverage vs target tracker"]);
      case "fees":
        return sectionTemplate("Fee Management", ["M-Pesa payment integration", "Collection by class", "Transaction timeline + payment modal"]);
      case "payroll":
        return sectionTemplate("Payroll", ["Gross/net pay breakdown", "PAYE/NHIF/NSSF deductions", "Monthly payslip status"]);
      case "library":
        return sectionTemplate("Library", ["Book catalogue", "QR scanner placeholder", "Overdue and fine tracker"]);
      case "transport":
        return sectionTemplate("Transport & GPS", ["Animated live route map", "Route and driver table", "Parent ETA notifications"]);
      case "parents":
        return sectionTemplate("Parent Portal", ["Parent inbox", "SMS broadcast composer", "Notification history"]);
      case "notices":
        return sectionTemplate("Notice Board", ["Important, Academic, Finance, Event tags", "Post notice modal", "Search and pin notices"]);
      case "analytics":
        return sectionTemplate("AI Analytics", ["KPI rings", "Performance trend chart", "Dropout and fee risk flags"]);
      case "aiTutor":
        return sectionTemplate("AI Tutor", ["Chat assistant window", "Instant quiz generator", "Personalized recommendations"]);
      case "gamification":
        return sectionTemplate("Gamification", ["Class leaderboard", "Points progress bars", "Badge awards"]);
      case "voice":
        return sectionTemplate("Voice Commands", ["Interactive microphone", "Demo command list", "Recent command history"]);
      case "settings":
        return sectionTemplate("Settings & Security", ["School profile config", "User account roles", "2FA + integration status"]);
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-80 flex-col rounded-2xl bg-slate-900 p-4 text-white shadow-lg lg:flex">
          <h1 className="mb-1 text-xl font-bold">Matondoni Primary SMS</h1>
          <p className="mb-4 text-xs text-slate-300">Smart Management System</p>
          <nav className="space-y-1 overflow-y-auto pr-1">
            {modules.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveModule(m.key)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                  activeModule === m.key ? "bg-indigo-600 text-white" : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                <span>{m.icon}</span>
                <span>{m.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 space-y-5">
          <header className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Production Demo</p>
            <h2 className="mt-1 text-2xl font-bold">{active?.label}</h2>
            <p className="mt-2 text-sm text-slate-600">{active?.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              {modules.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setActiveModule(m.key)}
                  className={`rounded-lg border px-2 py-2 text-xs ${
                    activeModule === m.key ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white"
                  }`}
                >
                  {m.icon} {m.label}
                </button>
              ))}
            </div>
          </header>
          {renderModule()}
        </section>
      </div>
    </main>
  );
}

function sectionTemplate(title: string, highlights: string[]) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {card(
        title,
        <div>
          <p className="mb-3 text-sm text-slate-600">Fully navigable module scaffold with production-style card layouts.</p>
          <ul className="space-y-2 text-sm text-slate-700">
            {highlights.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
      {card(
        "Operational Snapshot",
        <div className="space-y-3">{[88, 64, 91].map((v, i) => smallBar(v, ["Completion", "Response", "Quality"][i]))}</div>
      )}
      {card(
        "Activity Timeline",
        <ul className="space-y-2 text-sm text-slate-700">
          <li>09:10 — Data synced successfully</li>
          <li>10:00 — New item created by Admin</li>
          <li>10:35 — Parent notification queued</li>
          <li>11:12 — Audit log exported</li>
        </ul>
      )}
    </div>
  );
}
