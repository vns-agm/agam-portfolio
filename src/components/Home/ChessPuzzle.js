import React, { useMemo, useState } from "react";
import { Chess } from "chess.js";
import { FaChessKnight } from "react-icons/fa";
import Reveal from "../Reveal";

// Mate-in-one puzzles, all white to move. Each has exactly one mating move
// (checked with chess.js); any move that mates still counts as solved.
const PUZZLES = [
  { name: "Back-rank weakness", fen: "6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1", hint: "The king's own pawns are its prison." },
  { name: "The scholar's trap", fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4", hint: "f7 is only defended by the king." },
  { name: "Smothered", fen: "6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1", hint: "Black's pieces block every escape square." },
  { name: "Long diagonal battery", fen: "5rk1/5ppp/8/8/8/8/1Q6/B5K1 w - - 0 1", hint: "The bishop backs up the queen." },
];

// Solid glyphs for both sides (coloured in CSS); U+FE0E keeps iOS from drawing emoji.
const GLYPH = { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" };
const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

function ChessPuzzle() {
  const [index, setIndex] = useState(0);
  const puzzle = PUZZLES[index];
  const [fen, setFen] = useState(puzzle.fen);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | wrong | solved
  const [lastMove, setLastMove] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const game = useMemo(() => new Chess(fen), [fen]);
  const board = game.board();

  const targets = useMemo(() => {
    if (!selected) return new Set();
    return new Set(game.moves({ square: selected, verbose: true }).map((m) => m.to));
  }, [game, selected]);

  const load = (i) => {
    setIndex(i);
    setFen(PUZZLES[i].fen);
    setSelected(null);
    setStatus("idle");
    setLastMove(null);
    setShowHint(false);
  };

  const tryMove = (from, to) => {
    const attempt = new Chess(fen);
    let move;
    try {
      move = attempt.move({ from, to, promotion: "q" });
    } catch (e) {
      return false;
    }
    setFen(attempt.fen());
    setLastMove({ from, to });
    setSelected(null);
    if (attempt.isCheckmate()) {
      setStatus("solved");
    } else {
      setStatus("wrong");
      // Show the move briefly, then take it back.
      setTimeout(() => {
        setFen(puzzle.fen);
        setLastMove(null);
        setStatus("idle");
      }, 1100);
    }
    return Boolean(move);
  };

  const onSquare = (square, piece) => {
    if (status !== "idle") return;
    if (selected && targets.has(square)) {
      tryMove(selected, square);
      return;
    }
    if (piece && piece.color === "w") {
      setSelected(selected === square ? null : square);
    } else {
      setSelected(null);
    }
  };

  const message =
    status === "solved"
      ? "Checkmate! Thinking a few moves ahead is how I approach edge cases too."
      : status === "wrong"
      ? "Close, but that's not mate. Try again."
      : selected
      ? "Now pick a highlighted square."
      : "White to move and mate in one. Tap a white piece.";

  return (
    <Reveal className="puzzle glass-card" id="puzzle">
      <div className="puzzle-copy">
        <span className="puzzle-kicker">
          <FaChessKnight /> Your move
        </span>
        <h2>
          Can you find <span className="purple">mate in one?</span>
        </h2>
        <p className="puzzle-sub">
          I've played chess at national level. Here's a small one for you: <strong>{puzzle.name}</strong>.
        </p>
        <p className={`puzzle-status is-${status}`} role="status" aria-live="polite">
          {message}
        </p>
        <div className="puzzle-actions">
          {status === "solved" ? (
            <button type="button" className="btn hero-btn" onClick={() => load((index + 1) % PUZZLES.length)} data-magnetic>
              Next puzzle →
            </button>
          ) : (
            <button type="button" className="btn hero-btn hero-btn-ghost" onClick={() => setShowHint(true)} disabled={showHint}>
              {showHint ? puzzle.hint : "Need a hint?"}
            </button>
          )}
          <span className="puzzle-count">
            {index + 1} / {PUZZLES.length}
          </span>
        </div>
      </div>

      <div className={`board ${status === "wrong" ? "is-wrong" : ""} ${status === "solved" ? "is-solved" : ""}`} role="grid" aria-label="Chess board">
        {board.map((row, r) =>
          row.map((cell, c) => {
            const square = `${FILES[c]}${8 - r}`;
            const dark = (r + c) % 2 === 1;
            const isTarget = targets.has(square);
            const isLast = lastMove && (lastMove.from === square || lastMove.to === square);
            const matedKing = status === "solved" && cell && cell.type === "k" && cell.color === "b";
            return (
              <button
                type="button"
                key={square}
                className={[
                  "sq",
                  dark ? "sq-dark" : "sq-light",
                  selected === square ? "is-selected" : "",
                  isTarget ? (cell ? "is-capture" : "is-target") : "",
                  isLast ? "is-last" : "",
                  matedKing ? "is-mated" : "",
                ].join(" ")}
                onClick={() => onSquare(square, cell)}
                aria-label={`${square}${cell ? ` ${cell.color === "w" ? "white" : "black"} ${cell.type}` : ""}`}
              >
                {c === 0 && <span className="sq-rank">{8 - r}</span>}
                {r === 7 && <span className="sq-file">{FILES[c]}</span>}
                {cell && (
                  <span className={`piece piece-${cell.color}`} key={`${cell.color}${cell.type}${square}`}>
                    {GLYPH[cell.type]}
                    {"︎"}
                  </span>
                )}
              </button>
            );
          })
        )}
      </div>
    </Reveal>
  );
}

export default ChessPuzzle;
