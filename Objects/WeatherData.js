const { DataType } = require("./DataType");
const { Event } = require("./Event");

class WeatherData extends Event {
    constructor(valueVal, typeVal, unitVal, dataTypeObj){
        this.valueVal = valueVal;
        this.typeVal = typeVal;
        this.unitVal = unitVal;
        this.dataTypeObj = dataTypeObj;
    }

    value() { return this.valueVal }
    
}

module.exports = { WeatherData }