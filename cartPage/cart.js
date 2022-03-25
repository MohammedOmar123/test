// Show or hide the Drawer when pressing Hampurger menu or X
function displayDrawer(){
    if(document.getElementById("drawer").style.display == "none") {
        document.getElementById("drawer").style.display = "block";
    } else{
        document.getElementById("drawer").style.display ="none";
    }
  }
// create the elements container
let container = document.createElement("div");
container.classList.add("continar");
document.body.appendChild(container);
function deleteFromArray(arr,idx){
    let arr1 = []
    for (let i = 0 ; i < arr.length ; i ++ ){
        if (i == idx){
            continue;
        }
        arr1.push(arr[i]);
    }
    return arr1;
}
let cartTotalPrice =0;
// functions used for get elment from local storage
function show(){
    let cartItems = JSON.parse(localStorage.getItem("arrayLocalStorage")) 
    localStorage.clear()
    localStorage.setItem("arrayLocalStorage" , JSON.stringify(cartItems))
    console.log(cartItems)
    // create div for each elment and create the elments inside it
    if(localStorage.length){
    for(let i=0; i<cartItems.length; i++){
        // elment container
        let parent = document.createElement("div");
        parent.classList.add("bought");
        // image container
        let image_container= document.createElement("div");
        image_container.classList.add("image-container");
        // cretae the image 
        let photo = document.createElement("img");
        photo.classList.add("images"); 
        photo.src=cartItems[i]["mobileImg"];
        image_container.appendChild(photo);
        parent.appendChild(image_container);
        // create content container
        let content_container= document.createElement("div"); 
        content_container.classList.add("content-container");
        let name_price = document.createElement("div");
        name_price.classList.add("name-price");
        // crete name element
        let mobname = document.createElement("p");
        mobname.innerHTML=cartItems[i]["mobileName"];
        mobname.classList.add('name-phone');
        name_price.appendChild(mobname);
        // create pricec element
        let price = document.createElement("p");
        price.innerHTML=cartItems[i]["mobilePrice"]+" $";
        cartTotalPrice += parseInt(cartItems[i]["mobilePrice"]);
        price.classList.add("price");
        name_price.appendChild(price);
        content_container.appendChild(name_price);
        let icon = document.createElement("div");
        icon.classList.add("name-price");
        // create icon element
        let icons = document.createElement("i");
        icons.classList.add("delete-icon");
        icons.setAttribute("class", "fa-solid fa-trash delete-icon");
        icons.setAttribute("value","Reload Page");
        icons.setAttribute( "onClick","window.location.reload();");
        icon.appendChild(icons);
        content_container.appendChild(icon);
        parent.appendChild(content_container);
        // delete action
        icons.addEventListener("click",(e) =>{
            if(localStorage.length){
            localStorage = {}
            console.log(localStorage)
            let sto = deleteFromArray(cartItems,i)
            if(cartItems.length != 0 ){
                localStorage.setItem("arrayLocalStorage" , JSON.stringify(sto))
                parent.remove();
            }else{
                localStorage.clear()
            }
            
            }else{
                console.log("empty");
            }
            });
            container.appendChild(parent);
        }
    }else{
        console.log("Empty");
    }
    };
    function openForm() {
        document.getElementById("myForm").style.display = "block";
      };
      
      function closeForm() {
        document.getElementById("myForm").style.display = "none";
      };
    show();
    // total price and Buy button 
    let container1 = document.createElement("div");
    container1.classList.add("total");
    let para = document.createElement("p");
    para.innerHTML= "Total : ";
    para.classList.add("text");
    container1.appendChild(para);
    let pricrContainer = document.createElement("p");
    pricrContainer.innerHTML = cartTotalPrice.toString()+"$";
    pricrContainer.classList.add("pricr-container");
    container1.appendChild(pricrContainer);
    let totalprice = document.createElement("button");
    totalprice.innerHTML= "Buy Now";
    totalprice.classList.add("buy");
    let fixedPaymentButton = document.createElement("div");
    fixedPaymentButton.classList.add("fixedPaymentButton");
    fixedPaymentButton.appendChild(container1);
    fixedPaymentButton.appendChild(totalprice);
    document.body.appendChild(fixedPaymentButton);
