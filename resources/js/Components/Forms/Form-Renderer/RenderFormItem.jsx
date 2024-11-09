import React, { useState, useEffect } from "react";

function RenderFormItem({ item, value, onChange }) {
    const name = prepareText(item.name);

    switch (item.type) {
        case "text":
        case "email":
        case "number":
            return (
                <SimpleInput
                    type={item.type}
                    name={item.name}
                    required={item.required}
                    value={value || ""}
                    onChange={onChange}
                />
            );
        case "file_upload":
            return (
                <FileUploadInput
                    name={item.name}
                    required={item.required}
                    onChange={onChange}
                    accept=".pdf,.doc,.docx"
                />
            );
        case "image_upload":
            return (
                <ImageUploadInput
                    name={item.name}
                    required={item.required}
                    onChange={onChange}
                    allowedTypes={
                        item.allowedTypes || ["image/jpeg", "image/png"]
                    }
                />
            );
        case "checkbox":
            return (
                <CheckboxInput
                    name={item.name}
                    options={item.options}
                    required={item.required}
                    value={
                        value
                            ? typeof value === "string"
                                ? JSON.parse(value)
                                : value
                            : []
                    }
                    onChange={onChange}
                />
            );
        case "select":
        case "radio":
            return (
                <MultiChoiceInput
                    type={item.type}
                    name={item.name}
                    options={item.options}
                    required={item.required}
                    value={value || ""}
                    onChange={onChange}
                />
            );
        default:
            return null;
    }
}

function prepareText(name) {
    return name.toLowerCase().trim().replaceAll(" ", "_");
}

function SimpleInput({ type, name, required, value, onChange }) {
    const preparedName = prepareText(name);

    return (
        <li className="mb-4">
            <label htmlFor={preparedName} className="block mb-1">
                {name}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id={preparedName}
                name={preparedName}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </li>
    );
}

function FileUploadInput({ name, required, onChange, accept }) {
    const preparedName = prepareText(name);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange(file);
        }
    };

    return (
        <li className="mb-4">
            <label
                htmlFor={preparedName}
                className="block font-medium text-gray-700 mb-1"
            >
                {name}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type="file"
                className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id={preparedName}
                name={preparedName}
                required={required}
                accept={accept}
                onChange={handleFileChange}
            />
        </li>
    );
}

function ImageUploadInput({ name, required, onChange, allowedTypes }) {
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const preparedName = prepareText(name);
    const MAX_SIZE_MB = 5;
    const MAX_SIZE = MAX_SIZE_MB * 1024 * 1024; // 5MB in bytes

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setError("");
        setPreview(null);

        if (!file) return;

        // Validate file type
        if (!allowedTypes.includes(file.type)) {
            setError(
                `Invalid file type. Please upload a ${allowedTypes
                    .map((type) => type.split("/")[1])
                    .join(" or ")} file.`
            );
            e.target.value = "";
            return;
        }

        // Validate file size
        if (file.size > MAX_SIZE) {
            setError(`File size must be less than ${MAX_SIZE_MB}MB`);
            e.target.value = "";
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
            onChange(file); // Send the file to parent component
        };
        reader.readAsDataURL(file);
    };

    return (
        <li className="mb-4">
            <label htmlFor={preparedName} className="block mb-1">
                {name}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
                <input
                    type="file"
                    className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id={preparedName}
                    name={preparedName}
                    required={required}
                    accept={allowedTypes.join(",")}
                    onChange={handleFileChange}
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
                <p className="text-sm text-gray-500">
                    Max file size: {MAX_SIZE_MB}MB. Accepted formats:{" "}
                    {allowedTypes
                        .map((type) => type.split("/")[1].toUpperCase())
                        .join(", ")}
                </p>
                {preview && (
                    <div className="mt-2">
                        <img
                            src={preview}
                            alt="Preview"
                            className="max-w-xs h-auto rounded-lg border border-gray-200"
                        />
                    </div>
                )}
            </div>
        </li>
    );
}

function CheckboxInput({ name, options, required, value = [], onChange }) {
    const preparedName = prepareText(name);
    const [error, setError] = useState(false);

    const preparedValues = Array.isArray(value)
        ? value.map((v) => prepareText(v))
        : [];

    const handleCheckboxChange = (event) => {
        const { value: checkboxValue, checked } = event.target;
        let updatedValues;

        if (checked) {
            updatedValues = [...preparedValues, checkboxValue];
        } else {
            if (preparedValues.length === 1 && required) {
                setError(true);
                return;
            }
            updatedValues = preparedValues.filter((v) => v !== checkboxValue);
        }

        setError(required && updatedValues.length === 0);

        onChange(
            updatedValues
                .map(
                    (prepared) =>
                        options.find((opt) => prepareText(opt) === prepared) ||
                        prepared
                )
                .map((opt) => prepareText(opt))
        );
    };

    return (
        <li className="mb-4">
            <fieldset>
                <legend className="block font-medium text-gray-700 mb-1">
                    {name}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </legend>
                <div className="space-y-2">
                    {options.map((option, index) => {
                        const preparedOption = prepareText(option);
                        return (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    name={preparedName}
                                    id={`${preparedName}-${index}`}
                                    value={preparedOption} // Important: Use prepared value here
                                    checked={preparedValues.includes(
                                        preparedOption
                                    )}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label
                                    htmlFor={`${preparedName}-${index}`}
                                    className="ml-2 block text-gray-700"
                                >
                                    {option}
                                </label>
                            </div>
                        );
                    })}
                </div>
                {error && (
                    <p className="text-sm text-red-600">
                        Please select at least one option.
                    </p>
                )}
            </fieldset>
        </li>
    );
}

function MultiChoiceInput({ type, name, options, required, value, onChange }) {
    const preparedName = prepareText(name);

    if (type === "select") {
        return (
            <li className="mb-4">
                <label
                    htmlFor={preparedName}
                    className="block font-medium text-gray-700 mb-1"
                >
                    {name}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <select
                    className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    name={preparedName}
                    id={preparedName}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    required={required}
                >
                    {required ? (
                        <option value="" disabled>
                            Please select an option
                        </option>
                    ) : (
                        <option value="">No option selected</option>
                    )}

                    {options.map((option, index) => (
                        <option key={index} value={prepareText(option)}>
                            {option}
                        </option>
                    ))}
                </select>
            </li>
        );
    }

    if (type === "radio") {
        return (
            <li className="mb-4">
                <fieldset>
                    <legend className="font-medium text-gray-700 mb-1">
                        {name}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </legend>
                    <div className="space-y-2">
                        {!required && (
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name={preparedName}
                                    id={`${name}-none`}
                                    value=""
                                    checked={value === ""}
                                    onChange={(e) => onChange(e.target.value)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label
                                    htmlFor={`${name}-none`}
                                    className="ml-2 block text-gray-700"
                                >
                                    No Option Selected
                                </label>
                            </div>
                        )}

                        {options.map((option, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="radio"
                                    name={preparedName}
                                    id={`${name}-${index}`}
                                    value={prepareText(option)}
                                    checked={value === prepareText(option)}
                                    onChange={(e) => onChange(e.target.value)}
                                    required={required}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <label
                                    htmlFor={`${name}-${index}`}
                                    className="ml-2 block text-gray-700"
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </li>
        );
    }

    return null;
}

export default RenderFormItem;
