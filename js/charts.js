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
            <div class="play">
                    <svg data-encore-id="icon" role="img" aria-hidden="true" class="e-10860-icon" viewBox="0 0 24 24" style="--encore-icon-height: var(--encore-graphic-size-decorative-base); --encore-icon-width: var(--encore-graphic-size-decorative-base);"><path d="m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606"></path></svg>
                    </div>
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