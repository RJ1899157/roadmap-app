import { useEffect, useState } from "react";
import { IST_TIME_ZONE } from "../data/roadmapData";

const formatIstClock = (date) => {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const hour = parts.find((part) => part.type === "hour")?.value || "00";
  const minute = parts.find((part) => part.type === "minute")?.value || "00";
  const second = parts.find((part) => part.type === "second")?.value || "00";
  const dayPeriod = parts.find((part) => part.type === "dayPeriod")?.value || "";
  return `${hour}:${minute}:${second} ${dayPeriod}`.trim();
};

const formatIstDate = (date) =>
  new Intl.DateTimeFormat("en-IN", {
    timeZone: IST_TIME_ZONE,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);

export default function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        minWidth: 170,
        textAlign: "right",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(0, 240, 255, 0.22)",
        borderRadius: 12,
        padding: "10px 14px",
        boxShadow: "0 10px 30px rgba(0, 240, 255, 0.06), inset 0 0 12px rgba(0, 240, 255, 0.03)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 6,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00F0FF",
            boxShadow: "0 0 8px #00F0FF",
            animation: "pulse 2s infinite",
          }}
        />
        <span
          style={{
            fontSize: 10,
            color: "#00F0FF",
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          }}
        >
          IST TIME
        </span>
      </div>
      <div
        style={{
          fontSize: 22,
          lineHeight: 1.1,
          fontWeight: 700,
          color: "#F9FAFB",
          fontVariantNumeric: "tabular-nums",
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
          letterSpacing: "0.02em",
        }}
      >
        {formatIstClock(time)}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#94A3B8",
          marginTop: 4,
          fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
        }}
      >
        {formatIstDate(time)}
      </div>
    </div>
  );
}
