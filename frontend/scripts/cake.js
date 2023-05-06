let Gdata=[];
let parent=document.getElementById("card")


fetch("http://localhost:8080/product/")
.then(res=>res.json())
.then((data)=>{
    Gdata=data;
    display(data)
    console.log(data)
})

function display(data){
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
        parent.append(child);
    });
}