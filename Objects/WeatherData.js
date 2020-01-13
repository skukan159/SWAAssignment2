const { DataType } = require("./DataType");

class WeatherData extends DataType {
    constructor(valueVal, typeVal, unitVal, eventObj) {
        super(typeVal, unitVal);
        this.valueVal = valueVal;
        this.eventObj = eventObj;
    }

    value() { return this.valueVal }
    time() { return this.eventObj.time() }
    place() { return this.eventObj.place() }
    
}

module.exports = { WeatherData }