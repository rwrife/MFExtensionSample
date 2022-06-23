import React, { useEffect, useState } from 'react';

export interface IEngHubExtension {
  getAuthToken?: () => Promise<string>;
}

const Widget: React.PureComponent<IEngHubExtension> = ({
  getAuthToken
}) => {

  const [apiResponse, setApiResponse] = useState();
  const [server, setServer] = useState('https://engineeringhub-api-demo.azurewebsites.net/api/applicationSettings');
  const [authToken, setAuthToken] = useState();
  const [scope, setScope] = useState('api://brainmanagement-onboarding-int/Onboarding.General');
  const [authority, setAuthority] = useState('https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47');

  // EngineeringHub-MFDemo app scope api://3e98aa69-4e09-4821-bda5-4685901a7c36/Read

  useEffect(async () => {
    try {
      if (getAuthToken) {
        setAuthToken('');
        setAuthToken(await getAuthToken([scope], authority));
      }
    } catch {
      setAuthToken('error');
    }
  }, [getAuthToken]);

  const getNewToken = async () => {
    setAuthToken('');
    if (getAuthToken) {        
      setAuthToken(await getAuthToken([scope]));
    }
  }

  const fetchApi = () => {
    if (authToken) {
      const reqOpt = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      };

      fetch(server, reqOpt)
        .then(response => response.json())
        .then(data => setApiResponse(data))
        .catch(err => setApiResponse(err));
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
      }}>Example Plug-in 2</div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <div className="ms-TextField" style={{ maxWidth: '400px', display: 'flex', alignItems: 'flex-end' }}>
          <div className="ms-TextField-wrapper">
            <label className="ms-Label root-253">Scope</label>
            <div className="ms-TextField-fieldGroup fieldGroup-243">
              <input className="ms-TextField-field field-244" value={scope} style={{ marginRight: '10px' }} onChange={e => setScope(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="ms-TextField" style={{ maxWidth: '400px', display: 'flex', alignItems: 'flex-end' }}>
          <div className="ms-TextField-wrapper">
            <label className="ms-Label root-253">Authority</label>
            <div className="ms-TextField-fieldGroup fieldGroup-243">
              <input className="ms-TextField-field field-244" value={authority} style={{ marginRight: '10px' }} onChange={e => setAuthority(e.target.value)} />
            </div>
          </div>
        </div>        
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div className="ms-TextField" style={{ maxWidth: '400px', display: 'flex', alignItems: 'flex-end' }}>
          <div className="ms-TextField-wrapper">
            <label className="ms-Label root-253">Auth Token</label>
            <div className="ms-TextField-fieldGroup fieldGroup-243">
              <input className="ms-TextField-field field-244" value={authToken} style={{ marginRight: '10px' }} />
            </div>
          </div>
        </div>
        <div className="ms-TextField" style={{ maxWidth: '400px', display: 'flex', alignItems: 'flex-end' }}>
          <button
            className="ms-Button ms-Button--default fabric-button secondary-button root-254"
            style={{ marginLeft: '10px' }}
            onClick={() => getNewToken()}>Fetch</button>
        </div>
      </div>

      <div className="ms-TextField" style={{ maxWidth: '400px', display: 'flex', alignItems: 'flex-end' }}>
        <div className="ms-TextField-wrapper">
          <label className="ms-Label root-253">Server API GET Call</label>
          <div className="ms-TextField-fieldGroup fieldGroup-243">
            <input className="ms-TextField-field field-244" onChange={e => setServer(e.target.value)} value={server} style={{ marginRight: '10px' }} />
          </div>
        </div>
        <button
          className="ms-Button ms-Button--default fabric-button secondary-button root-254"
          style={{ marginLeft: '10px' }}
          onClick={() => fetchApi()}>Submit</button>
      </div>

      <div className="ms-TextField" style={{ maxWidth: '400px', display: 'flex', alignItems: 'flex-end' }}>
        <div className="ms-TextField-wrapper">
          <label className="ms-Label root-253">Response</label>
          <div className="ms-TextField-fieldGroup fieldGroup-243">
            <input className="ms-TextField-field field-244" value={JSON.stringify(apiResponse)} style={{ marginRight: '10px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;