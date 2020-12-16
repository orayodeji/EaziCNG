/*
let firImg  = document.querySelector(".fir-img")
let firLink = document.getElementById("firbox-url")
let priceBox = document.querySelector('.price-box')
let productLogo = document.querySelector('.product-logo')
let firboxGallery =  document.querySelector('.firbox-gallery')

let newData = [];


fetch("/demo.json").
then((res)=>{
    return res.json()
})
.then((data)=>{
    console.log(data)
})


function display(newData){
    firboxGallery.innerHTML="";
    newData.forEach((b)=>{
        let {img, logo, name, price, url} = b;

        let box = document.createElement("div");
        box.classList.add("firbox-box");

        box.innerHTML = ` <a href="${url}" id="firbox-url"><img src="${img}" alt="demo" class="fir-img"></a>
        <img src="${logo}" alt="vendor-logo" class="product-logo">
        <p id="price-box">${name}</p>
        <p id="new-price-box">${price}</p>
        <p id="old-price-box"></p>`
        firboxGallery.appendChild(box)
    })
}
*/