let username = document.querySelector("#username");
let password = document.querySelector("#password");
let elMsg = document.querySelector('#feedback');

function checkUser() {

    if (this.value.length < 2) {
        elMsg.textContent = "User name must be longer than two(2) characters";
    } else {
        elMsg.textContent = '';
    }
}

username.addEventListener('blur', checkUser, false);



document.getElementById("submitButton").onclick = function login() {

    if (username.value === "admin" && password.value === "admin") {

        window.location.replace("index.html");


    } else {

        alert("Incorrect user name or Password");

    }

    return false;

}
username.addEventListener("click", checkUser, false);




