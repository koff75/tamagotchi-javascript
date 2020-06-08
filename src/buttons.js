import { ICONS } from "./constants";

// Query: If toggleHighlighted('fish', true) then the icon is highlighted
// Fish - Poop - Weather => then icon is highlighted or not
const toggleHighlighted = (icon, show) =>
  document
    .querySelector(`.${ICONS[icon]}-icon`)
    .classList.toggle("highlighted", show);

/* User interaction */
export default function initButtons(handleUserAction) {
  // Current selected icon => Fish icon
  let selectedIcon = 0;
  // target is gonna be the actual DOM node that I've clicked on
  function buttonClick({ target }) {
    if (target.classList.contains("left-btn")) {
      console.log("left button");
      // Disable the current one
      toggleHighlighted(selectedIcon, false);
      // tip: 10 % 3 = 1
      selectedIcon = (2 + selectedIcon) % ICONS.length;
      // Active the new one
      toggleHighlighted(selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      console.log("right button");
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      handleUserAction(ICONS[selectedIcon]);
    }
  }

  document.querySelector(".buttons").addEventListener("click", buttonClick);
}
