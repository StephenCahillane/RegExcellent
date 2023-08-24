import React, { useState, useEffect } from 'react';


export default function Question({ index, setOnTrapSpace, onAnswerChecked, lives, setLives, gems, setGems, playerCol}) {

    const [answer, setAnswer] = useState("");
    const [entityData, setEntityData] = useState([]);
    const endpoint = "/api/questions";
    const [isMatching, setIsMatching] = useState(undefined);
    const [candidate, setCandidate] = useState(new RegExp(answer));

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
    

    useEffect(() => {
    if (index == undefined){
        setIsMatching(false);
    }
}, [playerCol])


    const handleSubmit = () => {
        setCandidate(new RegExp(answer));
        
        const passwords = entityData[index].matchWords;
        console.log(JSON.stringify(entityData[index]));
        
        const passwordMatches = passwords.every((password) => candidate.test(password))
        setIsMatching(passwordMatches)
        
        if(passwordMatches){
            setOnTrapSpace(false);
            setGems(gems + 10);
            

        } else if(!passwordMatches){
            setLives(lives - 1);
        }
        onAnswerChecked(passwordMatches)

    
    }
    
    return (
        <><div className='backgroundBottom'>
            <div className='quill'></div>
            <div className="scroll">
                
                <h3>{entityData[index]?.name}</h3>
                <p>{entityData[index]?.description}</p>
                <p>{entityData[index]?.hint}</p>

                <div>
                    {entityData[index]?.matchWords?.map((matchWord) => {
                        <WordMatcher string={matchWord} answer={answer} candidate={candidate} setCandidate={setCandidate}/>
                    })}
                </div>
                
                <div>
                    <input name="answer" type="text" placeholder="Answer" onChange={(event) => setAnswer(event.target.value)}></input>
                    <button className={isMatching ? "matching" : "nonmatching"} onClick={handleSubmit}>Submit Answer</button>
                </div>
                {/* <button onClick={next}>Next</button> */}
                
            </div>
                <div className='ink'></div>
            </div>
        </>
    )
    }

    function WordMatcher({string, candidate, setCandidate, answer}){
        const [match, setMatch] = useState(string.match(candidate)[0]);
        const [matchLength, setMatchLength] = useState(match.length);
        const [index, setIndex] = useState(match.index);

        useEffect(() => {
            setCandidate(new RegExp(answer));
            setMatch(string.match(candidate)[0]);
            setMatchLength(match.length);
            setIndex(match.index);
            console.log(candidate);
            console.log(match);
        }, [answer])

        return (
            <div>
                <p><span>{string.substring(0, index)}</span><span className="matching-text">{string.substring(index, index+matchLength)}</span><span>{string.substring(index+matchLength)}</span></p>
            </div>
        );
    }