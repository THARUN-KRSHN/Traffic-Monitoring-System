document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn").addEventListener("click", function (event) {
        event.preventDefault(); // Stop default link behavior

        console.log("Fetching data from backend..."); // Debugging log

        fetch("http://127.0.0.1:5000/traffic_analysis")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log("Received data:", data); // Debugging log
                document.querySelector(".traffic-monitoring").innerHTML = `
                    <h2>Traffic Data Analysis</h2>
                    <p><strong>Road:</strong> ${data.road}</p>
                    <p><strong>Status:</strong> ${data.status}</p>
                    <p><strong>Vehicles:</strong> ${data.vehicles}</p>
                    <p><strong>Signal:</strong> ${data.signal}</p>
                    <p><strong>Avg Speed:</strong> ${data.avg_speed}</p>
                `;
            })
            .catch(error => {
                console.error("Error fetching traffic data:", error);
                alert("Failed to load traffic data. Check the console for errors.");
            });
    });
});
