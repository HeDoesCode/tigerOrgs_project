import { useContext } from "react";
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
        const updatedOptions = data.options.filter((_, i) => i !== index);
        setData("options", updatedOptions);
    }

    function handleSave(e) {
        e.preventDefault();
        handleEditItem(id, data);
    }

    return (
        <form onSubmit={handleSave}>
            <ul>
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
                    <input
                        type="checkbox"
                        id="required"
                        onChange={() => setData("required", !data.required)}
                    />
                    <label htmlFor="required"> Required</label>
                </li>
                <li className="mb-2">
                    {data.options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
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
                        </div>
                    ))}
                    <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 w-full"
                        type="button"
                        onClick={handleAddOption}
                    >
                        + Add Option
                    </button>
                </li>
                <li className="grid grid-cols-3">
                    <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 "
                        type="submit"
                    >
                        Save
                    </button>
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
