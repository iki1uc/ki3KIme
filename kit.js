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
// ─── GRUPPEN BILDUNG ──────────────────────────────────────────
const GRUPPEN = {
  basis: ['3','6','9'],
  kern: ['API','RUN','boerse'],
  industrie: ['industry','markt','links'],
  system: ['rechts','rolle','use','weg']
};

function connectGruppen() {
  let status = '';
  for (const [name, members] of Object.entries(GRUPPEN)) {
    const aktiv = members.filter(m => STATE.ordner[m]?.value > 30).length;
    const total = members.length;
    const verbunden = aktiv === total ? '🟢' : aktiv > 0 ? '🟡' : '🔴';
    status += `${verbunden} ${name} (${aktiv}/${total}) `;
    log(`🔗 GRUPPE ${name} · ${aktiv}/${total} verbunden`, 'flow');
  }
  document.getElementById('gruppenStatus').textContent = status;
}
document.getElementById('btnConnect').addEventListener('click', () => {
  connectGruppen();
  log('🔗 GRUPPEN · neu verbunden', 'ds9');
  updateUI();
});
