import React, { useState } from 'react'

const RequestData = () => {
    const accessRequest = JSON.parse(localStorage.getItem("accessRequest"));
    const [data, setData] = useState(accessRequest || null);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-slate-800">Access Request Data</h1>

            {!data ? (
                <p className="text-slate-600">No access request data found.</p>
            ) : (
                <div className="overflow-x-auto">
                    
                    <table className="min-w-full border border-slate-200 rounded-lg shadow-lg bg-white">
                        <thead className="bg-slate-100">
                            <tr>
                                <th className="p-3 text-left font-semibold text-slate-700 border-b">#</th>
                                <th className="p-3 text-left font-semibold text-slate-700 border-b">Branch</th>
                                <th className="p-3 text-left font-semibold text-slate-700 border-b">Requester Name</th>
                                <th className="p-3 text-left font-semibold text-slate-700 border-b">Mobile</th>
                                <th className="p-3 text-left font-semibold text-slate-700 border-b">Email</th>
                                <th className="p-3 text-left font-semibold text-slate-700 border-b">Visitors</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index} className="hover:bg-slate-50 transition">
                                    
                                    <td className="p-3 border-b">{index + 1}</td>

                                    <td className="p-3 border-b">{item.branch}</td>

                                    <td className="p-3 border-b">{item.requester.name}</td>

                                    <td className="p-3 border-b">{item.requester.mobile}</td>

                                    <td className="p-3 border-b">{item.requester.email}</td>

                                    <td className="p-3 border-b">
                                        <div className="space-y-2">

                                            {item.visitors.map((v, i) => (
                                                <div 
                                                    key={i} 
                                                    className="p-2 bg-slate-100 rounded-lg border"
                                                >
                                                    <p className="text-sm">
                                                        <strong>Name:</strong> {v.name}
                                                    </p>
                                                    <p className="text-sm">
                                                        <strong>Mobile:</strong> {v.mobile}
                                                    </p>
                                                    <p className="text-sm">
                                                        <strong>Aadhar:</strong> {v.aadhar}
                                                    </p>

                                                   
                                                    <p className="text-sm">
                                                        <strong>Purpose:</strong> {v.purpose}
                                                    </p>
                                                     <p className="text-sm">
                                                        <strong>Date:</strong> {v.visitDate}
                                                    </p>
                                                    <p className="text-sm">
                                                        <strong>Time:</strong> {v.visitTime}
                                                    </p>

                                                    {/* Materials */}
                                                    <div className="mt-2">
                                                        <strong className="text-sm">Materials:</strong>
                                                        <ul className="list-disc ml-5 text-sm">
                                                            {v.materials.map((m, j) => (
                                                                <li key={j}>
                                                                    {m.name} {m.info && `- ${m.info}`}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default RequestData;
