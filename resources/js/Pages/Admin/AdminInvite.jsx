import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconInvite from "@/Components/Icons/IconInvite";
import AdminButton from "@/Components/Admin/AdminButton";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import AdminMemberCard from "@/Components/Admin/AdminMemberCard";

function AdminInvite() {
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Edit Page",
                            link: "admin.editpage",
                        },
                        {
                            icon: <IconInvite />,
                            label: "Members",
                            link: "admin.invite",
                        },
                    ]}
                >
                    <div>
                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Current Admin:</div>
                            <div className="flex justify-end me-5">
                                <AdminButton
                                    className="mr-2 bg-gray-300 hover:bg-white"
                                    icon={<IconBellFilled />}
                                    name="Send Notification"
                                />

                                <AdminButton
                                    className="mr-2 bg-gray-300 hover:bg-white"
                                    icon={<IconInvite />}
                                    name="Add Member Manually"
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 p-5">
                            <AdminMemberCard isAdmin />
                            <AdminMemberCard isAdmin />
                        </div>

                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Other Members:</div>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 p-5">
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
