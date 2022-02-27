import { useState } from 'react';
import './App.css';
import MapView from './components/MapView';

function csvToJson(originData, delimiter = ',') {
  const data = originData.replace(/\r/gm, '');
  // const headers = data.slice(0, data.indexOf('\n')).split(delimiter);
  const rows = data.slice(data.indexOf('\n') + 1).split('\n');
  const result = [];
  rows.forEach((row) => {
    const splitRow = row.split(delimiter);
    result.push({ name: splitRow[0], lng: Number(splitRow[1]), lat: Number(splitRow[2]) });
  });
  return result;
}

function App() {
  const [locationData, setLocationData] = useState();
  const [radius, setRadius] = useState(500);

  const handleFile = (evt) => {
    const reader = new FileReader();
    reader.readAsText(evt.target.files[0]);
    reader.onload = (e) => {
      const { result } = reader;
      setLocationData(csvToJson(result));
    };
  };

  const handleRadius = (e) => {
    setRadius(Number(e.target.value));
  };

  return (
    <div className="App">
      <h2 style={{ color: 'green' }}>Find your neighborhood</h2>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <p style={{ marginLeft: '0.5rem' }}>1. Upload location csv file:</p>
        <input type="file" accept=".csv" placeholder="Please upload csv file" onChange={handleFile} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <p style={{ marginLeft: '0.5rem' }}>2. Set circle radius:</p>
        <input type="number" onChange={handleRadius} />
      </div>
      <MapView locationData={locationData} radius={radius} />
    </div>
  );
}

export default App;
