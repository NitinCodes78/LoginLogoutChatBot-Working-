const magnifyIcons = [...document.querySelectorAll('.search')];
const magnify = document.querySelector('.magnify');
const closeLightbox = document.querySelector('.close-lightbox');

magnifyIcons.forEach(icon =>{
    icon.addEventListener('click',(e)=>{
        const targetProduct = e.target.parentElement.parentElement;
        const styles = window.getComputedStyle(targetProduct, false);
        const bgImgUrl = styles.backgroundImage.slice(4, -1).replace(/"/g, "");

        magnify.style.display = 'flex';
        magnify.querySelector('.lightbox img').src = bgImgUrl;
    })
})

closeLightbox.addEventListener('click',()=> magnify.style.display = 'none' );


