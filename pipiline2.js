// ─── pipeline2.js · Werkzeug-Modus ───────────────────────────────
// KEINE echte Pipeline. Nur Werkzeug für:
// ORG / REORG / NCsync / KItriKIme / Gruppen / KIT

import { KIT } from './kit.js';

let PIPE_COUNT = 0;        // zählt die Ausführungen
let PIPE_CACHE = [];       // sammelt NCsync-Frames


// ─── KItriKIme Check (aus deinem (2)) ───────────────────────────
export function checkKernel(frame) {
  const qi  = (ghostCheck(frame) === "?13/on3");
  const iqq = (wraightLoop(frame) === "WRAIGHT");

  const ready =
    qi &&
    iqq &&
    helpAuto(frame) === "HELP_FAIL" &&
    frame.state === "ACTIVE";

  return ready ? 1 : 0;
}


// ─── ORG Wrapper ────────────────────────────────────────────────
export function doOrg(state) {
  toggleOrg();               
  return collectNC(state);
}


// ─── REORG Wrapper ──────────────────────────────────────────────
export function doReorg(state) {
  toggleReorg();             
  return collectNC(state);
}


// ─── reFINAL (Auto-Entscheidung) ────────────────────────────────
export function reFinal(state) {
  if (state.org) {
    toggleOrg();
  } else if (state.reorg) {
    toggleReorg();
  }
  return collectNC(state);
}


// ─── Gruppen-Tool ───────────────────────────────────────────────
export function doConnect() {
  connectGruppen();
  return document.getElementById('gruppenStatus').textContent;
}


// ─── KIT-Tool ───────────────────────────────────────────────────
export function kitInfo() {
  return {
    KIT,
    ULTRA: KIT.ULTRA,
    RESPO: KIT.RESPO
  };
}


// ─── NCsync Sammel-Mechanismus ───────────────────────────────────
// 3× → Silent-Auswertung
// 4× → pipeline3 Trigger
// 6× → Cache leeren
function collectNC(state) {
  PIPE_COUNT++;

  const frame = GROUP.NCsync(state);
  PIPE_CACHE.push(frame);

  // 3×: Auswertung ohne Output
  if (PIPE_COUNT === 3) {
    evaluateSilent(PIPE_CACHE);
  }

  // 4×: pipeline3 Trigger
  if (PIPE_COUNT === 4) {
    triggerPipeline3(PIPE_CACHE);
  }

  // 6×: Cache leeren
  if (PIPE_COUNT === 6) {
    PIPE_CACHE = [];
    PIPE_COUNT = 0;
  }

  return frame;
}


// ─── Silent-Auswertung (keine Ausgabe) ───────────────────────────
function evaluateSilent(cache) {
  cache.forEach(f => {
    f.valid = f.axes > 100 && (f.org || f.reorg);
  });
}


// ─── pipeline3 Trigger (Werkzeug) ────────────────────────────────
function triggerPipeline3(cache) {
  cache.pipeline3 = true;
}
