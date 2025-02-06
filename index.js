const inputvalue=document.querySelector("#inputValue");
const maintodoElem=document.querySelector(".todo-elements");

// getting the data from local storage of the browser and converting it into string
const gettodolistfromlocal=()=>{
   return JSON.parse(localStorage.getItem("todoitemvalue"));
        
    };
    // here our data is stored
 let todostorage=gettodolistfromlocal() || [];

// Adding todo-list in the local storage of the browser
 let addremoveditem=(todostorage)=>{
    return localStorage.setItem("todoitemvalue",JSON.stringify(todostorage));
 }

//  creating a new element with a div , li and a delete button and adding the dynamic data from the local storage
 let dynamicdataget=(currElem)=>{
    const divElem=document.createElement('div');
   divElem.classList.add('css_of_elem');
   divElem.innerHTML=`<li>${currElem}</li> <button class="deletebtn">Delete</button>`;
   maintodoElem.append(divElem);
   inputvalue.value="";
 }

// adding the item in the to-do list by getting the input from the input filed
let addtodo=(e)=>{
    e.preventDefault();
    const todolistvalue=inputvalue.value.trim();
// putting a condation that if the data is already avalabile or the input field is empty the data can not be added
    if(!todostorage.includes(todolistvalue) && todolistvalue !==""){
    todostorage.push(todolistvalue);
    localStorage.setItem("todoitemvalue",JSON.stringify(todostorage));
    todostorage= [...new Set(todostorage)];
   dynamicdataget(todolistvalue);
   
   
    }
    inputvalue.value="";
}

// here the data we get from the local storage ,now we a extracting the data and getting indivasul data 
let showtododata=()=>{
    todostorage.forEach((currElem)=>{
        dynamicdataget(currElem);
        
    })
}
showtododata();

// removing of the item with this function
let removeElem=(e)=>{

    let todoremove=e.target;
   let  targeteddata=todoremove.previousElementSibling.innerText.toLowerCase();
   console.log(targeteddata);
   let parentElm=todoremove.parentElement;

     todostorage = todostorage.filter(currtodo => currtodo.toLowerCase() !== targeteddata);
     
//    localStorage.removeItem("todoitemvalue");
   addremoveditem(todostorage);
   parentElm.remove()
   

}
// Adding  the item to the to-do list by clicking
document.querySelector(".btn").addEventListener("click",(e)=>{
    addtodo(e); 
})

// deleting the item from the to-do list  by clicking
maintodoElem.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('deletebtn')){
        removeElem(e);
    }
  
})