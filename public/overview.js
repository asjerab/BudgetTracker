if (!localStorage.getItem("username") || !localStorage.getItem("budget")) {
  window.location.assign("./createBudget.html")
}

//Setting basic styling
document.getElementById("WelcomeTitle").textContent = "Welcome, " + localStorage.getItem("username")
const today = new Date();
const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const remainingDays = (lastDayOfMonth - today) / (1000 * 60 * 60 * 24);
document.getElementById("daysLeft").innerText = Math.ceil(remainingDays) + ' days left'


document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear()
  window.location.assign("../login")
});
document.getElementById("openSettings").addEventListener("click", () => {
  document.getElementById("settings").style.display = "block";
});

document.getElementById("closeSettings").addEventListener("click", () => {
  document.getElementById("settings").style.display = "none";
});

document.getElementById("openNewExpenssesButton").style.display = "block";

document.getElementById("openNewExpenssesButton").addEventListener("click", () => {
  document.getElementById("NewExpenssesContainer").style.display = "block";
  document.getElementById("expenssesContentWrapperDada").style.display = "none";
  document.getElementById("openNewExpenssesButton").style.display = "none";
});

document.getElementById("CloseNewExpenssesButton").addEventListener("click", () => {
  document.getElementById("NewExpenssesContainer").style.display = "none";
  document.getElementById("expenssesContentWrapperDada").style.display = "block";
  document.getElementById("openNewExpenssesButton").style.display = "block";
  checkNewExpensesContainer();
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
      username: localStorage.getItem("username")
    })
  })
  let answer = response.json()
  console.log(answer);

  document.getElementById("NewExpenssesContainer").style.display = "none";
  document.getElementById("expenssesContentWrapperDada").style.display = "block";
  loadExpenses()
})

const loadExpenses = async () => {
  const expensesWrapper = document.getElementsByClassName("expenssesContentWrapperDada")[0];
  if (!expensesWrapper) {
    console.error("Element with class 'expenssesContentWrapperDada' not found.");
    return;
  }

  expensesWrapper.innerHTML = "";
  let reponse = await fetch("/get/expenses", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: localStorage.getItem("username") })
  });
  let data = await reponse.json();
  console.log(data[0]);
  let budget = localStorage.getItem("budget")
  for (let i = 0; i < data.length; i++) {
    const element = data[i];

    let div = document.createElement("div");
    let title = document.createElement("p");
    let amount = document.createElement("p");
    let expensesChildrenWrapper = document.createElement("div");

    div.setAttribute("class", "expenssesContentSubWrapper");
    title.setAttribute("class", "primaryRegular expenssesContentSubWrapperGreyed");
    amount.setAttribute("class", "primaryRegular expenssesContentSubWrapperAmount");

    expensesChildrenWrapper.setAttribute("class", "primaryRegular expensesChildrenWrapper");
    expensesChildrenWrapper.style.display = "flex";
    expensesChildrenWrapper.style.justifyContent = "space-between";
    expensesChildrenWrapper.style.alignItems = "center";
    expensesChildrenWrapper.style.width = "100%";

    title.textContent = element.expense;
    amount.textContent = `- ${element.amount}kr`;

    expensesChildrenWrapper.appendChild(title);
    expensesChildrenWrapper.appendChild(amount);

    div.appendChild(expensesChildrenWrapper);
    expensesWrapper.appendChild(div);
    budget -= element.amount
  }
  document.getElementById("budgetShowcase").textContent = budget + "kr"
}

const checkNewExpensesContainer = () => {
  const newExpensesContainer = document.getElementById("NewExpenssesContainer");
  const settingsContainer = document.getElementById("settings");
  if (newExpensesContainer.style.display === "block" || settingsContainer.style.display === "block") {
    document.getElementById("openNewExpenssesButton").style.display = "none";
  } else {
    document.getElementById("openNewExpenssesButton").style.display = "block";
  }
};

checkNewExpensesContainer();

loadExpenses()