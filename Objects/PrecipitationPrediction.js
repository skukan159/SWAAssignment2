const { WeatherPrediction } = require("./WeatherPrediction");


class PrecipitationPrediction extends WeatherPrediction {

    constructor(typesVal,fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Precipitation", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
        this.typesVal = typesVal;
    }


    convertToMM() { 
        if (this.unitVal.toLowerCase() != "mm"){
            this.fromVal = this.fromVal * 25.4; 
            this.toVal = this.toVal * 25.4; 
            this.unitVal = "MM" 
        } 
    }
    convertToInches() { 
        if(this.unitVal.toLowerCase() != "inches")
        {
            this.fromVal = this.fromVal / 25.4; 
            this.toVal = this.toVal / 25.4;
            this.unitVal = "Inches"
        }
    }
}

module.exports = { PrecipitationPrediction }
