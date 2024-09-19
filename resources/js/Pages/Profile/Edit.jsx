import IconMailFilled from "@/Components/Icons/IconMailFilled";
import UserLayout from "@/Layouts/UserLayout";
import { Head, router } from "@inertiajs/react";
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
import React from "react";
import TextInput from "@/Components/ui/TextInput";
// import { useState } from "react";

function Edit({ user, activeUserKeywords, keywords }) {
    const fullName = `${user.firstname} ${user.lastname} ${user.middlename}`;
    const userSectionError = user.section != null ? null : 'Specify Section'; // if section exists, no error


    const handleSectionOnKeyDown = (e) => {
        if (e.key === 'Enter' && e.target.value !== '') {
            const section = e.target.value
            patchSection(section)
        }
    }

    const patchSection = (section) => {
        router.patch(route('update.user.section'), {
            section
        });
    }

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
                            <span className="poetsen-one text-xl sm:text-3xl uppercase ">
                                {fullName}
                            </span>
                            <div className="flex gap-x-3 text-sm sm:textbase">
                                <div className="hidden sm:contents">
                                    <IconMailFilled />
                                </div>
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

                                <InputContainer title='Section' error={userSectionError}>
                                    <input
                                        type="text"
                                        placeholder={user.section || "[YEAR]-[SECTION] ex. 3-ITG"}
                                        className={`w-full ${user.section ? 'placeholder-black focus:placeholder-transparent rounded-lg focus:border-black' : ''}`}
                                        onKeyDown={handleSectionOnKeyDown}
                                    />
                                </InputContainer>

                            </div>
                            <div className="mt-10">
                                <InputContainer title='Interests' className='min-h-11'>
                                    <KeywordSelect
                                        activeUserKeywords={activeUserKeywords}
                                        keywords={keywords}
                                    />
                                </InputContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout >
        </div >
    );

    function InputContainer({ children, className, error, title, ...props }) {
        const hasRequiredChild = React.Children.toArray(children).some(child =>
            React.isValidElement(child) && child.props.required
        );

        const modifiedChildren = React.Children.map(children, child => {
            if (React.isValidElement(child)) {
                if (child.type === 'input') {
                    // Append the additional class to the existing className
                    const existingClassName = child.props.className || '';
                    return React.cloneElement(child, {
                        className: `${existingClassName} border-none h-full`.trim()
                    });
                }
                // If not an input, just return the child as is
                return child;
            }
            return child;
        });


        return (
            <div className="flex flex-col">
                {/* <div className="w-full"></div> */}
                <div className="w-full flex justify-between gap-x-1 items-end">
                    <label className="h-fit flex-1 flex-wrap leading-[1.15rem]">
                        {title} {hasRequiredChild && (
                            <span
                                className={`text-red-500 text-xl leading-3`}
                            >
                                *
                            </span>

                        )}
                    </label>
                    <div
                        className={`mt-2 flex items-end text-[0.7rem] leading-[0.8rem] py-1 px-2 max-w-32 h-fit text-white rounded-t-lg bg-red-500 ${error ? '' : "invisible"
                            }`}
                    >
                        {error}
                    </div>
                </div>
                <div className={`w-full min-h-9 bg-white border overflow-clip ${error
                    ? "border-red-500 rounded-b-lg rounded-l-lg"
                    : "border-gray-300 rounded-lg"
                    } ${className}`}
                >
                    {modifiedChildren}
                </div>
            </div>
        )
    }
}

export default Edit;
