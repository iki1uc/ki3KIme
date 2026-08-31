// KItriKIme aus GROUP.UNIVERSAL.js
function KItriKIme(frame) {
  const qi  = (ghostCheck(frame) === "?13/on3");
  const iqq = (wraightLoop(frame) === "WRAIGHT");

  const ready =
    qi &&
    iqq &&
    helpAuto(frame) === "HELP_FAIL" &&
    frame.state === "ACTIVE";

  return ready ? 1 : 0;
}

// Ergebnis des Kernel-Checks
const KIT_READY = KItriKIme(frame);
console.log("KItriKIme:", KIT_READY);

// KIT aus kit.js importieren
import { KIT } from './kit.js';

// KIT-Objekt nutzen
console.log("KIT:", KIT);
console.log("KIT.ULTRA:", KIT.ULTRA);
console.log("KIT.RESPO:", KIT.RESPO);
