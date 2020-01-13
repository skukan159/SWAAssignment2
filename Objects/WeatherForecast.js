class WeatherForecast {

    constructor(data) {
        this.weatherForecastVals = data
    }

    forPlace(place) {
        let newWeatherForecast = this.weatherForecastVals.filter(wd => wd.place() == place)
        return new WeatherForecast(newWeatherForecast);
    }
 
    forType(type) {
        let newWeatherForecast = this.weatherForecastVals.filter(wd => wd.type() == type)
        return new WeatherForecast(newWeatherForecast);
    }

    forPeriod(period) {
        let newWeatherForecast = this.weatherForecastVals.filter(wd => period.contains(wd.time()))
        return new WeatherForecast(newWeatherForecast);          
    }

    including(data) {
        let newWeatherForecast = this.weatherForecastVals.concat(data);
        return new WeatherForecast(newWeatherForecast);
    }

    convertToUSUnits() {
        let newweatherForecastVals = this.weatherForecastVals.map(weatherForecast => {
            let newWeatherForecast;
            switch (weatherForecast.type().toLowerCase()) {
                case "temperature":
                    newWeatherForecast = weatherForecast.convertToF();
                    break;
                case "precipitation":
                    newWeatherForecast = weatherForecast.convertToInches();
                    break;
                case "wind":
                    newWeatherForecast = weatherForecast.convertToMPH();
                default:
                    break;
            }
            return newWeatherForecast
        })
        return new WeatherForecast(newweatherForecastVals);
    }

    convertToInternationalUnits() {
        let newweatherForecastVals = this.weatherForecastVals.map(weatherForecast => {
            let newWeatherForecast;
            switch (weatherForecast.type().toLowerCase()) {
                case "temperature":
                    newWeatherForecast = weatherForecast.convertToC();
                    break;
                case "precipitation":
                    newWeatherForecast = weatherForecast.convertToMM();
                    break;
                case "wind":
                    newWeatherForecast = weatherForecast.convertToMS();
                default:
                    break;
            }
            return newWeatherForecast;
        })
        return new WeatherForecast(newweatherForecastVals);
    }

    averageFromValue() {
        if (this.weatherForecastVals === undefined || this.weatherForecastVals.length == 0) {
            return undefined
        }

        let weatherPredictionFromValues = this.weatherForecastVals.map(wp => wp.from())
        return this.average(weatherPredictionFromValues)
    }

    averageToValue() {
        if (this.weatherForecastVals === undefined || this.weatherForecastVals.length == 0) {
            return undefined
        }

        let weatherPredictionFromValues = this.weatherForecastVals.map(wp => wp.to())
        return this.average(weatherPredictionFromValues) 
    }

    average(array) {
        return array.reduce((p, c) => p + c, 0) / array.length;
    }

    data() {
        return this.weatherForecastVals
    }
}

module.exports = { WeatherForecast }