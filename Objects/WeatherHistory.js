class WeatherHistory {
    constructor(weatherDataVals, currentPlaceVal, currentTypeVal, currentPeriodVal) {
        this.weatherDataVals = weatherDataVals;
        this.currentPlaceVal = currentPlaceVal;
        this.currentTypeVal = currentTypeVal;
        this.currentPeriodVal = currentPeriodVal;
    }

    getCurrentPlace() {
        return this.currentPlaceVal;
    }
    setCurrentPlace(newCurrentPlace) {
        this.currentPlaceVal = newCurrentPlace;
    }
    clearCurrentPlace() {
        this.currentPlaceVal = "";
    }
    getCurrentType() {
        return this.currentTypeVal;
    }
    setCurrentType(newCurrentType) {
        this.currentTypeVal = newCurrentType;
    }
    clearCurrentType() {
        this.currentTypeVal = "";
    }

    getCurrentPeriod() {
        return this.currentPeriodVal;
    }
    setCurrentPeriod(newCurrentPeriod) {
        this.currentPeriodVal = newCurrentPeriod;
    }
    clearCurrentPeriod() {
        this.currentPeriodVal = "";
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

    add(data) {
        if (Object.prototype.toString.call(data) === "[object Array]") {
            data.forEach(weatherDataObj => this.weatherDataVals.push(weatherDataObj))
            return;
        }
        this.weatherDataVals.push(data)
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
}

module.exports = { WeatherHistory }