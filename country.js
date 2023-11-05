// New page load
fetchRandomCountry();           // Get random country

// Random button clicked by user
$("#random-button").click(() => fetchRandomCountry());

// Search button clicked by user 
$("#search-button").click(() => {
    // Get country from input
    var country = $("#search-input").val();
    fetchCountry(country);
});

// Fetched country details using specified country name
function fetchCountry(countryName) {
    $.ajax({
        url: "https://restcountries.com/v3.1/name/" + countryName,
        method: "GET",
        success: (response) => getCountryDetails(response[0]),
        // Error
        error: () => { setTimeout(() => {countryNotFoundError()}, 300) }
    });
}

// Fetch a random country + details
function fetchRandomCountry() {
    $("#search-input").val("");     // Clear input
    $.ajax({
        url: "https://restcountries.com/v3.1/all?fields=name",
        method: "GET",
        success: (response) => {
            // Get a random country
            var randomNumber = Math.round(Math.random() * (response.length - 1));    // Random number from 0 to total countries
            country = response[randomNumber]["name"]["common"];                      // Get country name
            fetchCountry(country);
        },
        // Error
        error: () => { setTimeout(() => {countryNotFoundError()}, 300) }
    });
}

// Get details from API response
function getCountryDetails(countryInfo) {
    // Country details
    var countryName = countryInfo["name"]["common"];
    var flagEmoji = countryInfo["flag"];
    var flagSrc = countryInfo["flags"]["png"];
    var flagAlt = countryInfo["flags"]["alt"];
    var capital = countryInfo["capital"];
    var region = countryInfo["region"];
    var population = countryInfo["population"];
    var isUNMember = countryInfo["unMember"];
    var subregion = countryInfo["subregion"];
    var drivingSide = countryInfo["car"]["side"];
    
    // Country name heading
    $("#country-heading").html(countryName + ' <span aria-hidden="true">' + flagEmoji + '</span>');
    
    // Flag image + alt
    $("#country-flag").attr("src", flagSrc);
    $("#country-flag").attr("alt", flagAlt);
    
    // Country details
    $("#country-details").html('The capital of <span class="country-name">COUNTRY</span> is <strong id="country-capital">CAPITAL</strong>. It is located in <strong id="country-region">REGION</strong> (<strong id="country-subregion">SUBREGION</strong>) and it <strong id="country-isUNMember"></strong>. <span class="country-name">COUNTRY</span> has a population of <strong id="country-population">POPULATION</strong> people and they drive on the <strong id="country-drivingSide"></strong> side of the road.');
    $(".country-name").text(countryName);
    $("#country-capital").text(capital);
    $("#country-region").text(region);
    $("#country-subregion").text(subregion);
    if (isUNMember)
        $("#country-isUNMember").text("is a UN member");
    else
        $("#country-isUNMember").text("is not a UN member");
    $("#country-population").text(population.toLocaleString("en-US"));
    $("#country-drivingSide").text(drivingSide);
}

// Country wasn't found error
function countryNotFoundError() {
    // Heading and details showing error
    $("#country-heading").text("Oh-Oh :(");
    $("#country-details").text("Country wasn't found");

    // Flag image + alt
    $("#country-flag").attr("src", "./assets/images/sad-face.png");
    $("#country-flag").attr("alt", "Sideways sad face");
}