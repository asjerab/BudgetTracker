// Assuming you have a login form submission
document.getElementById("registrerForm").addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/registrer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const userData = await response.json();
        console.log(userData);

        window.location.assign("/login")
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
});