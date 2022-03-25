// Show or hide the Drawer when pressing Hampurger menu or X
function displayDrawer() {
  if (document.getElementById("drawer").style.display == "none") {
    document.getElementById("drawer").style.display = "block";
  } else {
    document.getElementById("drawer").style.display = "none";
  }
}

/*  The code displays the list of phones from 
     the api  "https://api-mobilespecs.azharimm.site"
    depending on the brand selected
*/

let allItem = document.querySelector("#continar");
//   array to add prices on mobiles manually
let arrayForPrice = [
  799, 1199, 869, 999, 819, 849, 949, 709, 769, 629, 599, 689, 779, 659, 779,
  889, 659, 579, 619, 739, 719, 769, 689, 789, 619, 749, 679, 709,
];


// get brands  from home page {end point  api and set it in fetch }
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

fetch("https://api-mobilespecs.azharimm.site/v2/brands/" + params.brandSlug)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    // console.log(data);

    let array = data.data.phones;
    console.log(array);
    for (let i = 0; i < 24; i++) {
      // ? part ' 1 '  /  Create card to display some detils as "image , name , price"

      let card = document.createElement("div");
      card.setAttribute("class", "product-item");
      allItem.appendChild(card);

      // ! image

      let productImg = document.createElement("img");
      productImg.src = array[i].image;
      card.appendChild(productImg);
      productImg.setAttribute("class", "product-img");
      // !  name

      let productName = document.createElement("p");
      productName.textContent = array[i].phone_name;
      productName.setAttribute("class", "product-name");
      card.appendChild(productName);

      // !  price   and cart icon  continar

      let priceAndCartContinar = document.createElement("div");
      priceAndCartContinar.setAttribute("class", "price-and-add-to-cartIcon");
      card.appendChild(priceAndCartContinar);

      // ! create price and add value from > {"arrayForPrice " /  line  9 /    }

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
      addToCartIcon.src = "/images/addToCart.png";
      priceAndCartContinar.appendChild(addToCartIcon);
      addToCartIcon.setAttribute("class", "add-to-cart");

      //?  part  ' 2 ' / addEventListener to  addToCartIcon
      addToCartIcon.addEventListener("click", setItemLocal); //!    line  89
      search();  //!   line  121

    }
  });

// ?  part  ' 3 '  /  add item to local storage

function setItemLocal(e) {
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

 //? search any  mobile 
 function search() {
  let searchBox = document.querySelector(".search-input");
  let cards = document.querySelectorAll(".product-item");
  for (let i = 0; i < cards.length; i++) {
    let input = searchBox.value.toUpperCase();
    if (
      cards[i].firstChild.nextElementSibling.textContent
        .toUpperCase()
        .includes(input)
    ) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
  searchBox.addEventListener("keyup", search);
}






