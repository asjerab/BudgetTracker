if (!sessionStorage.getItem("username") || !sessionStorage.getItem("budget")) {
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
document.getElementById("openNewExpenssesButton").addEventListener("click", () => {
  document.getElementById("NewExpenssesContainer").style.display = "block";
  document.getElementById("expenssesContentWrapperDada").style.display = "none";
});
document.getElementById("CloseNewExpenssesButton").addEventListener("click", () => {
  document.getElementById("NewExpenssesContainer").style.display = "none";
  document.getElementById("expenssesContentWrapperDada").style.display = "block";
});



document.getElementById("niggaTivities").addEventListener("click", async () => {
  let Nigger = document.getElementById("bigNigga")
  let Nigga = document.getElementById("smallNigga")
  if (Nigga.value == "" || Nigger.value == "") {
    alert("Fill in the boxes before i fill you nigger")
    return;
  }
  let response = await fetch("/saveExpense", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      two: Nigga.value,
      one: Nigger.value,
      username: sessionStorage.getItem("username")
    })
  })
  let answer = response.json()
  console.log(answer);

  document.getElementById("NewExpenssesContainer").style.display = "none";
  document.getElementById("expenssesContentWrapperDada").style.display = "block";
  loadExpenses()
})

const loadExpenses = async () => {
  document.getElementsByClassName("expenssesContentWrapper")[0].innerHTML = ""
  let reponse = await fetch("/get/expenses", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: sessionStorage.getItem("username") })

  })
  let data = await reponse.json()
  console.log(data[0]);
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    let div = document.createElement("div")
    let title = document.createElement("p")
    let amount = document.createElement("p")

    div.setAttribute("class", "expenssesContentSubWrapper")
    title.setAttribute("class", "primaryRegular expenssesContentSubWrapperGreyed")
    amount.setAttribute("class", "primaryRegular expenssesContentSubWrapperAmount")


    title.textContent = element.expense
    amount.textContent = `- ${element.amount}kr`
    div.appendChild(title)
    div.appendChild(amount)
    document.getElementsByClassName("expenssesContentWrapper")[0].appendChild(div)

}
}

loadExpenses()