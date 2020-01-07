import { httpGetWithFetch, groupBy } from "./util.js"
import { executeShowLatestMeasurementOfEachKindForLast5Days, executeShowMinimumTemperatureForLast5Days, 
    executeShowMaximumTemperatureForLast5Days, executeShowTotalPrecipitationForLast5Days, 
    executeShowAverageWindSpeedForLast5Days, executeShowAverageCloudCoverage, 
    executeShowGetDominantWindDirectionForLast5Days, executeShowPredictionsForNext24Hours } from "./generic_controller.js"

const serverWeatherDataUrl = "http://localhost:8080/data/"
const serverPredictionsUrl = "http://localhost:8080/forecast/"

const showWeatherData = () => {
    httpGetWithFetch(serverWeatherDataUrl, weatherData => {
        let weatherDataGroupsByCityName = groupBy(weatherData, "place")
        Object.keys(weatherDataGroupsByCityName)
            .forEach(groupKey => {
                let weatherDataForACity = weatherDataGroupsByCityName[groupKey]
                executeShowLatestMeasurementOfEachKindForLast5Days(weatherDataForACity)
                executeShowMinimumTemperatureForLast5Days(weatherDataForACity)
                executeShowMaximumTemperatureForLast5Days(weatherDataForACity)
                executeShowTotalPrecipitationForLast5Days(weatherDataForACity, groupKey)
                executeShowAverageWindSpeedForLast5Days(weatherDataForACity, groupKey)
                executeShowAverageCloudCoverage(weatherDataForACity, groupKey)
                executeShowGetDominantWindDirectionForLast5Days(weatherDataForACity, groupKey)
        })
    })

    httpGetWithFetch(serverPredictionsUrl, weatherPredictionData => {
        let weatherPredictionDataGroupsByCityName = groupBy(weatherPredictionData, "place")
        Object.keys(weatherPredictionDataGroupsByCityName)
            .forEach(groupKey => executeShowPredictionsForNext24Hours(weatherPredictionDataGroupsByCityName[groupKey], groupKey))
    })
}

window.onload = () => showWeatherData()
