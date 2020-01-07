import { showWeatherDataInTable, showPredictionDataInTable, showTextInHtmlElement } from "./view.js"
import { getMinimumTemperatureForLast5Days, getLatestWeatherDataOfEachType,
    getMaximumTemperatureForLast5Days, getTotalPrecipitationForLast5Days,
    getAverageWindSpeedForLast5Days, getAverageCloudCoverageForLast5Days, 
    getDominantWindDirectionForLast5Days } from "./weatherDataFilteringHelpers.js"

const executeShowLatestMeasurementOfEachKindForLast5Days = weatherData => {
    let latestMeasurementsOfEachType = getLatestWeatherDataOfEachType(weatherData)
    let latestPrecipitation = latestMeasurementsOfEachType.latestPrecipitation
    let latestTemperature = latestMeasurementsOfEachType.latestTemperature
    let latestWindSpeed = latestMeasurementsOfEachType.latestWindSpeed
    let latestCloudCoverage = latestMeasurementsOfEachType.latestCloudCoverage

    showWeatherDataInTable("latest_data_table", [ latestPrecipitation, latestTemperature, latestWindSpeed, latestCloudCoverage ])
}

const executeShowMinimumTemperatureForLast5Days = weatherData => {
    let minTemperatureWeatherData = getMinimumTemperatureForLast5Days(weatherData)

    showWeatherDataInTable("min_temperature_table", [ minTemperatureWeatherData ])
}

const executeShowMaximumTemperatureForLast5Days = weatherData => {
    let maxTemperatureWeatherData = getMaximumTemperatureForLast5Days(weatherData)

    showWeatherDataInTable("max_temperature_table", [ maxTemperatureWeatherData ])
}

const executeShowTotalPrecipitationForLast5Days = (weatherData, cityName) => {
    let totalPrecipitation = getTotalPrecipitationForLast5Days(weatherData)

    showTextInHtmlElement("base", `<h1>Total precipitation within the last 5 days in ${cityName}: ${totalPrecipitation.toFixed(1)} mm</h1>`)
}

const executeShowAverageWindSpeedForLast5Days = (weatherData, cityName) => {
    let averageWindSpeed = getAverageWindSpeedForLast5Days(weatherData)

    showTextInHtmlElement("base", `<h1>Average wind speed within the last 5 days in ${cityName}: ${averageWindSpeed.toFixed(1)} m/s</h1>`)
}

const executeShowAverageCloudCoverage = (weatherData, cityName) => {
    let averageCloudCoverage = getAverageCloudCoverageForLast5Days(weatherData)

    showTextInHtmlElement("base", `<h1>Average cloud coverage within the last 5 days in ${cityName}: ${averageCloudCoverage.toFixed(1)} %</h1>`)
}

const executeShowGetDominantWindDirectionForLast5Days = (weatherData, cityName) => {
    let mostDominantWindDirection = getDominantWindDirectionForLast5Days(weatherData)

    showTextInHtmlElement("base", `<h1>Most dominant wind direction within the last 5 days in ${cityName}: ${mostDominantWindDirection}</h1>`)
}

const executeShowPredictionsForNext24Hours = (predictionData, cityName) => {
    if (cityName === "Aarhus") {
        showPredictionDataInTable("aarhus_hourly_predictions_table", predictionData)
    } else if (cityName === "Copenhagen") {
        showPredictionDataInTable("copenhagen_hourly_predictions_table", predictionData)
    } else if (cityName === "Horsens") {
        showPredictionDataInTable("horsens_hourly_predictions_table", predictionData)  
    }
}

export { executeShowLatestMeasurementOfEachKindForLast5Days, executeShowMinimumTemperatureForLast5Days, 
    executeShowMaximumTemperatureForLast5Days, executeShowTotalPrecipitationForLast5Days, 
    executeShowAverageWindSpeedForLast5Days, executeShowAverageCloudCoverage, 
    executeShowGetDominantWindDirectionForLast5Days, executeShowPredictionsForNext24Hours }