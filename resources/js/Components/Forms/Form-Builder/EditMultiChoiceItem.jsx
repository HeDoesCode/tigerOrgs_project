import { useContext, useEffect } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";
import { useForm } from "@inertiajs/react";

function EditMultiChoiceItem({ id }) {
    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

    const { data, setData, post, processing, errors } = useForm({
        question: "",
        required: false,
        options: ["option 1", "option 2", "option 3"],
    });

    function handleAddOption() {
        const updatedOptions = [
            ...data.options,
            `option ${data.options.length + 1}`,
        ];
        setData("options", updatedOptions);
    }

    function handleEditOption(index, value) {
        const updatedOptions = [...data.options];
        updatedOptions[index] = value;
        setData("options", updatedOptions);
    }

    function handleDeleteOption(index) {
        if (data.options.length === 1) {
            alert("Options cannot be empty");
            return;
        }

        const updatedOptions = data.options.filter((_, i) => i !== index);
        setData("options", updatedOptions);
    }

    function handleSave(e) {
        e.preventDefault();
        handleEditItem(id, data);
    }

    useEffect(() => {
        handleEditItem(id, data);
    }, [data]);

    return (
        <form onSubmit={handleSave}>
            <ul>
                <li className="flex items-center gap-2 p-2">
                    <input
                        type="checkbox"
                        id="required"
                        onChange={() => setData("required", !data.required)}
                    />
                    <label htmlFor="required"> Required</label>
                </li>
                <li className="mb-2">
                    <input
                        className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600"
                        type="text"
                        value={data.question}
                        onChange={(e) => setData("question", e.target.value)}
                        placeholder="Type Question here..."
                        required
                    />
                </li>

                <li className="mb-2">
                    <ul>
                        {data.options.map((option, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <input
                                    className="w-full p-1 rounded border border-gray-300"
                                    type="text"
                                    value={option}
                                    onChange={(e) =>
                                        handleEditOption(index, e.target.value)
                                    }
                                />

                                <button
                                    className="ml-2 text-red-500"
                                    onClick={() => handleDeleteOption(index)}
                                    type="button"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="mb-2">
                    <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 w-full"
                        type="button"
                        onClick={handleAddOption}
                    >
                        + Add Option
                    </button>
                </li>
                <li className="grid grid-cols-2">
                    <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 "
                        type="reset"
                        onClick={() =>
                            setData({
                                question: "",
                                required: false,
                                options: ["option 1", "option 2", "option 3"],
                            })
                        }
                    >
                        Reset
                    </button>
                    <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 "
                        onClick={() => handleDeleteItem(id)}
                    >
                        Delete
                    </button>
                </li>
            </ul>
        </form>
    );
}

export default EditMultiChoiceItem;
