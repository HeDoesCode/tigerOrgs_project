import MainAdminFrame from "@/Components/MainAdminFrame";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import IconSettings from "@/Components/Icons/IconSettings";
import { useState } from "react";
import { Switch } from "@/Components/ui/switch";
import AdminDialog from "@/Components/Admin/AdminDialog";

function SuperAdminSettings({ recruitment = false, manualreg = false }) {
    const [isRecruitmentEnabled, setIsRecruitmentEnabled] =
        useState(recruitment);
    const [isManualRegEnabled, setIsManualRegEnabled] = useState(manualreg);

    // const handleToggle = (checked, settingName) => {
    //     router.post(
    //         route("superadmin.toggle-setting"),
    //         { status: checked, setting_name: settingName },
    //         {
    //             preserveState: true,
    //             preserveScroll: true,
    //             onSuccess: () => {
    //                 if (settingName === "Recruitment") {
    //                     setIsRecruitmentEnabled(checked);
    //                 } else if (settingName === "Manual Registration") {
    //                     setIsManualRegEnabled(checked);
    //                 }
    //                 router.visit(route("superadmin.settings"));
    //             },
    //             onError: () => {
    //                 console.error(`Failed to toggle ${settingName} status`);
    //             },
    //         }
    //     );
    // };
    const { errors } = usePage().props;

    const {
        data: recruitmentDate,
        setData: setRecruitmentDate,
        post: submitRecruitmentDate,
    } = useForm({
        settingName: "Recruitment",
        start_date: null,
        end_date: null,
    });

    const {
        data: manualRegDate,
        setData: setManualRegDate,
        post: submitManualRegDate,
    } = useForm({
        settingName: "Manual Registration",
        start_date: null,
        end_date: null,
    });

    const handleRecruitmentDateSubmit = (e) => {
        e.preventDefault();
        submitRecruitmentDate(route("superadmin.toggle-setting"));
    };

    const handleManualRegDateSubmit = (e) => {
        e.preventDefault();
        submitManualRegDate(route("superadmin.toggle-setting"));
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
                                    <div
                                        role="button"
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
                                    </div>
                                }
                            >
                                <div className="flex items-center space-x-3 mt-4">
                                    <form
                                        onSubmit={handleRecruitmentDateSubmit}
                                    >
                                        <ul className="grid grid-cols-2 gap-4">
                                            <li>
                                                <label
                                                    htmlFor=""
                                                    className="block font-bold"
                                                >
                                                    Start Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    onChange={(e) =>
                                                        setRecruitmentDate(
                                                            "start_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </li>
                                            <li>
                                                <label
                                                    htmlFor=""
                                                    className="block font-bold"
                                                >
                                                    End Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    onChange={(e) =>
                                                        setRecruitmentDate(
                                                            "end_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </li>
                                        </ul>
                                        <button type="submit">Save</button>
                                    </form>
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
                                    <div
                                        role="button"
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
                                    </div>
                                }
                            >
                                <div className="flex items-center space-x-3 mt-4">
                                    <form onSubmit={handleManualRegDateSubmit}>
                                        <ul className="grid grid-cols-2 gap-4">
                                            <li>
                                                <label
                                                    htmlFor=""
                                                    className="block font-bold"
                                                >
                                                    Start Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    onChange={(e) =>
                                                        setManualRegDate(
                                                            "start_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </li>
                                            <li>
                                                <label
                                                    htmlFor=""
                                                    className="block font-bold"
                                                >
                                                    End Date
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    onChange={(e) =>
                                                        setManualRegDate(
                                                            "end_date",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </li>
                                        </ul>
                                        <button type="submit">Save</button>
                                    </form>
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
                        <button onClick={() => console.log(errors)}>
                            Check Errors
                        </button>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}

export default SuperAdminSettings;
