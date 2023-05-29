const popularProducts=document.querySelectorAll('.product');
popularProducts.forEach(popularProduct=>popularProduct.addEventListener("mouseover",()=>{
     popularProduct.style.opacity='0.75';
     popularProduct.style.backgroundColor='grey';
     const images=popularProduct.querySelectorAll('.icon img');
     images.forEach(image=> image.style.display='flex');
     const price=popularProduct.querySelector('.price');
     price.style.display='inline-block';
}));
popularProducts.forEach(popularProduct=>popularProduct.addEventListener("mouseout",()=>{
    popularProduct.style.opacity='1';
     popularProduct.style.backgroundColor='rgb(220, 241, 241)';
     const images=popularProduct.querySelectorAll('.icon img');
     images.forEach(image=> image.style.display='none');
     const price=popularProduct.querySelector('.price');
     price.style.display='none';
}));

/*``````````````SLIDER````````````````````````*/
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.previous');
var counter = 0;
slides.forEach((slide,index)=>{
    slide.style.left = `${index * 100}%`;
})
nextBtn.addEventListener('click',()=>{
    if(counter > slides.length-2) counter = 0;
    else counter++;

    slideImage();
})
prevBtn.addEventListener('click',()=>{
    if(counter==0) counter =3;
    counter--;

    slideImage();
})
const slideImage = () =>{
    slides.forEach(slide =>{
        slide.style.transform = `translateX(-${counter*100}%)`;
})
}

/**********************ShopNow Buttons Functionality*************** */

/**Slides Button**/
const slide1Button=document.querySelector('.slide-1 .shop-btn');  //All Products
const slide2Button=document.querySelector('.slide-2 .shop-btn');  //Jackets
const slide3Button=document.querySelector('.slide-3 .shop-btn');  //LoungeWear
/**Categories Button**/
const shirtButton=document.querySelector('.shirtStyle .shopNow');
const loungewearButton=document.querySelector('.loungewearLove .shopNow');
const jacketButton=document.querySelector('.lightJackets .shopNow');
const dressButton=document.querySelector('.newDresses .shopNow');
const jeanButton=document.querySelector('.thePerfectJeans .shopNow');
function funcShowAll(){
    window.open("/products","_self");
    localStorage.setItem("type", 'all');
}
function funcShirtButton(){
    window.open("/products","_self");
    localStorage.setItem("type", 'shirt');
}
function funcLoungewearButton(){
    window.open("/products","_self");
    localStorage.setItem("type", 'loungewear');
}
function funcJacketButton(){
    window.open("/products","_self");
    localStorage.setItem("type", 'jacket');
}
function funcDressButton(){
    window.open("/products","_self");
    localStorage.setItem("type", 'dress');
}
function funcJeanButton(){
    window.open("/products","_self");
    localStorage.setItem("type", 'jean');
}
slide1Button.addEventListener("click", funcShowAll);
slide2Button.addEventListener("click",funcJacketButton);
slide3Button.addEventListener("click",funcLoungewearButton);
shirtButton.addEventListener("click",funcShirtButton);
loungewearButton.addEventListener("click",funcLoungewearButton);
jacketButton.addEventListener("click",funcJacketButton);
dressButton.addEventListener("click",funcDressButton);
jeanButton.addEventListener("click",funcJeanButton);
