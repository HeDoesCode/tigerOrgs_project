import { useContext, useEffect } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";
import { useForm } from "@inertiajs/react";

function EditMultiChoiceItem({ id, type }) {
    const defaultQuestion = `${type}_${id}`;

    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

    const { data, setData, post, processing, errors } = useForm({
        question: defaultQuestion,
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
                <li className="mb-2 rounded-2xl px-2">
                    <input
                        className="w-full bg-transparent rounded-xl border-1 border-x-stone-600"
                        type="text"
                        value={data.question}
                        onChange={(e) => setData("question", e.target.value)}
                        onBlur={(e) => {
                            e.target.value === ""
                                ? setData("question", defaultQuestion)
                                : setData("question", e.target.value);
                        }}
                        placeholder="Type Question here..."
                        required
                    />
                </li>

                <li className="mb-2 px-2">
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
                                    onBlur={(e) => {
                                        e.target.value === ""
                                            ? handleEditOption(
                                                  index,
                                                  `Option ${index + 1}`
                                              )
                                            : handleEditOption(
                                                  index,
                                                  e.target.value
                                              );
                                    }}
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
                <li className="mb-2 px-2">
                    <button
                        className=" rounded-xl bg-gray-200 px-4 py-2 border hover:bg-gray-300 w-full transition ease-in-out diuration-200"
                        type="button"
                        onClick={handleAddOption}
                    >
                        + Add Option
                    </button>
                </li>
                <div className="flex justify-end ">
                    <li className="flex items-center gap-2 m-2 px-2 rounded-2xl border-black size-fit  ">
                        <input
                            className="rounded-2xl"
                            type="checkbox"
                            id={`required_${id}`}
                            onChange={() => setData("required", !data.required)}
                        />
                        <label htmlFor={`required_${id}`}> Required</label>
                        <label className="">|</label>
                        <button
                            className=" py-2 underline text-red-500 "
                            onClick={() => handleDeleteItem(id)}
                        >
                            Delete Item
                        </button>
                    </li>
                </div>
                <li className="grid grid-cols-2">
                    {/* <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 "
                        type="reset"
                        onClick={() =>
                            setData({
                                question: defaultQuestion,
                                required: false,
                                options: ["option 1", "option 2", "option 3"],
                            })
                        }
                    >
                        Reset
                    </button> */}
                </li>
            </ul>
        </form>
    );
}

export default EditMultiChoiceItem;
