const { WeatherData } = require("./WeatherData");

class CloudCoverage extends WeatherData {
    constructor(valueVal, unitVal, eventObj){
        let typeVal = "Cloud Coverage"
        super(valueVal, typeVal, unitVal, eventObj);
    }
}

module.exports = { CloudCoverage }