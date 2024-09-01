import IconMailFilled from "@/Components/Icons/IconMailFilled";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import ControlKeywords from "@/Components/Organizations/ControlKeywords";

function Edit() {
    const departments = [
        {
            name: "(CICS) College of Information and Computing Sciences",
            value: "cics",
        },
        {
            name: "(FOE) Faculty of Engineering",
            value: "foe",
        },
    ];

    return (
        <div className="w-full">
            <Head title="Profile" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">
                    Manage <span className="text-[#ffb700]">Profile</span>
                </div>
                <div className="mt-4 w-full flex justify-center px-5">
                    <div className="w-full max-w-[40rem] flex flex-col items-center drop-shadow shadow-black rounded-[2rem] space-y-3 bg-[#F4F4F4] border border-gray-300">
                        <div className="h-36 w-full flex flex-col justify-center px-16 space-y-3 bg-[#ffd875] rounded-[2rem]">
                            <span className="poetsen-one text-3xl">
                                Alex Martinez
                            </span>
                            <div className="flex space-x-3">
                                <IconMailFilled />
                                <span>alex.martinez.cics@ust.edu.ph</span>
                            </div>
                        </div>
                        <div className="w-full rounded-[2rem] bg-[#F0F0F0] drop-shadow border border-gray-300 p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField
                                    type="number"
                                    required
                                    title="ID Number"
                                    placeholder="2000123456"
                                    min={2000000000}
                                    max={2999999999}
                                />
                                <InputField
                                    type="select"
                                    required
                                    title="Department"
                                    placeholder="Select Department"
                                    contents={departments}
                                />
                                <InputField
                                    type="text"
                                    required
                                    title="Section"
                                    placeholder="[YEAR]-[SECTION] ex. 3-ITG"
                                    contents={departments}
                                />
                            </div>
                            <div className="mt-10">
                                <InputField title="Interests">
                                    <ControlKeywords />
                                </InputField>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        </div>
    );

    function InputField({
        title,
        children,
        type,
        required,
        placeholder,
        errorRequired = true,
        contents,
        min,
        max,
    }) {
        switch (type) {
            case "number": {
                return (
                    <div className="flex flex-col">
                        {/* <div className="w-full"></div> */}
                        <div className="w-full flex justify-between h-6">
                            <label className="h-full">
                                {title}{" "}
                                <span
                                    className={`text-red-500 text-xl leading-3`}
                                >
                                    *
                                </span>
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${
                                    errorRequired || "invisible"
                                }`}
                            >
                                Required
                            </div>
                        </div>
                        <input
                            type={type}
                            className={`w-full h-9
                            ${
                                errorRequired
                                    ? "border-red-500 rounded-b-lg rounded-l-lg"
                                    : "border-gray-300 rounded-lg"
                            }`}
                            min={min}
                            max={max}
                            required={required}
                            placeholder={placeholder}
                        />
                    </div>
                );
            }
            case "select": {
                return (
                    <div className="flex flex-col">
                        {/* <div className="w-full"></div> */}
                        <div className="w-full flex justify-between h-6">
                            <label className="h-full">
                                {title}{" "}
                                <span
                                    className={`text-red-500 text-xl leading-3`}
                                >
                                    *
                                </span>
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${
                                    errorRequired || "invisible"
                                }`}
                            >
                                Required
                            </div>
                        </div>
                        <Select>
                            <SelectTrigger
                                className={`w-full h-9
                            ${
                                errorRequired
                                    ? "border-red-500 rounded-tr-none rounded-b-lg rounded-l-lg"
                                    : "border-gray-300 rounded-lg"
                            }`}
                            >
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                            <SelectContent className="border-gray-500 bg-[#EEEEEE] quicksand">
                                {contents.map((content, index) => (
                                    <SelectItem
                                        value={content.value}
                                        className="hover:!bg-gray-800 hover:!text-white focus:!bg-gray-800 focus:!text-white h-10"
                                    >
                                        <div className="!text-center">
                                            {content.name}
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                );
            }
            case "text": {
                return (
                    <div className="flex flex-col">
                        {/* <div className="w-full"></div> */}
                        <div className="w-full flex justify-between h-6">
                            <label className="h-full">
                                {title}{" "}
                                <span
                                    className={`text-red-500 text-xl leading-3`}
                                >
                                    *
                                </span>
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${
                                    errorRequired || "invisible"
                                }`}
                            >
                                Required
                            </div>
                        </div>
                        <input
                            type={type}
                            className={`w-full h-9
                            ${
                                errorRequired
                                    ? "border-red-500 rounded-b-lg rounded-l-lg"
                                    : "border-gray-300 rounded-lg"
                            }`}
                            required={required}
                            placeholder={placeholder}
                        />
                    </div>
                );
            }
            default: {
                return (
                    <div className="flex flex-col">
                        {/* <div className="w-full"></div> */}
                        <div className="w-full flex justify-between h-6">
                            <label className="h-full">
                                {title}{" "}
                                <span
                                    className={`text-red-500 text-xl leading-3`}
                                >
                                    *
                                </span>
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${
                                    errorRequired || "invisible"
                                }`}
                            >
                                Required
                            </div>
                        </div>
                        <div
                            className={`w-full min-h-9 border bg-white
                        ${
                            errorRequired
                                ? "border-red-500 rounded-b-lg rounded-l-lg"
                                : "border-gray-300 rounded-lg"
                        }`}
                            required={required}
                            placeholder={placeholder}
                        >
                            {children}
                        </div>
                    </div>
                );
            }
        }
    }
}

export default Edit;
