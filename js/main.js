/* ================================================MENU SHOW Y HIDDEN============================================= */

const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// **************************  Menu Show  *************************/
// Validate if constant exists //
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// **************************  Menu Hidden  *************************/

if (navClose) {
  navClose.addEventListener("click", () => {
    console.log("yes");
    navMenu.classList.remove("show-menu");
  });
}

// **************************  Menu Hidden  *************************/

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  var navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));


// =================================== Qualification tabs ======================

const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    const target = document.querySelector(tab.dataset.target)

    tabContents.forEach(tabContent => {
      tabContent.classList.remove('qualification__active')
    })

    target.classList.add('qualification__active');

    tabs.forEach(tab =>{
      tab.classList.remove('qualification__active')
    })

    tab.classList.add('qualification__active')

  })
})

// =================================== Portfolio ======================

// var swiper = new Swiper(".portfolio__container", {
//   cssMode: true,
//   loop : true,
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   pagination: {
//     el: ".swiper-pagination",
//     clickable : true
//   },

//   mousewheel : true,
//   keyboard : true
// });


// ================================== Skills ==========================

const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills(){
  let itemClass = this.parentNode.className;

  for(i = 0; i< skillsContent.length; i++){
    skillsContent[i].className = 'skills__content skills__close';
  }

  if(itemClass === 'skills__content skills__close'){
    this.parentNode.className = 'skills__content skills__open'
  }

}

skillsHeader.forEach((el) =>{
  el.addEventListener('click', toggleSkills);
})



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive);


/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
  const nav = document.getElementById('header')
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

function flipCard(cardId) {
  const flipCardInner = document.querySelector(`[data-card="${cardId}"] .flip-card-inner`);
  flipCardInner.style.transform = 'rotateY(180deg)';
}

function flipToFront(cardId) {
  const flipCardInner = document.querySelector(`[data-card="${cardId}"] .flip-card-inner`);
  flipCardInner.style.transform = 'rotateY(0deg)';
}

// ===================================== Change Project Section =============================================
function changeSection(sectionName) {
  var i;
  var x = document.getElementsByClassName("portfolio__container");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(sectionName).style.removeProperty("display");
}

