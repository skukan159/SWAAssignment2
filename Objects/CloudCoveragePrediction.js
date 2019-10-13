const { WeatherPrediction } = require("./WeatherPrediction");

class CloudCoveragePrediction extends WeatherPrediction {
    constructor(fromVal, fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Coverage", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
    }
}

module.exports = { CloudCoveragePrediction }