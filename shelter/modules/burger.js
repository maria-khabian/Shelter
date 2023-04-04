const burgerIcon = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.navigate');
  const headerMenu = document.querySelector('.header-menu');

// Open menu on click burgerIcon

const openMenuClickBurger = () => {

  if(burgerIcon) {
    burgerIcon.addEventListener('click', () => {
      document.body.classList.toggle('_lock');
      headerMenu.classList.toggle('_lock');
      burgerIcon.classList.toggle('_active');
      navMenu.classList.toggle('_active');
    })
  }
}


//Delete open menu on click Link

const deleteOpenMenuClickLink = () => {
  const link = document.querySelectorAll('.nav-list__link');

if(link.length > 0) {
  link.forEach( itemLink => {
    itemLink.addEventListener('click', onClickItemLink)
  })

  function onClickItemLink(event) {
    if(burgerIcon.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      headerMenu.classList.remove('_lock');
      burgerIcon.classList.remove('_active');
      navMenu.classList.remove('_active');
    }
  }
}
}

// Close menu on click empty area

const closeMenuClickEmptyArea = () => {
  headerMenu.addEventListener('click', (event) => {
  if(event.target.classList.contains('header-menu')) {
    document.body.classList.remove('_lock');
    headerMenu.classList.remove('_lock');
    burgerIcon.classList.remove('_active');
    navMenu.classList.remove('_active');
  }
})
}

export {openMenuClickBurger, deleteOpenMenuClickLink, closeMenuClickEmptyArea}


