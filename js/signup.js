let fName = document.querySelector("#fName");
let lName = document.querySelector("#lName");
let email = document.querySelector("#email");
let password = document.querySelector("#pwd");
let sginupBtn = document.querySelector("#signup");

sginupBtn.addEventListener("click" , function (e){
    e.preventDefault();
    if( fName.value === "" || lName.value === "" || email.value === "" || password.value === ""){
        alert("please fill all the fields");
    } else {
        localStorage.setItem("fName" , fName.value);
        localStorage.setItem("lName" , lName.value);
        localStorage.setItem("password" , password.value);
        localStorage.setItem("email" , email.value);
        alert("accout has successfully created")
        

        setTimeout( () => {
        window.location = "login.html"

        }, 1500
          );

    }
})



