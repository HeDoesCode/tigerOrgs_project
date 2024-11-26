import GoogleLogo from "@/Components/Icons/GoogleLogo";
import Logo from "@/Components/Logo";
import { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";

function GoogleLoginModal() {
    const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleGoogleLogin = () => {
        // Continue with Google login
    };

    const handlePrivacyPolicyClose = () => {
        setIsPrivacyModalOpen(false); // Close the Privacy Policy modal
    };

    return (
        <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20 z-[50]">
            <div className="bg-white w-[25rem] max-w-[25rem] max-h-[80vh] border-gray-400 border rounded-xl p-2 mx-5">
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
                            onClick={handleGoogleLogin} // Add login handler here if needed
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
                                    onChange={(e) =>
                                        setRememberMe(e.target.checked)
                                    }
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
                                className="underline inline"
                                onClick={() => setIsPrivacyModalOpen(true)}
                            >
                                Privacy Policy
                            </button>
                            .
                        </p>
                    </div>
                </div>

                {isPrivacyModalOpen && (
                    <PrivacyPolicy onClose={handlePrivacyPolicyClose} />
                )}
            </div>
        </div>
    );
}

export default GoogleLoginModal;
