import { useForm } from "@inertiajs/react";
import { useContext } from "react";
import { FormActionsContext } from "../Context/FormActionsContext";

function EditSimpleItem({ id }) {
    const { data, setData, post, processing, errors } = useForm({
        question: "",
        required: false,
    });

    const { delete: handleDeleteItem, edit: handleEditItem } =
        useContext(FormActionsContext);

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
