import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineFundProjectionScreen,
  AiOutlineMail,
  AiOutlineDownload,
  AiOutlineCopy,
  AiFillGithub,
} from "react-icons/ai";
import { BiGitCommit } from "react-icons/bi";
import { BsFileEarmarkPdf, BsMoonStars } from "react-icons/bs";
import { FaLinkedinIn, FaChessKnight, FaBlog } from "react-icons/fa";
import { SiLeetcode, SiLichess } from "react-icons/si";
import { toggleTheme } from "../theme";

const EMAIL = "agamsrivastavavns1193@gmail.com";
export const OPEN_PALETTE_EVENT = "open-command-palette";

const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
export const PALETTE_SHORTCUT = isMac ? "⌘K" : "Ctrl K";

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// Spotlight-style launcher: ⌘K / Ctrl+K (or the navbar button) opens it,
// type to filter, ↑/↓ to move, Enter to run, Esc to close.
function CommandPalette() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  };

  const commands = useMemo(
    () => [
      { group: "Pages", label: "Home", Icon: AiOutlineHome, run: () => navigate("/") },
      { group: "Pages", label: "About & experience", Icon: AiOutlineUser, run: () => navigate("/about") },
      { group: "Pages", label: "Projects", Icon: AiOutlineFundProjectionScreen, run: () => navigate("/project") },
      { group: "Pages", label: "Code activity", Icon: BiGitCommit, run: () => navigate("/activity") },
      { group: "Pages", label: "Resume", Icon: BsFileEarmarkPdf, run: () => navigate("/resume") },
      { group: "Pages", label: "Contact", Icon: AiOutlineMail, run: () => navigate("/contact") },
      {
        group: "Actions",
        label: "Play the chess puzzle",
        keywords: "mate game",
        Icon: FaChessKnight,
        run: () => {
          navigate("/");
          setTimeout(() => document.getElementById("puzzle")?.scrollIntoView({ behavior: "smooth", block: "center" }), 350);
        },
      },
      { group: "Actions", label: "Toggle light / dark theme", keywords: "dark light mode", Icon: BsMoonStars, run: () => toggleTheme() },
      {
        group: "Actions",
        label: "Copy email address",
        Icon: AiOutlineCopy,
        run: async () => {
          try {
            await navigator.clipboard.writeText(EMAIL);
            flash("Email copied to clipboard");
          } catch (e) {
            flash(EMAIL);
          }
        },
      },
      {
        group: "Actions",
        label: "Download resume (PDF)",
        Icon: AiOutlineDownload,
        run: () => {
          const a = document.createElement("a");
          a.href = "/Agam_Srivastava_MERN_3.8YOE.pdf";
          a.download = "Agam_Srivastava_Resume.pdf";
          a.click();
        },
      },
      { group: "Links", label: "Blog", keywords: "posts writing articles", Icon: FaBlog, run: () => openExternal("https://agam-blog-iota.vercel.app/") },
      { group: "Links", label: "GitHub", Icon: AiFillGithub, run: () => openExternal("https://github.com/vns-agm") },
      { group: "Links", label: "LinkedIn", Icon: FaLinkedinIn, run: () => openExternal("https://www.linkedin.com/in/agam-srivastava-33456b212/") },
      { group: "Links", label: "LeetCode", Icon: SiLeetcode, run: () => openExternal("https://leetcode.com/u/urVlyMewy3/") },
      { group: "Links", label: "Lichess", Icon: SiLichess, run: () => openExternal("https://lichess.org/@/vns-agm") },
    ],
    [navigate]
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.group} ${c.keywords || ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  // Global shortcut + programmatic open (navbar button).
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus after the open animation's first frame.
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(".is-active")?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const run = (cmd) => {
    close();
    // Let the dialog unmount before navigating or animating the theme.
    setTimeout(() => cmd.run(), 0);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      run(results[active]);
    }
  };

  let lastGroup = null;

  return (
    <>
      {open && (
        <div className="palette-backdrop" onMouseDown={close}>
          <div
            className="palette"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className="palette-search">
              <span className="palette-prompt" aria-hidden="true">›</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Where to? Type a page or action…"
                aria-label="Search commands"
                aria-controls="palette-list"
                aria-activedescendant={results[active] ? `palette-item-${active}` : undefined}
              />
              <kbd>Esc</kbd>
            </div>
            <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
              {results.length === 0 && <li className="palette-empty">No matches. Try "projects" or "theme".</li>}
              {results.map((cmd, i) => {
                const header = cmd.group !== lastGroup ? cmd.group : null;
                lastGroup = cmd.group;
                return (
                  <React.Fragment key={cmd.label}>
                    {header && <li className="palette-group" role="presentation">{header}</li>}
                    <li
                      id={`palette-item-${i}`}
                      role="option"
                      aria-selected={i === active}
                      className={`palette-item ${i === active ? "is-active" : ""}`}
                      onMouseMove={() => i !== active && setActive(i)}
                      onClick={() => run(cmd)}
                    >
                      <cmd.Icon className="palette-icon" />
                      <span>{cmd.label}</span>
                      {i === active && <kbd className="palette-enter">↵</kbd>}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
            <div className="palette-foot">
              <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
              <span><kbd>↵</kbd> open</span>
              <span><kbd>{PALETTE_SHORTCUT}</kbd> toggle</span>
            </div>
          </div>
        </div>
      )}
      {toast && <div className="palette-toast" role="status">{toast}</div>}
    </>
  );
}

export default CommandPalette;
