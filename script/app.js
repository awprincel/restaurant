document.addEventListener("DOMContentLoaded", () => {
  const burgerToggle = document.querySelector(".burger-menu-toggle");
  const burgerMenu = document.querySelector(".burger-menu");
  const burgerClose = document.querySelector(".burger-menu-close");
  const overlay = document.querySelector(".burger-menu-overlay");
  const body = document.body;

  if (burgerToggle && burgerMenu && burgerClose && overlay) {
    function openBurgerMenu() {
      burgerMenu.classList.add("active");
      overlay.classList.add("active");
      body.classList.add("no-scroll");
    }

    function closeBurgerMenu() {
      burgerMenu.classList.remove("active");
      overlay.classList.remove("active");
      body.classList.remove("no-scroll");
    }

    burgerToggle.addEventListener("click", openBurgerMenu);
    burgerClose.addEventListener("click", closeBurgerMenu);
    overlay.addEventListener("click", closeBurgerMenu);

    const burgerLinks = document.querySelectorAll(".burger-nav-list a");
    burgerLinks.forEach((link) => {
      link.addEventListener("click", closeBurgerMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeBurgerMenu();
      }
    });
  }
});

// слайдер
document.addEventListener("DOMContentLoaded", function () {
  const sliderContainer = document.querySelector(".food-slider-container");
  const slides = document.querySelectorAll(".food-slide");
  const prevBtn = document.querySelector(".slider-btn.prev");
  const nextBtn = document.querySelector(".slider-btn.next");

  let currentIndex = 0;
  const totalSlides = slides.length;
  const slidesToShow = 4;

  function updateSlider() {
    const slideWidth = 100 / slidesToShow;
    const translateX = -currentIndex * slideWidth;
    sliderContainer.style.transform = `translateX(${translateX}%)`;
  }

  function nextSlide() {
    if (currentIndex < totalSlides - slidesToShow) {
      currentIndex++;
    } else {
      setTimeout(() => {
        sliderContainer.style.transition = "none";
        currentIndex = 0;
        updateSlider();
        setTimeout(() => {
          sliderContainer.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      }, 500);
    }
    updateSlider();
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      setTimeout(() => {
        sliderContainer.style.transition = "none";
        currentIndex = totalSlides - slidesToShow;
        updateSlider();
        setTimeout(() => {
          sliderContainer.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      }, 500);
    }
    updateSlider();
  }

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  let autoSlideInterval = setInterval(nextSlide, 1000);

  const foodSlider = document.querySelector(".food-slider");
  foodSlider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  foodSlider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(nextSlide, 1000);
  });

  updateSlider();
});

// пагинация
document.addEventListener("DOMContentLoaded", function () {
  const paginationCounters = document.querySelectorAll(".counter");

  paginationCounters.forEach((counter) => {
    counter.addEventListener("click", function (e) {
      e.preventDefault();

      // удаляем актив класс у всех светчиков
      paginationCounters.forEach((c) => c.classList.remove("active_page"));

      // добавляем актив класс к текущему счетчику
      this.classList.add("active_page");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const categoryCheckboxes = document.querySelectorAll(
    '.ul_checkboxes input[type="checkbox"]'
  );
  const productCards = document.querySelectorAll(".main_card");
  const mainCardsContainer = document.querySelector(".main_cards");
  const counterPage = document.querySelector(".counter_page");

  function filterProducts() {
    const selectedCategories = Array.from(categoryCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    let visibleCardsCount = 0;

    // скрываю карточки и убираю их из потока
    productCards.forEach((card) => {
      card.style.opacity = "0";
      card.style.visibility = "hidden";
      card.style.position = "absolute";
    });

    // показ отфильтрованых карточек
    productCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (
        selectedCategories.length === 0 ||
        selectedCategories.includes(cardCategory)
      ) {
        card.style.opacity = "1";
        card.style.visibility = "visible";
        card.style.position = "static";
        visibleCardsCount++;
      }
    });

    // отображение пагинации
    if (counterPage) {
      counterPage.style.display = visibleCardsCount > 0 ? "flex" : "none";
    }

    // выводим сообщение если нет еды по филтрам
    showNoResultsMessage(selectedCategories, visibleCardsCount);
  }

  function showNoResultsMessage(selectedCategories, visibleCardsCount) {
    const existingMessage = document.querySelector(".no-results-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    if (visibleCardsCount === 0 && selectedCategories.length > 0) {
      const message = document.createElement("div");
      message.className = "no-results-message";
      message.innerHTML = `
        <h3>Товары не найдены</h3>
        <p>Попробуйте выбрать другие категории</p>
      `;

      mainCardsContainer.insertBefore(message, mainCardsContainer.firstChild);
    }
  }

  // изменения чекбоксов
  categoryCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
  });

  // фильтрация
  filterProducts();
});
