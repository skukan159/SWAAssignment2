const { Event } = require("./Event");

class WeatherPrediction extends Event {
    constructor(fromVal, toVal, timeVal, placeVal, dataTypeObj){
        super(timeVal,placeVal)
        this.fromVal = fromVal;
        this.toVal = toVal;
        this.dataTypeObj = dataTypeObj;
    }

    matches(data) { 
        if (this.dataTypeObj.type().toLowerCase() === data.type().toLowerCase() &&
            this.dataTypeObj.unit().toLowerCase() === data.unit().toLowerCase() &&
            this.timeVal.getDate() === data.time().getDate())
            {
                if (data.value() >= this.fromVal && data.value() <= this.toVal){
                    return true;
                } 
            }
            return false;  
    }

    to() { return this.toVal }
    from() { return this.fromVal }
    type() { return this.dataTypeObj.type() }
    unit() { return this.dataTypeObj.unit() }

}

module.exports = { WeatherPrediction }