import React, { useEffect, useState } from "react";
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
        setVisitors((prev) => [ ...prev, visitors]);
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

//    const handleSubmit = () => {
//     const finalData = { branch, requester, visitors };

//     const oldData = JSON.parse(localStorage.getItem("accessRequest")) || [];

//     const newData = [...oldData, finalData];

//     localStorage.setItem("accessRequest", JSON.stringify(newData));

//     toast.success("Email Notification Sent!");
//     navigate("/request-data");
//   };

// const handleSubmit = async () => {

//     const finalData = {
//         branch,
//         requester,
//         visitors,
//         email: {
//             from: requester.email,
//             to: emailFields.to.split(",").map(e => e.trim()),
//             cc: emailFields.cc
//                 ? emailFields.cc.split(",").map(e => e.trim())
//                 : [],
//             body: emailFields.body,
//         }
//     };

    

//     // Save in localStorage
//     const oldData = JSON.parse(localStorage.getItem("accessRequest")) || [];
//     const newData = [...oldData, finalData];
//     localStorage.setItem("accessRequest", JSON.stringify(newData));

//     console.log("Final Data to Submit:", finalData);

//     // Send Mail to Backend
//     // await fetch("http://localhost:5000/send-mail", {
//     //     method: "POST",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //     },
//     //     body: JSON.stringify(finalData.email),
//     // });

//     toast.success("Email Notification Sent!");
//     navigate("/request-data");
// };
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
                <div className="flex items-center justify-between mb-6 relative">
                {[1, 2, 3, 4, 5].map((s, i) => (
                    <div key={s} className="flex-1 relative">
                    
                    {/* Step circle */}
                    <div
                        onClick={() => handleStepClick(s)}
                        className={`w-8 h-8 mx-auto rounded-full  flex items-center justify-center font-bold text-white cursor-pointer relative z-10 ${
                        step >= s ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    >
                        {s}
                    </div>

                    {/* Step label */}
                    <p className="text-xs mt-1 text-center">
                        {s === 1
                        ? "Branch"
                        : s === 2
                        ? "Requester"
                        : s === 3
                        ? "Visitors"
                        : s === 4
                        ? "Message Body"
                        : "Submit"}
                    </p>

                    {/* Connecting line (except for last step) */}
                    {i !== 4 && (
                        <div
                        className={`absolute top-4 left-1/2 w-full h-1 -translate-x-1/10 z-1 ${
                            step > s ? "bg-blue-600" : "bg-gray-300"
                        }`}
                        style={{ width: "100%", height: "2px" }}
                        ></div>
                    )}
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
            {/* Step 2: Requester + Email Fields */}
{step === 2 && (
  <div className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Requester Details */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          <span className="text-red-500">*</span> Requester Name
        </label>
        <input
          type="text"
          placeholder="Requester Name"
          value={requester.name}
          onChange={(e) => handleRequesterChange("name", e.target.value)}
          className="w-full border p-2 rounded"
          required
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

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
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

      {/* Email Fields */}
      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          <span className="text-red-500">*</span> From Email
        </label>
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="example@company.com"
          value={requester.email} // default from requester
          readOnly
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          <span className="text-red-500">*</span> To (comma separated)
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="mail1@company.com, mail2@company.com"
          value={emailFields.to}
          onChange={(e) =>
            setEmailFields({ ...emailFields, to: e.target.value })
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">
          CC (comma separated)
        </label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          placeholder="cc1@company.com, cc2@company.com"
          value={emailFields.cc}
          onChange={(e) =>
            setEmailFields({ ...emailFields, cc: e.target.value })
          }
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
      <button
        onClick={nextStep}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
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
                {/* {step === 4 && (
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

                )} */}
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
