function Event(timeVal, placeVal) {
    this.timeVal = timeVal
    this.placeVal = placeVal
}

Event.prototype.time = function() { return this.timeVal }
Event.prototype.place = function() { return this.placeVal }

module.exports = { Event }
