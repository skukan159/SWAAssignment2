const { WeatherPrediction } = require("./WeatherPrediction");
const { DataType } = require("./DataType");

class TemperaturePrediction extends WeatherPrediction {
    constructor(fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Temperature", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
    }

    convertToF() { 
        if (this.type().toLowerCase() != "fahrenheit"){
            this.fromVal = (this.fromVal * 9/5) + 32; 
            this.toVal = (this.toVal * 9/5) + 32; 
            this.dataTypeObj = new DataType(this.dataTypeObj.type(), "Fahrenheit"); 
        }
    }

    convertToC() { 
        if (this.unit().toLowerCase() != "celsius")
        {
            this.fromVal = (this.fromVal - 32) * 5 / 9; 
            this.toVal = (this.toVal - 32) * 5 / 9;
            this.dataTypeObj = new DataType(this.dataTypeObj.type(), "Celsius");
        }
    }

    unit(){
         return this.dataTypeObj.unit()
    }

    type(){
        return this.dataTypeObj.unit()
    }
}

module.exports = { TemperaturePrediction }