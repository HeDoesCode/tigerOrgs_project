import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import FormBuilder from "@/Components/Forms/Form-Builder/FormBuilder";

function AdminFormBuilder() {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                        },
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                        },
                        {
                            icon: <IconHistory />,
                            label: "Form History",
                            link: "admin.formhistory",
                        },
                    ]}
                    title="Manage Recruitment Form"
                >
                    <FormBuilder />
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminFormBuilder;
