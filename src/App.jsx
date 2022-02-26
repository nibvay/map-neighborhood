import { useState } from 'react';
import './App.css';
import MapView from './components/MapView';

function App() {
  // const [locationData, setLocationData] = useState();

  const handleFile = (evt) => {
    const reader = new FileReader();
    reader.readAsText(evt.target.files[0]);
    reader.onload = (e) => {
      const { result } = reader;
      // setLocationData(csvToJson(result));
    }
  }
  return (
    <div className="App">
      <div>Find your neighborhood</div>
      <input
        type="file"
        accept=".csv"
        placeholder="Please upload csv file"
        onChange={handleFile}
      />
      <MapView />
    </div>
  );
}

export default App;
