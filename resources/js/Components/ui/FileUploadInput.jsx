function FileUploadInput({ value = "", onChange }) {
    const handleQuestionChange = (e) => {};
    return (
        <div className="w-full p-4 bg-neutral-100 rounded-b-3xl">
            <div className="px-3 py-1 text-zinc-700 text-sm underline">
                File Upload
            </div>
            <input
                className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600 mb-2"
                type="text"
                placeholder="Text here..."
            />
            <input type="file" accept=".pdf,.jpg,.png" />
        </div>
    );
}

export default FileUploadInput;
