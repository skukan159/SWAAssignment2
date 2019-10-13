class WeatherForecast {
    constructor(weatherForecastVal, currentPlaceVal, currentTypeVal, currentPeriodVal) {
        this.weatherForecastVal = weatherForecastVal
        this.currentPlaceVal = currentPlaceVal
        this.currentTypeVal = currentTypeVal
        this.currentPeriodVal = currentPeriodVal
    }

    getCurrentPlace() {
        return this.currentPlaceVal
    }

    setCurrentPlace(newCurrentPlace) {
        this.currentPlaceVal = newCurrentPlace
    }

    clearCurrentPlace() {
        this.currentPlaceVal = ""
    }

    getCurrentType() {
        return this.currentTypeVal
    }

    setCurrentType(newCurrentType) {
        this.currentTypeVal = newCurrentType
    }

    clearCurrentType() {
        this.currentTypeVal = ""
    }

    getCurrentPeriod() {
        return this.currentPeriodVal
    }

    setCurrentPeriod(newCurrentPeriodVal) {
        this.currentPeriodVal = newCurrentPeriodVal
    }

    clearCurrentPeriod() {
        this.currentPeriodVal = ""
    }

    convertToUSUnits() {
        this.weatherForecastVal.forEach((weatherPrediction) => {
            switch (weatherPrediction.type().toLowerCase()) {
                case "temperature":
                    weatherPrediction.convertToF();
                    break;
                case "precipitation":
                    weatherPrediction.convertToInches();
                    break;
                case "wind":
                    convertToMPH();
                default:
                    break;
            }
        })
    }

    convertToInternationalUnits() {
        this.weatherForecastVal.forEach((weatherForecast) => {
            switch (weatherForecast.type().toLowerCase()) {
                case "temperature":
                    weatherForecast.convertToC();
                    break;
                case "precipitation":
                    weatherForecast.convertToMM();
                    break;
                case "wind":
                    convertToMS();
                default:
                    break;
            }
        })
    }

    add(data) {
        if (Object.prototype.toString.call(data) === "[object Array]") {
            data.forEach(weatherDataObj => this.weatherForecastVal.push(weatherDataObj))
            return;
        }
        this.weatherForecastVal.push(data)
    }

    data() {
        let filteredWeatherData = this.weatherForecastVal.filter((weatherDataObj) => {
            if ((weatherDataObj.type() === this.currentTypeVal || this.currentTypeVal  === "")
                && (weatherDataObj.place() === this.currentPlaceVal || this.currentPlaceVal === "")
                && (this.currentPeriodVal.contains(weatherDataObj.time()) === true || this.currentPeriodVal === "")) {
                return weatherDataObj;
            }
        })
        return filteredWeatherData;
    }
}

module.exports = { WeatherForecast }