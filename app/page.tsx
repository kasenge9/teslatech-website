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

type Student = {
  id: string;
  name: string;
  gender: "M" | "F";
  className: string;
  guardian: string;
  feeStatus: "Cleared" | "Partial" | "Pending";
  avg: number;
};

const modules: { key: ModuleKey; icon: string; label: string; hint: string }[] = [
  { key: "dashboard", icon: "📊", label: "Dashboard", hint: "Live school health overview" },
  { key: "students", icon: "🧒", label: "Students", hint: "Admissions, profile and records" },
  { key: "staff", icon: "🧑‍🏫", label: "Teachers & Staff", hint: "Personnel, quality and schedules" },
  { key: "attendance", icon: "✅", label: "Attendance", hint: "Biometric and daily tracking" },
  { key: "exams", icon: "📝", label: "Exams & Results", hint: "Rankings and performance" },
  { key: "curriculum", icon: "📚", label: "Curriculum", hint: "Lesson plans and status" },
  { key: "fees", icon: "💳", label: "Fee Management", hint: "Collections and transactions" },
  { key: "payroll", icon: "💼", label: "Payroll", hint: "Compensation and deductions" },
  { key: "library", icon: "📖", label: "Library", hint: "Books, issue and overdue" },
  { key: "transport", icon: "🚌", label: "Transport & GPS", hint: "Bus routes and alerts" },
  { key: "parents", icon: "👨‍👩‍👧", label: "Parent Portal", hint: "Messages and communication" },
  { key: "notices", icon: "📢", label: "Notice Board", hint: "School-wide announcements" },
  { key: "analytics", icon: "📈", label: "Analytics", hint: "AI insights and risks" },
  { key: "aiTutor", icon: "🤖", label: "AI Tutor", hint: "Assistant and quizzes" },
  { key: "gamification", icon: "🏅", label: "Gamification", hint: "Points, badges and growth" },
  { key: "voice", icon: "🎙️", label: "Voice Commands", hint: "Command center and history" },
  { key: "settings", icon: "⚙️", label: "Settings & Security", hint: "2FA, users and integrations" },
];

const students: Student[] = [
  { id: "ADM-0012", name: "Amina Ali", gender: "F", className: "Grade 6", guardian: "Ali Hassan", feeStatus: "Cleared", avg: 84 },
  { id: "ADM-0021", name: "Brian Mwangi", gender: "M", className: "Grade 5", guardian: "Grace Mwangi", feeStatus: "Partial", avg: 74 },
  { id: "ADM-0037", name: "Fatma Said", gender: "F", className: "Grade 4", guardian: "Said Omar", feeStatus: "Pending", avg: 68 },
  { id: "ADM-0045", name: "Kevin Ouma", gender: "M", className: "Grade 6", guardian: "Hellen Ouma", feeStatus: "Cleared", avg: 88 },
  { id: "ADM-0053", name: "Neema Juma", gender: "F", className: "Grade 3", guardian: "Juma Issa", feeStatus: "Partial", avg: 79 },
];

const staff = [
  { name: "Ms. Naliaka", role: "Head Teacher", perf: 93, classes: "All" },
  { name: "Mr. Karani", role: "Math Teacher", perf: 88, classes: "G5, G6" },
  { name: "Ms. Akinyi", role: "Science Teacher", perf: 86, classes: "G4-G6" },
  { name: "Mr. Baya", role: "ICT Officer", perf: 90, classes: "Lab" },
];

const examRows = [
  { rank: 1, name: "Kevin Ouma", className: "Grade 6", marks: 462, grade: "A-" },
  { rank: 2, name: "Amina Ali", className: "Grade 6", marks: 449, grade: "B+" },
  { rank: 3, name: "Brian Mwangi", className: "Grade 5", marks: 425, grade: "B" },
  { rank: 4, name: "Neema Juma", className: "Grade 3", marks: 389, grade: "B-" },
];

function ShellCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
      {children}
    </section>
  );
}

function meter(label: string, value: number, color = "bg-indigo-600") {
  return (
    <div key={label} className="space-y-1">
      <div className="flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 rounded bg-slate-200">
        <div className={`h-2 rounded ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function Home() {
  const [moduleKey, setModuleKey] = useState<ModuleKey>("dashboard");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(students[0].id);
  const [profileTab, setProfileTab] = useState<"info" | "results" | "attendance">("info");
  const [aiInput, setAiInput] = useState("");
  const [voiceLog, setVoiceLog] = useState<string[]>([
    "Open attendance module",
    "Show Grade 6 fee defaulters",
    "Broadcast message to Grade 4 parents",
  ]);

  const activeModule = useMemo(() => modules.find((m) => m.key === moduleKey), [moduleKey]);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.className.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId) ?? students[0];

  const renderModule = () => {
    if (moduleKey === "dashboard") {
      return (
        <div className="grid gap-5 lg:grid-cols-3">
          <ShellCard title="Live Stats">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Total Students", "1,248"],
                ["Attendance Today", "94%"],
                ["Fees Collected", "KES 2.4M"],
                ["Open Alerts", "07"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="text-xl font-bold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
          </ShellCard>
          <ShellCard title="Attendance Chart (4 Weeks)">
            <div className="space-y-3">{[77, 83, 90, 94].map((n, i) => meter(`Week ${i + 1}`, n, "bg-emerald-600"))}</div>
          </ShellCard>
          <ShellCard title="Fee Gauge & Calendar">
            <div className="space-y-3">
              {meter("Fee Target Progress", 80)}
              <ul className="space-y-1 text-sm text-slate-600">
                <li>📅 Apr 6: CBC Workshop</li>
                <li>📅 Apr 11: Mid-term Exams Start</li>
                <li>📅 Apr 15: PTA Meeting</li>
              </ul>
            </div>
          </ShellCard>
          <ShellCard title="Recent Notices">
            <ul className="space-y-2 text-sm text-slate-700">
              <li>🔴 Important: Grade 6 trip consent closes April 7</li>
              <li>🟡 Finance: Term 2 fee reminder sent</li>
              <li>🔵 Academic: New lesson plan template published</li>
            </ul>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "students") {
      return (
        <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
          <ShellCard title="Student Register">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  placeholder="Search name, admission no, class"
                  className="min-w-[220px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
                />
                <button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white">+ Enrol Student</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="pb-2">Admission</th>
                      <th className="pb-2">Name</th>
                      <th className="pb-2">Class</th>
                      <th className="pb-2">Fees</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedStudentId(s.id)}
                        className={`cursor-pointer border-t ${selectedStudentId === s.id ? "bg-indigo-50" : "hover:bg-slate-50"}`}
                      >
                        <td className="py-2">{s.id}</td>
                        <td className="py-2">{s.name}</td>
                        <td className="py-2">{s.className}</td>
                        <td className="py-2">{s.feeStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ShellCard>
          <ShellCard title="Student Profile">
            <div className="space-y-3">
              <div>
                <p className="text-xl font-bold">{selectedStudent.name}</p>
                <p className="text-xs text-slate-500">
                  {selectedStudent.id} • {selectedStudent.className}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {(["info", "results", "attendance"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setProfileTab(tab)}
                    className={`rounded-full px-3 py-1 ${profileTab === tab ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              {profileTab === "info" && (
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>Guardian: {selectedStudent.guardian}</li>
                  <li>Gender: {selectedStudent.gender}</li>
                  <li>Fee Status: {selectedStudent.feeStatus}</li>
                  <li>Transport Route: Route B (North)</li>
                </ul>
              )}
              {profileTab === "results" && <div className="space-y-2">{meter("Overall Average", selectedStudent.avg, "bg-emerald-600")}{meter("Math", 82)}{meter("Science", 78)}</div>}
              {profileTab === "attendance" && <div className="grid grid-cols-7 gap-1">{Array.from({ length: 28 }).map((_, i) => <div key={i} className={`h-6 rounded ${i % 6 === 0 ? "bg-amber-300" : "bg-emerald-500"}`} />)}</div>}
            </div>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "staff") {
      return (
        <div className="grid gap-5 lg:grid-cols-2">
          <ShellCard title="Staff Register & Performance">
            <div className="space-y-4">
              {staff.map((t) => (
                <div key={t.name} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex justify-between text-sm">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-slate-500">{t.role}</p>
                  </div>
                  <p className="mb-2 text-xs text-slate-500">Classes: {t.classes}</p>
                  {meter("Performance", t.perf, "bg-emerald-600")}
                </div>
              ))}
            </div>
          </ShellCard>
          <ShellCard title="Weekly Class Timetable">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th>Day</th>
                    <th>08:00</th>
                    <th>10:00</th>
                    <th>14:00</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Mon", "Math G6", "Science G5", "ICT Lab"],
                    ["Tue", "English G4", "Math G5", "Clubs"],
                    ["Wed", "Science G6", "Kiswahili G3", "Sports"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t">
                      {row.map((c) => (
                        <td key={c} className="py-2">{c}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "attendance") {
      return simpleGrid(
        "Daily Register",
        <ul className="space-y-2 text-sm"><li>🟢 Biometric In: 1,171</li><li>🟡 Manual Entries: 58</li><li>🔴 Absentees: 19 (SMS sent)</li></ul>,
        "Monthly Heatmap",
        <div className="grid grid-cols-10 gap-1">{Array.from({ length: 30 }).map((_, i) => <div key={i} className={`h-5 rounded ${i % 8 === 0 ? "bg-rose-300" : "bg-emerald-500"}`} />)}</div>,
        "Absence Summary",
        <div className="space-y-2">{meter("Grade 3", 91)}{meter("Grade 4", 89)}{meter("Grade 6", 95, "bg-emerald-600")}</div>
      );
    }

    if (moduleKey === "exams") {
      return simpleGrid(
        "Ranked Results",
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th>Rank</th><th>Name</th><th>Class</th><th>Marks</th><th>Grade</th></tr></thead><tbody>{examRows.map((r) => <tr key={r.rank} className="border-t"><td className="py-2">{r.rank}</td><td>{r.name}</td><td>{r.className}</td><td>{r.marks}</td><td>{r.grade}</td></tr>)}</tbody></table></div>,
        "Grade Distribution",
        <div className="space-y-2">{meter("A", 18)}{meter("B", 52, "bg-emerald-600")}{meter("C", 24, "bg-amber-500")}{meter("D", 6, "bg-rose-500")}</div>,
        "Subject Averages",
        <div className="space-y-2">{meter("Math", 76)}{meter("English", 73)}{meter("Science", 79, "bg-emerald-600")}</div>
      );
    }

    if (moduleKey === "curriculum") {
      return simpleGrid("Lesson Plan Tracker", <div className="space-y-2">{meter("Math - Term Coverage", 84)}{meter("Science - Term Coverage", 78)}{meter("English - Term Coverage", 81)}</div>, "Subject Tabs", <p className="text-sm text-slate-700">Math • English • Science • Social Studies • CRE</p>, "Status", <ul className="text-sm space-y-1"><li>✅ 42 plans approved</li><li>🕒 8 pending review</li><li>⚠️ 3 overdue submissions</li></ul>);
    }

    if (moduleKey === "fees") {
      return simpleGrid("M-Pesa Integration", <ul className="text-sm space-y-1"><li>API Status: Connected</li><li>Today Collections: KES 143,500</li><li>Auto Reconciliation: Enabled</li></ul>, "Collection by Class", <div className="space-y-2">{meter("Grade 1", 74)}{meter("Grade 4", 81)}{meter("Grade 6", 89, "bg-emerald-600")}</div>, "Transactions", <ul className="text-sm space-y-1"><li>10:14 AM - MPESAQXZ92 - KES 6,000</li><li>10:40 AM - MPESAPC120 - KES 2,500</li><li>11:05 AM - MPESATK771 - KES 8,200</li></ul>);
    }

    if (moduleKey === "payroll") {
      return simpleGrid("Payroll Ledger", <ul className="text-sm space-y-1"><li>Gross Payroll: KES 1,845,000</li><li>Net Payroll: KES 1,332,000</li><li>Pending Approvals: 3</li></ul>, "Deductions", <div className="space-y-2">{meter("PAYE", 36, "bg-rose-500")}{meter("NHIF", 12, "bg-indigo-600")}{meter("NSSF", 9, "bg-amber-500")}</div>, "Staff Payslip Status", <ul className="text-sm space-y-1"><li>✅ 48 generated</li><li>🕒 6 pending</li><li>📨 22 emailed</li></ul>);
    }

    if (moduleKey === "library") {
      return simpleGrid("Catalogue", <ul className="text-sm space-y-1"><li>Total Books: 4,862</li><li>Available: 4,311</li><li>Issued: 551</li></ul>, "QR Scanner", <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed text-slate-400">QR Scanner Placeholder</div>, "Overdue", <ul className="text-sm space-y-1"><li>22 books overdue</li><li>Top class: Grade 6</li><li>Fine due: KES 3,450</li></ul>);
    }

    if (moduleKey === "transport") {
      return simpleGrid("Live Bus Map", <div className="relative h-32 rounded-lg bg-gradient-to-r from-sky-100 to-indigo-100 p-2"><div className="absolute left-2 top-14 h-4 w-4 animate-pulse rounded-full bg-emerald-500" /><div className="absolute left-1/2 top-10 h-4 w-4 animate-pulse rounded-full bg-indigo-500" /><div className="absolute right-3 top-20 h-4 w-4 animate-pulse rounded-full bg-amber-500" /></div>, "Routes", <ul className="text-sm space-y-1"><li>Route A: 06:45 - 07:25</li><li>Route B: 06:30 - 07:15</li><li>Route C: 06:50 - 07:35</li></ul>, "Notifications", <ul className="text-sm space-y-1"><li>Sent ETA to 59 parents</li><li>1 delay alert broadcast</li><li>All buses online</li></ul>);
    }

    if (moduleKey === "parents") {
      return simpleGrid("Parent Inbox", <ul className="text-sm space-y-1"><li>Unread: 17 messages</li><li>Resolved today: 24 threads</li><li>Avg response: 19 mins</li></ul>, "SMS Broadcast", <div className="space-y-2"><textarea className="h-24 w-full rounded-lg border border-slate-300 p-2 text-sm" defaultValue="Reminder: Mid-term exams begin Monday." /><button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Send Broadcast</button></div>, "Notification Log", <ul className="text-sm space-y-1"><li>10:01 AM - Fee reminder (Grade 5)</li><li>10:35 AM - Bus delay update</li><li>11:09 AM - Exam schedule release</li></ul>);
    }

    if (moduleKey === "notices") {
      return simpleGrid("Colour-Coded Notices", <ul className="space-y-2 text-sm"><li className="rounded bg-rose-50 p-2">Important: Water supply maintenance on Saturday</li><li className="rounded bg-sky-50 p-2">Academic: Science fair projects due next Friday</li><li className="rounded bg-amber-50 p-2">Finance: Fee balance statements updated</li></ul>, "Post Notice", <div className="space-y-2"><input placeholder="Notice title" className="w-full rounded border border-slate-300 px-2 py-2 text-sm" /><textarea placeholder="Write notice..." className="h-20 w-full rounded border border-slate-300 px-2 py-2 text-sm" /><button className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">Publish</button></div>, "Pinned", <ul className="text-sm space-y-1"><li>Term Calendar</li><li>Discipline Guidelines</li><li>Emergency Contacts</li></ul>);
    }

    if (moduleKey === "analytics") {
      return simpleGrid("AI Insights", <ul className="text-sm space-y-1"><li>📌 Grade 4 reading dip detected (-6%)</li><li>📌 Fee risk high in 23 households</li><li>📌 Attendance recovering in Grade 2</li></ul>, "KPI Rings", <div className="grid grid-cols-3 gap-2 text-center text-xs">{[["Performance", "82%"], ["Fees", "80%"], ["Retention", "96%"]].map(([k, v]) => <div key={k} className="rounded-full border-4 border-indigo-200 bg-indigo-50 px-2 py-5"><p>{v}</p><p className="text-slate-500">{k}</p></div>)}</div>, "Trend", <div className="space-y-2">{meter("Term 1", 72)}{meter("Term 2", 78)}{meter("Term 3", 84, "bg-emerald-600")}</div>);
    }

    if (moduleKey === "aiTutor") {
      return simpleGrid("Live Chat", <div className="space-y-2"><div className="rounded bg-slate-100 p-2 text-sm">AI: Hello! Ask for revision tips or quiz questions.</div><div className="rounded bg-indigo-50 p-2 text-sm">Teacher: Generate Grade 6 fractions quiz.</div><div className="flex gap-2"><input value={aiInput} onChange={(e) => setAiInput(e.target.value)} className="flex-1 rounded border border-slate-300 px-2 py-2 text-sm" placeholder="Type prompt..." /><button className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">Send</button></div></div>, "Quiz Module", <ul className="text-sm space-y-1"><li>Auto-generate by subject and level</li><li>Instant marking and feedback</li><li>Printable quiz sheets</li></ul>, "Recommendations", <ul className="text-sm space-y-1"><li>Amina: Focus on science keywords</li><li>Brian: Extra algebra drills</li><li>Fatma: Reading fluency practice</li></ul>);
    }

    if (moduleKey === "gamification") {
      return simpleGrid("Leaderboard", <ol className="text-sm space-y-1"><li>1. Grade 6 Blue - 3,240 pts</li><li>2. Grade 5 Red - 3,010 pts</li><li>3. Grade 4 Green - 2,880 pts</li></ol>, "Progress", <div className="space-y-2">{meter("Grade 6 Blue", 92, "bg-emerald-600")}{meter("Grade 5 Red", 84)}{meter("Grade 4 Green", 79)}</div>, "Badges", <div className="flex flex-wrap gap-2 text-sm"><span className="rounded-full bg-amber-100 px-3 py-1">🏅 Attendance Star</span><span className="rounded-full bg-indigo-100 px-3 py-1">📘 Reading Hero</span><span className="rounded-full bg-emerald-100 px-3 py-1">🧠 Quiz Master</span></div>);
    }

    if (moduleKey === "voice") {
      return simpleGrid("Voice Actions", <div className="space-y-3"><button onClick={() => setVoiceLog((p) => ["Mark all Grade 4 present", ...p])} className="rounded-full bg-rose-600 px-5 py-4 text-white">🎙️ Tap to Simulate Command</button><p className="text-xs text-slate-500">Demo commands: “Open payroll”, “Show fee defaulters”, “Send parent alert”.</p></div>, "Command History", <ul className="text-sm space-y-1">{voiceLog.map((v) => <li key={v}>• {v}</li>)}</ul>, "Execution Status", <ul className="text-sm space-y-1"><li>Speech model: Online</li><li>Language: English / Kiswahili</li><li>Confidence: 96.2%</li></ul>);
    }

    return simpleGrid("School Config", <ul className="text-sm space-y-1"><li>Name: Matondoni Primary</li><li>Academic Year: 2026</li><li>Time Zone: East Africa Time</li></ul>, "Users & 2FA", <ul className="text-sm space-y-1"><li>Admin users: 6</li><li>Staff accounts: 71</li><li>2FA enabled: 64 accounts</li></ul>, "Integrations", <ul className="text-sm space-y-1"><li>M-Pesa: Connected</li><li>SMS Gateway: Connected</li><li>Biometric Device Hub: Healthy</li></ul>);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-80 rounded-2xl bg-slate-900 p-4 text-white shadow-lg lg:block">
          <h1 className="text-xl font-bold">Matondoni Primary</h1>
          <p className="mb-4 text-xs text-slate-300">Smart Management System • v1</p>
          <nav className="space-y-1 overflow-y-auto pr-1">
            {modules.map((module) => (
              <button
                key={module.key}
                onClick={() => setModuleKey(module.key)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  moduleKey === module.key ? "bg-indigo-600" : "text-slate-200 hover:bg-slate-800"
                }`}
              >
                {module.icon} {module.label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 space-y-5">
          <header className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Matondoni Primary Smart Management System</p>
            <h2 className="mt-1 text-2xl font-bold">{activeModule?.label}</h2>
            <p className="text-sm text-slate-600">{activeModule?.hint}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              {modules.map((module) => (
                <button
                  key={module.key}
                  onClick={() => setModuleKey(module.key)}
                  className={`rounded-lg border px-2 py-2 text-xs ${
                    moduleKey === module.key ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white"
                  }`}
                >
                  {module.icon} {module.label}
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

function simpleGrid(
  title1: string,
  content1: React.ReactNode,
  title2: string,
  content2: React.ReactNode,
  title3: string,
  content3: React.ReactNode
) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <ShellCard title={title1}>{content1}</ShellCard>
      <ShellCard title={title2}>{content2}</ShellCard>
      <ShellCard title={title3}>{content3}</ShellCard>
    </div>
  );
}
