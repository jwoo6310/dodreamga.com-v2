
// World Map with clickable countries and zoom/pan
document.addEventListener('DOMContentLoaded', function() {
    const width = 1000;
    const height = 500;
    const targetCountries = [
"Philippines", "Thailand", "South Africa", "United Kingdom", 
        "Turkey", "Russia", "Cameroon", "Malaysia", "Japan", 
        "Indonesia", "Myanmar", "Laos", "Vietnam", "Cambodia",
        "United States of America"
    ];
// Create SVG container for the map
    // Create zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    const svg = d3.select("#world-map")
        .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .style("overflow", "hidden")
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("background", "#f8fafc")
        .call(zoom);

    // Create a group for all zoomable elements
    const g = svg.append("g");
// Create a tooltip
    const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden");

    // Load and draw the world map
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json").then(function(world) {
        const countries = topojson.feature(world, world.objects.countries).features;
        // Create a projection with better centering
        const projection = d3.geoMercator()
            .scale(180)
            .center([90, 20])  // Center on Eastern Hemisphere
            .translate([width / 2, height / 2])
            .precision(0.1);
// Create path generator with error handling
        const path = d3.geoPath()
            .projection(projection)
            .pointRadius(2);
        // Draw countries with better error handling
        g.selectAll(".country")
.data(countries)
            .enter()
            .append("path")
            .attr("class", function(d) {
                const baseClass = "country";
                return targetCountries.includes(d.properties.name) ? 
                    `${baseClass} highlighted` : baseClass;
            })
            .attr("d", path)
            .attr("stroke-width", 0.5)
            .attr("stroke", "#fff")
.on("mouseover", function(event, d) {
                if (targetCountries.includes(d.properties.name)) {
                    tooltip.style("visibility", "visible")
                        .text(d.properties.name);
                }
                d3.select(this).classed("hovered", true);
            })
            .on("mousemove", function(event) {
                tooltip.style("top", (event.pageY-10)+"px")
                    .style("left",(event.pageX+10)+"px");
            })
            .on("mouseout", function() {
                tooltip.style("visibility", "hidden");
                d3.select(this).classed("hovered", false);
            })
            .on("click", function(event, d) {
                event.stopPropagation(); // Prevent zoom when clicking countries
                if (targetCountries.includes(d.properties.name)) {
                    showCountryInfo(d.properties.name);
                }
            });

        // Add zoom controls
        const zoomControls = svg.append("g")
            .attr("class", "zoom-controls")
            .attr("transform", `translate(${width - 100}, 20)`);

        zoomControls.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 30)
            .attr("height", 30)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("fill", "#fff")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("click", () => svg.transition().call(zoom.scaleBy, 1.5));

        zoomControls.append("text")
            .attr("x", 15)
            .attr("y", 19)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("fill", "#666")
            .text("+");

        zoomControls.append("rect")
            .attr("x", 40)
            .attr("y", 0)
            .attr("width", 30)
            .attr("height", 30)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("fill", "#fff")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("click", () => svg.transition().call(zoom.scaleBy, 0.75));

        zoomControls.append("text")
            .attr("x", 55)
            .attr("y", 19)
            .attr("text-anchor", "middle")
            .attr("font-size", "20px")
            .attr("fill", "#666")
            .text("−");

        zoomControls.append("rect")
            .attr("x", 80)
            .attr("y", 0)
            .attr("width", 30)
            .attr("height", 30)
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("fill", "#fff")
            .attr("stroke", "#ccc")
            .attr("stroke-width", 1)
            .attr("cursor", "pointer")
            .on("click", () => {
                svg.transition()
                    .duration(750)
                    .call(zoom.transform, d3.zoomIdentity);
            });

        zoomControls.append("text")
            .attr("x", 95)
            .attr("y", 19)
            .attr("text-anchor", "middle")
            .attr("font-size", "14px")
            .attr("fill", "#666")
            .text("⟲");
// Function to show country information
        function showCountryInfo(countryName) {
            const countryInfo = document.getElementById('country-info');
            const countryNameElement = document.getElementById('country-name');
            const countryDescription = document.getElementById('country-description');
            const countryCapital = document.getElementById('country-capital');
            const countryPopulation = document.getElementById('country-population');
            const countryFlag = document.getElementById('country-flag');

            // Sample data - in a real app you would fetch from an API
            const countryData = {
                "Philippines": {
                    capital: "Manila",
                    population: "113.9 million",
                    description: "An archipelago in Southeast Asia known for its beautiful beaches and diverse culture."
                },
                "Thailand": {
                    capital: "Bangkok",
                    population: "69.8 million",
                    description: "Known for its tropical beaches, opulent royal palaces, and ancient ruins."
                },
                "South Africa": {
                    capital: "Pretoria",
                    population: "60.1 million",
                    description: "A country on the southernmost tip of the African continent."
                },
                "United Kingdom": {
                    capital: "London",
                    population: "67.3 million",
                    description: "Includes England, Scotland, Wales and Northern Ireland."
                },
                "Turkey": {
                    capital: "Ankara",
                    population: "84.3 million",
                    description: "Straddles Eastern Europe and Western Asia with cultural connections to ancient Greek, Persian, Roman, Byzantine and Ottoman empires."
                },
                "Russia": {
                    capital: "Moscow",
                    population: "146.2 million",
                    description: "The largest country in the world, spanning Eastern Europe and northern Asia."
                },
                "Cameroon": {
                    capital: "Yaoundé",
                    population: "27.2 million",
                    description: "A Central African country with diverse wildlife and landscapes."
                },
                "Malaysia": {
                    capital: "Kuala Lumpur",
                    population: "32.7 million",
                    description: "A Southeast Asian country occupying parts of the Malay Peninsula and the island of Borneo."
                },
                "Japan": {
                    capital: "Tokyo",
                    population: "125.7 million",
                    description: "An island nation in East Asia known for its ancient traditions and modern technology."
                },
                "Indonesia": {
                    capital: "Jakarta",
                    population: "273.5 million",
                    description: "A Southeast Asian nation made up of thousands of volcanic islands."
                },
                "Myanmar": {
                    capital: "Naypyidaw",
                    population: "54.4 million",
                    description: "Formerly known as Burma, known for its Buddhist temples and diverse ethnic groups."
                },
                "Laos": {
                    capital: "Vientiane",
                    population: "7.4 million",
                    description: "A landlocked country in Southeast Asia known for its mountainous terrain and French colonial architecture."
                },
                "Vietnam": {
                    capital: "Hanoi",
                    population: "97.3 million",
                    description: "A Southeast Asian country known for its beaches, rivers, and bustling cities."
                },
                "Cambodia": {
                    capital: "Phnom Penh",
                    population: "16.7 million",
                    description: "Home to the Angkor Wat temple complex and other historical sites from the Khmer Empire."
                },
                "United States of America": {
                    capital: "Washington, D.C.",
                    population: "331.9 million",
                    description: "A vast country spanning North America with diverse geography and culture."
                }
};

            const data = countryData[countryName] || {};

            countryNameElement.textContent = countryName;
            countryDescription.textContent = data.description || "No description available.";
            countryCapital.textContent = `Capital: ${data.capital || "-"}`;
            countryPopulation.textContent = `Population: ${data.population || "-"}`;
            
            // Set a placeholder for flags (in a real app you would use actual flag images)
            countryFlag.innerHTML = `<div class="text-center">
                <i data-feather="flag" class="w-12 h-12 text-blue-500"></i>
                <p class="mt-2 text-gray-600">Flag of ${countryName}</p>
            </div>`;
            feather.replace();

            countryInfo.classList.remove('hidden');
        }
    });
});