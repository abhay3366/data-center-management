import React from 'react'

const RequesterData = ({ requester, setRequester, handleRequesterChange, emailFields, setEmailFields, prevStep, nextStep }) => {
  return (
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
  )
}

export default RequesterData