const { WeatherPrediction } = require("./WeatherPrediction");

class WindPrediction extends WeatherPrediction {

    constructor(fromVal, toVal, directionsVal, unitVal ,timeVal, placeVal){
        let typeVal = "Wind"
        super(fromVal, toVal, typeVal, unitVal ,timeVal, placeVal);
        this.directionsVal = directionsVal;
    }

    directions(){
        return this.directionsVal;
    }

    convertToMPH(){ 
        if(this.unitVal.toLowerCase() != "mph"){
            this.fromVal = this.fromVal * 2.237; 
            this.toVal = this.toVal * 2.237; 
            this.unitVal = "MPH" 
        } 
    }
    convertToMS(){ 
        if(this.unitVal.toLowerCase() != "ms")
        {
            this.fromVal = this.fromVal / 2.237; 
            this.toVal = this.toVal / 2.237;
            this.unitVal = "MS"
        }
 
    }
}

module.exports = { WindPrediction }


