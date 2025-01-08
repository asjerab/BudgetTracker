// Assuming you have a login form submission
document.getElementById("registrerForm").addEventListener('submit', async (e) => {
  e.preventDefault();

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    })
  });


    const userData = await response.json();
    console.log('Logged in user:', userData);
    localStorage.setItem("username", userData.username)
    localStorage.setItem("budget", userData.budget)



    if (userData.budget != null && userData.budget != "NULL") {

      window.location.assign(".././overview.html")

    } else {
      window.location.assign("../createBudget.html")

    }
    // Now you can use userData.username, userData.id, etc.
    // Store it in localStorage, update UI, redirect, etc.

});


