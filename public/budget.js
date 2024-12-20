
document.getElementById("newBudgetButton").addEventListener("click", () => {
  document.getElementById("budgetModal").style.display = "block";
});

document.getElementById("closeBudgetModal").addEventListener("click", () => {
  document.getElementById("budgetModal").style.display = "none";
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