

import React from 'react'
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';
function Results(props) {

  console.log(props.currentData);

  let current =
<>
    <section data-testid='testResult'>

      <h4>"Headers : </h4>
      <JSONPretty data={props.currentData.Headers}></JSONPretty>


      <h4>"Results : </h4>
      <JSONPretty id="json-pretty" data={props.currentData}></JSONPretty>
    </section>

</>
  let data =
<>
    <section data-testid='testResult'>

      <h4>"Headers : </h4>
      <JSONPretty data={props.data.Headers}></JSONPretty>


      <h4>"Results : </h4>
      <JSONPretty id="json-pretty" data={props.data}></JSONPretty>
    </section>

</>
  return (
    <>
      {props.currentDataState ? current : data}
    </>
  )
}

export default Results


