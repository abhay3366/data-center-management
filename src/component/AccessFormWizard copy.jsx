import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const branches = ["Noida", "Gurgaon", "Delhi", "Bangalore"];

export default function AccessFormWizard() {
    const [step, setStep] = useState(1);
    const navigate=useNavigate();
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
            materials: [{ name: "", info: "" }]
        },
    ]);

    const [accessRequestData, setAccessRequestData] = useState([]);

    // Step navigation
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

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
            },
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

   const handleSubmit = () => {
    const finalData = { branch, requester, visitors };

    const oldData = JSON.parse(localStorage.getItem("accessRequest")) || [];

    const newData = [...oldData, finalData];

    localStorage.setItem("accessRequest", JSON.stringify(newData));

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
                <div className="flex items-center justify-between mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="flex-1 text-center" onClick={() => handleStepClick(s)}>
                            <div
                                className={`w-8 h-8 mx-auto rounded-full flex items-center cursor-pointer justify-center font-bold text-white ${step === s ? "bg-blue-600" : "bg-gray-300"
                                    }`}
                            >
                                {s}
                            </div>
                            <p className="text-xs mt-1">
                                {s === 1
                                    ? "Branch"
                                    : s === 2
                                        ? "Requester"
                                        : s === 3
                                            ? "Visitors"
                                            : s === 4
                                                ? "Messages Body"
                                                : "Submit"}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Step 1: Branch */}
                {step === 1 && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                            Select Branch
                        </label>
                        <select
                            className="w-full border rounded-lg p-2"
                            value={branch}
                            onChange={(e) => setBranch(e.target.value)}
                        >
                            <option value="">-- Select Branch --</option>
                            {branches.map((b) => (
                                <option key={b} value={b}>
                                    {b}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-end mt-4">
                            <button
                                disabled={!branch}
                                onClick={nextStep}
                                className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded-lg disabled:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Requester */}
                {step === 2 && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                               <label className="block text-sm font-medium text-slate-600 mb-1">
                                <span className="text-red-500">*</span> Requester Name
                            </label>
                            <input
                                type="text"
                                placeholder="Requester Name"
                                value={requester.name}
                                required
                                onChange={(e) => handleRequesterChange("name", e.target.value)}
                                className="w-full border p-2 rounded"
                                
                            />
                             </div>
                           <div>
                           <label className="block text-sm font-medium text-slate-600 mb-1">
                                <span className="text-red-500">*</span> Mobile Number
                            </label>
                             <input
                                type="tel"
                                placeholder="Mobile Number"
                                value={requester.mobile}
                                onChange={(e) => handleRequesterChange("mobile", e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                           </div>
                            <div>
                             <label className="block text-sm font-medium text-slate-600 mb-1">
                                <span className="text-red-500">*</span> Email
                            </label>
                                <input
                                type="email"
                                placeholder="Email"
                                value={requester.email}
                                onChange={(e) => handleRequesterChange("email", e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            </div>


                            <div>                             <label className="block text-sm font-medium text-slate-600 mb-1">
                                <span className="text-red-500">*</span> Company Name
                            </label>
                             <input
                                type="text"
                                placeholder="Company / Department"
                                value={requester.company}
                                onChange={(e) => handleRequesterChange("company", e.target.value)}
                                className="w-full border p-2 rounded"
                                required
                            />
                            </div>
                           <div>
                           <label className="block text-sm font-medium text-slate-600 mb-1">
                                <span className="text-red-500">*</span> Approval Authority
                            </label>
                             <input
                                type="text"
                                placeholder="Approval Authority"
                                value={requester.approval}
                                onChange={(e) => handleRequesterChange("approval", e.target.value)}
                                className="w-full border p-2 rounded md:col-span-2"
                                required
                            />
                           </div>
                        </div>
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Visitors */}
                {step === 3 && (
                    <div className="space-y-4">
                        {visitors.map((v, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg p-4 bg-gray-50 space-y-2 shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-medium">Visitor {idx + 1}</h3>
                                    {idx !== 0 && (
                                        <button onClick={() => removeVisitor(idx)} className="text-red-500">
                                            Remove
                                        </button>
                                    )}
                                </div>

                               <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        <span className="text-red-500">*</span> Name
                                    </label>
                                 <input
                                    type="text"
                                    placeholder="Name"
                                    value={v.name}
                                    onChange={(e) => handleVisitorChange(idx, "name", e.target.value)}
                                    className="w-full border p-2 rounded"
                                />
                               </div>
                               <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        <span className="text-red-500">*</span> Mobile
                                    </label>
                                     <input
                                    type="tel"
                                    placeholder="Mobile"
                                    value={v.mobile}
                                    onChange={(e) => handleVisitorChange(idx, "mobile", e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                               </div>
                               <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        <span className="text-red-500">*</span> Aadhar
                                    </label>
                                     <input
                                    type="text"
                                    placeholder="Aadhar"
                                    value={v.aadhar}
                                    onChange={(e) => handleVisitorChange(idx, "aadhar", e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                               </div>

                                {/* Visitor-specific Date & Time inputs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                   <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1"><span className="text-red-500">*</span> Visit Date</label>
                                         <input
                                        type="date"
                                        placeholder="Visit Date (e.g., 29-11-2025)"
                                        value={v.visitDate}
                                        onChange={(e) => handleVisitorChange(idx, "visitDate", e.target.value)}
                                        className="w-full border p-2 rounded"
                                        required
                                    />
                                   </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1"><span className="text-red-500">*</span> Visit Time</label>
                                        <input
                                        type="time"
                                        placeholder="Visit Time (e.g., 10:30 AM)"
                                        value={v.visitTime}
                                        onChange={(e) => handleVisitorChange(idx, "visitTime", e.target.value)}
                                        className="w-full border p-2 rounded"
                                        required
                                    />
                                    </div>
                                </div>

                                {/* Materials */}
                                <div>
                                     <label className="block text-sm font-medium text-slate-600 mb-1"><span className="text-red-500">*</span> Returnable Materials</label>
                                    {v.materials.map((mat, mIdx) => (
                                        <div key={mIdx} className="flex flex-col mb-2 gap-2 border-b pb-2">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={mat.name}
                                                    onChange={(e) =>
                                                        handleMaterialChange(idx, mIdx, "name", e.target.value)
                                                    }
                                                    placeholder="Material Name"
                                                    className="flex-1 border p-2 rounded"
                                                />
                                                <button
                                                    onClick={() => addMaterial(idx, mIdx)}
                                                    className="px-2 py-1 bg-blue-600 text-white rounded"
                                                >
                                                    +
                                                </button>
                                                {v.materials.length > 1 && (
                                                    <button
                                                        onClick={() => removeMaterial(idx, mIdx)}
                                                        className="px-2 py-1 bg-red-500 text-white rounded"
                                                    >
                                                        -
                                                    </button>
                                                )}
                                            </div>
                                            <input
                                                type="text"
                                                value={mat.info}
                                                onChange={(e) =>
                                                    handleMaterialChange(idx, mIdx, "info", e.target.value)
                                                }
                                                placeholder="Additional Info"
                                                className="border p-2 rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <button
                            onClick={addVisitor}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg mt-2"
                        >
                            + Add Visitor
                        </button>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Message Body */}
                {step === 4 && (
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-slate-600 mb-1"><span className="text-red-500">*</span> Message Body</label>
                        <textarea required
                            className="w-full border rounded-lg p-2 h-40"
                            placeholder="Enter the message body for the email notification..."        ></textarea>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button onClick={nextStep} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                                Next
                            </button>
                        </div>
                    </div>

                )}
                {/* Step 5: Submit */}
                {step === 5 && (
                    <div className="space-y-4">
                        <p className="text-slate-700">
                            Ready to submit the form and send email notification.
                        </p>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                            >
                                Submit & Send Email
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
