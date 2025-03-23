'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Download, Search, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApprovalStore } from '@/Backend/Store/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Approvals = () => {
  const [expanded, setExpanded] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const { state, dispatch } = useApprovalStore();
  const { investments } = state;

  const totalBalance = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const acceptedBalance = investments
    .filter((inv) => inv.status === 'Approved')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const toggleExpanded = (id:any) => setExpanded(expanded === id ? null : id);

  const handleApprove = (id:any) => {
    dispatch({ type: 'APPROVE', id });
    toast.success('Project Approved!', { autoClose: 2000 });
  };

  const handleReject = (id:any) => {
    dispatch({ type: 'REJECT', id });
    toast.error('Project Rejected!', { autoClose: 2000 });
  };

  const handleDelete = (id:any) => {
    dispatch({ type: 'DELETE', id });
    toast.warn('Project Deleted!', { autoClose: 2000 });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    toast.info('All reset to Pending!', { autoClose: 2000 });
  };

  const filteredInvestments = investments
    .filter((inv) => 
      (filterStatus === 'All' || inv.status === filterStatus) &&
      (inv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       inv.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
       inv.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
       inv.client.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <ToastContainer theme="dark" /> {}
      
      <div className="max-w-4xl mx-auto">
        {}
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Projects</h1>
          <span className="text-gray-400 text-sm">{new Date().toLocaleDateString()}</span>
        </header>

        {}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 py-1 bg-gray-800 border border-gray-700 rounded text-white"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white py-1 px-2 rounded"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <Button onClick={handleReset} className="bg-blue-600 hover:bg-blue-700 text-sm py-1 px-2">
            Reset
          </Button>
        </div>

        {}
        <div className="bg-gray-900 p-2 rounded mb-4 flex justify-between text-sm">
          <p>Total: <span className="font-bold">${totalBalance.toLocaleString()}</span></p>
          <p>Accepted: <span className="font-bold text-green-500">${acceptedBalance.toLocaleString()}</span></p>
        </div>

        {}
        <div className="space-y-2">
          {filteredInvestments.map((inv) => (
            <div key={inv.id} className="bg-gray-900 border border-gray-800 rounded p-3">
              {}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpanded(inv.id)}
              >
                <div className="flex items-center gap-2">
                  <img src={inv.imageUrl} alt={inv.title} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h2 className="text-md font-semibold">{inv.title}</h2>
                    <p className="text-gray-400 text-xs">{inv.company} for {inv.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-300">${inv.usdEquivalent.toLocaleString()}</span>
                  {expanded === inv.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {}
              {expanded === inv.id && (
                <div className="mt-2 flex flex-col gap-2 text-sm">
                  <img src={inv.imageUrl} alt={inv.title} className="w-full h-24 object-cover rounded" />
                  <p className="text-gray-300">{inv.desc}</p>
                  <p className="text-gray-400"><strong>Needs:</strong> {inv.requirements}</p>
                  {}
                  <div className="flex gap-1">
                    {inv.docs.map((doc, i) => (
                      <a
                        key={i}
                        href="https://example.com/sample.pdf"
                        target="_blank"
                        className="bg-gray-700 hover:bg-gray-600 text-white text-xs py-1 px-2 rounded flex items-center"
                      >
                        <Download size={12} className="mr-1" /> {doc}
                      </a>
                    ))}
                  </div>
                  {}
                  <div className="flex gap-2 mt-2">
                    <Button
                      onClick={() => handleApprove(inv.id)}
                      disabled={inv.status === 'Approved'}
                      className="bg-green-600 hover:bg-green-700 text-xs py-1 px-2"
                    >
                      <CheckCircle size={12} className="mr-1" /> Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(inv.id)}
                      disabled={inv.status === 'Rejected'}
                      className="bg-red-600 hover:bg-red-700 text-xs py-1 px-2"
                    >
                      <XCircle size={12} className="mr-1" /> Reject
                    </Button>
                    <Button
                      onClick={() => handleDelete(inv.id)}
                      className="bg-gray-600 hover:bg-gray-700 text-xs py-1 px-2"
                    >
                      <Trash2 size={12} className="mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Approvals;