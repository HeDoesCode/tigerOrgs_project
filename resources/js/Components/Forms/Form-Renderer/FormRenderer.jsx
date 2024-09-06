import RenderFormItem from "./RenderFormItem";

function FormRenderer({ formLayout }) {
    return (
        <ul>
            {formLayout.map((item, index) => {
                return <RenderFormItem key={index} item={item} />;
            })}
        </ul>
    );
}

export default FormRenderer;
