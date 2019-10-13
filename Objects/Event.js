class Event {
    constructor(timeVal,placeVal){
        this.timeVal = timeVal;
        this.placeVal = placeVal;
    }
    time() { return this.timeVal; } 
    place() { return this.placeVal; } 
}

module.exports = { Event }


