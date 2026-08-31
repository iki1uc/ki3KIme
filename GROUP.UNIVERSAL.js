function toggleAchsen() {
  const raw = STATE.achsen;
  const dyn = raw * 0.42;
  const limit = Math.min(1500, dyn);
  const smooth = Math.floor(limit);

  STATE.achsen = smooth;

  log(`📐 ACHSEN · ${STATE.achsen}`, 'achse');
  updateUI();
  renderGalaxy();
}
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
    const icon = aktiv === total ? '🟢' : aktiv > 0 ? '🟡' : '🔴';
    status += `${icon} ${name} (${aktiv}/${total}) `;
  }
  const el = document.getElementById('gruppenStatus');
  if (el) el.textContent = status;
  return status;
}

document.getElementById('btnConnect')?.addEventListener('click', () => {
  connectGruppen();
  log('🔗 GRUPPEN · neu verbunden', 'ds9');
  updateUI();
});
GROUP.NCsync = function(state) {
  return {
    org: state.org,
    reorg: state.reorg,
    axes: state.achsen,
    sixD: state.sixD,
    ds9: state.ds9,
    ordnerSorted: state.ordnerSorted,
    ordnerShuffled: state.ordnerShuffled,
    timestamp: Date.now()
  };
};
function KItriKIme(frame){
  const qi  = (frame.pxCode === "?13/on3");
  const iqq = (frame.pqCode === "WRAIGHT");
  const ready =
    qi &&
    iqq &&
    frame.help === "HELP_FAIL" &&
    frame.state === "ACTIVE";
  return ready ? 1 : 0;
}
