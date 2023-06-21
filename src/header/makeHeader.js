import moment from "moment";

export async function makeHeader() {

//profile image listener to open pop down
const profileImg = document.getElementById("profileImg");
profileImg.addEventListener("click", function () {
   const dropContent = document.getElementById("dropContent");
   dropContent.style.display = "block";
});

//profile x button
const xBtn = document.getElementById("xBtn");
xBtn.addEventListener("click", function () {
    const dropContent = document.getElementById("dropContent");
    dropContent.style.display = "none";
});

//dropDown hover 
const dropDown = document.getElementById("dropDown");
dropDown.addEventListener("mouseover", function () {
    const dropContent = document.getElementById("dropContent");
    dropContent.style.display = "block";
});
dropDown.addEventListener("mouseout", function () {
    const dropContent = document.getElementById("dropContent");
    dropContent.style.display = "none";
});

//user
async function getUser() {
  const response = await fetch('/user/me', {
      method: 'GET'
  });
  let jaysun = await response.json();
  console.log(jaysun);
  return jaysun.dinID;
}

//set the user 
const userName = await getUser();
const userNameText = document.getElementById("userNameText");
userNameText.innerText = userName;

//sign out button
const signOutButton = document.getElementById("signOutButton");
signOutButton.addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location.replace("/");
});

//change password btn
const changePasswordBtn = document.getElementById("changePassword");
changePasswordBtn.addEventListener("click", function () {
    const currPassword = document.getElementById("currPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    changePassword(currPassword, newPassword);
});
//change password func
async function changePassword(oldPassword, newPassword) {
    let body = {
        dinID: userName,
        password: oldPassword,
        newPassword: newPassword
    }

    const response = await fetch('/auth/changePassword', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if (response.ok) {
        alert("Password Changed Successfully");
        document.getElementById("currPassword").value = "";
        document.getElementById("newPassword").value = "";
    }
    else {
        alert("Incorrect Password");
    }
}
}