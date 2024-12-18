if(!sessionStorage.getItem("username") || !sessionStorage.getItem("budget")) {
    window.location.assign("/createBudget")
}
document.getElementById("WelcomeTitle").textContent = "Welcome, " + sessionStorage.getItem("username")
document.getElementById("budgetShowcase").textContent = sessionStorage.getItem("budget") + "kr"

document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.clear()
    window.location.assign("../login")
  });
document.getElementById("openSettings").addEventListener("click", () => {
    document.getElementById("settings").style.display = "block";
  });

  document.getElementById("closeSettings").addEventListener("click", () => {
    document.getElementById("settings").style.display = "none";
  });