const { Event } = require('./Event');
const { DataType } = require('./DataType')
const { DateInterval } = require('./DateInterval')
const { WeatherData } = require('./WeatherData')
const { Temperature } = require('./Temperature')
const { Precipitation } = require('./Precipitation')
const { Wind } = require('./Wind')
const { CloudCoverage } = require('./CloudCoverage')
const { TemperaturePrediction } = require('./TemperaturePrediction')
const { PrecipitationPrediction } = require('./PrecipitationPrediction')
const { WindPrediction } = require('./WindPrediction')
const { CloudCoveragePrediction } = require('./CloudCoveragePrediction')
const { WeatherPrediction } = require('./WeatherPrediction')
const { WeatherHistory } = require('./WeatherHistory')
const { WeatherForecast } = require('./WeatherForecast')


test('Event class tests', () => {
    let date = new Date()
    let event = new Event(date,"Horsens");

    expect(event.time()).toBe(date);
    expect(event.place()).toBe("Horsens");
})

test('DataType class tests', () => {
    let dataType = new DataType("Distance","mm");

    expect(dataType.type()).toBe("Distance");
    expect(dataType.unit()).toBe("mm");
})

test('Date Interval tests', () => {
    let fromDate = new Date();
    fromDate.setFullYear(1996,11,18)
    let toDate = new Date();
    toDate.setFullYear(2000,22,12)

    let dateInterval = new DateInterval(fromDate,toDate);
    expect(dateInterval.from()).toBe(fromDate)
    expect(dateInterval.to()).toBe(toDate)

    let testContainsDate = new Date();
    testContainsDate.setFullYear(1998,18,5);

    expect(dateInterval.contains(testContainsDate)).toBe(true);
    testContainsDate.setFullYear(2002,18,5);
    expect(dateInterval.contains(testContainsDate)).not.toBe(true);
})

test('WeatherData tests', () => {
    let date = new Date();
    let eventObj = new Event(date,"Horsens")
    let weatherData = new WeatherData(10,"Temperature","Celsius",eventObj);

    expect(weatherData.value()).toBe(10);
    expect(weatherData.time()).toBe(date);
    expect(weatherData.place()).toBe("Horsens");
    expect(weatherData.type()).toBe("Temperature");
    expect(weatherData.unit()).toBe("Celsius");
})

test('Temperature tests', () => {
    let date = new Date();
    let eventObj = new Event(date,"Horsens")
    let temperatureData = new Temperature(10,"Celsius",eventObj);

    expect(temperatureData.value()).toBe(10);
    expect(temperatureData.time()).toBe(date);
    expect(temperatureData.place()).toBe("Horsens");
    expect(temperatureData.type()).toBe("Temperature");
    expect(temperatureData.unit()).toBe("Celsius");

    temperatureData = temperatureData.convertToF();
    expect(temperatureData.value()).toBe((10 * 9/5) + 32);
    expect(temperatureData.unit()).toBe("Fahrenheit");

    temperatureData = temperatureData.convertToC();
    expect(temperatureData.value()).toBe(10);
    expect(temperatureData.unit()).toBe("Celsius");
})

test('Precipitation tests', () => {
    let date = new Date();
    let eventObj = new Event(date,"Horsens")
    let precipitation = new Precipitation("samplePrecType",10,"mm",eventObj);

    expect(precipitation.value()).toBe(10);
    expect(precipitation.time()).toBe(date);
    expect(precipitation.place()).toBe("Horsens");
    expect(precipitation.type()).toBe("Precipitation");
    expect(precipitation.unit()).toBe("mm");

    precipitation = precipitation.convertToInches();
    expect(precipitation.value()).toBe(10/25.4);
    expect(precipitation.unit()).toBe("Inches");

    precipitation = precipitation.convertToMM();
    expect(precipitation.value()).toBe(10);
    expect(precipitation.unit()).toBe("MM");
})


test('Wind tests', () => {
    let date = new Date();
    let eventObj = new Event(date,"Horsens")
    let wind = new Wind("NE",10,"MS",eventObj);

    expect(wind.value()).toBe(10);
    expect(wind.time()).toBe(date);
    expect(wind.place()).toBe("Horsens");
    expect(wind.type()).toBe("Wind");
    expect(wind.unit()).toBe("MS");

    wind = wind.convertToMPH();
    expect(wind.value()).toBe(10 * 2.237);
    expect(wind.unit()).toBe("MPH");

    wind = wind.convertToMS();
    expect(wind.value()).toBe(10);
    expect(wind.unit()).toBe("MS");
})

test('CloudCoverage tests', () => {
    let date = new Date();
    let eventObj = new Event(date,"Horsens")
    let cloudCoverage = new CloudCoverage(10,"okta",eventObj);

    expect(cloudCoverage.value()).toBe(10);
    expect(cloudCoverage.time()).toBe(date);
    expect(cloudCoverage.place()).toBe("Horsens");
    expect(cloudCoverage.type()).toBe("Cloud Coverage");
    expect(cloudCoverage.unit()).toBe("okta");
})


test('WeatherPrediction tests', () => {
    let date = new Date();

    let eventObj = new Event(date,"Horsens")
    let eventObj2 = new Event(date,"Vejle")
    let eventObj3 = new Event(date,"Skanderborg")

    let dataObj = new DataType("Temperature","Celsius")

    let  weatherData1 = new WeatherData(10,"Temperature", "Celsius", eventObj);
    let  weatherData2 = new WeatherData(10,"Temperature", "Celsius", eventObj2);
    let  weatherData3 = new WeatherData(4,"Temperature", "Celsius", eventObj3);
    let  weatherData4 = new WeatherData(2,"Temperature", "Celsius", eventObj);

    let weatherPrediction = new WeatherPrediction(5,15,date,"Horsens", dataObj);
    let weatherPrediction2 = new WeatherPrediction(8,15,date,"Horsens", dataObj);

    expect(weatherPrediction.matches(weatherData4)).toBe(false);
    expect(weatherPrediction2.matches(weatherData1)).toBe(true);
    expect(weatherPrediction2.matches(weatherData2)).toBe(true);
    expect(weatherPrediction2.matches(weatherData3)).toBe(false);

    expect(weatherPrediction.to()).toBe(15);
    expect(weatherPrediction2.from()).toBe(8);
    
})

test('Temperature prediction test', () => {
    let date = new Date();

    let dataObj = new DataType("Temperature","Fahrenheit")

    let temperaturePredictionData = new TemperaturePrediction(10,15,date,"Horsens", dataObj);

    temperaturePredictionData = temperaturePredictionData.convertToC();
    expect(temperaturePredictionData.from()).toBe((10-32) * 5 /9);
    expect(temperaturePredictionData.to()).toBe((15-32) * 5 / 9);
    expect(temperaturePredictionData.unit()).toBe("Celsius");
})

test('PrecipitationPrediction test', () => {
    let date = new Date();

    let eventObj = new Event(date,"Horsens")

    let dataObj = new DataType("Precipitation","mm")

    let precipitation1 = new Precipitation("samplePrecType", 7, "mm", eventObj);
    let precipitationTypes = ["type1","type2"]
    let precipitationPrediction = new PrecipitationPrediction(precipitationTypes,5,10, date,"Horsens", dataObj);

    expect(precipitationPrediction.matches(precipitation1)).toBe(true)

    expect(precipitationPrediction.from()).toBe(5);
    expect(precipitationPrediction.time()).toBe(date);
    expect(precipitationPrediction.place()).toBe("Horsens");
    expect(precipitationPrediction.type()).toBe("Precipitation");
    expect(precipitationPrediction.unit()).toBe("mm");

    precipitationPrediction = precipitationPrediction.convertToInches();
    expect(precipitationPrediction.from()).toBe(5/25.4);
    expect(precipitationPrediction.to()).toBe(10/25.4);
    expect(precipitationPrediction.unit()).toBe("Inches");

    precipitationPrediction = precipitationPrediction.convertToMM();
    expect(precipitationPrediction.from()).toBe(5);
    expect(precipitationPrediction.to()).toBe(10);
    expect(precipitationPrediction.unit()).toBe("MM");
})

test('WindPrediction test', () => {
    let date = new Date();

    let eventObj = new Event(date,"Horsens")

    let dataObj = new DataType("Wind","MS")

    let wind1 = new Wind("NE",7,"MS", eventObj);

    let wind = new WindPrediction("NE", 5,10, date,"Horsens", dataObj);

    expect(wind.matches(wind1)).toBe(true);
    expect(wind.from()).toBe(5);
    expect(wind.to()).toBe(10);
    expect(wind.time()).toBe(date);
    expect(wind.place()).toBe("Horsens");
    expect(wind.unit()).toBe("MS");

})

test('CloudCoveragePrediction test', () => {
    let date = new Date();

    let dataObj = new DataType("Precipitation","okta")

    let cloudCoverage = new CloudCoveragePrediction(10,20,date,"Horsens", dataObj);

    expect(cloudCoverage.from()).toBe(10);
    expect(cloudCoverage.to()).toBe(20);
    expect(cloudCoverage.time()).toBe(date);
    expect(cloudCoverage.place()).toBe("Horsens");
    expect(cloudCoverage.type()).toBe("Cloud Coverage");
    expect(cloudCoverage.unit()).toBe("okta");
})

test('WeatherHistory test', () => {
    let fromDate = new Date();
    fromDate.setFullYear(1996, 11, 18)
    let toDate = new Date();
    toDate.setFullYear(2000, 22, 12)
    let dateInterval1 = new DateInterval(fromDate, toDate);

    let fromDate2 = new Date();
    fromDate.setFullYear(1998, 11, 18)
    let toDate2 = new Date();
    toDate.setFullYear(2001, 22, 12)
    let dateInterval2 = new DateInterval(fromDate2, toDate2);

    let eventObj = new Event(fromDate,"Horsens")
    let eventObj2 = new Event(toDate,"Horsens")


    let data1 = new Temperature(10, "Celsius", eventObj);
    let data2 = new Temperature(12, "Celsius", eventObj2);
    let dataArray = [data1, data2];
    let weatherHistory1 = new WeatherHistory(dataArray);

    //for place
    expect(weatherHistory1.forPlace("Horsens").data()).toMatchObject([data1,data2]);

    //for type
    expect(weatherHistory1.forType("Temperature").data()).toMatchObject([data1,data2]);

    //for period
    expect(weatherHistory1.forPeriod(dateInterval1).data()).toMatchObject([data1,data2]);

    
    //Including
    let eventObj3 = new Event(fromDate2,"Vejle")
    let eventObj4 = new Event(toDate2,"Vejle")
    let data3 = new Precipitation("precType",15, "mm",eventObj3)
    let data4 = new Precipitation("precType",20, "mm",eventObj4)
    let addedData = [data3,data4]
    weatherHistory1 = weatherHistory1.including(addedData);
    expect(weatherHistory1.data()).toMatchObject([data1,data2,data3,data4]);
    

    //Unit Conversion
    weatherHistory1 = weatherHistory1.convertToUSUnits();
    expect(weatherHistory1.data()[2].value()).toBe(15 / 25.4);
    expect(weatherHistory1.data()[2].unit()).toBe("Inches");

    weatherHistory1 = weatherHistory1.convertToInternationalUnits();
    expect(weatherHistory1.data()[2].value()).toBe(15);
    expect(weatherHistory1.data()[2].unit()).toBe("MM");

    //Lowest Value
    expect(weatherHistory1.lowestValue()).toBe(undefined);
    expect(weatherHistory1.forPlace("Horsens").lowestValue()).toBe(10);
})


test('WeatherForecast test', () => {
    let fromDate = new Date();
    fromDate.setFullYear(1996, 11, 18)
    let toDate = new Date();
    toDate.setFullYear(2000, 22, 12)
    let dateInterval1 = new DateInterval(fromDate, toDate);

    let fromDate2 = new Date();
    fromDate.setFullYear(1998, 11, 18)
    let toDate2 = new Date();
    toDate.setFullYear(2001, 22, 12)
    let dateInterval2 = new DateInterval(fromDate2, toDate2);

    let eventObj = new Event(fromDate,"Horsens")
    let eventObj2 = new Event(toDate,"Horsens")


    let data1 = new TemperaturePrediction
    (10,20,fromDate,"Horsens",new DataType("Temperature","Celsius"));
    let data2 = new TemperaturePrediction
    (12,22,toDate,"Horsens",new DataType("Temperature","Celsius"));

    let dataArray = [data1, data2];
    let weatherForecast = new WeatherForecast(dataArray);

    //for place
    expect(weatherForecast.forPlace("Horsens").data()).toMatchObject([data1,data2]);

    //for type
    expect(weatherForecast.forType("Temperature").data()).toMatchObject([data1,data2]);

    //for period
    expect(weatherForecast.forPeriod(dateInterval1).data()).toMatchObject([data1,data2]);

    
    //Including
    let eventObj3 = new Event(fromDate2,"Vejle")
    let eventObj4 = new Event(toDate2,"Vejle")
    let data3 = new PrecipitationPrediction
    ("precType",15,25,fromDate2,"Vejle",new DataType("Precipitation","mm"))
    let data4 = new PrecipitationPrediction
    ("precType",20,30,toDate2,"Vejle",new DataType("Precipitation","mm"))
    let addedData = [data3,data4]
    weatherForecast = weatherForecast.including(addedData);
    expect(weatherForecast.data()).toMatchObject([data1,data2,data3,data4]);
    

    //Unit Conversion
    weatherForecast = weatherForecast.convertToUSUnits();
    expect(weatherForecast.data()[2].from()).toBe(15 / 25.4);
    expect(weatherForecast.data()[2].unit()).toBe("Inches");

    weatherForecast = weatherForecast.convertToInternationalUnits();
    expect(weatherForecast.data()[2].from()).toBe(15);
    expect(weatherForecast.data()[2].unit()).toBe("MM");

    //Average from value
    expect(weatherForecast.averageFromValue()).toBe(14.25);
    expect(weatherForecast.forPlace("Horsens").averageToValue()).toBe(21);
    //Average to value
})