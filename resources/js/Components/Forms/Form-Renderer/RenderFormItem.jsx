function RenderFormItem({ item }) {
    let formItem;

    switch (item.type) {
        case "text":
        case "email":
        case "number":
            formItem = (
                <SimpleInput
                    type={item.type}
                    name={item.name}
                    required={item.required}
                />
            );
            break;
        case "file_upload":
        case "image_upload":
            formItem = (
                <FileUploadInput name={item.name} required={item.required} />
            );
            break;
        default:
            formItem = (
                <MultiChoiceInput
                    type={item.type}
                    name={item.name}
                    options={item.options}
                    required={item.required}
                />
            );
    }

    return formItem;
}

function prepareText(name) {
    return name.toLowerCase().trim().replaceAll(" ", "_");
}

function SimpleInput({ type, name, required }) {
    let preparedName = prepareText(name);

    return (
        <li className="mb-4">
            <label htmlFor={preparedName} className="block  mb-1">
                {name}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type={type}
                className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id={preparedName}
                name={preparedName}
                required={required}
            />
        </li>
    );
}

function FileUploadInput({ name, required }) {
    let preparedName = prepareText(name);

    return (
        <li className="mb-4">
            <label
                htmlFor={preparedName}
                className="block  font-medium text-gray-700 mb-1"
            >
                {name}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
                type="file"
                className="w-full px-3 py-2  text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                id={preparedName}
                name={preparedName}
                required={required}
            />
        </li>
    );
}

function MultiChoiceInput({ type, name, options, required }) {
    let preparedName = prepareText(name);
    let input;

    switch (type) {
        case "select":
            input = (
                <li className="mb-4">
                    <label
                        htmlFor={preparedName}
                        className="block  font-medium text-gray-700 mb-1"
                    >
                        {name}
                        {required && (
                            <span className="text-red-500 ml-1">*</span>
                        )}
                    </label>
                    <select
                        className="w-full px-3 py-2 bg-transparent border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        name={preparedName}
                        id={preparedName}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={prepareText(option)}>
                                {option}
                            </option>
                        ))}
                    </select>
                </li>
            );
            break;
        case "radio":
            input = (
                <li className="mb-4">
                    <fieldset>
                        <legend className=" font-medium text-gray-700 mb-1">
                            {name}
                            {required && (
                                <span className="text-red-500 ml-1">*</span>
                            )}
                        </legend>
                        <div className="mt-2 space-y-2">
                            {options.map((option) => {
                                const preparedOption = prepareText(option);
                                return (
                                    <div
                                        key={preparedOption}
                                        className="flex items-center"
                                    >
                                        <input
                                            type="radio"
                                            name={preparedName}
                                            id={preparedOption}
                                            value={preparedOption}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label
                                            htmlFor={preparedOption}
                                            className="ml-2 block  text-gray-700"
                                        >
                                            {option}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </fieldset>
                </li>
            );
            break;
    }

    return input;
}

export default RenderFormItem;
