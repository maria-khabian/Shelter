//import { pets } from './assets/pets.js'
import { openMenuClickBurger, deleteOpenMenuClickLink, closeMenuClickEmptyArea } from './modules/burger.js';
import {getRandomNum} from './modules/helpFunc.js';

openMenuClickBurger()
deleteOpenMenuClickLink()
closeMenuClickEmptyArea()

const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next')

const carusel = document.querySelector('.our-friends-slideCarusel')

const slideWrapperPrev = document.querySelector('.our-friends-SliderPrev')
const slideWrapperActive = document.querySelector('.our-friends-list')
const slideWrapperNext = document.querySelector('.our-friends-SliderNext')

async function getPets() {
  const petsData = './assets/pets.json';
  const result = await fetch(petsData);
  const data = await result.json();
  return data
}

// Create card for start page (Prev - Current - Next)

const arrWithActualIdx = []
const commonArr = []

function createInitCard (slide, booleanValue) {
  const arrCard = []
  while(arrCard.length !== 3) {
    const number = getRandomNum(0,8);
    if(!arrCard.includes(number) && !arrWithActualIdx.includes(number)) {
      arrCard.push(number)
      if(booleanValue) {
        arrWithActualIdx.push(number)
      }
    }
  }
    for(let i = 0; i < arrCard.length; i++) {
      const petIdx = arrCard[i]
      getPets().then(arr => {
        const pet = arr[petIdx];
        const card = createCard(pet.name, pet.img, pet.name)
        slide.append(card)
      })
    }
    commonArr.push(arrCard)
}

createInitCard(slideWrapperActive, true)
createInitCard(slideWrapperPrev, false)
createInitCard(slideWrapperNext, false)

let petsPrev = commonArr[0]
let petsActual = commonArr[1]
let petsNext = commonArr[2]

// button-PREV

const changeSlidePrev = () => {
  carusel.classList.add('transition-prev');
  slidePrev.removeEventListener('click', changeSlidePrev);
  slidePrev.classList.add('slider-icon_disabled')
}

slidePrev.addEventListener('click', changeSlidePrev)

// button-NEXT

const changeSlideNext = () => {
  carusel.classList.add('transition-next');
  slideNext.removeEventListener('click', changeSlideNext);
  slideNext.classList.add('slider-icon_disabled')
}

slideNext.addEventListener('click', changeSlideNext)

// create new slideWrapper

const createCard = (alt, src, name) => {
  const card = document.createElement('div');
  card.classList.add('our-friends-item');
  const divImg = document.createElement('div');
  divImg.classList.add('our-friends-item__img');
  const img = document.createElement('img');
  img.setAttribute('alt', `${alt}`);
  img.src = `${src}`;
  divImg.append(img)
  card.append(divImg)
  const nameTitle = document.createElement('h3');
  nameTitle.classList.add('our-friends-item__name');
  nameTitle.innerText = `${name}`;
  card.append(nameTitle);
  const button = document.createElement('button');
  button.classList.add('our-friends-btn');
  button.classList.add('button');
  button.innerText = 'Learn more';
  card.append(button);
  return card
}

 //-------------------------------------------------------------------------------

carusel.addEventListener("animationend", (animationEvent) => {
  let changedItem;
  let changedItemArr;
  let nameAnimation = animationEvent.animationName;
  if (nameAnimation === "move-prev") {
    carusel.classList.remove("transition-prev");
    slidePrev.classList.remove("slider-icon_disabled");
    changedItem = slideWrapperPrev;

    let active = slideWrapperActive.innerHTML;
    slideWrapperActive.innerHTML = slideWrapperPrev.innerHTML;
    slideWrapperNext.innerHTML = active;

    petsNext = petsActual; // new
    petsActual = petsPrev;
    petsPrev = []; // new
    changedItemArr = petsPrev; //new
  } else {
    carusel.classList.remove("transition-next");
    slideNext.classList.remove("slider-icon_disabled");
    changedItem = slideWrapperNext;

    let active = slideWrapperActive.innerHTML;
    slideWrapperActive.innerHTML = slideWrapperNext.innerHTML;
    slideWrapperPrev.innerHTML = active;

    petsPrev = petsActual; // new
    petsActual = petsNext;
    petsNext = []; //new
    changedItemArr = petsNext; //new
  }

  changedItem.innerHTML = "";

  while (changedItemArr.length !== 3) {
    const number = getRandomNum(0, 8);
    if (!petsActual.includes(number) && !changedItemArr.includes(number)) {
      changedItemArr.push(number);
      console.log(number)
    }
  }

  for (let i = 0; i < changedItemArr.length; i++) {
    const petIdx = changedItemArr[i];
    getPets().then((arr) => {
      const pet = arr[petIdx];
      const card = createCard(pet.name, pet.img, pet.name);
      changedItem.append(card);
    });
  }

  slidePrev.addEventListener("click", changeSlidePrev);
  slideNext.addEventListener("click", changeSlideNext);
});


