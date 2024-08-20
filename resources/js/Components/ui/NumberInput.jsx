import React, { useState } from "react";

function NumberInput({ value = "", numberValue = "", onChange }) {
    const [text, setText] = useState(value);
    const [number, setNumber] = useState(numberValue);

    const handleTextChange = (e) => {
        const newValue = e.target.value;
        setText(newValue);
        if (onChange) {
            onChange(newValue, number);
        }
    };

    const handleNumberChange = (e) => {
        const newNumber = e.target.value;
        setNumber(newNumber);
        if (onChange) {
            onChange(text, newNumber);
        }
    };

    return (
        <div className="w-full p-4 bg-neutral-100 rounded-b-3xl">
            <span>
                <div className="px-3 py-1 text-zinc-700 text-sm underline">
                    Number Field
                </div>
            </span>

            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600 mb-2"
                type="text"
                placeholder="Text here..."
                value={text}
                onChange={handleTextChange}
            />
            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600"
                type="number"
                placeholder="Number here..."
                value={number}
                onChange={handleNumberChange}
            />
        </div>
    );
}

export default NumberInput;
