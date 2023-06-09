const CssClasses = {
  CARD: 'card-item',
  IMG: 'card-item__img',
  NAME: 'card-item__name',
  CARD_BUTTON: 'card-item__button',
  BUTTON: 'btn',
};

function createElement(elementHTML, elementClass) {
  const element = document.createElement(`${elementHTML}`);
  element.classList.add(`${elementClass}`);
  return element;
}

function createCard(alt, src, name) {

  const card = createElement('div', `${CssClasses.CARD}`);

  const imgWrapper = createElement('div', `${CssClasses.IMG}`);
  const img = document.createElement('img');
  img.setAttribute('alt', `${alt}`);
  img.src = `${src}`;
  imgWrapper.append(img)

  const namePet = createElement('h3', `${CssClasses.NAME}`);
  namePet.innerText = `${name}`;

  const button = createElement('button', `${CssClasses.CARD_BUTTON}`);
  button.classList.add(`${CssClasses.BUTTON}`);
  button.innerText = 'Learn more';

  card.append(imgWrapper, namePet, button);
  return card
}

export {createCard, createElement}

