import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Download } from "lucide-react";
import axios from "axios";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import CustomFileInput from "@/Components/CustomFileInput";
import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";

function SuperAdminDataDownload() {
    const handleExport = async () => {
        try {
            const response = await axios.get("/superadmin/member-export", {
                responseType: "blob",
            });

            const blob = new Blob([response.data], {
                type: "application/json",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "organizations-members.json");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
        }
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
                        {
                            icon: <IconCheckBox />,
                            label: "Download",
                            link: "superadmin.filedownload",
                        },
                    ]}
                    title="Data Download"
                >
                    <div className="grid grid-cols-12 p-5 gap-2">
                        <div className="p-5 shadow-lg grid gridcol rounded-xl bg-white col-span-12 lg:col-span-7">
                            <h1 className="font-bold">
                                Download Members of the Organizations in JSON
                                Format
                            </h1>
                            <h2 className="text-sm">
                                Note: This will export a JSON file that will be
                                used to upload to the E-SORR System
                            </h2>
                            <div
                                onClick={handleExport}
                                className="flex items-center mt-2 hover:scale-[1.01] transition-all duration-300 ease-in-out"
                            >
                                <label className="cursor-pointer w-full flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md">
                                    Export Organizations with Members
                                    <Download className="w-4 h-4" />
                                </label>
                            </div>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminDataDownload;
