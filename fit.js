(function(global){
  // ============================================================
  // GROUP_UNIVERSAL — zusammengeführt aus GROUP_UNI (v3.1) und
  // GROUP_UNIVERSAL (v4.1). Enthält jetzt alle Matrix‑Keys aus
  // beiden Vorgänger‑Dateien, damit index.html/pipeline2.js nur
  // noch EIN Modul brauchen.
  // ============================================================
  const GROUP_UNIVERSAL = {
    version: "5.0",
    mode: "konsolidiert",
    state: "ACTIVE",
    ready: 100,

    matrix: {
      // aus GROUP_UNI v3.1
      PX:        { label:"PX · Ghost",        type:"axis" },
      PC:        { label:"PC · Scan",         type:"axis" },
      GHOST:     { label:"GHOST · Tri",       type:"axis" },
      SHIFT:     { label:"SHIFT · Bewegung",  type:"shift" },
      FLOW:      { label:"FLOW · Zustand",    type:"flow" },
      MIRROR:    { label:"MIRROR · Spiegel",  type:"mirror" },
      ENGINE:    { label:"ENGINE · iki1uc",   type:"core" },
      TIME:      { label:"TIME · 3te",        type:"time" },
      VECTOR:    { label:"VECTOR · on3",      type:"vector" },
      // aus GROUP_UNIVERSAL v4.1
      ON3:       { label:"RUN3 Operator",     type:"operator" },
      KIT:       { label:"Kernel",            type:"kernel" },
      RAW:       { label:"RAW Core",          type:"raw" },
      MOD:       { label:"Module",            type:"mod" },
      TRI_HEXA:  { label:"Tri-Hexa Orbit",    type:"orbit" }
    },

    bilden(keys){
      const out = {};
      keys.forEach(k => this.matrix[k] && (out[k] = this.matrix[k]));
      return out;
    },

    klären(key){
      return this.matrix[key] || null;
    },

    // ── run3: prüft ein Frame-Objekt gegen die RUN3-Bedingungen ──
    run3(frame){
      const ok =
        frame.state === "ACTIVE" &&
        frame.pxCode.startsWith("?13") &&
        frame.pqCode.length > 3;
      return { status: ok ? "ok" : "blocked", frame };
    },

    generalMove(){
      return {
        move: "UNIVERSAL-MOVE",
        groups: Object.keys(this.matrix),
        timestamp: Date.now()
      };
    }
  };

  // ============================================================
  // KItriKIme(frame) — vorher: rief ghostCheck()/wraightLoop()/
  // helpAuto() auf, die NIRGENDS definiert waren → ReferenceError,
  // Skript brach ab, KIT wurde nie berechnet.
  //
  // Fix: diese drei sind einfache Feld-Prüfungen auf das frame-
  // Objekt (kein separates Modul nötig). Ihre Bedeutung wurde aus
  // dem einzigen Aufruf-Kontext rekonstruiert, in dem KItriKIme(frame)
  // mit frame = {state:"ACTIVE", pxCode:"?13/on3", pqCode:"WRAIGHT",
  // help:"HELP_FAIL"} auf ready=1 kommen sollte:
  // ============================================================
  function ghostCheck(frame){ return frame.pxCode; }   // erwartet "?13/on3"
  function wraightLoop(frame){ return frame.pqCode; }  // erwartet "WRAIGHT"
  function helpAuto(frame){ return frame.help; }        // erwartet "HELP_FAIL"

  function KItriKIme(frame){
    const qi  = (ghostCheck(frame) === "?13/on3");
    const iqq = (wraightLoop(frame) === "WRAIGHT");
    const ready =
      qi &&
      iqq &&
      helpAuto(frame) === "HELP_FAIL" &&
      frame.state === "ACTIVE";
    return ready ? 1 : 0;
  }

  global.GROUP_UNIVERSAL = GROUP_UNIVERSAL;
  global.KItriKIme = KItriKIme;
  global.ghostCheck = ghostCheck;
  global.wraightLoop = wraightLoop;
  global.helpAuto = helpAuto;
})(window);
