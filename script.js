const form=document.querySelector('#form');
const Library=JSON.parse(localStorage.getItem('book')) || []

//function for add data to local storage
const setLocalStorage=(Library)=>{
if(Library.length!==0){
localStorage.setItem('book',JSON.stringify(Library))
}else{
alert('something wrong')
}
}


//function for extract data from form
const extractFormData=(e)=>{
e.preventDefault()
if(form.children[0].value!==""&&
form.children[1].value!==""&&
form.children[2].value!==""
){
const FormDatas=new FormData(e.target)
const formEntries=Object.fromEntries(FormDatas)
formEntries.quantity=Number(formEntries.quantity)
Library.push(formEntries)
setLocalStorage(Library)
form.reset()
}else{
alert('please fill all field')
}
}




form.addEventListener('submit',extractFormData)