function slider(){
    var swiper = new Swiper(".swiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        lazy: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            600: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            950: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
            1055: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
        }
      });
}

function getData(){
    $.ajax({
        dataType: "json",
        url: 'product-list.json',
        success: onSuccessItems,
        error: onErrorItems
      })
}

let params;
function onSuccessItems(jsonReturn){
    params = jsonReturn.responses[0][0].params;

    //Categories
    params.userCategories.map(function(element, index){
        $(".categories").append(
            `
            <button type="button" class="btn cat-btn" id="btn${index}" onclick="btnClick('${element}',${index})"><p>${element}</p></button>
            
            `
        )

    });
    $("#btn0").click();
}

//Carousels
//Category button onclick
function btnClick(category, btnIndex){
    let currentButton = "#btn" + btnIndex;
    $(".carousel").empty();
    $('.cat-btn').removeClass("active");
    $(currentButton).addClass("active");
    params.recommendedProducts[category].map(function(element, index){
        const image = element.image;
        const name =  element.name;
        const price =  element.priceText;
        const shippingFeeText =  element.params.shippingFee;

        function freeFee(){
            if(shippingFeeText == "FREE"){
                return "Ücretsiz Kargo";
            }else{
                return shippingFeeText;
            }
        }
        
        $(".carousel").append(
            `
            <div class = "swiper-slide item-info">
            <img data-src="${image}" class="swiper-lazy"></img>
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white preloader"></div>
            <h6 class="product-name">${name}</h6>
            <h5 class="price">${price}</h5>
            <h6 class="shippingFee"><i class="bi bi-truck"></i> ${freeFee()}</h6>
            <button type="button" class="btn btn-primary .d-block .d-sm-none" onclick="sepetPopup()">Sepete Ekle</button>
            </div>
            `
        )
    });

    slider();
}

function sepetPopup(){
    swal({
        icon: "success",
        title: "Ürün sepete eklendi.",
        text: "Sepete git",
        buttons: false,

      });
}

function onErrorItems(){
    console.log("JSON read failed.");
}

$(document).ready(function(){
    getData();
    $("#btn0").click();
});