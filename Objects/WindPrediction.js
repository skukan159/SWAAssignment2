const { WeatherPrediction } = require("./WeatherPrediction");

class WindPrediction extends WeatherPrediction {

    constructor(directionsVal, fromVal, fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Wind", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
        this.directionsVal = directionsVal;
    }

    directions() {
        return this.directionsVal;
    }

    convertToMPH() { 
        if (this.unitVal.toLowerCase() != "mph"){
            this.fromVal = this.fromVal * 2.237; 
            this.toVal = this.toVal * 2.237; 
            this.unitVal = "MPH" 
        } 
    }
    convertToMS() { 
        if (this.unitVal.toLowerCase() != "ms")
        {
            this.fromVal = this.fromVal / 2.237; 
            this.toVal = this.toVal / 2.237;
            this.unitVal = "MS"
        }
 
    }
}

module.exports = { WindPrediction }


