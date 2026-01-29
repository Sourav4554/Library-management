const form=document.querySelector('#form');



const extractFormData=(e)=>{
e.preventDefault()
if(form.children[0].value!==""&&
form.children[1].value!==""&&
form.children[2].value!==""
){
const FormDatas=new FormData(e.target)
const formEntries=Object.fromEntries(FormDatas)
formEntries.quantity=Number(formEntries.quantity)
alert('book adedd to the table')
form.reset()
}else{
alert('please fill all field')
}
}




form.addEventListener('submit',extractFormData)