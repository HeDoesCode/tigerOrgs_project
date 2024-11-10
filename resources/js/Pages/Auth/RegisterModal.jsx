import IconMailFilled from "@/Components/Icons/IconMailFilled";
import { useForm } from "@inertiajs/react";
import InputContainer from "../Profile/InputContainer";
import { usePage } from "@inertiajs/react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

function RegisterModal({ user }) {
    const affiliations = usePage().props.affiliations;

    const { data, setData, post, processing, errors } = useForm({
        userID: "",
        middleName: "",
        college: "",
        section: "",
    });

    function handleFormDataChange(e) {
        setData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    const handleCollegeDataChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            college: e,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register"), { preserveState: true });
    };

    return (
        <div className="fixed inset-0 h-screen w-screen flex justify-center items-center backdrop-blur-sm bg-gray-700/20 z-[50]">
            <div className="bg-white w-full max-w-[50rem] max-h-[80vh] rounded-[2rem] mx-5">
                <div className="w-full flex flex-col gap-y-3">
                    <div className="h-28 sm:h-36 w-full flex flex-col justify-center px-12 space-y-3 bg-[#ffd875] rounded-[2rem]">
                        <span className="poetsen-one text-1xl sm:text-3xl uppercase">
                            {user.fullName}
                        </span>
                        <div className="flex gap-x-3 text-sm sm:textbase">
                            <div className="hidden sm:contents">
                                <IconMailFilled />
                            </div>
                            <span className="truncate">{user.email}</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="contents">
                        <div className="w-full rounded-[2rem] bg-[#F0F0F0] drop-shadow border border-gray-300 p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputContainer
                                    title="Student ID:"
                                    error={errors.userID}
                                >
                                    <input
                                        type="text"
                                        required
                                        autoComplete="off"
                                        spellCheck={false}
                                        name="userID"
                                        className={`w-full ${
                                            data.userID.length !== 0 &&
                                            "font-bold tracking-widest"
                                        }`}
                                        value={data.userID}
                                        placeholder="(required)"
                                        maxLength="10"
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^[0-9]*$/.test(value)) {
                                                handleFormDataChange(e); // Update state if valid
                                            }
                                        }}
                                    />
                                </InputContainer>
                                <InputContainer
                                    title="Middle Name:"
                                    error={errors.middleName}
                                >
                                    <input
                                        type="text"
                                        name="middleName"
                                        autoComplete="off"
                                        spellCheck={false}
                                        className="w-full"
                                        value={data.middleName}
                                        placeholder="(optional)"
                                        onChange={(e) => {
                                            e.target.value =
                                                e.target.value.toUpperCase();
                                            handleFormDataChange(e);
                                        }}
                                    />
                                </InputContainer>
                                <InputContainer
                                    title="College/Affiliation:"
                                    error={errors.college}
                                >
                                    <Select
                                        required
                                        onValueChange={handleCollegeDataChange}
                                        defaultValue={data.college || ""}
                                    >
                                        <SelectTrigger className="w-full text-left truncate">
                                            <SelectValue placeholder="-- select --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {affiliations.map(
                                                (affiliation, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={affiliation}
                                                    >
                                                        {affiliation}
                                                    </SelectItem>
                                                )
                                            )}
                                            {/* <SelectItem value="dark">
                                                Dark
                                            </SelectItem>
                                            <SelectItem value="system">
                                                System
                                            </SelectItem> */}
                                        </SelectContent>
                                    </Select>
                                </InputContainer>
                                <InputContainer
                                    title="Section:"
                                    error={errors.section}
                                >
                                    <input
                                        type="text"
                                        autoComplete="off"
                                        spellCheck={false}
                                        name="section"
                                        className="w-full"
                                        value={data.section}
                                        placeholder="(optional)"
                                        onChange={(e) => {
                                            e.target.value =
                                                e.target.value.toUpperCase();
                                            if (
                                                /^[A-Za-z0-9-]*$/.test(
                                                    e.target.value
                                                )
                                            )
                                                handleFormDataChange(e);
                                        }}
                                    />
                                </InputContainer>
                            </div>
                            <div className="w-full flex justify-end mt-7">
                                <button
                                    type="submit"
                                    className="bg-[#ffb700] px-4 py-1 rounded-lg h-[2em] w-[9ch] text-center"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <div className="w-full h-full flex justify-center items-center">
                                            <div className="dot-flashing" />
                                        </div>
                                    ) : (
                                        "Submit"
                                    )}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterModal;
