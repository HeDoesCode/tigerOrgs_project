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

export default function SuperAdminManage({ organizations }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [orgList, setOrgList] = useState(organizations);
    const [edit, setEdit] = useState(false);
    const [visibleStates, setVisibleStates] = useState(
        organizations.reduce((acc, org) => {
            acc[org.orgID] = org.visibility;
            return acc;
        }, {})
    );

    //for search query
    const handleChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const response = await axios.get("/superadmin/status/search-org", {
                params: { query },
            });

            setOrgList(response.data);
        } else {
            setOrgList(organizations);
        }
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
                    title="Recruitment Enabled"
                    searchbar={
                        <Searchbar
                            value={searchQuery}
                            onChange={handleChange}
                            placeholder={"Search for an organization"}
                        />
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
                        {orgList.length === 0 ? (
                            <div className="m-14 sm:m-48 text-xl font-thin text-center">
                                No Organizations Found
                            </div>
                        ) : (
                            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 p-5">
                                {orgList.map((organization) => (
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
