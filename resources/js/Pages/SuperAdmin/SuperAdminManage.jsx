import { Head, useForm } from "@inertiajs/react";
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function SuperAdminManage({ organizations, departments }) {
    const [recruitment, setRecruitment] = useState(false);
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
                            description="When the recruitment is enabled, student leaders will be able turn on the recruitment within their organization and will be open to students. Disabling will turn off this feature on their side."
                            trigger={
                                <div
                                    className={`text-sm ml-3 -mt-1 ${
                                        recruitment
                                            ? "text-red-600"
                                            : "text-green-600"
                                    } underline underline-offset-2`}
                                >
                                    Click here to
                                    {recruitment ? " disable" : " enable"}
                                </div>
                            }
                        ></AdminDialog>
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
                                <AdminButton
                                    className="bg-white hover:bg-gray-800 hover:text-white"
                                    onClick={toggleEdit}
                                    icon={<IconEdit />}
                                    name="Edit"
                                />
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
