import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import Home from "../Organizations/Home";
import IconEdit from "@/Components/Icons/IconEdit";

function AdminEditPage({ pageData, pageLayoutData, orgID }) {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconEdit />,
                            label: "Edit Page",
                            link: "admin.editpage",
                            params: { orgID },
                        },
                        {
                            icon: <IconInvite />,
                            label: "Members",
                            link: "admin.invite",
                            params: { orgID },
                        },
                    ]}
                    title="Edit Organization's Page"
                >
                    <div className="p-5">
                        <Home
                            editing={true}
                            recruiting={false} //example lang
                            pageData={pageData}
                            pageLayoutData={pageLayoutData}
                        />
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminEditPage;
