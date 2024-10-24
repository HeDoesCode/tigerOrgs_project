import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, useForm } from "@inertiajs/react";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import { useState } from "react";
import CustomFileInput from "@/Components/CustomFileInput";

function SuperAdminDataUpload() {
    const [uploading, setUploading] = useState(false);

    const { data, setData, post, reset } = useForm({
        studentFile: null,
        organizationFile: null,
    });

    const handleFileChange = (event, key) => {
        switch (key) {
            case "Student File":
                setData("studentFile", event.target.files[0]);
                break;
            case "Organization File":
                setData("organizationFile", event.target.files[0]);
                break;
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setUploading(true);

        post(route("superadmin.dataupload.file"), {
            onSuccess: () => {
                reset();
            },
            onFinish: () => {
                setUploading(false);
            },
        });
    };

    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Upload",
                            link: "superadmin.dataupload",
                        },
                    ]}
                    title="Data Upload"
                >
                    <div className="grid grid-cols-12 p-5 gap-2">
                        <div className="p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7">
                            <h1 className="font-bold">Student Information</h1>
                            <h2 className="text-sm">
                                Last Date Uploaded: Aug-09-2024
                            </h2>
                            <CustomFileInput
                                handleFileChange={handleFileChange}
                                fileType="Student File"
                            />
                        </div>

                        <div className="p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7">
                            <h1 className="font-bold">Organization List</h1>
                            <h2 className="text-sm">
                                Last Date Uploaded: Aug-09-2024
                            </h2>
                            <CustomFileInput
                                handleFileChange={handleFileChange}
                                fileType="Organization File"
                            />
                        </div>
                    </div>
                    <div className="p-5">
                        <button
                            onClick={handleUpload}
                            disabled={uploading}
                            className="bg-white text-black px-4 py-2 rounded-xl disabled:opacity-50"
                        >
                            {uploading ? "Uploading..." : "Upload Files"}
                        </button>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminDataUpload;
