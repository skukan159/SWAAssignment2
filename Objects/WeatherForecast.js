class WeatherForecast {

    constructor(data) {
        this.weatherForecastVals = data
    }

    forPlace(place) {
        return this.weatherForecastVals.find(wp => wp.place() == place)
    }

    forType(type) {
        return this.weatherForecastVals.find(wp => wp.type() == type)    
    }

    forPeriod(period) {
        return this.weatherForecastVals.find(wp => period.contains(wp.date()))           
    }

    including(data) {
        return data.concat(this.weatherForecastVals)
    }

    convertToUSUnits() {
        this.weatherForecastVals.forEach((weatherPrediction) => {
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
        this.weatherForecastVals.forEach((weatherForecast) => {
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

    averageFromValue() {
        if (weatherForecastVals === undefined || weatherForecastVals.length == 0) {
            return undefined
        }

        let weatherPredictionFromValues = this.weatherDataVals.map(wp => wp.from())
        return weatherPredictionFromValues.reduce(( p, c) => p + c, 0 ) / weatherPredictionFromValues.length;
    }

    averageToValue() {
        if (weatherForecastVals === undefined || weatherForecastVals.length == 0) {
            return undefined
        }

        let weatherPredictionFromValues = this.weatherDataVals.map(wp => wp.to())
        return weatherPredictionFromValues.reduce((p, c) => p + c, 0) / weatherPredictionFromValues.length; 
    }

    data() {
        return this.weatherForecastVals
    }
}

module.exports = { WeatherForecast }