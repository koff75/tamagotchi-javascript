import game, { handleUserAction } from "./gameState"; // bound version of handleUserAction
import { TICK_RATE } from "./constants";
import initButton from "./buttons";

async function init() {
  console.log("starting game");
  // tip: initButton(console.log(icon))
  initButton(handleUserAction);

  let nextTimeToTick = Date.now();

  function nextAnimationFrame() {
    const now = Date.now();
    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }
  requestAnimationFrame(nextAnimationFrame);
}

init();
