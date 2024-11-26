import { router, usePage, useForm } from "@inertiajs/react";
import RenderFormItem from "./RenderFormItem";
import { useEffect, useState } from "react";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";
import { Checkbox } from "@/Components/ui/checkbox";

function FormRenderer({ formLayout, orgID, formID }) {
    const { errors, flash } = usePage().props;

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [checkboxEmphasis, setCheckboxEmphasis] = useState(false);

    const { data, setData, post, reset } = useForm({
        userData: {},
        formLayout,
        orgID,
        formID,
    });

    useEffect(() => {
        if (flash?.old?.userData) {
            const oldUserData = flash.old.userData;
            const initialData = {};

            formLayout.layout.forEach((item) => {
                const name = prepareText(item.name);
                if (oldUserData[name] !== undefined) {
                    if (item.type === "checkbox") {
                        try {
                            initialData[name] =
                                typeof oldUserData[name] === "string"
                                    ? JSON.parse(oldUserData[name])
                                    : oldUserData[name];
                        } catch (e) {
                            initialData[name] = oldUserData[name];
                        }
                    } else {
                        initialData[name] = oldUserData[name];
                    }
                }
            });

            setData("userData", initialData);
        }
    }, [flash?.old, formLayout]);

    function handleFormChange(name, value) {
        setData("userData", {
            ...data.userData,
            [name]: value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (disableSubmit) {
            // console.log("prevent submit");
            setCheckboxEmphasis(true);
            return;
        }

        post(route("formSubmission", { orgID, formID }), {
            preserveState: true,
            preserveScroll: true,
            onError: (errors) => {
                console.error("Form submission errors:", errors);
            },
        });
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <form
                    className="bg-white shadow-md rounded-lg overflow-hidden"
                    onSubmit={handleSubmit}
                >
                    <div className="px-6 py-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">
                            {formLayout.name}
                        </h1>
                        {formLayout.desc && (
                            <p className="text-gray-600 mb-8">
                                {formLayout.desc}
                            </p>
                        )}
                        {Object.keys(errors).length > 0 && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-red-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-medium text-red-800">
                                            There were errors with your
                                            submission
                                        </h3>
                                        <ul className="mt-2 text-red-700 list-disc list-inside">
                                            {Object.keys(errors).map(
                                                (error, index) => (
                                                    <li key={index}>
                                                        {errors[error]}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                        <ul className="space-y-6">
                            {formLayout.layout.map((item, index) => (
                                <RenderFormItem
                                    key={index}
                                    item={item}
                                    value={
                                        data.userData[prepareText(item.name)]
                                    }
                                    onChange={(value) =>
                                        handleFormChange(
                                            prepareText(item.name),
                                            value
                                        )
                                    }
                                />
                            ))}
                        </ul>
                        <div
                            className={`flex items-center mt-7 text-sm w-fit ${
                                checkboxEmphasis &&
                                "outline outline-1 outline-red-500 px-3 bg-red-50 rounded-lg"
                            }`}
                        >
                            <input
                                id="permit"
                                type="checkbox"
                                className={
                                    checkboxEmphasis ? "border-red-500" : ""
                                }
                                onChange={(e) => {
                                    setDisableSubmit(!e.target.checked);
                                }}
                            />
                            <label
                                htmlFor="permit"
                                className={`cursor-pointer pl-2 h-10 flex items-center select-none ${
                                    checkboxEmphasis && "text-red-500 font-bold"
                                }`}
                            >
                                "I confirm that all information provided above
                                is correct."
                            </label>
                        </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50 flex justify-between">
                        <AdminAlertDialog
                            trigger={
                                <div
                                    type="reset"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Clear Form
                                </div>
                            }
                            title={`Are you sure you want to reset all the inputs in the form?`}
                            accept="Confirm"
                            onclick={() => reset()}
                        />
                        <button
                            type="submit"
                            className={`inline-flex items-center px-4 py-2 border border-transparent font-medium rounded-md shadow-sm text-white bg-[#04aa6dd5] hover:bg-[#04AA6D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                                disableSubmit && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function prepareText(name) {
    return name.toLowerCase().trim().replaceAll(" ", "_");
}

export default FormRenderer;
