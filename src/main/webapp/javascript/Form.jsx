import React, { useState } from 'react';
import { useActionData } from 'react-router-dom';




export default function Form() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [matchWordsString, setMatchWordsString] = useState("");
    const [exclusionWordsString, setExclusionWordsString] = useState("");
    const [hint, setHint] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()

        
        const data = {
            name: name,
            description: description,
            matchWordsString: matchWordsString,
            exclusionWordsString: exclusionWordsString,
            hint: hint,
        };

        try {
            const response = await fetch("/api/saveQuestions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                console.log("Saved");
            } else {
                console.log("Failed");
            }
        } catch (error) {
            console.error("Error saving trap", error);
        }

    };


    return (
        <><form onSubmit={handleSubmit}>
            <div className="backgroundForm">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Trap name.."
                ></input>

                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    id="description"
                    type="description"
                    placeholder="description"
                ></input>

                <input
                    value={matchWordsString}
                    onChange={(e) => setMatchWordsString(e.target.value)}
                    name="matchWordsString"
                    id="matchWordsString"
                    type="matchWordsString"
                    placeholder="matchWordsString"
                ></input>

                <input
                    value={exclusionWordsString}
                    onChange={(e) => setExclusionWordsString(e.target.value)}
                    name="exclusionWordsString"
                    id="exclusionWordsString"
                    type="exclusionWordsString"
                    placeholder="exclusionWordsString"
                ></input>

                <input
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    name="hint"
                    id="hint"
                    type="hint"
                    placeholder="hint"
                ></input>


            <button type="submit">Submit Trap</button>
            </div>
            </form>
        </>
    )









}
