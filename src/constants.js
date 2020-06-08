export const TICK_RATE = 2000; // Speed of the game
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.9;
export const SCENES = ["day", "rain"];
export const DAY_LENGTH = 10;
export const NIGHT_LENGTH = 3;

// Tip: Result number btw 0 and 2 + 5
export const getNextHungerTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock();
export const getNextDieTime = (clock) =>
  Math.floor(Math.random() * 2) + 3 + clock();
export const getNextPoopTime = (clock) =>
  Math.floor(Math.random() * 3) + 4 + clock();
