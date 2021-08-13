import React, { useState, useEffect } from 'react';
import axios from "axios";
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

const fakeResults =   [
  
    { name: 'fake thing 1', url: 'http://fakethings.com/1' },
    { name: 'fake thing 2', url: 'http://fakethings.com/2' },
  ]

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({})
  const [load, setLoad] = useState(false);
 
  



  useEffect(() => {
    (async () => {
      if (requestParams.method === 'get') {
        const dataApi = await axios({
          method: requestParams.method,
          url: requestParams.url 
        })
        if(dataApi.data.results){
       
          const data = {
            Headers:  {
              "cache-control": "public, max-age=86400, s-maxage=86400",
              "content-type": "application/json; charset=utf-8"
            },
            results: dataApi.data
          };
           setData(data);
           setLoad(true)
  
      }
      else{
     
         const data = {
          Headers:  {
            "cache-control": "public, max-age=86400, s-maxage=86400",
            "content-type": "application/json; charset=utf-8"
          },
          results: fakeResults
        };
        console.log(data);
         setData(data);
         setLoad(true)
      }
      }
    })()
  }, [requestParams])


  
  function callApi(requestParams, data2) {
    // mock output
    const data = {
      count: data2.count,
      results: data2.results,
      Headers: {
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
      <br></br>
      <br></br>
      <h3>Results List history :
      <ul id='rList'>

      </ul>
      </h3>
      <Form handleApiCall={callApi} setLoad={setLoad} loading={loading} data={setData} requestParams={setRequestParams} />
      {load ? <Results data={data} /> : 'please wait ...'}
      <Footer />
    </React.Fragment>
  )
}

export default App