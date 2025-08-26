let fName = document.querySelector("#fName");
let reGesteration = document.querySelector("#regstaration");
let cartLinks = document.querySelector(".cart-links");
let logOut = document.querySelector(".log-out");
let userName = document.querySelector(".user-name");

if (localStorage.getItem("fName")){
    reGesteration.remove();
    cartLinks.classList.remove("d-none");
    cartLinks.style.display ="flex"
    userName.innerHTML = "hello, " + localStorage.getItem("fName")
}

logOut.addEventListener("click", () =>{
    localStorage.clear()
    setTimeout( () => {
        window.location = "index.html"
    } ,1500)
})
