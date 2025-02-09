if (!localStorage.getItem("username")) {
  window.location.assign("./index.html")
}
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newBudgetButton").addEventListener("click", () => {
    document.getElementById("budgetModal").style.display = "block";
  });

  document.getElementById("closeBudgetModal").addEventListener("click", () => {
    document.getElementById("budgetModal").style.display = "none";
  });

  document.getElementById('setBudgetBtn').addEventListener('click', async (event) => {
    event.preventDefault();

    const amountInput = document.getElementById('budget');
    if (!amountInput) {
      console.error('Budget input is missing');
      return;
    }

    const amount = amountInput.value;
    const username = localStorage.getItem('username');

    try {
      const response = await fetch('/setBudget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, amount }),
      });
      let res = await response.json()


      if (res.message) {
        console.log(res.message);
        localStorage.setItem("budget", amount)
        window.location.href = './overview.html';
        
      } else {
        console.error(res);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});
