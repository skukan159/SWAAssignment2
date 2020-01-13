import { httpGetWithCallback, groupBy } from "./util.js"
import { executeShowLatestMeasurementOfEachKindForLast5Days, executeShowMinimumTemperatureForLast5Days, 
    executeShowMaximumTemperatureForLast5Days, executeShowTotalPrecipitationForLast5Days, 
    executeShowAverageWindSpeedForLast5Days, executeShowAverageCloudCoverage, 
    executeShowGetDominantWindDirectionForLast5Days, executeShowPredictionsForNext24Hours } from "./generic_presenter.js"

const serverWeatherDataUrl = "http://localhost:8080/data/"
const serverPredictionsUrl = "http://localhost:8080/forecast/"

const showWeatherData = () => {
    httpGetWithCallback(serverWeatherDataUrl, weatherData => {
        const weatherDataGroupsByCityName = groupBy(weatherData, "place")
        Object.keys(weatherDataGroupsByCityName)
            .forEach(groupKey => {
                const weatherDataForACity = weatherDataGroupsByCityName[groupKey]
                executeShowLatestMeasurementOfEachKindForLast5Days(weatherDataForACity)
                executeShowMinimumTemperatureForLast5Days(weatherDataForACity)
                executeShowMaximumTemperatureForLast5Days(weatherDataForACity)
                executeShowTotalPrecipitationForLast5Days(weatherDataForACity, groupKey)
                executeShowAverageWindSpeedForLast5Days(weatherDataForACity, groupKey)
                executeShowAverageCloudCoverage(weatherDataForACity, groupKey)
                executeShowGetDominantWindDirectionForLast5Days(weatherDataForACity, groupKey)
        })
    })

    httpGetWithCallback(serverPredictionsUrl, forecastData => {
        const forecastDataGroupsByCityName = groupBy(forecastData, "place")
        Object.keys(forecastDataGroupsByCityName)
            .forEach(groupKey => executeShowPredictionsForNext24Hours(forecastDataGroupsByCityName[groupKey], groupKey))
    })
}

window.onload = () => showWeatherData()
