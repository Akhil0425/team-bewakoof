import navbar from "../../pcomponents/nav.js"
import footer from "../../pcomponents/foot.js"
document.getElementById("onlynav").innerHTML=navbar();
document.getElementById("container-footer").innerHTML=footer();

let isLogined = localStorage.getItem("isLogined") || false;
    if (isLogined) {
        document.getElementById("showDetails").innerHTML = `<i class="fa-solid fa-user"></i>`;
        document.getElementById("userDetails").style.display = "block";
        document.getElementById("userName").innerText = `hi, ${localStorage.getItem("userName")}`
    } else {
        document.getElementById("showDetails").innerHTML = "Login";
        document.getElementById("userDetails").style.display = "none";
    }
    let userName = localStorage.getItem("userName");
    document.getElementById("userName").innerHTML = `Hi, ${userName}`;
    document.getElementById("toggleBtn").addEventListener("click", showNavbar);
    let flagForNavbar = true;
    function showNavbar() {
        if (flagForNavbar) {
            document.getElementById("sideNavbar").style.display = "none";
            flagForNavbar = false;
        } else {
            document.getElementById("sideNavbar").style.display = "block";
            document.getElementById("spectsPic").style.display = "none";
            document.getElementById("toggleBtn").style.display = "none";
            flagForNavbar = true;
        }
    }

document.getElementById("showwishimage").addEventListener("click" , () => {
    location.href ="../wishlistPagenew/wishlist.html";
})
document.getElementById("showcartimage").addEventListener("click" , () =>{
    location.href= "../../cartAndCheckout/cart.html";
})

let modelName=localStorage.getItem("search_cover");
document.getElementById("phonemodelname").style.textTransform="capitalize";
        document.getElementById("phonemodelname").innerText=modelName;
        
document.getElementById("nav2").innerHTML=`Home / Mobile Cover / ${modelName}`;
const displaywish=()=>{
    let wishArr=JSON.parse(localStorage.getItem("wishes"))||[];
    if(wishArr.length>0){
      document.getElementById("showwishimage").innerHTML=`<i class="fa-solid fa-heart"></i>`;
  }
  else{
      document.getElementById("showwishimage").innerHTML=`<i class="fa-regular fa-heart"></i>`;
  }
  }
  let wishArr=JSON.parse(localStorage.getItem("wishes"))||[];
  displaywish();
const displycar = ()=>{
    let cartArr=JSON.parse(localStorage.getItem("cart_products"))||[];  
    console.log(cartArr.length)
 if(cartArr.length>0){
    document.getElementById("showcartnumber").style.display="block";
    console.log(cartArr.length)
    document.getElementById("showcartnumber").innerText=cartArr.length;
}
else{
    console.log(cartArr.length)
    document.getElementById("showcartnumber").style.display="none";
}
}
let cartArr=JSON.parse(localStorage.getItem("cart_products"))||[];
displycar()

// https://bewakoof-app.onrender.com/mens

// const url=`https://bewakoof-app.onrender.com/mobile?q=${modelName}`;
// const url=`https://bewakoof-app.onrender.com/mobileCovers?brand=${brandname}&q=${brandModel} `
async function get(url){
    document.getElementById("loadingdiv").style.display="block";
   const res= await fetch(url);
   const data=await res.json();
   console.log(data);
   document.getElementById("loadingdiv").style.display="none";
   return data;
   
}



let check=async ()=>{
    let brandname=localStorage.getItem("search_cover");
let brandModel=localStorage.getItem("search_covermodel");
    if(brandModel!=""){
       return await get(`https://bewakoof-app.onrender.com/mobileCovers?brand=${brandname}&q=${brandModel} `);
    }
    else{
        return await get(`https://bewakoof-app.onrender.com/mobileCovers?brand=${brandname}`);
    }

} 
async  function firstDisplay(){
    
    let data= await check();
   display(data);
}
firstDisplay();
function display(data){
    document.getElementById("container").innerHTML="";
    
        if(data.length===0){
            document.getElementById("container")
           const div=document.createElement("div");
           div.setAttribute("id","sorry");
           const div1=document.createElement("div");
           div1.innerText="Sorry, We couldn't Find any matches!";
           const srybtn=document.createElement("div");
           srybtn.setAttribute("id","sorrybtn");
           srybtn.innerText="Go Back";
           srybtn.addEventListener("click",()=>{
            location.href="../coversearchnew/mobilecovers.html"
           })
           div.append(div1,srybtn);
           document.getElementById("container").append(div);
            document.getElementById("container").style.display="block";
        }
    else{
    data.map((el)=>{
        const card=document.createElement("div");
        const imgDiv=document.createElement("div");
        const img=document.createElement("img");
        img.src=el.image;
        imgDiv.append(img);
        const contentMainDiv = document.createElement("div");
        const contentdiv=document.createElement("div");
        const type=document.createElement("div");
        type.innerText=el.types;
        const name=document.createElement("div");
        name.innerText=el.name;
        const priceDiv=document.createElement("div");
        const price=document.createElement("div");
        price.innerText=`₹${el.price}`;
       
        const strikeOffPrice=document.createElement("div");
        strikeOffPrice.innerText=`₹${el.strikeOffPrice}`;
        priceDiv.append(price,strikeOffPrice);
        const tribeDiv=document.createElement("div");
        const tribePrice= +(el.price)-Math.floor((+(el.price)*15)/100);
        tribeDiv.innerText=`₹${tribePrice} For Tribe Members`
        const cart=document.createElement("div");
        cart.innerHTML=`<button><i class="fa-solid fa-bag-shopping"> Add to bag</i><button>`
        let check=false;
        for(let j=0;j<cartArr.length;j++){
            if(cartArr[j].id==el.id){
                check=true;
                console.log(cartArr[j].id,el.id);
                break;
            }
        }
        if(check){
            cart.innerHTML=`<button><i class="fa-solid fa-bag-shopping"> Added to bag</i><button>` 
        }
        else{
            cart.innerHTML=`<button><i class="fa-solid fa-bag-shopping"> Add to bag</i><button>` 
        }
        cart.addEventListener("click",()=>{
            sendCartdata(el,cart);
        })
        contentdiv.append(type,name,priceDiv);
        const wish=document.createElement("div"); 
        wish.innerHTML=`<i class="fa-regular fa-heart"></i>`
       
        let checkw=false;
    for(let j=0;j<wishArr.length;j++){
     if(wishArr[j].id==el.id){
         checkw=true;
         console.log(wishArr[j].id,el.id);
         break;
     }
 }
 if(checkw){
    wish.innerHTML=`<i class="fa-solid fa-heart"></i>`
 }
 else{
    wish.innerHTML=`<i class="fa-regular fa-heart"></i>`
 }
        wish.addEventListener("click",()=>{          
          showWishes(el,wish);
          if(wishArr.length>0){
            document.getElementById("showwishimage").innerHTML=`<i class="fa-solid fa-heart"></i>`;
        }
        else{
            document.getElementById("showwishimage").innerHTML=`<i class="fa-regular fa-heart"></i>`;
        }
        })
        
        contentMainDiv.append(contentdiv,wish)
        const rating=document.createElement("div");
        rating.innerHTML=`${el.rating}<i class="fa-solid fa-star"></i>`
        rating.setAttribute("id","ratediv");
        card.append(imgDiv,contentMainDiv,tribeDiv,cart,rating);
        imgDiv.addEventListener('click',()=>{
            localStorage.setItem("details",JSON.stringify(el));
            localStorage.setItem("hidden","true");
            localStorage.setItem("page","mobile");
            location.href="../descriptionPagenew/description.html";
        })

        document.getElementById("container").append(card);
    })
}
}



////sort
document.getElementById("sort_price").addEventListener("change", async ()=>{
     console.log(event.target.value);
     let curr=event.target.value;
    
     let data =await check();
   if(curr==="highToLow"){
  
   data.sort((a,b)=>{
    return +(b.price)-(+(a.price))
})
   }
   else if(curr==="lowToHigh"){
    data.sort((a,b)=>{
        return +(a.price)-(+(b.price))
    })
   }
   else{
    return 1;
    
   }
   display(data);
})
function boxShow(data){
    document.getElementById("suggestions").innerHTML="";
    data.map((el)=>{
        const div=document.createElement("div");
        const p=document.createElement("p");
        p.innerText=el.name;
        div.append(p);
        div.addEventListener("click",()=>{
            const flag=el.category;
            const urlfl=`https://bewakoof-app.onrender.com/mobile?q=${flag}`
            document.getElementById("suggestions").innerHTML="";
            get(urlfl);
        })
        document.getElementById("suggestions").append(div);
    })
}
let timerId;
function debounce(fn,delay){
  
  
       if(timerId) {
        clearTimeout(timerId)
       }
       timerId = setTimeout(() => {
        console.log('suggest')
                fn();
              },delay);

}
 async function show(){
    const search=document.getElementById("search_product").value;
    // console.log(search);""
    if(search==""){
        console.log(search);
        document.getElementById("suggestions").innerHTML="";
       }
  else{
    const url=`https://bewakoof-app.onrender.com/mobile?q=${search}&_limit=5`;
    const res=await fetch(url);
    const data= await res.json();
    boxShow(data);
   }
   
}
document.getElementById("search_product").addEventListener("input",()=>{
    debounce(show,300);
})


function  sendCartdata(el,cart){
    cartArr=JSON.parse(localStorage.getItem("cart_products"))||[];
    
    let check=false;
    for(let i=0;i<cartArr.length;i++){
        if(el.id===cartArr[i].id){
            check=true;
            break;
        }
    }
    
   
    if(!check){
        cart.innerHTML=`<button><i class="fa-solid fa-bag-shopping">Added To Bag</i><button>`
        cartArr.push(el);
       localStorage.setItem("cart_products",JSON.stringify(cartArr));
    }
    else{
        cart.innerHTML=`<button><i class="fa-solid fa-bag-shopping">Added To Bag</i><button>`
    }
    // console.log('cart')
    displycar() 
    
}
let tempWish="true";
function showWishes(el,wish){
    wishArr=JSON.parse(localStorage.getItem("wishes"))||[];         
    let length=wishArr.length;
    if(length>0){
       document.getElementById("showwishimage").innerHTML=`<i class="fa-solid fa-heart"></i>`;
    }
    else{
       document.getElementById("showwishimage").innerHTML=`<i class="fa-regular fa-heart"></i>`;
    }
    let check=false;
    for(let i=0;i<length;i++){
        if(el.id===wishArr[i].id){
            check=true;
            break;
        }
    }
    if(check){
    wish.innerHTML=`<i class="fa-regular fa-heart"></i>`;
    wishArr = wishArr.filter((Element)=>{
        return el.id!==Element.id;
    })
    localStorage.setItem("wishes",JSON.stringify(wishArr));
    }
    else{
    
    wish.innerHTML=`<i class="fa-solid fa-heart"></i>`;
    wishArr.push(el);
    localStorage.setItem("wishes",JSON.stringify(wishArr));
    }
    displaywish();
}

show();


