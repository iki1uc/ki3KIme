// GROUP.UNIVERSAL.js
// Autonome Gruppen-Bildungs-Engine für ki3KIme · SHOW.live · iki1uc
// Keine externen Links · Keine Sessions · Kein Drift · 100% autonom

(function(global) {

  // ─── KERN ──────────────────────────────────────────────────────
  const GROUP = {
    version: "3.0",
    mode: "autonom",
    state: "ACTIVE",
    ready: 100,

    // ─── GRUPPEN-MATRIX (alle Optionen) ──────────────────────────
    matrix: {
      PX:  { label: "PX · Ghost",   type: "axis",  status: "ready" },
      PC:  { label: "PC · Scan",    type: "axis",  status: "ready" },
      GHOST: { label: "GHOST · Tri", type: "axis", status: "ready" },
      SHIFT:  { label: "SHIFT · Bewegung", type: "shift", status: "ready" },
      FLOW:   { label: "FLOW · Zustand",   type: "flow",  status: "ready" },
      MIRROR: { label: "MIRROR · Spiegel", type: "mirror", status: "ready" },
      KIpi:   { label: "KIpi · System", type: "system", status: "ready" },
      EYE:    { label: "EYE · Sensor",  type: "sensor", status: "ready" },
      NOAH:   { label: "NOAH · Kaiser", type: "admin",  status: "ready" },
      ENGINE: { label: "ENGINE · iki1uc", type: "core", status: "ready" },
      STATE:  { label: "STATE · Flow",    type: "flow", status: "ready" },
      SPACE:  { label: "SPACE · 9lu",     type: "space", status: "ready" },
      TIME:   { label: "TIME · 3te",      type: "time", status: "ready" },
      ROOM:   { label: "ROOM · 6lar",     type: "room", status: "ready" },
      VECTOR: { label: "VECTOR · on3",    type: "vector", status: "ready" },
      MIRROR_SETI: { label: "MIRROR-SETI · LiveDoc", type: "mirror", status: "ready" },
      TRI_HEXA: { label: "Tri-Hexa-Orbit · 360°", type: "orbit", status: "ready" },
      RAW:      { label: "RAW · KItriKIme",       type: "raw",   status: "ready" },
      MOD:      { label: "MOD · Module",          type: "mod",   status: "ready" },
      ON3:      { label: "ON3 · RUN3 Operator",   type: "operator", status: "ready" },
      KIT:      { label: "KIT · Kernel",          type: "kernel", status: "ready" }
    },

    // ─── GRUPPEN BILDEN ────────────────────────────────────────────
    bilden(keys) {
      const result = { group: {}, status: "ok", message: "Gruppe gebildet" };

      if (!keys || keys.length === 0) {
        keys = Object.keys(this.matrix);
      }

      keys.forEach(key => {
        if (this.matrix[key]) {
          result.group[key] = this.matrix[key];
        } else {
          result.status = "warn";
          result.message = `❌ Unbekannte Option: ${key}`;
        }
      });

      result.valid = Object.keys(result.group).length === keys.length;
      result.count = Object.keys(result.group).length;
      result.timestamp = Date.now();
      result.validUntil = Date.now() + 1000 * 60 * 60 * 24 * 90; // 90 Tage

      return result;
    },

    // ─── ALLE GRUPPEN ANZEIGEN ────────────────────────────────────
    alleGruppen() {
      return Object.keys(this.matrix).map(key => ({
        key,
        ...this.matrix[key]
      }));
    },

    // ─── GRUPPE KLÄREN ─────────────────────────────────────────────
    klären(key) {
      const item = this.matrix[key];
      if (!item) return { status: "error", message: `❌ ${key} nicht gefunden` };

      const erklärungen = {
        PX: "PX ist die Ghost-Achse – sie verbindet sichtbare und unsichtbare Ebenen.",
        PC: "PC ist der Scan-Kanal – er liest und interpretiert Datenströme.",
        GHOST: "GHOST ist die Tri-Achse – sie trägt die 3tel und den on3-Vektor.",
        SHIFT: "SHIFT ist Bewegung – Übergang zwischen Zuständen.",
        FLOW: "FLOW ist der Zustand selbst – wie sich etwas verhält.",
        MIRROR: "MIRROR ist der Spiegel – er zeigt, was ist, ohne zu verändern.",
        KIpi: "KIpi ist das System – der Kern, der alles zusammenhält.",
        EYE: "EYE ist der Sensor – er sieht, was andere Module nicht sehen.",
        NOAH: "NOAH ist der Kaiser – Level 14 Admin des Continuums.",
        ENGINE: "ENGINE ist iki1uc – der Motor des gesamten Systems.",
        STATE: "STATE ist der Flow – der aktuelle Zustand der Pipeline.",
        SPACE: "SPACE ist 9lu – der Raum, in dem alles passiert.",
        TIME: "TIME ist 3te – die Zeitachse des Systems.",
        ROOM: "ROOM ist 6lar – der Raum für Struktur und Ordnung.",
        VECTOR: "VECTOR ist on3 – der Dreieck-Vektor, der alles verbindet.",
        MIRROR_SETI: "MIRROR-SETI ist der LiveDoc – der Spiegel der Pipeline.",
        TRI_HEXA: "Tri-Hexa-Orbit ist die 360°-Form – vollständige Rotation.",
        RAW: "RAW ist der KItriKIme-Kern – die rohe System-Instanz.",
        MOD: "MOD ist das Modul-System – alle erweiterten Funktionen.",
        ON3: "ON3 ist der RUN3 Operator – die Pipeline-Steuerung.",
        KIT: "KIT ist der Kernel – die Logik hinter KItriKIme."
      };

      return {
        status: "ok",
        key,
        label: item.label,
        type: item.type,
        erklärung: erklärungen[key] || "Diese Gruppe hat eine klärende Funktion."
      };
    },

    // ─── GENERAL MOVE ──────────────────────────────────────────────
    generalMove() {
      const alle = this.alleGruppen();
      const gruppe = this.bilden(Object.keys(this.matrix));

      return {
        move: "⚡ GENERAL MOVE – Autonome Gruppen-Bildung",
        status: "ok",
        message: "Dieses System kann alle Gruppen-Optionen bilden, klären und verwalten.",
        gruppenAnzahl: alle.length,
        gruppenListe: alle.map(g => g.key),
        erzeugteGruppe: gruppe,
        gültigkeit: {
          erstellt: new Date(gruppe.timestamp).toISOString(),
          gültigBis: new Date(gruppe.validUntil).toISOString()
        },
        beweis: "✅ Keine externen Links, keine Sessions, kein Drift – 100% autonom."
      };
    },

    // ─── RUN3 OPERATOR ─────────────────────────────────────────────
    run3(frame) {
      // Prüft, ob alle Bedingungen für RUN3 erfüllt sind
      const kitReady = frame && frame.state === "ACTIVE";
      const pxReady = frame && frame.pxCode === "?13/on3";
      const pqReady = frame && frame.pqCode === "WRAIGHT";

      return {
        status: kitReady && pxReady && pqReady ? "ok" : "blocked",
        ready: kitReady && pxReady && pqReady,
        message: kitReady && pxReady && pqReady
          ? "⚡ RUN3 Operator aktiv – Pipeline läuft"
          : "⛔ RUN3 blockiert – Bedingungen nicht erfüllt",
        frame: frame
      };
    }
  };

  // ─── GLOBAL EXPOSURE ───────────────────────────────────────────
  global.GROUP = GROUP;
  console.log("🧠 GROUP.UNIVERSAL geladen · Autonom · Version 3.0");

  // ─── DEMO (sofort sichtbar) ────────────────────────────────────
  console.log("📦 Alle Gruppen:", GROUP.alleGruppen().map(g => g.key).join(", "));
  console.log("⚡ General Move:", GROUP.generalMove());

})(window);
