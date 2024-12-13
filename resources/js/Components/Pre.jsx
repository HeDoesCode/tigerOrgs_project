function Pre({ object }) {
    return (
        <pre
            style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                fontSize: "0.85rem",
            }}
        >
            {JSON.stringify(object, null, 2)}
        </pre>
    );
}

export default Pre;
