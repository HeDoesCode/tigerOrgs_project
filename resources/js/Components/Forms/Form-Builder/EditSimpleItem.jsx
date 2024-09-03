import { useForm } from "@inertiajs/react";
import { useContext } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";
import { useEffect } from "react";

function EditSimpleItem({ id, type }) {
    const defaultQuestion = `${type}_${id}`;

    const { data, setData, post, processing, errors } = useForm({
        question: defaultQuestion,
        required: false,
    });

    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

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
                        id={`required_${id}`}
                        onChange={() => setData("required", !data.required)}
                    />
                    <label htmlFor={`required_${id}`}> Required</label>
                </li>
                <li className="mb-2">
                    <input
                        className="w-full bg-transparent rounded-2xl border-1 border-x-stone-600"
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
                <li className="grid grid-cols-2">
                    <button
                        className="bg-gray-200 px-4 py-2 border  hover:bg-gray-300 "
                        type="reset"
                        onClick={() =>
                            setData({
                                question: defaultQuestion,
                                required: false,
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

export default EditSimpleItem;
