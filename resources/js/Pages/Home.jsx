import { Head, Link } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout.jsx";
import Logo from "@/Components/Logo";
import IconSearch from "@/Components/Icons/IconSearch";

function Home({ bgImage, tiger1, tiger2, isLoggedIn }) {
    const hideImage = () => {
        this.style.display = "none";
    };

    return (
        <div className="w-full">
            <Head title="Home" />
            <UserLayout bgImage={bgImage}>
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
                                <IconSearch size={"22"} />
                            </div>
                            <input
                                type="text"
                                className="flex-1 rounded-l-full border-gray-400 border-l-[1px] border-y-[1px] border-r-0 pl-6 sm:pl-16 text-base sm:text-lg text-ellipsis overflow-hidden"
                                placeholder="Search Organizations"
                            />
                            <button className="rounded-r-full h-auto flex items-center justify-center min-w-12 w-24 bg-[#FFCD12] border-gray-400 border-r-[1px] border-y-[1px] border-l-0 nunito font-bold">
                                <span className="hidden sm:inline">Search</span>
                                <span className="inline sm:hidden"><IconSearch size={"22"} /></span>
                            </button>
                        </div>
                        <Link
                            href={route("organizations")}
                            className="bg-[#FFE6C1] bg-opacity-50 mt-8 sm:mt-12 p-4 sm:p-5 rounded-2xl border-[3px] border-[#FFCD12] nunito font-extrabold text-sm sm:text-xl shadow-md shadow-gray-500"
                        >
                            Browse Organizations
                        </Link>
                    </div>
                </div>
            </UserLayout>
            {isLoggedIn || <GoogleModal />}
        </div>
    );

    function GoogleModal() {
        return (
            <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20">
                <div className="fixed bg-white size-[25rem] border-gray-400 border rounded-xl p-2">
                    {/* <form onSubmit={submit}> */}
                    <div>
                        <h1 className="p-3">
                            <Logo className="text-5xl" />
                        </h1>
                        <p className="text-lg font-PoetsenOne p-4 text-zinc-500">
                            Browse and join student organizations! Login with
                            your UST Google Suite account to gain access.
                        </p>

                        <div>
                            <a
                                href="auth/google"
                                className="flex px-4 py-4 items-center m-4 h-11 border-zinc-400 border justify-center rounded-full bg-slate-200 text-center  text-black hover:bg-slate-300 "
                            >
                                <GoogleLogo className="w-6 h-6" />
                                Sign in with Google
                            </a>
                        </div>

                        <div className="px-4 py-4">
                            <h1>Privacy Notice</h1>
                            <p className="text-xs">
                                Your privacy is absolutely important to us. We
                                only use your information to enhance your
                                experience on TigerOrgs. For more details,
                                please read our{" "}
                                <button className="underline">
                                    Privacy Policy
                                </button>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );

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
