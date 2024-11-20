import React from "react";

const FormResponseDisplay = ({ item, orgID, applicationID }) => {
    const renderValue = () => {
        if (!item.value)
            return <span className="text-gray-500">No response</span>;

        switch (item.type) {
            case "text":
            case "email":
            case "number":
            case "select":
            case "radio":
                return <span className="text-gray-700">{item.value}</span>;

            case "checkbox":
                return (
                    <div className="space-y-1">
                        {Array.isArray(item.value) &&
                            item.value.map((val, index) => (
                                <div key={index} className="flex items-center">
                                    <svg
                                        className="h-4 w-4 text-blue-500"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="ml-2 text-gray-700">
                                        {val}
                                    </span>
                                </div>
                            ))}
                    </div>
                );

            case "image_upload":
                if (typeof item.value === "object" && item.value.file_path) {
                    return (
                        <div className="space-y-2">
                            <div className="relative w-full max-w-md rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={`/admin/${orgID}/${applicationID}/file/view/${encodeURIComponent(
                                        item.value.file_path
                                    )}`}
                                    alt={item.value.original_filename}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>
                                    Original filename:{" "}
                                    {item.value.original_filename}
                                </p>
                                <p>
                                    Size: {formatFileSize(item.value.file_size)}
                                </p>
                                <p>
                                    Uploaded:{" "}
                                    {new Date(
                                        item.value.uploaded_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    );
                }
                return <span className="text-gray-500">No image uploaded</span>;

            case "file_upload":
                if (typeof item.value === "object" && item.value.file_path) {
                    return (
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <svg
                                    className="h-6 w-6 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                                <a
                                    href={`/admin/${orgID}/${applicationID}/file/view/${encodeURIComponent(
                                        item.value.file_path
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    {item.value.original_filename}
                                </a>
                            </div>
                            <div className="text-sm text-gray-500 space-y-1">
                                <p>
                                    Size: {formatFileSize(item.value.file_size)}
                                </p>
                                <p>Type: {item.value.mime_type}</p>
                                <p>
                                    Uploaded:{" "}
                                    {new Date(
                                        item.value.uploaded_at
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    );
                }
                return <span className="text-gray-500">No file uploaded</span>;

            default:
                return (
                    <span className="text-gray-500">
                        Unsupported response type
                    </span>
                );
        }
    };

    return (
        <li className="border-b border-gray-200 py-4 last:border-b-0">
            <div className="space-y-2">
                <h4 className="font-medium text-gray-900">
                    {item.name}
                    {item.required === "1" && (
                        <span className="text-red-500 ml-1">*</span>
                    )}
                </h4>
                <div className="ml-4">{renderValue()}</div>
            </div>
        </li>
    );
};

// Helper function to format file sizes
const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export default FormResponseDisplay;
