const email=document.getElementById("email")
const password=document.getElementById("password")
const loginBtn=document.getElementById("loginBtn")

function validate(){

if(email.value.trim()!=="" && password.value.trim()!==""){
loginBtn.disabled=false
}else{
loginBtn.disabled=true
}

}

email.addEventListener("input",validate)
password.addEventListener("input",validate)