import React, { useState } from 'react';
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';



function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({})
  const [load, setLoad] = useState(false);

  function callApi(requestParams, data2) {
    // mock output
    const data = {
   count:data2.count,
   results:data2.results,
   Headers:{
    "cache-control": "public, max-age=86400, s-maxage=86400",
    "content-type": "application/json; charset=utf-8"
  },
    };
    console.log(data);
    setData(data);
    setRequestParams(requestParams);
    setLoad(true);
  }
  function loading(changeLoad) {
    setLoad(changeLoad)
  }
  

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} loading={loading} data={setData} requestParams={setRequestParams}/>
      {load ?  <Results data={data}  />:'please wait ...'}
      <Footer />
    </React.Fragment>
  )
}

export default App