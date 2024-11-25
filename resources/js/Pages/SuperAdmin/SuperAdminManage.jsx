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
import Searchbar from "@/Components/Searchbar";
import AdminDialog from "@/Components/Admin/AdminDialog";
import { Switch } from "@/Components/ui/switch";
import CustomPagination from "@/Components/CustomPagination";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

export default function SuperAdminManage({
    organizations = { data: [] },
    departments = [],
    filters = {},
}) {
    const [allOrganizations, setAllOrganizations] = useState(
        organizations?.data || []
    );

    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    const [selectedDepartment, setSelectedDepartment] = useState(
        filters.department || "All"
    );
    const [availableDepartments, setAvailableDepartments] =
        useState(departments);
    const [edit, setEdit] = useState(false);

    // Initialize visibility states directly from organizations data
    const [visibleStates, setVisibleStates] = useState(() => {
        const states = {};
        if (organizations?.data) {
            organizations.data.forEach((org) => {
                states[org.orgID] = org.visibility;
            });
        }
        return states;
    });

    // Keep track of modified states only
    const [modifiedStates, setModifiedStates] = useState({});

    const [filteredOrganizations, setFilteredOrganizations] = useState(
        organizations?.data || []
    );

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Handle filter category changes
    const handleFilterCategory = (value) => {
        setSelectedDepartment(value);
        router.get(
            route("superadmin.status"),
            { search: searchQuery, department: value },
            { preserveState: true, preserveScroll: true }
        );
    };

    // Update visible states when organizations data changes
    useEffect(() => {
        if (organizations?.data) {
            setVisibleStates((prevStates) => {
                const newStates = { ...prevStates };
                organizations.data.forEach((org) => {
                    // Only update if not modified by user
                    if (!modifiedStates[org.orgID]) {
                        newStates[org.orgID] = org.visibility;
                    }
                });
                return newStates;
            });
        }
    }, [organizations?.data]);

    // Search debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            router.get(
                route("superadmin.status"),
                { search: searchQuery, department: selectedDepartment },
                { preserveState: true, preserveScroll: true }
            );
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Filter organizations effect
    useEffect(() => {
        const filterOrganizations = () => {
            let filtered = allOrganizations;

            if (searchQuery) {
                filtered = filtered.filter(
                    (org) =>
                        org?.name
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase()) ||
                        org?.department
                            ?.toLowerCase()
                            .includes(searchQuery.toLowerCase())
                );
            }

            if (selectedDepartment !== "All") {
                filtered = filtered.filter(
                    (org) => org?.department === selectedDepartment
                );
            }

            setFilteredOrganizations(filtered);
        };

        filterOrganizations();
    }, [searchQuery, selectedDepartment, allOrganizations]);

    const { data, setData, post, processing, reset } = useForm({
        organizations: [],
    });

    // Update form data when visible states change
    useEffect(() => {
        setData(
            "organizations",
            Object.entries(visibleStates).map(([id, visibility]) => ({
                id: id,
                visibility: visibility,
            }))
        );
    }, [visibleStates]);

    // Toggle edit mode
    const toggleEdit = () => {
        setEdit((prevEdit) => !prevEdit);
        if (!edit) {
            // Entering edit mode
            setModifiedStates({});
        }
    };

    // Handle visibility toggle
    const handleVisibilityChange = (orgId, newValue) => {
        setVisibleStates((prevState) => ({
            ...prevState,
            [orgId]: newValue,
        }));
        setModifiedStates((prevState) => ({
            ...prevState,
            [orgId]: true,
        }));
    };

    // Reset states on successful save
    const handleSave = () => {
        post(route("superadmin.update-organizations"), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setEdit(false);
                setModifiedStates({});
            },
            onError: () => {
                console.error("Save failed. Please try again.");
            },
        });
    };

    // Reset to original states on cancel
    const handleCancel = () => {
        if (organizations?.data) {
            const originalStates = {};
            organizations.data.forEach((org) => {
                originalStates[org.orgID] = org.visibility;
            });
            setVisibleStates(originalStates);
            setModifiedStates({});
        }
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
                    title={`Manage Organizations`}
                    searchbar={
                        <Searchbar
                            className="col-span-3"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search for an organization"
                        />
                    }
                    filter={
                        <div className="text-xs col-span-2 shadow-lg flex justify-center rounded-r-xl bg-white text-black">
                            <Select
                                value={selectedDepartment}
                                onValueChange={handleFilterCategory}
                            >
                                <SelectTrigger className="w-full h-12 border-white bg-transparent">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-500 bg-[#EEEEEE] quicksand">
                                    <SelectItem value="All">All</SelectItem>
                                    {availableDepartments.map(
                                        (department, index) => (
                                            <SelectItem
                                                key={index}
                                                value={department}
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
                                    className="py-2 bg-white hover:bg-gray-800 hover:text-white"
                                    onClick={toggleEdit}
                                    icon={<IconEdit />}
                                    name="Edit"
                                />
                            ) : (
                                <div className="flex">
                                    <AdminButton
                                        className="py-2 mr-2 bg-green-100 hover:text-white hover:bg-green-800"
                                        onClick={handleSave}
                                        icon={<IconSave />}
                                        name="Save"
                                        disabled={processing}
                                    />
                                    <AdminButton
                                        className="py-2 mr-2 bg-red-100 hover:text-white hover:bg-red-800"
                                        onClick={handleCancel}
                                        icon={<IconCancel />}
                                        name="Cancel"
                                    />
                                </div>
                            )}
                        </div>
                        {!organizations?.data ||
                        organizations.data.length === 0 ? (
                            <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                No Organizations Found
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 p-5 pb-20">
                                {organizations.data.map((organization) => (
                                    <AdminOrgCard
                                        key={organization.orgID}
                                        edit={edit}
                                        visible={
                                            visibleStates[organization.orgID]
                                        }
                                        setVisible={(newValue) =>
                                            handleVisibilityChange(
                                                organization.orgID,
                                                newValue
                                            )
                                        }
                                        organization={organization}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="fixed w-screen bottom-0 left-0 right-0 pl-8 sm:pl-24 pr-10 pb-3 flex justify-center">
                            <CustomPagination page={organizations} />
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
