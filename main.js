
const popButton = document.getElementById("openForm");
popButton.addEventListener("click", function() {
  document.getElementById("createEventPopUp").style.display = "flex";
});
//Pop Up Controls


function closeForm() {
  document.getElementById("myForm").style.display = "none";
} 