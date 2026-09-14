import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShieldCheck, ShieldX, Eye, FileText, X, ExternalLink, UserCheck, Trash2, RotateCcw } from 'lucide-react';
import VerificationBadge from '../components/VerificationBadge';

const AdminDashboardPage = () => {
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDoc, setSelectedDoc] = useState(null); // { title, url, workerName }
    
    const fetchVerificationRequests = useCallback(async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/verification-requests');
            setRequests(response.data.data);
        } catch (error) {
            console.error("Failed to fetch verification requests:", error);
            toast.error("Could not load requests.");
        } finally {
            setLoading(false);
        }
    }, []);
    
    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'ADMIN') {
                toast.error("Access Denied. Admins only.");
                navigate('/');
            } else {
                fetchVerificationRequests();
            }
        }
    }, [user, authLoading, navigate, fetchVerificationRequests]);

    const handleVerification = async (workerId, verificationUpdate) => {
        const toastId = toast.loading("Updating verification...");
        try {
            await api.patch(`/admin/verify-worker/${workerId}`, verificationUpdate);
            toast.success("Verification updated successfully!", { id: toastId });
            fetchVerificationRequests();
        } catch (error) {
            toast.error("Failed to update verification.", { id: toastId });
            console.error("Verification update error:", error);
        }
    };

    const handleRejectDocument = async (workerId, docType, docLabel) => {
        if (!window.confirm(`Are you sure you want to reject & delete this ${docLabel}? The worker will be notified to upload a valid document.`)) {
            return;
        }
        const toastId = toast.loading("Rejecting document...");
        try {
            await api.patch(`/admin/reject-document/${workerId}`, { docType });
            toast.success(`${docLabel} rejected & cleared! Worker can now re-upload.`, { id: toastId });
            fetchVerificationRequests();
        } catch (error) {
            toast.error("Failed to reject document.", { id: toastId });
            console.error("Reject document error:", error);
        }
    };
    
    if (authLoading || loading) {
        return <div className="text-center py-20 text-lg">Loading Admin Panel...</div>;
    }

    return (
        <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
            <Navbar />
            <main className="flex-grow py-12">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text-strong)] flex items-center gap-3">
                                <UserCheck className="text-[var(--color-primary)]" size={36} />
                                Admin Dashboard
                            </h1>
                            <p className="mt-2 text-lg text-[var(--color-text-muted)]">
                                Review worker verification documents, approve IDs, or reject invalid uploads.
                            </p>
                        </div>
                        <div className="rounded-lg bg-[var(--color-bg-component-subtle)] px-4 py-2 border border-[var(--color-border)] text-sm">
                            <span className="font-semibold text-[var(--color-primary)]">{requests.length}</span> pending verification request(s)
                        </div>
                    </header>
                    
                    <div className="rounded-xl bg-[var(--color-bg-component)] p-6 shadow-lg border border-[var(--color-border)]">
                        <h2 className="text-2xl font-semibold text-[var(--color-text-strong)] mb-6">Pending Verification Requests</h2>
                        
                        {requests.length > 0 ? (
                            <div className="space-y-8">
                                {requests.map(worker => {
                                    const docs = worker.verificationDocuments || {};
                                    return (
                                        <div key={worker._id} className="rounded-lg border border-[var(--color-border)] p-6 bg-[var(--color-bg-component-subtle)] space-y-6">
                                            {/* Worker Info Header */}
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
                                                <div className="flex items-center gap-4">
                                                    <img 
                                                        src={worker.profileImage || 'https://via.placeholder.com/64'} 
                                                        alt={worker.fullName} 
                                                        className="h-14 w-14 rounded-full object-cover border-2 border-[var(--color-primary)]" 
                                                    />
                                                    <div>
                                                        <Link to={`/helper/${worker._id}`} className="text-xl font-bold text-[var(--color-text-strong)] hover:underline">
                                                            {worker.fullName}
                                                        </Link>
                                                        <p className="text-sm text-[var(--color-text-muted)]">{worker.email} • {worker.phone || 'No phone'}</p>
                                                        <p className="text-xs text-[var(--color-primary)] font-medium mt-1">{worker.primaryService || 'Worker'}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <VerificationBadge type="id" isVerified={worker.isVerified?.id} />
                                                    <VerificationBadge type="police" isVerified={worker.isVerified?.police} />
                                                    <VerificationBadge type="pan" isVerified={worker.isVerified?.pan} />
                                                </div>
                                            </div>

                                            {/* Uploaded Documents Grid */}
                                            <div>
                                                <h3 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                                                    Uploaded Verification Documents
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                                    {/* ID Proof Card */}
                                                    <div className="rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-bg)] flex flex-col justify-between">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="font-semibold text-sm text-[var(--color-text-strong)] flex items-center gap-2">
                                                                🆔 ID Proof
                                                            </span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${worker.isVerified?.id ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                                {worker.isVerified?.id ? 'Verified' : 'Pending'}
                                                            </span>
                                                        </div>

                                                        {docs.idProof ? (
                                                            <div className="space-y-3">
                                                                <div 
                                                                    onClick={() => setSelectedDoc({ title: `ID Proof - ${worker.fullName}`, url: docs.idProof })}
                                                                    className="relative group cursor-pointer rounded-md overflow-hidden border border-[var(--color-border)] h-32 bg-black/20 flex items-center justify-center"
                                                                >
                                                                    <img src={docs.idProof} alt="ID Proof" className="h-full w-full object-cover group-hover:opacity-75 transition" />
                                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition">
                                                                        <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/70 px-3 py-1.5 rounded-full">
                                                                            <Eye size={14} /> Click to View
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                                                                    <button
                                                                        onClick={() => setSelectedDoc({ title: `ID Proof - ${worker.fullName}`, url: docs.idProof })}
                                                                        className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1 font-medium"
                                                                    >
                                                                        <Eye size={14} /> Full View
                                                                    </button>

                                                                    <div className="flex items-center gap-1">
                                                                        <button 
                                                                            onClick={() => handleRejectDocument(worker._id, 'idProof', 'ID Proof')}
                                                                            className="btn !px-2 !py-1 text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-1"
                                                                            title="Reject document & clear for re-upload"
                                                                        >
                                                                            <Trash2 size={13} /> Reject
                                                                        </button>
                                                                        <button 
                                                                            onClick={() => handleVerification(worker._id, { idVerified: !worker.isVerified?.id })}
                                                                            className={`btn !px-2.5 !py-1 text-xs font-medium ${worker.isVerified?.id ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'}`}
                                                                        >
                                                                            {worker.isVerified?.id ? <ShieldX size={13} className="mr-1 inline" /> : <ShieldCheck size={13} className="mr-1 inline" />} 
                                                                            {worker.isVerified?.id ? 'Revoke' : 'Approve'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="h-32 flex flex-col items-center justify-center rounded-md border border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] text-xs text-center p-3">
                                                                <FileText size={24} className="mb-1 opacity-50" />
                                                                Not uploaded by worker
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Police Verification Card */}
                                                    <div className="rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-bg)] flex flex-col justify-between">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="font-semibold text-sm text-[var(--color-text-strong)] flex items-center gap-2">
                                                                🛡️ Police Verification
                                                            </span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${worker.isVerified?.police ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                                {worker.isVerified?.police ? 'Verified' : 'Pending'}
                                                            </span>
                                                        </div>

                                                        {docs.policeVerification ? (
                                                            <div className="space-y-3">
                                                                <div 
                                                                    onClick={() => setSelectedDoc({ title: `Police Verification - ${worker.fullName}`, url: docs.policeVerification })}
                                                                    className="relative group cursor-pointer rounded-md overflow-hidden border border-[var(--color-border)] h-32 bg-black/20 flex items-center justify-center"
                                                                >
                                                                    <img src={docs.policeVerification} alt="Police Verification" className="h-full w-full object-cover group-hover:opacity-75 transition" />
                                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition">
                                                                        <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/70 px-3 py-1.5 rounded-full">
                                                                            <Eye size={14} /> Click to View
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                                                                    <button
                                                                        onClick={() => setSelectedDoc({ title: `Police Verification - ${worker.fullName}`, url: docs.policeVerification })}
                                                                        className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1 font-medium"
                                                                    >
                                                                        <Eye size={14} /> Full View
                                                                    </button>

                                                                    <div className="flex items-center gap-1">
                                                                        <button 
                                                                            onClick={() => handleRejectDocument(worker._id, 'policeVerification', 'Police Verification')}
                                                                            className="btn !px-2 !py-1 text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-1"
                                                                            title="Reject document & clear for re-upload"
                                                                        >
                                                                            <Trash2 size={13} /> Reject
                                                                        </button>
                                                                        <button 
                                                                            onClick={() => handleVerification(worker._id, { policeVerified: !worker.isVerified?.police })}
                                                                            className={`btn !px-2.5 !py-1 text-xs font-medium ${worker.isVerified?.police ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'}`}
                                                                        >
                                                                            {worker.isVerified?.police ? <ShieldX size={13} className="mr-1 inline" /> : <ShieldCheck size={13} className="mr-1 inline" />} 
                                                                            {worker.isVerified?.police ? 'Revoke' : 'Approve'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="h-32 flex flex-col items-center justify-center rounded-md border border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] text-xs text-center p-3">
                                                                <FileText size={24} className="mb-1 opacity-50" />
                                                                Not uploaded by worker
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* PAN Card */}
                                                    <div className="rounded-lg border border-[var(--color-border)] p-4 bg-[var(--color-bg)] flex flex-col justify-between">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <span className="font-semibold text-sm text-[var(--color-text-strong)] flex items-center gap-2">
                                                                💳 PAN Card
                                                            </span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${worker.isVerified?.pan ? 'bg-purple-500/20 text-purple-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                                {worker.isVerified?.pan ? 'Verified' : 'Pending'}
                                                            </span>
                                                        </div>

                                                        {docs.panCard ? (
                                                            <div className="space-y-3">
                                                                <div 
                                                                    onClick={() => setSelectedDoc({ title: `PAN Card - ${worker.fullName}`, url: docs.panCard })}
                                                                    className="relative group cursor-pointer rounded-md overflow-hidden border border-[var(--color-border)] h-32 bg-black/20 flex items-center justify-center"
                                                                >
                                                                    <img src={docs.panCard} alt="PAN Card" className="h-full w-full object-cover group-hover:opacity-75 transition" />
                                                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition">
                                                                        <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/70 px-3 py-1.5 rounded-full">
                                                                            <Eye size={14} /> Click to View
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between gap-2 flex-wrap pt-1">
                                                                    <button
                                                                        onClick={() => setSelectedDoc({ title: `PAN Card - ${worker.fullName}`, url: docs.panCard })}
                                                                        className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1 font-medium"
                                                                    >
                                                                        <Eye size={14} /> Full View
                                                                    </button>

                                                                    <div className="flex items-center gap-1">
                                                                        <button 
                                                                            onClick={() => handleRejectDocument(worker._id, 'panCard', 'PAN Card')}
                                                                            className="btn !px-2 !py-1 text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 flex items-center gap-1"
                                                                            title="Reject document & clear for re-upload"
                                                                        >
                                                                            <Trash2 size={13} /> Reject
                                                                        </button>
                                                                        <button 
                                                                            onClick={() => handleVerification(worker._id, { panVerified: !worker.isVerified?.pan })}
                                                                            className={`btn !px-2.5 !py-1 text-xs font-medium ${worker.isVerified?.pan ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'}`}
                                                                        >
                                                                            {worker.isVerified?.pan ? <ShieldX size={13} className="mr-1 inline" /> : <ShieldCheck size={13} className="mr-1 inline" />} 
                                                                            {worker.isVerified?.pan ? 'Revoke' : 'Approve'}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="h-32 flex flex-col items-center justify-center rounded-md border border-dashed border-[var(--color-border)] text-[var(--color-text-muted)] text-xs text-center p-3">
                                                                <FileText size={24} className="mb-1 opacity-50" />
                                                                Not uploaded by worker
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-[var(--color-text-muted)] py-12">No pending verification requests.</p>
                        )}
                    </div>
                </div>
            </main>

            {/* Document Preview Modal */}
            {selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
                    <div className="relative max-w-4xl w-full bg-[var(--color-bg-component)] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
                            <h3 className="text-lg font-bold text-[var(--color-text-strong)] flex items-center gap-2">
                                <FileText size={20} className="text-[var(--color-primary)]" />
                                {selectedDoc.title}
                            </h3>
                            <div className="flex items-center gap-3">
                                <a 
                                    href={selectedDoc.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-[var(--color-primary)] hover:underline flex items-center gap-1 font-semibold"
                                >
                                    Open Original <ExternalLink size={14} />
                                </a>
                                <button 
                                    onClick={() => setSelectedDoc(null)}
                                    className="p-1 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-strong)] hover:bg-[var(--color-bg-component-subtle)]"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="p-4 flex items-center justify-center max-h-[75vh] overflow-auto bg-black/40">
                            <img 
                                src={selectedDoc.url} 
                                alt={selectedDoc.title} 
                                className="max-h-[70vh] w-auto object-contain rounded shadow-md" 
                            />
                        </div>

                        <div className="px-6 py-3 border-t border-[var(--color-border)] bg-[var(--color-bg-component-subtle)] text-right">
                            <button 
                                onClick={() => setSelectedDoc(null)}
                                className="btn btn-subtle text-xs px-4 py-2"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default AdminDashboardPage;