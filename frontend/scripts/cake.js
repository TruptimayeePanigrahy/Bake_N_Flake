let Gdata=[];
let parent=document.getElementById("card");
let button=document.getElementById("button-wrapper");
let search=document.getElementById("input");
let filt=document.getElementById("filter");
let btnp=document.getElementById("sortp");
let token=localStorage.getItem("token");
token ? token=token:token="";
let baseURL=`https://handsome-nightshirt-cow.cyclic.app//product/`



fetchandrendercard();

function fetchandrendercard(){
    let url = new URL(window.location.href);
    
    fetch(`${baseURL}${url.search ? url.search:""}`)
    
    .then((res)=>{
        
        return res.json()})
    .then((data)=>{
        Gdata=data.products;
        let totalCount=data["Total"];
       
        showpagination(totalCount,12);
        display(data.products)
        
    })
}

// cart length

let c_size=document.getElementById('c-number')

    fetch(`https://handsome-nightshirt-cow.cyclic.app//cart/`,{
        headers:{'content-type':'application/json',
                 'Authorization':`Bearer ${token}`
    }
    })
    .then(res=>res.json())
    .then((res)=>{
        if(token){
            c_size.innerText=res.length;
        }
       
        
    })


function display(data){
    parent.innerHTML="";
    data.forEach(element => {
        let card=document.createElement('div');
        let img=document.createElement('img')
        img.src=element.image;
        card.append(img);
        child=document.createElement('div');
        let title=document.createElement('h3');
        title.innerText=element.name;
        let price=document.createElement('p');
        price.innerText=element.price;
        
        child.append(card,title,price);
        child.addEventListener("click",()=>{
            localStorage.setItem("detailPage",JSON.stringify(element));
            location.href="detail.html"
        })
        parent.append(child);
    });
}

// search functionality

search.addEventListener("keydown",(e)=>{
    if (e.key == "Enter" && search.value != "") {
        e.preventDefault()
         // Get the current URL
         let url = new URL(window.location.href);
         const searchParams = new URLSearchParams(url.search);

         
         url.searchParams.delete('page');
        searchParams.set('q', search.value);
        searchParams.set('page', 1);
        
         url.search = searchParams.toString();
         url.searchParams.delete('category');
         filt.value=""
         window.history.replaceState(null, '', url.toString());
        fetchandrendercard();
    }
    
})

// filter by category

filt.addEventListener("change",()=>{
    if(filt.value==""){
            // Get the current URL
            let url = new URL(window.location.href);
            const searchParams = new URLSearchParams(url.search);

            
            url.searchParams.delete('page');
            url.searchParams.delete('q');
           
            
           
           searchParams.set('page', 1);
           console.log(searchParams)
            url.search = searchParams.toString();
            url.searchParams.delete('category');
            window.history.replaceState(null, '', url.toString());
            

    fetchandrendercard()
    
    }
    else{
         // Get the current URL
         let url = new URL(window.location.href);
         

        // Set the filter value
        
            const searchParams = new URLSearchParams(url.search);
            

            searchParams.set('category', filt.value);
            searchParams.set('page', 1);

             // Update the URL with the modified search parameters
         url.search = searchParams.toString();
         url.searchParams.delete('q');
         search.value=""
         // Replace the current URL with the updated URL
         window.history.replaceState(null, '', url.toString());
       fetchandrendercard()
    }
});   

// filter by price

btnp.addEventListener("click",()=>{
    if(btnp.value=="asc"){
        Gdata.sort(function(a,b){return a.price-b.price});
        display(Gdata)
    }
    else if(btnp.value=="desc"){
        Gdata.sort(function(a,b){return b.price-a.price});
        display(Gdata)
    }
   
})

// pagination

function showpagination(totalitems,x){
    const totalpages=Math.ceil(totalitems/x);
    //console.log(totalpages)
    function renderbutton(){
        let arr=[];
        for(let i=0;i<totalpages;i++){
             arr.push(getbuttons(i+1,i+1));
             
        }
       // console.log(arr)
        return arr.join("")
    }
    button.innerHTML=`
       ${ renderbutton()}`

    let buttonpage=document.querySelectorAll(".button-data");
    
    for(let x of buttonpage){
        x.addEventListener("click",(e)=>{
            let dataid=e.target.dataset.id;
            id=dataid;
            
            if(filt.value==""){
                  // Get the current URL
         let url = new URL(window.location.href);
         const searchParams = new URLSearchParams(url.search);

         
         url.searchParams.delete('page');
        
         
        
        searchParams.set('page', id);
        
         url.search = searchParams.toString();
         url.searchParams.delete('category');
         window.history.replaceState(null, '', url.toString());
         
            fetchandrendercard()
            }
            else if(filt.value !==""){
                // Get the current URL
         let url = new URL(window.location.href);
         console.log(url)

        // Set the filter value
        
            const searchParams = new URLSearchParams(url.search);
            // let x=queryParamstring.split("&")[1].split("=");
            // console.log("x",x)
            searchParams.set('category', filt.value);
            searchParams.set('page', id);

             // Update the URL with the modified search parameters
         url.search = searchParams.toString();

         // Replace the current URL with the updated URL
         window.history.replaceState(null, '', url.toString());
                fetchandrendercard()
            }
        
            
 })

}
}

// create buttons
function getbuttons(id,text){
    return ` <button data-id=${id} class="button-data">${text}</button>`
}



let username=localStorage.getItem("name")
let welcome=document.getElementById("welcome")
let user=document.getElementById("user")
let btn=document.getElementById("btn")
if(username && token){
  welcome.innerText="Welcome";
  user.innerText=username;
  btn.innerText="Logout"
  
}

if(btn.innerText=="Logout"){
  btn.addEventListener("click",()=>{
     fetch("https://handsome-nightshirt-cow.cyclic.app//users/logout")
     .then(res=>res.json())
     .then((data)=>{
      //  console.log(data)
        alert(data.msg)
        localStorage.clear();
        window.location.href="../html/index.html"
     })
     
    
  })
}
if(btn.innerText=="Signup/Login"){
  btn.addEventListener("click",()=>{
    // localStorage.clear();
     window.location.href="../html/signup.html"
  })
}