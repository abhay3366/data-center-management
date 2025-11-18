import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

import SelectBranch from "./SelectBranch";
import RequesterData from "./RequesterData";
import Visitor from "./Visitor";
import PreviewForm from "./PreviewForm";
import StepIndicator from "./StepIndicator";



export default function AccessFormWizard() {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();
    const [branch, setBranch] = useState("");

    const [requester, setRequester] = useState({
        name: "",
        mobile: "",
        email: "",
        company: "",
        approval: "",
    });

    const [visitors, setVisitors] = useState([
        {
            name: "",
            mobile: "",
            aadhar: "",
            visitDate: "",
            visitTime: "",
            purpose: "",
            materials: [{ name: "", info: "" }]
        },
    ]);

    // Step navigation
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    // Email Fields State
    const [emailFields, setEmailFields] = useState({
        to: "",
        cc: "",
        body: "",
    });


    // step change on click
    const handleStepClick = (targetStep) => {
        // Step 1: branch must be selected
        if (targetStep > 1 && branch === "") {
            toast.error("Please select branch first!");
            return;
        }

        // Step 2: requester must have required fields
        if (targetStep > 2) {
            const { name, mobile, email, company, approval } = requester;
            if (!name || !mobile || !email || !company || !approval) {
                toast.error("Please fill all requester details first!");
                return;
            }
        }

        // Step 3: at least one visitor required with name, mobile, aadhar
        if (targetStep > 3) {
            const validVisitors = visitors.every(
                (v) => v.name && v.mobile && v.aadhar && v.visitDate && v.visitTime
            );
            if (!validVisitors) {
                toast.error("Please fill all visitor details first!");
                return;
            }
        }

        setStep(targetStep);
    };

    // Requester handlers
    const handleRequesterChange = (field, value) =>
        setRequester((prev) => ({ ...prev, [field]: value }));

    // Visitor handlers
    const handleVisitorChange = (idx, field, value) => {
        const copy = [...visitors];
        copy[idx][field] = value;
        setVisitors(copy);
    };

    const handleMaterialChange = (vIdx, mIdx, field, value) => {
        const copy = [...visitors];
        copy[vIdx].materials[mIdx][field] = value;
        setVisitors(copy);
    };

    const addVisitor = () => {
        setVisitors((prev) => [
            ...prev,
            {
                name: "",
                mobile: "",
                aadhar: "",
                visitDate: "",
                visitTime: "",
                materials: [{ name: "", info: "" }]
            }
        ]);
    };


    const removeVisitor = (idx) => {
        setVisitors((prev) => prev.filter((_, i) => i !== idx));
    };

    const addMaterial = (vIdx, mIdx) => {
        const copy = [...visitors];
        copy[vIdx].materials.splice(mIdx + 1, 0, { name: "", info: "" });
        setVisitors(copy);
    };

    const removeMaterial = (vIdx, mIdx) => {
        const copy = [...visitors];
        if (copy[vIdx].materials.length > 1) {
            copy[vIdx].materials.splice(mIdx, 1);
            setVisitors(copy);
        }
    };

    // ---------------- AUTO-FILL DEFAULT BODY IN STEP 4 ----------------
    useEffect(() => {
        if (step === 4 && emailFields.body.trim() === "") {
            const defaultBody = `
            Dear Team,
            Please arrange access permission for the following request.

            Branch: ${branch}

            Requester Details:
            Name: ${requester.name}
            Mobile: ${requester.mobile}
            Email: ${requester.email}
            Company: ${requester.company}
            Approval Authority: ${requester.approval}

            Visitors:
            ${visitors
                    .map(
                        (v, i) =>
                            `Visitor ${i + 1}:
                Name: ${v.name}
                Mobile: ${v.mobile}
                Aadhar: ${v.aadhar}
                Visit Date: ${v.visitDate}
                Visit Time: ${v.visitTime}
                Materials: ${v.materials.map((m) => `${m.name} (${m.info})`).join(", ")}`
                    )
                    .join("\n\n")}

            Regards,
            ${requester.name}
            `;

            setEmailFields((prev) => ({ ...prev, body: defaultBody }));
        }
    }, [step]);

    // ---------------- SUBMIT ----------------
    const handleSubmit = async () => {
        const finalData = {
            branch,
            requester,
            visitors,
            email: {
                from: requester.email,
                to: emailFields.to.split(",").map((e) => e.trim()),
                cc: emailFields.cc
                    ? emailFields.cc.split(",").map((e) => e.trim())
                    : [],
                body: emailFields.body
            }
        };

        // Save in LocalStorage
        const oldData = JSON.parse(localStorage.getItem("accessRequest")) || [];
        const newData = [...oldData, finalData];
        localStorage.setItem("accessRequest", JSON.stringify(newData));

        console.log("Final Submitted Data:", finalData);

        toast.success("Email Notification Sent!");
        navigate("/request-data");
    };


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-2xl font-semibold text-slate-800 mb-6">
                    Data Centre Access Request
                </h1>

                {/* Step Indicator */}
                <StepIndicator step={step} setStep={setStep} handleStepClick={handleStepClick} />


                {/* Step 1: Branch */}
                {step === 1 && (
                    <SelectBranch setBranch={setBranch} branch={branch} nextStep={nextStep} />
                )}

              
                {/* Step 2: Requester + Email Fields */}
                {step === 2 && (
                  <RequesterData requester={requester}  handleRequesterChange={handleRequesterChange} setRequester={setRequester} emailFields={emailFields} setEmailFields={setEmailFields} prevStep={prevStep} nextStep={nextStep} />
                )}


                {/* Step 3: Visitors */}
                {step === 3 && (
                  <Visitor visitors={visitors} handleVisitorChange={handleVisitorChange} handleMaterialChange={handleMaterialChange} addVisitor={addVisitor} removeVisitor={removeVisitor} addMaterial={addMaterial} removeMaterial={removeMaterial} prevStep={prevStep} nextStep={nextStep} />
                )}

             
                {/* Step 4: Message Body + Email Details */}
                {step === 4 && (
                    <div className="space-y-4">


                        {/* MESSAGE BODY */}
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">
                                <span className="text-red-500">*</span> Message Body
                            </label>
                            <textarea
                                className="w-full border rounded-lg p-2 h-40"
                                value={emailFields.body}
                                onChange={(e) =>
                                    setEmailFields({ ...emailFields, body: e.target.value })
                                }
                                placeholder="Enter the message body..."
                                required
                            >

                            </textarea>
                        </div>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={nextStep}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 5: Submit */}
                {step === 5 && (
                  <PreviewForm prevStep={prevStep} handleSubmit={handleSubmit} requester={requester} visitors={visitors} branch={branch} />
                )}

            </div>
        </div>
    );
}
