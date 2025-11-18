import React from 'react'

const StepIndicator = ({ step, setStep, handleStepClick }) => {
  return (
     <div className="flex items-center justify-between mb-6 relative">
                    {[1, 2, 3, 4, 5].map((s, i) => (
                        <div key={s} className="flex-1 relative">

                            {/* Step circle */}
                            <div
                                onClick={() => handleStepClick(s)}
                                className={`w-8 h-8 mx-auto rounded-full  flex items-center justify-center font-bold text-white cursor-pointer relative z-10 ${step >= s ? "bg-blue-600" : "bg-gray-300"
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
                                    className={`absolute top-4 left-1/2 w-full h-1 -translate-x-1/10 z-1 ${step > s ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                    style={{ width: "100%", height: "2px" }}
                                ></div>
                            )}
                        </div>
                    ))}
                </div>
  )
}

export default StepIndicator