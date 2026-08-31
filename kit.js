// ─── KItriKIme aus GROUP.UNIVERSAL.js ─────────────────────────────
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

// Kernel-Check
const KIT_READY = KItriKIme(frame);
console.log("KItriKIme:", KIT_READY);

// ─── KIT aus kit.js importieren ──────────────────────────────────
import { KIT } from './kit.js';

console.log("KIT:", KIT);
console.log("KIT.ULTRA:", KIT.ULTRA);
console.log("KIT.RESPO:", KIT.RESPO);


// ─── ORG (NEU, SAUBER, FINAL) ─────────────────────────────────────
function toggleOrg() {
  STATE.org = !STATE.org;

  if (STATE.org) {
    STATE.reorg = false;
    STATE.ordnerShuffled = null;

    const sorted = [...ORDNER].sort((a, b) =>
      STATE.ordner[a].value - STATE.ordner[b].value
    );

    STATE.ordnerSorted = sorted;
    log(`🔄 ORG · sortiert · ${sorted.join(', ')}`, 'flow');

  } else {
    STATE.ordnerSorted = null;
    log('🔄 ORG · deaktiviert', 'flow');
  }

  updateUI();
}


// ─── REORG (NEU, SAUBER, FINAL) ───────────────────────────────────
function toggleReorg() {
  STATE.reorg = !STATE.reorg;

  if (STATE.reorg) {
    STATE.org = false;
    STATE.ordnerSorted = null;

    const shuffled = [...ORDNER];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    STATE.ordnerShuffled = shuffled;
    log(`🔄 REORG · gemischt · ${shuffled.join(', ')}`, 'whirl');

  } else {
    STATE.ordnerShuffled = null;
    log('🔄 REORG · deaktiviert', 'flow');
  }

  updateUI();
}


// ─── GRUPPEN (FINAL) ─────────────────────────────────────────────
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


// ─── NCsync (Imperium → GROUP.UNIVERSAL) ─────────────────────────
GROUP.NCsync = function(state) {
  return {
    org: state.org,
    reorg: state.reorg,
    axes: state.achsen
