const hrtIcons = [...document.querySelectorAll('.heart')];
let favItems = JSON.parse(localStorage.getItem('FAVOURITES')) || [];
for(let i=1; i<=55;i++){
    let heartColor=localStorage.getItem(`heart${i}`);
    if(heartColor===null)
      continue;
    const product=document.querySelector(`.product#id-${i}`);
    const img=product.querySelector('.heart img');
    if(heartColor==="red"){
       img.src = 'Images/red-heart.png';
    }else if(heartColor==="black"){
       img.src='images/black-heart.png';
    }
 }

hrtIcons.forEach(icon => {
    icon.addEventListener('click',(e)=>{
        e.target.src = 'Images/red-heart.png';
        e.preventDefault;
        let targetProduct = e.target.parentElement.parentElement;
        
        const productId = targetProduct.id;
        const price = parseInt(targetProduct.dataset.price);
        const styles = window.getComputedStyle(targetProduct, false);
        const type=targetProduct.dataset.type;
        const bgImgUrl = styles.backgroundImage.slice(4, -1).replace(/"/g, "");

        const newItem ={
            productId,
            bgImgUrl,
            price,
            type
        };
        const filteredArray=favItems.filter((value)=>{
              return value.productId===newItem.productId;
        });
        if(filteredArray.length===0){
        console.log(filteredArray);
        favItems.push(newItem);
        localStorage.setItem('FAVOURITES', JSON.stringify(favItems));  
        const heartId="heart"+productId.slice(3);
        localStorage.setItem(heartId,"red"); 
        } 
    })
});
 


