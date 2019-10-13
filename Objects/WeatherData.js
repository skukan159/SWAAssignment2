const { DataType } = require("./DataType");
const { Event } = require("./Event");

function WeatherData(valueVal, typeVal, unitVal, timeVal, placeVal) {
    Event.call(this, timeVal, placeVal)
    DataType.call(this, typeVal, unitVal)
    this.valueVal = valueVal;
}

WeatherData.prototype.value = function value() { return this.valueVal }
Object.assign(WeatherData.prototype, DataType.prototype, Event.prototype)


module.exports = { WeatherData }