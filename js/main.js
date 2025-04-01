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

async function fetchProjects() {
  try {
    const response = await fetch('data/projects.json');  // Ensure the correct path
    const projects = await response.json();

    Object.entries(projects["projects"]).forEach(([category, categoryProjects]) => {
      Object.values(categoryProjects).forEach(project => {
        createProjectCard(project, category);
      });
    });
  } catch (error) {
    console.error('Error fetching project data:', error);
  }
}

function createProjectCard(project, category) {
  const container = document.getElementById(category);
  const card = document.createElement('div');
  card.classList.add('project-card', 'color-container', 'flip-card');
  card.setAttribute('data-card', project.id);

  const flipCardInner = document.createElement('div');
  flipCardInner.classList.add('flip-card-inner');

  const flipCardFront = document.createElement('div');
  flipCardFront.classList.add('flip-card-front');
  flipCardFront.innerHTML = `
    <img src="${project.image}" alt="${project.title}" class="project-img" />
    <h2 class="experience-sub-title project-title">${project.title}</h2>
    <div class="btn-container">
      ${project.links?.live ? `<button class="btn btn-color-2 project-btn" onclick="window.open('${project.links.live}', '_blank')">Live Demo</button>` : ''}
      ${project.links?.github ? `<button class="btn btn-color-2" onclick="window.open('${project.links.github}', '_blank')">Github</button>` : ''}
      <button class="btn btn-color-2" onclick="flipCard('${project.id}')">Description</button>
    </div>
  `;

  const flipCardBack = document.createElement('div');
  flipCardBack.classList.add('flip-card-back');
  flipCardBack.innerHTML = `
    <button class="flip-card-back-close" onclick="flipToFront('${project.id}')">X</button>
    <div class="experience-content">
      <h2 class="project-title-back">${project.title}</h2>
        <ul class="experience-content ul">
          <li>${project.description}</li>
          ${
            project?.contribution?.map(contri => `<li>${contri}</li>`).join('')
          }
        </ul>
    </div>
  `;

  flipCardInner.appendChild(flipCardFront);
  flipCardInner.appendChild(flipCardBack);
  card.appendChild(flipCardInner);
  container.appendChild(card);
}

document.addEventListener('DOMContentLoaded', fetchProjects);

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

