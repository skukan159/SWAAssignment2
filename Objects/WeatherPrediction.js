const { DataType } = require("./DataType");
const { Event } = require("./Event");

class WeatherPrediction extends Event {
    constructor(fromVal, toVal, timeVal, placeVal, dataTypeObj){
        this.fromVal = fromVal;
        this.toVal = toVal;
        this.timeVal = timeVal;
        this.placeVal = placeVal;
        this.dataTypeObj = dataTypeObj;
    }

    matches(data) { 
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

    to() { return this.toVal }
    from() { return this.fromVal }
    type() { return this.dataTypeObj.type }
    unit() { return this.dataTypeObj.unit }

}

module.exports = { WeatherPrediction }