import FormRenderer from "@/Components/Forms/Form-Renderer/FormRenderer";

function Forms({ formLayout }) {
    return (
        <form action="">
            <FormRenderer formLayout={formLayout} />;
            <button type="submit">Submit</button>
            <button type="reset">Clear Form</button>
            <button onClick={() => console.log(formLayout)}>Check Items</button>
        </form>
    );
}

export default Forms;
