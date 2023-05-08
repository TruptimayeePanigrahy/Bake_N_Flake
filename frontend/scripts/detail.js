let parent=document.getElementById("detail");
let image=document.getElementById("img");
let name=document.getElementById("name");
let detail=document.getElementById("pdetail");
let token=localStorage.getItem("token");
let ele=JSON.parse(localStorage.getItem("detailPage"));
let c_size=document.getElementById('c-number')
const baseURL=`https:localhost:8080`
console.log(ele)
token ? token=token:token="";

let imgc=document.createElement("img");
imgc.src=ele.image
image.append(imgc);
let h1=document.createElement('h2');
h1.innerText=ele.name;
let h3=document.createElement('h3');
h3.innerText=ele.price;
let btncart=document.createElement("button");
btncart.innerText="Add To Cart";
btncart.addEventListener('click',()=>{
    console.log("hi")
    ele.quantity=1;
    fetch(`http://localhost:8080/cart/add`,{
        method:"POST",
        body:JSON.stringify(ele),
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        alert(res.msg);
        fetch(`http://localhost:8080/cart/`,{
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        if(token){
            c_size.innerText=res.length;
        }
       
        console.log(res)
    })
    })
    
})
let btnbuy=document.createElement('button');
btnbuy.innerText="Buy Now"
name.append(h1,h3,btncart,btnbuy)

let hp=document.createElement('h2');
hp.innerText='Products Details';
let flv=document.createElement('p');
flv.innerText=`Flavor:${ele.description.Flavor}`;
let no=document.createElement('p');
no.innerText=`Number of item:${ele.description["Number_of_item"]}`;
let cream=document.createElement('p');
cream.innerText=`Type Of Cream:${ele.description["Type_of_Cream"]}`;
let bread=document.createElement('p');
bread.innerText=`Type of Bread:${ele.description["Type_of_pastry"]}`;

detail.append(hp,flv,no,cream,bread)
