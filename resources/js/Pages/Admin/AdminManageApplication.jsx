import { Head, router, usePage } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MainAdminFrame from "@/Components/MainAdminFrame";
import IconCheckBox from "@/Components/Icons/IconCheckBox";
import IconForms from "@/Components/Icons/IconForms";
import IconHistory from "@/Components/Icons/IconHistory";
import DotsVertical from "@/Components/DotsVertical";
import AdminDialog from "@/Components/Admin/AdminDialog";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import RenderFormItem from "@/Components/Forms/Form-Renderer/RenderFormItem";
import RenderFormItemAnswers from "@/Components/Forms/Form-Renderer/RenderFormItemAnswers";
import { TokenizerEn, StemmerEn } from "@nlpjs/lang-en";
import pos from "pos";

function AdminManageApplication({ orgID, formsWithApplications, orgCriteria }) {
    const [selectedFormId, setSelectedFormId] = useState(null);
    const [similarityScores, setSimilarityScores] = useState({});

    const handleFormSelect = (formId) => {
        setSelectedFormId(formId);
    };

    const selectedForm = formsWithApplications.find(
        (form) => form.formID === selectedFormId
    );
    const hasApplications = selectedForm?.applications?.length > 0;

    //for testing
    // Initialize NLP tools
    const preprocessText = (text, tokenizer, tagger) => {
        if (!text || typeof text !== "string") return [];
        const tokens = tokenizer.tokenize(text.toLowerCase());
        const posTags = tagger.tag(tokens);
        return tokens.filter((_, i) => {
            const tag = posTags[i][1];
            return !["CC", "DT", "IN", "PRP", "UH"].includes(tag);
        });
    };

    // Calculate Term Frequency for a document
    const calculateTF = (tokens) => {
        const termFreq = {};
        tokens.forEach((term) => {
            termFreq[term] = (termFreq[term] || 0) + 1;
        });
        const maxFreq = Math.max(...Object.values(termFreq));
        return Object.fromEntries(
            Object.entries(termFreq).map(([term, freq]) => [
                term,
                freq / maxFreq,
            ])
        );
    };

    // Calculate IDF for all documents
    const calculateIDF = (documentsTokens) => {
        const numDocs = documentsTokens.length;
        const termDocs = {};

        documentsTokens.forEach((tokens) => {
            new Set(tokens).forEach((term) => {
                termDocs[term] = (termDocs[term] || 0) + 1;
            });
        });

        return Object.fromEntries(
            Object.entries(termDocs).map(([term, freq]) => [
                term,
                Math.log(numDocs / freq),
            ])
        );
    };

    // Calculate TF-IDF vector for a document
    const calculateTFIDF = (tf, idf) => {
        const tfidf = {};
        Object.keys(tf).forEach((term) => {
            if (idf[term]) {
                tfidf[term] = tf[term] * idf[term];
            }
        });
        return tfidf;
    };

    // Calculate cosine similarity between two TF-IDF vectors
    const calculateCosineSimilarity = (vector1, vector2) => {
        const terms = new Set([
            ...Object.keys(vector1),
            ...Object.keys(vector2),
        ]);

        let dotProduct = 0;
        let magnitude1 = 0;
        let magnitude2 = 0;

        terms.forEach((term) => {
            const v1 = vector1[term] || 0;
            const v2 = vector2[term] || 0;
            dotProduct += v1 * v2;
            magnitude1 += v1 * v1;
            magnitude2 += v2 * v2;
        });

        magnitude1 = Math.sqrt(magnitude1);
        magnitude2 = Math.sqrt(magnitude2);

        if (magnitude1 === 0 || magnitude2 === 0) return 0;
        return dotProduct / (magnitude1 * magnitude2);
    };

    // Main function to compare criteria with user answers
    const compareCriteriaWithAnswers = (criteria, userAnswers) => {
        const tokenizer = new TokenizerEn();
        const tagger = new pos.Tagger();

        // Process criteria descriptions
        const criteriaTokens = criteria.map((criterion) =>
            preprocessText(criterion.description, tokenizer, tagger)
        );

        // Process user answers
        const answerTokens = userAnswers.map((answer) =>
            preprocessText(answer, tokenizer, tagger)
        );

        // Combine all documents for IDF calculation
        const allDocuments = [...criteriaTokens, ...answerTokens];
        const idf = calculateIDF(allDocuments);

        // Calculate TF-IDF vectors for criteria
        const criteriaTFIDF = criteriaTokens.map((tokens) => {
            const tf = calculateTF(tokens);
            return calculateTFIDF(tf, idf);
        });

        // Calculate TF-IDF vectors for answers
        const answersTFIDF = answerTokens.map((tokens) => {
            const tf = calculateTF(tokens);
            return calculateTFIDF(tf, idf);
        });

        // Calculate similarity scores
        const similarityScores = criteriaTFIDF.map((criterionVector, i) => {
            return answersTFIDF.map((answerVector) =>
                calculateCosineSimilarity(criterionVector, answerVector)
            );
        });

        return similarityScores;
    };

    // Usage in your component:
    useEffect(() => {
        if (selectedForm?.applications && orgCriteria) {
            // Debug logs
            console.log("Organization Criteria:", orgCriteria);
            console.log("Selected Form:", selectedForm);

            // Convert criteria to the format we need
            const criteriaDescriptions = orgCriteria
                .filter(
                    (criterion) =>
                        criterion && typeof criterion.description === "string"
                )
                .map((criterion) => ({
                    id: criterion.criteriaID,
                    description: criterion.description,
                }));

            console.log("Criteria Descriptions:", criteriaDescriptions);

            const newSimilarityScores = {};

            selectedForm.applications.forEach((application) => {
                // Extract text answers from application
                const textAnswers = application.userData.layout
                    .filter(
                        (item) =>
                            typeof item.value === "string" &&
                            item.value.trim() !== ""
                    )
                    .map((item) => item.value);

                console.log(
                    "Text Answers for application",
                    application.applicationID,
                    ":",
                    textAnswers
                );

                if (
                    criteriaDescriptions.length === 0 ||
                    textAnswers.length === 0
                ) {
                    console.log("No valid criteria or answers to compare");
                    newSimilarityScores[application.applicationID] = 0;
                    return;
                }

                // Calculate similarity scores
                const scores = compareCriteriaWithAnswers(
                    criteriaDescriptions,
                    textAnswers
                );

                console.log(
                    "Raw Similarity Scores for Application:",
                    application.applicationID
                );
                console.log("Scores:", scores);

                // Calculate average similarity score
                const flatScores = scores.flat();
                const averageScore =
                    flatScores.length > 0
                        ? (flatScores.reduce((a, b) => a + b, 0) /
                              flatScores.length) *
                          100
                        : 0;

                newSimilarityScores[application.applicationID] = averageScore;

                console.log(
                    "Average Similarity Score for application",
                    application.applicationID,
                    ":",
                    averageScore.toFixed(2) + "%"
                );
            });

            setSimilarityScores(newSimilarityScores);
        }
    }, [selectedForm, orgCriteria]);

    return (
        <div className="w-full">
            <Head title="Admin Dashboard" />
            <AdminLayout orgID={orgID}>
                <MainAdminFrame
                    navItems={[
                        {
                            icon: <IconCheckBox />,
                            label: "Student Applications",
                            link: "admin.applications",
                            params: { orgID },
                        },
                        {
                            icon: <IconForms />,
                            label: "Recruitment Form",
                            link: "admin.forms",
                            params: { orgID },
                        },
                        {
                            icon: <IconHistory />,
                            label: "Form History",
                            link: "admin.formhistory",
                            params: { orgID },
                        },
                        {
                            icon: <IconCheckBox />,
                            label: "Manage Criteria",
                            link: "admin.criteria.index",
                            params: { orgID },
                        },
                    ]}
                    title="Manage Student Applications"
                >
                    {formsWithApplications.length > 0 ? (
                        <div className="">
                            <div className="grid grid-cols-12 divide-x divide-gray-200">
                                <div className="col-span-2 mb-6">
                                    <div className="poppins p-5">
                                        Forms Available:
                                    </div>
                                    <div className="h-[500px] overflow-auto">
                                        {formsWithApplications.map((form) => (
                                            <ApplicationForms
                                                key={form.formID}
                                                formID={form.formID}
                                                name={form.formLayout?.name}
                                                applicationCount={
                                                    form.applications?.length ||
                                                    0
                                                }
                                                selected={
                                                    selectedFormId ===
                                                    form.formID
                                                }
                                                onSelect={() =>
                                                    handleFormSelect(
                                                        form.formID
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="col-span-10 min-h-[500px]">
                                    <div className="poppins">
                                        <h1 className="p-5">
                                            Application Responses for the form{" "}
                                            <span className="underline underline-offset-2">
                                                {selectedForm?.formLayout
                                                    ?.name || "Select a form"}
                                            </span>
                                            :
                                        </h1>
                                    </div>
                                    {selectedForm && hasApplications ? (
                                        <div className="min-h-[500px] h-[500px] overflow-auto">
                                            <table className="mr-3 bg-white divide-y min-h-[500px] rounded-r-xl divide-gray-200">
                                                <thead>
                                                    <tr className="lg:grid hidden font-bold grid-cols-9 py-4 text-center">
                                                        <th className="col-span-2 text-sm">
                                                            Full Name
                                                        </th>
                                                        <th className="col-span-2 text-sm">
                                                            College
                                                        </th>
                                                        <th className="col-span-2 text-sm">
                                                            Email
                                                        </th>
                                                        <th className="col-span-1 text-sm">
                                                            Date Submitted
                                                        </th>
                                                        <th className="col-span-1 text-sm">
                                                            Similarity Score
                                                        </th>
                                                        <th className="col-span-1 text-sm">
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {selectedForm.applications.map(
                                                        (application) => (
                                                            <ApplicationResponses
                                                                key={
                                                                    application.applicationID
                                                                }
                                                                application={
                                                                    application
                                                                }
                                                                orgID={orgID}
                                                                selectedFormId={
                                                                    selectedFormId
                                                                }
                                                                similarityScores={
                                                                    similarityScores
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="m-14 sm:m-48 text-xl text-gray-600 font-thin text-center">
                                            {selectedForm
                                                ? "No Responses Found"
                                                : "Select a form to view responses"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="m-14 sm:m-48 text-xl text-gray-600 font-thin text-center">
                                No Recruitment Form Found
                            </div>
                        </div>
                    )}
                </MainAdminFrame>
            </AdminLayout>
        </div>
    );
}

function ApplicationForms({
    formID,
    name,
    applicationCount,
    selected,
    onSelect,
}) {
    return (
        <div
            onClick={onSelect}
            className={`cursor-pointer p-4 rounded-l-xl text-sm ml-3 ${
                selected ? "bg-white" : ""
            } hover:bg-white flex justify-between items-center`}
        >
            <h1 className="font-extrabold">{name}</h1>
            <div className="ml-2 mr-2 rounded-full p-1 text-xs text-center font-bold bg-gray-300">
                {applicationCount}
            </div>
        </div>
    );
}

function ApplicationResponses({
    application,
    orgID,
    selectedFormId,
    similarityScores,
}) {
    const { errors } = usePage().props;
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
        });
    };

    // Now we can access user data through application.user
    const user = application.user;

    const [status, setStatus] = useState("accepted");

    const handleStatusValue = (value) => {
        setStatus(value);
    };

    const [message, setMessage] = useState("");

    const handleInputMessageValue = (value) => {
        setMessage(value);
    };

    const [selectedUser, setselectedUser] = useState(null);

    const handleUserSelect = (userId) => {
        setselectedUser(userId);
    };

    const [selectedApplicationId, setselectedApplicationId] = useState(null);

    const handleApplicationSelect = (applicationId) => {
        setselectedApplicationId(applicationId);
    };

    function handleStatusSubmit(e) {
        e.preventDefault();

        router.patch(
            route("admin.setStatus", orgID),
            {
                formID: selectedFormId,
                userID: selectedUser,
                applicationID: selectedApplicationId,
                orgID: orgID,
                status: status,
                message: message,
            },
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    setStatus("accepted");
                    setMessage("");
                },
                onError: () => {
                    console.error("Save failed. Please try again.");
                },
            }
        );

        console.log(selectedApplicationId);
        console.log(status);
        console.log(selectedUser);
        console.log(orgID);
        console.log(message);
        console.log(selectedFormId);
    }

    return (
        <tr className="grid grid-cols-1 hover:bg-gray-100 lg:grid-cols-9 py-2 text-center min-h-16">
            <td className="lg:col-span-2 text-sm content-center">
                {user?.firstname} {user?.lastname}
            </td>
            <td className="lg:col-span-2 text-sm content-center">
                {user?.college}
            </td>
            <td className="lg:col-span-2 text-sm content-center truncate">
                {user?.email}
            </td>
            <td className="col-span-1 text-sm content-center">
                {formatDate(application.created_at)}
            </td>
            <td className="lg:col-span-1 px-4 text-sm content-center">
                <div className={`bg-[#609B00] rounded-xl text-white`}>
                    {similarityScores[application.applicationID]
                        ? `${similarityScores[
                              application.applicationID
                          ].toFixed(1)}% Match`
                        : "Calculating..."}
                </div>
            </td>
            <td className="col-span-1 text-sm grid grid-cols-2">
                <AdminDialog
                    title="Answer of the Applicant"
                    trigger={
                        <div className="underline content-center underline-offset-2">
                            View <span className="lg:hidden">Response</span>
                        </div>
                    }
                >
                    <div className="space-y-4">
                        <h3 className="text-md font-bold">Applicant Details</h3>
                        <p>
                            <strong>Name:</strong> {user?.firstname}{" "}
                            {user?.lastname}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <p>
                            <strong>College:</strong> {user?.college}
                        </p>
                        <hr className="my-4" />
                        <h3 className="text-lg font-bold">
                            Application Answers
                        </h3>
                        <div className="px-6 py-8">
                            <h1 className="text-3xl font-bold  text-gray-900 mb-6">
                                {application.userData.name}
                            </h1>
                            {application.userData.desc && (
                                <p className="text-gray-600  mb-8">
                                    {application.userData.desc}
                                </p>
                            )}

                            {Object.keys(errors).length > 0 && (
                                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg
                                                className="h-5 w-5 text-red-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-medium text-red-800">
                                                There were errors with your
                                                submission
                                            </h3>
                                            <ul className="mt-2 text-red-700 list-disc list-inside">
                                                {Object.keys(errors).map(
                                                    (error, index) => (
                                                        <li key={index}>
                                                            {errors[error]}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <ul className="space-y-6">
                                {application.userData.layout.map(
                                    (item, index) => (
                                        <RenderFormItemAnswers
                                            key={index}
                                            item={item}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                </AdminDialog>

                <AdminDialog
                    title={`Set the Status for Applicant ${user?.firstname} ${user?.lastname}`}
                    trigger={
                        <DotsVertical
                            onClick={() => {
                                handleUserSelect(user?.userID);
                                handleApplicationSelect(
                                    application.applicationID
                                );
                            }}
                        />
                    }
                >
                    <form onSubmit={handleStatusSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-gray-700">
                                Select a Status to be Set for this Application:
                            </label>
                            <Select
                                defaultValue={
                                    application.status === "submitted"
                                        ? "accepted"
                                        : application.status
                                }
                                onValueChange={handleStatusValue}
                            >
                                <SelectTrigger className="w-full h-12 mb border-gray-300 bg-transparent">
                                    <SelectValue placeholder="Set Status" />
                                </SelectTrigger>
                                <SelectContent className="border-gray-500 bg-[#EEEEEE] quicksand">
                                    <SelectItem value="accepted">
                                        Mark as Accepted
                                    </SelectItem>
                                    <SelectItem value="pending">
                                        Mark as Pending
                                    </SelectItem>
                                    <SelectItem value="rejected">
                                        Mark as Rejected
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <label className="block text-sm font-bold text-gray-700">
                                Attach a Message/Reason:
                            </label>
                            <textarea
                                className="block w-full px-4 h-44 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder={
                                    status === "pending"
                                        ? "(This field is required)"
                                        : "(Optional)"
                                }
                                onChange={(e) =>
                                    handleInputMessageValue(e.target.value)
                                }
                            />
                        </div>

                        <div className="mt-4 grid justify-items-end">
                            <button
                                type="submit"
                                className="flex px-9 shadow-lg rounded-2xl bg-white hover:bg-gray-800 hover:text-white"
                            >
                                <span className="ml-2 poppins hidden truncate sm:block">
                                    Set Status
                                </span>
                            </button>
                        </div>
                    </form>
                </AdminDialog>
            </td>
        </tr>
    );
}

export default AdminManageApplication;
