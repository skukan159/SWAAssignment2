const { WeatherData } = require("./WeatherData");

class Precipitation extends WeatherData {
    constructor(precipitationTypeVal,valueVal, unitVal, eventObj){
        let typeVal = "Precipitation";
        super(valueVal, typeVal, unitVal, eventObj);
        this.precipitationTypeVal = precipitationTypeVal;
    }
    
    precipitationType() { return state.precipitationTypeVal }
    convertToInches() { 
        if (this.unitVal.toLowerCase() != "Inches") {
            let newValue = this.valueVal / 25.4; 
            let newUnit = "Inches"
            return new Precipitation(this.precipitationTypeVal, newValue, newUnit, this.eventObj)
        }
    }
    convertToMM() { 
        if (this.unitVal.toLowerCase() != "mm") {
            let newValue = this.valueVal * 25.4; 
            let newUnit = "MM"
            return new Precipitation(this.precipitationTypeVal, newValue, newUnit, this.eventObj)
        }
    }
}

module.exports = { Precipitation }