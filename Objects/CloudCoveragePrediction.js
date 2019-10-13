const { WeatherPrediction } = require("./WeatherPrediction");
class CloudCoveragePrediction extends WeatherPrediction {
    constructor(fromVal, toVal, unitVal, timeVal, placeVal){
        let typeVal = "Cloud Coverage"
        super(fromVal, toVal, typeVal, unitVal, timeVal, placeVal)
    }
}

module.exports = { CloudCoveragePrediction }

