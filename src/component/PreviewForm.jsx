import React from 'react'

const PreviewForm = ({ branch, requester, visitors, prevStep, handleSubmit }) => {
    console.log("🚀 ~ PreviewForm ~ visitors:", visitors)
    
  return (
      <div className="space-y-6">
                        <h2 className="text-xl font-semibold text-slate-800 mb-4">
                            Review Your Request (Before Submit)
                        </h2>

                        {/* Branch */}
                        <section className="mb-4">
                            <h3 className="text-lg font-medium text-slate-700">Branch</h3>
                            <p className="p-3 bg-gray-100 rounded border">{branch}</p>
                        </section>

                        {/* Requester */}
                        <section className="mb-4">
                            <h3 className="text-lg font-medium text-slate-700">Requester Details</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Preview label="Requester Name" value={requester.name} />
                                <Preview label="Mobile" value={requester.mobile} />
                                <Preview label="Email" value={requester.email} />
                                <Preview label="Company" value={requester.company} />
                                <Preview label="Approval Authority" value={requester.approval} />
                            </div>
                        </section>

                        {/* Visitors */}
                        <section className="mb-4">
                            <h3 className="text-lg font-medium text-slate-700">Visitors</h3>

                            {visitors.map((v, idx) => (
                                <div key={idx} className="mb-4 p-4 rounded border bg-gray-50">
                                    <h4 className="font-medium mb-2">Visitor {idx + 1}</h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Preview label="Name" value={v.name} />
                                        <Preview label="Mobile" value={v.mobile} />
                                        <Preview label="Aadhar" value={v.aadhar} />
                                        <Preview label="Purpose of Visit" value={v.purpose} />
                                        <Preview label="Visit Date" value={v.visitDate} />
                                        <Preview label="Visit Time" value={v.visitTime} />
                                    </div>

                                    <div className="mt-2">
                                        <h5 className="font-medium text-sm">Returnable Materials</h5>
                                        {v.materials.map((m, mIdx) => (
                                            <div key={mIdx} className="p-2 border rounded bg-white mt-1">
                                                <p><strong>Material:</strong> {m.name || "—"}</p>
                                                <p><strong>Info:</strong> {m.info || "—"}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </section>

                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevStep}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                            >
                                Back & Edit
                            </button>

                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
                            >
                                Submit & Send Email
                            </button>
                        </div>
                    </div>
  )
}

export default PreviewForm

const Preview = ({ label, value }) => (
  <div>
    <p className="text-sm text-slate-500 mb-1">{label}</p>
    <p className="p-2 bg-gray-100 border rounded">{value || "—"}</p>
  </div>
);
