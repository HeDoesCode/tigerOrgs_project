import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, router } from "@inertiajs/react";
import IconSettings from "@/Components/Icons/IconSettings";
import { useState } from "react";
import { Switch } from "@/Components/ui/switch";
import AdminDialog from "@/Components/Admin/AdminDialog";

function SuperAdminSettings({ recruitment = false, manualreg = false }) {
    const [isRecruitmentEnabled, setIsRecruitmentEnabled] =
        useState(recruitment);
    const [isManualRegEnabled, setIsManualRegEnabled] = useState(manualreg);

    const handleToggle = (checked, settingName) => {
        router.post(
            route("superadmin.toggle-setting"),
            { status: checked, setting_name: settingName },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    if (settingName === "Recruitment") {
                        setIsRecruitmentEnabled(checked);
                    } else if (settingName === "Manual Registration") {
                        setIsManualRegEnabled(checked);
                    }
                    router.visit(route("superadmin.settings"));
                },
                onError: () => {
                    console.error(`Failed to toggle ${settingName} status`);
                },
            }
        );
    };

    return (
        <div className="w-full">
            <Head title="OSA Dashboard - Settings" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconSettings />,
                            label: "Controls",
                            link: "superadmin.settings",
                        },
                    ]}
                    title="Settings"
                >
                    <div className="grid grid-cols-12 gap-2 p-5">
                        {/* Recruitment Toggle */}
                        <div className="col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white">
                            <h2 className="font-bold text-gray-700">
                                Recruitment Settings
                            </h2>
                            <p className="text-sm mb-2">
                                Enable or disable recruitment functionality for
                                all organizations.
                            </p>
                            <AdminDialog
                                title="Enable/Disable Recruitment"
                                description="Enabling recruitment allows student leaders to manage recruitment statuses. Disabling it will turn off recruitment for all organizations."
                                trigger={
                                    <button
                                        className={`underline font-bold ${
                                            isRecruitmentEnabled
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {isRecruitmentEnabled
                                            ? "Disable"
                                            : "Enable"}{" "}
                                        Recruitment
                                    </button>
                                }
                            >
                                <div className="flex items-center space-x-3 mt-4">
                                    <label
                                        htmlFor="recruitment-toggle"
                                        className="text-gray-700"
                                    >
                                        Recruitment
                                    </label>
                                    <Switch
                                        id="recruitment-toggle"
                                        checked={isRecruitmentEnabled}
                                        onCheckedChange={(checked) =>
                                            handleToggle(checked, "Recruitment")
                                        }
                                    />
                                    <span>
                                        {isRecruitmentEnabled ? "On" : "Off"}
                                    </span>
                                </div>
                            </AdminDialog>
                        </div>

                        {/* Manual Registration Toggle */}
                        <div className="col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white">
                            <h2 className="font-bold text-gray-700">
                                Manual Registration Settings
                            </h2>
                            <p className="text-sm mb-2">
                                Enable or disable manual registration of
                                students on the website.
                            </p>
                            <AdminDialog
                                title="Enable/Disable Manual Registration"
                                description="Enabling manual registration allows students to manually register their UST Gmail account on the website. Only use this feature
                                if there is no data acquired from the OICT."
                                trigger={
                                    <button
                                        className={`underline font-bold ${
                                            isManualRegEnabled
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }`}
                                    >
                                        {isManualRegEnabled
                                            ? "Disable"
                                            : "Enable"}{" "}
                                        Manual Registration
                                    </button>
                                }
                            >
                                <div className="flex items-center space-x-3 mt-4">
                                    <label
                                        htmlFor="manualreg-toggle"
                                        className="text-gray-700"
                                    >
                                        Manual Registration
                                    </label>
                                    <Switch
                                        id="manualreg-toggle"
                                        checked={isManualRegEnabled}
                                        onCheckedChange={(checked) =>
                                            handleToggle(
                                                checked,
                                                "Manual Registration"
                                            )
                                        }
                                    />
                                    <span>
                                        {isManualRegEnabled ? "On" : "Off"}
                                    </span>
                                </div>
                            </AdminDialog>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminSettings;
