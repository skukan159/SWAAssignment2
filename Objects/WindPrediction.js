const { WeatherPrediction } = require("./WeatherPrediction");
const { DataType } = require("./DataType");

class WindPrediction extends WeatherPrediction {

    constructor(directionsVal, fromVal, toVal, timeVal, placeVal, dataTypeObj){
        let newDataTypeObj = new DataType("Wind", dataTypeObj.unit());
        super(fromVal, toVal, timeVal, placeVal, newDataTypeObj);
        this.directionsVal = directionsVal;
    }

    directions() { return this.directionsVal; }

    convertToMPH() { 
        if (this.unit().toLowerCase() != "mph") {
            let newFromVal = this.fromVal * 2.237; 
            let newToVal = this.toVal * 2.237; 
            let newDataTypeObj = new DataType(this.dataTypeObj.type(),"MPH"); 
            return new WindPrediction(this.directionsVal, newFromVal, newToVal, this.timeVal, this.place, newDataTypeObj) 
        } 
    }
    convertToMS() { 
        if (this.unit().toLowerCase() != "ms") {
            let newFromVal = this.fromVal / 2.237; 
            let newToVal = this.toVal / 2.237;
            let newDataTypeObj = new DataType(this.dataTypeObj.type(),"MS"); 
            return new WindPrediction(this.directionsVal, newFromVal, newToVal, this.timeVal, this.place, newDataTypeObj) 
        }
    }
}

module.exports = { WindPrediction }
