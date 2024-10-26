import { Head, useForm, router } from "@inertiajs/react";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconSave from "@/Components/Icons/IconSave";
import IconCancel from "@/Components/Icons/IconCancel";
import IconEdit from "@/Components/Icons/IconEdit";
import { useState, useEffect } from "react";
import AdminButton from "@/Components/Admin/AdminButton";
import AdminOrgCard from "@/Components/Admin/AdminOrgCard";
import IconSearch from "@/Components/Icons/IconSearch";
import Searchbar from "@/Components/Searchbar";
import AdminDialog from "@/Components/Admin/AdminDialog";
import { Switch } from "@/Components/ui/switch";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function SuperAdminManage({
    recruitment,
    organizations,
    departments,
}) {
    const [isRecruitmentEnabled, setIsRecruitmentEnabled] =
        useState(recruitment);

    const [searchQuery, setSearchQuery] = useState("");
    const [allOrganizations, setAllOrganizations] = useState(organizations);
    const [filteredOrganizations, setFilteredOrganizations] =
        useState(organizations);
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [availableDepartments, setAvailableDepartments] =
        useState(departments);
    const [edit, setEdit] = useState(false);
    const [visibleStates, setVisibleStates] = useState(
        organizations.reduce((acc, org) => {
            acc[org.orgID] = org.visibility;
            return acc;
        }, {})
    );

    //for toggling recruitment
    const handleRecruitmentToggle = (checked) => {
        router.post(
            route("superadmin.toggle-recruitment"),
            {
                status: checked,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsRecruitmentEnabled(checked);
                    router.visit(route("superadmin.status"));
                },
                onError: () => {
                    console.error("Failed to toggle recruitment status");
                },
            }
        );
    };

    useEffect(() => {
        const filterOrganizations = () => {
            let filtered = allOrganizations;

            if (searchQuery) {
                filtered = filtered.filter(
                    (org) =>
                        org.name
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        org.department
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                );
            }

            if (selectedDepartment !== "All") {
                filtered = filtered.filter(
                    (org) => org.department === selectedDepartment
                );
            }

            setFilteredOrganizations(filtered);
        };

        filterOrganizations();
    }, [searchQuery, selectedDepartment, allOrganizations]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleFilterCategory = (value) => {
        setSelectedDepartment(value);
    };

    //for saving forms
    const { data, setData, post, processing, reset } = useForm({
        organizations: organizations.map((org) => ({
            id: org.orgID,
            visibility: org.visibility,
        })),
    });

    useEffect(() => {
        setData(
            "organizations",
            organizations.map((org) => ({
                id: org.orgID,
                visibility: visibleStates[org.orgID],
            }))
        );
    }, [visibleStates]);

    const toggleEdit = () => {
        setEdit((prevEdit) => !prevEdit);
    };

    const handleSave = () => {
        post(route("superadmin.update-organizations"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setEdit(false);
                // Update the initial state of organizations after successful save
                organizations.forEach((org) => {
                    org.visibility = visibleStates[org.orgID];
                });
            },
            onError: () => {
                console.error("Save failed. Please try again.");
            },
        });
    };

    const handleCancel = () => {
        setVisibleStates(
            organizations.reduce((acc, org) => {
                acc[org.orgID] = org.visibility;
                return acc;
            }, {})
        );
        setEdit(false);
        reset();
    };

    //for manual adding of org
    const [orgs, setOrgs] = useState({
        name: "",
        department: "",
    });

    function handleChangeForNewOrg(e) {
        const key = e.target.id;
        const value = e.target.value;
        setOrgs((orgs) => ({
            ...orgs,
            [key]: value,
        }));
    }

    function handleSubmitForNewOrg(e) {
        e.preventDefault();
        router.post("/superadmin/addOrg", orgs, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                // Reset the form
                setOrgs({ name: "", department: "" });

                // Update allOrganizations with the new data
                const updatedOrganizations = page.props.organizations;
                setAllOrganizations(updatedOrganizations);

                // Update availableDepartments if necessary
                const updatedDepartments = page.props.departments;
                if (updatedDepartments) {
                    setAvailableDepartments(updatedDepartments);
                }

                // Update visibleStates for the new organization
                setVisibleStates((prevState) => ({
                    ...prevState,
                    [updatedOrganizations[updatedOrganizations.length - 1]
                        .orgID]: true,
                }));
            },
        });
    }

    const [editingOrg, setEditingOrg] = useState(null);

    function handleEditOrg(orgId, updatedData) {
        router.post(route("superadmin.editOrg"), {
            orgId: orgId,
            name: updatedData.name,
            department: updatedData.department
        }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                const updatedOrganizations = page.props.organizations;
                setAllOrganizations(updatedOrganizations);

                const updatedDepartments = page.props.departments;
                if (updatedDepartments) {
                    setAvailableDepartments(updatedDepartments);
                }
            },
            onError: () => {
                console.error("Failed to update organization");
            }
        });
    }

    // function to handle organization deletion
    function handleDeleteOrg(orgId) {
        router.delete(route("superadmin.deleteOrg", { id: orgId }), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (page) => {
                
                const updatedOrganizations = allOrganizations.filter(
                    org => org.orgID !== orgId
                );
                setAllOrganizations(updatedOrganizations);
                setFilteredOrganizations(updatedOrganizations);
            },
            onError: () => {
                console.error("Failed to delete organization");
            }
        });
    }



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
                    title={`Recruitment 
                        ${recruitment ? " Enabled" : " Disabled"}
                    `}
                    dialog={
                        <AdminDialog
                            title="Enable/Disable Recruitment"
                            description="Note: When the recruitment is enabled, student leaders will be able turn on the recruitment within their organization and will be open to students. Disabling will turn off this feature on their side and will turn off the recruitment status of all the organizations."
                            trigger={
                                <div
                                    className={`text-sm ml-3 -mt-1 ${
                                        isRecruitmentEnabled
                                            ? "text-red-600"
                                            : "text-green-600"
                                    } underline underline-offset-2`}
                                >
                                    Click here to
                                    {isRecruitmentEnabled
                                        ? " disable"
                                        : " enable"}
                                </div>
                            }
                        >
                            <label
                                className="pr-[15px] text-[15px] leading-none "
                                htmlFor="airplane-mode"
                            >
                                Recruitment
                            </label>
                            <div className="flex">
                                <Switch
                                    id="recruitment-toggle"
                                    className="mr-2"
                                    checked={isRecruitmentEnabled}
                                    onCheckedChange={handleRecruitmentToggle}
                                    // onCheckedChange={field.onChange}
                                    // disabled
                                    aria-readonly
                                />
                                {isRecruitmentEnabled ? "On" : "Off"}
                            </div>
                        </AdminDialog>
                    }
                    searchbar={
                        <Searchbar
                            className={"col-span-3"}
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder={"Search for an organization"}
                        />
                    }
                    filter={
                        <div
                            className={`text-xs col-span-2 shadow-lg  flex justify-center rounded-r-xl  bg-white   text-black `}
                        >
                            <Select
                                defaultValue="All"
                                onValueChange={handleFilterCategory}
                            >
                                <SelectTrigger className="w-full h-12 border-white bg-transparent">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent
                                    className="border-gray-500 bg-[#EEEEEE] quicksand"
                                    ref={(ref) => {
                                        if (!ref) return;
                                        ref.ontouchstart = (e) =>
                                            e.preventDefault();
                                    }}
                                >
                                    <SelectItem
                                        value="All"
                                        className="hover:!bg-gray-3 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        All
                                    </SelectItem>
                                    {availableDepartments.map(
                                        (department, index) => (
                                            <SelectItem
                                                key={index}
                                                value={department}
                                                className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                            >
                                                {department}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    }
                >
                    <div className="w-full">
                        <div className="flex justify-end me-5 mt-5">
                            {!edit ? (
                                <div className="flex">
                                    <AdminDialog
                                        title="Manually Add Organization"
                                        description="Enter the name and the department/college/faculty of the organization you want to add."
                                        trigger={
                                            <AdminButton
                                                className="mr-2 bg-white hover:bg-gray-800 hover:text-white"
                                                icon={<IconEdit />}
                                                name=" Add Organization"
                                            />
                                        }
                                    >
                                        <form
                                            onSubmit={handleSubmitForNewOrg}
                                            className="space-y-4"
                                        >
                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="name"
                                                    className="block  font-medium text-gray-700"
                                                >
                                                    Name of the Organization:
                                                </label>
                                                <input
                                                    id="name"
                                                    value={orgs.name}
                                                    onChange={
                                                        handleChangeForNewOrg
                                                    }
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Enter organization name"
                                                    required
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label
                                                    htmlFor="department"
                                                    className="block  font-medium text-gray-700"
                                                >
                                                    Department:
                                                </label>
                                                <input
                                                    id="department"
                                                    value={orgs.department}
                                                    onChange={
                                                        handleChangeForNewOrg
                                                    }
                                                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder="Enter department"
                                                    required
                                                />
                                            </div>

                                            <div className="mt-4 grid justify-items-end">
                                                <button
                                                    type="submit"
                                                    className="flex px-9  shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white"
                                                >
                                                    <span className="ml-2  poppins hidden truncate sm:block">
                                                        Submit
                                                    </span>
                                                </button>
                                            </div>
                                        </form>
                                    </AdminDialog>

                                    <AdminButton
                                        className="bg-white hover:bg-gray-800 hover:text-white"
                                        onClick={toggleEdit}
                                        icon={<IconEdit />}
                                        name="Edit"
                                    />
                                </div>
                            ) : (
                                <div className="flex">
                                    <AdminButton
                                        className="mr-2 bg-green-100 hover:text-white hover:bg-green-800"
                                        onClick={handleSave}
                                        icon={<IconSave />}
                                        name="Save"
                                        disabled={processing}
                                    />
                                    <AdminButton
                                        className="mr-2 bg-red-100 hover:text-white hover:bg-red-800"
                                        onClick={handleCancel}
                                        icon={<IconCancel />}
                                        name="Cancel"
                                    />
                                </div>
                            )}
                        </div>
                        {filteredOrganizations.length === 0 ? (
                            <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                No Organizations Found
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 p-5">
                                {filteredOrganizations.map((organization) => (
                                    <AdminOrgCard
                                        key={organization.orgID}
                                        edit={edit}
                                        visible={
                                            visibleStates[organization.orgID]
                                        }
                                        setVisible={(newValue) => {
                                            setVisibleStates((prevState) => ({
                                                ...prevState,
                                                [organization.orgID]: newValue,
                                            }));
                                        }}
                                        organization={organization}
                                        onEdit={handleEditOrg}
                                        onDelete={handleDeleteOrg}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
