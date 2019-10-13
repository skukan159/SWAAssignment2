class DateInterval {

    constructor(fromValue,toValue){

        this.fromValue = fromValue;
        this.toValue = toValue;

    }

    from() {return this.fromValue}
    to() {return this.toValue}

}

module.exports = { DateInterval }