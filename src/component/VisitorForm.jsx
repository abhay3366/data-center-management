import React, { useState } from "react";
import toast from "react-hot-toast";

const VisitorForm = () => {
  const [requester, setRequester] = useState({
    name: "",
    mobile: "",
    email: "",
    company: "",
    approval: "",
  });

  const [visitors, setVisitors] = useState([
    { name: "", mobile: "", aadhar: "", materials: [{ name: "", info: "" }] }, // default visitor 1
  ]);

  // Requester changes
  const handleRequesterChange = (field, value) => {
    setRequester((prev) => ({ ...prev, [field]: value }));
  };

  // Visitor basic info changes
  const handleVisitorChange = (index, field, value) => {
    setVisitors((prev) => {
      const copy = [...prev];
      copy[index][field] = value;
      return copy;
    });
  };

  // Material changes
  const handleMaterialChange = (vIdx, mIdx, field, value) => {
    const updated = [...visitors];
    updated[vIdx].materials[mIdx][field] = value;
    setVisitors(updated);
  };

  // Add Visitor
  const addVisitor = () => {
    setVisitors((prev) => [
      ...prev,
      { name: "", mobile: "", aadhar: "", materials: [{ name: "", info: "" }] },
    ]);
  };

  // Remove Visitor
  const removeVisitor = (index) => {
    setVisitors((prev) => prev.filter((_, i) => i !== index));
  };

  // Add Material input for a specific visitor next to current
  const addMaterial = (vIdx, mIdx) => {
    const updated = [...visitors];
    updated[vIdx].materials.splice(mIdx + 1, 0, { name: "", info: "" });
    setVisitors(updated);
  };

  // Remove Material input
  const removeMaterial = (vIdx, mIdx) => {
    const updated = [...visitors];
    if (updated[vIdx].materials.length > 1) {
      updated[vIdx].materials.splice(mIdx, 1);
      setVisitors(updated);
    }
  };

  // Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("accessRequest", JSON.stringify({ requester, visitors }));
    toast.success("Successfully created!");
    console.log("FORM SUBMIT INITIATED", requester, visitors);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-slate-800 mb-4">
            Data Centre Access Request
          </h1>
          <p className="text-sm text-slate-500 mb-6">
            Fill requester details and visitor information. Visitor 1 is required; add more if needed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Requester Card */}
            <section className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-medium text-slate-700 mb-4">
                Requester Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <span className="text-red-500">*</span> Requester Name
                  </label>
                  <input
                    type="text"
                    value={requester.name}
                    required
                    onChange={(e) => handleRequesterChange("name", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <span className="text-red-500">*</span> Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={requester.mobile}
                    required
                    onChange={(e) => handleRequesterChange("mobile", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <span className="text-red-500">*</span> Email ID
                  </label>
                  <input
                    type="email"
                    value={requester.email}
                    required
                    onChange={(e) => handleRequesterChange("email", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <span className="text-red-500">*</span> Company / Department
                  </label>
                  <input
                    type="text"
                    value={requester.company}
                    required
                    onChange={(e) => handleRequesterChange("company", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    <span className="text-red-500">*</span> Approval Authority
                  </label>
                  <input
                    type="text"
                    value={requester.approval}
                    required
                    onChange={(e) => handleRequesterChange("approval", e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </section>

            {/* Visitors */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-slate-700">Visitors</h2>
                <button
                  type="button"
                  onClick={addVisitor}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm shadow"
                >
                  + Add Visitor
                </button>
              </div>

              <div className="space-y-4">
                {visitors.map((v, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-semibold text-slate-800">
                        Visitor {idx + 1}
                      </h3>
                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => removeVisitor(idx)}
                          className="text-sm cursor-pointer text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          <span className="text-red-500">*</span> Visitor Name
                        </label>
                        <input
                          type="text"
                          value={v.name}
                          required
                          onChange={(e) => handleVisitorChange(idx, "name", e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          <span className="text-red-500">*</span> Mobile Number
                        </label>
                        <input
                          type="tel"
                          value={v.mobile}
                          required
                          maxLength={10}
                          onChange={(e) =>
                            handleVisitorChange(
                              idx,
                              "mobile",
                              e.target.value.replace(/\D/, "")
                            )
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          <span className="text-red-500">*</span> Aadhar Number
                        </label>
                        <input
                          type="text"
                          value={v.aadhar}
                          required
                          maxLength={12}
                          pattern="\d*"
                          onChange={(e) =>
                            handleVisitorChange(idx, "aadhar", e.target.value.replace(/\D/, ""))
                          }
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-sky-500"
                        />
                      </div>

                      {/* Materials */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-600 mb-1">
                          <span className="text-red-500">*</span> Returnable Materials
                        </label>
                        {v.materials.map((mat, mIdx) => (
                          <div key={mIdx} className="flex flex-col mb-2 gap-2 border-b pb-2">
                            <div className="flex items-center gap-2">
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
                                type="button"
                                onClick={() => addMaterial(idx, mIdx)}
                                className="px-2 py-1 bg-blue-600 text-white rounded"
                              >
                                +
                              </button>
                              {v.materials.length > 1 && (
                                <button
                                  type="button"
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
                              placeholder="Additional Info / Description"
                              className="border p-2 rounded"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full cursor-pointer inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded-lg shadow"
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>

        <p className="flex items-start gap-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm p-3 mt-4 mx-auto rounded">
          <span className="font-bold text-yellow-600">*</span>
          Note: Ensure visitors carry their original ID for verification. All materials must be declared & returned.
        </p>
      </div>
    </div>
  );
};
export default VisitorForm;

