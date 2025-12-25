document.addEventListener("DOMContentLoaded", function () {
  // sections tab
  const menuOptions = document.querySelectorAll(".menu__item");
  const sections = document.querySelectorAll("section");

  menuOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      // all the sections will turn off
      sections.forEach((section) => {
        section.classList.add("inactive");
        section.classList.remove("active");
      });
      // the section that go with the index will turn on
      sections[index].classList.remove("inactive");
      sections[index].classList.add("active");
      menuOptions.forEach((option) => {
        option.classList.remove("on");
      });
      option.classList.add("on");
    });
  });

  //destination fetch json
  const dName = document.querySelector(".d__name");
  const dDescription = document.querySelector(".d__description");
  const dDistance = document.querySelector(".d__distance");
  const dTravel = document.querySelector(".d__travel");
  const dImg = document.querySelector(".d__img");
  const dTabs = document.querySelectorAll(".d__tab");

  let destinationsData = []; // JSON info

  async function loadData() {
    const response = await fetch("starter-code/data.json");
    const data = await response.json();

    destinationsData = data.destinations;
    crewData = data.crew;
    techData = data.technology;

    // the default info DESTINATION
    updateDestination(0);
    renderTabs();

    // the default info CREW
    updateCrew(0);
    renderDots();

    // the default info TECHNOLOGY
    updateTech(0);
    renderBtns();
  }

  loadData();

  function updateDestination(index) {
    const destination = destinationsData[index];

    dImg.style.backgroundImage = `url(${destination.images.webp})`;

    dName.textContent = destination.name;
    dDescription.textContent = destination.description;
    dDistance.textContent = destination.distance;
    dTravel.textContent = destination.travel;
  }

  function renderTabs() {
    dTabs.forEach((tab, index) => {
      // create the name list
      tab.textContent = destinationsData[index].name;
      tab.addEventListener("click", () => {
        dTabs.forEach((tab) => {
          tab.classList.remove("on");
        });
        tab.classList.add("on");
        updateDestination(index);
      });
    });
  }

  //crew fetch json
  const cName = document.querySelector(".c__name");
  const cRole = document.querySelector(".c__role");
  const cBio = document.querySelector(".c__description");
  const cImg = document.querySelector(".c__img");
  const cDots = document.querySelectorAll(".c__dot");

  let crewData = []; // JSON info

  function updateCrew(index) {
    const crew = crewData[index];

    cImg.style.backgroundImage = `url(${crew.images.webp})`;

    cName.textContent = crew.name;
    cBio.textContent = crew.bio;
    cRole.textContent = crew.role;
  }

  function renderDots() {
    cDots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        cDots.forEach((dot) => {
          dot.classList.remove("onBtn");
        });
        dot.classList.add("onBtn");
        updateCrew(index);
      });
    });
  }

  //tech fetch json
  const tName = document.querySelector(".t__name");
  const tDescription = document.querySelector(".t__description");
  const tImg = document.querySelector(".t__img");
  const tBtn = document.querySelectorAll(".t__btn");

  const tabletMediaQuery = window.matchMedia("(max-width: 69.5em)");

  let techData = []; // JSON info
  let currentSize = 0;

  function updateTech(index) {
    currentSize = index;
    const tech = techData[index];

    tName.textContent = tech.name;
    tDescription.textContent = tech.description;

    sizeChange(tech);
  }

  function sizeChange(tech) {
    if (tabletMediaQuery.matches) {
      tImg.style.backgroundImage = `url(${tech.images.landscape})`;
    } else {
      tImg.style.backgroundImage = `url(${tech.images.portrait})`;
    }
  }

  tabletMediaQuery.addEventListener("change", () => {
    const currentTech = techData[currentSize];
    sizeChange(currentTech);
  });

  function renderBtns() {
    tBtn.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        tBtn.forEach((btn) => {
          btn.classList.remove("onBtn");
        });
        btn.classList.add("onBtn");
        updateTech(index);
      });
    });
  }
});
