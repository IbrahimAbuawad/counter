import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";
import './app.scss';
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import History from './components/history/History';

const fakeResults = [

  { name: 'fake thing 1', url: 'http://fakethings.com/1' },
  { name: 'fake thing 2', url: 'http://fakethings.com/2' },
]

const initialState = {
  loading: false,
  data: null,
  history: []
};



function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({})
  const [currentData, setCurrentData] = useState({})
  const [currentDataState, setCurrentDataState] = useState(false)


  // const [load, setLoad] = useState(false);
  // const [historyArray] = useState([])

  const [state, dispatch] = useReducer(reducerFunction, initialState)

  function reducerFunction(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case 'Loading_State':
        const history = [...state.history, payload];
        return { history, loading: true };

      default:
        return state;
    }
  }

  function changeLoadingState(requestParams) {
    return {
      type: 'Loading_State',
      payload: {
        'url': requestParams.url,
        'method': requestParams.method
      }
    };
  }




  useEffect(() => {
    (async () => {
      if (requestParams.method === 'get') {
        const dataApi = await axios({
          method: requestParams.method,
          url: requestParams.url
        })
        if (dataApi.data.results) {

          const data = {
            Headers: {
              "cache-control": "public, max-age=86400, s-maxage=86400",
              "content-type": "application/json; charset=utf-8"
            },
            results: dataApi.data
          };
          setData(data);
          // dispatch(changeLoadingState(requestParams))

        }
        else {

          const data = {
            Headers: {
              "cache-control": "public, max-age=86400, s-maxage=86400",
              "content-type": "application/json; charset=utf-8"
            },
            results: fakeResults
          };
          console.log(data);
          setData(data);

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
    setCurrentDataState(false)
    console.log(state.history);
    dispatch(changeLoadingState(requestParams));

    localStorage.setItem('myHistory', JSON.stringify(state.history));


  }

console.log(currentDataState);

  return (

    <React.Fragment>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <br></br>
      <br></br>

      <History
        historyArray={state.history}
        setCurrentData={setCurrentData} data={data}
        setCurrentDataState={setCurrentDataState}
      />

      <Form
        handleApiCall={callApi}
        data={setData}
        requestParams={setRequestParams}
      />
      {state.loading ? <Results
        currentData={currentData}
        data={data}
        currentDataState={currentDataState}
        setCurrentDataState={setCurrentDataState}
      /> : 'please wait ...'}
      <Footer />
    </React.Fragment>
  )
}

export default App