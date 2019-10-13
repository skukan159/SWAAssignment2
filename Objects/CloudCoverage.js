const { WeatherData } = require("./WeatherData");

class CloudCoverage extends WeatherData {
    constructor(valueVal, unitVal ,timeVal, placeVal){
        let typeVal = "Cloud Coverage"
        super(valueVal, typeVal, unitVal ,timeVal, placeVal);
    }
}

module.exports = { CloudCoverage }