import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Calendar,
  AlertTriangle,
  Activity,
  Plug,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ChevronRight,
  X,
  Sparkles,
  ArrowUpRight,
  Settings,
  Users,
  LayoutDashboard,
  Link as LinkIcon,
  BadgeCheck,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// SIMPLE DEMO COMPONENTS (to avoid missing UI libs)

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl ${className}`}>{children}</div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={`font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ className = "", variant, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-xl ${
      variant === "outline"
        ? "border border-white/20"
        : "bg-white/10"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ className = "", children }) => (
  <span className={`text-xs px-2 py-1 rounded-full ${className}`}>
    {children}
  </span>
);

const Input = (props) => (
  <input
    {...props}
    className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
  />
);

const Progress = ({ value = 0 }) => (
  <div className="w-full h-2 bg-white/10 rounded-full">
    <div
      className="h-2 bg-white/30 rounded-full"
      style={{ width: `${value}%` }}
    />
  </div>
);


const cn = (...classes) => classes.filter(Boolean).join(" ");

function GlowBg() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-emerald-400/15 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,23,42,0.65),rgba(2,6,23,0.98))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.1),rgba(2,6,23,0.85))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:18px_18px]" />
    </div>
  );
}

function GlassCard({ className, children }) {
  return (
    <Card
      className={cn(
        "rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]",
        className
      )}
    >
      {children}
    </Card>
  );
}

function Pill({ icon: Icon, label, tone = "neutral" }) {
  const toneMap = {
    neutral: "bg-white/5 text-slate-200 border-white/10",
    good: "bg-emerald-500/10 text-emerald-200 border-emerald-500/20",
    warn: "bg-amber-500/10 text-amber-200 border-amber-500/20",
    bad: "bg-rose-500/10 text-rose-200 border-rose-500/20",
    info: "bg-cyan-500/10 text-cyan-200 border-cyan-500/20",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        toneMap[tone]
      )}
    >
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {label}
    </span>
  );
}

function MetricCard({ title, value, sub, icon: Icon, tone = "neutral", trend }) {
  const toneStyles = {
    neutral: "from-white/10 to-white/0",
    good: "from-emerald-500/20 to-white/0",
    warn: "from-amber-500/20 to-white/0",
    bad: "from-rose-500/20 to-white/0",
    info: "from-cyan-500/20 to-white/0",
  };
  const valueStyles = {
    neutral: "text-white",
    good: "text-emerald-200",
    warn: "text-amber-200",
    bad: "text-rose-200",
    info: "text-cyan-200",
  };

  return (
    <GlassCard className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-100",
          toneStyles[tone]
        )}
      />
      <div className="absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_55%)]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:26px_26px]" />
      </div>
      <CardContent className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">{title}</p>
            <div className="mt-2 flex items-baseline gap-2">
              <p className={cn("text-3xl font-semibold", valueStyles[tone])}>
                {value}
              </p>
              {trend ? (
                <span className="text-xs text-slate-300">{trend}</span>
              ) : null}
            </div>
            {sub ? <p className="mt-2 text-xs text-slate-400">{sub}</p> : null}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <Icon className="h-5 w-5 text-slate-200" />
          </div>
        </div>
      </CardContent>
    </GlassCard>
  );
}

function SeverityBadge({ severity }) {
  const map = {
    High: { tone: "bad", label: "High priority" },
    Medium: { tone: "warn", label: "Needs attention" },
    Low: { tone: "info", label: "Monitor" },
  };
  const s = map[severity] || map.Low;
  return <Pill icon={AlertTriangle} label={s.label} tone={s.tone} />;
}

function Drawer({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-hidden border-l border-white/10 bg-slate-950/70 backdrop-blur-2xl"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-xs text-slate-400">CareOps Cloud</p>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                onClick={onClose}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
            <div className="h-[calc(100%-78px)] overflow-auto p-6">{children}</div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ConnectModal({ open, onClose }) {
  const [stage, setStage] = useState("choose"); // choose | connecting | done
  const [progress, setProgress] = useState(10);

  const systems = [
    { name: "Cliniko", desc: "Allied health (fastest one-click)", badge: "Native" },
    { name: "Halaxy", desc: "Allied health / mixed practices", badge: "Native" },
    { name: "PowerDiary", desc: "Allied health / psych / bookings", badge: "Native" },
    { name: "Best Practice", desc: "GP clinics (via export until native)", badge: "Export" },
    { name: "MedicalDirector", desc: "GP clinics (via export until native)", badge: "Export" },
    { name: "Other system", desc: "Use CSV or scheduled report email", badge: "Universal" },
  ];

  const startConnect = () => {
    setStage("connecting");
    setProgress(12);
    const steps = [28, 46, 62, 78, 92, 100];
    steps.forEach((p, idx) =>
      setTimeout(() => {
        setProgress(p);
        if (p === 100) setStage("done");
      }, 450 + idx * 450)
    );
  };

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl backdrop-blur-2xl"
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-200" />
                  <p className="text-xs text-slate-400">
                    One-time clinic connection (read-only)
                  </p>
                </div>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  Connect your practice system
                </h3>
                <p className="mt-2 text-sm text-slate-300">
                  CareOps Cloud monitors operational signals only. No clinical notes.
                  Disconnect anytime.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                onClick={onClose}
              >
                <X className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>

            <div className="p-6">
              {stage === "choose" ? (
                <>
                  <div className="grid grid-cols-1 gap-3">
                    {systems.map((s) => (
                      <button
                        key={s.name}
                        onClick={startConnect}
                        className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-white">{s.name}</p>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200">
                              {s.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-slate-300">{s.desc}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-slate-400 transition group-hover:text-slate-200" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Pill icon={ShieldCheck} label="Read-only access" tone="good" />
                    <Pill icon={BadgeCheck} label="Audit trail" tone="info" />
                    <Pill icon={Users} label="Role-based access" tone="neutral" />
                  </div>
                </>
              ) : stage === "connecting" ? (
                <>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          Connecting securely…
                        </p>
                        <p className="mt-1 text-sm text-slate-300">
                          We are syncing appointments and workflow signals.
                        </p>
                      </div>
                      <Pill icon={LinkIcon} label="Secure link" tone="info" />
                    </div>
                    <div className="mt-4">
                      <Progress value={progress} />
                      <p className="mt-2 text-xs text-slate-400">
                        {progress < 45
                          ? "Verifying access"
                          : progress < 80
                          ? "Syncing the next 7 days"
                          : progress < 100
                          ? "Finalising"
                          : "Done"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 text-xs text-slate-400">
                    Tip: You can disconnect any time in Settings → Integrations.
                  </div>
                </>
              ) : (
                <>
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-6 w-6 text-emerald-200" />
                      <div>
                        <p className="text-sm font-medium text-white">Connected</p>
                        <p className="mt-1 text-sm text-slate-200">
                          Your clinic is now linked. CareOps Cloud will monitor in the
                          background.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <Button className="rounded-2xl" onClick={onClose}>
                      Go to dashboard
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

export default function CareOpsDashboard() {
  const [connectOpen, setConnectOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedAlertId, setSelectedAlertId] = useState("A1010");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const alerts = useMemo(
    () => [
      {
        id: "A1005",
        title: "Unconfirmed long consult — Dr Carter (10:00)",
        subtitle: "High no-show risk: long slot + no response",
        severity: "High",
        type: "No-show risk",
        eta: "Today",
        owner: "Reception",
        rationale: [
          "No response to confirmation",
          "Long consult (30 min)",
          "Booked late (previous evening)",
        ],
        suggested: [
          "Call patient to confirm",
          "If no response, offer slot to waitlist",
        ],
      },
      {
        id: "A1002",
        title: "Follow-up flagged — consult completed (09:15)",
        subtitle: "Follow-up required but no workflow action recorded",
        severity: "Medium",
        type: "Follow-up gap",
        eta: "Within 24h",
        owner: "Practice manager",
        rationale: [
          "Follow-up required = Yes",
          "No follow-up action logged",
          "72h since completion threshold approaching",
        ],
        suggested: [
          "Create recall task",
          "Assign to provider for review",
        ],
      },
      {
        id: "A1010",
        title: "Same-day booking — unconfirmed (14:00)",
        subtitle: "No response yet; confirm to protect the slot",
        severity: "Low",
        type: "Confirmation",
        eta: "Next 3h",
        owner: "Reception",
        rationale: [
          "Booked this morning",
          "No response yet",
          "Routine slot (15 min)",
        ],
        suggested: ["Send quick confirmation SMS", "No further action if confirmed"],
      },
    ],
    []
  );

  const selected = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  const filteredAlerts = alerts.filter((a) => {
    const matchesSearch =
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || a.severity === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <GlowBg />

      <div className="relative mx-auto flex max-w-7xl gap-6 p-6">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400">Workspace</p>
                  <p className="mt-1 text-lg font-semibold text-white">
                    CareOps Cloud
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Clinic Ops • No clinical data
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                  <Sparkles className="h-4 w-4 text-cyan-200" />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Pill icon={ShieldCheck} label="Read-only" tone="good" />
                <Pill icon={BadgeCheck} label="Audited" tone="info" />
              </div>
            </div>

            <nav className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <button className="flex w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left">
                <LayoutDashboard className="h-4 w-4" />
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              <button className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-300 hover:bg-white/10 hover:text-white">
                <Bell className="h-4 w-4" />
                <span className="text-sm">Alerts</span>
              </button>
              <button className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-300 hover:bg-white/10 hover:text-white">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Today</span>
              </button>
              <button className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-slate-300 hover:bg-white/10 hover:text-white">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Settings</span>
              </button>
            </nav>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <p className="text-sm font-medium text-white">Integration</p>
              <p className="mt-1 text-xs text-slate-400">
                Connect once at the clinic level.
              </p>
              <Button
                className="mt-4 w-full rounded-2xl"
                onClick={() => setConnectOpen(true)}
              >
                <Plug className="mr-2 h-4 w-4" />
                Connect system
              </Button>
              <Button
                variant="outline"
                className="mt-2 w-full rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
                onClick={() => setConnectOpen(true)}
              >
                View options
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">
                Operations dashboard
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                Quiet monitoring. Clear priorities. Your clinical software stays the
                same.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search alerts, types…"
                  className="h-11 rounded-2xl border-white/10 bg-white/5 pl-10 text-slate-100 placeholder:text-slate-500"
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="h-11 w-[170px] rounded-2xl border-white/10 bg-white/5 text-slate-100">
                  <Filter className="mr-2 h-4 w-4 text-slate-400" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All priorities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                className="h-11 rounded-2xl"
                onClick={() => setConnectOpen(true)}
              >
                <Plug className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <MetricCard
              title="Today’s appointments"
              value="42"
              sub="Across 3 providers"
              icon={Calendar}
              tone="neutral"
              trend="+6 vs last Thu"
            />
            <MetricCard
              title="High-risk no-shows"
              value="3"
              sub="Priority: confirm now"
              icon={AlertTriangle}
              tone="warn"
              trend="Protect ~90 mins"
            />
            <MetricCard
              title="Follow-ups missing"
              value="2"
              sub="Needs action in 24h"
              icon={Bell}
              tone="bad"
              trend="Reduce gaps"
            />
            <MetricCard
              title="Automation health"
              value="Good"
              sub="Sync running normally"
              icon={Activity}
              tone="good"
              trend="Last sync: 9 min"
            />
          </div>

          {/* Alerts + Details */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            <GlassCard className="lg:col-span-3">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-white">Priority alerts</CardTitle>
                    <p className="mt-1 text-sm text-slate-300">
                      Only the items most likely to cause loss or disruption.
                    </p>
                  </div>
                  <Badge className="rounded-full border border-white/10 bg-white/5 text-slate-200">
                    {filteredAlerts.length} showing
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-white/10">
                  {filteredAlerts.map((a) => {
                    const active = a.id === selectedAlertId;
                    return (
                      <button
                        key={a.id}
                        onClick={() => {
                          setSelectedAlertId(a.id);
                          setDrawerOpen(true);
                        }}
                        className={cn(
                          "w-full text-left transition",
                          active ? "bg-white/10" : "hover:bg-white/5"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4 px-6 py-5">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate font-medium text-white">
                                {a.title}
                              </p>
                              <SeverityBadge severity={a.severity} />
                              <Pill icon={Clock} label={a.eta} tone="neutral" />
                            </div>
                            <p className="mt-2 text-sm text-slate-300">
                              {a.subtitle}
                            </p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <Pill icon={Bell} label={a.type} tone="info" />
                              <Pill icon={Users} label={a.owner} tone="neutral" />
                            </div>
                          </div>
                          <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-slate-400" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </GlassCard>

            <GlassCard className="lg:col-span-2">
              <CardHeader className="border-b border-white/10">
                <CardTitle className="text-white">What CareOps does</CardTitle>
                <p className="mt-1 text-sm text-slate-300">
                  Simple, predictable operations oversight.
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="how" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 rounded-2xl border border-white/10 bg-white/5">
                    <TabsTrigger value="how">How</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                    <TabsTrigger value="trust">Trust</TabsTrigger>
                  </TabsList>

                  <TabsContent value="how" className="mt-4">
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                            <Plug className="h-4 w-4 text-slate-200" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Connect once</p>
                            <p className="mt-1 text-sm text-slate-300">
                              Practice manager authorises a read-only connection.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                            <Activity className="h-4 w-4 text-slate-200" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Monitor quietly</p>
                            <p className="mt-1 text-sm text-slate-300">
                              We track appointments, status changes, and timing.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                            <Bell className="h-4 w-4 text-slate-200" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Alert only when it matters</p>
                            <p className="mt-1 text-sm text-slate-300">
                              Staff focus on the 2–3 actions that protect the day.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="rules" className="mt-4">
                    <div className="space-y-3">
                      <p className="text-sm text-slate-300">
                        No black boxes. Clear rules your clinic can understand.
                      </p>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">No-show risk</p>
                        <p className="mt-1 text-sm text-slate-300">
                          Prioritises long slots + no response + late booking.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">Follow-up gaps</p>
                        <p className="mt-1 text-sm text-slate-300">
                          Flags when follow-up required but no action is recorded.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">Revenue leakage</p>
                        <p className="mt-1 text-sm text-slate-300">
                          Highlights completed appointments that remain unbilled.
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="trust" className="mt-4">
                    <div className="space-y-3">
                      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                        <div className="flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-emerald-200" />
                          <div>
                            <p className="text-sm font-medium text-white">
                              No clinical notes stored
                            </p>
                            <p className="mt-1 text-sm text-slate-200">
                              CareOps reads operational signals only.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">Audit trail</p>
                        <p className="mt-1 text-sm text-slate-300">
                          Every sync and alert is logged for transparency.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">Disconnect anytime</p>
                        <p className="mt-1 text-sm text-slate-300">
                          The clinic controls access at all times.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </GlassCard>
          </div>

          {/* Mobile-only footer nav hint */}
          <div className="mt-8 flex flex-col gap-3 md:hidden">
            <Button className="rounded-2xl" onClick={() => setConnectOpen(true)}>
              <Plug className="mr-2 h-4 w-4" />
              Connect practice system
            </Button>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Tip: Tap any alert to see why it was flagged and the suggested next
              step.
            </div>
          </div>
        </main>
      </div>

      {/* Alert drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selected?.title || "Alert"}
      >
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <SeverityBadge severity={selected.severity} />
            <Pill icon={Bell} label={selected.type} tone="info" />
            <Pill icon={Clock} label={selected.eta} tone="neutral" />
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Why this was flagged</p>
            <ul className="mt-3 space-y-2">
              {selected.rationale.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-200" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Suggested next step</p>
            <ul className="mt-3 space-y-2">
              {selected.suggested.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-slate-200">
                  <ChevronRight className="mt-0.5 h-4 w-4 text-slate-300" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button className="rounded-2xl">
                Mark as handled
                <CheckCircle2 className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                Add note
              </Button>
              <Button
                variant="outline"
                className="rounded-2xl border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
              >
                View related appointments
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-emerald-200" />
              <div>
                <p className="text-sm font-medium text-white">Privacy by design</p>
                <p className="mt-1 text-sm text-slate-200">
                  This alert is generated from operational signals only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Connect modal */}
      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  );
}

export default CareOpsDashboard;
