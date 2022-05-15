import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BigHead } from '@bigheads/core';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Example = () => (
    <BigHead
      accessory="shades"
      body="chest"
      circleColor="blue"
      clothing="tankTop"
      clothingColor="black"
      eyebrows="angry"
      eyes="wink"
      facialHair="mediumBeard"
      graphic="vue"
      hair="short"
      hairColor="black"
      hat="none"
      hatColor="green"
      lashes="false"
      lipColor="purple"
      mask="true"
      faceMask="true"
      mouth="open"
      skinTone="brown"
    />
  );

  return (
    <main>
      <h1>StudeeCloud App</h1>
      <BigHead
        accessory="shades"
        body="chest"
        circleColor="blue"
        clothing="tankTop"
        clothingColor="black"
        eyebrows="angry"
        eyes="wink"
        facialHair="mediumBeard"
        graphic="react"
        hair="short"
        hairColor="black"
        hat="none"
        hatColor="green"
        lashes="false"
        lipColor="purple"
        mask="true"
        faceMask="true"
        mouth="open"
        skinTone="brown"
      />
    </main>
  );
}

export default App;
