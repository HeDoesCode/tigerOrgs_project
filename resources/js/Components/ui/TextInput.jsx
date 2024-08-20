import React from "react";
function TextInput({ value = "", onChange }) {
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        if (onChange) {
            onChange(newValue);
        }
    };
    return (
        <div
            className="w-full p-4  bg-neutral-100 rounded-b-3xl

"
        >
            <span>
                <div className="px-3 py-1 text-zinc-700 text-sm underline">
                    Text Field
                </div>
            </span>

            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600"
                type="text"
                placeholder="Question here..."
                value={value}
                onChange={handleInputChange}
            />
            <br />
            <div className="p-4 m-1 text-zinc-700">Answer texts .....</div>
        </div>
    );
}

export default TextInput;
