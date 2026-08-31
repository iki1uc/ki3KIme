// ─── pipeline2.js · Werkzeug-Modus ───────────────────────────────
// Dieses Modul ist KEINE echte Pipeline.
// Es dient nur als Werkzeug, um ORG / REORG / NCsync / KItriKIme
// aus dem Imperium-Kernel heraus aufzurufen.

import { KIT } from './kit.js';

// ─── KItriKIme Check ─────────────────────────────────────────────
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

// ─── ORG Wrapper (Werkzeug) ──────────────────────────────────────
export function doOrg(state) {
  toggleOrg();               // nutzt Imperium-Kernel
  return GROUP.NCsync(state); // gibt NCsync zurück
}

// ─── REORG Wrapper (Werkzeug) ─────────────────────────────────────
export function doReorg(state) {
  toggleReorg();             // nutzt Imperium-Kernel
  return GROUP.NCsync(state); // gibt NCsync zurück
}

// ─── reFINAL (ORG + REORG Auto-Decision) ─────────────────────────
export function reFinal(state) {
  if (state.org) {
    toggleOrg();
  } else if (state.reorg) {
    toggleReorg();
  }
  return GROUP.NCsync(state);
}

// ─── Gruppen-Tool ────────────────────────────────────────────────
export function doConnect() {
  connectGruppen();
  return document.getElementById('gruppenStatus').textContent;
}

// ─── KIT-Tool ─────────────────────────────────────────────────────
export function kitInfo() {
  return {
    KIT,
    ULTRA: KIT.ULTRA,
    RESPO: KIT.RESPO
  };
}
