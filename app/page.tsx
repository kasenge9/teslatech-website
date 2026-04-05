"use client";

import React, { useEffect, useMemo, useState } from "react";

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
  attendanceRate: number;
};

type Notice = {
  id: string;
  category: "Important" | "Academic" | "Finance" | "Event";
  title: string;
  body: string;
  createdAt: string;
};

type FeeTx = {
  id: string;
  studentId: string;
  amount: number;
  channel: "M-Pesa" | "Cash" | "Bank";
  createdAt: string;
};

type VoiceCommand = {
  id: string;
  command: string;
  status: "Executed" | "Queued";
  createdAt: string;
};

const storageKeys = {
  students: "matondoni.students.v2",
  notices: "matondoni.notices.v2",
  feeTx: "matondoni.feeTx.v2",
  voice: "matondoni.voice.v2",
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

const seedStudents: Student[] = [
  { id: "ADM-0012", name: "Amina Ali", gender: "F", className: "Grade 6", guardian: "Ali Hassan", feeStatus: "Cleared", avg: 84, attendanceRate: 97 },
  { id: "ADM-0021", name: "Brian Mwangi", gender: "M", className: "Grade 5", guardian: "Grace Mwangi", feeStatus: "Partial", avg: 74, attendanceRate: 91 },
  { id: "ADM-0037", name: "Fatma Said", gender: "F", className: "Grade 4", guardian: "Said Omar", feeStatus: "Pending", avg: 68, attendanceRate: 82 },
  { id: "ADM-0045", name: "Kevin Ouma", gender: "M", className: "Grade 6", guardian: "Hellen Ouma", feeStatus: "Cleared", avg: 88, attendanceRate: 98 },
  { id: "ADM-0053", name: "Neema Juma", gender: "F", className: "Grade 3", guardian: "Juma Issa", feeStatus: "Partial", avg: 79, attendanceRate: 94 },
];

const seedNotices: Notice[] = [
  {
    id: "N-1",
    category: "Important",
    title: "Grade 6 trip consent closes soon",
    body: "Signed forms must be submitted by April 7, 2026.",
    createdAt: "2026-04-02 08:20",
  },
  {
    id: "N-2",
    category: "Finance",
    title: "Term 2 fee reminder sent",
    body: "Balance statements were sent through parent SMS channel.",
    createdAt: "2026-04-02 10:05",
  },
];

const seedFeeTx: FeeTx[] = [
  { id: "TX-9382", studentId: "ADM-0021", amount: 6000, channel: "M-Pesa", createdAt: "2026-04-03 10:14" },
  { id: "TX-9383", studentId: "ADM-0053", amount: 2500, channel: "M-Pesa", createdAt: "2026-04-03 10:40" },
  { id: "TX-9384", studentId: "ADM-0037", amount: 8200, channel: "Bank", createdAt: "2026-04-03 11:05" },
];

const seedVoice: VoiceCommand[] = [
  { id: "VC-1", command: "Open attendance module", status: "Executed", createdAt: "09:31" },
  { id: "VC-2", command: "Show Grade 6 fee defaulters", status: "Executed", createdAt: "09:34" },
  { id: "VC-3", command: "Broadcast message to Grade 4 parents", status: "Queued", createdAt: "09:36" },
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

function ShellCard({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
        {action}
      </div>
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

function byNewest<T extends { createdAt: string }>(a: T, b: T) {
  return a.createdAt < b.createdAt ? 1 : -1;
}

export default function Home() {
  const [moduleKey, setModuleKey] = useState<ModuleKey>("dashboard");
  const [studentSearch, setStudentSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(seedStudents[0].id);
  const [profileTab, setProfileTab] = useState<"info" | "results" | "attendance">("info");

  const [students, setStudents] = useState<Student[]>(seedStudents);
  const [notices, setNotices] = useState<Notice[]>(seedNotices);
  const [feeTx, setFeeTx] = useState<FeeTx[]>(seedFeeTx);
  const [voiceLog, setVoiceLog] = useState<VoiceCommand[]>(seedVoice);

  const [showEnroll, setShowEnroll] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: "", gender: "F" as "M" | "F", className: "", guardian: "" });

  const [noticeForm, setNoticeForm] = useState({ category: "Academic" as Notice["category"], title: "", body: "" });

  const [paymentForm, setPaymentForm] = useState({ studentId: seedStudents[0].id, amount: "", channel: "M-Pesa" as FeeTx["channel"] });

  const [aiInput, setAiInput] = useState("");
  const [aiConversation, setAiConversation] = useState<string[]>([
    "AI: Hello! Ask for revision tips or quiz questions.",
    "Teacher: Generate Grade 6 fractions quiz.",
  ]);

  useEffect(() => {
    const rawStudents = localStorage.getItem(storageKeys.students);
    const rawNotices = localStorage.getItem(storageKeys.notices);
    const rawFeeTx = localStorage.getItem(storageKeys.feeTx);
    const rawVoice = localStorage.getItem(storageKeys.voice);

    if (rawStudents) {
      const parsed = JSON.parse(rawStudents) as Student[];
      if (parsed.length > 0) {
        setStudents(parsed);
        setSelectedStudentId(parsed[0].id);
        setPaymentForm((prev) => ({ ...prev, studentId: parsed[0].id }));
      }
    }
    if (rawNotices) setNotices(JSON.parse(rawNotices) as Notice[]);
    if (rawFeeTx) setFeeTx(JSON.parse(rawFeeTx) as FeeTx[]);
    if (rawVoice) setVoiceLog(JSON.parse(rawVoice) as VoiceCommand[]);
  }, []);

  useEffect(() => localStorage.setItem(storageKeys.students, JSON.stringify(students)), [students]);
  useEffect(() => localStorage.setItem(storageKeys.notices, JSON.stringify(notices)), [notices]);
  useEffect(() => localStorage.setItem(storageKeys.feeTx, JSON.stringify(feeTx)), [feeTx]);
  useEffect(() => localStorage.setItem(storageKeys.voice, JSON.stringify(voiceLog)), [voiceLog]);

  const activeModule = useMemo(() => modules.find((m) => m.key === moduleKey), [moduleKey]);

  const filteredStudents = useMemo(
    () =>
      students.filter(
        (s) =>
          s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.id.toLowerCase().includes(studentSearch.toLowerCase()) ||
          s.className.toLowerCase().includes(studentSearch.toLowerCase())
      ),
    [studentSearch, students]
  );

  const selectedStudent = students.find((s) => s.id === selectedStudentId) ?? students[0];

  const feeTotals = useMemo(() => feeTx.reduce((acc, tx) => acc + tx.amount, 0), [feeTx]);
  const pendingFees = useMemo(() => students.filter((s) => s.feeStatus !== "Cleared").length, [students]);

  function enrollStudent() {
    if (!newStudent.name || !newStudent.className || !newStudent.guardian) return;
    const nextId = `ADM-${String(students.length + 1001).slice(-4)}`;
    const record: Student = {
      id: nextId,
      name: newStudent.name,
      gender: newStudent.gender,
      className: newStudent.className,
      guardian: newStudent.guardian,
      feeStatus: "Pending",
      avg: 70,
      attendanceRate: 90,
    };
    setStudents((prev) => [record, ...prev]);
    setSelectedStudentId(record.id);
    setShowEnroll(false);
    setNewStudent({ name: "", gender: "F", className: "", guardian: "" });
  }

  function postNotice() {
    if (!noticeForm.title || !noticeForm.body) return;
    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    const item: Notice = {
      id: `N-${Date.now()}`,
      category: noticeForm.category,
      title: noticeForm.title,
      body: noticeForm.body,
      createdAt: stamp,
    };
    setNotices((prev) => [item, ...prev]);
    setNoticeForm({ category: "Academic", title: "", body: "" });
  }

  function recordPayment() {
    const amount = Number(paymentForm.amount);
    if (!paymentForm.studentId || !amount || amount <= 0) return;
    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    const tx: FeeTx = {
      id: `TX-${Date.now()}`,
      studentId: paymentForm.studentId,
      amount,
      channel: paymentForm.channel,
      createdAt: stamp,
    };
    setFeeTx((prev) => [tx, ...prev]);
    setStudents((prev) => prev.map((s) => (s.id === paymentForm.studentId ? { ...s, feeStatus: "Partial" } : s)));
    setPaymentForm((prev) => ({ ...prev, amount: "" }));
  }

  function simulateVoice() {
    const options = ["Mark all Grade 4 present", "Open payroll module", "Send parent fee reminder"];
    const command = options[Math.floor(Math.random() * options.length)];
    const entry: VoiceCommand = {
      id: `VC-${Date.now()}`,
      command,
      status: "Executed",
      createdAt: new Date().toISOString().slice(11, 16),
    };
    setVoiceLog((prev) => [entry, ...prev]);
  }

  function sendAiPrompt() {
    if (!aiInput.trim()) return;
    const prompt = aiInput.trim();
    setAiConversation((prev) => [
      ...prev,
      `Teacher: ${prompt}`,
      `AI: Generated plan for "${prompt}" with 10-question quiz and remediation tips.`,
    ]);
    setAiInput("");
  }

  const renderModule = () => {
    if (moduleKey === "dashboard") {
      return (
        <div className="grid gap-5 lg:grid-cols-3">
          <ShellCard title="Live Stats">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["Total Students", String(students.length)],
                ["Attendance Today", `${Math.round(students.reduce((acc, s) => acc + s.attendanceRate, 0) / students.length)}%`],
                ["Fees Collected", `KES ${feeTotals.toLocaleString()}`],
                ["Fee Alerts", String(pendingFees)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-slate-100 p-3">
                  <p className="text-xs text-slate-500">{k}</p>
                  <p className="text-xl font-bold text-slate-900">{v}</p>
                </div>
              ))}
            </div>
          </ShellCard>
          <ShellCard title="Attendance Trend (4 Weeks)">
            <div className="space-y-3">{[81, 86, 91, 94].map((n, i) => meter(`Week ${i + 1}`, n, "bg-emerald-600"))}</div>
          </ShellCard>
          <ShellCard title="Recent Notices">
            <ul className="space-y-2 text-sm text-slate-700">
              {notices.slice(0, 5).map((n) => (
                <li key={n.id} className="rounded bg-slate-50 p-2">
                  <p className="font-semibold">{n.category}: {n.title}</p>
                  <p className="text-xs text-slate-500">{n.createdAt}</p>
                </li>
              ))}
            </ul>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "students") {
      return (
        <div className="grid gap-5 xl:grid-cols-[1.2fr_1fr]">
          <ShellCard
            title="Student Register"
            action={<button onClick={() => setShowEnroll(true)} className="rounded-lg bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">+ Enrol Student</button>}
          >
            <div className="space-y-3">
              <input
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                placeholder="Search name, admission no, class"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-indigo-200 focus:ring"
              />
              <div className="max-h-[430px] overflow-auto">
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
            {selectedStudent ? (
              <div className="space-y-3">
                <div>
                  <p className="text-xl font-bold">{selectedStudent.name}</p>
                  <p className="text-xs text-slate-500">{selectedStudent.id} • {selectedStudent.className}</p>
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
                {profileTab === "results" && (
                  <div className="space-y-2">
                    {meter("Overall Average", selectedStudent.avg, "bg-emerald-600")}
                    {meter("Math", Math.min(100, selectedStudent.avg + 4))}
                    {meter("Science", Math.min(100, selectedStudent.avg + 1))}
                  </div>
                )}
                {profileTab === "attendance" && (
                  <div>
                    <div className="mb-2 text-sm text-slate-500">Current rate: {selectedStudent.attendanceRate}%</div>
                    <div className="grid grid-cols-7 gap-1">{Array.from({ length: 28 }).map((_, i) => <div key={i} className={`h-5 rounded ${i % 9 === 0 ? "bg-amber-300" : "bg-emerald-500"}`} />)}</div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No student selected.</p>
            )}
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "fees") {
      return (
        <div className="grid gap-5 lg:grid-cols-3">
          <ShellCard title="M-Pesa & Payment Entry">
            <div className="space-y-2 text-sm">
              <p className="text-emerald-700">API Status: Connected</p>
              <select
                value={paymentForm.studentId}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, studentId: e.target.value }))}
                className="w-full rounded border border-slate-300 px-2 py-2"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.id} - {s.name}</option>
                ))}
              </select>
              <input
                value={paymentForm.amount}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, amount: e.target.value }))}
                placeholder="Amount (KES)"
                className="w-full rounded border border-slate-300 px-2 py-2"
              />
              <select
                value={paymentForm.channel}
                onChange={(e) => setPaymentForm((prev) => ({ ...prev, channel: e.target.value as FeeTx["channel"] }))}
                className="w-full rounded border border-slate-300 px-2 py-2"
              >
                <option>M-Pesa</option>
                <option>Cash</option>
                <option>Bank</option>
              </select>
              <button onClick={recordPayment} className="w-full rounded bg-indigo-600 px-3 py-2 font-semibold text-white">Record Payment</button>
            </div>
          </ShellCard>
          <ShellCard title="Collection by Class">
            <div className="space-y-2">
              {meter("Grade 1", 74)}
              {meter("Grade 4", 81)}
              {meter("Grade 6", 89, "bg-emerald-600")}
            </div>
          </ShellCard>
          <ShellCard title="Transaction Timeline">
            <ul className="space-y-2 text-sm">
              {[...feeTx].sort(byNewest).slice(0, 10).map((tx) => (
                <li key={tx.id} className="rounded bg-slate-50 p-2">
                  <p>{tx.id} • {tx.channel} • KES {tx.amount.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{tx.studentId} • {tx.createdAt}</p>
                </li>
              ))}
            </ul>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "notices") {
      return (
        <div className="grid gap-5 lg:grid-cols-3">
          <ShellCard title="Colour-Coded Notices">
            <ul className="space-y-2 text-sm">
              {[...notices].sort(byNewest).map((n) => (
                <li key={n.id} className={`rounded p-2 ${
                  n.category === "Important"
                    ? "bg-rose-50"
                    : n.category === "Academic"
                      ? "bg-sky-50"
                      : n.category === "Finance"
                        ? "bg-amber-50"
                        : "bg-emerald-50"
                }`}>
                  <p className="font-semibold">{n.category}: {n.title}</p>
                  <p>{n.body}</p>
                  <p className="text-xs text-slate-500">{n.createdAt}</p>
                </li>
              ))}
            </ul>
          </ShellCard>
          <ShellCard title="Post Notice">
            <div className="space-y-2 text-sm">
              <select
                value={noticeForm.category}
                onChange={(e) => setNoticeForm((prev) => ({ ...prev, category: e.target.value as Notice["category"] }))}
                className="w-full rounded border border-slate-300 px-2 py-2"
              >
                <option>Important</option>
                <option>Academic</option>
                <option>Finance</option>
                <option>Event</option>
              </select>
              <input
                placeholder="Notice title"
                value={noticeForm.title}
                onChange={(e) => setNoticeForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full rounded border border-slate-300 px-2 py-2"
              />
              <textarea
                placeholder="Write notice"
                value={noticeForm.body}
                onChange={(e) => setNoticeForm((prev) => ({ ...prev, body: e.target.value }))}
                className="h-28 w-full rounded border border-slate-300 px-2 py-2"
              />
              <button onClick={postNotice} className="rounded bg-indigo-600 px-3 py-2 text-white">Publish</button>
            </div>
          </ShellCard>
          <ShellCard title="Pinned">
            <ul className="space-y-1 text-sm">
              <li>Term Calendar</li>
              <li>Discipline Guidelines</li>
              <li>Emergency Contacts</li>
            </ul>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "aiTutor") {
      return simpleGrid(
        "Live Chat",
        <div className="space-y-2">
          <div className="max-h-48 space-y-1 overflow-auto rounded bg-slate-50 p-2 text-sm">
            {aiConversation.map((line, idx) => (
              <p key={`${line}-${idx}`}>{line}</p>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={aiInput} onChange={(e) => setAiInput(e.target.value)} className="flex-1 rounded border border-slate-300 px-2 py-2 text-sm" placeholder="Type prompt..." />
            <button onClick={sendAiPrompt} className="rounded bg-indigo-600 px-3 py-2 text-sm text-white">Send</button>
          </div>
        </div>,
        "Quiz Module",
        <ul className="text-sm space-y-1"><li>Auto-generate by subject and level</li><li>Instant marking and feedback</li><li>Printable quiz sheets</li></ul>,
        "Recommendations",
        <ul className="text-sm space-y-1"><li>Amina: Focus on science keywords</li><li>Brian: Extra algebra drills</li><li>Fatma: Reading fluency practice</li></ul>
      );
    }

    if (moduleKey === "voice") {
      return simpleGrid(
        "Voice Actions",
        <div className="space-y-3"><button onClick={simulateVoice} className="rounded-full bg-rose-600 px-5 py-4 text-white">🎙️ Tap to Simulate Command</button><p className="text-xs text-slate-500">Demo commands: “Open payroll”, “Show fee defaulters”, “Send parent alert”.</p></div>,
        "Command History",
        <ul className="text-sm space-y-1">{voiceLog.map((v) => <li key={v.id}>• {v.command} <span className="text-xs text-slate-500">({v.status} • {v.createdAt})</span></li>)}</ul>,
        "Execution Status",
        <ul className="text-sm space-y-1"><li>Speech model: Online</li><li>Language: English / Kiswahili</li><li>Confidence: 96.2%</li></ul>
      );
    }

    if (moduleKey === "staff") {
      return (
        <div className="grid gap-5 lg:grid-cols-2">
          <ShellCard title="Staff Register & Performance">
            <div className="space-y-4">
              {staff.map((t) => (
                <div key={t.name} className="rounded-lg bg-slate-50 p-3">
                  <div className="flex justify-between text-sm"><p className="font-semibold">{t.name}</p><p className="text-slate-500">{t.role}</p></div>
                  <p className="mb-2 text-xs text-slate-500">Classes: {t.classes}</p>
                  {meter("Performance", t.perf, "bg-emerald-600")}
                </div>
              ))}
            </div>
          </ShellCard>
          <ShellCard title="Weekly Class Timetable">
            <table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th>Day</th><th>08:00</th><th>10:00</th><th>14:00</th></tr></thead><tbody>{[["Mon", "Math G6", "Science G5", "ICT Lab"], ["Tue", "English G4", "Math G5", "Clubs"], ["Wed", "Science G6", "Kiswahili G3", "Sports"]].map((row) => <tr key={row[0]} className="border-t">{row.map((c) => <td key={c} className="py-2">{c}</td>)}</tr>)}</tbody></table>
          </ShellCard>
        </div>
      );
    }

    if (moduleKey === "attendance") return simpleGrid("Daily Register", <ul className="space-y-2 text-sm"><li>🟢 Biometric In: 1,171</li><li>🟡 Manual Entries: 58</li><li>🔴 Absentees: 19 (SMS sent)</li></ul>, "Monthly Heatmap", <div className="grid grid-cols-10 gap-1">{Array.from({ length: 30 }).map((_, i) => <div key={i} className={`h-5 rounded ${i % 8 === 0 ? "bg-rose-300" : "bg-emerald-500"}`} />)}</div>, "Absence Summary", <div className="space-y-2">{meter("Grade 3", 91)}{meter("Grade 4", 89)}{meter("Grade 6", 95, "bg-emerald-600")}</div>);
    if (moduleKey === "exams") return simpleGrid("Ranked Results", <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left text-slate-500"><th>Rank</th><th>Name</th><th>Class</th><th>Marks</th><th>Grade</th></tr></thead><tbody>{examRows.map((r) => <tr key={r.rank} className="border-t"><td className="py-2">{r.rank}</td><td>{r.name}</td><td>{r.className}</td><td>{r.marks}</td><td>{r.grade}</td></tr>)}</tbody></table></div>, "Grade Distribution", <div className="space-y-2">{meter("A", 18)}{meter("B", 52, "bg-emerald-600")}{meter("C", 24, "bg-amber-500")}{meter("D", 6, "bg-rose-500")}</div>, "Subject Averages", <div className="space-y-2">{meter("Math", 76)}{meter("English", 73)}{meter("Science", 79, "bg-emerald-600")}</div>);
    if (moduleKey === "curriculum") return simpleGrid("Lesson Plan Tracker", <div className="space-y-2">{meter("Math - Term Coverage", 84)}{meter("Science - Term Coverage", 78)}{meter("English - Term Coverage", 81)}</div>, "Subject Tabs", <p className="text-sm text-slate-700">Math • English • Science • Social Studies • CRE</p>, "Status", <ul className="text-sm space-y-1"><li>✅ 42 plans approved</li><li>🕒 8 pending review</li><li>⚠️ 3 overdue submissions</li></ul>);
    if (moduleKey === "payroll") return simpleGrid("Payroll Ledger", <ul className="text-sm space-y-1"><li>Gross Payroll: KES 1,845,000</li><li>Net Payroll: KES 1,332,000</li><li>Pending Approvals: 3</li></ul>, "Deductions", <div className="space-y-2">{meter("PAYE", 36, "bg-rose-500")}{meter("NHIF", 12, "bg-indigo-600")}{meter("NSSF", 9, "bg-amber-500")}</div>, "Staff Payslip Status", <ul className="text-sm space-y-1"><li>✅ 48 generated</li><li>🕒 6 pending</li><li>📨 22 emailed</li></ul>);
    if (moduleKey === "library") return simpleGrid("Catalogue", <ul className="text-sm space-y-1"><li>Total Books: 4,862</li><li>Available: 4,311</li><li>Issued: 551</li></ul>, "QR Scanner", <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed text-slate-400">QR Scanner Placeholder</div>, "Overdue", <ul className="text-sm space-y-1"><li>22 books overdue</li><li>Top class: Grade 6</li><li>Fine due: KES 3,450</li></ul>);
    if (moduleKey === "transport") return simpleGrid("Live Bus Map", <div className="relative h-32 rounded-lg bg-gradient-to-r from-sky-100 to-indigo-100 p-2"><div className="absolute left-2 top-14 h-4 w-4 animate-pulse rounded-full bg-emerald-500" /><div className="absolute left-1/2 top-10 h-4 w-4 animate-pulse rounded-full bg-indigo-500" /><div className="absolute right-3 top-20 h-4 w-4 animate-pulse rounded-full bg-amber-500" /></div>, "Routes", <ul className="text-sm space-y-1"><li>Route A: 06:45 - 07:25</li><li>Route B: 06:30 - 07:15</li><li>Route C: 06:50 - 07:35</li></ul>, "Notifications", <ul className="text-sm space-y-1"><li>Sent ETA to 59 parents</li><li>1 delay alert broadcast</li><li>All buses online</li></ul>);
    if (moduleKey === "parents") return simpleGrid("Parent Inbox", <ul className="text-sm space-y-1"><li>Unread: 17 messages</li><li>Resolved today: 24 threads</li><li>Avg response: 19 mins</li></ul>, "SMS Broadcast", <div className="space-y-2"><textarea className="h-24 w-full rounded-lg border border-slate-300 p-2 text-sm" defaultValue="Reminder: Mid-term exams begin Monday." /><button className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white">Send Broadcast</button></div>, "Notification Log", <ul className="text-sm space-y-1"><li>10:01 AM - Fee reminder (Grade 5)</li><li>10:35 AM - Bus delay update</li><li>11:09 AM - Exam schedule release</li></ul>);
    if (moduleKey === "analytics") return simpleGrid("AI Insights", <ul className="text-sm space-y-1"><li>📌 Grade 4 reading dip detected (-6%)</li><li>📌 Fee risk high in 23 households</li><li>📌 Attendance recovering in Grade 2</li></ul>, "KPI Rings", <div className="grid grid-cols-3 gap-2 text-center text-xs">{[["Performance", "82%"], ["Fees", "80%"], ["Retention", "96%"]].map(([k, v]) => <div key={k} className="rounded-full border-4 border-indigo-200 bg-indigo-50 px-2 py-5"><p>{v}</p><p className="text-slate-500">{k}</p></div>)}</div>, "Trend", <div className="space-y-2">{meter("Term 1", 72)}{meter("Term 2", 78)}{meter("Term 3", 84, "bg-emerald-600")}</div>);

    return simpleGrid("School Config", <ul className="text-sm space-y-1"><li>Name: Matondoni Primary</li><li>Academic Year: 2026</li><li>Time Zone: East Africa Time</li></ul>, "Users & 2FA", <ul className="text-sm space-y-1"><li>Admin users: 6</li><li>Staff accounts: 71</li><li>2FA enabled: 64 accounts</li></ul>, "Integrations", <ul className="text-sm space-y-1"><li>M-Pesa: Connected</li><li>SMS Gateway: Connected</li><li>Biometric Device Hub: Healthy</li></ul>);
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        <aside className="sticky top-4 hidden h-[calc(100vh-2rem)] w-80 rounded-2xl bg-slate-900 p-4 text-white shadow-lg lg:block">
          <h1 className="text-xl font-bold">Matondoni Primary</h1>
          <p className="mb-4 text-xs text-slate-300">Smart Management System • Software File v2</p>
          <nav className="space-y-1 overflow-y-auto pr-1">
            {modules.map((module) => (
              <button
                key={module.key}
                onClick={() => setModuleKey(module.key)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${moduleKey === module.key ? "bg-indigo-600" : "text-slate-200 hover:bg-slate-800"}`}
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
                  className={`rounded-lg border px-2 py-2 text-xs ${moduleKey === module.key ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 bg-white"}`}
                >
                  {module.icon} {module.label}
                </button>
              ))}
            </div>
          </header>
          {renderModule()}
        </section>
      </div>

      {showEnroll && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg">
            <h3 className="mb-3 text-lg font-bold">New Student Enrollment</h3>
            <div className="space-y-2 text-sm">
              <input value={newStudent.name} onChange={(e) => setNewStudent((p) => ({ ...p, name: e.target.value }))} placeholder="Student name" className="w-full rounded border border-slate-300 px-2 py-2" />
              <input value={newStudent.className} onChange={(e) => setNewStudent((p) => ({ ...p, className: e.target.value }))} placeholder="Class (e.g. Grade 4)" className="w-full rounded border border-slate-300 px-2 py-2" />
              <input value={newStudent.guardian} onChange={(e) => setNewStudent((p) => ({ ...p, guardian: e.target.value }))} placeholder="Guardian name" className="w-full rounded border border-slate-300 px-2 py-2" />
              <select value={newStudent.gender} onChange={(e) => setNewStudent((p) => ({ ...p, gender: e.target.value as "M" | "F" }))} className="w-full rounded border border-slate-300 px-2 py-2"><option value="F">Female</option><option value="M">Male</option></select>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowEnroll(false)} className="rounded border border-slate-300 px-3 py-2">Cancel</button>
              <button onClick={enrollStudent} className="rounded bg-indigo-600 px-3 py-2 text-white">Save Student</button>
            </div>
          </div>
        </div>
      )}
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
