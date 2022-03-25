// Show or hide the Drawer when pressing Hampurger menu or X
function displayDrawer() {
  if (document.getElementById("drawer").style.display == "none") {
    document.getElementById("drawer").style.display = "block";
  } else {
    document.getElementById("drawer").style.display = "none";
  }
}
//                                splash
const splash = document.querySelector(".splash");
document.addEventListener("DOMContentLoaded", (e) => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 3500);
});

//                             slider
const slider = document.querySelector(".slider"),
  image = document.querySelectorAll(".slider img"),
  prevBtn = document.querySelector("#prevBtn"),
  nextBtn = document.querySelector("#nextBtn");

//counter for the amount of the transmition of the slider
let counter = 0;

//array for the top brands
// let brandsNames = ['Acer', 'Apple', 'Amazon', 'Asus', 'Google', 'Honor', 'HP', 'HTC', 'Huawei', 'Infinix', 'LG', 'Microsoft', 'Razer', 'Realme','Samsung','Sharp','Sony','Xiaomi','XOLO','Yezz','Oppo','ZTE']

const size = image[0].clientWidth;
nextBtn.addEventListener("click", () => {
  nextSlide();
});
prevBtn.addEventListener("click", () => {
  if (counter >= 1) {
    counter--;
  } else {
    counter = image.length - 1;
  }
  slider.style.transform = `translateX(${-size * counter}px)`;
  //console.log(counter)
});
function nextSlide() {
  if (counter < image.length - 1) {
    counter++;
  } else {
    counter = 0;
  }
  slider.style.transform = `translateX(${-size * counter}px)`;
}
setInterval(nextSlide, 3500);

// Get the brand cards div
let brandsCards = document.getElementById("brands-cards");
// Get the products cards div
let productsCards = document.getElementsByClassName("products-cards")[0];
let productsCardsContainer = document.getElementsByClassName("top-products")[0];

// Specify What brands do you want to select form the api
let topBrands = [
  "Apple",
  "Samsung",
  "Huawei",
  "Realme",
  "Sony",
  "Xiaomi",
  "Honor",
  "Infinix",
  "ZTE",
  "BlackBerry",
  "HTC",
  "Lenovo",
];

// Get the selected brands information from the api
function fetchTopBrands() {
  fetch("https://api-mobilespecs.azharimm.site/v2/brands")
    .then((res) => res.json())
    .then((brandsData) => {
      let brands = [];
      for (let i = 0; i < topBrands.length; i++) {
        brands.push(findBrandByBrandName(brandsData, topBrands[i]));
      }
      // create the brands cards
      brands.forEach((item) => {
        let brandCard = document.createElement("a");
        brandCard.setAttribute("class", "brand-card");
        brandsCards.appendChild(brandCard);
        brandCard.setAttribute(
          "href",
          "./productsPage/products.html?brandSlug=" + item.brand_slug
        );

// window.location.href = "./productspage/products.html?brandSlug=" + item.brand_slug "

        let brandTitle = document.createElement("h4");
        brandTitle.textContent = item.brand_name;
        brandCard.appendChild(brandTitle);
      });
    });
}

// execute the code to get the Top brands
fetchTopBrands();
// find the brand in the fetched brands data from the api
function findBrandByBrandName(brandsData, brandName) {
  return brandsData.data.find((brand) => brand.brand_name === brandName);
}

let arrayForPrice = [
  799, 1199, 869, 999, 819, 849, 949, 709, 769, 629, 599, 689, 950, 699, 1399,
  1100, 750, 670,
];

// Get the latest products from the api
fetchLatestProducts();
function fetchLatestProducts() {
  fetch("https://api-mobilespecs.azharimm.site/v2/latest")
    .then((res) => res.json())
    .then((productsData) => {
      // create the cards products
      let i = 0;
      productsData.data.phones.forEach((item) => {
        let productCardDiv = document.createElement("div");
        productCardDiv.setAttribute("class", "slide");
        productsCards.appendChild(productCardDiv);
        let productCard = document.createElement("div");
        productCardDiv.appendChild(productCard);
        productCard.setAttribute("class", "product-card");
        let productImg = document.createElement("img");
        productCard.appendChild(productImg);
        productImg.setAttribute("class", "product-img");
        productImg.setAttribute("src", item.image);
        let productTitle = document.createElement("h4");
        productCard.appendChild(productTitle);
        productTitle.setAttribute("class", "product-title");
        productTitle.textContent = item.phone_name;
        // !  price   and cart icon  continar

        let priceAndCartContinar = document.createElement("div");
        priceAndCartContinar.setAttribute("class", "price-and-add-to-cartIcon");
        productCard.appendChild(priceAndCartContinar);

        // ! create price and add value from {"arrayForPrice " /  line  9 /    }

        let productPrice = document.createElement("p");
        productPrice.textContent = arrayForPrice[i]; // price();
        productPrice.setAttribute("class", "price");
        priceAndCartContinar.appendChild(productPrice);
        let dollar = document.createElement("p");
        dollar.setAttribute("class", "dollar");
        dollar.textContent = "$";
        priceAndCartContinar.appendChild(dollar);

        // !  "   create add to cart  "  icon

        let addToCartIcon = document.createElement("img");
        //  addToCartIcon.src = "image/addToCart.svg";
        addToCartIcon.src = "images/addToCart.png";

        priceAndCartContinar.appendChild(addToCartIcon);
        addToCartIcon.setAttribute("class", "add-to-cart");

        //?  part  ' 2 ' / addEventListener to  addToCartIcon
        addToCartIcon.setAttribute("onclick", "setItemLocal(event);");
        // addToCartIcon.addEventListener("click", setItemLocal);
        i++; //!   line  64
      });

      moveSlidesRight();
    });
}

function setItemLocal(e) {
  e.preventDefault();
  //! get value from html element
  let mobileImg = e.target.parentElement.parentElement.children[0].src;
  let mobileName = e.target.parentElement.parentElement.children[1].textContent;
  let mobilePrice = e.target.parentElement.firstElementChild.textContent;

  //! Get the array if it exists in LocalStorage

  let arrayLocalStorage = JSON.parse(localStorage.getItem("arrayLocalStorage"));

  //! If the array actually contains elements, the elements will be added directly without creating elements
  if (arrayLocalStorage) {
    let data = { mobileImg, mobileName, mobilePrice };
    arrayLocalStorage.push(data);
    localStorage.setItem(
      "arrayLocalStorage",
      JSON.stringify(arrayLocalStorage)
    );

    //! If the array has no elements, the array is created and the data is added
  } else {
    let arrayLocalStorage = [];
    let data = { mobileImg, mobileName, mobilePrice };
    arrayLocalStorage.push(data);
    localStorage.setItem(
      "arrayLocalStorage",
      JSON.stringify(arrayLocalStorage)
    );
  }
}

//                                  carousel

let carousel = document.querySelector(".carousel");
let carouselContent = document.querySelector(".carousel-content");
let slides = document.querySelectorAll(".slide");
let arrayOfSlides = Array.prototype.slice.call(slides);
let carouselDisplaying;
let screenSize;
let lengthOfSlide;
setScreenSize();

function addClone() {
  let lastSlide = carouselContent.lastElementChild.cloneNode(true);
  lastSlide.style.left = -lengthOfSlide + "px";
  carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}
// addClone();

function removeClone() {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  let width = 0;
  slidesArray.forEach(function (el, i) {
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  addClone();
}

function moveSlidesLeft() {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

  slidesArray.forEach(function (el, i) {
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
}

window.addEventListener("resize", setScreenSize);

function setScreenSize() {
  if (window.innerWidth >= 800) {
    carouselDisplaying = 3;
  } else if (window.innerWidth >= 600) {
    carouselDisplaying = 2;
  } else {
    carouselDisplaying = 1;
  }
  getScreenSize();
}

function getScreenSize() {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  lengthOfSlide = carousel.offsetWidth / carouselDisplaying;
  let initialWidth = -lengthOfSlide;
  slidesArray.forEach(function (el) {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}

let rightNav = document.querySelector(".nav-right");
rightNav.addEventListener("click", moveLeft);

let moving = true;
function moveRight() {
  if (moving) {
    moving = false;
    let lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener("transitionend", activateAgain);
    moveSlidesRight();
  }
}

function activateAgain() {
  let firstSlide = carouselContent.firstElementChild;
  moving = true;
  firstSlide.removeEventListener("transitionend", activateAgain);
}

let leftNav = document.querySelector(".nav-left");
leftNav.addEventListener("click", moveRight);

// let moveLeftAgain = true;

function moveLeft() {
  if (moving) {
    moving = false;
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener("transitionend", replaceToEnd);
    moveSlidesLeft();
  }
}

function replaceToEnd() {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = (arrayOfSlides.length - 1) * lengthOfSlide + "px";
  addClone();
  moving = true;
  firstSlide.removeEventListener("transitionend", replaceToEnd);
}

carouselContent.addEventListener("mousedown", seeMovement);

let initialX;
let initialPos;
function seeMovement(e) {
  initialX = e.clientX;
  getInitialPos();
  carouselContent.addEventListener("mousemove", slightMove);
  document.addEventListener("mouseup", moveBasedOnMouse);
}

function slightMove(e) {
  if (moving) {
    let movingX = e.clientX;
    let difference = initialX - movingX;
    if (Math.abs(difference) < lengthOfSlide / 4) {
      slightMoveSlides(difference);
    }
  }
}

function getInitialPos() {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  initialPos = [];
  slidesArray.forEach(function (el) {
    let left = Math.floor(parseInt(el.style.left.slice(0, -2)));
    initialPos.push(left);
  });
}

function slightMoveSlides(newX) {
  let slides = document.querySelectorAll(".slide");
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray.forEach(function (el, i) {
    let oldLeft = initialPos[i];
    el.style.left = oldLeft + newX + "px";
  });
}

function moveBasedOnMouse(e) {
  let finalX = e.clientX;
  if (initialX - finalX > 0) {
    moveRight();
  } else if (initialX - finalX < 0) {
    moveLeft();
  }
  document.removeEventListener("mouseup", moveBasedOnMouse);
  carouselContent.removeEventListener("mousemove", slightMove);
}
