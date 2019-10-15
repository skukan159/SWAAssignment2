const { WeatherData } = require("./WeatherData");

class Temperature extends WeatherData {
    constructor(valueVal, unitVal, eventObj){
        let typeVal = "Temperature"
        super(valueVal, typeVal, unitVal, eventObj);
    }
    convertToF(){ 
        if(this.unitVal.toLowerCase() != "fahrenheit"){
            let newValue = (this.valueVal * 9/5) + 32; 
            let newUnit = "Fahrenheit";
            return new Temperature(newValue,newUnit,this.eventObj);
        }
    }
    convertToC(){ 
        if(this.unitVal.toLowerCase() != "celsius"){
            let newValue = (this.valueVal - 32) * 5 / 9; 
            let newUnit = "Celsius"
            return new Temperature(newValue,newUnit,this.eventObj);
        }
    }
}

module.exports = { Temperature }
