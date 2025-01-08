function getMonthName(monthNumber) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[monthNumber - 1];
}
const loadMonths = async () => {
    let reponse = await fetch("/get/months", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: localStorage.getItem("username") })
    });
    let months = await reponse.json()
    for (let i = 0; i < months.length; i++) {
        const element = months[i];
        let parts = element.month_year.split('.');
        console.log(getMonthName(parts[0]) + " " + parts[1]);
        let div = document.createElement("div")
        div.setAttribute("class", "flex justify-between items-center bg-[#222] px-5 py-7 rounded-[8px] active:scale-[0.9] duration-150 ease-in-out cursor-pointer")
        div.innerHTML = `
        <nav class="">
          <p class="titleSmall">${parts[1]}</p>
          <p class="greyedText">${getMonthName(parts[0])}</p>
        </nav>
        <h1 class="badges">1000 NOK</h1>`
        document.getElementById("monthHolder").appendChild(div)
    }
}
loadMonths()