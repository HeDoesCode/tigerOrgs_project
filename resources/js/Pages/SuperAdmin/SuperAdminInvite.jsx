import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, useForm, router } from "@inertiajs/react";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import DotsVertical from "@/Components/DotsVertical";
import { useState, useEffect } from "react";
import Searchbar from "@/Components/Searchbar";
import AdminDialog from "@/Components/Admin/AdminDialog";
import AdminInvDropdownMenu from "@/Components/Admin/AdminInvDropdownMenu";
import axios from "axios";
import AdminAlertDialog from "@/Components/Admin/AdminAlertDialog";
import AdminDialogForInvite from "@/Components/Admin/AdminDialogForInvite";
import AdminOrgInvCard from "@/Components/Admin/AdminOrgInvCard";
import Paginate from "@/Components/Paginate";
import CustomPagination from "@/Components/CustomPagination";

function SuperAdminInvite({ users, organizations, userRoles }) {
    //for searching and filtering of user and organization
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [availableOrganizations, setAvailableOrganizations] =
        useState(organizations);
    const [filteredOrganizations, setFilteredOrganizations] =
        useState(organizations);
    const [orgSearchQuery, setOrgSearchQuery] = useState("");

    //for deleting specific user to that org
    const [currentUserOrgs, setCurrentUserOrgs] = useState([]);

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

    const [searchMainQuery, setSearchMainQuery] = useState("");

    const debouncedSearchHandler = debounce((value) => {
        router.get(
            route("superadmin.invite"),
            { search: value },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, 300);

    const handleMainSearchChange = (e) => {
        const value = e.target.value;
        setSearchMainQuery(value);
        debouncedSearchHandler(value);
    };

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

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

    //deleting specific org to user
    const handleDeleteRole = (orgID) => {
        router.delete(
            route("superadmin.delete-admin-role", {
                userID: currentUserID,
                orgID: orgID,
            }),
            {
                preserveState: true,
                preserveScroll: true,
            }
        );
    };

    //triggers to check the only org that is assigned to the user
    useEffect(() => {
        if (currentUserID) {
            const userOrgs = organizations.filter((org) =>
                userRoles.some(
                    (role) =>
                        role.userID === currentUserID &&
                        role.orgID === org.orgID
                )
            );
            setCurrentUserOrgs(userOrgs);
        }
    }, [currentUserID, organizations, userRoles]);

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
        post(`/superadmin/addadmin/${selectedOrg}/${data.userID}`);
    };

    //delete admin logic

    const handleDelete = (userID) => {
        router.delete(route("superadmin.delete-admin", userID), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    //for searching the user on the main search bar
    const [allUsers, setAllOrganizations] = useState(users);
    const [filteredUsers, setFilteredUsers] = useState(users?.data || []);
    useEffect(() => {
        const filterUsers = () => {
            let filtered = allUsers.data; // Use allUsers.data instead of allUsers

            if (searchMainQuery) {
                filtered = filtered.filter((user) => {
                    const fullName =
                        `${user.firstname} ${user.lastname}`.toLowerCase();
                    return fullName.includes(searchMainQuery.toLowerCase());
                });
            }

            setFilteredUsers(filtered);
        };

        filterUsers();
    }, [searchMainQuery, allUsers]);

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
                    searchbar={
                        <Searchbar
                            className={"col-span-3"}
                            value={searchMainQuery}
                            onChange={handleMainSearchChange}
                            placeholder={"Search for a user"}
                            onInviteAdmin={true}
                        />
                    }
                    onInviteAdmin={true}
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
                                        className="mr-2 py-2 bg-white flex px-9  shadow-lg rounded-2xl hover:bg-gray-800 hover:text-white"
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
                                            gridcol="grid-col-1 md:grid-cols-4"
                                        >
                                            <div className="text-sm font-bold content-center text-center">
                                                {user.firstname} {user.lastname}
                                            </div>
                                            <div className="truncate col-span-2 content-center text-sm font-semibold text-center">
                                                {user.email}
                                            </div>
                                            <div className="sm px-4 text-sm flex items-center justify-center ">
                                                <AdminDialogForInvite
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
                                                    handleInvite={handleInvite}
                                                    filteredOrganizations={
                                                        filteredOrganizations
                                                    }
                                                    currentUserRoles={
                                                        currentUserRoles
                                                    }
                                                    selectedOrg={selectedOrg}
                                                    processing={processing}
                                                    getOrg={getOrg}
                                                    orgSearchQuery={
                                                        orgSearchQuery
                                                    }
                                                    handleOrgSearchChange={
                                                        handleOrgSearchChange
                                                    }
                                                />
                                            </div>
                                        </VerticalCard>
                                    ))}
                                </div>
                            </AdminDialog>
                        </div>
                        {users.data.length === 0 ? (
                            <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                No Assigned Admin Found
                            </div>
                        ) : (
                            <div className="grid grid-rows-1 p-5 gap-2">
                                {users.data &&
                                    users.data.map((user) => (
                                        <VerticalCard
                                            key={user.userID}
                                            gridcol="grid grid-cols-1 sm:grid-cols-12"
                                        >
                                            <div className=" col-span-3 content-center">
                                                <h1 className="md:ml-2 text-center md:text-left font-bold">
                                                    {user.firstname}{" "}
                                                    {user.lastname}
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
                                            <div className="col-span-2 px-4 text-sm flex items-center justify-center ">
                                                <AdminDialog
                                                    trigger={
                                                        <h1
                                                            onClick={() => {
                                                                getUser(
                                                                    user.userID
                                                                );
                                                            }}
                                                            className="px-4 text-center font-semibold rounded-xl poppins bg-green-50 border-2 border-green-600 text-green-800"
                                                        >
                                                            Joined{" "}
                                                            {
                                                                user.organizations_count
                                                            }{" "}
                                                            {user.organizations_count >
                                                            1
                                                                ? "Organizations"
                                                                : "Organization"}
                                                        </h1>
                                                    }
                                                    title={`Assigned Organizations for ${user.firstname} ${user.lastname}`}
                                                >
                                                    {currentUserOrgs.length !==
                                                    0 ? (
                                                        <div className="grid sm:grid-cols-2 overflow-auto grid-cols-1 gap-4 p-5">
                                                            {currentUserOrgs.map(
                                                                (
                                                                    organization
                                                                ) => (
                                                                    <AdminOrgInvCard
                                                                        isDeleting={
                                                                            true
                                                                        }
                                                                        key={
                                                                            organization.orgID
                                                                        }
                                                                        userRoles={
                                                                            currentUserRoles
                                                                        }
                                                                        organization={
                                                                            organization
                                                                        }
                                                                        onClick={() => {}}
                                                                        selectedOrg={
                                                                            selectedOrg
                                                                        }
                                                                        onDelete={
                                                                            handleDeleteRole
                                                                        }
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                                            No Organization
                                                            Found
                                                        </div>
                                                    )}
                                                </AdminDialog>
                                            </div>

                                            <AdminDialogForInvite
                                                title="Assign Role for Student"
                                                description={
                                                    <div>
                                                        Asssign{" "}
                                                        <span className="font-bold">
                                                            {user.firstname}{" "}
                                                            {user.lastname}{" "}
                                                        </span>
                                                        to what organization?
                                                    </div>
                                                }
                                                trigger={
                                                    //change this
                                                    <div
                                                        onClick={() => {
                                                            getUser(
                                                                user.userID
                                                            );
                                                        }}
                                                        className="flex items-center  justify-center"
                                                    >
                                                        <div className="hover:bg-gray-300 rounded-full p-2">
                                                            <IconInvite />
                                                        </div>
                                                    </div>
                                                }
                                                handleInvite={handleInvite}
                                                filteredOrganizations={
                                                    filteredOrganizations
                                                }
                                                currentUserRoles={
                                                    currentUserRoles
                                                }
                                                selectedOrg={selectedOrg}
                                                processing={processing}
                                                getOrg={getOrg}
                                                orgSearchQuery={orgSearchQuery}
                                                handleOrgSearchChange={
                                                    handleOrgSearchChange
                                                }
                                            />
                                        </VerticalCard>
                                    ))}
                                <div className="fixed w-screen bottom-0 left-0 right-0 pl-8 sm:pl-24 pr-10 pb-3 flex justify-center">
                                    <CustomPagination page={users} />
                                </div>
                            </div>
                        )}
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminInvite;
