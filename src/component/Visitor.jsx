import React from 'react'

const Visitor = ({ visitors, handleVisitorChange, handleMaterialChange, addVisitor, removeVisitor, addMaterial, removeMaterial, prevStep, nextStep }) => {
  return (
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
                                {/* Purpose  */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-1">
                                        <span className="text-red-500">*</span> Purpose
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Purpose"
                                        value={v.purpose}
                                        onChange={(e) => handleVisitorChange(idx, "purpose", e.target.value)}
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
  )
}

export default Visitor