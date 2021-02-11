import React, { useState }  from 'react';
import Chart from "react-google-charts";
import './App.css';
function App() {
  const initWeather = [];
  const [weather, setWeather] = useState(initWeather);
  function convertUTCDateToLocalDate(date){
        new Date(date.getTime()+date.getTimezoneOffset()*60*1000);
        return date;
    }
  fetch('https://func-weather.azurewebsites.net/api/HttpTriggerCSharp2?code=03Hf14xSawGyeGtfxZTCLJ5mGLx0GGusap2f3zssPqg6n3KriqizHg==&deviceId=1f0038001847393035313138&amount=10')
      .then(response => response.json())
      .then(json => setWeather([...json]));
  let humtempkey = 1;
  let chartHumData = [
            ['Aika', '%'],
            ['Loading data', 0],
  ]; 
  let chartTempData = [
            ['Aika', '°C'],
            ['20:21:13', 25],
            ['20:21:14', 26],
            ['20:21:15', 23],
            ['20:21:16', 22],
            ['20:21:17', 24]
  ];
  const rows = () => weather.reverse().map(temphum => {
    if (chartHumData[1][0] === 'Loading data'){
      chartHumData.pop();
    }
    chartHumData.push( [String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' GMT')[0].split(' ')[4], parseInt(temphum.Hum)] );
    return <div key={humtempkey++}><b>Klo: </b>{String(convertUTCDateToLocalDate(new Date(temphum.Timestamp))).split(' GMT')[0].split(' ')[4]} <b>Ilmankosteus:</b> {temphum.Hum}% <b>Lämpötila:</b> {temphum.Temp}°C</div>
  })  
  return (
    <div className="App">
     {rows()}
     <div style={{ display: 'flex', maxWidth: 1800, margin:'10px' }}>
        <Chart
          width={1800}
          height={300}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={
           chartHumData
          }
          options={{
            title: 'Ilmankosteus',
            chartArea: { width: '50%' }
          }}
          legendToggle
        />
        </div>        
        <div style={{ display: 'flex', maxWidth: 1800, margin:'10px' }}>
        <Chart
          width={1800}
          height={'300px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={
            chartTempData
          }
          options={{
            title: 'Lämpötila',
            chartArea: { width: '50%', height: '70%' },
          }}
        />
      </div>
    </div>
  );
}
export default App;


