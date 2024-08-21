import { useState, useEffect } from "react";

function CheckboxesInput({ value = "", checkboxValue = [], onChange }) {
    const [question, setQuestion] = useState(value);
    const [checkboxes, setCheckboxes] = useState(
        checkboxValue.length > 0 ? checkboxValue : ["Option 1", "Option 2"]
    );
    const [newCheckbox, setNewCheckbox] = useState("");

    useEffect(() => {
        if (onChange) {
            onChange(question, checkboxes);
        }
    }, [question, checkboxes]);

    const handleQuestionChange = (e) => {
        const newQuestion = e.target.value;
        setQuestion(newQuestion);
    };

    const handleCheckboxChange = (index, event) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = event.target.value;
        setCheckboxes(updatedCheckboxes);
    };

    const handleAddCheckbox = () => {
        if (newCheckbox.trim() !== "") {
            setCheckboxes([...checkboxes, newCheckbox]);
            setNewCheckbox("");
        }
    };

    const handleRemoveCheckbox = (index) => {
        setCheckboxes(checkboxes.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full p-4 bg-neutral-100 rounded-b-3xl">
            <div className="px-3 py-1 text-zinc-700 text-sm underline">
                Checkboxes
            </div>
            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600 mb-2"
                type="text"
                placeholder="Question here..."
                value={question}
                onChange={handleQuestionChange}
            />
            {checkboxes.map((checkbox, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input type="checkbox" className="mr-2" />
                    <input
                        className="w-full p-1 rounded border border-gray-300"
                        type="text"
                        value={checkbox}
                        onChange={(event) => handleCheckboxChange(index, event)}
                    />
                    <button
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveCheckbox(index)}
                    >
                        Remove
                    </button>
                </div>
            ))}

            <div className="flex items-center">
                <input
                    className="w-full p-1 rounded border border-gray-300"
                    type="text"
                    placeholder="Add new checkbox..."
                    value={newCheckbox}
                    onChange={(e) => setNewCheckbox(e.target.value)}
                />
                <button
                    className="ml-2 text-blue-500"
                    onClick={handleAddCheckbox}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default CheckboxesInput;
