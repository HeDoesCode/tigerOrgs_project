import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout.jsx";
import SuperAdminLayout from "@/Layouts/SuperAdminLayout";
import IconInvite from "@/Components/Icons/IconInvite";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconUser from "@/Components/Icons/IconUser";
import IconEye from "@/Components/Icons/IconEye";
import IconStatus from "@/Components/Icons/IconStatus";
import IconChevronDown from "@/Components/Icons/IconChevronDown";
import MainAdminFrame from "@/Components/MainAdminFrame";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

export default function SuperAdminManage() {
    return (
        <div className="w-full">
            <Head title="OSA Dashboard" />
            <SuperAdminLayout>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Status",
                            link: route("superadmin.status"),
                        },
                        {
                            icon: <IconInvite />,
                            label: "Invite",
                            link: route("superadmin.invite"),
                        },
                    ]}
                >
                    <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 gap-4 p-5">
                        <Card className="px-4 rounded-xl divide-y divide-gray-300 shadow-lg hover:bg-gray-100">
                            <div className="py-4 ">
                                <div className="grid grid-cols-3 divide-x divide-gray-300">
                                    <div className="p-2 content-center">
                                        <img
                                            className="rounded-full"
                                            src="https://scontent.fmnl3-3.fna.fbcdn.net/v/t39.30808-6/440096730_826883032808917_2272899317032424872_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFY16kie3QKS5JLsu4R5Co3s8I0CHAxSVezwjQIcDFJV5grYXpdnx2rAo0x6IfMB54BbPIGz1zC9qWORtbekVnR&_nc_ohc=o4senzkxINEQ7kNvgEcR4qP&_nc_ht=scontent.fmnl3-3.fna&oh=00_AYAIbyF-ixCWFza2D-A3bW7QegWlGJsxnzn_4qB24rLvww&oe=66BA59F9"
                                        />
                                    </div>
                                    <div className="col-span-2  px-2">
                                        <h1 className="text-sm font-bold py-4 ">
                                            SITE Society of Information
                                            Technology Enthusiast
                                        </h1>
                                    </div>
                                </div>
                                <h3 className="text-xs pt-4 text-justify">
                                    College of Information and Computing
                                    Sciences
                                </h3>
                            </div>

                            <div className="grid grid-rows-1 py-4">
                                <div className="grid grid-cols-6 py-1">
                                    <div className="col-start-1 col-end-2 flex justify-center">
                                        <IconUser />
                                    </div>
                                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                                        Members:
                                    </div>
                                    <div className="text-sm font-semibold col-start-4 col-end-7 flex justify-center">
                                        116
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 py-1 ">
                                    <div className="col-start-1 col-end-2 flex justify-center ">
                                        <IconEye />
                                    </div>
                                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                                        <span>Visibility:</span>
                                    </div>
                                    <div className="text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl bg-green-50 border-2 border-green-600 text-green-800">
                                        <div className="">Visible</div>
                                        <div className="pl-1 content-center">
                                            <IconChevronDown size="15" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-6 py-1 ">
                                    <div className="col-start-1 col-end-2 flex justify-center">
                                        <IconStatus />
                                    </div>
                                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                                        Status:
                                    </div>
                                    <div className="text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl bg-green-200 border-2 border-green-600 text-green-800">
                                        Active
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </MainAdminFrame>
            </SuperAdminLayout>
        </div>
    );
}
