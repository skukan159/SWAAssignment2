const { Event } = require('./Event'); //import Event from './Event'
const { DataType } = require('./DataType')//import DataType from './DataType'
const { DateInterval } = require('./DateInterval')//import WeatherData from './WeatherData'
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
const { WeatherForecast } = require('./WeatherForecast')
const { WeatherHistory } = require('./WeatherHistory')

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
    let weatherData = new WeatherData(10,"Temperature","Celsius",date,"Horsens");

    expect(weatherData.value()).toBe(10);
    expect(weatherData.time()).toBe(date);
    expect(weatherData.place()).toBe("Horsens");
    expect(weatherData.type()).toBe("Temperature");
    expect(weatherData.unit()).toBe("Celsius");
})

test('Temperature tests', () => {
    let date = new Date();
    let temperatureData = new Temperature(10,"Celsius",date,"Horsens");

    expect(temperatureData.value()).toBe(10);
    expect(temperatureData.time()).toBe(date);
    expect(temperatureData.place()).toBe("Horsens");
    expect(temperatureData.type()).toBe("Temperature");
    expect(temperatureData.unit()).toBe("Celsius");

    temperatureData.convertToF();
    expect(temperatureData.value()).toBe((10 * 9/5) + 32);
    expect(temperatureData.unit()).toBe("Fahrenheit");

    temperatureData.convertToC();
    expect(temperatureData.value()).toBe(10);
    expect(temperatureData.unit()).toBe("Celsius");
})

test('Precipitation tests', () => {
    let date = new Date();
    let precipitation = new Precipitation("samplePrecType",10,"mm",date,"Horsens");

    expect(precipitation.value()).toBe(10);
    expect(precipitation.time()).toBe(date);
    expect(precipitation.place()).toBe("Horsens");
    expect(precipitation.type()).toBe("Precipitation");
    expect(precipitation.unit()).toBe("mm");

    precipitation.convertToInches();
    expect(precipitation.value()).toBe(10/25.4);
    expect(precipitation.unit()).toBe("Inches");

    precipitation.convertToMM();
    expect(precipitation.value()).toBe(10);
    expect(precipitation.unit()).toBe("MM");
})


test('Wind tests', () => {
    let date = new Date();
    let wind = new Wind("NE",10,"MS",date,"Horsens");

    expect(wind.value()).toBe(10);
    expect(wind.time()).toBe(date);
    expect(wind.place()).toBe("Horsens");
    expect(wind.type()).toBe("Wind");
    expect(wind.unit()).toBe("MS");

    wind.convertToMPH();
    expect(wind.value()).toBe(10 * 2.237);
    expect(wind.unit()).toBe("MPH");

    wind.convertToMS();
    expect(wind.value()).toBe(10);
    expect(wind.unit()).toBe("MS");
})

test('CloudCoverage tests', () => {
    let date = new Date();
    let cloudCoverage = new CloudCoverage(10,"okta",date,"Horsens");

    expect(cloudCoverage.value()).toBe(10);
    expect(cloudCoverage.time()).toBe(date);
    expect(cloudCoverage.place()).toBe("Horsens");
    expect(cloudCoverage.type()).toBe("Cloud Coverage");
    expect(cloudCoverage.unit()).toBe("okta");
})


test('WeatherPrediction tests', () => {
    let date = new Date();

    let  weatherData1 = new WeatherData(10,"Temperature","Celsius",date,"Horsens");
    let  weatherData2 = new WeatherData(10,"Temperature","Celsius",date,"Vejle");
    let  weatherData3 = new WeatherData(4,"Temperature","Celsius",date,"Skanderborg");
    let  weatherData4 = new WeatherData(2,"Temperature","Celsius",date,"Horsens");

    let weatherPrediction = new WeatherPrediction(5,15,"Temperature","Celsius",date,"Horsens");
    let weatherPrediction2 = new WeatherPrediction(8,15,"Temperature","Celsius",date,"Vejle");

    expect(weatherPrediction.matches(weatherData4)).toBe(false);
    expect(weatherPrediction2.matches(weatherData1)).toBe(true);
    expect(weatherPrediction2.matches(weatherData2)).toBe(true);
    expect(weatherPrediction2.matches(weatherData3)).toBe(false);

    expect(weatherPrediction.to()).toBe(15);
    expect(weatherPrediction2.from()).toBe(8);
    
})

test('Temperature prediction test', () => {
    let date = new Date();
    let temperaturePredictionData = new TemperaturePrediction(10,15,"Fahrenheit",date,"Horsens");

        temperaturePredictionData.convertToC();
        expect(temperaturePredictionData.from()).toBe((10-32) * 5 /9);
        expect(temperaturePredictionData.to()).toBe((15-32) * 5 / 9);
        expect(temperaturePredictionData.unit()).toBe("Celsius");
})

test('PrecipitationPrediction test', () => {
    let date = new Date();
    let precipitation1 = new Precipitation("samplePrecType", 7, "mm", date, "Horsens");
    let precipitationTypes = ["type1","type2"]
    let precipitationPrediction = new PrecipitationPrediction(precipitationTypes,5,10,"mm",date,"Horsens");

    expect(precipitationPrediction.matches(precipitation1)).toBe(true)

    expect(precipitationPrediction.from()).toBe(5);
    expect(precipitationPrediction.time()).toBe(date);
    expect(precipitationPrediction.place()).toBe("Horsens");
    expect(precipitationPrediction.type()).toBe("Precipitation");
    expect(precipitationPrediction.unit()).toBe("mm");

    precipitationPrediction.convertToInches();
    expect(precipitationPrediction.from()).toBe(5/25.4);
    expect(precipitationPrediction.to()).toBe(10/25.4);
    expect(precipitationPrediction.unit()).toBe("Inches");

    precipitationPrediction.convertToMM();
    expect(precipitationPrediction.from()).toBe(5);
    expect(precipitationPrediction.to()).toBe(10);
    expect(precipitationPrediction.unit()).toBe("MM");
})

test('WindPrediction test', () => {
    let date = new Date();

    let wind1 = new Wind("NE",7,"MS",date,"Horsens");

    let wind = new WindPrediction(5,10,"NE","MS",date,"Horsens");

    expect(wind.matches(wind1)).toBe(true);
    expect(wind.from()).toBe(5);
    expect(wind.to()).toBe(10);
    expect(wind.time()).toBe(date);
    expect(wind.place()).toBe("Horsens");
    expect(wind.unit()).toBe("MS");

})

test('CloudCoveragePrediction test', () => {
    let date = new Date();
    let cloudCoverage = new CloudCoveragePrediction(10,20,"okta",date,"Horsens");

    expect(cloudCoverage.from()).toBe(10);
    expect(cloudCoverage.to()).toBe(20);
    expect(cloudCoverage.time()).toBe(date);
    expect(cloudCoverage.place()).toBe("Horsens");
    expect(cloudCoverage.type()).toBe("Cloud Coverage");
    expect(cloudCoverage.unit()).toBe("okta");
})

//TODO: Test not finished yet
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


    let date = new Date();
    let data1 = new Temperature(10, "Celsius", date, "Horsens");
    let data2 = new Temperature(12, "Celsius", date, "Vejle");
    let dataArray = [data1, data2];
    let weatherHistory1 = new WeatherHistory(dataArray, "Horsens", "Temperature", dateInterval1);


    //place test
    expect(weatherHistory1.getCurrentPlace()).toBe("Horsens");
    weatherHistory1.setCurrentPlace("vejle");
    expect(weatherHistory1.getCurrentPlace()).toBe("vejle");
    weatherHistory1.clearCurrentPlace();
    expect(weatherHistory1.getCurrentPlace()).toBe("");

    //type test
    expect(weatherHistory1.getCurrentType()).toBe("Temperature");
    weatherHistory1.setCurrentType("vejle");
    expect(weatherHistory1.getCurrentType()).toBe("vejle");
    weatherHistory1.clearCurrentType();
    expect(weatherHistory1.getCurrentType()).toBe("");

    //period test
    expect(weatherHistory1.getCurrentPeriod()).toBe(dateInterval1);
    weatherHistory1.setCurrentPeriod(dateInterval2);
    expect(weatherHistory1.getCurrentPeriod()).toBe(dateInterval2);
    weatherHistory1.clearCurrentPeriod();
    expect(weatherHistory1.getCurrentPeriod()).toBe("");

    //Unit Conversion
    weatherHistory1.convertToUSUnits();
    expect(data1.value()).toBe((10 * 9 / 5) + 32);
    expect(data1.unit()).toBe("Fahrenheit");

    weatherHistory1.convertToInternationalUnits();
    expect(data1.value()).toBe(10);
    expect(data1.unit()).toBe("Celsius");

    let weatherData3 = new Temperature(15, "Celsius", fromDate, "friv");
    weatherHistory1.add(weatherData3);

    weatherHistory1.setCurrentPlace("friv");
    weatherHistory1.setCurrentType("Temperature");
    weatherHistory1.setCurrentPeriod(dateInterval1);

    expect(weatherHistory1.getCurrentPlace()).toBe("friv");
    expect(weatherHistory1.getCurrentType()).toBe("Temperature");
    expect(weatherHistory1.getCurrentPeriod()).toBe(dateInterval1);

    expect(weatherHistory1.data().toString()).toBe([weatherData3].toString());
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


    let date = new Date();
    let data1 = new Temperature(10, "Celsius", date, "Horsens");
    let data2 = new Temperature(12, "Celsius", date, "Vejle");
    let dataArray = [data1, data2];
    let weatherForecast1 = new WeatherForecast(dataArray, "Horsens", "Temperature", dateInterval1);


    //place test
    expect(weatherForecast1.getCurrentPlace()).toBe("Horsens");
    weatherForecast1.setCurrentPlace("Vejle");
    expect(weatherForecast1.getCurrentPlace()).toBe("Vejle");
    weatherForecast1.clearCurrentPlace();
    expect(weatherForecast1.getCurrentPlace()).toBe("");

    //type test
    expect(weatherForecast1.getCurrentType()).toBe("Temperature");
    weatherForecast1.setCurrentType("Vejle");
    expect(weatherForecast1.getCurrentType()).toBe("Vejle");
    weatherForecast1.clearCurrentType();
    expect(weatherForecast1.getCurrentType()).toBe("");

    //period test
    expect(weatherForecast1.getCurrentPeriod()).toBe(dateInterval1);
    weatherForecast1.setCurrentPeriod(dateInterval2);
    expect(weatherForecast1.getCurrentPeriod()).toBe(dateInterval2);
    weatherForecast1.clearCurrentPeriod();
    expect(weatherForecast1.getCurrentPeriod()).toBe("");

    //Unit Conversion
    weatherForecast1.convertToUSUnits();
    expect(data1.value()).toBe((10 * 9 / 5) + 32);
    expect(data1.unit()).toBe("Fahrenheit");

    weatherForecast1.convertToInternationalUnits();
    expect(data1.value()).toBe(10);
    expect(data1.unit()).toBe("Celsius");

    let weatherData3 = new Temperature(15, "Celsius", fromDate, "friv");
    weatherForecast1.add(weatherData3);

    weatherForecast1.setCurrentPlace("friv");
    weatherForecast1.setCurrentType("Temperature");
    weatherForecast1.setCurrentPeriod(dateInterval1);

    expect(weatherForecast1.getCurrentPlace()).toBe("friv");
    expect(weatherForecast1.getCurrentType()).toBe("Temperature");
    expect(weatherForecast1.getCurrentPeriod()).toBe(dateInterval1);

    expect(weatherForecast1.data().toString()).toBe([weatherData3].toString()); 
    
})
