import { useState } from 'react';
import './App.css';
import MapView from './components/MapView';
import styled from 'styled-components';

const AppStyled = styled('div')`
  h2 {
    color: green;
  }

  .step {
    display: flex;
    align-items: center;
    gap: 2rem;
    p {
      margin-left: 0.5rem;
    }
  }
`;

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
    <AppStyled>
      <h2>Find your neighborhood</h2>
      <div className="step">
        <p>1. Upload location csv file:</p>
        <input type="file" accept=".csv" placeholder="Please upload csv file" onChange={handleFile} />
      </div>
      <div className="step">
        <p>2. Set circle radius:</p>
        <input type="number" onChange={handleRadius} />
      </div>
      <MapView locationData={locationData} radius={radius} />
    </AppStyled>
  );
}

export default App;
