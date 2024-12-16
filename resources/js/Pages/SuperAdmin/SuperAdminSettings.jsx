import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import IconSettings from "@/Components/Icons/IconSettings";
import { useState } from "react";
import { Switch } from "@/Components/ui/switch";

function SuperAdminSettings({ 
    recruitment = false, 
    recruitmentStartDate = null, 
    recruitmentEndDate = null,
    manualreg = false, 
    manualRegStartDate = null, 
    manualRegEndDate = null 
}) {
    const [isRecruitmentEnabled, setIsRecruitmentEnabled] = useState(recruitment);
    const [isManualRegEnabled, setIsManualRegEnabled] = useState(manualreg);

    const handleToggle = (checked, settingName) => {
        router.post(
            route("superadmin.toggle-setting"),
            { 
                settingName: settingName,
                status: checked,
                start_date: settingName === "Recruitment" ? recruitmentDate.start_date : manualRegDate.start_date,
                end_date: settingName === "Recruitment" ? recruitmentDate.end_date : manualRegDate.end_date
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    if (settingName === "Recruitment") {
                        setIsRecruitmentEnabled(checked);
                    } else if (settingName === "Manual Registration") {
                        setIsManualRegEnabled(checked);
                    }
                },
                onError: (errors) => {
                    console.error(`Failed to toggle ${settingName} status`, errors);
                },
            }
        );
    };

    const { errors } = usePage().props;

    const { data: recruitmentDate, setData: setRecruitmentDate } = useForm({
        settingName: "Recruitment",
        start_date: recruitmentStartDate,
        end_date: recruitmentEndDate,
    });

    const { data: manualRegDate, setData: setManualRegDate } = useForm({
        settingName: "Manual Registration",
        start_date: manualRegStartDate,
        end_date: manualRegEndDate,
    });

    const handleRecruitmentDateSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("superadmin.toggle-setting"),
            {
                settingName: "Recruitment",
                status: isRecruitmentEnabled,
                start_date: recruitmentDate.start_date,
                end_date: recruitmentDate.end_date
            }
        );
    };

    const handleManualRegDateSubmit = (e) => {
        e.preventDefault();
        router.post(
            route("superadmin.toggle-setting"),
            {
                settingName: "Manual Registration",
                status: isManualRegEnabled,
                start_date: manualRegDate.start_date,
                end_date: manualRegDate.end_date
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
                    <div className="grid grid-cols-12 gap-4 p-5">
                        {/* Recruitment Settings */}
                        <div className="col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="font-bold text-gray-700">
                                        Recruitment Settings
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Enable or disable recruitment functionality for all organizations.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
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
                                            handleToggle(
                                                checked,
                                                "Recruitment"
                                            )
                                        }
                                    />
                                    <span>
                                        {isRecruitmentEnabled ? "On" : "Off"}
                                    </span>
                                </div>
                            </div>
                            
                            <form 
                                onSubmit={handleRecruitmentDateSubmit} 
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label 
                                            htmlFor="recruitment-start-date" 
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            id="recruitment-start-date"
                                            type="datetime-local"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={recruitmentDate.start_date || ''}
                                            onChange={(e) =>
                                                setRecruitmentDate(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label 
                                            htmlFor="recruitment-end-date" 
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            End Date
                                        </label>
                                        <input
                                            id="recruitment-end-date"
                                            type="datetime-local"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={recruitmentDate.end_date || ''}
                                            onChange={(e) =>
                                                setRecruitmentDate(
                                                    "end_date",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="cursor-pointer flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md"
                                    >
                                        Save Recruitment Settings
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Manual Registration Settings */}
                        <div className="col-span-12 lg:col-span-7 p-5 shadow-lg rounded-xl bg-white">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h2 className="font-bold text-gray-700">
                                        Manual Registration Settings
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Enable or disable manual registration of students on the website.
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
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
                            </div>
                            
                            <form 
                                onSubmit={handleManualRegDateSubmit} 
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label 
                                            htmlFor="manualreg-start-date" 
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            Start Date
                                        </label>
                                        <input
                                            id="manualreg-start-date"
                                            type="datetime-local"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={manualRegDate.start_date || ''}
                                            onChange={(e) =>
                                                setManualRegDate(
                                                    "start_date",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label 
                                            htmlFor="manualreg-end-date" 
                                            className="block text-sm font-medium text-gray-700 mb-1"
                                        >
                                            End Date
                                        </label>
                                        <input
                                            id="manualreg-end-date"
                                            type="datetime-local"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2"
                                            value={manualRegDate.end_date || ''}
                                            onChange={(e) =>
                                                setManualRegDate(
                                                    "end_date",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="cursor-pointer flex items-center justify-between rounded-xl bg-[#D9D9D9] text-black px-4 py-2 shadow-md "
                                    >
                                        Save Manual Registration Settings
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminSettings;