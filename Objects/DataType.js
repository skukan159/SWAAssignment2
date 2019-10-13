function DataType(typeVal, unitVal) {
    this.typeVal = typeVal
    this.unitVal = unitVal
}

DataType.prototype.type = function type() { return this.typeVal }
DataType.prototype.unit = function unit() { return this.unitVal }


module.exports = { DataType }