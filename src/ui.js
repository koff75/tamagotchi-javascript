export const modFox = function modFox(state) {
  // Ex: 'fox fox-sleep' etc...
  document.querySelector(".fox").className = `fox fox-${state}`;
};

export const modScene = function modScene(state) {
  // Change the scene
  document.querySelector(".game").className = `game ${state}`;
};

export const togglePoopBag = function togglePoopBag(show) {
  // If show == true => remove the hidden class
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

export const writeModal = function writeModal(text = "") {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
