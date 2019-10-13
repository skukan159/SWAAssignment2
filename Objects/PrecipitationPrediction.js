const { WeatherPrediction } = require("./WeatherPrediction");
const { DataType } = require("./DataType");

class PrecipitationPrediction extends WeatherPrediction {

    constructor(typesVal,fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Precipitation", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
        this.typesVal = typesVal;
    }


    convertToMM() { 
        if (this.unit().toLowerCase() != "mm"){
            this.fromVal = this.fromVal * 25.4; 
            this.toVal = this.toVal * 25.4; 
            this.dataTypeObj = new DataType(this.dataTypeObj.type(),"MM") 
        } 
    }
    convertToInches() { 
        if (this.unit().toLowerCase() != "inches")
        {
            this.fromVal = this.fromVal / 25.4; 
            this.toVal = this.toVal / 25.4;
            this.dataTypeObj = new DataType(this.dataTypeObj.type(),"Inches")
        }
    }
}

module.exports = { PrecipitationPrediction }
