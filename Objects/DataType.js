class DataType {
    constructor(typeVal,unitVal){
        this.typeVal = typeVal;
        this.unitVal = unitVal;
    }

    type() { return this.typeVal }
    unit() { return this.unitVal }
}

module.exports = { DataType }