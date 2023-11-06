import React, { useState, useEffect } from 'react';
import Inputbox from './Components/Input';
import Start from './Components/Start';
import HexagonalScene from './Components/Hex';
import Hexagonal from './Components/Sendblcok';
import Hex from './Components/Flowchart';
import Static from './Components/Static';
import './App.css'
function App() {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
  const [inputBoxVisible, setInputBoxVisible] = useState(false);
  const [showStaticComponent, setShowStaticComponent] = useState(true);

  const components = [HexagonalScene, Hex, Hexagonal];
  const durations = [5000, 10000, 7000]; 
  const toggleInputBox = () => {
    setInputBoxVisible(true);
  };

  const handleInputSubmit = () => {
    setInputBoxVisible(true);
    setShowStaticComponent(false);
  };

  useEffect(() => {
    if (!showStaticComponent) {
      const componentInterval = setInterval(() => {
        setCurrentComponentIndex((prevIndex) => {
          if (prevIndex < components.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(componentInterval);
            return prevIndex;
          }
        });
      }, durations[currentComponentIndex]); 

      return () => {
        clearInterval(componentInterval);
      };
    }
  }, [showStaticComponent, currentComponentIndex, durations]);

  const CurrentComponent = components[currentComponentIndex];

  return (
    <div className="row">
      <div className="col-md-2">
        {inputBoxVisible ? <Inputbox onSubmit={handleInputSubmit} /> : <Start onStartClick={toggleInputBox} />}
      </div>
      <div className="col-md-10">
        {showStaticComponent ? <Static /> : <CurrentComponent />}
      </div>
    </div>
  );
}

export default App;
