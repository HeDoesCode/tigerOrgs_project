import { router, usePage } from "@inertiajs/react";
import RenderFormItem from "./RenderFormItem";
import Pre from "@/Components/Pre";

function FormRenderer({ formLayout }) {
    const { errors } = usePage().props; // Get validation errors from Inertia

    /**
     *
     * Pointers
     * - pa make sure na yung form description supported mahabang text
     *
     */

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
        <form action="" onSubmit={handleSubmit}>
            {/* <Pre object={formLayout["layout"]} /> */}
            <button
                type="button"
                onClick={() => console.log(formLayout["layout"])}
            >
                Log item
            </button>
            <h1>{formLayout["name"]}</h1>
            <p>{formLayout["desc"]}</p>
            {Object.keys(errors).length > 0 && (
                <div className="hi-arvin-alkuino">
                    <ul>
                        {Object.keys(errors).map((error, index) => (
                            <li key={index}>{errors[error]}</li>
                        ))}
                    </ul>
                </div>
            )}
            <ul>
                {formLayout["layout"].map((item) => {
                    return <RenderFormItem item={item} />;
                })}
                <li>
                    <button type="submit">Submit</button>
                </li>
                <li>
                    <button type="reset">Clear Form</button>
                </li>
            </ul>
        </form>
    );
}

export default FormRenderer;
