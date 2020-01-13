const getMinimumTemperatureForLast5Days = weatherData => {
    const temperatureFromLast5Days = weatherData.filter(wd => is(wd, "temperature") && isFromLast5Days(wd))
    const weatherDataWithMaxTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
        const t1 = pre["value"]
        const t2 = cur["value"]

        return t1 < t2 ? pre : cur
    })

    return weatherDataWithMaxTemperature
}

const getMaximumTemperatureForLast5Days = weatherData => {
    const temperatureFromLast5Days = weatherData.filter(wd => is(wd, "temperature") && isFromLast5Days(wd))
    const weatherDataWithMaxTemperature = temperatureFromLast5Days.reduce((pre, cur) => {
        const t1 = pre["value"]
        const t2 = cur["value"]

        return t1 > t2 ? pre : cur
    })

    return weatherDataWithMaxTemperature
}

const getTotalPrecipitationForLast5Days = weatherData => {
    const totalPrecipitation = weatherData.filter(wd => is(wd, "precipitation") && isFromLast5Days(wd))
                                          .map(wd => wd["value"])
                                          .reduce((previousPrecipitation, currentPrecipitation) => previousPrecipitation + currentPrecipitation, 0)
    return totalPrecipitation
}

const getAverageWindSpeedForLast5Days = weatherData => {
    const averageWindSpeed = weatherData.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                        .map(wd => wd["value"])
                                        .reduce((previousWindSpeed, currentWindSpeed) => previousWindSpeed + currentWindSpeed, 0) / weatherData.length

    return averageWindSpeed
}

const getAverageCloudCoverageForLast5Days = weatherData => {
    const averageCloudCoverage = weatherData.filter(wd => is(wd, "cloud coverage") && isFromLast5Days(wd))
                                            .map(wd => wd["value"])
                                            .reduce((previousCloudCoverage, currentCloudCoverage) => previousCloudCoverage + currentCloudCoverage, 0) / weatherData.length

    return averageCloudCoverage
}

const getDominantWindDirectionForLast5Days = weatherData => {
    const windDirectionsFromLast5Days = weatherData.filter(wd => is(wd, "wind speed") && isFromLast5Days(wd))
                                                   .map(wd => wd["direction"])
    const mostDominantWindDirection = getHighestOccuringElement(windDirectionsFromLast5Days)
    return mostDominantWindDirection
}

const getLatestWeatherDataOfEachType = weatherDataArray => {
    // First as baseline
    let latestPrecipitation = weatherDataArray.find(weatherData => is(weatherData, "precipitation"))
    let latestTemperature = weatherDataArray.find(weatherData => is(weatherData, "temperature"))
    let latestWindSpeed = weatherDataArray.find(weatherData => is(weatherData, "wind speed"))
    let latestCloudCoverage = weatherDataArray.find(weatherData => is(weatherData, "cloud coverage"))

    weatherDataArray.forEach(weatherData => {
        if (is(weatherData, "precipitation") && latestPrecipitation.time < weatherData.time) {
            latestPrecipitation = weatherData
        } else if (is(weatherData, "temperature") && latestTemperature.time < weatherData.time) {
            latestTemperature = weatherData
        } else if (is(weatherData, "wind speed") && latestWindSpeed.time < weatherData.time) {
            latestWindSpeed = weatherData
        } else if (is(weatherData, "cloud coverage") && latestCloudCoverage.time < weatherData.time) {
            latestCloudCoverage = weatherData     
        }
    })

    return { latestPrecipitation, latestTemperature, latestWindSpeed, latestCloudCoverage }
} 

const getHighestOccuringElement = weatherDataArray => {
    if (weatherDataArray.length == 0) {
        return null;
    }

    const occuranceMap = { };
    let mostCommonElement = weatherDataArray[0], maxCount = 1;

    for (let i = 0; i < weatherDataArray.length; i++)
    {
        let currentWeatherData = weatherDataArray[i];
    
        if (occuranceMap[currentWeatherData] == null) {
            occuranceMap[currentWeatherData] = 1;
        } else {
            occuranceMap[currentWeatherData]++; 
        }  
        if (occuranceMap[currentWeatherData] > maxCount) {
            mostCommonElement = currentWeatherData;
            maxCount = occuranceMap[currentWeatherData];
        }
    }
    
    return mostCommonElement;
}

const getDaysBetween = (d1, d2) => {
    const diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
}

const isFromLast5Days = weatherData => {
    const now = new Date()
    const weatherDataDate = new Date(weatherData.time)
    const daysBetween = getDaysBetween(now, weatherDataDate)
    return daysBetween <= 5
}

const is = (weatherData, type) => {
    return weatherData["type"] === type
}

export { getHighestOccuringElement, getLatestWeatherDataOfEachType,
    getMinimumTemperatureForLast5Days, getMaximumTemperatureForLast5Days, 
    getTotalPrecipitationForLast5Days, getAverageWindSpeedForLast5Days, 
    getAverageCloudCoverageForLast5Days, getDominantWindDirectionForLast5Days }
