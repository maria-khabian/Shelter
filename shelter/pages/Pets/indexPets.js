import { openMenuClickBurger, deleteOpenMenuClickLink, closeMenuClickEmptyArea } from './../../modules/burger.js';
import { pagination } from '../../modules/pagination.js';
import {popUp} from './../../modules/pop-up.js';


let cardCount = 8;

openMenuClickBurger()
deleteOpenMenuClickLink()
closeMenuClickEmptyArea()
pagination(cardCount)
popUp()

let is320Triggered = false;
let is630Triggered = false;
let is1220Triggered = false;

function checkWindowWidth() {
  if (window.innerWidth < 630) {
    if (!is320Triggered) {
      cardCount = 3
      console.log(cardCount)
      pagination(cardCount)
      popUp()
      is320Triggered = true;
      is630Triggered = false;
      is1220Triggered = false;
    }
  } else if (window.innerWidth >= 630 && window.innerWidth < 1220) {
    if (!is630Triggered) {
      cardCount = 6
      console.log(cardCount)
      pagination(cardCount)
      popUp()
      is1220Triggered = false;
      is630Triggered = true;
      is320Triggered = false;
    }
  } else if (window.innerWidth >= 1220) {
    if (!is1220Triggered) {
      cardCount = 8
      console.log(cardCount)
      pagination(cardCount)
      popUp()
      is1220Triggered = true;
      is630Triggered = false;
      is320Triggered = false;
    }
  } else {
    is320Triggered = false;
    is630Triggered = false;
    is1220Triggered = false;
  }
}
window.addEventListener('resize', checkWindowWidth);
