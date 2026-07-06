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

const KIT = KItriKIme(frame);
console.log("KItriKIme:", KIT);
