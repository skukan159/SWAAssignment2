const { DataType } = require("./DataType");
const { Event } = require("./Event");

class WeatherPrediction extends Event {
    constructor(fromVal, toVal, timeVal, placeVal, dataTypeObj){

    }
}

function WeatherPrediction() {
        Event.call(this, timeVal, placeVal)
        DataType.call(this, typeVal, unitVal)
        this.fromVal = fromVal;
        this.toVal = toVal;
}


WeatherPrediction.prototype.matches = function matches(data) 
{ 
    if(this.typeVal.toLowerCase() === data.type().toLowerCase() &&
         this.unitVal.toLowerCase() === data.unit().toLowerCase() &&
         this.timeVal.getDate() === data.time().getDate())
        {
            if(data.value() >= this.fromVal && data.value() <= this.toVal){
                return true;
            } 
        }
        return false;  
}
WeatherPrediction.prototype.to = function to() { return this.toVal }
WeatherPrediction.prototype.from = function from() { return this.fromVal }


Object.assign(WeatherPrediction.prototype, DataType.prototype, Event.prototype)

module.exports = { WeatherPrediction }