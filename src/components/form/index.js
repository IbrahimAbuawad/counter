import React, { useState} from 'react';
import './form.scss';

function Form(props) {
  const [method, setMethod] = useState('get');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [jsonArea, setJsonArea] = useState(false);

  const resultLists = document.getElementById('rList');

  function renderHistory() {
    let li = document.createElement('li');
    let methodSpan = document.createElement('span');
    methodSpan.textContent=`${method}`;

    if(methodSpan.textContent ==='get'){ methodSpan.className = 'get'; methodSpan.style.backgroundColor='yellow'};
    if(methodSpan.textContent ==='put') methodSpan.className = 'put';
    if(methodSpan.textContent ==='post') methodSpan.className = 'post';
    if(methodSpan.textContent ==='delete') methodSpan.className = 'delete';

    let urlSpan = document.createElement('span');
    urlSpan.textContent=`${url}`;
    resultLists.appendChild(li);
    li.textContent = `${methodSpan.textContent} : ${urlSpan.textContent}`;
   }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(e.target.url.value){
      const formData = {
        method: method,
        body: body,
        url: url
      }
      const raw = await fetch(formData.url);
      const data = await raw.json();
      console.log(data);
      props.handleApiCall(formData, data);
      props.loading(true);
    }
      else{
        const formData ={
          count: 2,
          results: [
            { name: 'fake thing 1', url: 'http://fakethings.com/1' },
            { name: 'fake thing 2', url: 'http://fakethings.com/2' },
          ],
        };
      props.requestParams({url:'http://fakethings.com',method:'GET'})
        props.data(formData)
        props.loading(true);
      }
     
     focus(method);


     renderHistory()


    } catch (error) {
      console.log(error)
    }
  }

  function focus(method) {
    document.getElementById(`${method}`).focus();
  }


  // useEffect(() => {
  //   props.setLoad(false);
  // }, [method,url])
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' type='text' onChange={(e)=>setUrl(e.target.value)} />
          <button type="submit" data-testid='btnId'>GO!</button>
        </label>
        <label className="methods">
          <span tabIndex="4" id="get"  onClick={(e)=>{setMethod(e.target.id); setJsonArea(false);props.requestParams({url,method})}}>GET</span>
          <span tabIndex="4" id="post"  onClick={(e)=>{setMethod(e.target.id); setJsonArea(true)}}>POST</span>
          <span tabIndex="4" id="put"  onClick={(e)=>{setMethod(e.target.id); setJsonArea(true)}}>PUT</span>
          <span tabIndex="4" id="delete"  onClick={(e)=>{setMethod(e.target.id); setJsonArea(false);}}>DELETE</span>
        </label>
        {jsonArea &&
          <label >
            <span>Enter your text here :</span>
            <textarea name='jsonArea' onChange={(e)=>setBody(e.target.value)} rows='7' cols='500'></textarea>
            </label>
      }
      </form>
    
    </>
  )
}

export default Form

