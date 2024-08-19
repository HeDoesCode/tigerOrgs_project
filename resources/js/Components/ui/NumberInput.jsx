function NumberInput() {
    return (
        <div className="w-full p-4 bg-neutral-100 rounded-b-3xl">
            <span>
                <div className="px-3 py-1 text-zinc-700 text-sm underline">
                    Number Field
                </div>
            </span>

            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600"
                type="text"
                placeholder="Question here..."
            />
            <div className="p-2">
                <input className="" type="number" placeholder="Number Input" />
            </div>
        </div>
    );
}

export default NumberInput;
