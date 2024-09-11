import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconInvite from "@/Components/Icons/IconInvite";
import AdminButton from "@/Components/Admin/AdminButton";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import AdminMemberCard from "@/Components/Admin/AdminMemberCard";
import IconEdit from "@/Components/Icons/IconEdit";
import AdminDialog from "@/Components/Admin/AdminDialog";

function AdminInvite({ orgID }) {
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
                    title="Admin Invitation"
                >
                    <div>
                        <div className="flex justify-end me-5 mt-5">
                            <AdminDialog
                                title="Send Notification"
                                description="Send Notification to the members of your Organization"
                                trigger={
                                    <AdminButton
                                        className="mr-2  sm:mt-0 bg-white hover:bg-gray-800 hover:text-white"
                                        icon={<IconBellFilled />}
                                        name="Send Notification"
                                    />
                                }
                            ></AdminDialog>

                            <AdminDialog
                                title="Add Member Manually"
                                description="Search to add manually to the Organization"
                                trigger={
                                    <AdminButton
                                        className="mr-2   sm:mt-0 bg-white hover:bg-gray-800 hover:text-white"
                                        icon={<IconInvite />}
                                        name="Add Member Manually"
                                    />
                                }
                            ></AdminDialog>
                        </div>

                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Current Admin:</div>
                        </div>

                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5">
                            <AdminMemberCard isAdmin />
                            <AdminMemberCard isAdmin />
                        </div>

                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Other Members:</div>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5">
                            <AdminMemberCard />
                            <AdminMemberCard />
                            <AdminMemberCard />
                            <AdminMemberCard />
                            <AdminMemberCard />
                            <AdminMemberCard />
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminInvite;
