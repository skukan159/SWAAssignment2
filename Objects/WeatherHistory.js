class WeatherHistory {
    constructor(weatherData) {
        this.weatherDataVals = weatherData;
    }

    forPlace(place) {
        return this.weatherDataVals.find(wd => wd.place() == place)
    }

    forType(type) {
        return this.weatherDataVals.find(wd => wd.type() == type)    
    }

    forPeriod(period) {
        return this.weatherDataVals.find(wd => period.contains(wd.date()))           
    }

    including(data) {
        return data.concat(this.weatherDataVals)
    }

    convertToUSUnits() {
        this.weatherDataVals.forEach((weatherData) => {
            switch (weatherData.type().toLowerCase()) {
                case "temperature":
                    weatherData.convertToF();
                    break;
                case "precipitation":
                    weatherData.convertToInches();
                    break;
                case "wind":
                    convertToMPH();
                default:
                    break;
            }
        })
    }

    convertToInternationalUnits() {
        this.weatherDataVals.forEach((weatherData) => {
            switch (weatherData.type().toLowerCase()) {
                case "temperature":
                    weatherData.convertToC();
                    break;
                case "precipitation":
                    weatherData.convertToMM();
                    break;
                case "wind":
                    convertToMS();
                default:
                    break;
            }
        })
    }


    data() {
        let filteredWeatherData = this.weatherDataVals.filter((weatherDataObj) => {
            if ((weatherDataObj.type() === this.currentTypeVal || this.currentTypeVal === "")
                && (weatherDataObj.place() === this.currentPlaceVal || this.currentPlaceVal === "")
                && (this.currentPeriodVal.contains(weatherDataObj.time()) === true || this.currentPeriodVal === "")) {
                return weatherDataObj;
            }
        })
        return filteredWeatherData;
    }

    lowestValue() {
        if (weatherDataVals === undefined || weatherDataVals.length == 0) {
            return undefined
        }

        if (weatherDataVals.some(wd => wd.type() != weatherDataVals[0].type())) {
            // Not all weather data types are the same
            return undefined    
        }

        let weatherDataValues = this.weatherDataVals.map(wd => wd.value())
        return Math.min(...weatherDataValues)
    }

    data() {
        return this.weatherDataVals
    }
}

module.exports = { WeatherHistory }