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
import React from "react";
import { usePage } from "@inertiajs/react";

function AdminInvite() {
    const { orgID, organizationName, members, officers } = usePage().props;
    console.log("Members:", members);

    const admin = members.filter((member) => member.roleID === 2);
    const member = members.filter((member) => member.roleID === 1);

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
                            {officers.map((officer) => (
                                <AdminMemberCard
                                    key={
                                        officer.user?.userID ||
                                        `officer-${index}`
                                    }
                                    isAdmin={true}
                                    name={`${officer.user?.firstname || ""} ${
                                        officer.user?.lastname || ""
                                    }`}
                                    position={officer.position || "N/A"}
                                    email={
                                        officer.user?.email ||
                                        "No email available"
                                    }
                                    college={
                                        officer.user?.college ||
                                        "Unknown College"
                                    }
                                />
                            ))}
                        </div>

                        <div className="pt-5 pl-5 flex justify-between">
                            <div className="poppins">Other Members:</div>
                        </div>
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-4 p-5">
                            {members.map((member, index) => (
                                <AdminMemberCard
                                    key={
                                        member.user?.userID || `member-${index}`
                                    } // Fallback to index if userID is missing
                                    isAdmin={officers.some(
                                        (officer) =>
                                            officer.user?.userID ===
                                            member.user?.userID
                                    )}
                                    name={`${member.user?.firstname || ""} ${
                                        member.user?.lastname || ""
                                    }`}
                                    email={
                                        member.user?.email ||
                                        "No email available"
                                    }
                                    college={
                                        member.user?.college ||
                                        "Unknown College"
                                    }
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
