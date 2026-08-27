<script src="GROUP.UNIVERSAL.js"></script>
<script>
  // Jetzt ist GROUP global verfügbar
  console.log(GROUP.generalMove());

  // Beispiel: Gruppe aus PX, PC, GHOST bilden
  const meineGruppe = GROUP.bilden(['PX', 'PC', 'GHOST']);
  console.log(meineGruppe);

  // RUN3 Operator testen
  const frame = { state: "ACTIVE", pxCode: "?13/on3", pqCode: "WRAIGHT" };
  console.log(GROUP.run3(frame));
</script>
