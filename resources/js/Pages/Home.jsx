import { Head, Link, router } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout.jsx";
import Logo from "@/Components/Logo";
import IconSearch from "@/Components/Icons/IconSearch";
import Policy from "@/Components/ui/Custom/Policy";
import { useState } from "react";
import IconMailFilled from "@/Components/Icons/IconMailFilled";
import KeywordSelect from "@/Components/Organizations/KeywordSelect";
import InputContainer from "@/Pages/Profile/InputContainer";
import { Inertia } from "@inertiajs/inertia";
import GoogleLoginModal from "./Auth/GoogleLoginModal";
import RegisterModal from "./Auth/RegisterModal";

function Home({ bgImage, tiger1, tiger2, authModal = false, user }) {
    const hideImage = () => {
        this.style.display = "none";
    };

    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchEnterKey = (e) => {
        if (e.key !== "Enter") return;
        handleSearchQuery();
    };

    const handleSearchQuery = () => {
        const queryParameters = {};
        queryParameters["search"] = searchQuery;
        router.get(route("organizations"), queryParameters);
    };

    const modals = {
        login: <GoogleLoginModal />,
        register: <RegisterModal user={user} />,
    };

    const headName = {
        register: "Registration",
        login: "Login",
    };

    return (
        <div className="w-full">
            <Head title={headName[authModal] || "Home"} />
            <UserLayout bgImage={bgImage} noPadding>
                <div className="w-full flex-1 flex justify-center items-center relative">
                    <img
                        className="absolute bottom-[-3.3rem] sm:bottom-[-4.3rem] right-[3%] h-36 sm:h-56"
                        src={tiger1}
                        alt="tiger1"
                        onError={hideImage}
                    />
                    <img
                        className="absolute top-[-0.5rem] left-[5%] rotate-180 h-40 sm:h-60"
                        src={tiger2}
                        alt="tiger2"
                        onError={hideImage}
                    />
                    <div className="flex flex-col items-center mx-7 w-full max-w-[35rem] relative">
                        <Logo
                            className="mb-14 text-[15cqw] sm:text-[7rem] sm:mb-20"
                            leftClass="text-[#FFBC11]"
                        />
                        <div className="flex w-full max-w-lg h-14 relative">
                            <div className="absolute h-full hidden sm:flex items-center justify-center text-gray-500 w-20">
                                <IconSearch size="22" />
                            </div>
                            <input
                                type="text"
                                className="flex-1 rounded-l-full border-gray-400 border-l-[1px] border-y-[1px] border-r-0 pl-6 sm:pl-16 text-base sm:text-lg text-ellipsis overflow-hidden"
                                placeholder="Search Organizations"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearchEnterKey}
                                name="orgName"
                            />
                            <button
                                className="rounded-r-full h-auto flex items-center justify-center min-w-12 w-24 bg-[#FFCD12] border-gray-400 border-r-[1px] border-y-[1px] border-l-0 nunito font-bold"
                                onClick={handleSearchQuery}
                            >
                                <span className="hidden sm:inline">Search</span>
                                <span className="inline sm:hidden">
                                    <IconSearch size={"22"} />
                                </span>
                            </button>
                        </div>
                        <Link
                            href={route("organizations")}
                            className="hover:scale-[1.06] transition-all duration-300 ease-in-out bg-[#FFE6C1] bg-opacity-50 mt-8 sm:mt-12 p-4 sm:p-5 rounded-2xl border-[3px] border-[#FFCD12] nunito font-extrabold text-sm sm:text-xl shadow-md shadow-gray-500"
                        >
                            Browse Organizations
                        </Link>
                    </div>
                </div>
            </UserLayout>

            <div className="relative">
                {authModal && modals[authModal]}
                {/* {!isLoggedIn || (
                    <GoogleLoginModal
                        rememberMe={rememberMe}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                )} */}
                {/* {isNewUser && <Reg googleUser={googleUser} />} */}
            </div>
        </div>
    );
}

export default Home;
