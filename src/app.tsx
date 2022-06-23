import MyPlugin from './widget';
import React from 'react';

class App extends React.Component {
  public render() {
    return (
      <div style={{
        display: 'block'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <h1>Sample Host Site</h1>
          <MyPlugin getAuthToken={() => console.log('msal is not available here')} />
        </div>
      </div>
    );
  }
}

export default App;