import FormRenderer from "@/Components/Forms/Form-Renderer/FormRenderer";
import { router, usePage } from "@inertiajs/react";

function Forms({ formLayout }) {
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
            <FormRenderer formLayout={formLayout} />;
            <button type="submit">Submit</button>
            <button type="reset">Clear Form</button>
            <button onClick={() => console.log(formLayout)}>Check Items</button>
        </form>
    );
}

export default Forms;
