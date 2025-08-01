import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Upload, Save } from 'lucide-react';

const ProfileManagement = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        tagline: user?.tagline || '',
        description: user?.description || '',
        skills: user?.skills?.join(', ') || '',
        availability: user?.availability || 'Available',
    });
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setGalleryFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Updating profile...");

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        galleryFiles.forEach(file => {
            data.append('galleryImages', file);
        });

        try {
            const response = await api.patch('/users/me/profile', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            updateUser(response.data.data); // Update user in context
            toast.success("Profile updated successfully!", { id: toastId });
            setGalleryFiles([]); // Clear file input after successful upload
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error(error.response?.data?.message || "Failed to update profile.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-[var(--color-text-strong)] mb-6">Manage Your Public Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Full Name</label>
                        <div className="mt-2"><input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} /></div>
                    </div>
                     <div>
                        <label htmlFor="tagline" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Tagline / Short Bio</label>
                        <div className="mt-2"><input type="text" name="tagline" id="tagline" placeholder="e.g., Expert in South Indian cuisine" value={formData.tagline} onChange={handleChange} /></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-[var(--color-text)]">About Me (Description)</label>
                    <div className="mt-2"><textarea name="description" id="description" rows={4} value={formData.description} onChange={handleChange} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="skills" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Skills (comma-separated)</label>
                        <div className="mt-2"><input type="text" name="skills" id="skills" placeholder="e.g., Cooking, Cleaning, Child Care" value={formData.skills} onChange={handleChange} /></div>
                    </div>
                    <div>
                        <label htmlFor="availability" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Current Availability</label>
                        <div className="mt-2">
                           <select name="availability" id="availability" value={formData.availability} onChange={handleChange}>
                                <option>Available</option>
                                <option>Not Available</option>
                           </select>
                        </div>
                    </div>
                </div>
                 <div>
                    <label htmlFor="galleryImages" className="block text-sm font-medium leading-6 text-[var(--color-text)]">Upload Gallery Photos</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-[var(--color-border)] px-6 py-10">
                        <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-[var(--color-text-muted)]" />
                            <div className="mt-4 flex text-sm leading-6 text-[var(--color-text-muted)]">
                                <label htmlFor="galleryImages" className="relative cursor-pointer rounded-md bg-[var(--color-bg-component)] font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]">
                                    <span>{galleryFiles.length > 0 ? `${galleryFiles.length} files selected` : 'Select files'}</span>
                                    <input id="galleryImages" name="galleryImages" type="file" multiple className="sr-only" onChange={handleFileChange} accept="image/*" />
                                </label>
                            </div>
                             <p className="text-xs leading-5 text-[var(--color-text-muted)]/80">Add up to 5 photos of your work</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={loading}>
                        <Save size={18}/> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileManagement;