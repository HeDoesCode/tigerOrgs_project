import React from "react";
function TextInput() {
    return (
        <div className="w-full p-4 m-1 bg-neutral-100 rounded-3xl">
            <span>
                <div className="px-3 py-1 text-zinc-700 text-sm underline">
                    For short texts, use Text Field
                </div>
            </span>

            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600"
                type="text"
                placeholder="Question here..."
            />
            <br />
            <div className="p-4 m-1 text-zinc-700">Answer texts .....</div>
        </div>
    );
}

export default TextInput;
