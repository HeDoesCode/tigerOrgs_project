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
                <li className="mb-2 rounded-2xl px-2">
                    <input
                        className="w-full bg-transparent rounded-xl border-[1.5px] border-x-stone-600"
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
                <div className="flex justify-end ">
                    <li className="flex items-center gap-2 m-2 px-2 rounded-2xl border-black size-fit  ">
                        <input
                            className="rounded-2xl "
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

export default EditSimpleItem;
