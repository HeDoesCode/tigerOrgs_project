import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import FormBuilder from "@/Components/Forms/Form-Builder/FormBuilder";

function AdminFormBuilder({ orgID, formData }) {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                            params: { orgID },
                        },
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                            params: { orgID },
                        },
                        {
                            icon: <IconHistory />,
                            label: "Form History",
                            link: "admin.formhistory",
                            params: { orgID },
                        },
                    ]}
                    title="Manage Recruitment Form"
                >
                    <FormBuilder orgID={orgID} formData={formData} />
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminFormBuilder;
