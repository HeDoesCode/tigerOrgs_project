import { Head, Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import VerticalCard from "@/Components/VerticalCard";
import IconInvite from "@/Components/Icons/IconInvite";
import IconDotsVertical from "@/Components/Icons/IconDotsVertical";
import Home from "../Organizations/Home";
import IconEdit from "@/Components/Icons/IconEdit";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import { Button } from "@/Components/ui/button";
import IconPlus from "@/Components/Icons/IconPlus";
import AdminDialog from "@/Components/Admin/AdminDialog";
import AdminDropdownMenu from "@/Components/Admin/AdminInvDropdownMenu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import { useState } from "react";
import { Switch } from "@/Components/ui/switch";
import IconStars from "@/Components/Icons/IconStars";

function AdminManageForms({
    orgID,
    orgName,
    forms,
    recruitmentStatusofOSA,
    recruitmentStatusofOrg,
}) {
    const [isRecruitmentEnabledforOrg, setIsRecruitmentEnabledforOrg] =
        useState(recruitmentStatusofOrg);

    const handleRecruitmentToggle = (checked) => {
        router.post(
            route("admin.toggle-recruitment", orgID),
            {
                status: checked,
                orgID: orgID,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setIsRecruitmentEnabledforOrg(checked);
                    router.visit(route("admin.forms", orgID));
                },
                onError: () => {
                    console.error("Failed to toggle recruitment status");
                },
            }
        );
    };
    // console.log(forms)
    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                            params: { orgID },
                        },
                        {
                            icon: <IconStars />,
                            label: "Manage Criteria",
                            link: "admin.criteria.index",
                            params: { orgID },
                        },
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                            params: { orgID },
                        },
                    ]}
                    title="Manage Recruitment Form "
                    dialog={
                        <AdminDialog
                            title={`Enable/Disable Recruitment for ${orgName}`}
                            description="Note: When you enable the recruitment, users following the organization will be notified."
                            trigger={
                                <div
                                    className={`text-sm ml-3 -mt-1 ${
                                        isRecruitmentEnabledforOrg
                                            ? "text-red-600"
                                            : "text-green-600"
                                    } underline underline-offset-2`}
                                >
                                    Click here to
                                    {isRecruitmentEnabledforOrg
                                        ? " disable "
                                        : " enable "}
                                    recruitment
                                </div>
                            }
                        >
                            {!recruitmentStatusofOSA ? (
                                <label
                                    className="pr-[15px] text-[15px] leading-none text-red-600"
                                    htmlFor="airplane-mode"
                                >
                                    The recruitment for this year is currently
                                    disabled. Please wait for further
                                    announcement.
                                </label>
                            ) : (
                                ""
                            )}

                            <label
                                className="pr-[15px] text-[15px] leading-none "
                                htmlFor="airplane-mode"
                            >
                                Recruitment
                            </label>
                            <div className="flex">
                                {recruitmentStatusofOSA ? (
                                    <Switch
                                        id="recruitment-toggle"
                                        className="mr-2"
                                        checked={isRecruitmentEnabledforOrg}
                                        onCheckedChange={
                                            handleRecruitmentToggle
                                        }
                                        // onCheckedChange={field.onChange}
                                        // disabled
                                        aria-readonly
                                    />
                                ) : (
                                    <Switch
                                        id="recruitment-toggle"
                                        className="mr-2"
                                        checked={isRecruitmentEnabledforOrg}
                                        onCheckedChange={
                                            handleRecruitmentToggle
                                        }
                                        // onCheckedChange={field.onChange}
                                        disabled
                                        aria-readonly
                                    />
                                )}

                                {isRecruitmentEnabledforOrg ? "On" : "Off"}
                            </div>
                        </AdminDialog>
                    }
                >
                    <div className="p-5">
                        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-4 gap-5">
                            <Link
                                href={route("admin.formbuilder", { orgID })}
                                className=" bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out"
                            >
                                <div className="text-gray-500 bg-gray-200 size-8 p-1 rounded-full">
                                    <IconPlus />
                                </div>{" "}
                                <p className="text-black poppins ml-2">
                                    Create Form
                                </p>
                            </Link>

                            {forms.map((item, index) => (
                                <AdminDropdownMenu
                                    key={index}
                                    triggerContent={
                                        <div
                                            className={`${
                                                item.deployed &&
                                                "border-4 border-green-600"
                                            } bg-white flex items-center justify-center rounded-lg hover:bg-gray-100 min-h-14 hover:scale-[1.03] transition-all duration-300 ease-in-out`}
                                        >
                                            <p className="text-black poppins ml-2 line-clamp-2">
                                                {item.formLayout.name}
                                            </p>
                                        </div>
                                    }
                                    title="Select Action"
                                    dropdownItems={[
                                        {
                                            name: "Edit Form",
                                            onSelect: () =>
                                                router.get(
                                                    route(
                                                        "admin.formbuilder.edit",
                                                        [orgID, item.formID]
                                                    )
                                                ),
                                        },
                                        {
                                            name: (
                                                <AlertDialog>
                                                    <AlertDialogTrigger>
                                                        Delete Form
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete form "
                                                                {
                                                                    item
                                                                        .formLayout
                                                                        .name
                                                                }
                                                                " permanently?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action
                                                                cannot be
                                                                undone.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    router.delete(
                                                                        route(
                                                                            "admin.formbuilder.delete",
                                                                            [
                                                                                orgID,
                                                                                item.formID,
                                                                            ]
                                                                        )
                                                                    )
                                                                }
                                                                className="bg-amber-500 hover:bg-amber-600 transition-colors text-black"
                                                            >
                                                                Confirm
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            ),
                                            onSelect: (e) => e.preventDefault(),
                                        },
                                        {
                                            name: `${
                                                item.deployed
                                                    ? "Withdraw"
                                                    : "Deploy"
                                            } Form`,
                                            onSelect: () => {
                                                router.patch(
                                                    route(
                                                        "admin.forms.setDeploy",
                                                        [
                                                            orgID,
                                                            item.formID,
                                                            !item.deployed,
                                                        ]
                                                    ),
                                                    { preserveScroll: true }
                                                );
                                            },
                                        },
                                    ]}
                                />
                            ))}
                        </div>
                    </div>
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

export default AdminManageForms;
