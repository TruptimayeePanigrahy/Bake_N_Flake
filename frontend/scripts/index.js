// first slider
let arr=["https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683001222911.jpg",
         "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683099654921.jpg",
         "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683001250499.jpg",
         "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/5/1683001281271.jpg"
        ]

let val=0;
setInterval(()=>{
let img=document.createElement("img");
img.setAttribute("src",arr[val]);
document.getElementById("slider").innerHTML=null;
document.getElementById("slider").append(img);
val++;
if(val==arr.length) val=0;
},3000);

//small slider
let arr1=["https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/3/1680262854166.jpg",
          "https://assets.winni.in/sf-img/live/visuals/home/desktop/2023/3/1680262854166.jpg"
        ]

let val1=0;
setInterval(()=>{
let img=document.createElement("img");
img.setAttribute("src",arr1[val1]);
document.getElementById("small-slider").innerHTML=null;
document.getElementById("small-slider").append(img);
val1++;
if(val1==arr1.length) val1=0;
},3000);


// search
    let text= document.getElementById("input");
    let search=document.getElementById("search")
     search.addEventListener("click",(e)=>{
      e.preventDefault()
    let SearchInp= text.value;
     if(SearchInp=="cakes"){
        window.location.href="./cake.html"
     }
     else if(SearchInp=="gifts"){
        window.location.href="./gifts.html"
     }
     else if(SearchInp=="flowers"){
        window.location.href="./flowers.html"
     }
     
    });

    //profile name;
    let username=localStorage.getItem("token")
    let welcome=document.getElementById("welcome")
    let user=document.getElementById("user")

    if(username){
      welcome.innerText="Welcome";
      user.innerText=username;
    }

    //profile dropdown
    let dropdown=document.getElementById("dropdown1")
    let login=document.getElementById("menucontent1")
    let logout=document.getElementById("menucontent2")

   if(user.innertext===username){
      dropdown.addEventListener("mouseenter",()=>{
         logout.style.display="block"
      })
   }
    
   let cake=document.getElementById("cake")
   cake.addEventListener("click",()=>{
      window.location.href="./cake.html"
   })