import { Head } from "@inertiajs/react";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconSave from "@/Components/Icons/IconSave";
import IconCancel from "@/Components/Icons/IconCancel";

import ControlContainer from "@/Components/Organizations/ControlContainer";

import IconEdit from "@/Components/Icons/IconEdit";
import { useState } from "react";
import AdminButton from "@/Components/Admin/AdminButton";
import AdminOrgCard from "@/Components/Admin/AdminOrgCard";

export default function SuperAdminManage() {
    const [edit, setEdit] = useState(true);
    const [visible, setVisible] = useState(true);
    const [originalVisible, setOriginalVisible] = useState(visible);

    const toggleEdit = () => {
        if (!edit) {
            setOriginalVisible(visible);
        } else {
            setVisible(originalVisible);
        }
        setEdit((prevEdit) => !prevEdit);
    };

    const handleSave = () => {
        //logic pang save
        setOriginalVisible(visible);
        setEdit(false);
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
                >
                    <div className="w-full">
                        <div className=" flex justify-end mt-5 me-5">
                            {edit ? (
                                <AdminButton
                                    className="bg-gray-300 hover:bg-white"
                                    onClick={toggleEdit}
                                    icon={<IconEdit />}
                                    name="Edit"
                                />
                            ) : (
                                <div className="flex">
                                    <AdminButton
                                        className="mr-2 bg-green-100 hover:bg-green-200"
                                        onClick={handleSave}
                                        icon={<IconSave />}
                                        name="Save"
                                    />

                                    <AdminButton
                                        className="mr-2 bg-red-100 hover:bg-red-200"
                                        onClick={toggleEdit}
                                        icon={<IconCancel />}
                                        name="Cancel"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 p-5">
                            <AdminOrgCard
                                edit={edit}
                                visible={visible}
                                setVisible={setVisible}
                            />
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
