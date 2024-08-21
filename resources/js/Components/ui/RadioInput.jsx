import { useState, useEffect } from "react";

function RadioInput({ value = "", radioValue = [], onChange }) {
    const [question, setQuestion] = useState(value);
    const [radio, setRadio] = useState(
        radioValue.length > 0
            ? radioValue
            : ["Option 1", "Option 2", "Option 3"]
    );
    const [newRadio, setNewRadio] = useState("");

    useEffect(() => {
        if (onChange) {
            onChange(question, radio);
        }
    }, [question, radio]);

    const handleQuestionChange = (e) => {
        const newQuestion = e.target.value;
        setQuestion(newQuestion);
    };

    const handleRadioChange = (index, event) => {
        const updatedRadio = [...radio];
        updatedRadio[index] = event.target.value;
        setRadio(updatedRadio);
    };

    const handleAddRadio = () => {
        if (newRadio.trim() !== "") {
            setRadio([...radio, newRadio]);
            setNewRadio("");
        }
    };

    const handleRemoveRadio = (index) => {
        setRadio(radio.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full p-4 bg-neutral-100 rounded-b-3xl">
            <div className="px-3 py-1 text-zinc-700 text-sm underline">
                Multiple Choices
            </div>
            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600 mb-2"
                type="text"
                placeholder="Question here..."
                value={question}
                onChange={handleQuestionChange}
            />

            {radio.map((radio, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="radio"
                        name="radioGroup"
                        value={radio}
                        className="mr-2"
                    />
                    <input
                        className="w-full p-1 rounded border border-gray-300"
                        type="text"
                        value={radio}
                        onChange={(event) => handleRadioChange(index, event)}
                    />
                    <button
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveRadio(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="flex items-center">
                <input
                    className="w-full p-1 rounded border border-gray-300"
                    type="text"
                    placeholder="Add new option..."
                    value={newRadio}
                    onChange={(e) => setNewRadio(e.target.value)}
                />
                <button className="ml-2 text-blue-500" onClick={handleAddRadio}>
                    Add
                </button>
            </div>
        </div>
    );
}

export default RadioInput;
