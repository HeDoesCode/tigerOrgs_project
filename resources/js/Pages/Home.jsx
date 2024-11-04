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

function Home({
    bgImage,
    tiger1,
    tiger2,
    googleUser,
    isLoggedIn,
    isNewUser = false,
}) {
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

    const [rememberMe, setRememberMe] = useState(false);
    // console.log(rememberMe);

    const handleCheckboxChange = (e) => {
        setRememberMe(e.target.checked);
    };

    return (
        <div className="w-full">
            <Head title="Home" />
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
                {isLoggedIn || <GoogleModal />}
                {isNewUser && <Reg googleUser={googleUser} />}
            </div>
        </div>
    );

    function Reg({ googleUser }) {
        const [userId, setUserId] = useState(googleUser.id || "");
        const [section, setSection] = useState(googleUser.section || "");
        const [college, setCollege] = useState(googleUser.college || "");
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);

        const validateForm = () => {
            const newErrors = {};

            if (!userId.trim()) {
                newErrors.userIdError = "Specify ID Number";
            }

            if (!section.trim()) {
                newErrors.userSectionError = "Specify Section";
            } else if (!/^\d{1}-[A-Za-z]+$/.test(section)) {
                newErrors.userSectionError =
                    "Section must be in format: Year-Section (e.g., 3-ITG)";
            }

            if (!college?.trim()) {
                newErrors.collegeError = "College affiliation is required";
            }

            return newErrors;
        };

        const handleSubmit = async () => {
            setErrors({});

            const formErrors = validateForm();
            if (Object.keys(formErrors).length > 0) {
                setErrors(formErrors);
                return;
            }

            setIsSubmitting(true);
            try {
                const postData = {
                    userID: userId,
                    section: section,
                    email: googleUser?.email,
                    college: college,
                    firstname: googleUser?.firstname,
                    lastname: googleUser?.lastname,
                };

                // Validate all required fields
                const requiredFields = [
                    "userID",
                    "section",
                    "email",
                    "college",
                    "firstname",
                    "lastname",
                ];
                const missingFields = requiredFields.filter(
                    (field) => !postData[field]
                );

                if (missingFields.length > 0) {
                    throw new Error(
                        `Missing required fields: ${missingFields.join(", ")}`
                    );
                }

                // Using Inertia directly for the POST request
                await Inertia.post("/api/register", postData, {
                    onSuccess: (response) => {
                        // Check if we got a response with redirect information
                        if (response?.redirect) {
                            window.location.href = response.redirect;
                        } else {
                            // Fallback to home page
                            window.location.href = "/";
                        }
                    },
                    onError: (errors) => {
                        setErrors(errors);
                        Toast.error("Registration failed. Please try again.");
                    },
                    preserveState: true,
                });
            } catch (error) {
                console.error("Submission error:", error);
                setErrors({
                    submit:
                        error.message ||
                        "Registration failed. Please try again.",
                });
                Toast.error("Registration failed. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20 z-[50]">
                <div className="mt-4 w-full flex justify-center px-5">
                    <div className="w-full max-w-[65rem] flex flex-col items-center drop-shadow shadow-black rounded-[2rem] space-y-3 bg-[#F4F4F4] border border-gray-300">
                        <div className="h-36 w-full flex flex-col justify-center px-12 space-y-3 bg-[#ffd875] rounded-[2rem]">
                            <span className="poetsen-one text-xl sm:text-3xl uppercase">
                                {`${googleUser.firstname} ${googleUser.lastname}`}
                            </span>
                            <div className="flex gap-x-3 text-sm sm:text-base">
                                <div className="hidden sm:contents">
                                    <IconMailFilled />
                                </div>
                                <span>{googleUser.email}</span>
                            </div>
                        </div>
                        <div className="w-full rounded-[2rem] bg-[#F0F0F0] drop-shadow border border-gray-300 p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <IDInput
                                        currentId={userId}
                                        userIdError={errors.userIdError}
                                        onChange={setUserId}
                                    />
                                    {errors.userIdError && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.userIdError}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <CollegeInput
                                        currentCollege={college}
                                        onChange={setCollege}
                                    />
                                    {errors.collegeError && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.collegeError}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <SectionInput
                                        currentSection={section}
                                        userSectionError={
                                            errors.userSectionError
                                        }
                                        onChange={setSection}
                                    />
                                    {errors.userSectionError && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.userSectionError}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-6 py-1 bg-[#FFBC11] text-xs sm:text-base rounded-lg hover:bg-[#ebb222] disabled:opacity-50"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                                {errors.submit && (
                                    <p className="text-red-500 text-xs mt-2">
                                        {errors.submit}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function SectionInput({ currentSection, userSectionError, onChange }) {
        const [sectionString, setSectionString] = useState(
            currentSection || ""
        );

        const handleSectionStringChange = (e) => {
            setSectionString(e.target.value);
            onChange(e.target.value); // Pass value up to parent
        };

        return (
            <InputContainer title="Section">
                <input
                    type="text"
                    maxLength={10}
                    placeholder="[YEAR]-[SECTION] ex. 3-ITG"
                    className="w-full rounded-lg focus:border-black border-transparent"
                    value={sectionString}
                    onChange={handleSectionStringChange}
                />
            </InputContainer>
        );
    }

    function IDInput({ currentId, userIdError, onChange }) {
        const [idString, setIdString] = useState(currentId || "");

        const handleIdStringChange = (e) => {
            setIdString(e.target.value);
            onChange(e.target.value); // Pass value up to parent
        };

        return (
            <InputContainer title="ID Number:">
                <div className="flex">
                    <input
                        type="text"
                        maxLength={10}
                        placeholder="ID NUMBER"
                        className="w-full rounded-l-lg focus:border-black border-transparent"
                        value={idString}
                        onChange={handleIdStringChange}
                    />
                </div>
            </InputContainer>
        );
    }

    function CollegeInput({ currentCollege, userCollegeError, onChange }) {
        const [collegeString, setCollegeString] = useState(
            currentCollege || ""
        );

        const handleCollegeStringChange = (e) => {
            setCollegeString(e.target.value);
            onChange(e.target.value); // Update parent component's college state
        };

        return (
            <InputContainer title="College:">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="College"
                        className="w-full rounded-l-lg focus:border-black border-transparent"
                        value={collegeString}
                        onChange={handleCollegeStringChange}
                    />
                </div>
                {userCollegeError && (
                    <p className="text-red-500 text-xs mt-1">
                        {userCollegeError}
                    </p>
                )}
            </InputContainer>
        );
    }

    function GoogleModal() {
        const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

        const openPrivacyModal = () => setIsPrivacyModalOpen(true);
        const closePrivacyModal = () => setIsPrivacyModalOpen(false);

        return (
            <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20 z-[50]">
                <div className="bg-white w-[25rem] max-w-[25rem] max-h-[80vh] border-gray-400 border rounded-xl p-2 mx-5">
                    {/* <form onSubmit={submit}> */}
                    <div>
                        <h1 className="p-3">
                            <Logo className="text-5xl" />
                        </h1>
                        <p className="text-lg font-PoetsenOne p-4 text-zinc-500">
                            Browse and join student organizations! Login with
                            your UST Google Suite account to gain access.
                        </p>

                        <div className="flex flex-col">
                            <a
                                href={`/auth/google?remember_me=${rememberMe}`}
                                className="flex px-4 py-4 items-center m-4 h-11 border-zinc-400 border justify-center rounded-full bg-slate-200 text-center  text-black hover:bg-slate-300 "
                            >
                                <GoogleLogo className="w-6 h-6" />
                                Sign in with Google
                            </a>
                            <div className="flex ml-4 w-fit rounded-lg items-center hover:bg-gray-300">
                                <label
                                    htmlFor="rememberme"
                                    className="select-none cursor-pointer px-3 py-1 space-x-3 flex items-center"
                                >
                                    <input
                                        type="checkbox"
                                        id="rememberme"
                                        className="checked:bg-[#ffb700] cursor-pointer"
                                        checked={rememberMe}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>Remember Me</span>
                                </label>
                            </div>
                        </div>

                        <div className="px-4 py-4">
                            <h1>Privacy Notice</h1>
                            <p className="text-xs">
                                Your privacy is absolutely important to us. We
                                only use your information to enhance your
                                experience on TigerOrgs. For more details,
                                please read our&nbsp;
                                <button
                                    className="underline"
                                    onClick={openPrivacyModal}
                                >
                                    Privacy Policy
                                </button>
                                .
                            </p>
                        </div>
                    </div>
                    {isPrivacyModalOpen && (
                        <PrivacyPolicy onClose={closePrivacyModal} />
                    )}
                </div>
            </div>
        );

        function PrivacyPolicy({ onClose }) {
            return (
                <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20 z-[50]">
                    <div className="inter fixed bg-white mx-5 max-w-[40rem]  border-gray-400 border rounded-xl p-5 sm:p-10 space-y-5">
                        <div className="overflow-y-auto max-h-[70vh] pr-2 w-full">
                            <Policy>
                                <Policy.Title>
                                    Terms and Conditions Policy
                                </Policy.Title>
                                <Policy.Content>
                                    <Policy.Paragraph>
                                        Welcome to TigerOrgs! By accessing or
                                        using our platform, you agree to comply
                                        with and be bound by the following terms
                                        and conditions. Please read them
                                        carefully.
                                    </Policy.Paragraph>
                                    <Policy.Number
                                        number="1"
                                        title="Acceptance of Terms"
                                    >
                                        By accessing TigerOrgs, you agree to be
                                        bound by these Terms and Conditions and
                                        our Privacy Policy. If you do not agree
                                        with any part of these terms, you should
                                        not use the platform.
                                    </Policy.Number>
                                    <Policy.Number
                                        number="2"
                                        title="Eligibility"
                                    >
                                        TigerOrgs is exclusively for students,
                                        staff, and affiliated personnel of the
                                        University of Santo Tomas (UST). By
                                        using the platform, you confirm that you
                                        are a current member of the UST
                                        community and have a valid UST Gmail
                                        account.
                                    </Policy.Number>
                                    <Policy.Number
                                        number="3"
                                        title="User Registration and Accounts"
                                    >
                                        <Policy.Bullet>
                                            You must login using your UST Gmail
                                            account. You are responsible for
                                            maintaining the confidentiality of
                                            your login credentials and for all
                                            activities that occur under your
                                            account.
                                        </Policy.Bullet>
                                    </Policy.Number>
                                    <Policy.Number
                                        number="4"
                                        title="Use of the Platform"
                                    >
                                        <Policy.Bullet>
                                            Content and Conduct: You agree to
                                            use TigerOrgs only for lawful
                                            purposes and in a way that does not
                                            infringe the rights of others or
                                            restrict their use and enjoyment of
                                            the platform.
                                        </Policy.Bullet>
                                        <Policy.Bullet>
                                            Prohibited Activities: You must not
                                            misuse the platform by introducing
                                            viruses, trojans, or other harmful
                                            material or by attempting to gain
                                            unauthorized access to any part of
                                            the platform.
                                        </Policy.Bullet>
                                    </Policy.Number>
                                    <Policy.Number number="5" title="Policy">
                                        Your use of the platform is also
                                        governed by our Privacy Policy, which
                                        details how we collect, use, and protect
                                        your personal information.
                                    </Policy.Number>
                                </Policy.Content>
                            </Policy>
                            <div className="pt-7 flex items-end justify-center sm:justify-end space-x-2 sm:space-x-4">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-1 bg-[#FFBC11] text-xs sm:text-base rounded-lg hover:bg-[#ebb222]"
                                >
                                    Accept
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        function LoginError() {
            return (
                <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20 z-[2147483647]">
                    <div className="bg-white w-[25rem] max-w-[25rem] max-h-[80vh] border-gray-400 border rounded-xl p-2 mx-5">
                        {/* <form onSubmit={submit}> */}
                        <div>
                            <h1 className="p-3">
                                <Logo className="text-5xl" />
                            </h1>
                            <p className="text-lg font-PoetsenOne p-4 text-zinc-500">
                                Only Bonafide students of University of Santo
                                Tomas may login.
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        function GoogleLogo() {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    preserveAspectRatio="xMidYMid"
                    viewBox="0 0 256 262"
                    id="google"
                    className="mx-2"
                >
                    <path
                        fill="#4285F4"
                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    ></path>
                    <path
                        fill="#34A853"
                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    ></path>
                    <path
                        fill="#FBBC05"
                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                    ></path>
                    <path
                        fill="#EB4335"
                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    ></path>
                </svg>
            );
        }
    }
}

export default Home;
