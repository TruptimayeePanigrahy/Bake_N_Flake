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