import { useEffect, useMemo, useState } from "react";

const LOGS_KEY = "lc_logs_v1";
const OLD_LOGS_KEY = "lc_probs_v3";
const A2Z_PROGRESS_KEY = "striver_a2z_progress_v1";
const GOALS_KEY = "lc_goals_v2";
const IST_TIME_ZONE = "Asia/Kolkata";

const difficultyColors = {
  Easy: "#10B981",
  Medium: "#F59E0B",
  Hard: "#EF4444",
};

const normalizeDifficulty = (difficulty) => {
  if (!difficulty) return "Medium";
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();
};

const getIstDateValue = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const year = parts.find((part) => part.type === "year")?.value || "2026";
  const month = parts.find((part) => part.type === "month")?.value || "01";
  const day = parts.find((part) => part.type === "day")?.value || "01";
  return `${year}-${month}-${day}`;
};

const getProblemNumber = (value) => String(value || "").trim().match(/\d+/)?.[0] || "";
const getLeetCodeSlug = (url) => url?.match(/leetcode\.com\/problems\/([^/?#]+)/)?.[1] || "";

const readInitialLogs = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
    if (saved.length) return saved;
  } catch {
    return [];
  }

  try {
    const oldLogs = JSON.parse(localStorage.getItem(OLD_LOGS_KEY) || "[]");
    if (oldLogs.length) {
      return oldLogs.map((log) => ({
        id: String(log.id || crypto.randomUUID()),
        number: log.num || "",
        title: log.name || "",
        difficulty: normalizeDifficulty(log.difficulty),
        type: log.topic || "Array",
        status: log.status === "attempted" ? "Attempted" : "Solved",
        learnings: log.notes || "",
        code: log.code || "",
        date: log.date || getIstDateValue(),
      }));
    }
  } catch {
    // fall through
  }

  return [];
};

const readInitialGoals = () => {
  const defaultGoals = { total: 150, easy: 60, medium: 75, hard: 15, streak: 30 };
  try {
    const saved = JSON.parse(localStorage.getItem(GOALS_KEY) || "null");
    if (saved && typeof saved === "object") {
      return { ...defaultGoals, ...saved };
    }
  } catch {
    // fall back
  }
  return defaultGoals;
};

export default function LeetCodeDashboard() {
  const today = getIstDateValue();
  const [problemBank, setProblemBank] = useState([]);
  const [problemBankStatus, setProblemBankStatus] = useState("Loading LeetCode problem bank...");
  const [a2zSheet, setA2zSheet] = useState([]);
  const [a2zStatus, setA2zStatus] = useState("Loading Striver A2Z sheet...");
  const [a2zProgress, setA2zProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(A2Z_PROGRESS_KEY) || "{}"); } catch { return {}; }
  });
  const [a2zFilters, setA2zFilters] = useState({ section: "", search: "", openOnly: true });
  const [logs, setLogs] = useState(readInitialLogs);
  const [goals, setGoals] = useState(readInitialGoals);
  const [showGoalSettings, setShowGoalSettings] = useState(false);

  const [form, setForm] = useState({
    lookup: "",
    title: "",
    difficulty: "Easy",
    type: "Array",
    status: "Solved",
    learnings: "",
    code: "",
    date: today,
  });
  const [editLogId, setEditLogId] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    difficulty: "",
    status: "",
    search: "",
  });
  const [bankSearch, setBankSearch] = useState("");

  const allTypes = useMemo(() => {
    const types = new Set();
    problemBank.forEach((problem) => problem.types?.forEach((type) => types.add(type)));
    logs.forEach((log) => { if (log.type) types.add(log.type); });
    return [...types].sort();
  }, [problemBank, logs]);

  const problemsByNumber = useMemo(() =>
    Object.fromEntries(problemBank.map((problem) => [problem.number, problem])), [problemBank]);
  const problemsBySlug = useMemo(() =>
    Object.fromEntries(problemBank.map((problem) => [problem.slug, problem])), [problemBank]);
  const problemsByTitle = useMemo(() =>
    Object.fromEntries(problemBank.map((problem) => [problem.title.toLowerCase(), problem])), [problemBank]);

  useEffect(() => {
    try { localStorage.setItem(LOGS_KEY, JSON.stringify(logs)); } catch { return; }
  }, [logs]);

  useEffect(() => {
    try { localStorage.setItem(A2Z_PROGRESS_KEY, JSON.stringify(a2zProgress)); } catch { return; }
  }, [a2zProgress]);

  useEffect(() => {
    try { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); } catch { return; }
  }, [goals]);

  useEffect(() => {
    let cancelled = false;
    fetch("/leetcode-problems.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((problems) => {
        if (cancelled) return;
        setProblemBank(problems);
        setProblemBankStatus(`${problems.length} problems loaded`);
      })
      .catch(() => {
        if (cancelled) return;
        setProblemBankStatus("Could not load problem bank. Manual logging works.");
      });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/striver-a2z-sheet.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Status: ${res.status}`);
        return res.json();
      })
      .then((sheet) => {
        if (cancelled) return;
        setA2zSheet(sheet.problems || sheet || []);
        setA2zStatus(`${sheet.problems?.length || sheet?.length || 0} A2Z items loaded`);
      })
      .catch(() => {
        if (cancelled) return;
        setA2zStatus("Could not load Striver A2Z sheet.");
      });

    return () => { cancelled = true; };
  }, []);

  const lookupText = form.lookup.trim();
  const lookupNumber = getProblemNumber(lookupText);
  const lookupSlug = getLeetCodeSlug(lookupText) || (lookupText.includes("-") && !lookupText.includes(" ") ? lookupText.toLowerCase() : "");
  const lookupProblem = lookupNumber && problemsByNumber[lookupNumber]
    ? problemsByNumber[lookupNumber]
    : lookupSlug && problemsBySlug[lookupSlug]
      ? problemsBySlug[lookupSlug]
      : problemsByTitle[lookupText.toLowerCase()] || problemBank.find((p) =>
          p.title.toLowerCase() === lookupText.toLowerCase() ||
          (lookupText.length > 3 && p.title.toLowerCase().includes(lookupText.toLowerCase()))
        );

  const solvedLogs = useMemo(() => logs.filter((l) => l.status === "Solved"), [logs]);
  const attemptedLogs = useMemo(() => logs.filter((l) => l.status === "Attempted"), [logs]);
  const todayLogs = useMemo(() => logs.filter((l) => l.date === today), [logs, today]);

  const difficultyCounts = useMemo(() => {
    return solvedLogs.reduce((acc, log) => {
      const d = normalizeDifficulty(log.difficulty);
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, { Easy: 0, Medium: 0, Hard: 0 });
  }, [solvedLogs]);

  const typeCounts = useMemo(() => {
    return solvedLogs.reduce((acc, log) => {
      const t = log.type || "Other";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
  }, [solvedLogs]);

  const topTypes = useMemo(() =>
    Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).slice(0, 8),
    [typeCounts]
  );
  const maxTypeCount = topTypes.length ? topTypes[0][1] : 1;

  // Weak and Strong topic detection
  const { weakTopics, strongTopics } = useMemo(() => {
    const topicStats = {};
    logs.forEach((log) => {
      const t = log.type || "Other";
      if (!topicStats[t]) topicStats[t] = { solved: 0, total: 0 };
      topicStats[t].total += 1;
      if (log.status === "Solved") topicStats[t].solved += 1;
    });

    const evaluated = Object.entries(topicStats).filter(([, s]) => s.total >= 2);
    const sortedByRatio = evaluated.sort((a, b) => (a[1].solved / a[1].total) - (b[1].solved / b[1].total));
    const weak = sortedByRatio.filter(([, s]) => (s.solved / s.total) < 0.6).slice(0, 4).map(([t]) => t);
    const strong = [...sortedByRatio].reverse().filter(([, s]) => (s.solved / s.total) >= 0.75).slice(0, 4).map(([t]) => t);

    return { weakTopics: weak, strongTopics: strong };
  }, [logs]);

  // Streak calculation
  const { currentStreak, longestStreak, activeDaysCount, daysThisMonthCount, heatmapDays } = useMemo(() => {
    const dateCounts = {};
    solvedLogs.forEach((l) => {
      if (l.date) dateCounts[l.date] = (dateCounts[l.date] || 0) + 1;
    });
    const uniqueDates = new Set(Object.keys(dateCounts));

    // Calculate current streak
    let streak = 0;
    const now = new Date();
    for (let i = 0; i < 366; i++) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      if (uniqueDates.has(ds)) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }

    // Longest streak
    const sorted = [...uniqueDates].sort();
    let max = 0;
    let cur = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0) {
        cur = 1;
        max = 1;
      } else {
        const prev = new Date(sorted[i - 1]);
        const curr = new Date(sorted[i]);
        const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          cur++;
          if (cur > max) max = cur;
        } else {
          cur = 1;
        }
      }
    }

    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const thisMonth = [...uniqueDates].filter((d) => {
      const date = new Date(d);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    // 90-day matrix
    const matrix = [];
    for (let i = 89; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      const count = dateCounts[ds] || 0;
      matrix.push({
        date: ds,
        count,
        isToday: i === 0,
      });
    }

    return {
      currentStreak: streak,
      longestStreak: max,
      activeDaysCount: uniqueDates.size,
      daysThisMonthCount: thisMonth,
      heatmapDays: matrix,
    };
  }, [solvedLogs]);

  // Striver A2Z calculations
  const a2zProblems = useMemo(() => a2zSheet.map((item) => {
    const slug = getLeetCodeSlug(item.leetcode);
    const lcProblem = slug ? problemsBySlug[slug] : null;
    return {
      ...item,
      leetcodeSlug: slug,
      leetcodeNumber: lcProblem?.number || "",
      difficulty: lcProblem?.difficulty || "",
      isDone: !!a2zProgress[item.id],
    };
  }), [a2zSheet, a2zProgress, problemsBySlug]);

  const a2zDoneCount = useMemo(() => a2zProblems.filter((item) => item.isDone).length, [a2zProblems]);
  const a2zSections = useMemo(() => [...new Set(a2zSheet.map((item) => item.section))], [a2zSheet]);

  const a2zVisible = useMemo(() => a2zProblems.filter((item) => {
    const search = a2zFilters.search.trim().toLowerCase();
    const matchesSearch = !search ||
      item.title.toLowerCase().includes(search) ||
      (item.section && item.section.toLowerCase().includes(search)) ||
      (item.subsection && item.subsection.toLowerCase().includes(search));

    return matchesSearch &&
      (!a2zFilters.section || item.section === a2zFilters.section) &&
      (!a2zFilters.openOnly || !item.isDone);
  }).slice(0, 100), [a2zProblems, a2zFilters]);

  const a2zByLeetcodeSlug = useMemo(() => {
    const bySlug = {};
    a2zProblems.forEach((item) => {
      if (!item.leetcodeSlug) return;
      bySlug[item.leetcodeSlug] = [...(bySlug[item.leetcodeSlug] || []), item.id];
    });
    return bySlug;
  }, [a2zProblems]);

  const filteredLogs = useMemo(() => logs.filter((log) => {
    const search = filters.search.trim().toLowerCase();
    const matchesSearch = !search ||
      String(log.number || "").toLowerCase().includes(search) ||
      String(log.title || "").toLowerCase().includes(search) ||
      String(log.type || "").toLowerCase().includes(search) ||
      String(log.status || "").toLowerCase().includes(search) ||
      String(log.date || "").toLowerCase().includes(search) ||
      String(log.learnings || "").toLowerCase().includes(search) ||
      String(log.code || "").toLowerCase().includes(search);

    return matchesSearch &&
      (!filters.date || log.date === filters.date) &&
      (!filters.type || log.type === filters.type) &&
      (!filters.difficulty || log.difficulty === filters.difficulty) &&
      (!filters.status || log.status === filters.status);
  }), [logs, filters]);

  const bankResults = useMemo(() => problemBank.filter((problem) => {
    const search = bankSearch.trim().toLowerCase();
    if (!search) return Number(problem.number) <= 100;
    return problem.number.includes(search) ||
      problem.title.toLowerCase().includes(search) ||
      problem.types.some((type) => type.toLowerCase().includes(search));
  }).slice(0, 100), [problemBank, bankSearch]);

  const setLookup = (value) => {
    const trimmed = value.trim();
    const number = getProblemNumber(trimmed);
    const slug = getLeetCodeSlug(trimmed) || (trimmed.includes("-") && !trimmed.includes(" ") ? trimmed.toLowerCase() : "");
    const titleKey = trimmed.toLowerCase();
    const problem = number && problemsByNumber[number]
      ? problemsByNumber[number]
      : slug && problemsBySlug[slug]
        ? problemsBySlug[slug]
        : problemsByTitle[titleKey] || problemBank.find((p) =>
            p.title.toLowerCase() === titleKey ||
            (titleKey.length > 3 && p.title.toLowerCase().includes(titleKey))
          );

    setForm((prev) => ({
      ...prev,
      lookup: value,
      title: problem ? problem.title : prev.title,
      difficulty: problem ? problem.difficulty : prev.difficulty,
      type: problem?.types?.[0] || prev.type,
    }));
  };

  const prefillProblem = (problem) => {
    setForm((prev) => ({
      ...prev,
      lookup: problem.number,
      title: problem.title,
      difficulty: problem.difficulty,
      type: problem.types?.[0] || "Array",
    }));
  };

  const prefillA2zProblem = (item) => {
    if (item.leetcodeNumber) {
      setLookup(item.leetcodeNumber);
    } else {
      setForm((prev) => ({
        ...prev,
        lookup: "",
        title: item.title,
        type: item.section || "Array",
      }));
    }
  };

  const toggleA2zDone = (id) => {
    setA2zProgress((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addLog = (event) => {
    event.preventDefault();
    const number = getProblemNumber(form.lookup);
    const problem = number ? problemsByNumber[number] : null;
    const title = problem?.title || form.title.trim();

    if (!title) return;

    const newLog = {
      id: editLogId || crypto.randomUUID(),
      number,
      title,
      difficulty: problem?.difficulty || form.difficulty,
      type: form.type,
      status: form.status,
      learnings: form.learnings.trim(),
      code: form.code.trim(),
      date: form.date || today,
    };

    setLogs((prev) => editLogId
      ? prev.map((log) => (log.id === editLogId ? newLog : log))
      : [newLog, ...prev]
    );

    if (!editLogId && form.status === "Solved" && problem?.slug && a2zByLeetcodeSlug[problem.slug]) {
      const matchingIds = a2zByLeetcodeSlug[problem.slug];
      const firstUnmarked = matchingIds.find((id) => !a2zProgress[id]);
      if (firstUnmarked) {
        setA2zProgress((prev) => ({ ...prev, [firstUnmarked]: true }));
      }
    }

    setEditLogId(null);
    setForm((prev) => ({
      ...prev,
      lookup: "",
      title: "",
      learnings: "",
      code: "",
      date: today,
    }));
  };

  const editLog = (log) => {
    setEditLogId(log.id);
    setForm({
      lookup: log.number || "",
      title: log.title,
      difficulty: log.difficulty || "Easy",
      type: log.type || "Array",
      status: log.status || "Solved",
      learnings: log.learnings || "",
      code: log.code || "",
      date: log.date || today,
    });
  };

  const cancelEdit = () => {
    setEditLogId(null);
    setForm((prev) => ({
      ...prev,
      lookup: "",
      title: "",
      difficulty: "Easy",
      type: "Array",
      status: "Solved",
      learnings: "",
      code: "",
      date: today,
    }));
  };

  const deleteLog = (id) => {
    setLogs((prev) => prev.filter((log) => log.id !== id));
    if (editLogId === id) cancelEdit();
  };

  const exportLogsCsv = () => {
    const csvEscape = (value) => `"${String(value || "").replace(/"/g, '""')}"`;
    const rows = [
      ["Date", "Number", "Title", "Difficulty", "Type", "Status", "Learnings", "Code"],
      ...logs.map((log) => [
        log.date,
        log.number,
        log.title,
        log.difficulty,
        log.type,
        log.status,
        log.learnings,
        log.code,
      ]),
    ];
    const csvContent = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    const blob = new Blob(["\uFEFF", csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `leetcode-logs-${today}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper for SVG Progress Donut
  const renderProgressDonut = (solved, total, color, label) => {
    const r = 36;
    const cx = 45;
    const cy = 45;
    const sw = 7;
    const circ = 2 * Math.PI * r;
    const pct = total > 0 ? Math.min(solved / total, 1) : 0;
    const strokeDashoffset = circ - pct * circ;

    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth={sw} />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeDasharray={circ}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
          <text x={cx} y={cy - 2} textAnchor="middle" fill={color} fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
            {solved}
          </text>
          <text x={cx} y={cy + 13} textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'JetBrains Mono', monospace">
            /{total}
          </text>
        </svg>
        <span style={{ fontSize: 11, fontWeight: 600, color: "#E2E8F0", letterSpacing: "0.04em" }}>{label}</span>
      </div>
    );
  };

  const cardStyle = {
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(12px)",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    borderRadius: 12,
    padding: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 12px",
    borderRadius: 6,
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "rgba(10, 15, 29, 0.9)",
    color: "#F8FAFC",
    fontSize: 12,
    fontFamily: "'JetBrains Mono', monospace",
    outline: "none",
  };

  const buttonStyle = {
    padding: "8px 14px",
    borderRadius: 6,
    border: "1px solid rgba(0, 240, 255, 0.4)",
    background: "rgba(0, 240, 255, 0.1)",
    color: "#00F0FF",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    whiteSpace: "nowrap",
    transition: "all 0.15s ease",
  };

  return (
    <div style={{ display: "grid", gap: 18 }}>
      {/* Top Metrics HUD */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10 }}>
        <div style={cardStyle}>
          <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Total Solved</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#F8FAFC", fontFamily: "'JetBrains Mono', monospace" }}>{solvedLogs.length}</div>
          <div style={{ fontSize: 10.5, color: "#38BDF8", marginTop: 4 }}>Goal: {goals.total} ({goals.total ? Math.round((solvedLogs.length / goals.total) * 100) : 0}%)</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Current Streak</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#F59E0B", fontFamily: "'JetBrains Mono', monospace" }}>{currentStreak} <span style={{ fontSize: 13, fontWeight: 500 }}>days</span></div>
          <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 4 }}>Best: {longestStreak} days</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Today's Count</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#10B981", fontFamily: "'JetBrains Mono', monospace" }}>{todayLogs.length}</div>
          <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 4 }}>{today}</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Active Days</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#00F0FF", fontFamily: "'JetBrains Mono', monospace" }}>{activeDaysCount}</div>
          <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 4 }}>{daysThisMonthCount} days this month</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Striver A2Z</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#BF5AF2", fontFamily: "'JetBrains Mono', monospace" }}>{a2zDoneCount}/{a2zSheet.length}</div>
          <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 4 }}>{a2zSheet.length ? Math.round((a2zDoneCount / a2zSheet.length) * 100) : 0}% completed</div>
        </div>

        <div style={cardStyle}>
          <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Attempted</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#E2E8F0", fontFamily: "'JetBrains Mono', monospace" }}>{attemptedLogs.length}</div>
          <div style={{ fontSize: 10.5, color: "#F59E0B", marginTop: 4 }}>Pending resolution</div>
        </div>
      </div>

      {/* Row 2: Progress Rings + 90-Day Activity Heatmap + Weak/Strong Topics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
        {/* Progress Rings Card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#F8FAFC", letterSpacing: "0.08em", textTransform: "uppercase" }}>Difficulty Rings</span>
            <button
              type="button"
              onClick={() => setShowGoalSettings(!showGoalSettings)}
              style={{ fontSize: 11, color: "#00F0FF", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "inherit" }}
            >
              {showGoalSettings ? "Close Goals" : "Set Goals"}
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 0" }}>
            {renderProgressDonut(difficultyCounts.Easy, goals.easy, difficultyColors.Easy, "Easy")}
            {renderProgressDonut(difficultyCounts.Medium, goals.medium, difficultyColors.Medium, "Medium")}
            {renderProgressDonut(difficultyCounts.Hard, goals.hard, difficultyColors.Hard, "Hard")}
          </div>

          {showGoalSettings && (
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(148, 163, 184, 0.15)", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
              <div>
                <span style={{ fontSize: 10, color: "#94A3B8" }}>Total</span>
                <input type="number" value={goals.total} onChange={(e) => setGoals((g) => ({ ...g, total: Number(e.target.value) || 0 }))} style={inputStyle} />
              </div>
              <div>
                <span style={{ fontSize: 10, color: "#10B981" }}>Easy</span>
                <input type="number" value={goals.easy} onChange={(e) => setGoals((g) => ({ ...g, easy: Number(e.target.value) || 0 }))} style={inputStyle} />
              </div>
              <div>
                <span style={{ fontSize: 10, color: "#F59E0B" }}>Medium</span>
                <input type="number" value={goals.medium} onChange={(e) => setGoals((g) => ({ ...g, medium: Number(e.target.value) || 0 }))} style={inputStyle} />
              </div>
              <div>
                <span style={{ fontSize: 10, color: "#EF4444" }}>Hard</span>
                <input type="number" value={goals.hard} onChange={(e) => setGoals((g) => ({ ...g, hard: Number(e.target.value) || 0 }))} style={inputStyle} />
              </div>
              <div>
                <span style={{ fontSize: 10, color: "#00F0FF" }}>Streak</span>
                <input type="number" value={goals.streak} onChange={(e) => setGoals((g) => ({ ...g, streak: Number(e.target.value) || 0 }))} style={inputStyle} />
              </div>
            </div>
          )}
        </div>

        {/* 90-Day Heatmap Card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#F8FAFC", letterSpacing: "0.08em", textTransform: "uppercase" }}>Activity Heatmap (Last 90 Days)</span>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{activeDaysCount} active days · {currentStreak} day current streak</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(15, 1fr)", gap: 4, padding: "8px 0" }}>
            {heatmapDays.map((day) => {
              const bg = day.count >= 3 ? "#10B981" : day.count === 2 ? "#059669" : day.count === 1 ? "#047857" : day.isToday ? "#F59E0B" : "rgba(255, 255, 255, 0.05)";
              const border = day.isToday ? "1px solid #FCD34D" : "1px solid rgba(255, 255, 255, 0.05)";
              return (
                <div
                  key={day.date}
                  title={`${day.date}: ${day.count} solved${day.isToday ? " (Today)" : ""}`}
                  style={{
                    aspectRatio: "1",
                    borderRadius: 3,
                    background: bg,
                    border,
                    cursor: "pointer",
                    transition: "transform 0.1s ease",
                  }}
                />
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, fontSize: 10, color: "#64748B" }}>
            <span>90 days ago</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span>Less</span>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "rgba(255, 255, 255, 0.05)" }} />
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "#047857" }} />
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "#059669" }} />
              <span style={{ width: 8, height: 8, borderRadius: 2, background: "#10B981" }} />
              <span>More</span>
            </div>
            <span>Today</span>
          </div>
        </div>

        {/* Weak & Strong Topics Card */}
        <div style={cardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#F8FAFC", letterSpacing: "0.08em", textTransform: "uppercase" }}>Topic Diagnostics</span>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2, marginBottom: 12 }}>Auto-detected from your solved vs attempted ratios</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10.5, color: "#10B981", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
              Strong Topics (High Mastery)
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {strongTopics.length ? strongTopics.map((topic) => (
                <span key={topic} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "rgba(16, 185, 129, 0.12)", color: "#34D399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                  {topic}
                </span>
              )) : <span style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>Solve more problems to compute strong topics</span>}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 10.5, color: "#EF4444", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 6 }}>
              Weak Topics (Needs Review)
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {weakTopics.length ? weakTopics.map((topic) => (
                <span key={topic} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "rgba(239, 68, 68, 0.12)", color: "#F87171", border: "1px solid rgba(239, 68, 68, 0.3)" }}>
                  {topic}
                </span>
              )) : <span style={{ fontSize: 11, color: "#64748B", fontStyle: "italic" }}>No weak topics detected! Keep solving</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Log Problem Form */}
      <form onSubmit={addLog} style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline", marginBottom: 12, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>{editLogId ? "Edit Problem Entry" : "Log LeetCode Problem"}</span>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>Type problem number (e.g. 1, 704, 206) to auto-fill title, difficulty, and tags from 3,935 problem bank.</div>
          </div>
          {lookupProblem && (
            <span style={{ fontSize: 11, color: "#10B981", background: "rgba(16, 185, 129, 0.1)", padding: "3px 8px", borderRadius: 4, border: "1px solid rgba(16, 185, 129, 0.3)" }}>
              Matched #{lookupProblem.number}: {lookupProblem.title}
            </span>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "110px minmax(180px, 1fr) 120px 160px 130px 140px", gap: 8, alignItems: "start" }}>
          <input value={form.lookup} onChange={(e) => setLookup(e.target.value)} placeholder="#, slug, title" style={inputStyle} />
          <input value={form.title} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Problem title" style={inputStyle} />
          <select value={form.difficulty} onChange={(e) => setForm((prev) => ({ ...prev, difficulty: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <div style={{ position: "relative" }}>
            <input list="type-options" value={form.type} onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))} placeholder="Category / Topic" style={inputStyle} />
            <datalist id="type-options">
              {allTypes.map((type) => <option key={type} value={type} />)}
            </datalist>
          </div>
          <select value={form.status} onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
            <option>Solved</option>
            <option>Attempted</option>
            <option>Review</option>
          </select>
          <input type="date" value={form.date} onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))} style={inputStyle} />
        </div>

        <textarea
          value={form.learnings}
          onChange={(e) => setForm((prev) => ({ ...prev, learnings: e.target.value }))}
          placeholder="Learnings: key insight, edge cases, time/space complexity O(n), pattern used..."
          style={{ ...inputStyle, minHeight: 70, marginTop: 8, resize: "vertical" }}
        />
        <textarea
          value={form.code}
          onChange={(e) => setForm((prev) => ({ ...prev, code: e.target.value }))}
          placeholder="Solution code snippet or pseudocode..."
          style={{ ...inputStyle, minHeight: 85, marginTop: 8, resize: "vertical", fontFamily: "'JetBrains Mono', monospace" }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 10 }}>
          {editLogId && (
            <button type="button" onClick={cancelEdit} style={{ ...buttonStyle, borderColor: "#64748B", color: "#94A3B8", background: "transparent" }}>
              Cancel
            </button>
          )}
          <button type="submit" style={buttonStyle}>
            {editLogId ? "Save Changes" : "Log Problem"}
          </button>
        </div>
      </form>

      {/* Row 4: Problem Logs Table + Type Coverage */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(280px, 0.6fr)", gap: 16 }}>
        {/* Logs Table */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
            <div>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>Problem Log History</span>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                {filteredLogs.length}/{logs.length} displayed{filters.date ? ` for ${filters.date}` : ""}
              </div>
            </div>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <input
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                placeholder="Search logs..."
                style={{ ...inputStyle, width: 150 }}
              />
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters((prev) => ({ ...prev, date: e.target.value }))}
                style={{ ...inputStyle, width: 130 }}
              />
              <button type="button" onClick={() => setFilters((prev) => ({ ...prev, date: today }))} style={{ ...buttonStyle, padding: "6px 10px", fontSize: 11 }}>
                Today
              </button>
              <button type="button" onClick={() => setFilters((prev) => ({ ...prev, date: "" }))} style={{ ...buttonStyle, padding: "6px 10px", fontSize: 11, borderColor: "rgba(148, 163, 184, 0.2)", color: "#94A3B8" }}>
                All
              </button>
              <button type="button" onClick={exportLogsCsv} style={{ ...buttonStyle, padding: "6px 10px", fontSize: 11, borderColor: "#38BDF8", color: "#38BDF8" }} disabled={!logs.length}>
                CSV
              </button>
            </div>
          </div>

          <div style={{ overflowX: "auto", maxHeight: 420, overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
              <thead style={{ position: "sticky", top: 0, background: "#0F172A", zIndex: 2 }}>
                <tr style={{ color: "#64748B", fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  <th style={{ textAlign: "left", padding: "8px" }}>#</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Problem</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Diff</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Type</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Date</th>
                  <th style={{ textAlign: "left", padding: "8px" }}>Notes / Code</th>
                  <th style={{ padding: "8px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} style={{ borderTop: "1px solid rgba(148, 163, 184, 0.1)" }}>
                    <td style={{ padding: "8px", color: "#94A3B8", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{log.number || "-"}</td>
                    <td style={{ padding: "8px", color: "#F8FAFC", fontSize: 12.5, fontWeight: 500 }}>{log.title}</td>
                    <td style={{ padding: "8px", color: difficultyColors[normalizeDifficulty(log.difficulty)], fontSize: 11, fontWeight: 600 }}>{log.difficulty}</td>
                    <td style={{ padding: "8px", color: "#CBD5E1", fontSize: 11 }}>{log.type}</td>
                    <td style={{ padding: "8px", color: log.status === "Solved" ? "#10B981" : "#F59E0B", fontSize: 11, fontWeight: 600 }}>{log.status}</td>
                    <td style={{ padding: "8px", color: "#94A3B8", fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace" }}>{log.date}</td>
                    <td style={{ padding: "8px", color: "#CBD5E1", fontSize: 11, maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={log.learnings || log.code}>
                      {log.learnings || log.code || "—"}
                    </td>
                    <td style={{ padding: "8px", textAlign: "right" }}>
                      <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }}>
                        <button type="button" onClick={() => editLog(log)} style={{ border: "1px solid rgba(56, 189, 248, 0.3)", background: "transparent", color: "#38BDF8", borderRadius: 4, cursor: "pointer", fontSize: 10, padding: "2px 6px" }}>
                          edit
                        </button>
                        <button type="button" onClick={() => deleteLog(log.id)} style={{ border: "1px solid rgba(239, 68, 68, 0.3)", background: "transparent", color: "#EF4444", borderRadius: 4, cursor: "pointer", fontSize: 10, padding: "2px 6px" }}>
                          del
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredLogs.length && (
              <div style={{ padding: 24, textAlign: "center", color: "#64748B", fontSize: 12 }}>
                No problems logged yet or matching the current filters.
              </div>
            )}
          </div>
        </div>

        {/* Type Coverage Breakdown */}
        <div style={cardStyle}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#F8FAFC", letterSpacing: "0.08em", textTransform: "uppercase" }}>Type Coverage</span>
          <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2, marginBottom: 12 }}>Distribution of solved topics</div>

          {topTypes.length ? topTypes.map(([type, count]) => (
            <div key={type} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#E2E8F0", fontSize: 11.5, marginBottom: 4 }}>
                <span>{type}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#94A3B8" }}>{count}</span>
              </div>
              <div style={{ background: "rgba(255, 255, 255, 0.06)", borderRadius: 99, height: 6, overflow: "hidden" }}>
                <div style={{ width: `${Math.round((count / maxTypeCount) * 100)}%`, height: "100%", background: "linear-gradient(90deg, #00F0FF, #BF5AF2)", transition: "width 0.3s" }} />
              </div>
            </div>
          )) : (
            <div style={{ color: "#64748B", fontSize: 12, fontStyle: "italic" }}>Log solved problems to see topic breakdown.</div>
          )}
        </div>
      </div>

      {/* Striver A2Z Sheet Section */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>Striver A2Z DSA Sheet Tracker</span>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
              {a2zStatus} · {a2zDoneCount}/{a2zSheet.length} solved ({a2zSheet.length ? Math.round((a2zDoneCount / a2zSheet.length) * 100) : 0}%)
            </div>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <input
              value={a2zFilters.search}
              onChange={(e) => setA2zFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="Search A2Z problem..."
              style={{ ...inputStyle, width: 170 }}
            />
            <select
              value={a2zFilters.section}
              onChange={(e) => setA2zFilters((prev) => ({ ...prev, section: e.target.value }))}
              style={{ ...inputStyle, width: 180, cursor: "pointer" }}
            >
              <option value="">All sections</option>
              {a2zSections.map((sec) => <option key={sec} value={sec}>{sec}</option>)}
            </select>
            <button
              type="button"
              onClick={() => setA2zFilters((prev) => ({ ...prev, openOnly: !prev.openOnly }))}
              style={{
                ...buttonStyle,
                borderColor: a2zFilters.openOnly ? "#10B981" : "rgba(148, 163, 184, 0.2)",
                color: a2zFilters.openOnly ? "#10B981" : "#94A3B8",
                background: a2zFilters.openOnly ? "rgba(16, 185, 129, 0.1)" : "transparent",
              }}
            >
              {a2zFilters.openOnly ? "Open Only" : "Show All"}
            </button>
          </div>
        </div>

        <div style={{ background: "rgba(255, 255, 255, 0.06)", borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ width: `${a2zSheet.length ? Math.round((a2zDoneCount / a2zSheet.length) * 100) : 0}%`, height: "100%", background: "linear-gradient(90deg, #F59E0B, #10B981)", transition: "width 0.4s ease" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10, maxHeight: 460, overflowY: "auto" }}>
          {a2zVisible.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid rgba(148, 163, 184, 0.15)",
                background: item.isDone ? "rgba(16, 185, 129, 0.08)" : "rgba(10, 15, 29, 0.7)",
                borderRadius: 8,
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <button
                  type="button"
                  onClick={() => toggleA2zDone(item.id)}
                  style={{
                    width: 18,
                    height: 18,
                    minWidth: 18,
                    borderRadius: 4,
                    border: `1.5px solid ${item.isDone ? "#10B981" : "#475569"}`,
                    background: item.isDone ? "#10B981" : "transparent",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 0,
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {item.isDone ? "✓" : ""}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 500, color: item.isDone ? "#6EE7B7" : "#F8FAFC", lineHeight: 1.4 }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 2 }}>
                    {item.section} · {item.subsection}
                  </div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                    {item.leetcodeNumber && <span style={{ color: "#F59E0B", fontSize: 10.5, fontFamily: "'JetBrains Mono', monospace" }}>LC #{item.leetcodeNumber}</span>}
                    {item.difficulty && <span style={{ color: difficultyColors[item.difficulty] || "#94A3B8", fontSize: 10.5, fontWeight: 600 }}>{item.difficulty}</span>}
                    {item.leetcode && (
                      <a href={item.leetcode} target="_blank" rel="noreferrer" style={{ color: "#38BDF8", fontSize: 10.5, textDecoration: "none" }}>LeetCode ↗</a>
                    )}
                    {item.takeuforward && (
                      <a href={item.takeuforward} target="_blank" rel="noreferrer" style={{ color: "#38BDF8", fontSize: 10.5, textDecoration: "none" }}>TUF ↗</a>
                    )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => prefillA2zProblem(item)}
                style={{
                  ...buttonStyle,
                  padding: "5px 8px",
                  fontSize: 11,
                  width: "100%",
                  justifyContent: "center",
                  borderColor: item.leetcodeNumber ? "rgba(245, 158, 11, 0.4)" : "rgba(148, 163, 184, 0.2)",
                  color: item.leetcodeNumber ? "#F59E0B" : "#94A3B8",
                  background: item.leetcodeNumber ? "rgba(245, 158, 11, 0.08)" : "transparent",
                }}
              >
                {item.leetcodeNumber ? "Prefill into Log Form" : "Manual Log"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Problem Bank Browser */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#F8FAFC" }}>LeetCode Problem Bank (3,935 Problems)</span>
            <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{problemBankStatus}</div>
          </div>
          <input
            value={bankSearch}
            onChange={(e) => setBankSearch(e.target.value)}
            placeholder="Search #, title, or tag..."
            style={{ ...inputStyle, maxWidth: 260 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8, maxHeight: 380, overflowY: "auto" }}>
          {bankResults.map((problem) => (
            <button
              key={problem.number}
              type="button"
              onClick={() => prefillProblem(problem)}
              style={{
                textAlign: "left",
                border: "1px solid rgba(148, 163, 184, 0.12)",
                background: "rgba(10, 15, 29, 0.8)",
                borderRadius: 6,
                padding: "8px 10px",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "border-color 0.15s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 6 }}>
                <span style={{ color: "#94A3B8", fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>#{problem.number}</span>
                <span style={{ color: difficultyColors[normalizeDifficulty(problem.difficulty)], fontSize: 11, fontWeight: 600 }}>{problem.difficulty}</span>
              </div>
              <div style={{ fontSize: 12, color: "#F8FAFC", marginTop: 2, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {problem.title}
              </div>
              <div style={{ fontSize: 10, color: "#64748B", marginTop: 4 }}>
                {problem.types?.slice(0, 3).join(", ") || "General"}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
