import { useForm } from "@inertiajs/react";

function EditPropertiesForm() {
    const { data, setData, post, processing, errors } = useForm({
        question: "",
        desription: "",
        required: false,
    });

    function handleSave(e) {
        e.preventDefault();
        console.log(data);
    }
    return (
        <form onSubmit={handleSave}>
            <ul>
                <li>
                    <label htmlFor="question">Question</label>
                    <input
                        type="text"
                        id="question"
                        value={data.question}
                        onChange={(e) => setData("question", e.target.value)}
                        required
                    />
                </li>
                <li>
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={data.desription}
                        onChange={(e) => setData("desription", e.target.value)}
                    />
                </li>
                <li>
                    <input
                        type="checkbox"
                        id="required"
                        onChange={() => setData("required", !data.required)}
                    />
                    <label htmlFor="required">Required</label>
                </li>
                <li>
                    <button type="submit">Save</button>
                    <button type="reset">Reset</button>
                </li>
            </ul>
        </form>
    );
}

export default EditPropertiesForm;
