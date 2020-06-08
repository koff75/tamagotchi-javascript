import { modFox, modScene, togglePoopBag, writeModal } from "./ui";
import {
  RAIN_CHANCE,
  SCENES,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextDieTime,
  getNextHungerTime,
  getNextPoopTime,
} from "./constants";

const gameSate = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  poopTime: -1,
  tick() {
    this.clock++;
    console.log(`Clock ${this.clock}`);
    if (this.clock === this.wakeTime) this.wake();
    else if (this.clock === this.sleepTime) this.sleep();
    else if (this.clock === this.hungryTime) this.hungryTime();
    else if (this.clock === this.dieTime) this.dieTime();
    else if (this.clock === this.timeToStartCelebrating)
      this.startCelebrating();
    else if (this.clock === this.endCelebrating) this.endCelebrating();
    else if (this.clock === this.poopTime) this.poop();

    return this.clock;
  },
  startGame() {
    console.log("hatching");
    this.current = "HATCHING";
    // Awake for 3 sec, 9 sec to hatch
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
    writeModal();
  },
  wake() {
    console.log("awoken");
    this.current = "IDLING";
    // He's no longer waiting to wake up
    this.wakeTime = -1;
    // 1 rain : 0 day
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getNextHungerTime(this.clock);
    this.determineFoxState();
  },
  sleep() {
    this.state = "SLEEP";
    modFox("sleep");
    modScene("night");
    this.clearTimes(); // No poop during the night
    this.wakeTime = this.clock + NIGHT_LENGTH;
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  // When the fox dies or when it goes to sleep
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToEndCelebrating = -1;
    this.timeToStartCelebrating = -1;
  },
  poop() {
    this.current = "POOP";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
  die() {
    console.log("Die");
    this.current = "DEAD";
    modFox("dead");
    modScene("dead");
    this.clearTimes();
    writeModal("He dies... Press the middle to start");
  },
  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === "CELEBRATING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  handleUserAction(icon) {
    console.log(icon);
    if (["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current))
      return; // do nothing
    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame;
      return;
    }
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  changeWeather() {
    console.log("Change weather");
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  cleanUpPoop() {
    console.log("Cleanup poop");
    if (!this.current === "POOPING") return;
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock);
  },
  feed() {
    console.log("Feed");
    if (this.current === "HUNGRY") return;
    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");
    // Finish eating & begin celebrating
    this.timeToStartCelebrating = this.clock + 2;
  },
};

// Tip: Fixing a context bug with 'this'
export const handleUserAction = gameSate.handleUserAction.bind(gameSate);
export default gameSate;
