const { WeatherData } = require("./WeatherData");

class Wind extends WeatherData {
    constructor(directionVal,valueVal, unitVal, eventObj){
        let typeVal = "Wind"
        super(valueVal, typeVal, unitVal, eventObj);
        this.directionVal = directionVal;
    }
    
    direction() { return this.directionVal }
    convertToMPH() {
        if (this.unitVal.toLowerCase() != "mph") {
            let newValue = this.valueVal * 2.237;
            let newUnit = "MPH"
            return new Wind(this.directionVal, newValue, newUnit, this.eventObj);
        }
    }
    convertToMS() {
        if (this.unitVal.toLowerCase() != "ms") {
            let newValue = this.valueVal / 2.237;
            let newUnit = "MS"
            return new Wind(this.directionVal, newValue, newUnit, this.eventObj);
        }
    }
}

module.exports = { Wind }