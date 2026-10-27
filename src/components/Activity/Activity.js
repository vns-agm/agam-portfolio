import React, { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaFire, FaCodeBranch } from "react-icons/fa";
import { BiGitCommit } from "react-icons/bi";
import { AiFillGithub } from "react-icons/ai";
import Reveal from "../Reveal";

const USERNAME = "vns-agm";
// Earliest month the navigator goes back to (start of career).
const FIRST_MONTH = { year: 2022, month: 0 };
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const pad = (n) => String(n).padStart(2, "0");
const isoDay = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();

// sessionStorage can be unavailable (private mode, blocked storage), so every access is guarded.
function cacheGet(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function cacheSet(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    /* ignore */
  }
}

// Per-day contribution counts for a whole calendar year.
async function fetchYear(year) {
  const key = `gh-contrib-${USERNAME}-${year}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=${year}`);
  if (!res.ok) throw new Error("Could not load contribution data");
  const json = await res.json();
  const byDay = {};
  (json.contributions || []).forEach(({ date, count, level }) => {
    byDay[date] = { count, level };
  });
  cacheSet(key, byDay);
  return byDay;
}

// Commits authored in a given month, via GitHub's commit search.
async function fetchCommits(year, month) {
  const key = `gh-commits-v2-${USERNAME}-${year}-${month}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const from = isoDay(year, month, 1);
  const to = isoDay(year, month, daysIn(year, month));
  const q = encodeURIComponent(`author:${USERNAME} author-date:${from}..${to}`);
  const res = await fetch(
    `https://api.github.com/search/commits?q=${q}&sort=author-date&order=desc&per_page=100`,
    { headers: { Accept: "application/vnd.github+json" } }
  );
  if (res.status === 403 || res.status === 429) {
    throw new Error("GitHub's rate limit was hit. Wait a minute and try again.");
  }
  if (!res.ok) throw new Error("Could not load commits from GitHub");
  const json = await res.json();
  const commits = (json.items || []).map((item) => ({
    sha: item.sha,
    url: item.html_url,
    repo: item.repository?.full_name || "",
    repoUrl: item.repository?.html_url || "",
    message: (item.commit?.message || "").split("\n")[0],
    date: item.commit?.author?.date,
  }));
  // Search can return the same commit more than once (e.g. via forks); keep one per repo+sha.
  const seen = new Set();
  const unique = commits.filter((c) => {
    const id = `${c.repo}@${c.sha}`;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
  const result = { total: json.total_count || unique.length, commits: unique };
  cacheSet(key, result);
  return result;
}

function localDayKey(dateString) {
  const d = new Date(dateString);
  return isoDay(d.getFullYear(), d.getMonth(), d.getDate());
}

function Activity() {
  const now = new Date();
  const [cursor, setCursor] = useState({ year: now.getFullYear(), month: now.getMonth() });
  const [years, setYears] = useState({});
  const [yearError, setYearError] = useState(null);
  const [commitState, setCommitState] = useState({ status: "loading" });
  const [selectedDay, setSelectedDay] = useState(null);

  const { year, month } = cursor;
  const atStart = year === FIRST_MONTH.year && month === FIRST_MONTH.month;
  const atEnd = year === now.getFullYear() && month === now.getMonth();

  useEffect(() => {
    if (years[year]) return;
    let cancelled = false;
    setYearError(null);
    fetchYear(year)
      .then((data) => !cancelled && setYears((prev) => ({ ...prev, [year]: data })))
      .catch((e) => !cancelled && setYearError(e.message));
    return () => {
      cancelled = true;
    };
  }, [year, years]);

  useEffect(() => {
    let cancelled = false;
    setSelectedDay(null);
    setCommitState({ status: "loading" });
    fetchCommits(year, month)
      .then((data) => !cancelled && setCommitState({ status: "ready", ...data }))
      .catch((e) => !cancelled && setCommitState({ status: "error", message: e.message }));
    return () => {
      cancelled = true;
    };
  }, [year, month]);

  const yearData = years[year];

  const monthTotals = useMemo(() => {
    if (!yearData) return null;
    return MONTHS.map((_, m) => {
      let sum = 0;
      for (let d = 1; d <= daysIn(year, m); d++) sum += yearData[isoDay(year, m, d)]?.count || 0;
      return sum;
    });
  }, [yearData, year]);

  const stats = useMemo(() => {
    if (!yearData) return null;
    let total = 0;
    let activeDays = 0;
    let best = { count: 0, day: null };
    let streak = 0;
    let longest = 0;
    for (let d = 1; d <= daysIn(year, month); d++) {
      const key = isoDay(year, month, d);
      const c = yearData[key]?.count || 0;
      total += c;
      if (c > 0) {
        activeDays++;
        streak++;
        longest = Math.max(longest, streak);
      } else {
        streak = 0;
      }
      if (c > best.count) best = { count: c, day: d };
    }
    return { total, activeDays, best, longest };
  }, [yearData, year, month]);

  const cells = useMemo(() => {
    // Monday-first grid: blank cells before the 1st.
    const offset = (new Date(year, month, 1).getDay() + 6) % 7;
    const list = Array.from({ length: offset }, (_, i) => ({ blank: true, key: `b${i}` }));
    for (let d = 1; d <= daysIn(year, month); d++) {
      const key = isoDay(year, month, d);
      const entry = yearData?.[key];
      const future = new Date(year, month, d) > now;
      list.push({ key, day: d, count: entry?.count || 0, level: entry?.level || 0, future });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearData, year, month]);

  const commitsByDay = useMemo(() => {
    if (commitState.status !== "ready") return {};
    return commitState.commits.reduce((acc, c) => {
      const k = localDayKey(c.date);
      (acc[k] = acc[k] || []).push(c);
      return acc;
    }, {});
  }, [commitState]);

  const visibleDays = Object.keys(commitsByDay)
    .filter((k) => !selectedDay || k === selectedDay)
    .sort((a, b) => b.localeCompare(a));

  const maxMonth = monthTotals ? Math.max(1, ...monthTotals) : 1;

  const step = (delta) => {
    setCursor(({ year: y, month: m }) => {
      const next = new Date(y, m + delta, 1);
      return { year: next.getFullYear(), month: next.getMonth() };
    });
  };

  return (
    <Container fluid className="activity-section">
      <Container>
        <Reveal as="h1" className="project-heading">
          Code <strong className="purple">Activity</strong>
        </Reveal>
        <p className="project-subheading">
          My GitHub commits, live from{" "}
          <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="purple">
            @{USERNAME}
          </a>
          . Pick a month, then click a day to see what I shipped.
        </p>

        <Reveal className="activity-shell glass-card">
          <div className="activity-toolbar">
            <button type="button" className="icon-btn" onClick={() => step(-1)} disabled={atStart} aria-label="Previous month">
              <FaChevronLeft />
            </button>
            <h2 className="activity-month">
              {MONTHS_LONG[month]} <span>{year}</span>
            </h2>
            <button type="button" className="icon-btn" onClick={() => step(1)} disabled={atEnd} aria-label="Next month">
              <FaChevronRight />
            </button>
          </div>

          <div className="month-bars" role="list" aria-label={`Contributions per month in ${year}`}>
            {MONTHS.map((label, m) => {
              const total = monthTotals?.[m] ?? 0;
              const disabled =
                new Date(year, m, 1) > now ||
                year < FIRST_MONTH.year ||
                (year === FIRST_MONTH.year && m < FIRST_MONTH.month);
              return (
                <button
                  type="button"
                  role="listitem"
                  key={label}
                  className={`month-bar ${m === month ? "is-active" : ""}`}
                  disabled={disabled}
                  onClick={() => setCursor({ year, month: m })}
                  title={`${total} contributions in ${MONTHS_LONG[m]} ${year}`}
                >
                  <span className="month-bar-count">{monthTotals ? total : ""}</span>
                  <span className="month-bar-track">
                    <span
                      className="month-bar-fill"
                      style={{ height: `${monthTotals ? Math.max(4, (total / maxMonth) * 100) : 4}%` }}
                    />
                  </span>
                  <span className="month-bar-label">{label}</span>
                </button>
              );
            })}
          </div>

          <div className="activity-grid">
            <div>
              <div className="activity-stats">
                <div className="stat-pill">
                  <strong>{stats ? stats.total : "–"}</strong>
                  <span>contributions</span>
                </div>
                <div className="stat-pill">
                  <strong>{stats ? stats.activeDays : "–"}</strong>
                  <span>active days</span>
                </div>
                <div className="stat-pill">
                  <strong>
                    <FaFire className="purple" /> {stats ? stats.longest : "–"}
                  </strong>
                  <span>day streak</span>
                </div>
              </div>

              {yearError && <p className="activity-note">{yearError}</p>}

              <div className="calendar">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="calendar-weekday">{w}</span>
                ))}
                {cells.map((cell) =>
                  cell.blank ? (
                    <span key={cell.key} />
                  ) : (
                    <button
                      type="button"
                      key={cell.key}
                      disabled={cell.future}
                      className={`calendar-day level-${cell.level} ${selectedDay === cell.key ? "is-selected" : ""} ${
                        !yearData ? "is-loading" : ""
                      }`}
                      onClick={() => setSelectedDay(selectedDay === cell.key ? null : cell.key)}
                      title={`${cell.count} contribution${cell.count === 1 ? "" : "s"} on ${MONTHS[month]} ${cell.day}`}
                    >
                      <span className="calendar-day-num">{cell.day}</span>
                      {cell.count > 0 && <span className="calendar-day-count">{cell.count}</span>}
                    </button>
                  )
                )}
              </div>
              <div className="calendar-legend">
                Less
                {[0, 1, 2, 3, 4].map((l) => (
                  <span key={l} className={`legend-swatch level-${l}`} />
                ))}
                More
              </div>
            </div>

            <div className="commit-panel">
              <div className="commit-panel-head">
                <h3>
                  <BiGitCommit /> Commits
                  {selectedDay && (
                    <button type="button" className="chip-btn" onClick={() => setSelectedDay(null)}>
                      {MONTHS[month]} {Number(selectedDay.slice(-2))} ✕
                    </button>
                  )}
                </h3>
                {commitState.status === "ready" && (
                  <span className="commit-count">{commitState.total} this month</span>
                )}
              </div>

              <div className="commit-list">
                {commitState.status === "loading" &&
                  [0, 1, 2, 3].map((i) => <div key={i} className="commit-skeleton" />)}

                {commitState.status === "error" && (
                  <div className="activity-empty">
                    <p>{commitState.message}</p>
                    <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                      <AiFillGithub /> Open GitHub
                    </a>
                  </div>
                )}

                {commitState.status === "ready" && visibleDays.length === 0 && (
                  <div className="activity-empty">
                    <p>
                      {selectedDay
                        ? "No public commits on this day. Contributions can also be PRs, issues or private work."
                        : "No public commits this month."}
                    </p>
                  </div>
                )}

                {commitState.status === "ready" &&
                  visibleDays.map((day) => (
                    <div key={day} className="commit-day">
                      <div className="commit-day-label">
                        {new Date(`${day}T00:00:00`).toLocaleDateString(undefined, {
                          weekday: "short",
                          day: "numeric",
                          month: "short",
                        })}
                      </div>
                      {commitsByDay[day].map((c) => (
                        <a key={`${c.repo}@${c.sha}`} href={c.url} target="_blank" rel="noreferrer" className="commit-item">
                          <span className="commit-msg">{c.message}</span>
                          <span className="commit-meta">
                            <FaCodeBranch /> {c.repo}
                            <code>{c.sha.slice(0, 7)}</code>
                          </span>
                        </a>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Container>
  );
}

export default Activity;
