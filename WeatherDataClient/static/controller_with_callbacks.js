import { appendWeatherDataRow, appendPredictionToTable } from "./view.js"
import { getHighestOccuringElement, isFromLast5Days, is, filterLatestWeatherData } from "./weatherDataFilteringHelpers.js"

// 1. All data for the latest measurement of each kind
function showLatestMeasurementOfEachKindForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)

        // Find latest precipitation, temperature, wind speed & cloud coverage data
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
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 2. Minimum temperature for the last 5 day
function showMinimumTemperatureForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)

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
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 3. Maximum temperature for the last 5 days
function showMaximumTemperatureForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)

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
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 4. Total precipitation for the last 5 days  
function showTotalPrecipitationForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)

        // Calculate total precipitaiton
        let totalPrecipitation = weatherData.filter(wd => is(wd, "precipitation") && isFromLast5Days(wd))
                                            .map(wd => wd["value"])
                                            .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)

        // Append to html
        let totalPrecipitationDiv = document.getElementById("base")
        totalPrecipitationDiv.innerHTML += `<h1>Total precipitation within the last 5 days in ${cityName}: ${totalPrecipitation.toFixed(1)} mm</h1>`
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 5. Average wind speed for the last 5 days
function showAverageWindSpeedForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)

        // Calculate average wind speed
        let averageWindSpeed = weatherData.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                          .map(wd => wd["value"])
                                          .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherData.length

        // Append to html
        let averageWindSpeedDiv = document.getElementById("base")
        averageWindSpeedDiv.innerHTML += `<h1>Average wind speed within the last 5 days in ${cityName}: ${averageWindSpeed.toFixed(1)} m/s</h1>`
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 6. Average cloud coverage for the last 5 days
function showAverageCloudCoverageForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)
        
        // Calculate average cloud coverage
        let averageCloudCoverage = weatherData.filter(wd => is(wd, "cloud coverage") && isFromLast5Days(wd))
                                              .map(wd => wd["value"])
                                              .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherData.length

        // Append to html
        let averageCloudCoverageDiv = document.getElementById("base")
        averageCloudCoverageDiv.innerHTML += `<h1>Average cloud coverage within the last 5 days in ${cityName}: ${averageCloudCoverage.toFixed(1)} %</h1>`
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 7. Dominant wind direction for the last 5 days
function showDominantWindDirectionForLast5Days(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/data/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)

        // Determine most common wind direction within last 5 days
        let windDirectionsFromLast5Days = weatherData.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                                     .map(wd => wd["direction"])
        let mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
        
        // Append to html
        let mostDominantWindDirectionDiv = document.getElementById("base")
        mostDominantWindDirectionDiv.innerHTML += `<h1>Most dominant wind direction within the last 5 days in ${cityName}: ${mostDominantWindDirection}</h1>`  
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

// 8. Predictions for next 24 hours
function showPredictionsForNext24Hours(cityName) {
    const request = new XMLHttpRequest()
    request.open("GET", `http://localhost:8080/forecast/${cityName}`)
    request.onload = () => {
        if (request.status !== 200) {
            console.log(`Request completed with status code ${request.status} - ${request.statusText}`)
            return;
        }
        
        const weatherData = JSON.parse(request.responseText)
        
        let table;

        if (cityName === "Aarhus") {
            table = document.getElementById("aarhus_hourly_predictions_table")
        } else if (cityName === "Copenhagen") {
            table = document.getElementById("copenhagen_hourly_predictions_table")
        } else if (cityName === "Horsens") {
            table = document.getElementById("horsens_hourly_predictions_table")    
        }

        weatherData.forEach(prediction => appendPredictionToTable(table, prediction))
    }
    request.onerror = (e) => console.error(e) 
    request.send()
}

function initWeatherData() {
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

    showAverageCloudCoverageForLast5Days("Aarhus")
    showAverageCloudCoverageForLast5Days("Copenhagen")
    showAverageCloudCoverageForLast5Days("Horsens")

    showDominantWindDirectionForLast5Days("Aarhus")
    showDominantWindDirectionForLast5Days("Copenhagen")
    showDominantWindDirectionForLast5Days("Horsens")

    showPredictionsForNext24Hours("Aarhus")
    showPredictionsForNext24Hours("Copenhagen")
    showPredictionsForNext24Hours("Horsens")
}

window.onload = function() {
    initWeatherData()
}
