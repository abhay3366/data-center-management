import React, { useState } from "react";

export default function VisitorForm() {
  const [visitors, setVisitors] = useState([
    { name: "", mobile: "", aadhar: "", materials: [{ name: "", info: "" }] },
  ]);

  const addVisitor = () => {
    setVisitors([
      ...visitors,
      { name: "", mobile: "", aadhar: "", materials: [{ name: "", info: "" }] },
    ]);
  };

  const handleVisitorChange = (visitorIdx, field, value) => {
    const updated = [...visitors];
    updated[visitorIdx][field] = value;
    setVisitors(updated);
  };

  const handleMaterialChange = (visitorIdx, matIdx, field, value) => {
    const updated = [...visitors];
    updated[visitorIdx].materials[matIdx][field] = value;
    setVisitors(updated);
  };

  const addMaterial = (visitorIdx, matIdx) => {
    const updated = [...visitors];
    updated[visitorIdx].materials.splice(matIdx + 1, 0, { name: "", info: "" });
    setVisitors(updated);
  };

  const removeMaterial = (visitorIdx, matIdx) => {
    const updated = [...visitors];
    if (updated[visitorIdx].materials.length > 1) {
      updated[visitorIdx].materials.splice(matIdx, 1);
      setVisitors(updated);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {visitors.map((v, idx) => (
        <div key={idx} className="mb-6 border p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-3">Visitor {idx + 1}</h3>

          <input
            type="text"
            placeholder="Name"
            value={v.name}
            onChange={(e) => handleVisitorChange(idx, "name", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={v.mobile}
            onChange={(e) => handleVisitorChange(idx, "mobile", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
          <input
            type="text"
            placeholder="Aadhar"
            value={v.aadhar}
            onChange={(e) => handleVisitorChange(idx, "aadhar", e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />

          {/* Returnable Materials */}
          <div className="mb-2">
            <label className="block font-medium mb-1">Returnable Materials</label>

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
      ))}

      <button
        type="button"
        onClick={addVisitor}
        className="px-4 py-2 bg-green-600 text-white rounded mb-4"
      >
        + Add Visitor
      </button>
    </div>
  );
}
