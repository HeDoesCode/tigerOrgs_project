import { useState, useEffect } from "react";

function SelectInput({ value = "", selectValue = [], onChange }) {
    const [question, setQuestion] = useState(value);
    const [options, setOptions] = useState(
        selectValue.length > 0
            ? selectValue
            : ["Option 1", "Option 2", "Option 3"]
    );
    const [newOption, setNewOption] = useState("");

    useEffect(() => {
        if (onChange) {
            onChange(question, options);
        }
    }, [question, options]);

    const handleQuestionChange = (e) => {
        const newQuestion = e.target.value;
        setQuestion(newQuestion);
    };

    const handleOptionChange = (index, event) => {
        const updatedOptions = [...options];
        updatedOptions[index] = event.target.value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        if (newOption.trim() !== "") {
            setOptions([...options, newOption]);
            setNewOption("");
        }
    };

    const handleRemoveOption = (index) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full p-4 bg-neutral-100 rounded-b-3xl">
            <div className="px-3 py-1 text-zinc-700 text-sm underline">
                Dropdown
            </div>
            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600 mb-2"
                type="text"
                placeholder="Question here..."
                value={question}
                onChange={handleQuestionChange}
            />

            {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        className="w-full p-1 rounded border border-gray-300"
                        type="text"
                        value={option}
                        onChange={(event) => handleOptionChange(index, event)}
                    />
                    <button
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveOption(index)}
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
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                />
                <button
                    className="ml-2 text-blue-500"
                    onClick={handleAddOption}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default SelectInput;
