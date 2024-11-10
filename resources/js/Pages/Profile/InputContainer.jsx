import React from "react";

const InputContainer = ({ children, className, error, title }) => {
    const hasRequiredChild = React.Children.toArray(children).some(
        (child) => React.isValidElement(child) && child.props.required
    );

    const modifiedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            if (child.type === "input") {
                const existingClassName = child.props.className || "";
                return React.cloneElement(child, {
                    className: `${existingClassName} border-none h-full`.trim(),
                });
            }
            return child;
        }
        return child;
    });

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between gap-x-1 items-end">
                <label className="h-fit flex-1 flex-wrap leading-[1.15rem]">
                    {title}{" "}
                    {hasRequiredChild && (
                        <span className={`text-red-500 text-xl leading-3`}>
                            *
                        </span>
                    )}
                </label>
                <div
                    className={`mt-2 flex items-end text-[0.7rem] leading-[0.8rem] py-1 px-2 max-w-32 h-fit text-white rounded-t-lg bg-red-500 ${
                        error ? "" : "invisible"
                    }`}
                >
                    {error}
                </div>
            </div>
            <div
                className={`w-full min-h-9 bg-white border overflow-clip ${
                    error
                        ? "border-red-500 rounded-b-lg rounded-l-lg"
                        : "border-gray-300 rounded-lg"
                } ${className}`}
            >
                {modifiedChildren}
            </div>
        </div>
    );
};

export default InputContainer;
