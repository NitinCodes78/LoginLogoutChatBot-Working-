/*``````````````NAVBAR````````````````````````*/
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');
const cross = document.querySelector('.cross');

hamburger.addEventListener("click",function(){
    navbar.classList.add('active');
    hamburger.classList.add('active');
}
);
cross.addEventListener("click",function(){
    navbar.classList.remove('active');
    hamburger.classList.remove('active');
}
);

/*``````````````STICKY NAVBAR`````````````````*/
const nav = document.querySelector('nav');
const header = document.querySelector('.header');
let topOfNav = nav.offsetTop + header.offsetTop;


function fixNav() {
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = nav.offsetHeight + 'px';
    nav.style.top = header.offsetHeight + 'px';
    document.body.classList.add('fixed-nav');
  } else {
    document.body.classList.remove('fixed-nav');
    document.body.style.paddingTop = 0;
    nav.style.top = 0;
  }
}

window.addEventListener('scroll', fixNav);
