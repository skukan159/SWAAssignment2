class WeatherHistory {
    constructor(weatherData) {
        this.weatherDataVals = weatherData;
    }

    forPlace(place) {
        let newWeatherData = this.weatherDataVals.filter(wd => wd.place() == place)
        return new WeatherHistory(newWeatherData);
    }
 
    forType(type) {
        let newWeatherData = this.weatherDataVals.filter(wd => wd.type() == type)
        return new WeatherHistory(newWeatherData);
    }

    forPeriod(period) {
        let newWeatherData = this.weatherDataVals.filter(wd => period.contains(wd.time()))
        return new WeatherHistory(newWeatherData);          
    }

    including(data) {
        let newWeatherData = this.weatherDataVals.concat(data);
        return new WeatherHistory(newWeatherData);
    }

    convertToUSUnits() {
        let newWeatherDataVals = this.weatherDataVals.map((weatherData) => {
            let newWeatherData;
            switch (weatherData.type().toLowerCase()) {
                case "temperature":
                    newWeatherData = weatherData.convertToF();
                    break;
                case "precipitation":
                    newWeatherData = weatherData.convertToInches();
                    break;
                case "wind":
                    newWeatherData = weatherData.convertToMPH();
                default:
                    break;
            }
            return newWeatherData
        })
        return new WeatherHistory(newWeatherDataVals);
    }

    convertToInternationalUnits() {
        let newWeatherDataVals = this.weatherDataVals.map((weatherData) => {
            let newWeatherData;
            switch (weatherData.type().toLowerCase()) {
                case "temperature":
                    newWeatherData = weatherData.convertToC();
                    break;
                case "precipitation":
                    newWeatherData = weatherData.convertToMM();
                    break;
                case "wind":
                    newWeatherData = weatherData.convertToMS();
                default:
                    break;
            }
            return newWeatherData;
        })
        return new WeatherHistory(newWeatherDataVals);
    }

    lowestValue() {
        if (this.weatherDataVals === undefined || this.weatherDataVals.length == 0) {
            return undefined
        }

        if (this.weatherDataVals.some(wd => wd.type() != this.weatherDataVals[0].type())) {
            // Not all weather data types are the same
            return undefined    
        }

        let weatherDataValues = this.weatherDataVals.map(wd => wd.value())
        return Math.min(...weatherDataValues)
    }

    data() { 
        return this.weatherDataVals; 
    }
}

module.exports = { WeatherHistory }