import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Plus,
  SlidersHorizontal,
  RefreshCw,
  MessageSquare,
  Copy,
  ExternalLink,
  Check,
} from "lucide-react";

/* ---------------------------
   SIMPLE DEMO COMPONENTS
---------------------------- */

const cn = (...classes) => classes.filter(Boolean).join(" ");

const Card = ({ className = "", children }) => (
  <div
    className={cn(
      "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl",
      className
    )}
  >
    {children}
  </div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={cn("px-6 py-5", className)}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={cn("text-lg font-semibold text-white", className)}>
    {children}
  </h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={cn("p-6", className)}>{children}</div>
);

const Button = ({
  className = "",
  variant,
  size = "md",
  children,
  ...props
}) => (
  <button
    className={cn(
      "inline-flex items-center justify-center gap-2 rounded-2xl text-sm font-medium transition outline-none",
      size === "sm" ? "px-3 py-2" : "px-4 py-2",
      variant === "outline"
        ? "border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10"
        : variant === "danger"
        ? "bg-rose-500/15 text-rose-100 hover:bg-rose-500/25"
        : "bg-white/10 text-white hover:bg-white/15",
      "active:scale-[0.99]",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

const Badge = ({ className = "", children }) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200",
      className
    )}
  >
    {children}
  </span>
);

const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={cn(
      "h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-3 text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20 focus:bg-white/10",
      className
    )}
  />
);

const Textarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={cn(
      "min-h-[96px] w-full resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-slate-100 placeholder:text-slate-500 outline-none focus:border-white/20 focus:bg-white/10",
      className
    )}
  />
);

const Progress = ({ value = 0 }) => (
  <div className="w-full overflow-hidden rounded-full bg-white/10">
    <div
      className="h-2 rounded-full bg-white/30"
      style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
    />
  </div>
);

/* ---------------------------
   UTIL + SMALL UI
---------------------------- */

function useHotkeys(map) {
  useEffect(() => {
    const onKeyDown = (e) => {
      const key = [];
      if (e.ctrlKey || e.metaKey) key.push("mod");
      if (e.shiftKey) key.push("shift");
      if (e.altKey) key.push("alt");
      key.push(e.key.toLowerCase());
      const combo = key.join("+");
      if (map[combo]) {
        e.preventDefault();
        map[combo]();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [map]);
}

function Toast({ toasts, dismiss }) {
  return (
    <div className="fixed bottom-6 right-6 z-[60] flex w-[92vw] max-w-sm flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className={cn(
              "rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-2xl backdrop-blur-2xl",
              t.tone === "good" && "border-emerald-500/20 bg-emerald-500/10",
              t.tone === "warn" && "border-amber-500/20 bg-amber-500/10",
              t.tone === "bad" && "border-rose-500/20 bg-rose-500/10"
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{t.title}</p>
                {t.message ? (
                  <p className="mt-1 text-sm text-slate-200">{t.message}</p>
                ) : null}
              </div>
              <button
                className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 hover:bg-white/10"
                onClick={() => dismiss(t.id)}
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Segmented({ value, onChange, items }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
      {items.map((it) => (
        <button
          key={it.value}
          onClick={() => onChange(it.value)}
          className={cn(
            "rounded-xl px-3 py-2 text-sm transition",
            value === it.value
              ? "bg-white/10 text-white"
              : "text-slate-300 hover:bg-white/10 hover:text-white"
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

/* ---------------------------
   VISUALS
---------------------------- */

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

function SeverityBadge({ severity }) {
  const map = {
    High: { tone: "bad", label: "High priority" },
    Medium: { tone: "warn", label: "Needs attention" },
    Low: { tone: "info", label: "Monitor" },
  };
  const s = map[severity] || map.Low;
  return <Pill icon={AlertTriangle} label={s.label} tone={s.tone} />;
}

function MetricCard({
  title,
  value,
  sub,
  icon: Icon,
  tone = "neutral",
  trend,
  onClick,
}) {
  const valueStyles = {
    neutral: "text-white",
    good: "text-emerald-200",
    warn: "text-amber-200",
    bad: "text-rose-200",
    info: "text-cyan-200",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="text-left"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <Card className="relative overflow-hidden shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
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
      </Card>
    </motion.button>
  );
}

/* ---------------------------
   DRAWER + MODALS
---------------------------- */

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
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
            <div className="h-[calc(100%-78px)] overflow-auto p-6">
              {children}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function Modal({ open, onClose, title, subtitle, children, footer }) {
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
                <h3 className="text-xl font-semibold text-white">{title}</h3>
                {subtitle ? (
                  <p className="mt-2 text-sm text-slate-300">{subtitle}</p>
                ) : null}
              </div>
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4" />
                Close
              </Button>
            </div>
            <div className="p-6">{children}</div>
            {footer ? (
              <div className="border-t border-white/10 px-6 py-5">{footer}</div>
            ) : null}
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
      }, 420 + idx * 420)
    );
  };

  useEffect(() => {
    if (!open) {
      setStage("choose");
      setProgress(10);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Connect your practice system"
      subtitle="CareOps Cloud monitors operational signals only. No clinical notes. Disconnect anytime."
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Pill icon={ShieldCheck} label="Read-only access" tone="good" />
            <Pill icon={BadgeCheck} label="Audit trail" tone="info" />
            <Pill icon={Users} label="Role-based access" tone="neutral" />
          </div>
          <div className="text-xs text-slate-400">Shortcut: Ctrl/⌘ + K</div>
        </div>
      }
    >
      {stage === "choose" ? (
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
      ) : stage === "connecting" ? (
        <>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Connecting securely…</p>
                <p className="mt-1 text-sm text-slate-300">
                  Syncing operational signals (appointments + confirmations).
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
                  Your clinic is now linked. CareOps Cloud will monitor in the background.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <Button onClick={onClose}>
              Go to dashboard <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}

/* ---------------------------
   MAIN APP
---------------------------- */

const SEV_ORDER = { High: 3, Medium: 2, Low: 1 };

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export default function CareOpsDashboard() {
  const [connectOpen, setConnectOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState("Priority"); // Priority | ETA | Newest
  const [infoTab, setInfoTab] = useState("how"); // how | rules | trust

  const [toasts, setToasts] = useState([]);
  const toastTimer = useRef(null);

  const [kpiMode, setKpiMode] = useState("Summary"); // Summary | Revenue | Capacity

  const [alerts, setAlerts] = useState(() => [
    {
      id: "A1005",
      createdAt: Date.now() - 1000 * 60 * 42,
      title: "Unconfirmed long consult — Dr Carter (10:00)",
      subtitle: "High no-show risk: long slot + no response",
      severity: "High",
      type: "No-show risk",
      eta: "Today",
      owner: "Reception",
      status: "Open", // Open | Handled
      rationale: ["No response to confirmation", "Long consult (30 min)", "Booked late (previous evening)"],
      suggested: ["Call patient to confirm", "If no response, offer slot to waitlist"],
    },
    {
      id: "A1002",
      createdAt: Date.now() - 1000 * 60 * 90,
      title: "Follow-up flagged — consult completed (09:15)",
      subtitle: "Follow-up required but no workflow action recorded",
      severity: "Medium",
      type: "Follow-up gap",
      eta: "Within 24h",
      owner: "Practice manager",
      status: "Open",
      rationale: ["Follow-up required = Yes", "No follow-up action logged", "72h since completion threshold approaching"],
      suggested: ["Create recall task", "Assign to provider for review"],
    },
    {
      id: "A1010",
      createdAt: Date.now() - 1000 * 60 * 14,
      title: "Same-day booking — unconfirmed (14:00)",
      subtitle: "No response yet; confirm to protect the slot",
      severity: "Low",
      type: "Confirmation",
      eta: "Next 3h",
      owner: "Reception",
      status: "Open",
      rationale: ["Booked this morning", "No response yet", "Routine slot (15 min)"],
      suggested: ["Send quick confirmation SMS", "No further action if confirmed"],
    },
  ]);

  const [selectedAlertId, setSelectedAlertId] = useState("A1010");
  const selected = alerts.find((a) => a.id === selectedAlertId) || alerts[0];

  const [notesById, setNotesById] = useState({});
  const [noteDraft, setNoteDraft] = useState("");

  // "demo simulation"
  const [lastSyncMins, setLastSyncMins] = useState(9);
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  // Create alert form
  const [newAlert, setNewAlert] = useState({
    title: "",
    subtitle: "",
    severity: "Medium",
    type: "Confirmation",
    eta: "Today",
    owner: "Reception",
  });

  const allTypes = useMemo(() => {
    const set = new Set(alerts.map((a) => a.type));
    return ["All", ...Array.from(set)];
  }, [alerts]);

  const pushToast = (t) => {
    const id = uid();
    setToasts((prev) => [{ id, ...t }, ...prev].slice(0, 4));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToasts((prev) => prev.slice(0, Math.max(0, prev.length - 1)));
    }, 3200);
  };

  const dismissToast = (id) => setToasts((prev) => prev.filter((x) => x.id !== id));

  const filteredAlerts = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = alerts.filter((a) => {
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q) ||
        a.owner.toLowerCase().includes(q);
      const matchesSeverity = severityFilter === "All" || a.severity === severityFilter;
      const matchesType = typeFilter === "All" || a.type === typeFilter;
      return matchesSearch && matchesSeverity && matchesType;
    });

    if (sort === "Priority") {
      list = list.slice().sort((a, b) => {
        // Open first, then severity
        if (a.status !== b.status) return a.status === "Open" ? -1 : 1;
        return (SEV_ORDER[b.severity] || 0) - (SEV_ORDER[a.severity] || 0);
      });
    } else if (sort === "Newest") {
      list = list.slice().sort((a, b) => b.createdAt - a.createdAt);
    } else if (sort === "ETA") {
      const score = (eta) => {
        if (!eta) return 99;
        const x = eta.toLowerCase();
        if (x.includes("next")) return 1;
        if (x.includes("today")) return 2;
        if (x.includes("24")) return 3;
        return 9;
      };
      list = list.slice().sort((a, b) => score(a.eta) - score(b.eta));
    }

    return list;
  }, [alerts, search, severityFilter, typeFilter, sort]);

  const stats = useMemo(() => {
    const open = alerts.filter((a) => a.status === "Open");
    const high = open.filter((a) => a.severity === "High").length;
    const medium = open.filter((a) => a.severity === "Medium").length;
    const low = open.filter((a) => a.severity === "Low").length;

    // totally fake demo metrics that react to alert handling
    const todayAppts = 42;
    const atRiskSlots = high * 30 + medium * 15 + low * 10;
    const followupsMissing = open.filter((a) => a.type.toLowerCase().includes("follow")).length;

    const capacity = Math.max(0, 100 - open.length * 12);
    const revenueLeak = Math.max(0, open.filter((a) => a.type.toLowerCase().includes("revenue")).length);

    return { openCount: open.length, high, medium, low, todayAppts, atRiskSlots, followupsMissing, capacity, revenueLeak };
  }, [alerts]);

  const markHandled = (id) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "Handled" ? "Open" : "Handled" } : a))
    );
    const current = alerts.find((a) => a.id === id);
    const nextStatus = current?.status === "Handled" ? "Open" : "Handled";
    pushToast({
      title: nextStatus === "Handled" ? "Marked as handled" : "Reopened alert",
      message: current?.title,
      tone: nextStatus === "Handled" ? "good" : "warn",
    });
  };

  const addNote = () => {
    const id = selected?.id;
    if (!id) return;
    const text = noteDraft.trim();
    if (!text) return;

    setNotesById((prev) => {
      const existing = prev[id] || [];
      const entry = { id: uid(), ts: Date.now(), text };
      return { ...prev, [id]: [entry, ...existing] };
    });
    setNoteDraft("");
    pushToast({ title: "Note saved", message: "Attached to this alert.", tone: "info" });
  };

  const createAlert = () => {
    if (!newAlert.title.trim()) {
      pushToast({ title: "Add a title first", message: "Alert title is required.", tone: "warn" });
      return;
    }
    const id = "A" + Math.floor(1000 + Math.random() * 9000);
    const item = {
      id,
      createdAt: Date.now(),
      title: newAlert.title.trim(),
      subtitle: newAlert.subtitle.trim() || "New alert created in demo mode.",
      severity: newAlert.severity,
      type: newAlert.type,
      eta: newAlert.eta,
      owner: newAlert.owner,
      status: "Open",
      rationale: ["Created in demo mode", "No clinical notes", "Operational signal only"],
      suggested: ["Assign to staff member", "Mark as handled when complete"],
    };
    setAlerts((prev) => [item, ...prev]);
    setSelectedAlertId(id);
    setDrawerOpen(true);
    setCreateOpen(false);
    setNewAlert((p) => ({ ...p, title: "", subtitle: "" }));
    pushToast({ title: "New alert created", message: id, tone: "good" });
  };

  const runSync = () => {
    if (syncing) return;
    setSyncing(true);
    setSyncProgress(8);

    const steps = [22, 38, 54, 71, 86, 100];
    steps.forEach((p, idx) => {
      setTimeout(() => {
        setSyncProgress(p);
        if (p === 100) {
          setSyncing(false);
          setLastSyncMins(1);

          // simulate small changes
          setAlerts((prev) => {
            const list = prev.slice();
            // maybe add a low alert if open count is low
            if (list.filter((a) => a.status === "Open").length <= 2) {
              list.unshift({
                id: "A" + Math.floor(1000 + Math.random() * 9000),
                createdAt: Date.now(),
                title: "Auto-check: reminder — SMS not yet sent (15:30)",
                subtitle: "Low risk but worth confirming to protect the slot",
                severity: "Low",
                type: "Confirmation",
                eta: "Next 3h",
                owner: "Reception",
                status: "Open",
                rationale: ["No SMS confirmation logged", "Booked today", "Short slot (15 min)"],
                suggested: ["Send quick confirmation SMS", "Mark handled if confirmed"],
              });
            }
            return list;
          });

          pushToast({ title: "Sync complete", message: "Signals refreshed.", tone: "good" });
        }
      }, 320 + idx * 320);
    });
  };

  const copyAlertSummary = async () => {
    const a = selected;
    if (!a) return;
    const text = [
      `Alert ${a.id}: ${a.title}`,
      `Severity: ${a.severity}`,
      `Type: ${a.type}`,
      `ETA: ${a.eta}`,
      `Owner: ${a.owner}`,
      `Status: ${a.status}`,
      "",
      "Why flagged:",
      ...a.rationale.map((x) => `- ${x}`),
      "",
      "Suggested next step:",
      ...a.suggested.map((x) => `- ${x}`),
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      pushToast({ title: "Copied", message: "Alert summary copied to clipboard.", tone: "info" });
    } catch {
      pushToast({ title: "Copy failed", message: "Your browser blocked clipboard access.", tone: "warn" });
    }
  };

  // Hotkeys: quick actions
  useHotkeys({
    "mod+k": () => setCommandOpen((v) => !v),
    "mod+n": () => setCreateOpen(true),
    escape: () => {
      setCommandOpen(false);
      setCreateOpen(false);
      setConnectOpen(false);
      setDrawerOpen(false);
    },
  });

  useEffect(() => {
    // fake "time passing" for last sync
    const t = setInterval(() => setLastSyncMins((m) => Math.min(99, m + 1)), 60_000);
    return () => clearInterval(t);
  }, []);

  const kpis = useMemo(() => {
    if (kpiMode === "Capacity") {
      return [
        {
          title: "Team capacity",
          value: `${stats.capacity}%`,
          sub: "Based on open alerts",
          icon: Users,
          tone: stats.capacity > 70 ? "good" : stats.capacity > 45 ? "warn" : "bad",
          trend: "Live demo",
        },
        {
          title: "Open alerts",
          value: `${stats.openCount}`,
          sub: "Across owners",
          icon: Bell,
          tone: stats.openCount <= 2 ? "good" : stats.openCount <= 5 ? "warn" : "bad",
          trend: "Actionable only",
        },
        {
          title: "High priority",
          value: `${stats.high}`,
          sub: "Confirm now",
          icon: AlertTriangle,
          tone: stats.high === 0 ? "good" : "warn",
          trend: "Reduce risk",
        },
        {
          title: "Last sync",
          value: `${lastSyncMins} min`,
          sub: syncing ? "Syncing…" : "Signals updated",
          icon: Activity,
          tone: syncing ? "info" : "good",
          trend: syncing ? `${syncProgress}%` : "Healthy",
        },
      ];
    }

    if (kpiMode === "Revenue") {
      const leakage = Math.max(0, 2 - stats.openCount); // fake demo
      return [
        {
          title: "Revenue protected",
          value: `${Math.max(0, 90 - stats.openCount * 10)} mins`,
          sub: "Recovered slot time estimate",
          icon: Calendar,
          tone: stats.openCount <= 2 ? "good" : "warn",
          trend: "Demo calc",
        },
        {
          title: "No-show exposure",
          value: `${stats.high + stats.medium}`,
          sub: "Open risk items",
          icon: AlertTriangle,
          tone: stats.high ? "warn" : "good",
          trend: "Reduce waste",
        },
        {
          title: "Billing checks",
          value: `${leakage}`,
          sub: "Potential leakage flags",
          icon: Bell,
          tone: leakage === 0 ? "good" : "warn",
          trend: "Prevent gaps",
        },
        {
          title: "Last sync",
          value: `${lastSyncMins} min`,
          sub: syncing ? "Syncing…" : "Signals updated",
          icon: Activity,
          tone: syncing ? "info" : "good",
          trend: syncing ? `${syncProgress}%` : "Healthy",
        },
      ];
    }

    // Summary (default)
    return [
      {
        title: "Today’s appointments",
        value: `${stats.todayAppts}`,
        sub: "Across 3 providers",
        icon: Calendar,
        tone: "neutral",
        trend: "+6 vs last Thu",
      },
      {
        title: "High-risk no-shows",
        value: `${stats.high}`,
        sub: "Priority: confirm now",
        icon: AlertTriangle,
        tone: stats.high ? "warn" : "good",
        trend: `Protect ~${Math.min(180, 30 * stats.high + 15 * stats.medium)} mins`,
      },
      {
        title: "Follow-ups missing",
        value: `${stats.followupsMissing}`,
        sub: "Needs action in 24h",
        icon: Bell,
        tone: stats.followupsMissing ? "bad" : "good",
        trend: "Reduce gaps",
      },
      {
        title: "Automation health",
        value: syncing ? "Syncing" : "Good",
        sub: syncing ? "Refreshing signals" : "Sync running normally",
        icon: Activity,
        tone: syncing ? "info" : "good",
        trend: syncing ? `${syncProgress}%` : `Last sync: ${lastSyncMins} min`,
      },
    ];
  }, [kpiMode, stats, syncing, syncProgress, lastSyncMins]);

  const commandItems = useMemo(
    () => [
      { label: "Open connect modal", hint: "Ctrl/⌘ + K", action: () => setConnectOpen(true), icon: Plug },
      { label: "Create new alert", hint: "Ctrl/⌘ + N", action: () => setCreateOpen(true), icon: Plus },
      { label: "Run sync simulation", hint: "", action: runSync, icon: RefreshCw },
      { label: "Switch KPI view (Summary/Revenue/Capacity)", hint: "", action: () => setKpiMode((m) => (m === "Summary" ? "Revenue" : m === "Revenue" ? "Capacity" : "Summary")), icon: SlidersHorizontal },
    ],
    [syncing]
  );

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <GlowBg />

      <Toast toasts={toasts} dismiss={dismissToast} />

      {/* Command palette */}
      <Modal
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        title="Quick actions"
        subtitle="Use Ctrl/⌘ + K to open/close. Esc to dismiss."
        footer={
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-400">Demo only — no real clinic data.</div>
            <Button variant="outline" size="sm" onClick={() => setCommandOpen(false)}>
              Close
            </Button>
          </div>
        }
      >
        <div className="space-y-2">
          {commandItems.map((it) => (
            <button
              key={it.label}
              onClick={() => {
                it.action();
                setCommandOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:bg-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                  <it.icon className="h-4 w-4 text-slate-200" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{it.label}</p>
                  {it.hint ? <p className="mt-1 text-xs text-slate-400">{it.hint}</p> : null}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </button>
          ))}
        </div>
      </Modal>

      {/* Create alert */}
      <Modal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title="Create a demo alert"
        subtitle="This adds a new alert into the dashboard so the demo feels live."
        footer={
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={createAlert}>
              <Plus className="h-4 w-4" />
              Create alert
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="mb-2 text-xs text-slate-400">Title</p>
            <Input
              value={newAlert.title}
              onChange={(e) => setNewAlert((p) => ({ ...p, title: e.target.value }))}
              placeholder="e.g. Same-day booking — unconfirmed (14:00)"
            />
          </div>

          <div className="md:col-span-2">
            <p className="mb-2 text-xs text-slate-400">Subtitle</p>
            <Input
              value={newAlert.subtitle}
              onChange={(e) => setNewAlert((p) => ({ ...p, subtitle: e.target.value }))}
              placeholder="Short reason shown in the list"
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-400">Severity</p>
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
              <AlertTriangle className="h-4 w-4 text-slate-400" />
              <select
                value={newAlert.severity}
                onChange={(e) => setNewAlert((p) => ({ ...p, severity: e.target.value }))}
                className="h-10 w-full bg-transparent text-sm text-slate-100 outline-none"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-400">Type</p>
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
              <Bell className="h-4 w-4 text-slate-400" />
              <select
                value={newAlert.type}
                onChange={(e) => setNewAlert((p) => ({ ...p, type: e.target.value }))}
                className="h-10 w-full bg-transparent text-sm text-slate-100 outline-none"
              >
                <option value="Confirmation">Confirmation</option>
                <option value="No-show risk">No-show risk</option>
                <option value="Follow-up gap">Follow-up gap</option>
                <option value="Revenue leakage">Revenue leakage</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-400">ETA</p>
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
              <Clock className="h-4 w-4 text-slate-400" />
              <select
                value={newAlert.eta}
                onChange={(e) => setNewAlert((p) => ({ ...p, eta: e.target.value }))}
                className="h-10 w-full bg-transparent text-sm text-slate-100 outline-none"
              >
                <option value="Next 3h">Next 3h</option>
                <option value="Today">Today</option>
                <option value="Within 24h">Within 24h</option>
                <option value="This week">This week</option>
              </select>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-400">Owner</p>
            <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
              <Users className="h-4 w-4 text-slate-400" />
              <select
                value={newAlert.owner}
                onChange={(e) => setNewAlert((p) => ({ ...p, owner: e.target.value }))}
                className="h-10 w-full bg-transparent text-sm text-slate-100 outline-none"
              >
                <option value="Reception">Reception</option>
                <option value="Practice manager">Practice manager</option>
                <option value="Provider">Provider</option>
                <option value="Billing">Billing</option>
              </select>
            </div>
          </div>
        </div>
      </Modal>

      {/* Main shell */}
      <div className="relative mx-auto flex max-w-7xl gap-6 p-6">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 md:block">
          <div className="sticky top-6 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-slate-400">Workspace</p>
                  <p className="mt-1 text-lg font-semibold text-white">CareOps Cloud</p>
                  <p className="mt-1 text-xs text-slate-400">Clinic Ops • No clinical data</p>
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
              <p className="mt-1 text-xs text-slate-400">Connect once at the clinic level.</p>

              <Button className="mt-4 w-full" onClick={() => setConnectOpen(true)}>
                <Plug className="h-4 w-4" />
                Connect system
              </Button>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setCommandOpen(true)}>
                  <SlidersHorizontal className="h-4 w-4" />
                  Actions
                </Button>
                <Button variant="outline" onClick={runSync} disabled={syncing}>
                  <RefreshCw className={cn("h-4 w-4", syncing && "animate-spin")} />
                  Sync
                </Button>
              </div>

              {syncing ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white">Syncing…</p>
                    <Badge>{syncProgress}%</Badge>
                  </div>
                  <div className="mt-3">
                    <Progress value={syncProgress} />
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-xs text-slate-400">Last sync: {lastSyncMins} min ago</p>
              )}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Top bar */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-white">Operations dashboard</h1>
              <p className="mt-1 text-sm text-slate-300">
                Quiet monitoring. Clear priorities. Your clinical software stays the same.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge className="gap-2">
                  <kbd className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200">
                    Ctrl/⌘ + K
                  </kbd>
                  Quick actions
                </Badge>
                <Badge className="gap-2">
                  <kbd className="rounded-lg border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200">
                    Ctrl/⌘ + N
                  </kbd>
                  New alert
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search alerts, types, owners…"
                  className="pl-10"
                />
              </div>

              <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
                <Filter className="h-4 w-4 text-slate-400" />
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="h-10 bg-transparent text-sm text-slate-100 outline-none"
                >
                  <option value="All">All priorities</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
                <Bell className="h-4 w-4 text-slate-400" />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="h-10 bg-transparent text-sm text-slate-100 outline-none"
                >
                  {allTypes.map((t) => (
                    <option key={t} value={t}>
                      {t === "All" ? "All types" : t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex h-11 items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3">
                <SlidersHorizontal className="h-4 w-4 text-slate-400" />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-10 bg-transparent text-sm text-slate-100 outline-none"
                >
                  <option value="Priority">Sort: Priority</option>
                  <option value="ETA">Sort: ETA</option>
                  <option value="Newest">Sort: Newest</option>
                </select>
              </div>

              <Button className="h-11" onClick={() => setCreateOpen(true)}>
                <Plus className="h-4 w-4" />
                New alert
              </Button>

              <Button variant="outline" className="h-11" onClick={() => setConnectOpen(true)}>
                <Plug className="h-4 w-4" />
                Connect
              </Button>
            </div>
          </div>

          {/* KPI MODE TOGGLE */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge className="gap-2">
                <Activity className="h-3.5 w-3.5" />
                View
              </Badge>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                {["Summary", "Revenue", "Capacity"].map((m) => (
                  <button
                    key={m}
                    onClick={() => setKpiMode(m)}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm transition",
                      kpiMode === m ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Pill icon={ShieldCheck} label="No clinical notes" tone="good" />
              <Pill icon={BadgeCheck} label="Audit-ready" tone="info" />
              <Pill icon={Users} label="Role-based access" tone="neutral" />
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {kpis.map((k) => (
              <MetricCard
                key={k.title}
                {...k}
                onClick={() => {
                  // Clicking KPI = helpful action
                  if (k.title.toLowerCase().includes("open")) {
                    setSeverityFilter("All");
                    setTypeFilter("All");
                    setSearch("");
                    pushToast({ title: "Showing all open items", message: "Use filters to narrow down.", tone: "info" });
                  }
                  if (k.title.toLowerCase().includes("high")) {
                    setSeverityFilter("High");
                    pushToast({ title: "Filter applied", message: "Showing High priority alerts.", tone: "warn" });
                  }
                  if (k.title.toLowerCase().includes("sync")) {
                    runSync();
                  }
                }}
              />
            ))}
          </div>

          {/* Alerts + About */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Alerts */}
            <Card className="lg:col-span-3 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle>Priority alerts</CardTitle>
                    <p className="mt-1 text-sm text-slate-300">
                      Only the items most likely to cause loss or disruption.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge>{filteredAlerts.length} showing</Badge>
                    <Badge className="gap-2">
                      <span className="text-slate-400">Open:</span> {stats.openCount}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <div className="divide-y divide-white/10">
                {filteredAlerts.map((a) => {
                  const active = a.id === selectedAlertId;
                  const handled = a.status === "Handled";
                  return (
                    <motion.div
                      key={a.id}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                      className={cn(active ? "bg-white/10" : "")}
                    >
                      <button
                        onClick={() => {
                          setSelectedAlertId(a.id);
                          setDrawerOpen(true);
                        }}
                        className="w-full text-left"
                      >
                        <div className="flex items-start justify-between gap-4 px-6 py-5">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p
                                className={cn(
                                  "truncate font-medium",
                                  handled ? "text-slate-300 line-through" : "text-white"
                                )}
                              >
                                {a.title}
                              </p>
                              <SeverityBadge severity={a.severity} />
                              <Pill icon={Clock} label={a.eta} tone="neutral" />
                              {handled ? <Pill icon={CheckCircle2} label="Handled" tone="good" /> : null}
                            </div>
                            <p className="mt-2 text-sm text-slate-300">{a.subtitle}</p>
                            <div className="mt-3 flex flex-wrap items-center gap-2">
                              <Pill icon={Bell} label={a.type} tone="info" />
                              <Pill icon={Users} label={a.owner} tone="neutral" />
                              {notesById[a.id]?.length ? (
                                <Pill icon={MessageSquare} label={`${notesById[a.id].length} note(s)`} tone="neutral" />
                              ) : null}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant={handled ? "outline" : undefined}
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                markHandled(a.id);
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              {handled ? "Reopen" : "Handle"}
                            </Button>
                            <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
                          </div>
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* What CareOps does */}
            <Card className="lg:col-span-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)]">
              <CardHeader className="border-b border-white/10">
                <CardTitle>What CareOps does</CardTitle>
                <p className="mt-1 text-sm text-slate-300">Simple, predictable operations oversight.</p>
              </CardHeader>

              <CardContent className="p-6">
                <Segmented
                  value={infoTab}
                  onChange={setInfoTab}
                  items={[
                    { value: "how", label: "How" },
                    { value: "rules", label: "Rules" },
                    { value: "trust", label: "Trust" },
                  ]}
                />

                {infoTab === "how" ? (
                  <div className="mt-4 space-y-3">
                    {[
                      {
                        icon: Plug,
                        title: "Connect once",
                        desc: "Practice manager authorises a read-only connection.",
                      },
                      {
                        icon: Activity,
                        title: "Monitor quietly",
                        desc: "We track appointments, confirmations, and timing signals.",
                      },
                      {
                        icon: Bell,
                        title: "Alert only when it matters",
                        desc: "Staff focus on the 2–3 actions that protect the day.",
                      },
                    ].map((x) => (
                      <motion.div
                        key={x.title}
                        whileHover={{ y: -2 }}
                        className="rounded-2xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-2xl border border-white/10 bg-white/5 p-2">
                            <x.icon className="h-4 w-4 text-slate-200" />
                          </div>
                          <div>
                            <p className="font-medium text-white">{x.title}</p>
                            <p className="mt-1 text-sm text-slate-300">{x.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <Button variant="outline" className="w-full" onClick={() => setConnectOpen(true)}>
                      <ExternalLink className="h-4 w-4" />
                      Open connect flow
                    </Button>
                  </div>
                ) : infoTab === "rules" ? (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-slate-300">
                      No black boxes. Clear rules your clinic can understand.
                    </p>
                    {[
                      { title: "No-show risk", desc: "Prioritises long slots + no response + late booking." },
                      { title: "Follow-up gaps", desc: "Flags when follow-up required but no action is recorded." },
                      { title: "Revenue leakage", desc: "Highlights completed appointments that remain unbilled." },
                    ].map((x) => (
                      <div key={x.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <p className="text-sm font-medium text-white">{x.title}</p>
                        <p className="mt-1 text-sm text-slate-300">{x.desc}</p>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        pushToast({
                          title: "Demo: rules updated",
                          message: "In a real product, clinics can tune thresholds.",
                          tone: "info",
                        });
                      }}
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Simulate tuning rules
                    </Button>
                  </div>
                ) : (
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <div className="flex items-start gap-3">
                        <ShieldCheck className="h-5 w-5 text-emerald-200" />
                        <div>
                          <p className="text-sm font-medium text-white">No clinical notes stored</p>
                          <p className="mt-1 text-sm text-slate-200">CareOps reads operational signals only.</p>
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

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        pushToast({
                          title: "Trust mode",
                          message: "This demo simulates read-only access only.",
                          tone: "good",
                        });
                      }}
                    >
                      <ShieldCheck className="h-4 w-4" />
                      Verify privacy stance
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Mobile helper */}
          <div className="mt-8 flex flex-col gap-3 md:hidden">
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="h-4 w-4" />
              Create demo alert
            </Button>
            <Button variant="outline" onClick={() => setCommandOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              Quick actions
            </Button>
          </div>
        </main>
      </div>

      {/* Alert drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selected?.title || "Alert"}
      >
        {selected ? (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <SeverityBadge severity={selected.severity} />
              <Pill icon={Bell} label={selected.type} tone="info" />
              <Pill icon={Clock} label={selected.eta} tone="neutral" />
              <Pill icon={Users} label={selected.owner} tone="neutral" />
              {selected.status === "Handled" ? (
                <Pill icon={CheckCircle2} label="Handled" tone="good" />
              ) : null}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm font-medium text-white">Why this was flagged</p>
              <ul className="mt-3 space-y-2">
                {selected.rationale.map((r) => (
                  <li
                    key={r}
                    className="flex items-start gap-2 text-sm text-slate-200"
                  >
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
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-slate-200"
                  >
                    <ChevronRight className="mt-0.5 h-4 w-4 text-slate-300" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => markHandled(selected.id)}>
                  <CheckCircle2 className="h-4 w-4" />
                  {selected.status === "Handled" ? "Reopen" : "Mark as handled"}
                </Button>

                <Button variant="outline" onClick={copyAlertSummary}>
                  <Copy className="h-4 w-4" />
                  Copy summary
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    pushToast({
                      title: "Demo action",
                      message: "Would open related appointments in the real product.",
                      tone: "info",
                    });
                  }}
                >
                  <ExternalLink className="h-4 w-4" />
                  View related appointments
                </Button>
              </div>
            </div>

            {/* Notes */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white">Internal notes</p>
                <Badge className="gap-2">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {(notesById[selected.id] || []).length}
                </Badge>
              </div>

              <div className="mt-3">
                <Textarea
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  placeholder="Add a note for staff (demo)…"
                />
              </div>

              <div className="mt-3 flex flex-wrap justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setNoteDraft("");
                    pushToast({ title: "Draft cleared", message: "", tone: "neutral" });
                  }}
                >
                  Clear
                </Button>
                <Button onClick={addNote}>
                  <Plus className="h-4 w-4" />
                  Save note
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                <AnimatePresence>
                  {(notesById[selected.id] || []).map((n) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-sm text-slate-200">{n.text}</p>
                        <button
                          className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-100 hover:bg-white/10"
                          onClick={() => {
                            setNotesById((prev) => {
                              const list = prev[selected.id] || [];
                              return {
                                ...prev,
                                [selected.id]: list.filter((x) => x.id !== n.id),
                              };
                            });
                            pushToast({ title: "Note removed", message: "", tone: "warn" });
                          }}
                          aria-label="Remove note"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-2 text-xs text-slate-400">
                        {new Date(n.ts).toLocaleString()}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {(notesById[selected.id] || []).length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                    No notes yet. Add one above.
                  </div>
                ) : null}
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
        ) : null}
      </Drawer>

      {/* Connect modal */}
      <ConnectModal open={connectOpen} onClose={() => setConnectOpen(false)} />
    </div>
  );
}
