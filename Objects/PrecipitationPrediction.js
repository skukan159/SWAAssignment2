const { WeatherPrediction } = require("./WeatherPrediction");
const { DataType } = require("./DataType");

class PrecipitationPrediction extends WeatherPrediction {
    constructor(typesVal,fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Precipitation", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
        this.typesVal = typesVal;
    }

    convertToMM() { 
        if (this.unit().toLowerCase() != "mm") {
            let newFromVal = this.fromVal * 25.4; 
            let newToVal = this.toVal * 25.4; 
            let newDataTypeObj = new DataType(this.dataTypeObj.type(), "MM");
            return new PrecipitationPrediction(this.typesVal, newFromVal, newToVal, this.timeVal, this.placeVal, newDataTypeObj); 
        } 
    }

    convertToInches() { 
        if (this.unit().toLowerCase() != "inches") {
            let newFromVal = this.fromVal / 25.4; 
            let newToVal = this.toVal / 25.4;
            let newDataTypeObj = new DataType(this.dataTypeObj.type(),"Inches")
            return new PrecipitationPrediction(this.typesVal, newFromVal, newToVal, this.timeVal, this.placeVal, newDataTypeObj); 
        }
    }
}

module.exports = { PrecipitationPrediction }
