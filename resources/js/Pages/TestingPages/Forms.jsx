import FormRenderer from "@/Components/Forms/Form-Renderer/FormRenderer";
import { router, usePage } from "@inertiajs/react";

function Forms({ formLayout }) {
    const { errors } = usePage().props; // Get validation errors from Inertia

    function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formObject = {};

        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        router.post("/form/submit", {
            userData: formObject,
            formLayout: formLayout,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
                <div className="hi-arvin-alkuino">
                    <ul>
                        {Object.keys(errors).map((error, index) => (
                            <li key={index}>{errors[error]}</li>
                        ))}
                    </ul>
                </div>
            )}
            <FormRenderer formLayout={formLayout} />

            <button type="submit">Submit</button>
            <button type="reset">Clear Form</button>
            <button type="button" onClick={() => console.log(errors)}>
                Yes
            </button>
        </form>
    );
}

export default Forms;
