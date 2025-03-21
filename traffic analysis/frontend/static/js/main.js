document.addEventListener("DOMContentLoaded", function () {
    let lights = document.querySelectorAll(".light");
    let statusText = document.getElementById("current-light");
    let trafficContainer = document.querySelector(".traffic-light-container");
    let colors = ["Red", "Yellow", "Green"];
    let bgColors = ["#FF0000", "#FFD700", "#008000"]; // Matching Background Colors
    let index = 0;

    function changeLight() {
        lights.forEach(light => light.classList.remove("active"));
        lights[index].classList.add("active");
        statusText.textContent = colors[index];

        // Change Background Color Based on Light
        trafficContainer.style.backgroundColor = bgColors[index];

        index = (index + 1) % colors.length; // Loop through colors
    }

    setInterval(changeLight, 3000); // Change light every 3 seconds
});