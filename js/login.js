let fName = document.querySelector("#fName");
let password = document.querySelector("#pwd");
let sginBtn = document.querySelector("#snbtn");

let getfName = localStorage.getItem("fName");
let getPassword = localStorage.getItem("password")

sginBtn.addEventListener( "click" , function(e){

    e.preventDefault();
    if(fName.value === "" || password.value === ""){
        alert("please fill in all fields")
    }else {
        if(
        getfName && getfName.trim() === fName.value.trim() && getPassword && getPassword.trim() === password.value.trim()
    ){
        setTimeout(
            ()=> {
                window.location = "index.html"
            } , 1500
        )

    
        }
    else { alert("email or password is incorrect")}
}
}
)