function filterLatestWeatherData(weatherDataArray) {
    // First as baseline
    let latestPrecipitation = weatherDataArray.find(weatherData => is(weatherData, "precipitation"))
    let latestTemperature = weatherDataArray.find(weatherData => is(weatherData, "temperature"))
    let latestWindSpeed = weatherDataArray.find(weatherData => is(weatherData, "wind speed"))
    let latestCloudCoverage = weatherDataArray.find(weatherData => is(weatherData, "cloud coverage"))

    // Seperate the data
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

function getHighestOccuringElement(weatherDataArray) {
    if (weatherDataArray.length == 0) {
        return null;
    }

    let occuranceMap = { };
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

function getDaysBetween(d1, d2) {
    let diff = Math.abs(d1.getTime() - d2.getTime());
    return diff / (1000 * 60 * 60 * 24);
};

function isFromLast5Days(weatherData) {
    let now = new Date()
    let weatherDataDate = new Date(weatherData.time)
    let daysBetween = getDaysBetween(now, weatherDataDate)
    return daysBetween <= 5
}

function is(weatherData, type) {
    return weatherData["type"] === type
}

export { getHighestOccuringElement, getDaysBetween, isFromLast5Days, is, filterLatestWeatherData }