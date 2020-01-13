const { WeatherPrediction } = require("./WeatherPrediction");
const { DataType } = require("./DataType");

class TemperaturePrediction extends WeatherPrediction {
    constructor(fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Temperature", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
    }

    convertToF() { 
        if (this.unit().toLowerCase() != "fahrenheit") {
            let newFromVal = (this.fromVal * 9/5) + 32; 
            let newToVal = (this.toVal * 9/5) + 32; 
            let newDataTypeObj = new DataType(this.dataTypeObj.type(), "Fahrenheit");
            return new TemperaturePrediction(newFromVal, newToVal, this.timeVal, this.placeVal, newDataTypeObj); 
        }
    }

    convertToC() { 
        if (this.unit().toLowerCase() != "celsius") {
            let newFromVal = (this.fromVal - 32) * 5 / 9; 
            let newToVal = (this.toVal - 32) * 5 / 9;
            let newDataTypeObj = new DataType(this.dataTypeObj.type(), "Celsius");
            return new TemperaturePrediction(newFromVal, newToVal, this.timeVal, this.placeVal, newDataTypeObj); 
        }
    }
}

module.exports = { TemperaturePrediction }