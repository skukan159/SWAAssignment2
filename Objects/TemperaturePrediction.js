const { WeatherPrediction } = require("./WeatherPrediction");

class TemperaturePrediction extends WeatherPrediction {
    constructor(fromVal, toVal, unitVal ,timeVal, placeVal){
        let typeVal = "Temperature"
        super(fromVal, toVal, typeVal, unitVal ,timeVal, placeVal);
    }
    convertToF(){ 
        if(this.unitVal.toLowerCase() != "fahrenheit"){
            this.fromVal = (this.fromVal * 9/5) + 32; 
            this.toVal = (this.toVal * 9/5) + 32; 
            this.unitVal = "Fahrenheit" 
        }

    }
    convertToC(){ 
        if(this.unitVal.toLowerCase() != "celsius")
        {
            this.fromVal = (this.fromVal - 32) * 5 / 9; 
            this.toVal = (this.toVal - 32) * 5 / 9;
            this.unitVal = "Celsius"
        }
 
    }
}

module.exports = { TemperaturePrediction }