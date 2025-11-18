import React, { useState } from 'react'

const SelectBranch = ({ branch, setBranch, nextStep }) => {
    
     const branches = ["Noida", "Gurgaon", "Delhi", "Bangalore"];
  return (
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
  )
}

export default SelectBranch