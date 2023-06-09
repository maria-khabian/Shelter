import { getRandomNum } from './helpFunc.js';
import { petsJSON } from './../assets/pets.js';
import { createCard } from './card.js';
import { popUp } from './pop-up.js';

const CssClasses = {
  CONTAINER: 'carusel__container',
  CARD__GROUP: 'card__group',
  BUTTON_PREV: 'slide-prev',
  BUTTON_NEXT: 'slide-next',
  DISABLED_BUTTON: 'slider-icon_disabled',
  ANIMATE_PREV: 'animate__left',
  ANIMATE_NEXT: 'animate__right',
}

export function slider(countCards) {
  const commonID = [];

  const container = document.querySelector(`.${CssClasses.CONTAINER}`);
  const card__group = document.querySelectorAll(`.${CssClasses.CARD__GROUP}`);
  let prev = document.querySelector('.card-group__prev');
  let active = document.querySelector('.card-group__active');
  let next = document.querySelector('.card-group__next');
  const button__prev = document.querySelector(`.${CssClasses.BUTTON_PREV}`);
  const button__next = document.querySelector(`.${CssClasses.BUTTON_NEXT}`);

  prev.innerHTML = '';
  active.innerHTML = '';
  next.innerHTML = '';

  initCard()

  let prevID = commonID[0];
  let activeID = commonID[1];
  let nextID = commonID[2];

  button__prev.addEventListener('click', onclickPrevButton);
  button__next.addEventListener('click', onclickNextButton);
  container.addEventListener('transitionend', endTransition);

  function initCard() {
    let arr_prevIdx = [];

    for(let i=0; i < card__group.length; i++) {

      const current_card__group = card__group[i];
      const arr_currentIdx = []

      while(arr_currentIdx.length !== countCards) {
        const number = getRandomNum(0, 8);

        if(!arr_currentIdx.includes(number) && !arr_prevIdx.includes(number)) {
          const card = createCard(petsJSON[number].name, petsJSON[number].img, petsJSON[number].name)
          current_card__group.append(card);
          arr_currentIdx.push(number);
        }

      }
      arr_prevIdx = arr_currentIdx;
      commonID.push(arr_currentIdx)
    }
  }

  function onclickPrevButton() {
    container.classList.remove('no-transition');
    container.classList.add(`${CssClasses.ANIMATE_PREV}`);
    button__prev.classList.add(`${CssClasses.DISABLED_BUTTON}`);
    button__next.classList.add(`${CssClasses.DISABLED_BUTTON}`);
    disableButtons()
  }

  function onclickNextButton() {
    container.classList.remove('no-transition');
    container.classList.add(`${CssClasses.ANIMATE_NEXT}`);
    button__prev.classList.add(`${CssClasses.DISABLED_BUTTON}`);
    button__next.classList.add(`${CssClasses.DISABLED_BUTTON}`);
    disableButtons()
  }

  function endTransition(eventTransition) {

    let activeChangedSlider;
    let newActiveID = [];
    let newChangedID = [];
    if(eventTransition.target.classList.value.includes(`${CssClasses.ANIMATE_PREV}`)) {
      container.classList.remove(`${CssClasses.ANIMATE_PREV}`);
      button__prev.classList.remove(`${CssClasses.DISABLED_BUTTON}`);
      button__next.classList.remove(`${CssClasses.DISABLED_BUTTON}`);

      next.innerHTML = active.innerHTML;
      active.innerHTML = prev.innerHTML;
      activeChangedSlider = prev;

      nextID = activeID;
      activeID = prevID;
      prevID = [];
      newActiveID = activeID;
      newChangedID = prevID;

    } else if(eventTransition.target.classList.value.includes(`${CssClasses.ANIMATE_NEXT}`)) {
      container.classList.remove(`${CssClasses.ANIMATE_NEXT}`);
      button__next.classList.remove(`${CssClasses.DISABLED_BUTTON}`);
      button__prev.classList.remove(`${CssClasses.DISABLED_BUTTON}`);

      prev.innerHTML = active.innerHTML;
      active.innerHTML = next.innerHTML;
      activeChangedSlider = next;

      prevID = activeID;
      activeID = nextID;
      nextID = [];
      newActiveID = activeID;
      newChangedID = nextID;
    }
    console.log(activeChangedSlider)
    activeChangedSlider.innerHTML = '';
    console.log(activeChangedSlider.innerHTML)

    while(newChangedID.length !== countCards) {
      let number = getRandomNum(0, 8);
      if(!newActiveID.includes(number) && !newChangedID.includes(number)){
        newChangedID.push(number);
        const card = createCard(petsJSON[number].name, petsJSON[number].img, petsJSON[number].name)
        activeChangedSlider.append(card);
      }
    }
    container.classList.add('no-transition');
    enableButtons()
    popUp();

  }

function disableButtons() {
  button__prev.setAttribute('disabled', true);
  button__next.setAttribute('disabled', true);
}
function enableButtons() {
  button__prev.removeAttribute('disabled');
  button__next.removeAttribute('disabled');
}
}





