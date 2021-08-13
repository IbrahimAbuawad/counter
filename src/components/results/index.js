

import React from 'react'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

function Results(props) {
  return (

    <section data-testid='testResult'>
      {props.data &&
        <>
          <h4>"Headers : </h4>
          <JSONPretty  data={props.data.Headers}></JSONPretty>


          <h4>"Results : </h4>
          <JSONPretty id="json-pretty" data={props.data}></JSONPretty>
        </>
      }
    </section >



  )
}

export default Results
