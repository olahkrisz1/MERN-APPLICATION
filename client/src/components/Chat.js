import React from 'react'
import { useState } from 'react'
import { getAnswerFromAI } from '../Requests/OpenAIRequests';


function Chat  () {

    const [prompt, setPropmt] = useState("")
    const [answer, setAnswer] = useState("")

    async function getAnswer(prompt){
        const c = await getAnswerFromAI(prompt);
        setAnswer(c);
    }

  return (
    <div className='border border-1 border-primary rounded mt-5'>
       <div className='grid grid-cols-1'>
            <div className=''>
              <h1>Or, if you want a quick answer, just ask our ChatBot!</h1>
              <textarea onChange={(event) => setPropmt(event.target.value)} className='border rounded border-slate-800'></textarea>
              <div>
              <button onClick={() => getAnswer(prompt)} className='bg-primary text-white border-rounded'>Get Answer</button>
              <div>{answer}</div>
              </div>
            </div>
       </div>
    </div>
  )
}

export default Chat