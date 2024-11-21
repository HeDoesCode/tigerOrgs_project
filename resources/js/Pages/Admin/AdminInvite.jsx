import { Head, router, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import AdminButton from "@/Components/Admin/AdminButton";
import AdminMemberCard from "@/Components/Admin/AdminMemberCard";
import AdminDialog from "@/Components/Admin/AdminDialog";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import IconInvite from "@/Components/Icons/IconInvite";
import IconEdit from "@/Components/Icons/IconEdit";
import Searchbar from "@/Components/Searchbar";
import React from "react";
import { useState } from "react";
import VerticalCard from "@/Components/VerticalCard";
import AdminDialogForInvite from "@/Components/Admin/AdminDialogForInvite";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";

function AdminInvite({ members, admins, orgID, organizationName }) {
    //searching users
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    //search for users
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get(
                    `/admin/${orgID}/search-users`,
                    {
                        params: { query },
                    }
                );

                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    //invite
    const handleInvite = (e) => {
        console.log(orgID);
        console.log(data.userID);

        post(`/admin/${orgID}/addMember/${data.userID}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    //form for inviting member
    const { data, setData, post, processing, errors } = useForm({
        userID: "",
        orgID: orgID,
        roleID: 1,
    });

    const getUser = (userID) => {
        setData("userID", userID);
    };

    // const { data, setData } = useForm({
    //     allMembers: members,
    //     allAdmins: admins,
    // });

    // const [currentMembers, setCurrentMembers] = useState()

    // const updateAllMembers = (updatedMembers) =>
    //     setData("allMembers", updatedMembers);
    // const updateAllAdmins = (updatedAdmins) =>
    //     setData("allAdmins", updatedAdmins);

    //for making announcements
    const [values, setValues] = useState({
        orgID: orgID,
        message: "",
    });

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        router.post(`/admin/${orgID}/makeAnnouncement`, values);
    }

    const maxTextLength = 1500;

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
                        <div className="flex justify-end me-5 mt-5 ">
                            {/* Dialog for Sending Notification */}
                            <AdminDialog
                                title="Send Announcement"
                                description="Send Notification to the members of your Organization"
                                trigger={
                                    <AdminButton
                                        asChild
                                        className="mr-2 sm:mt-0 py-2 bg-white hover:bg-gray-800 hover:text-white duration-300"
                                        icon={<IconBellFilled />}
                                        name="Send Announcement"
                                    />
                                }
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-4"
                                >
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="name"
                                            className="block  font-medium text-gray-700"
                                        >
                                            Message:
                                        </label>
                                        <textarea
                                            id="message"
                                            value={values.message}
                                            onChange={handleChange}
                                            maxLength={maxTextLength}
                                            className="block w-full px-4 h-44 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Type here your announcement"
                                            required
                                        />
                                        <div className="font-bold text-sm text-red-500">
                                            {values.message.length ==
                                                maxTextLength &&
                                                `Max. length ${maxTextLength} reached.`}
                                        </div>
                                    </div>

                                    <div className="mt-4 grid justify-items-end">
                                        <button
                                            type="submit"
                                            className="flex px-9  shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white "
                                        >
                                            <span className="ml-2  poppins truncate sm:block">
                                                Announce
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            </AdminDialog>
                            {/* Dialog for Adding Member Manually */}

                            <AdminDialog
                                title="Add Member Manually"
                                description="Search to add manually to the Organization"
                                trigger={
                                    <AdminButton
                                        asChild
                                        className="mr-2 sm:mt-0 py-2 bg-white hover:bg-gray-800 hover:text-white duration-300"
                                        icon={<IconInvite />}
                                        name="Add Member Manually"
                                    />
                                }
                            >
                                <Searchbar
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder={"Search by name or email"}
                                />
                                <div>
                                    {searchResults.map((user) => (
                                        <VerticalCard
                                            key={user.userID}
                                            gridcol="grid-col-1 md:grid-cols-4"
                                        >
                                            <div className="text-sm font-bold content-center text-center">
                                                {user.firstname} {user.lastname}
                                            </div>
                                            <div className="truncate col-span-2 content-center text-sm font-semibold text-center">
                                                {user.email}
                                            </div>
                                            <div className="sm px-4 text-sm content-center justify-self-center ">
                                                <AdminAlertDialog
                                                    trigger={
                                                        <div
                                                            role="button"
                                                            className="mr-2 bg-white flex items-center justify-center px-9  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white"
                                                            name="Assign"
                                                            onClick={() => {
                                                                getUser(
                                                                    user.userID
                                                                );
                                                            }}
                                                            // onClick={handleInvite}
                                                        >
                                                            <IconInvite />
                                                            <span className="ml-2 poppins hidden truncate sm:block">
                                                                Assign
                                                            </span>
                                                        </div>
                                                    }
                                                    title={`Add ${user.firstname} ${user.lastname} to the organization?`}
                                                    description="This adds the chosen user to the organization."
                                                    accept="Confirm"
                                                    onclick={handleInvite}
                                                />
                                            </div>
                                        </VerticalCard>
                                    ))}
                                </div>
                            </AdminDialog>
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
                                    position={admin.position || "Member"}
                                    email={admin.email || "No email available"}
                                    college={admin.college || "N/A"}
                                    userID={admin.userID}
                                    orgID={orgID}
                                    roleID={2}
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
                                    position={member.position || "Member"}
                                    email={member.email || "No email available"}
                                    college={member.college || "N/A"}
                                    userID={member.userID}
                                    orgID={orgID}
                                    roleID={1}
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
