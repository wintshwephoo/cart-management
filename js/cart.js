const Productcarts = document.querySelector("#Productcarts");
const app = document.querySelector("#app");
const productDetailModal = new bootstrap.Modal("#productDetailModal");

const star = (no) =>{
    let starStr = "";
    for(let i=1;i<=5;i++){
        if(Math.ceil(no) <= i){
            starStr += "<i class='bi bi-star'></i>";
        }else{
            starStr += "<i class='bi bi-star-fill'></i>";
        }      
    }
    return starStr;
 };

 const excerpt = (str,maxlength = 70) =>{
    if(str.length > maxlength){
        return str.substring(0,maxlength) + "...";
    }
    return str;
 }

const createProductCart = (product) =>{
    const div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-4 product-cart";
    div.setAttribute("product-id",product.id);
    div.innerHTML = `<div class=" card mb-3 shadow-sm">
    <div class=" card-body">
      <img src="${product.thumbnail}" class="product-cart-img mb-2" alt="">
      <h4 class=" fw-bold mb-2 text-truncate">${product.title}}</h4>
      <div class=" d-flex justify-content-between align-items-center">
        <div class=" badge bg-secondary">${product.category.replaceAll("-","  ")}</div>
        <div class="">
          ${star(product.rating)}
        </div>
      </div>
      
      <p class="product-cart-description text-black-50">
        ${excerpt(product.description)}
      </p>
      <div class=" d-flex justify-content-between align-items-center border-top pt-3">
        <p class=" mb-0">$ ${product.price}</p>
        <button class=" btn btn-outline-dark">Add to card</button>
      </div>
    </div>
  </div>`;
  return div;
};

const productDetailCarouselItems = (arr) =>{
    let slides = "";
    let indicator ="";
    arr.forEach((el,index) => {
        slides += `<div class="carousel-item ${index === 0 && "active"}">
        <img src="${el}" class="d-block w-100 productDetailImg" alt="...">
      </div>`;
        indicator += `
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index ===0 && "active"}" aria-current="true" aria-label="Slide 1"></button>
        `;
    })
    
    return {slides,indicator};
}

products.forEach((product) =>{
    console.log(product);
    Productcarts.append(createProductCart(product));
})


app.addEventListener("click",(event)=>{
    if(event.target.closest(".product-cart")){
        const currentCard = event.target.closest(".product-cart");
        const currentProductId = currentCard.getAttribute("product-id");
        const currentPorduct = products.find((product) => product.id == currentProductId);
        productDetailModal._element.querySelector(".modal-title").innerText = currentPorduct.title;
        productDetailModal._element.querySelector(".modal-body").innerHTML = `
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                ${productDetailCarouselItems(currentPorduct.images).indicator}
            </div>
          <div class="carousel-inner">
            ${productDetailCarouselItems(currentPorduct.images).slides}
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <div class=" d-flex justify-content-between align-items-center my-3">
          <div class=" badge bg-secondary">${currentPorduct.category.replaceAll("-","  ")}</div>
          <div class="">
            ${star(currentPorduct.rating)}
          </div>
        </div>
        <p class="product-cart-description text-black-50">
          ${currentPorduct.description}
        </p>
        <div class="">$ ${currentPorduct.price}</div>
        `;
        productDetailModal.show();
    }
});