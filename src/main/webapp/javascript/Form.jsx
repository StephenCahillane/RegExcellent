import React, { useState } from 'react';
import { useActionData } from 'react-router-dom';




export default function Form() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [description2, setDescription2] = useState("");
    const [matchWords, setMatchWords] = useState([]);
    const [matchWords2, setMatchWords2] = useState([]);
    const [exclusionWords, setExclusionWords] = useState([]);
    const [exclusionWords2, setExclusionWords2] = useState([]);
    const [hint, setHint] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault()


        const data = {
            name: name,
            description: description,
            matchWords: matchWords,
            exclusionWords: exclusionWords,
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
        <div className="form-container">
            <h3>Add new trap:</h3>
            <form onSubmit={handleSubmit}>
                <label for="name">Trap name: </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Add a trap name..."
                ></input>

                <label for="description">Description: </label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Add a description..."
                ></input>

                <label for="matchWords">Matching Words: </label>
                <input
                    value={matchWords}
                    onChange={(e) => setMatchWords(e.target.value.split(","))}
                    name="matchWords"
                    id="matchWords"
                    type="text"
                    placeholder="Add matching words..."
                ></input>

                <label for="exclusionWords">Exclusion Words: </label>
                <input
                    value={exclusionWords}
                    onChange={(e) => setExclusionWords(e.target.value.split(","))}
                    name="exclusionWords"
                    id="exclusionWords"
                    type="text"
                    placeholder="Add exclusion words..."
                ></input>

                <label for="hint">Hint: </label>
                <input
                    value={hint}
                    onChange={(e) => setHint(e.target.value)}
                    name="hint"
                    id="hint"
                    type="text"
                    placeholder="Add a hint..."
                ></input>


                <button type="submit">Submit Trap</button>
            </form>
        </div>
    )









}
