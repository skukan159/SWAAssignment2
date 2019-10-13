class DateInterval {
        constructor(fromValue, toValue) {
            this.fromValue = fromValue
            this.toValue = toValue
    }

    contains(date) {
        return date >= this.fromValue && date <= this.toValue
    }

    from() {
        return this.fromValue
    }

    to() {
        return this.toValue
    }
}

module.exports = { DateInterval }