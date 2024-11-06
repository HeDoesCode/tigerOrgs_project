import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/Components/ui/alert";
import { Progress } from "@/Components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const UploadProgress = ({ progress, isUploading }) => {
    if (!isUploading) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4 space-y-4">
                <Alert variant="warning" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Please Don't Close the Window</AlertTitle>
                    <AlertDescription>
                        File upload is in progress. Closing the window may
                        corrupt the data.
                    </AlertDescription>
                </Alert>

                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">Upload Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                </div>

                {progress === 100 && (
                    <Alert variant="success" className="mt-4">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle>Upload Complete</AlertTitle>
                        <AlertDescription>
                            Your files have been successfully uploaded.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default UploadProgress;
