(function(global){

  const GROUP_UNIVERSAL = {
    version:"4.1",
    mode:"konsolidiert",
    state:"ACTIVE",

    matrix:{
      PX:{label:"PX Ghost",type:"axis"},
      PC:{label:"PC Scan",type:"axis"},
      GHOST:{label:"GHOST Tri",type:"axis"},
      ON3:{label:"RUN3 Operator",type:"operator"},
      KIT:{label:"Kernel",type:"kernel"},
      RAW:{label:"RAW Core",type:"raw"},
      MOD:{label:"Module",type:"mod"},
      TRI_HEXA:{label:"Tri-Hexa Orbit",type:"orbit"}
    },

    bilden(keys){
      return keys.map(k => this.matrix[k]).filter(Boolean);
    },

    klären(key){
      return this.matrix[key] || null;
    },

    run3(frame){
      const ok =
        frame.state === "ACTIVE" &&
        frame.pxCode.startsWith("?13") &&
        frame.pqCode.length > 3;

      return {
        status: ok ? "ok" : "blocked",
        frame
      };
    },

    generalMove(){
      return {
        move:"UNIVERSAL-MOVE",
        groups:Object.keys(this.matrix),
        timestamp:Date.now()
      };
    }
  };

  global.GROUP_UNIVERSAL = GROUP_UNIVERSAL;

})(window);
