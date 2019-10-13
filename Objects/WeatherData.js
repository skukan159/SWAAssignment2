const { DataType } = require("./DataType");
const { Event } = require("./Event");

class WeatherData extends DataType {
    constructor(valueVal, typeVal, unitVal, eventObj){
        this.valueVal = valueVal;
        this.typeVal = typeVal;
        this.unitVal = unitVal;
        this.eventObj = eventObj;
    }

    value() { return this.valueVal }
    time(){ return this.eventObj.time }
    place() { return this.eventObj.place }
    
}

module.exports = { WeatherData }