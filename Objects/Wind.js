const { WeatherData } = require("./WeatherData");

class Wind extends WeatherData {
    constructor(directionVal,valueVal, unitVal, eventObj){
        let typeVal = "Wind"
        super(valueVal, typeVal, unitVal, eventObj);
        this.directionVal = directionVal;
    }
    
    direction(){ return this.directionVal }
    convertToMPH() { this.valueVal = this.valueVal * 2.237; this.unitVal = "MPH" }
    convertToMS() { this.valueVal = this.valueVal / 2.237; this.unitVal = "MS" }
}

module.exports = { Wind }