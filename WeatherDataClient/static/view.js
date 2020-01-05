function appendWeatherDataRow(table, weatherData) {
    let row = table.insertRow();

    let typeCell = row.insertCell(0)
    let valueCell = row.insertCell(1);
    let unitCell = row.insertCell(2);
    let timeCell = row.insertCell(3);
    let placeCell = row.insertCell(4);

    typeCell.innerHTML = weatherData.type
    valueCell.innerHTML = weatherData.value;
    timeCell.innerHTML = weatherData.time;
    unitCell.innerHTML = weatherData.unit; 
    placeCell.innerHTML = weatherData.place;
}

function appendPredictionToTable(table, weatherPrediction) {
    let row = table.insertRow();

    let fromCell = row.insertCell(0)
    let toCell = row.insertCell(1);
    let detailsCell = row.insertCell(2);
    let typeCell = row.insertCell(3);
    let unitCell = row.insertCell(4);
    let timeCell = row.insertCell(5);
    let placeCell = row.insertCell(6);

    fromCell.innerHTML = weatherPrediction.from
    toCell.innerHTML = weatherPrediction.to;

    if (weatherPrediction["precipitation_types"] !== undefined) {
        detailsCell.innerHTML = weatherPrediction.precipitation_types.join("\n");
    } else if (weatherPrediction["directions"] !== undefined) {
        detailsCell.innerHTML = weatherPrediction.directions.join("\n");
    } else {
        detailsCell.innerHTML = ""
    }
    
    typeCell.innerHTML = weatherPrediction.type; 
    unitCell.innerHTML = weatherPrediction.unit;
    timeCell.innerHTML = weatherPrediction.time;
    placeCell.innerHTML = weatherPrediction.place;
}

export { appendWeatherDataRow, appendPredictionToTable }