import React, { useState, useEffect } from 'react';
import '../css/style.css';


export default function Question() {

    const [answer, setAnswer] = useState("");
    const [trapID, setTrapID] = useState(0);
    const [entityData, setEntityData] = useState("");
    const endpoint = `/api/questions/252`;


    useEffect(() => {
        // Define an async function to fetch the data
        const fetchData = async () => {
            try {
            const response = await fetch(endpoint);
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            setEntityData(data);
            } catch (error) {
            console.error('Error fetching entity:', error);
            }
        };
    
        
        fetchData();
        }, []);



    const handleSubmit = () => {
        const candidate = new RegExp("^(" + answer + ")$");
        console.log(candidate);

        const passwords = entityData.matchWords;
        console.log(JSON.stringify(entityData));
        
        
        //column
        console.log(passwords);
        
        const isMatching = passwords.every((password) => candidate.test(password));
        console.log("Answer matches:", isMatching);
        
    }


    return (
        <><div>
            <h3>{entityData.name}</h3>
            <p>{entityData.description}</p>
            <p>{entityData.hint}</p>
        </div>
            <div>
                
                <input name="answer" type="text" placeholder="Answer" onChange={(event) => setAnswer(event.target.value)}></input>
                <button onClick={handleSubmit}>Submit Answer</button>
                
            </div></>
    )
}