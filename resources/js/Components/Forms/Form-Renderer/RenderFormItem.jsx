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
    name = name.toLowerCase();
    name = name.trim();
    name = name.replaceAll(" ", "_");
    return name;
}

function SimpleInput({ type, name, required }) {
    let preparedName = prepareText(name);

    return (
        <li>
            <label htmlFor={preparedName}>
                {name}
                {required ? <span>*</span> : ""}
            </label>
            <input
                type={type}
                className="default"
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
        <li>
            <label htmlFor={preparedName}>
                {name}
                {required ? <span>*</span> : ""}
            </label>
            <input
                type="file"
                className="default"
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
                <li>
                    <label htmlFor={preparedName}>
                        {name}
                        {required ? <span>*</span> : ""}
                    </label>
                    <select name={preparedName} id={preparedName}>
                        {options.map((option, index) => {
                            return (
                                <option key={index} value={prepareText(option)}>
                                    {option}
                                </option>
                            );
                        })}
                    </select>
                </li>
            );
            break;
        case "radio":
            input = (
                <li>
                    <label>
                        {name}
                        {required ? <span>*</span> : ""}
                    </label>
                    {options.map((option) => {
                        const preparedOption = prepareText(option);
                        return (
                            <>
                                <input
                                    type="radio"
                                    name={preparedName}
                                    id={preparedOption}
                                    value={preparedOption}
                                />
                                <label htmlFor={preparedOption}>{option}</label>
                            </>
                        );
                    })}
                </li>
            );
            break;
    }

    return input;
}

export default RenderFormItem;
