import React, { useEffect, useState } from 'react';

export default function Widget(props) {
  const [apiSettings, setApiSettings] = useState();
  const [serverVal, setServerVal] = useState('hello world');

  useEffect(() => {

  }, [props]);

  const fetchApi = () => {
    if(props && props.authToken) {
      const API_SERVER = 'https://engineeringhub-api-demo.azurewebsites.net/api/applicationSettings';

      const reqOpt = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.authToken}`
         }
    };

    fetch(API_SERVER, reqOpt)
        .then(response => response.json())
        .then(data => setApiSettings(data));
    }
  }

  return (
    <div
      style={{
        padding: '2em',
        backgroundColor: '#efefef',
        color: '#666',
        flex: '1',
        flexDirection: 'column'
      }}
    >
      <div style={{
        fontSize: '2em'
      }}>Example Plug-in</div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <div class="ms-TextField" style={{ maxWidth: '300px', display: 'flex', alignItems: 'flex-end' }}>
          <div class="ms-TextField-wrapper">
            <label class="ms-Label root-253">Host Value from eng.ms</label>
            <div class="ms-TextField-fieldGroup fieldGroup-243">
              <input class="ms-TextField-field field-244" value={props.testVal} style={{ marginRight: '10px' }} />
            </div>
          </div>
        </div>

        <div class="ms-TextField" style={{ maxWidth: '300px', display: 'flex', alignItems: 'flex-end' }}>
          <div class="ms-TextField-wrapper">
            <label class="ms-Label root-253">Auth Token</label>
            <div class="ms-TextField-fieldGroup fieldGroup-243">
              <input class="ms-TextField-field field-244" value={props.authToken} style={{ marginRight: '10px' }} />
            </div>
          </div>
        </div>
      </div>

      <div class="ms-TextField" style={{ maxWidth: '300px', display: 'flex', alignItems: 'flex-end' }}>
        <div class="ms-TextField-wrapper">
          <label class="ms-Label root-253">EngHub API Call</label>
          <div class="ms-TextField-fieldGroup fieldGroup-243">
            <input class="ms-TextField-field field-244" onChange={e => setServerVal(e.target.value)} value={serverVal} style={{ marginRight: '10px' }} />
          </div>
        </div>
        <button
          class="ms-Button ms-Button--default fabric-button secondary-button root-254"
          style={{ marginLeft: '10px' }}
          onClick={() => fetchApi()}>Submit</button>
      </div>

      <div class="ms-TextField" style={{ maxWidth: '300px', display: 'flex', alignItems: 'flex-end' }}>
          <div class="ms-TextField-wrapper">
            <label class="ms-Label root-253">Response</label>
            <div class="ms-TextField-fieldGroup fieldGroup-243">
              <input class="ms-TextField-field field-244" value={JSON.stringify(apiSettings)} style={{ marginRight: '10px' }} />
            </div>
          </div>
        </div>


    </div>
  );
}