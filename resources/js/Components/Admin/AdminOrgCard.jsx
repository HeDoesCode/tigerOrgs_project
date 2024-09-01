import IconUser from "@/Components/Icons/IconUser";
import IconEye from "@/Components/Icons/IconEye";
import IconStatus from "@/Components/Icons/IconStatus";
import IconChevronDown from "@/Components/Icons/IconChevronDown";
import AdminDropdownMenu from "@/Components/Admin/AdminDropdownMenu";

function AdminOrgCard({ edit, visible, setVisible }) {
    const visibilityClass = visible
        ? "bg-green-50  border-green-600 text-green-800"
        : "bg-red-50  border-red-600 text-red-800";

    return (
        <div className="hover:scale-[1.02] transition-all duration-300 ease-in-out px-4 rounded-xl divide-y divide-gray-300 shadow-lg bg-white hover:bg-gray-100 transOptimize">
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
                            SITE Society of Information Technology Enthusiast
                        </h1>
                    </div>
                </div>
                <h3 className="text-gray-500 text-xs pt-4 text-justify font-semibold">
                    College of Information and Computing Sciences
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

                    {!edit ? (
                        <div
                            className={`text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl border-2 ${visibilityClass}`}
                        >
                            <AdminDropdownMenu
                                triggerContent={
                                    <div className="pl-1 flex content-center poppins">
                                        {visible ? "Visible" : "Not Visible"}
                                        <IconChevronDown size="15" />
                                    </div>
                                }
                                title="Select visibility"
                                dropdownItems={[
                                    {
                                        name: "Visible",
                                        value: true,
                                    },
                                    {
                                        name: "Not Visible",
                                        value: false,
                                    },
                                ]}
                                onSelect={setVisible}
                            />
                        </div>
                    ) : (
                        <div
                            className={`text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl border-2 ${visibilityClass}`}
                        >
                            <div className="pl-1 flex content-center poppins">
                                {visible ? "Visible" : "Not Visible"}
                            </div>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-6 py-1 ">
                    <div className="col-start-1 col-end-2 flex justify-center">
                        <IconStatus />
                    </div>
                    <div className="text-sm font-semibold col-start-2 col-end-4 content-center">
                        Status:
                    </div>
                    <div
                        className={`text-sm font-semibold col-start-4 col-end-7 flex justify-center rounded-xl poppins border-2 ${visibilityClass}`}
                    >
                        {visible ? "Active" : "Inactive"}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminOrgCard;
