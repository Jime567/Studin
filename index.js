
function gatherInput() {
    let idInput = document.getElementById("idInput");
    let passwordInput = document.getElementById("passwordInput");

    let id = idInput.value;
    let password = passwordInput.value;
    if (id === "" || password === "") {
        alert("Cannot be Empty");
    }
    else {
        idInput.value = "";
        passwordInput = "";
        let user = {
            user: id,
            password: password
        }
        localStorage.setItem("user", JSON.stringify(user));
        window.location.replace("/now.html");
    }
}

//sign in button
const signInBtn = document.getElementById("signInButton");
signInBtn.addEventListener("click", function () {
    gatherInput();
});