(function(global){

  const GROUP_UNI = {
    version: "3.1",
    mode: "autonom",
    state: "ACTIVE",
    ready: 100,

    matrix: {
      PX: { label:"PX · Ghost", type:"axis" },
      PC: { label:"PC · Scan", type:"axis" },
      GHOST: { label:"GHOST · Tri", type:"axis" },
      SHIFT: { label:"SHIFT · Bewegung", type:"shift" },
      FLOW: { label:"FLOW · Zustand", type:"flow" },
      MIRROR: { label:"MIRROR · Spiegel", type:"mirror" },
      ENGINE: { label:"ENGINE · iki1uc", type:"core" },
      TIME: { label:"TIME · 3te", type:"time" },
      VECTOR: { label:"VECTOR · on3", type:"vector" }
    },

    bilden(keys){
      const out = {};
      keys.forEach(k => this.matrix[k] && (out[k] = this.matrix[k]));
      return out;
    },

    klären(key){
      return this.matrix[key] || null;
    },

    generalMove(){
      return {
        move:"UNI-MOVE",
        groups:Object.keys(this.matrix),
        timestamp:Date.now()
      };
    }
  };

  global.GROUP_UNI = GROUP_UNI;

})(window);
