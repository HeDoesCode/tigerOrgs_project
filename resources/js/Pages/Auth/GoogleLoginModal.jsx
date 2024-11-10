import GoogleLogo from "@/Components/Icons/GoogleLogo";
import Logo from "@/Components/Logo";
import { useState } from "react";

function GoogleLoginModal({ rememberMe, handleCheckboxChange }) {
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
                        Browse and join student organizations! Login with your
                        UST Google Suite account to gain access.
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
                            Your privacy is absolutely important to us. We only
                            use your information to enhance your experience on
                            TigerOrgs. For more details, please read our&nbsp;
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
                                    Welcome to TigerOrgs! By accessing or using
                                    our platform, you agree to comply with and
                                    be bound by the following terms and
                                    conditions. Please read them carefully.
                                </Policy.Paragraph>
                                <Policy.Number
                                    number="1"
                                    title="Acceptance of Terms"
                                >
                                    By accessing TigerOrgs, you agree to be
                                    bound by these Terms and Conditions and our
                                    Privacy Policy. If you do not agree with any
                                    part of these terms, you should not use the
                                    platform.
                                </Policy.Number>
                                <Policy.Number number="2" title="Eligibility">
                                    TigerOrgs is exclusively for students,
                                    staff, and affiliated personnel of the
                                    University of Santo Tomas (UST). By using
                                    the platform, you confirm that you are a
                                    current member of the UST community and have
                                    a valid UST Gmail account.
                                </Policy.Number>
                                <Policy.Number
                                    number="3"
                                    title="User Registration and Accounts"
                                >
                                    <Policy.Bullet>
                                        You must login using your UST Gmail
                                        account. You are responsible for
                                        maintaining the confidentiality of your
                                        login credentials and for all activities
                                        that occur under your account.
                                    </Policy.Bullet>
                                </Policy.Number>
                                <Policy.Number
                                    number="4"
                                    title="Use of the Platform"
                                >
                                    <Policy.Bullet>
                                        Content and Conduct: You agree to use
                                        TigerOrgs only for lawful purposes and
                                        in a way that does not infringe the
                                        rights of others or restrict their use
                                        and enjoyment of the platform.
                                    </Policy.Bullet>
                                    <Policy.Bullet>
                                        Prohibited Activities: You must not
                                        misuse the platform by introducing
                                        viruses, trojans, or other harmful
                                        material or by attempting to gain
                                        unauthorized access to any part of the
                                        platform.
                                    </Policy.Bullet>
                                </Policy.Number>
                                <Policy.Number number="5" title="Policy">
                                    Your use of the platform is also governed by
                                    our Privacy Policy, which details how we
                                    collect, use, and protect your personal
                                    information.
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
}

export default GoogleLoginModal;
