import { appendWeatherDataRow, appendPredictionToTable } from "./view.js"
import { getHighestOccuringElement, isFromLast5Days, is, filterLatestWeatherData } from "./weatherDataFilteringHelpers.js"

// 1. All data for the latest measurement of each kind
function showLatestMeasurementOfEachKindForLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Get latest data of each type
            let latestMeasurementsOfEachType = filterLatestWeatherData(weatherData)
            let latestPrecipitation = latestMeasurementsOfEachType.latestPrecipitation
            let latestTemperature = latestMeasurementsOfEachType.latestTemperature
            let latestWindSpeed = latestMeasurementsOfEachType.latestWindSpeed
            let latestCloudCoverage = latestMeasurementsOfEachType.latestCloudCoverage

            // Append to html
            let latestDataTable = document.getElementById("latest_data_table");

            appendWeatherDataRow(latestDataTable, latestPrecipitation)
            appendWeatherDataRow(latestDataTable, latestTemperature)
            appendWeatherDataRow(latestDataTable, latestWindSpeed)
            appendWeatherDataRow(latestDataTable, latestCloudCoverage)
        })
        .catch(console.error)
}

// 2. Minimum temperature for the last 5 day
function showMinimumTemperatureForLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Find min temperature weather data within last 5 days 
            let temperatureFromLast5Days = weatherData.filter(wd => is(wd, "temperature") && isFromLast5Days(wd))
            let weatherDataWithMaxTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
                let t1 = pre["value"]
                let t2 = cur["value"]

                return t1 < t2 ? pre : cur
            })

            // Append to html
            let minTemperatureTable = document.getElementById("min_temperature_table");
            appendWeatherDataRow(minTemperatureTable, weatherDataWithMaxTemperature)
        })
        .catch(console.error)
}

// 3. Maximum temperature for the last 5 days
function showMaximumTemperatureForLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Find max temperature within last 5 days
            let temperatureFromLast5Days = weatherData.filter(wd => is(wd, "temperature") && isFromLast5Days(wd))
            let weatherDataWithMaxTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
                let t1 = pre["value"]
                let t2 = cur["value"]

                return t1 > t2 ? pre : cur
            })

            // Append to html
            let maxTemperatureTable = document.getElementById("max_temperature_table");
            appendWeatherDataRow(maxTemperatureTable, weatherDataWithMaxTemperature)
        })
        .catch(console.error)
}

// 4. Total precipitation for the last 5 days
function showTotalPrecipitationForLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Calculate total precipitaiton
            let totalPrecipitation = weatherData.filter(wd => is(wd, "precipitation") && isFromLast5Days(wd))
                                                .map(wd => wd["value"])
                                                .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)

            // Append to html
            let totalPrecipitationDiv = document.getElementById("base")
            totalPrecipitationDiv.innerHTML += `<h1>Total precipitation within the last 5 days in ${cityName}: ${totalPrecipitation.toFixed(1)} mm</h1>`
        })
        .catch(console.error)
}

// 5. Average wind speed for the last 5 days
function showAverageWindSpeedForLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Calculate average wind speed
            let averageWindSpeed = weatherData.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                              .map(wd => wd["value"])
                                              .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherData.length

            // Append to html
            let averageWindSpeedDiv = document.getElementById("base")
            averageWindSpeedDiv.innerHTML += `<h1>Average wind speed within the last 5 days in ${cityName}: ${averageWindSpeed.toFixed(1)} m/s</h1>`
        })
        .catch(console.error)
}

// 6. Average cloud coverage for the last 5 days
function showAverageCloudCoverageLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Calculate average cloud coverage
            let averageCloudCoverage = weatherData.filter(wd => is(wd, "cloud coverage") && isFromLast5Days(wd))
                                                  .map(wd => wd["value"])
                                                  .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherData.length

            // Append to html
            let averageCloudCoverageDiv = document.getElementById("base")
            averageCloudCoverageDiv.innerHTML += `<h1>Average cloud coverage within the last 5 days in ${cityName}: ${averageCloudCoverage.toFixed(1)} %</h1>`
        })
        .catch(console.error)
}

// 7. Dominant wind direction for the last 5 days
function showDominantWindDirectionTheLast5Days(cityName) {
    fetch(`http://localhost:8080/data/${cityName}`)
        .then(response => response.json())
        .then(weatherData => {
            // Determine most common wind direction within last 5 days
            let windDirectionsFromLast5Days = weatherData.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                                         .map(wd => wd["direction"])
            let mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
            
            // Append to html
            let mostDominantWindDirectionDiv = document.getElementById("base")
            mostDominantWindDirectionDiv.innerHTML += `<h1>Most dominant wind direction within the last 5 days in ${cityName}: ${mostDominantWindDirection}</h1>` 
        })
        .catch(console.error)
}

// 8. Predictions for next 24 hours
function showPredictionsForNext24Hours(cityName) {
    fetch(`http://localhost:8080/forecast/${cityName}`)
        .then(response => response.json())
        .then(weatherPredictions => {
            let table;

            if (cityName === "Aarhus") {
                table = document.getElementById("aarhus_hourly_predictions_table")
            } else if (cityName === "Copenhagen") {
                table = document.getElementById("copenhagen_hourly_predictions_table")
            } else if (cityName === "Horsens") {
                table = document.getElementById("horsens_hourly_predictions_table")    
            }

            weatherPredictions.forEach(prediction => appendPredictionToTable(table, prediction))
        })
        .catch(console.error)
}

function showWeatherData() {
    showLatestMeasurementOfEachKindForLast5Days("Aarhus")
    showLatestMeasurementOfEachKindForLast5Days("Copenhagen")
    showLatestMeasurementOfEachKindForLast5Days("Horsens")

    showMinimumTemperatureForLast5Days("Aarhus")
    showMinimumTemperatureForLast5Days("Copenhagen")
    showMinimumTemperatureForLast5Days("Horsens")

    showMaximumTemperatureForLast5Days("Aarhus")
    showMaximumTemperatureForLast5Days("Copenhagen")
    showMaximumTemperatureForLast5Days("Horsens")

    showTotalPrecipitationForLast5Days("Aarhus")
    showTotalPrecipitationForLast5Days("Copenhagen")
    showTotalPrecipitationForLast5Days("Horsens")

    showAverageWindSpeedForLast5Days("Aarhus")
    showAverageWindSpeedForLast5Days("Copenhagen")
    showAverageWindSpeedForLast5Days("Horsens")

    showAverageCloudCoverageLast5Days("Aarhus")
    showAverageCloudCoverageLast5Days("Copenhagen")
    showAverageCloudCoverageLast5Days("Horsens")

    showDominantWindDirectionTheLast5Days("Aarhus")
    showDominantWindDirectionTheLast5Days("Copenhagen")
    showDominantWindDirectionTheLast5Days("Horsens")

    showPredictionsForNext24Hours("Aarhus")
    showPredictionsForNext24Hours("Copenhagen")
    showPredictionsForNext24Hours("Horsens")
}

window.onload = function() {
    showWeatherData()
}
