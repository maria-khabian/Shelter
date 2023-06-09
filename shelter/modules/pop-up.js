import {petsJSON} from './../assets/pets.js';

const CssClasses = {
  WRAPPER: 'pop-up',
  CARD_PET: 'pop-up_pet',
  BUTTON_CLOSE: 'pet_btnClose',
  IMG: 'pet_img_img',
  NAME: 'content_name',
  TYPE: 'content_aboutPet__type',
  BREED: 'content_aboutPet__breed',
  DESCRIPTION: 'content_description',
  AGE: 'item_age',
  INOCULATIONS: 'item_inoculations',
  DISEASES: 'item_diseases',
  PARASITES: 'item_parasites',
}

// export function popUp() {
// document.addEventListener('DOMContentLoaded', function() {
//   const cardsPets = document.querySelectorAll('.card-item');

//   cardsPets.forEach(cardPet => {
//     cardPet.addEventListener('click', () => {
//       console.log(cardPet, '2')
//     })
//   })
// });
// }



export function popUp() {

  const htmlELEM = document.querySelector('.html');
  const bodyMain = document.querySelector('.bodyMain');
  const bodyPets = document.querySelector('.bodyPets');

  const wrapper = document.querySelector(`.${CssClasses.WRAPPER}`);
  const cardsPets = document.querySelectorAll('.card-item');
  const buttonClose = document.querySelector(`.${CssClasses.BUTTON_CLOSE}`);

  cardsPets.forEach(cardPet => {
  cardPet.addEventListener('click', () => {
    htmlELEM.classList.add('_lock');
    const namePet = cardPet.querySelector('.card-item__name').innerHTML;
    const index = petsJSON.findIndex(pet => pet.name === namePet);
    if(bodyMain) {
      createPopUp(petsJSON[index].name, petsJSON[index].img, petsJSON[index].name, petsJSON[index].type, petsJSON[index].breed, petsJSON[index].description, petsJSON[index].age, petsJSON[index].inoculations, petsJSON[index].diseases, petsJSON[index].parasites)
    } else if (bodyPets) {
      createPopUp(petsJSON[index].name, petsJSON[index].imgPets, petsJSON[index].name, petsJSON[index].type, petsJSON[index].breed, petsJSON[index].description, petsJSON[index].age, petsJSON[index].inoculations, petsJSON[index].diseases, petsJSON[index].parasites)
    }
    wrapper.classList.add('visible')
  })
  })

  buttonClose.addEventListener('click', closePopUpCardBTN)
  wrapper.addEventListener('click', closePopUpCardWRAPPER)

function createPopUp(alt, src, name, type, breed, description, age, inoculations, diseases, parasites) {
  const popUpPet = document.querySelector(`.${CssClasses.CARD_PET}`);

  let img = popUpPet.querySelector(`.${CssClasses.IMG}`);
  let nameEl = popUpPet.querySelector(`.${CssClasses.NAME}`);
  let typeEl = popUpPet.querySelector(`.${CssClasses.TYPE}`);
  let breedEl = popUpPet.querySelector(`.${CssClasses.BREED}`);
  let descriptionEl = popUpPet.querySelector(`.${CssClasses.DESCRIPTION}`);
  let ageEl = popUpPet.querySelector(`.${CssClasses.AGE}`);
  let inoculationsEl = popUpPet.querySelector(`.${CssClasses.INOCULATIONS}`);
  let diseasesEl = popUpPet.querySelector(`.${CssClasses.DISEASES}`);
  let parasitesEl = popUpPet.querySelector(`.${CssClasses.PARASITES}`);

  img.setAttribute('alt', `${alt}`);
  img.src = `${src}`;

  nameEl.innerHTML = `${name}`;
  typeEl.innerHTML = `${type}`;
  breedEl.innerHTML = `${breed}`;
  descriptionEl.innerHTML = `${description}`;
  ageEl.innerHTML = `${age}`;
  inoculationsEl.innerHTML = inoculations.reduce((a,b) => a + (b + ' '), '').trim();
  diseasesEl.innerHTML = diseases.reduce((a,b) => a + (b + ' '), '').trim();
  parasitesEl.innerHTML = parasites.reduce((a,b) => a + (b + ' '), '').trim();

  return popUpPet;
}

function closePopUpCardBTN() {
  htmlELEM.classList.remove('_lock');
  wrapper.classList.remove('visible')
}

function closePopUpCardWRAPPER(event) {
if(event.target.classList.contains('pop-up')) {
  htmlELEM.classList.remove('_lock');
  wrapper.classList.remove('visible')
}

}


}

// Нажимаешь на карточку и у тебя закрывается модалка, а должна закрываться только по клику за областью модалки

// Не сделала остановку скрола страницы, если открыта модалка




