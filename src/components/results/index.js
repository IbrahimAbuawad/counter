

import React from 'react'

function Results(props) {
  return (
  
        <section data-testid='testResult'>
         <h4>"Headers : </h4>
      <pre >{props.data? JSON.stringify(props.data.Headers, undefined, 3) : null}"</pre>

      <h4>"Results : </h4>
      <pre >{props.data? JSON.stringify(props.data.results, undefined, 3) : null}"</pre>
    </section >
      

      
  )
}

export default Results
