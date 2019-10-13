const { WeatherData } = require("./WeatherData");

class Precipitation extends WeatherData {
    constructor(precipitationTypeVal,valueVal, unitVal, eventObj){
        let typeVal = "Precipitation";
        super(valueVal, typeVal, unitVal, eventObj);
        this.precipitationTypeVal = precipitationTypeVal;
    }
    
    precipitationType(){ return state.precipitationTypeVal }
    convertToInches() { 
        if(this.unitVal.toLowerCase() != "Inches"){
            this.valueVal = this.valueVal / 25.4; 
            this.unitVal = "Inches"
        }
     }
    convertToMM(){ 
        if(this.unitVal.toLowerCase() != "mm"){
            this.valueVal = this.valueVal * 25.4; 
            this.unitVal = "MM" 
        }
    }
}

module.exports = { Precipitation }