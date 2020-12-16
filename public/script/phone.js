
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
console.log(productsGallery)

let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
let page = document.querySelector('.page-numbers')


let maxItem = 16;
let index = 1;

let pagination = Math.ceil(productsGallery.length/maxItem);
console.log(pagination)


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


window.onload = function(){
    showItems();
    check();
}




