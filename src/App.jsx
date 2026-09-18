import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import LiveClock from "./components/LiveClock";
import {
  DAYS,
  PHASE_INFO,
  MONTH_SHORT_TO_INDEX,
  parseRoadmapDate,
  getDayLabel,
  getCurrentDayIndex,
  getTaskLink,
  getExtraSectionTaskCandidates,
  STORAGE_KEY,
  CUSTOM_TASKS_KEY,
  EXTRA_TASKS_KEY,
  PRIORITY_KEY,
  SECTION_PRIORITY_KEY,
  isDsaOrUdemyTask,
} from "./data/roadmapData";

const LeetCodeDashboard = lazy(() => import("./LeetCodeDashboard"));

const getInitialDsaChecked = () => {
  const dsaMap = {};
  DAYS.forEach((d, di) => {
    d.sections.forEach((sec, si) => {
      if (isDsaOrUdemyTask(sec.label)) {
        sec.tasks.forEach((_, ti) => {
          dsaMap[`${di}_${si}_${ti}`] = true;
        });
      }
    });
  });
  return dsaMap;
};

export default function App() {
  const [checked, setChecked] = useState(() => {
    const dsaMap = getInitialDsaChecked();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && typeof saved === "object") {
        return { ...dsaMap, ...saved };
      }
    } catch {
      // fallback
    }
    return dsaMap;
  });
  const [customTasks, setCustomTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CUSTOM_TASKS_KEY) || "{}"); } catch { return {}; }
  });
  const [extraTasks, setExtraTasks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(EXTRA_TASKS_KEY) || "{}"); } catch { return {}; }
  });
  const [priorities, setPriorities] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PRIORITY_KEY) || "{}"); } catch { return {}; }
  });
  const [sectionPriorities, setSectionPriorities] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SECTION_PRIORITY_KEY) || "{}"); } catch { return {}; }
  });

  const [customTaskText, setCustomTaskText] = useState("");
  const [problemsByNumber, setProblemsByNumber] = useState({});
  const [curDay, setCurDay] = useState(() => getCurrentDayIndex(new Date()));
  const [activeView, setActiveView] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "leetcode" || window.location.hash === "#leetcode") {
        return "leetcode";
      }
    }
    return "roadmap";
  });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(() => [
    {
      id: "assistant_intro",
      sender: "assistant",
      text: "Hi Rishabh! I can help you add, remove, move, or redistribute roadmap tasks. Try commands like: 'add internship meeting to 23 May' or 'move task from 23 May to 24 May'.",
    },
  ]);

  useEffect(() => {
    let cancelled = false;
    fetch("/leetcode-problems.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((problems) => {
        if (cancelled || !Array.isArray(problems)) return;
        setProblemsByNumber(Object.fromEntries(problems.map((p) => [p.number, p])));
      })
      .catch(() => undefined);

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch { return; }
  }, [checked]);

  useEffect(() => {
    try { localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(customTasks)); } catch { return; }
  }, [customTasks]);

  useEffect(() => {
    try { localStorage.setItem(EXTRA_TASKS_KEY, JSON.stringify(extraTasks)); } catch { return; }
  }, [extraTasks]);

  useEffect(() => {
    try { localStorage.setItem(PRIORITY_KEY, JSON.stringify(priorities)); } catch { return; }
  }, [priorities]);

  useEffect(() => {
    try { localStorage.setItem(SECTION_PRIORITY_KEY, JSON.stringify(sectionPriorities)); } catch { return; }
  }, [sectionPriorities]);

  const taskId = (di, si, ti) => `${di}_${si}_${ti}`;
  const customTaskId = (di, id) => `custom_${di}_${id}`;
  const extraTaskId = (di, si, ei) => `${di}_${si}_extra_${ei}`;

  const toggleById = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggle = (di, si, ti) => {
    toggleById(taskId(di, si, ti));
  };

  const getCustomTasks = (di) => customTasks[di] || [];
  const getExtraTasks = (di, si) => extraTasks[di]?.[si] || [];

  const addCustomTask = (event) => {
    event.preventDefault();
    const text = customTaskText.trim();
    if (!text) return;

    const task = {
      id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      text,
    };

    setCustomTasks((prev) => ({
      ...prev,
      [curDay]: [...(prev[curDay] || []), task],
    }));
    setCustomTaskText("");
  };

  const removeCustomTask = (di, id) => {
    setCustomTasks((prev) => ({
      ...prev,
      [di]: (prev[di] || []).filter((t) => t.id !== id),
    }));
    setChecked((prev) => {
      const next = { ...prev };
      delete next[customTaskId(di, id)];
      return next;
    });
  };

  const addMoreTasks = (di, si, sectionLabel, sectionTasks = []) => {
    const candidates = getExtraSectionTaskCandidates(sectionLabel);
    const existing = getExtraTasks(di, si);
    const available = candidates.filter(
      (c) => !existing.includes(c) && !sectionTasks.includes(c)
    );
    if (available.length === 0) return;
    const next = available[0];
    setExtraTasks((prev) => ({
      ...prev,
      [di]: {
        ...prev[di],
        [si]: [...(prev[di]?.[si] || []), next],
      },
    }));
  };

  const removeExtraTask = (di, si, ei) => {
    setExtraTasks((prev) => {
      const section = prev[di]?.[si] || [];
      const nextSection = section.filter((_, index) => index !== ei);
      const nextDay = { ...prev[di], [si]: nextSection };
      if (nextSection.length === 0) delete nextDay[si];
      const next = { ...prev, [di]: nextDay };
      if (Object.keys(nextDay).length === 0) delete next[di];
      return next;
    });
    setChecked((prev) => {
      const next = { ...prev };
      delete next[extraTaskId(di, si, ei)];
      return next;
    });
  };

  const updatePriority = (id, value, isSection = false) => {
    if (isSection) {
      setSectionPriorities((prev) => ({ ...prev, [id]: value }));
    } else {
      setPriorities((prev) => ({ ...prev, [id]: value }));
    }
  };

  const clearPriority = (id, isSection = false) => {
    if (isSection) {
      setSectionPriorities((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      setPriorities((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const getPriorityValue = (id) => priorities[id] || null;
  const getSectionPriorityValue = (sectionId) => sectionPriorities[sectionId] || null;
  const priorityButtons = [1, 2, 3, 4, 5];

  const getPriorityColor = (value) => {
    if (!value) return "#64748B";
    if (value === 1) return "#EF4444";
    if (value === 2) return "#F59E0B";
    if (value === 3) return "#00F0FF";
    if (value === 4) return "#10B981";
    return "#BF5AF2";
  };

  const addChatMessage = (sender, text) => {
    setChatMessages((prev) => [...prev, { id: `${sender}_${Date.now()}_${prev.length}`, sender, text }]);
  };

  const formatDayLabel = (di) => {
    const d = DAYS[di];
    return d ? getDayLabel(d) : "unknown date";
  };

  const findDayIndexFromText = (text) => {
    const lower = text.toLowerCase();
    if (/\btoday\b/.test(lower)) return curDay;
    if (/\btomorrow\b/.test(lower)) return Math.min(curDay + 1, DAYS.length - 1);
    const dayMonthMatch = text.match(/(\d{1,2})(?:st|nd|rd|th)?\s*([A-Za-z]{3,9})/i);
    const monthDayMatch = text.match(/([A-Za-z]{3,9})\s*(\d{1,2})(?:st|nd|rd|th)?/i);
    const day = dayMonthMatch ? Number(dayMonthMatch[1]) : monthDayMatch ? Number(monthDayMatch[2]) : NaN;
    const monthText = dayMonthMatch ? dayMonthMatch[2] : monthDayMatch ? monthDayMatch[1] : "";
    const month = MONTH_SHORT_TO_INDEX[monthText.charAt(0).toUpperCase() + monthText.slice(1).toLowerCase()];
    if (Number.isNaN(day) || month === undefined) return null;
    return DAYS.findIndex((dayObj) => {
      const parsed = parseRoadmapDate(dayObj.d);
      return parsed && parsed.day === day && parsed.month === month;
    });
  };

  const addCustomTaskToDay = (di, text) => {
    if (di === null || di < 0 || di >= DAYS.length) return false;
    const task = { id: `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`, text };
    setCustomTasks((prev) => ({ ...prev, [di]: [...(prev[di] || []), task] }));
    return true;
  };

  const removeCustomTaskByText = (di, taskText) => {
    const tasks = getCustomTasks(di);
    const lower = taskText.toLowerCase();
    const found = tasks.find((t) => t.text.toLowerCase().includes(lower) || lower.includes(t.text.toLowerCase()));
    if (!found) return false;
    removeCustomTask(di, found.id);
    return true;
  };

  const removeExtraTaskByText = (di, taskText) => {
    const lower = taskText.toLowerCase();
    const dayTasks = extraTasks[di] || {};
    for (const [si, tasks] of Object.entries(dayTasks)) {
      const index = tasks.findIndex((t) => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()));
      if (index >= 0) {
        removeExtraTask(di, Number(si), index);
        return true;
      }
    }
    return false;
  };

  const moveTaskBetweenDays = (sourceIndex, destIndex, taskText) => {
    const lower = taskText.toLowerCase();
    const customTasksSource = getCustomTasks(sourceIndex);
    const foundCustom = customTasksSource.find((t) => t.text.toLowerCase().includes(lower) || lower.includes(t.text.toLowerCase()));
    if (foundCustom) {
      addCustomTaskToDay(destIndex, foundCustom.text);
      removeCustomTask(sourceIndex, foundCustom.id);
      return true;
    }
    const dayTasks = extraTasks[sourceIndex] || {};
    for (const [si, tasks] of Object.entries(dayTasks)) {
      const index = tasks.findIndex((t) => t.toLowerCase().includes(lower) || lower.includes(t.toLowerCase()));
      if (index >= 0) {
        const taskTextFound = tasks[index];
        removeExtraTask(sourceIndex, Number(si), index);
        addCustomTaskToDay(destIndex, `Moved: ${taskTextFound}`);
        return true;
      }
    }
    return false;
  };

  const processChatCommand = (text) => {
    const cleaned = text.trim();
    const lower = cleaned.toLowerCase();
    let dayIndex = findDayIndexFromText(cleaned);
    const responseHelp = "I can add custom tasks to a day, remove tasks, or move tasks between days. Try: 'add internship meeting to 23 May' or 'move task from 23 May to 24 May'.";

    if (/\badd\b/.test(lower) && /\bto\b/.test(lower)) {
      const parts = cleaned.split(/\bto\b/i);
      const taskPart = parts.slice(0, -1).join(" to ").replace(/add\s+/i, "").trim();
      const datePart = parts.slice(-1)[0].trim();
      dayIndex = findDayIndexFromText(datePart);
      if (taskPart && dayIndex !== null) {
        addCustomTaskToDay(dayIndex, taskPart);
        return `Added task to ${formatDayLabel(dayIndex)}: "${taskPart}"`;
      }
      return responseHelp;
    }

    if (/\bremove\b/.test(lower) && /\bfrom\b/.test(lower)) {
      const parts = cleaned.split(/\bfrom\b/i);
      const taskPart = parts[0].replace(/remove\s+/i, "").trim();
      const datePart = parts[1]?.trim() ?? "";
      dayIndex = findDayIndexFromText(datePart);
      if (taskPart && dayIndex !== null) {
        if (removeCustomTaskByText(dayIndex, taskPart) || removeExtraTaskByText(dayIndex, taskPart)) {
          return `Removed matching task from ${formatDayLabel(dayIndex)}: "${taskPart}"`;
        }
        return `Could not find a matching custom or extra task on ${formatDayLabel(dayIndex)}.`;
      }
      return responseHelp;
    }

    if (/\bmove\b/.test(lower) && /\bfrom\b/.test(lower) && /\bto\b/.test(lower)) {
      const match = cleaned.match(/move\s+(.*?)\s+from\s+(.*?)\s+to\s+(.*)/i);
      if (match) {
        const taskPart = match[1].trim();
        const sourceText = match[2].trim();
        const destText = match[3].trim();
        const sourceIndex = findDayIndexFromText(sourceText);
        const destIndex = findDayIndexFromText(destText);
        if (taskPart && sourceIndex !== null && destIndex !== null) {
          if (moveTaskBetweenDays(sourceIndex, destIndex, taskPart)) {
            return `Moved task from ${formatDayLabel(sourceIndex)} to ${formatDayLabel(destIndex)}: "${taskPart}"`;
          }
          return `Could not find that task to move on ${formatDayLabel(sourceIndex)}.`;
        }
      }
      return responseHelp;
    }

    if (/\blighter\b|\breduce\b|\bredistribute\b/.test(lower)) {
      const sourceIndex = dayIndex !== null ? dayIndex : curDay;
      const destIndex = Math.min(sourceIndex + 1, DAYS.length - 1);
      const customTasksSource = getCustomTasks(sourceIndex);
      if (customTasksSource.length > 0) {
        const taskToMove = customTasksSource[0];
        addCustomTaskToDay(destIndex, `Continue: ${taskToMove.text}`);
        removeCustomTask(sourceIndex, taskToMove.id);
        return `Redistributed task to ${formatDayLabel(destIndex)}: "${taskToMove.text}".`;
      }
      return `No custom tasks found on ${formatDayLabel(sourceIndex)} to redistribute.`;
    }

    return responseHelp;
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    addChatMessage("user", text);
    const response = processChatCommand(text);
    setChatInput("");
    setTimeout(() => addChatMessage("assistant", response), 100);
  };

  // Performance-optimized memoized stats
  const { totalOverall, doneOverall, pctOverall } = useMemo(() => {
    const plannedTasks = DAYS.reduce(
      (acc, d, di) =>
        acc + d.sections.reduce((a, sec, si) => a + sec.tasks.length + (extraTasks[di]?.[si]?.length || 0), 0),
      0
    );
    const customCount = Object.values(customTasks).reduce((acc, tasks) => acc + tasks.length, 0);
    const total = plannedTasks + customCount;

    const plannedDone = DAYS.reduce(
      (acc, d, di) =>
        acc +
        d.sections.reduce(
          (a, sec, si) =>
            a +
            sec.tasks.filter((_, ti) => checked[taskId(di, si, ti)]).length +
            (extraTasks[di]?.[si] || []).filter((_, ei) => checked[extraTaskId(di, si, ei)]).length,
          0
        ),
      0
    );
    const customDone = Object.entries(customTasks).reduce(
      (acc, [di, tasks]) => acc + tasks.filter((t) => checked[customTaskId(di, t.id)]).length,
      0
    );
    const done = plannedDone + customDone;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { totalOverall: total, doneOverall: done, pctOverall: pct };
  }, [checked, customTasks, extraTasks]);

  const day = DAYS[curDay];
  const dayCustomTasks = getCustomTasks(curDay);

  const { dayTasks, dayDone, dayPct } = useMemo(() => {
    const dayExtra = (si) => extraTasks[curDay]?.[si] || [];
    const total = day.sections.reduce((a, s, si) => a + s.tasks.length + dayExtra(si).length, 0) + dayCustomTasks.length;
    const done = day.sections.reduce(
      (a, sec, si) =>
        a +
        sec.tasks.filter((_, ti) => checked[taskId(curDay, si, ti)]).length +
        dayExtra(si).filter((_, ei) => checked[extraTaskId(curDay, si, ei)]).length,
      0
    ) + dayCustomTasks.filter((t) => checked[customTaskId(curDay, t.id)]).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { dayTasks: total, dayDone: done, dayPct: pct };
  }, [day, curDay, dayCustomTasks, checked, extraTasks]);

  const { completedDays, consistency, currentStreak, bestStreak } = useMemo(() => {
    const dayStats = DAYS.map((d, di) => {
      const cTasks = customTasks[di] || [];
      const total = d.sections.reduce((a, sec, si) => a + sec.tasks.length + (extraTasks[di]?.[si]?.length || 0), 0) + cTasks.length;
      const done = d.sections.reduce(
        (a, sec, si) =>
          a +
          sec.tasks.filter((_, ti) => checked[taskId(di, si, ti)]).length +
          (extraTasks[di]?.[si] || []).filter((_, ei) => checked[extraTaskId(di, si, ei)]).length,
        0
      ) + cTasks.filter((t) => checked[customTaskId(di, t.id)]).length;
      return { total, done, completed: total > 0 && done >= total };
    });

    const daysSoFar = Math.min(curDay + 1, DAYS.length);
    const completed = dayStats.slice(0, daysSoFar).filter((d) => d.completed).length;
    const cons = daysSoFar ? Math.round((completed / daysSoFar) * 100) : 0;

    let curStk = 0;
    for (let i = curDay; i >= 0; i--) {
      if (dayStats[i].completed) curStk++;
      else break;
    }

    let bstStk = 0;
    let run = 0;
    dayStats.slice(0, daysSoFar).forEach((d) => {
      if (d.completed) {
        run++;
        if (run > bstStk) bstStk = run;
      } else {
        run = 0;
      }
    });

    return { completedDays: completed, consistency: cons, currentStreak: curStk, bestStreak: bstStk };
  }, [checked, customTasks, extraTasks, curDay]);

  const { leetCodeTaskCount, leetCodeDoneCount, dsaTaskCount, dsaDoneCount } = useMemo(() => {
    let lcTotal = 0;
    let lcDone = 0;
    let dsaTotal = 0;
    let dsaDone = 0;

    DAYS.forEach((d, di) => {
      d.sections.forEach((sec, si) => {
        const isLC = /LeetCode/i.test(sec.label);
        const isDSA = isDsaOrUdemyTask(sec.label);
        if (isLC || isDSA) {
          const exCount = extraTasks[di]?.[si]?.length || 0;
          const totalSec = sec.tasks.length + exCount;
          const doneSec = sec.tasks.filter((_, ti) => checked[taskId(di, si, ti)]).length +
            (extraTasks[di]?.[si] || []).filter((_, ei) => checked[extraTaskId(di, si, ei)]).length;

          if (isLC) {
            lcTotal += totalSec;
            lcDone += doneSec;
          }
          if (isDSA) {
            dsaTotal += totalSec;
            dsaDone += doneSec;
          }
        }
      });
    });

    return {
      leetCodeTaskCount: lcTotal,
      leetCodeDoneCount: lcDone,
      dsaTaskCount: dsaTotal,
      dsaDoneCount: dsaDone,
    };
  }, [checked, extraTasks]);

  const phaseColor = PHASE_INFO[day.phase]?.color || "#00F0FF";

  const carryoverTasks = useMemo(() => {
    const planned = DAYS.slice(0, curDay).flatMap((prevDay, di) =>
      prevDay.sections.flatMap((sec, si) => {
        if (isDsaOrUdemyTask(sec.label)) return [];
        return sec.tasks
          .map((task, ti) => ({
            id: taskId(di, si, ti),
            dayIndex: di,
            sectionIndex: si,
            taskIndex: ti,
            task,
            dayLabel: getDayLabel(prevDay),
            sectionLabel: sec.label,
            phaseColor: PHASE_INFO[prevDay.phase]?.color || "#00F0FF",
          }))
          .filter((item) => !checked[item.id]);
      })
    );

    const custom = DAYS.slice(0, curDay).flatMap((prevDay, di) =>
      (customTasks[di] || [])
        .map((task) => ({
          id: customTaskId(di, task.id),
          dayIndex: di,
          customId: task.id,
          task: task.text,
          dayLabel: getDayLabel(prevDay),
          sectionLabel: "Added Task",
          isCustom: true,
          phaseColor: "#00F0FF",
        }))
        .filter((item) => !checked[item.id])
    );

    const extra = DAYS.slice(0, curDay).flatMap((prevDay, di) =>
      prevDay.sections.flatMap((sec, si) => {
        if (isDsaOrUdemyTask(sec.label)) return [];
        return (extraTasks[di]?.[si] || [])
          .map((task, ei) => ({
            id: extraTaskId(di, si, ei),
            dayIndex: di,
            sectionIndex: si,
            extraIndex: ei,
            task,
            dayLabel: getDayLabel(prevDay),
            sectionLabel: sec.label,
            phaseColor: PHASE_INFO[prevDay.phase]?.color || "#00F0FF",
          }))
          .filter((item) => !checked[item.id]);
      })
    );

    return [...planned, ...custom, ...extra];
  }, [curDay, checked, customTasks, extraTasks]);

  const renderPriorityControl = (id, fallbackValue = null, isSection = false) => {
    const value = (isSection ? getSectionPriorityValue(id) : getPriorityValue(id)) ?? fallbackValue;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", marginTop: 5 }}>
        {priorityButtons.map((buttonValue) => {
          const active = value === buttonValue;
          return (
            <button
              key={buttonValue}
              type="button"
              onClick={(event) => { event.stopPropagation(); updatePriority(id, active ? null : buttonValue, isSection); }}
              style={{
                minWidth: 20,
                height: 20,
                borderRadius: 4,
                border: `1px solid ${active ? getPriorityColor(buttonValue) : "rgba(148, 163, 184, 0.2)"}`,
                background: active ? `${getPriorityColor(buttonValue)}22` : "transparent",
                color: active ? getPriorityColor(buttonValue) : "#64748B",
                cursor: "pointer",
                fontSize: 10,
                fontWeight: 600,
                fontFamily: "'JetBrains Mono', monospace",
                padding: "0 4px",
              }}
            >
              {buttonValue}
            </button>
          );
        })}
        {value ? (
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); clearPriority(id, isSection); }}
            style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, border: "1px solid rgba(239, 68, 68, 0.3)", background: "transparent", color: "#F87171", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace" }}
          >
            clear
          </button>
        ) : null}
      </div>
    );
  };

  const cardStyle = {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: 12,
    padding: "18px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
  };

  return (
    <div style={{ minHeight: "100vh", padding: "24px 28px", color: "#F8FAFC" }}>
      {/* Header Bar */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "#00F0FF", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", background: "rgba(0, 240, 255, 0.12)", padding: "3px 10px", borderRadius: 4, border: "1px solid rgba(0, 240, 255, 0.4)" }}>
                SWE VACATION ROADMAP
              </span>
              <span style={{ fontSize: 12, color: "#94A3B8", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>v4.2</span>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              Focus Mode · Daily Execution & Backlog Tracker
            </div>
            <div style={{ fontSize: 13, color: "#CBD5E1", marginTop: 5, fontWeight: 500 }}>
              Abdul Bari DSA (Ready) · LeetCode 75/Mastery · Certifications · Real-time Carryover
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              {[
                ["roadmap", "ROADMAP VIEW"],
                ["leetcode", "LEETCODE TRACKER"],
              ].map(([view, label]) => {
                const active = activeView === view;
                return (
                  <button
                    key={view}
                    type="button"
                    onClick={() => setActiveView(view)}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "8px 16px",
                      borderRadius: 6,
                      border: `1.5px solid ${active ? "#00F0FF" : "#334155"}`,
                      background: active ? "rgba(0, 240, 255, 0.18)" : "#0f172a",
                      color: active ? "#00F0FF" : "#CBD5E1",
                      cursor: "pointer",
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.06em",
                      boxShadow: active ? "0 0 16px rgba(0, 240, 255, 0.25)" : "none",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Self-contained Live Clock component */}
          <LiveClock />
        </div>
      </div>

      {activeView === "roadmap" ? (
        <>
          {/* Overall Progress HUD */}
          <div style={{ ...cardStyle, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
                OVERALL ROADMAP COMPLETION
              </span>
              <span style={{ fontSize: 14, fontWeight: 800, color: "#FFFFFF", fontFamily: "'JetBrains Mono', monospace" }}>
                {doneOverall}/{totalOverall} tasks · {pctOverall}%
              </span>
            </div>
            <div style={{ background: "rgba(255, 255, 255, 0.12)", borderRadius: 99, height: 8, overflow: "hidden" }}>
              <div
                style={{
                  width: `${pctOverall}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #00F0FF 0%, #10B981 100%)",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                  boxShadow: "0 0 12px rgba(0, 240, 255, 0.5)",
                }}
              />
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 10, marginBottom: 16 }}>
            <div style={cardStyle}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>COMPLETED DAYS</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", fontFamily: "'JetBrains Mono', monospace" }}>
                {completedDays}/{DAYS.length}
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>All planned tasks completed</div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>CURRENT STREAK</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#10B981", fontFamily: "'JetBrains Mono', monospace" }}>
                {currentStreak} day{currentStreak === 1 ? "" : "s"}
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>Consecutive fully done days</div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>BEST STREAK</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#FBBF24", fontFamily: "'JetBrains Mono', monospace" }}>
                {bestStreak} day{bestStreak === 1 ? "" : "s"}
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>Peak consistency run</div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>CONSISTENCY</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#00F0FF", fontFamily: "'JetBrains Mono', monospace" }}>
                {consistency}%
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>Days finished so far</div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>LEETCODE TASKS</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#FFFFFF", fontFamily: "'JetBrains Mono', monospace" }}>
                {leetCodeDoneCount}/{leetCodeTaskCount}
              </div>
              <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>
                {leetCodeTaskCount ? Math.round((leetCodeDoneCount / leetCodeTaskCount) * 100) : 0}% done
              </div>
            </div>

            <div style={cardStyle}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>DSA & UDEMY</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#34D399", fontFamily: "'JetBrains Mono', monospace" }}>
                {dsaDoneCount}/{dsaTaskCount}
              </div>
              <div style={{ fontSize: 11.5, color: "#34D399", marginTop: 4, display: "flex", alignItems: "center", gap: 4, fontWeight: 600 }}>
                {dsaTaskCount ? Math.round((dsaDoneCount / dsaTaskCount) * 100) : 100}% ready
              </div>
            </div>
          </div>

          {/* Reset & Status Banner */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: 13, color: "#CBD5E1", fontWeight: 500 }}>
              Note: Unfinished tasks from previous days automatically roll forward into the carryover backlog.
            </div>
            <button
              type="button"
              onClick={() => { if (window.confirm("Are you sure you want to reset all progress?")) setChecked(getInitialDsaChecked()); }}
              style={{
                fontSize: 11.5,
                fontWeight: 700,
                padding: "6px 14px",
                borderRadius: 6,
                border: "1.5px solid rgba(239, 68, 68, 0.7)",
                background: "rgba(239, 68, 68, 0.15)",
                color: "#FCA5A5",
                cursor: "pointer",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              RESET ALL
            </button>
          </div>

          {/* Roadmap AI Assistant */}
          <div style={{ ...cardStyle, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#00F0FF", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Roadmap AI Assistant
                </span>
                <div style={{ fontSize: 11, color: "#94A3B8" }}>Add, move, or redistribute tasks across your schedule using natural commands.</div>
              </div>
            </div>

            <div style={{ maxHeight: 200, overflowY: "auto", padding: "8px 0", display: "grid", gap: 8 }}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    alignSelf: message.sender === "assistant" ? "flex-start" : "flex-end",
                    display: "flex",
                    justifyContent: message.sender === "assistant" ? "flex-start" : "flex-end",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "80%",
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: message.sender === "assistant" ? "rgba(10, 15, 29, 0.9)" : "rgba(0, 240, 255, 0.15)",
                      color: "#F8FAFC",
                      fontSize: 12.5,
                      lineHeight: 1.45,
                      border: `1px solid ${message.sender === "assistant" ? "rgba(148, 163, 184, 0.2)" : "rgba(0, 240, 255, 0.3)"}`,
                    }}
                  >
                    <div style={{ fontSize: 9.5, color: "#64748B", marginBottom: 3, textTransform: "uppercase", fontWeight: 700 }}>
                      {message.sender === "assistant" ? "Roadmap AI" : "You"}
                    </div>
                    <div>{message.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="e.g. 'add internship meeting to 23 May' or 'move task from 23 May to 24 May'"
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "10px 14px",
                  borderRadius: 6,
                  border: "1.5px solid #334155",
                  background: "#0b1120",
                  color: "#FFFFFF",
                  fontSize: 12.5,
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: "none",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "10px 18px",
                  borderRadius: 6,
                  border: "1px solid #00F0FF",
                  background: "#00F0FF",
                  color: "#050811",
                  cursor: "pointer",
                  fontSize: 12.5,
                  fontWeight: 800,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                Execute
              </button>
            </form>
          </div>

          {/* 53-Day Matrix Picker */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))", gap: 7, marginBottom: 20 }}>
            {DAYS.map((d, di) => {
              const customForDay = getCustomTasks(di);
              const total = d.sections.reduce((a, s) => a + s.tasks.length, 0) + customForDay.length;
              const done = d.sections.reduce((a, sec, si) => a + sec.tasks.filter((_, ti) => checked[taskId(di, si, ti)]).length, 0) +
                customForDay.filter((task) => checked[customTaskId(di, task.id)]).length;
              const pct = total ? done / total : 0;
              const isActive = di === curDay;
              const c = PHASE_INFO[d.phase]?.color || "#00F0FF";
              const dayDate = d.d.split(", ")[1] || d.d;

              return (
                <button
                  key={di}
                  onClick={() => setCurDay(di)}
                  style={{
                    padding: "9px 4px",
                    borderRadius: 8,
                    border: `1.5px solid ${isActive ? c : "rgba(148, 163, 184, 0.28)"}`,
                    background: isActive ? "#1e293b" : "#0f172a",
                    cursor: "pointer",
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: isActive ? `0 0 16px ${c}55` : "none",
                    transition: "all 0.15s ease",
                  }}
                >
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${pct * 100}%`, background: c, opacity: 0.25 }} />
                  <div style={{ fontSize: 10, fontWeight: 700, color: isActive ? c : "#94A3B8", letterSpacing: "0.04em", marginBottom: 2 }}>
                    D{di + 1}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: isActive ? 800 : 600, color: isActive ? "#FFFFFF" : "#E2E8F0", lineHeight: 1.2, position: "relative" }}>
                    {dayDate}
                  </div>
                  {pct === 1 && (
                    <div style={{ position: "absolute", top: 3, right: 3, width: 6, height: 6, borderRadius: "50%", background: c, boxShadow: `0 0 6px ${c}` }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Day Detail Card */}
          <div style={{ ...cardStyle, padding: 0, overflow: "hidden", marginBottom: 16 }}>
            {/* Header */}
            <div style={{ background: "#0f172a", borderBottom: "1px solid #1e293b", padding: "18px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 4, background: `${phaseColor}25`, color: phaseColor, border: `1.5px solid ${phaseColor}88`, letterSpacing: "0.08em" }}>
                  DAY {curDay + 1}
                </span>
                <span style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 600 }}>{day.phase}</span>
                {carryoverTasks.length > 0 && (
                  <span style={{ fontSize: 12, color: "#FBBF24", fontWeight: 700, background: "rgba(251, 191, 36, 0.15)", padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(251, 191, 36, 0.4)" }}>
                    {carryoverTasks.length} carried over
                  </span>
                )}
                <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 800, color: dayPct === 100 ? "#10B981" : "#FFFFFF", fontFamily: "'JetBrains Mono', monospace" }}>
                  {dayDone}/{dayTasks} done ({dayPct}%)
                </span>
              </div>

              <div style={{ fontSize: 20, fontWeight: 800, color: "#FFFFFF" }}>{getDayLabel(day)}</div>
              {day.note && <div style={{ fontSize: 13, color: "#CBD5E1", fontStyle: "italic", marginTop: 4 }}>{day.note}</div>}

              <div style={{ background: "rgba(255, 255, 255, 0.12)", borderRadius: 99, height: 6, marginTop: 14, overflow: "hidden" }}>
                <div style={{ width: `${dayPct}%`, height: "100%", background: phaseColor, transition: "width 0.3s ease", borderRadius: 99 }} />
              </div>
            </div>

            {/* Content & Tasks */}
            <div style={{ padding: "20px 22px" }}>
              {/* Carryover Box */}
              {carryoverTasks.length > 0 && (
                <div style={{ marginBottom: 22, border: "1.5px solid rgba(245, 158, 11, 0.5)", borderRadius: 10, background: "rgba(245, 158, 11, 0.08)", padding: "14px 16px" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "#FDE047", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10, borderBottom: "1px solid rgba(245, 158, 11, 0.25)", paddingBottom: 6 }}>
                    Backlog Carryover From Previous Days ({carryoverTasks.length} pending)
                  </div>

                  {carryoverTasks.map((item, idx) => {
                    const href = getTaskLink(item.task, item.sectionLabel, problemsByNumber);
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (!href) item.isCustom ? toggleById(item.id) : toggle(item.dayIndex, item.sectionIndex, item.taskIndex);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          padding: "8px 0",
                          cursor: href ? "default" : "pointer",
                          borderBottom: idx < carryoverTasks.length - 1 ? "1px solid rgba(245, 158, 11, 0.12)" : "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            item.isCustom ? toggleById(item.id) : toggle(item.dayIndex, item.sectionIndex, item.taskIndex);
                          }}
                          style={{
                            width: 17,
                            height: 17,
                            minWidth: 17,
                            marginTop: 2,
                            borderRadius: 4,
                            border: "1.5px solid #F59E0B",
                            background: "transparent",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        />
                        <div style={{ display: "grid", gap: 2, flex: 1 }}>
                          {href ? (
                            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: 13.5, color: "#FEF08A", lineHeight: 1.5, textDecoration: "none", fontWeight: 600 }}>
                              {item.task} ↗
                            </a>
                          ) : (
                            <span style={{ fontSize: 13.5, color: "#FEF08A", lineHeight: 1.5, fontWeight: 500 }}>{item.task}</span>
                          )}
                          <span style={{ fontSize: 12, color: "#CBD5E1" }}>
                            From: {item.dayLabel} · {item.sectionLabel}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Day's Scheduled Sections */}
              {day.sections.map((section, si) => {
                const sectionId = `${curDay}_${si}`;
                const sectionPriority = getSectionPriorityValue(sectionId);
                const extraItems = getExtraTasks(curDay, si);

                return (
                  <div key={section.label} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8, borderBottom: "1px solid #1e293b", paddingBottom: 8 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 12, fontWeight: 800, color: phaseColor, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {section.label}
                        </span>
                        {isDsaOrUdemyTask(section.label) && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: "#34D399", background: "rgba(52, 211, 153, 0.15)", border: "1px solid rgba(52, 211, 153, 0.4)", borderRadius: 4, padding: "2px 8px" }}>
                            READY (Udemy)
                          </span>
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {renderPriorityControl(sectionId, sectionPriority, true)}
                        <button
                          type="button"
                          onClick={() => addMoreTasks(curDay, si, section.label, section.tasks)}
                          style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4, border: "1px solid #00F0FF", background: "rgba(0, 240, 255, 0.12)", color: "#00F0FF", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace" }}
                        >
                          + extra task
                        </button>
                      </div>
                    </div>

                    {/* Regular Tasks */}
                    {section.tasks.map((task, ti) => {
                      const id = taskId(curDay, si, ti);
                      const done = !!checked[id];
                      const href = getTaskLink(task, section.label, problemsByNumber);

                      return (
                        <div
                          key={task}
                          onClick={() => { if (!href) toggle(curDay, si, ti); }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "9px 0",
                            cursor: href ? "default" : "pointer",
                            borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={(event) => { event.stopPropagation(); toggle(curDay, si, ti); }}
                            style={{
                              width: 18,
                              height: 18,
                              minWidth: 18,
                              marginTop: 2,
                              borderRadius: 4,
                              border: `1.5px solid ${done ? phaseColor : "rgba(148, 163, 184, 0.45)"}`,
                              background: done ? phaseColor : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            {done && <span style={{ fontSize: 11, color: "#050811", fontWeight: 800 }}>✓</span>}
                          </button>
                          <div style={{ flex: 1 }}>
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                style={{ fontSize: 13.5, color: done ? "#94A3B8" : "#38BDF8", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 600 }}
                              >
                                {task} ↗
                              </a>
                            ) : (
                              <span style={{ fontSize: 13.5, color: done ? "#94A3B8" : "#FFFFFF", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 500 }}>
                                {task}
                              </span>
                            )}
                            {renderPriorityControl(id, sectionPriority)}
                          </div>
                        </div>
                      );
                    })}

                    {/* Extra Added Tasks for this section */}
                    {extraItems.map((task, ei) => {
                      const id = extraTaskId(curDay, si, ei);
                      const done = !!checked[id];
                      const href = getTaskLink(task, section.label, problemsByNumber);

                      return (
                        <div
                          key={task}
                          onClick={() => { if (!href) toggleById(id); }}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 10,
                            padding: "8px 0",
                            cursor: href ? "default" : "pointer",
                            borderBottom: "1px solid rgba(148, 163, 184, 0.08)",
                          }}
                        >
                          <button
                            type="button"
                            onClick={(event) => { event.stopPropagation(); toggleById(id); }}
                            style={{
                              width: 18,
                              height: 18,
                              minWidth: 18,
                              marginTop: 2,
                              borderRadius: 4,
                              border: `1.5px solid ${done ? phaseColor : "rgba(148, 163, 184, 0.45)"}`,
                              background: done ? phaseColor : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              padding: 0,
                            }}
                          >
                            {done && <span style={{ fontSize: 11, color: "#050811", fontWeight: 800 }}>✓</span>}
                          </button>
                          <div style={{ flex: 1 }}>
                            {href ? (
                              <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: 13.5, color: done ? "#94A3B8" : "#38BDF8", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 600 }}>
                                {task} ↗
                              </a>
                            ) : (
                              <span style={{ fontSize: 13.5, color: done ? "#94A3B8" : "#E2E8F0", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 500 }}>
                                {task}
                              </span>
                            )}
                            {renderPriorityControl(id, sectionPriority)}
                          </div>
                          <button
                            type="button"
                            onClick={(event) => { event.stopPropagation(); removeExtraTask(curDay, si, ei); }}
                            style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(239, 68, 68, 0.4)", background: "rgba(239, 68, 68, 0.1)", color: "#FCA5A5", cursor: "pointer", fontWeight: 600 }}
                          >
                            remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}

              {/* Day's Custom Added Tasks */}
              {dayCustomTasks.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#00F0FF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, borderBottom: "1px solid #1e293b", paddingBottom: 6 }}>
                    Custom Added Tasks
                  </div>
                  {dayCustomTasks.map((task, ti) => {
                    const id = customTaskId(curDay, task.id);
                    const done = !!checked[id];
                    const href = getTaskLink(task.text, "Added Task", problemsByNumber);

                    return (
                      <div
                        key={task.id}
                        onClick={() => { if (!href) toggleById(id); }}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 10,
                          padding: "9px 0",
                          cursor: href ? "default" : "pointer",
                          borderBottom: ti < dayCustomTasks.length - 1 ? "1px solid rgba(148, 163, 184, 0.1)" : "none",
                        }}
                      >
                        <button
                          type="button"
                          onClick={(event) => { event.stopPropagation(); toggleById(id); }}
                          style={{
                            width: 18,
                            height: 18,
                            minWidth: 18,
                            marginTop: 2,
                            borderRadius: 4,
                            border: `1.5px solid ${done ? phaseColor : "rgba(148, 163, 184, 0.45)"}`,
                            background: done ? phaseColor : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            padding: 0,
                          }}
                        >
                          {done && <span style={{ fontSize: 11, color: "#050811", fontWeight: 800 }}>✓</span>}
                        </button>
                        <div style={{ flex: 1 }}>
                          {href ? (
                            <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: 13.5, color: done ? "#94A3B8" : "#38BDF8", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 600 }}>
                              {task.text} ↗
                            </a>
                          ) : (
                            <span style={{ fontSize: 13.5, color: done ? "#94A3B8" : "#FFFFFF", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, fontWeight: done ? 400 : 500 }}>
                              {task.text}
                            </span>
                          )}
                          {/* Fixed: pass null safely instead of undefined sectionPriority */}
                          {renderPriorityControl(id, null)}
                        </div>
                        <button
                          type="button"
                          onClick={(event) => { event.stopPropagation(); removeCustomTask(curDay, task.id); }}
                          style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, border: "1px solid rgba(239, 68, 68, 0.4)", background: "rgba(239, 68, 68, 0.1)", color: "#FCA5A5", cursor: "pointer", fontWeight: 600 }}
                        >
                          remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add Custom Task Form */}
              <form onSubmit={addCustomTask} style={{ display: "flex", gap: 8, marginTop: 18, paddingTop: 16, borderTop: "1px solid #1e293b" }}>
                <input
                  value={customTaskText}
                  onChange={(e) => setCustomTaskText(e.target.value)}
                  placeholder={`Add a custom task to ${getDayLabel(day)}...`}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    padding: "10px 14px",
                    borderRadius: 6,
                    border: "1.5px solid #334155",
                    background: "#0b1120",
                    color: "#FFFFFF",
                    fontSize: 12.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "9px 14px",
                    borderRadius: 6,
                    border: `1px solid ${phaseColor}`,
                    background: `${phaseColor}15`,
                    color: phaseColor,
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    fontFamily: "'JetBrains Mono', monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  + Add Task
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button
              type="button"
              onClick={() => setCurDay((d) => Math.max(0, d - 1))}
              disabled={curDay === 0}
              style={{
                flex: 1,
                padding: "10px",
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: 8,
                color: curDay === 0 ? "#475569" : "#94A3B8",
                cursor: curDay === 0 ? "default" : "pointer",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            >
              ← Previous Day
            </button>
            <button
              type="button"
              onClick={() => setCurDay((d) => Math.min(DAYS.length - 1, d + 1))}
              disabled={curDay === DAYS.length - 1}
              style={{
                flex: 1,
                padding: "10px",
                background: "rgba(15, 23, 42, 0.7)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: 8,
                color: curDay === DAYS.length - 1 ? "#475569" : "#94A3B8",
                cursor: curDay === DAYS.length - 1 ? "default" : "pointer",
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 600,
              }}
            >
              Next Day →
            </button>
          </div>
        </>
      ) : (
        <Suspense fallback={<div style={{ ...cardStyle, textAlign: "center", color: "#94A3B8", fontSize: 13, padding: 32 }}>Loading LeetCode Dashboard...</div>}>
          <LeetCodeDashboard />
        </Suspense>
      )}
    </div>
  );
}
