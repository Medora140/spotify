async function loadCharts() {

    try {

        const response = await fetch("/api/charts");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        const chartsContainer =
            document.querySelector("#charts-list");

        chartsContainer.innerHTML = "";

        data.charts_links.forEach(chart => {

            const chartElement =
                document.createElement("article");

            chartElement.classList.add("chart-card");

            chartElement.innerHTML = `
                <img
                    class="chart-image"
                    src="${chart.link}"
                    alt="${chart.title}"
                >

                <p class="chart-bio">
                    ${chart.title}
                </p>
            `;

            chartsContainer.appendChild(chartElement);

        });

    } catch (error) {

        console.error(
            "Failed to load charts",
            error
        );

    }
}

loadCharts();