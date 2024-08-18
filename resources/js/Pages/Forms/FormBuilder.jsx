import React from "react";
import { ReactFormBuilder } from "react-form-builder2";
import "react-form-builder2/dist/app.css";
import AdminLayout from "@/Layouts/AdminLayout";
import FormElementsEdit from "./FormElementsEdit"; // Import here

function FormBuilder() {
    const items = [
        {
            key: "Header",
            name: "Header Text",
            icon: "fa fa-header",
            static: true,
            content: "Placeholder Text...",
        },
        {
            key: "Paragraph",
            name: "Paragraph",
            static: true,
            icon: "fa fa-paragraph",
            content: "Placeholder Text...",
        },
    ];

    const handleUpdate = (formData) => {
        // Handle form update
    };

    const handleSubmit = () => {
        // Handle form submission
    };

    return (
        <div className="w-full">
            <AdminLayout>
                <div className="my-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Custom Form Builder
                    </h2>
                    <ReactFormBuilder
                        edit
                        customToolbarItems={items}
                        onChange={handleUpdate}
                        onSubmit={handleSubmit}
                        renderEditForm={(props) => (
                            <FormElementsEdit {...props} />
                        )}
                    />
                </div>
            </AdminLayout>
        </div>
    );
}

export default FormBuilder;
