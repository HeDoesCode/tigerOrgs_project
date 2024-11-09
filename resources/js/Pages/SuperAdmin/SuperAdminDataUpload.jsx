import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, useForm } from "@inertiajs/react";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import { useState, useEffect, useRef } from "react";
import CustomFileInput from "@/Components/CustomFileInput";
import UploadProgress from "@/Components/Admin/UploadProgress";

function SuperAdminDataUpload() {
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const progressIntervalRef = useRef(null);
    const lastProgressRef = useRef(0);

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

    const cleanupUpload = () => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
        lastProgressRef.current = 0;
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setUploading(true);
        setUploadProgress(0);
        lastProgressRef.current = 0;

        progressIntervalRef.current = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev < lastProgressRef.current) {
                    return lastProgressRef.current;
                }

                const increment = Math.max(1, 10 * (1 - prev / 100));
                const nextProgress = Math.min(85, prev + increment);

                return nextProgress;
            });
        }, 1000);

        post(route("superadmin.dataupload.file"), {
            onProgress: (progress) => {
                if (progress.percentage) {
                    const realProgress = Math.min(90, progress.percentage);
                    lastProgressRef.current = realProgress;

                    setUploadProgress((prev) =>
                        realProgress > prev ? realProgress : prev
                    );
                }
            },
            onSuccess: () => {
                cleanupUpload();
                setUploadProgress(100);
                setTimeout(() => {
                    reset();
                    setUploading(false);
                    setUploadProgress(0);
                }, 1000);
            },
            onError: () => {
                cleanupUpload();
                setUploading(false);
                setUploadProgress(0);
            },
            onFinish: () => {
                cleanupUpload();
            },
        });
    };

    const handleBeforeUnload = (e) => {
        if (uploading) {
            e.preventDefault();
            e.returnValue = "";
        }
    };

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            cleanupUpload();
        };
    }, [uploading]);

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
                        {
                            icon: <IconCheckBox />,
                            label: "Download",
                            link: "superadmin.filedownload",
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
                                disabled={uploading}
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
                                disabled={uploading}
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

                    <UploadProgress
                        progress={uploadProgress}
                        isUploading={uploading}
                    />
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminDataUpload;
