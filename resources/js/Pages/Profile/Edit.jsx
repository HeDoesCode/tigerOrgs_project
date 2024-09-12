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
import Pre from "@/Components/Pre";
import KeywordSelect from "@/Components/Organizations/KeywordSelect";

function Edit({ user, activeUserKeywords, keywords }) {
    const fullName = `${user.firstname} ${user.lastname} ${user.middlename}`;
    const handleSectionChange = (e) => {
        setSection(e.target.value);
    };
    return (
        <div className="w-full">
            <Head title="Profile" />
            <UserLayout>
                <div className="w-full poppins text-lg md:text-xl font-bold mt-3 mb-5">
                    Manage <span className="text-[#ffb700]">Profile</span>
                </div>
                <div className="mt-4 w-full flex justify-center px-5">
                    <div className="w-full max-w-[65rem] flex flex-col items-center drop-shadow shadow-black rounded-[2rem] space-y-3 bg-[#F4F4F4] border border-gray-300">
                        <div className="h-36 w-full flex flex-col justify-center px-12 space-y-3 bg-[#ffd875] rounded-[2rem]">
                            <span className="poetsen-one text-3xl uppercase ">
                                {fullName}
                            </span>
                            <div className="flex space-x-3">
                                <IconMailFilled />
                                <span>{user.email}</span>
                            </div>
                        </div>
                        <div className="w-full rounded-[2rem] bg-[#F0F0F0] drop-shadow border border-gray-300 p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="">
                                    ID Number:
                                    <div className="text-lg font-semibold">
                                        {user.userID}
                                    </div>
                                </div>
                                <div className="">
                                    Affiliation:
                                    <div className="text-lg font-semibold ">
                                        {user.college}
                                    </div>
                                </div>
                                <div className="">
                                    Stakeholder Category:
                                    <div className="text-lg font-semibold ">
                                        {user.status}
                                    </div>
                                </div>

                                <InputField
                                    type="text"
                                    required
                                    title="Section"
                                    placeholder="[YEAR]-[SECTION] ex. 3-ITG"
                                    // value={"value"}
                                    onChange={handleSectionChange}
                                />
                            </div>
                            <div className="mt-10">
                                <InputField title="Interests">
                                    <KeywordSelect
                                        activeUserKeywords={activeUserKeywords}
                                        keywords={keywords}
                                    />
                                </InputField>
                            </div>
                            <div className="mt-10">
                                <InputField title="CV/Resume"></InputField>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout >
        </div >
    );

    function InputField({
        title,
        children,
        type,
        required,
        placeholder,
        // errorRequired = true,
        errorRequired = false,
        contents,
        min,
        max,
        onChange,
        value,
    }) {
        switch (type) {
            case "number": {
                return (
                    <div className="flex flex-col">
                        {/* <div className="w-full"></div> */}
                        <div className="w-full flex justify-between h-6">
                            <label className="h-full">
                                {title}{" "}
                                {required && (
                                    <span
                                        className={`text-red-500 text-xl leading-3`}
                                    >
                                        *
                                    </span>

                                )}
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${errorRequired || "invisible"
                                    }`}
                            >
                                Required
                            </div>
                        </div>
                        <input
                            type={type}
                            className={`w-full h-9
                            ${errorRequired
                                    ? "border-red-500 rounded-b-lg rounded-l-lg"
                                    : "border-gray-300 rounded-lg"
                                }`}
                            min={min}
                            max={max}
                            required={required}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
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
                                {required && (
                                    <span
                                        className={`text-red-500 text-xl leading-3`}
                                    >
                                        *
                                    </span>

                                )}
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${errorRequired || "invisible"
                                    }`}
                            >
                                Required
                            </div>
                        </div>
                        <Select>
                            <SelectTrigger
                                className={`w-full h-9
                            ${errorRequired
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
                                {required && (
                                    <span
                                        className={`text-red-500 text-xl leading-3`}
                                    >
                                        *
                                    </span>

                                )}
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${errorRequired || "invisible"
                                    }`}
                            >
                                Required
                            </div>
                        </div>
                        <input
                            type={type}
                            className={`w-full h-9
                            ${errorRequired
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
                                {required && (
                                    <span
                                        className={`text-red-500 text-xl leading-3`}
                                    >
                                        *
                                    </span>

                                )}
                            </label>
                            <div
                                className={`mt-2 flex items-end text-[0.7rem] px-3 text-white rounded-t-lg bg-red-500 w-fit min-w-fit ${errorRequired || "invisible"
                                    }`}
                            >
                                Required
                            </div>
                        </div>
                        <div
                            className={`w-full min-h-9 border bg-white
                        ${errorRequired
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
