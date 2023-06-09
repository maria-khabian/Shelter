import { openMenuClickBurger, deleteOpenMenuClickLink, closeMenuClickEmptyArea } from './modules/burger.js';
import {slider} from './modules/slider.js';
import {popUp} from './modules/pop-up.js';

let cardCount = 3;

openMenuClickBurger()
deleteOpenMenuClickLink()
closeMenuClickEmptyArea()
slider(cardCount)
popUp()

let is321Triggered = false;
let is769Triggered = false;
let is1280Triggered = false;

function checkWindowWidth() {
  if (window.innerWidth < 753) {
    if (!is321Triggered) {
      cardCount = 1
      slider(cardCount)
      popUp()
      is321Triggered = true;
      is769Triggered = false;
      is1280Triggered = false;
    }
  } else if (window.innerWidth >= 752 && window.innerWidth < 1114) {
    if (!is769Triggered) {
      cardCount = 2
      slider(cardCount)
      popUp()
      is1280Triggered = false;
      is769Triggered = true;
      is321Triggered = false;
    }
  } else if (window.innerWidth >= 1114) {
    if (!is1280Triggered) {
      cardCount = 3
      slider(cardCount)
      popUp()
      is1280Triggered = true;
      is769Triggered = false;
      is321Triggered = false;
    }
  } else {
    is321Triggered = false;
    is769Triggered = false;
    is1280Triggered = false;
  }
}
window.addEventListener('resize', checkWindowWidth);



