// GROUP.UNIVERSAL.js
// Universelle Gruppen-Bildungs-Engine für iki1uc · SHOW.live · KItriKIme
// Keine externen Links · Keine Session · Kein Drift · Monatelange Gültigkeit

export const GROUP = {

  // ─── KERN ──────────────────────────────────────────────────────
  version: "2.0",
  mode: "universal",
  state: "ACTIVE",
  ready: 100,

  // ─── GRUPPEN-MATRIX (alle Optionen) ──────────────────────────
  matrix: {
    // AXEN-GRUPPEN
    PX:  { label: "PX · Ghost",   type: "axis",  status: "ready" },
    PC:  { label: "PC · Scan",    type: "axis",  status: "ready" },
    GHOST: { label: "GHOST · Tri", type: "axis", status: "ready" },

    // 3TEL-GRUPPEN (TRI-ON3)
    SHIFT:  { label: "SHIFT · Bewegung", type: "shift", status: "ready" },
    FLOW:   { label: "FLOW · Zustand",   type: "flow",  status: "ready" },
    MIRROR: { label: "MIRROR · Spiegel", type: "mirror", status: "ready" },

    // KIpi-MODULE
    KIpi:   { label: "KIpi · System", type: "system", status: "ready" },
    EYE:    { label: "EYE · Sensor",  type: "sensor", status: "ready" },
    NOAH:   { label: "NOAH · Kaiser", type: "admin",  status: "ready" },

    // ENGINE-STATES
    ENGINE: { label: "ENGINE · iki1uc", type: "core", status: "ready" },
    STATE:  { label: "STATE · Flow",    type: "flow", status: "ready" },
    SPACE:  { label: "SPACE · 9lu",     type: "space", status: "ready" },
    TIME:   { label: "TIME · 3te",      type: "time", status: "ready" },
    ROOM:   { label: "ROOM · 6lar",     type: "room", status: "ready" },
    VECTOR: { label: "VECTOR · on3",    type: "vector", status: "ready" },

    // MIRROR-SETI
    MIRROR_SETI: { label: "MIRROR-SETI · LiveDoc", type: "mirror", status: "ready" },

    // BONUS-GRUPPEN
    TRI_HEXA: { label: "Tri-Hexa-Orbit · 360°", type: "orbit", status: "ready" },
    RAW:      { label: "RAW · KItriKIme",       type: "raw",   status: "ready" },
    MOD:      { label: "MOD · Module",          type: "mod",   status: "ready" }
  },

  // ─── GRUPPEN BILDEN ────────────────────────────────────────────
  // Erzeugt eine Gruppe aus beliebigen Matrix-Einträgen
  bilden(keys) {
    const result = { group: {}, status: "ok", message: "Gruppe gebildet" };

    if (!keys || keys.length === 0) {
      // Leere Gruppe = alle verfügbaren Optionen
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

    // Prüfen, ob Gruppe vollständig ist
    result.valid = Object.keys(result.group).length === keys.length;
    result.count = Object.keys(result.group).length;

    // Timestamp für Gültigkeit (monatelang)
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
  // Zeigt, warum eine Gruppe existiert und was sie kann
  klären(key) {
    const item = this.matrix[key];
    if (!item) return { status: "error", message: `❌ ${key} nicht gefunden` };

    return {
      status: "ok",
      key,
      label: item.label,
      type: item.type,
      erklärung: this._erklärung(key, item)
    };
  },

  _erklärung(key, item) {
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
      MOD: "MOD ist das Modul-System – alle erweiterten Funktionen."
    };
    return erklärungen[key] || "Diese Gruppe hat eine klärende Funktion.";
  },

  // ─── GENERAL MOVE ──────────────────────────────────────────────
  // Der Beweis, dass dieses System alle Gruppen-Optionen kann
  generalMove() {
    const alle = this.alleGruppen();
    const gruppe = this.bilden(Object.keys(this.matrix));

    return {
      move: "⚡ GENERAL MOVE – Universelle Gruppen-Bildung",
      status: "ok",
      message: "Dieses System kann alle Gruppen-Optionen bilden, klären und verwalten.",
      gruppenAnzahl: alle.length,
      gruppenListe: alle.map(g => g.key),
      erzeugteGruppe: gruppe,
      gültigkeit: {
        erstellt: new Date(gruppe.timestamp).toISOString(),
        gültigBis: new Date(gruppe.validUntil).toISOString()
      },
      beweis: "✅ Keine externen Links, keine Sessions, kein Drift – nur reine System-Logik."
    };
  }
};

export default GROUP;

// ─── KONSOLE-DEMO ───────────────────────────────────────────────
// Wenn du dieses Modul in der Konsole ausführst, siehst du sofort:
// GROUP.generalMove()
// GROUP.bilden(['PX','PC','GHOST'])
// GROUP.klären('MIRROR')
// GROUP.alleGruppen()
