import React, { useState, useEffect } from 'react';
import '../css/style.css';


export default function Question({ index, setOnTrapSpace, onAnswerChecked }) {

    const [answer, setAnswer] = useState("");
    const [entityData, setEntityData] = useState([]);
    const endpoint = "/api/questions";
  
    // const [index, setIndex] = useState(0);
  
    useEffect(() => {
        // Define an async function to fetch the data
        const fetchData = async () => {
            try {
                const response = await fetch(endpoint);
  
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
  
                const data = await response.json();
                setEntityData(data._embedded.questionList);
  
  
            } catch (error) {
                console.error('Error fetching entity:', error);
            }
        };
  
  
        fetchData();
    }, []);
  
    
  
    const handleSubmit = () => {
        const candidate = new RegExp("^(" + answer + ")$");
        console.log(candidate);
  
        const passwords = entityData[0].matchWords;
        console.log(JSON.stringify(entityData[0]));
  
  
        
        console.log(passwords);
  
        const isMatching = passwords.every((password) => candidate.test(password));
        if(isMatching){
            setOnTrapSpace(false);
        }
        onAnswerChecked(isMatching)
  
    }
  
  
    return (
        <><div className='backgroundBottom'>
            <div className='quill'></div>
            <div className="scroll">
                
                <h3>{entityData[index]?.name}</h3>
                <p>{entityData[index]?.description}</p>
                <p>{entityData[index]?.hint}</p>
                
                <div>
                    <input name="answer" type="text" placeholder="Answer" onChange={(event) => setAnswer(event.target.value)}></input>
                    <button onClick={handleSubmit}>Submit Answer</button>
                </div>
                {/* <button onClick={next}>Next</button> */}
                
            </div>
                <div className='ink'></div>
            </div>
        </>
    )
  }