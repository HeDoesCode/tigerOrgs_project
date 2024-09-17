import { Head, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconInvite from "@/Components/Icons/IconInvite";
import AdminButton from "@/Components/Admin/AdminButton";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import AdminMemberCard from "@/Components/Admin/AdminMemberCard";
import IconEdit from "@/Components/Icons/IconEdit";
import AdminDialog from "@/Components/Admin/AdminDialog";
import React from "react";

function AdminInvite() {
    const { orgID, organizationName, members, admins, officers } =
        usePage().props;
    console.log(admins);
    console.log(members);

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
                    title={`Admin Invitation - ${organizationName}`}
                >
                    <div>
                        <div className="flex justify-end me-5 mt-5">
                            {/* Dialog for Sending Notification */}
                            <AdminDialog
                                title="Send Notification"
                                description="Send Notification to the members of your Organization"
                                trigger={
                                    <AdminButton
                                        className="mr-2 sm:mt-0 bg-white hover:bg-gray-800 hover:text-white"
                                        icon={<IconBellFilled />}
                                        name="Send Notification"
                                    />
                                }
                            />
                            {/* Dialog for Adding Member Manually */}
                            <AdminDialog
                                title="Add Member Manually"
                                description="Search to add manually to the Organization"
                                trigger={
                                    <AdminButton
                                        className="mr-2 sm:mt-0 bg-white hover:bg-gray-800 hover:text-white"
                                        icon={<IconInvite />}
                                        name="Add Member Manually"
                                    />
                                }
                            />
                        </div>
                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Current Admin(s):</div>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5">
                            {admins.map((admin, index) => (
                                <AdminMemberCard
                                    key={admin.userID || `admin-${index}`}
                                    isAdmin={true}
                                    name={`${admin.firstname} ${admin.lastname}`}
                                    position={admin.position}
                                    email={admin.email || "No email available"}
                                    college={admin.college || "N/A"}
                                />
                            ))}
                        </div>
                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Other Members:</div>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5">
                            {members.map((member, index) => (
                                <AdminMemberCard
                                    key={member.userID || `member-${index}`}
                                    isAdmin={false}
                                    name={`${member.firstname} ${member.lastname}`}
                                    position={member.position}
                                    email={member.email || "No email available"}
                                    college={member.college || "N/A"}
                                />
                            ))}
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminInvite;
