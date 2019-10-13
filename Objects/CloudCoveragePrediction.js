const { WeatherPrediction } = require("./WeatherPrediction");
const { DataType } = require("./DataType");

class CloudCoveragePrediction extends WeatherPrediction {
    constructor(fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Cloud Coverage", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
    }
}

module.exports = { CloudCoveragePrediction }