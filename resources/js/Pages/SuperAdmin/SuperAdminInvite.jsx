import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, useForm } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import VerticalCard from "@/Components/VerticalCard";
import AdminButton from "@/Components/Admin/AdminButton";
import IconBellFilled from "@/Components/Icons/IconBellFilled";
import DotsVertical from "@/Components/DotsVertical";
import { useState, useEffect } from "react";
import Searchbar from "@/Components/Searchbar";
import AdminDialog from "@/Components/Admin/AdminDialog";
import AdminDropdownMenu from "@/Components/Admin/AdminDropdownMenu";
import AdminOrgInvCard from "@/Components/Admin/AdminOrgInvCard";
import axios from "axios";

function SuperAdminInvite({ users, organizations, userRoles }) {
    //for searching and filtering of user and organization
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [availableOrganizations, setAvailableOrganizations] =
        useState(organizations);
    const [filteredOrganizations, setFilteredOrganizations] =
        useState(organizations);
    const [orgSearchQuery, setOrgSearchQuery] = useState("");

    //for highlighting the org card
    const [selectedOrg, setSelectedOrg] = useState(0);

    //for assigning user that will be checked if it is already an admin of that org
    const [currentUserID, setCurrentUserID] = useState(null);
    const currentUserRoles = userRoles.filter(
        (role) => role.userID === currentUserID
    );

    //for form submission
    const { data, setData, post, processing, errors } = useForm({
        userID: "",
        orgID: "",
        roleID: 2,
    });

    //search for users
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            try {
                const response = await axios.get("/superadmin/search-users", {
                    params: { query },
                });

                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching result:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    //search for org
    useEffect(() => {
        const filterOrganizations = () => {
            let filtered = availableOrganizations;

            if (orgSearchQuery) {
                filtered = filtered.filter(
                    (org) =>
                        org.name
                            .toLowerCase()
                            .includes(orgSearchQuery.toLowerCase()) ||
                        org.department
                            .toLowerCase()
                            .includes(orgSearchQuery.toLowerCase())
                );
            }

            setFilteredOrganizations(filtered);
        };

        filterOrganizations();
    }, [orgSearchQuery, availableOrganizations]);

    const handleOrgSearchChange = (e) => {
        setOrgSearchQuery(e.target.value);
    };

    //invite logic

    const getUser = (userID) => {
        setData("userID", userID);
        setCurrentUserID(userID);
    };

    const getOrg = (orgID) => {
        setData("orgID", orgID);
        setSelectedOrg(orgID);
    };

    const handleInvite = (e) => {
        e.preventDefault();

        post(route("superadmin.add-admin"));
    };

    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Status",
                            link: "superadmin.status",
                        },
                        {
                            icon: <IconInvite />,
                            label: "Invite",
                            link: "superadmin.invite",
                        },
                    ]}
                    title="Role Invitation"
                >
                    <div>
                        <div className="flex justify-end me-5 mt-5">
                            <AdminDialog
                                title="Assign Role for Student"
                                description="Search for a student and assign them to be the
                        administrator of their organization."
                                trigger={
                                    <div
                                        role="button"
                                        className="mr-2 bg-white flex px-9  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white"
                                        name="Assign"
                                    >
                                        <IconInvite />
                                        <span className="ml-2 poppins hidden truncate sm:block">
                                            Invite
                                        </span>
                                    </div>
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
                                            gridcol="grid-cols-4"
                                        >
                                            <div className="text-sm font-bold content-center text-center">
                                                {user.firstname} {user.lastname}
                                            </div>
                                            <div className="truncate col-span-2 content-center text-sm font-semibold text-center">
                                                {user.email}
                                            </div>
                                            <div className="sm px-4 text-sm content-center ">
                                                <AdminDialog
                                                    title="Assign Role for Student"
                                                    description={
                                                        <div>
                                                            Asssign{" "}
                                                            <span className="font-bold">
                                                                {user.firstname}{" "}
                                                                {user.lastname}{" "}
                                                            </span>
                                                            to what
                                                            organization?
                                                        </div>
                                                    }
                                                    trigger={
                                                        <div
                                                            role="button"
                                                            className="mr-2 bg-white flex px-9  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white"
                                                            name="Assign"
                                                            onClick={() => {
                                                                getUser(
                                                                    user.userID
                                                                );
                                                            }}
                                                        >
                                                            <IconInvite />
                                                            <span className="ml-2 poppins hidden truncate sm:block">
                                                                Assign
                                                            </span>
                                                        </div>
                                                    }
                                                >
                                                    <form
                                                        onSubmit={handleInvite}
                                                    >
                                                        <Searchbar
                                                            className={
                                                                "col-span-3"
                                                            }
                                                            value={
                                                                orgSearchQuery
                                                            }
                                                            onChange={
                                                                handleOrgSearchChange
                                                            }
                                                            placeholder={
                                                                "Search for an organization"
                                                            }
                                                        />
                                                        <div className="max-h-[400px] overflow-auto">
                                                            {filteredOrganizations.length !==
                                                            0 ? (
                                                                <div className="grid sm:grid-cols-2 overflow-auto grid-cols-1 gap-4 p-5">
                                                                    {filteredOrganizations.map(
                                                                        (
                                                                            organization
                                                                        ) => (
                                                                            <AdminOrgInvCard
                                                                                key={
                                                                                    organization.orgID
                                                                                }
                                                                                userRoles={
                                                                                    currentUserRoles
                                                                                }
                                                                                organization={
                                                                                    organization
                                                                                }
                                                                                onClick={() => {
                                                                                    getOrg(
                                                                                        organization.orgID
                                                                                    );
                                                                                }}
                                                                                selectedOrg={
                                                                                    selectedOrg
                                                                                }
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                                                    No
                                                                    Organization
                                                                    Found
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="grid justify-items-end">
                                                            <AdminButton
                                                                className="mr-2 mt-5  bg-white hover:bg-green-800 hover:text-white"
                                                                icon={
                                                                    <IconInvite />
                                                                }
                                                                name="Save"
                                                                type="submit"
                                                                disabled={
                                                                    processing
                                                                }
                                                            />
                                                        </div>
                                                    </form>
                                                </AdminDialog>
                                            </div>
                                        </VerticalCard>
                                    ))}
                                </div>
                            </AdminDialog>
                        </div>
                        <div className="grid grid-rows-1 p-5 gap-2">
                            {users.map((user) => (
                                <VerticalCard gridcol="md:grid-cols-12">
                                    <div className=" col-span-3 content-center">
                                        <h1 className="md:ml-2 text-center md:text-left font-bold">
                                            {user.firstname} {user.lastname}
                                        </h1>
                                    </div>
                                    <div className="col-span-3 content-center">
                                        <h1 className="text-center font-semibold truncate text-gray-500">
                                            {user.email}
                                        </h1>
                                    </div>
                                    <div className="col-span-3 content-center">
                                        <h1 className=" text-center text-sm font-semibold text-gray-500">
                                            {user.college}
                                        </h1>
                                    </div>
                                    <div className="col-span-2 px-4 text-sm content-center ">
                                        <h1 className=" text-center font-semibold rounded-xl poppins bg-green-50 border-2 border-green-600 text-green-800">
                                            Assigned to{" "}
                                            {user.organizations_count} Org
                                        </h1>
                                    </div>
                                    <AdminDropdownMenu
                                        triggerContent={<DotsVertical />}
                                        title="Select Action"
                                        dropdownItems={[
                                            {
                                                name: "Assign to Another Org",
                                                value: true,
                                            },
                                            {
                                                name: "Delete Role",
                                                value: false,
                                            },
                                        ]}
                                    />
                                </VerticalCard>
                            ))}
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminInvite;
