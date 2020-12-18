
const imgs = document.getElementById("imgs");
const img = document.querySelectorAll("#imgs img");
let idx = 0;
function run() {
    idx++;
    if (idx > img.length - 1) {
        idx = 0;
    }
    imgs.style.transform = `translateX(${-idx * 1300}px)`;
}

setInterval(run, 5000);


// the image gallery


let productsGallery = document.querySelector('.products-gallery').children
//console.log(productsGallery)

let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
let page = document.querySelector('.page-numbers')


let maxItem = 16;
let index = 1;

let pagination = Math.ceil(productsGallery.length/maxItem);
//console.log(pagination)


prev.addEventListener('click', ()=>{
    index--;
    check()
    showItems()
})

next.addEventListener('click', ()=>{
    index++;
    check();
    showItems();
    
})

function check(){
    if(index == pagination){
        next.classList.add('disabled')
    } else {
        next.classList.remove('disabled')
    }
    if(index == 1){
        prev.classList.add('disabled');
    } else {
        prev.classList.remove('disabled');
    }
}

function showItems(){
    for(let i = 0; i < productsGallery.length; i++){
        productsGallery[i].classList.remove('show')
        productsGallery[i].classList.add('hide')
        if(i >= (index*maxItem)- maxItem && i < index*maxItem)
        {
            productsGallery[i].classList.remove('hide')
            productsGallery[i].classList.add('show')
            //if i greater than and equal to (index * maxItem) - maxItem;
            //means (1 *16) -16 =0 if index =2 then (2* 16)-16 =16
        }
        page.innerHTML = index
    }
}


let rowIcon = document.getElementById('row-icon')
let columnIcon = document.getElementById('column-icon')
let pG = document.querySelector('.products-gallery')
let loader = document.getElementById('loader')
let demo = document.querySelector('.products-gallery').children
let productImages = document.querySelectorAll('.product-img')
let productNames = document.querySelectorAll('.product-name')
let productPrices = document.querySelectorAll('.product-price')
let opds = document.querySelectorAll('.opd')
let productOldPrices = document.querySelectorAll('.product-old-price')
let productLogos = document.querySelectorAll('.product-logo')
let detailsBtns = document.querySelectorAll('.details-btn')
//let productImages = document.querySelectorAll('.product-img')



columnIcon.addEventListener('click', ()=>{ 
    columnIcon.style.color = ' #FF8200'
    rowIcon.style.color = 'black'
    pG.classList.remove('flex')
    pG.classList.add('column')
    for(let i = 0; i < demo.length; i++){  
        demo[i].classList.remove('withrow')
        demo[i].classList.add('withcolumn')
    }

    for(let i = 0; i < productImages.length; i++){  
        productImages[i].classList.remove('product-img-with-row')
        productImages[i].classList.add('product-img-with-column')
    }

    for(let i = 0; i < productNames.length; i++){  
        productNames[i].classList.remove('product-name-with-row')
        productNames[i].classList.add('product-name-with-column')
    }

    for(let i = 0; i < productPrices.length; i++){  
        productPrices[i].classList.remove('product-price-with-row')
        productPrices[i].classList.add('product-price-with-column')
    }
    
    for(let i = 0; i < opds.length; i++){  
        opds[i].classList.remove('opd-with-row')
        opds[i].classList.add('opd-with-column')
    }

    for(let i = 0; i < productOldPrices.length; i++){  
        productOldPrices[i].classList.remove('product-old-price-with-row')
        productOldPrices[i].classList.add('product-old-price-with-column')
    }
    
    for(let i = 0; i < productLogos.length; i++){  
        productLogos[i].classList.remove('product-logo-with-row')
        productLogos[i].classList.add('product-logo-with-column')
    }

    for(let i = 0; i < detailsBtns.length; i++){  
        detailsBtns[i].classList.remove('details-btn-with-row')
        detailsBtns[i].classList.add('details-btn-with-column')
    }
})


rowIcon.addEventListener('click', ()=>{ 
    rowIcon.style.color = ' #FF8200'
    columnIcon.style.color = 'black'
    pG.classList.add('flex')
    pG.classList.remove('column')
    for(let i = 0; i < demo.length; i++){  
        demo[i].classList.add('withrow')
        demo[i].classList.remove('withcolumn')
    }

    for(let i = 0; i < productImages.length; i++){  
        productImages[i].classList.add('product-img-with-row')
        productImages[i].classList.remove('product-img-with-column')
    }

    for(let i = 0; i < productNames.length; i++){  
        productNames[i].classList.add('product-name-with-row')
        productNames[i].classList.remove('product-name-with-column')
    }

    for(let i = 0; i < productPrices.length; i++){  
        productPrices[i].classList.add('product-price-with-row')
        productPrices[i].classList.remove('product-price-with-column')
    }
    
    for(let i = 0; i < opds.length; i++){  
        opds[i].classList.add('opd-with-row')
        opds[i].classList.remove('opd-with-column')
    }

    for(let i = 0; i < productOldPrices.length; i++){  
        productOldPrices[i].classList.add('product-old-price-with-row')
        productOldPrices[i].classList.remove('product-old-price-with-column')
    }
    
    for(let i = 0; i < productLogos.length; i++){  
        productLogos[i].classList.add('product-logo-with-row')
        productLogos[i].classList.remove('product-logo-with-column')
    }

    for(let i = 0; i < detailsBtns.length; i++){  
        detailsBtns[i].classList.add('details-btn-with-row')
        detailsBtns[i].classList.remove('details-btn-with-column')
    }
})


window.onload = function(){

    pG.classList.remove('hidden')
    loader.classList.add('hidden')

    showItems();
    check();
}




