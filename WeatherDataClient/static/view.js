const showWeatherDataInTable = (tableId, objects) => {
    const table = document.getElementById(tableId)
    objects.forEach(data => appendWeatherDataRow(table, data))
}

const showPredictionDataInTable = (tableId, objects) => {
    const table = document.getElementById(tableId)
    objects.forEach(data => appendPredictionToTable(table, data))
}

const showTextInHtmlElement = (elementId, html) => {
    const element = document.getElementById(elementId)
    element.innerHTML += html
}

const appendWeatherDataRow = (table, weatherData) => {
    const row = table.insertRow()

    const typeCell = row.insertCell(0)
    const valueCell = row.insertCell(1)
    const unitCell = row.insertCell(2)
    const timeCell = row.insertCell(3)
    const placeCell = row.insertCell(4)

    typeCell.innerHTML = weatherData.type
    valueCell.innerHTML = weatherData.value
    timeCell.innerHTML = weatherData.time
    unitCell.innerHTML = weatherData.unit 
    placeCell.innerHTML = weatherData.place
}

const appendPredictionToTable = (table, weatherPrediction) => {
    const row = table.insertRow()

    const fromCell = row.insertCell(0)
    const toCell = row.insertCell(1)
    const detailsCell = row.insertCell(2)
    const typeCell = row.insertCell(3)
    const unitCell = row.insertCell(4)
    const timeCell = row.insertCell(5)
    const placeCell = row.insertCell(6)

    fromCell.innerHTML = weatherPrediction.from
    toCell.innerHTML = weatherPrediction.to

    if (weatherPrediction["precipitation_types"] !== undefined) {
        detailsCell.innerHTML = weatherPrediction.precipitation_types.join("\n")
    } else if (weatherPrediction["directions"] !== undefined) {
        detailsCell.innerHTML = weatherPrediction.directions.join("\n")
    } else {
        detailsCell.innerHTML = ""
    }
    
    typeCell.innerHTML = weatherPrediction.type
    unitCell.innerHTML = weatherPrediction.unit
    timeCell.innerHTML = weatherPrediction.time
    placeCell.innerHTML = weatherPrediction.place
}

export { showWeatherDataInTable, showPredictionDataInTable, showTextInHtmlElement }