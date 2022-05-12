import MyPlugin from './widget';
import React from 'react';

const App = () => (
  <div style={{
    display:'block'
  }}>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <h1>Sample Host Site</h1>
      <MyPlugin testVal="Running locally..." authToken="" />
    </div>
  </div>
);

export default App;