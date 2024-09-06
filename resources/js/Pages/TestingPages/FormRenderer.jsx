function FormRenderer({ formLayout }) {
    return (
        <div>
            Hello Testing{" "}
            <button onClick={() => console.log(formLayout)}>Test</button>
        </div>
    );
}

export default FormRenderer;
