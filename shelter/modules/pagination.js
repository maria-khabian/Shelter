import { getRandomNum } from './helpFunc.js';
import { petsJSON } from './../assets/pets.js';
import { createCard } from './card.js';
import { popUp } from './pop-up.js';

const CssClasses = {
  CARD__GROUP: 'card__group',
  BUTTON_PREV: 'pagination-prev',
  BUTTON_NEXT: 'pagination-next',
  BUTTON_START: 'pagination-prev__double',
  BUTTON_END: 'pagination-next__double',
  BUTTON_NUMBER: 'pagination-number',
  ANIMATE_PREV: 'animate__left',
  ANIMATE_NEXT: 'animate__right',
  BUTTON_ACTIVE: '_active',
  BUTTON_DISABLED: '_unactive',
}

export function pagination(countCardsInPage) {
  let commonCountCards = 48;
  const generatedIdForCards = [];

  let page = 1;

  const cards = document.querySelector(`.${CssClasses.CARD__GROUP}`);
  cards.innerHTML = '';
  const buttonPrev = document.querySelector(`.${CssClasses.BUTTON_PREV}`);
  const buttonNext = document.querySelector(`.${CssClasses.BUTTON_NEXT}`);
  const buttonStart = document.querySelector(`.${CssClasses.BUTTON_START}`);
  const buttonEnd = document.querySelector(`.${CssClasses.BUTTON_END}`);
  const pageNumber = document.querySelector(`.${CssClasses.BUTTON_NUMBER}`);

  buttonStart.addEventListener('click', onClickStart)
  buttonPrev.addEventListener('click', onClickPrev)
  buttonNext.addEventListener('click', onClickNext)
  buttonEnd.addEventListener('click', onClickEnd)


  for(let i = 0; i < commonCountCards / countCardsInPage; i++) {

    let itemArr = [];
    while(itemArr.length !== countCardsInPage) {
      let idx = getRandomNum(0, 8);
      if(!itemArr.includes(idx)) {
        itemArr.push(idx)
      }
    }
    generatedIdForCards.push(itemArr)
  }

  function initCard(numberPage) {
    for(let i = 0; i < generatedIdForCards[numberPage-1].length; i++) {
      let index = generatedIdForCards[numberPage-1][i]
      const card = createCard(petsJSON[index].name, petsJSON[index].imgPets, petsJSON[index].name);
      cards.append(card)
    }
  }

  initCard(page)

function disableButtonPrevAndStart() {
  buttonPrev.setAttribute('disabled', true);
  buttonStart.setAttribute('disabled', true);
  buttonPrev.removeEventListener('click', onClickPrev);
  buttonStart.removeEventListener('click', onClickPrev);
  buttonPrev.classList.add(`${CssClasses.BUTTON_DISABLED}`);
  buttonStart.classList.add(`${CssClasses.BUTTON_DISABLED}`);
}

function activeButtonPrevAndStart() {
  buttonPrev.removeAttribute('disabled');
  buttonStart.removeAttribute('disabled');
  buttonPrev.addEventListener('click', onClickPrev);
  buttonStart.addEventListener('click', onClickPrev);
  buttonPrev.classList.remove(`${CssClasses.BUTTON_DISABLED}`);
  buttonStart.classList.remove(`${CssClasses.BUTTON_DISABLED}`);
}

function disableButtonNextAndEnd() {
  buttonNext.setAttribute('disabled', true);
  buttonEnd.setAttribute('disabled', true);
  buttonNext.removeEventListener('click', onClickNext);
  buttonEnd.removeEventListener('click', onClickNext);
  buttonNext.classList.add(`${CssClasses.BUTTON_DISABLED}`);
  buttonEnd.classList.add(`${CssClasses.BUTTON_DISABLED}`);
}

function activeButtonNextAndEnd() {
  buttonNext.classList.remove(`${CssClasses.BUTTON_DISABLED}`);
  buttonEnd.classList.remove(`${CssClasses.BUTTON_DISABLED}`);
  buttonNext.removeAttribute('disabled');
  buttonEnd.removeAttribute('disabled');
  buttonNext.addEventListener('click', onClickNext);
  buttonEnd.addEventListener('click', onClickNext);
}

function onClickNext() {
  page++
  if(buttonPrev.getAttribute('disabled')) {
    activeButtonPrevAndStart()
  }
  if(page == commonCountCards / countCardsInPage) {
    disableButtonNextAndEnd()
  }
  cards.innerHTML = '';
  pageNumber.innerHTML = page;
  initCard(page);
  popUp()
}

function onClickPrev() {
  let innerPage = page;
  if(buttonNext.getAttribute('disabled')) {
    activeButtonNextAndEnd()
  }
  if(innerPage == 1) {
    disableButtonPrevAndStart()
  }
  if (innerPage - 1 == 1){
    disableButtonPrevAndStart()
  }
  if(innerPage !== 1) {
    page--;
    cards.innerHTML = '';
    pageNumber.innerHTML = page;
    initCard(page);
  }
  popUp()
}

function onClickStart() {
  page = 1;
  cards.innerHTML = '';
  pageNumber.innerHTML = page;
  initCard(page);
  disableButtonPrevAndStart();
  activeButtonNextAndEnd()
  popUp()
}
function onClickEnd() {
  page = commonCountCards / countCardsInPage;
  cards.innerHTML = '';
  pageNumber.innerHTML = page;
  initCard(page);
  disableButtonNextAndEnd()
  activeButtonPrevAndStart()
  popUp()
}


}




