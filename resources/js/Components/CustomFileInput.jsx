import { useState } from "react";
import IconFile from "./Icons/IconFile";

function CustomFileInput({ handleFileChange, fileType }) {
    const [fileName, setFileName] = useState("");

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
            handleFileChange(e, fileType);
        }
    };

    // Update the accept logic based on fileType
    const getAcceptedFileTypes = () => {
        switch (fileType) {
            case "Student File":
                return ".csv";
            case "Organization File":
                return ".json"; // You can change this if you need a different type
            default:
                return ""; // Default to any file type
        }
    };

    return (
        <div className="flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out">
            <label className="cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md">
                <span>Upload New {fileType}</span>
                <IconFile />
                <input
                    type="file"
                    accept={getAcceptedFileTypes()}
                    onChange={handleChange}
                    className="hidden"
                />
            </label>
            {fileName && <span className="ml-3 text-gray-700">{fileName}</span>}
        </div>
    );
}

export default CustomFileInput;
