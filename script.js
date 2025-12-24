document.addEventListener("DOMContentLoaded", function () {
  const menuOptions = document.querySelectorAll(".menu__item");
  const sections = document.querySelectorAll("section");

  // sections tab

  menuOptions.forEach((option, index) => {
    option.addEventListener("click", () => {
      // all the sections will turn off
      sections.forEach((section) => {
        section.classList.add("inactive");
        section.classList.remove("on", "active");
      });
      // the section that go with the index will turn on
      sections[index].classList.remove("inactive");
      sections[index].classList.add("active");
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

    // the default info
    updateDestination(0);
    renderTabs();
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
        updateDestination(index);
      });
    });
  }
});
