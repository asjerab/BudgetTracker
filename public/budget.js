

document.getElementById("WelcomeTitle").textContent = "Welcome, " + sessionStorage.getItem("username")
document.getElementById("WelcomeTit").textContent = "Welcome, " + sessionStorage.getItem("username")
document.getElementById("openSettings").addEventListener("click", () => {
  document.getElementById("settings").style.display = "block";
});

document.getElementById("closeSettings").addEventListener("click", () => {
  document.getElementById("settings").style.display = "none";
});

document.getElementsByClassName("budgetModalContent")[0].addEventListener("submit", async (e) => {
    e.preventDefault()
    sessionStorage.setItem("budget", document.getElementById("budget").value)
    fetch('setBudget', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: sessionStorage.getItem("username"),
            amount: document.getElementById("budget").value
          })
    })
    
    
    
    window.location.assign("overview.html")
})