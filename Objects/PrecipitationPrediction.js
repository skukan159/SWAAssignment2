const { WeatherPrediction } = require("./WeatherPrediction");

class PrecipitationPrediction extends WeatherPrediction {

    constructor(typesVal,fromVal, toVal, unitVal ,timeVal, placeVal){
        let typeVal = "Precipitation"
        super(fromVal, toVal, typeVal, unitVal ,timeVal, placeVal);
        this.typesVal = typesVal;
    }


    convertToMM(){ 
        if(this.unitVal.toLowerCase() != "mm"){
            this.fromVal = this.fromVal * 25.4; 
            this.toVal = this.toVal * 25.4; 
            this.unitVal = "MM" 
        } 
    }
    convertToInches(){ 
        if(this.unitVal.toLowerCase() != "inches")
        {
            this.fromVal = this.fromVal / 25.4; 
            this.toVal = this.toVal / 25.4;
            this.unitVal = "Inches"
        }
 
    }
}

module.exports = { PrecipitationPrediction }
