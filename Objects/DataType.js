class DataType {

    constructor(timeVal,unitVal){

        this.timeVal = timeVal;
        this.unitVal = unitVal;

    }

    time() {return this.timeVal}
    unit() {return this.unitVal}

}

module.exports = { DataType }