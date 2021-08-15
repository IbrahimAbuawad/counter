import React from 'react'
function History(props) {

    let retrievedObject = JSON.parse(localStorage.getItem('myHistory'));

    function callApi(data) {
        props.setCurrentData(data);
        props.setCurrentDataState(true)

    }



    return (

        <>
            {retrievedObject &&
                <>
                    <h3>Results List history :</h3>
                    <ul>
                        {retrievedObject.map(e => (

                            <li>{e.method} : {e.url} <button onClick={(e)=>callApi(props.data)}>Render the API</button></li>
                        )

                        )}
                    </ul>

                </>
            }
        </>
    )
}

export default History
