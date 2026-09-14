import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Upload, Save, DollarSign, Trash2, X, ImagePlus } from 'lucide-react';

const MAX_GALLERY_PHOTOS = 5;

const ProfileManagement = () => {
    const { user, updateUser } = useAuth();
    const isWorker = user?.role === 'WORKER';
    
    const [formData, setFormData] = useState({
        fullName: '', tagline: '', description: '', skills: '', availability: 'Available',
        street: '', city: '', state: '', zipCode: '',
        rate: '', per: 'month',
    });
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [aiGenerating, setAiGenerating] = useState(false);
    const [deletingImage, setDeletingImage] = useState(null);

    // Existing gallery images from DB
    const existingGallery = user?.galleryImages || [];
    const totalPhotos = existingGallery.length + galleryFiles.length;
    const remainingSlots = MAX_GALLERY_PHOTOS - existingGallery.length;

    const handleGenerateAiBio = async () => {
        setAiGenerating(true);
        const toastId = toast.loading("Generating AI Bio & Tagline...");
        try {
            const response = await api.post('/ai/generate-bio', {
                primaryService: user?.primaryService || 'Cook',
                experience: user?.experience || 3,
                skills: formData.skills || 'Cooking, Cleaning, Hygiene',
                city: formData.city || 'Mumbai'
            });

            const { tagline, description } = response.data.data;
            setFormData(prev => ({
                ...prev,
                tagline: tagline || prev.tagline,
                description: description || prev.description
            }));
            toast.success("✨ AI Tagline & Bio generated!", { id: toastId });
        } catch (err) {
            console.error("AI Bio Generation failed:", err);
            toast.error("Failed to generate AI Bio.", { id: toastId });
        } finally {
            setAiGenerating(false);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                tagline: user.tagline || '',
                description: user.description || '',
                skills: user.skills?.join(', ') || '',
                availability: user.availability || 'Available',
                street: user.address?.street || '',
                city: user.address?.city || '',
                state: user.address?.state || '',
                zipCode: user.address?.zipCode || '',
                rate: user.pricing?.rate || '',
                per: user.pricing?.per || 'month',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.name === 'profileImage') {
            setProfileImageFile(e.target.files[0]);
        } else if (e.target.name === 'galleryImages') {
            const selectedFiles = Array.from(e.target.files);
            const allowed = remainingSlots - galleryFiles.length;
            if (allowed <= 0) {
                toast.error(`Maximum ${MAX_GALLERY_PHOTOS} photos allowed. Delete existing photos to add new ones.`);
                return;
            }
            if (selectedFiles.length > allowed) {
                toast.error(`You can only add ${allowed} more photo(s). (Max ${MAX_GALLERY_PHOTOS} total)`);
                setGalleryFiles(prev => [...prev, ...selectedFiles.slice(0, allowed)]);
            } else {
                setGalleryFiles(prev => [...prev, ...selectedFiles]);
            }
            // Reset input so same file can be re-selected
            e.target.value = '';
        }
    };

    const removeNewGalleryFile = (indexToRemove) => {
        setGalleryFiles(prev => prev.filter((_, i) => i !== indexToRemove));
    };

    const handleDeleteExistingImage = async (imageUrl) => {
        setDeletingImage(imageUrl);
        const toastId = toast.loading("Deleting gallery image...");
        try {
            const response = await api.patch('/users/me/gallery-delete', { imageUrl });
            updateUser(response.data.data);
            toast.success("Gallery image deleted!", { id: toastId });
        } catch (err) {
            console.error("Delete gallery image failed:", err);
            toast.error(err.response?.data?.message || "Failed to delete image.", { id: toastId });
        } finally {
            setDeletingImage(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const toastId = toast.loading("Updating profile...");

        const dataToSubmit = new FormData();
        for (const key in formData) {
            dataToSubmit.append(key, formData[key]);
        }
        if (profileImageFile) {
            dataToSubmit.append('profileImage', profileImageFile);
        }
        galleryFiles.forEach(file => {
            dataToSubmit.append('galleryImages', file);
        });

        try {
            const response = await api.patch('/users/me/profile', dataToSubmit, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            updateUser(response.data.data);
            toast.success("Profile updated successfully!", { id: toastId });
            setProfileImageFile(null);
            setGalleryFiles([]);
        } catch (error) {
            console.error("Profile update failed:", error);
            toast.error(error.response?.data?.message || "Failed to update profile.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-lg bg-[var(--color-bg-component)] p-6 shadow-lg">
            <h2 className="text-2xl font-semibold text-[var(--color-text-strong)] mb-6">Manage Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6 divide-y divide-[var(--color-border)]">
                
                <section className="pt-6">
                    <h3 className="text-lg font-medium text-[var(--color-text-strong)]">Personal Info & Profile Photo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 items-center">
                        <div>
                            <label className="block text-sm font-medium">Full Name</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Profile Photo Upload</label>
                            <div className="mt-2 flex items-center gap-4">
                                <img
                                    src={profileImageFile ? URL.createObjectURL(profileImageFile) : (user?.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600')}
                                    alt="Profile Preview"
                                    className="h-16 w-16 rounded-full object-cover border-2 border-[var(--color-primary)] shadow-md"
                                />
                                <input
                                    type="file"
                                    name="profileImage"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-[var(--color-primary)] file:text-white hover:file:bg-[var(--color-primary-hover)] cursor-pointer"
                                />
                            </div>
                            {profileImageFile && <p className="text-xs text-green-400 mt-1">New photo selected: {profileImageFile.name}</p>}
                        </div>
                    </div>
                </section>
                
                <section className="pt-6">
                    <h3 className="text-lg font-medium text-[var(--color-text-strong)]">Address</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium">Street</label>
                            <input type="text" name="street" value={formData.street} onChange={handleChange} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium">City</label>
                            <input type="text" name="city" value={formData.city} onChange={handleChange} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium">State</label>
                            <input type="text" name="state" value={formData.state} onChange={handleChange} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium">Zip Code</label>
                            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
                        </div>
                    </div>
                </section>

                {isWorker && (
                    <>
                        <section className="pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-[var(--color-text-strong)]">Professional Details</h3>
                                <button type="button" onClick={handleGenerateAiBio} disabled={aiGenerating} className="btn bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 !px-3 !py-1.5 shadow-md hover:from-purple-700 hover:to-indigo-700">
                                    <span>✨ Generate Bio with AI</span>
                                </button>
                            </div>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <label className="block text-sm font-medium">Tagline / Short Bio</label>
                                    <input type="text" name="tagline" placeholder="e.g., Expert in South Indian cuisine" value={formData.tagline} onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">About Me (Description)</label>
                                    <textarea name="description" rows={4} value={formData.description} onChange={handleChange} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium">Skills (comma-separated)</label>
                                        <input type="text" name="skills" placeholder="e.g., Cooking, Cleaning, Child Care" value={formData.skills} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium">Current Availability</label>
                                       <select name="availability" value={formData.availability} onChange={handleChange}>
                                            <option>Available</option>
                                            <option>Not Available</option>
                                       </select>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="pt-6">
                            <h3 className="text-lg font-medium text-[var(--color-text-strong)]">Pricing</h3>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end mt-4">
                                <div>
                                    <label className="block text-sm font-medium">Rate</label>
                                    <div className="relative">
                                       <DollarSign className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-text-muted)]" />
                                       <input type="number" name="rate" className="pl-10" placeholder="500" value={formData.rate} onChange={handleChange} />
                                    </div>
                                </div>
                                 <div>
                                    <label className="block text-sm font-medium">Per</label>
                                    <select name="per" value={formData.per} onChange={handleChange}>
                                        <option value="hour">Hour</option>
                                        <option value="day">Day</option>
                                        <option value="month">Month</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        <section className="pt-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-[var(--color-text-strong)]">My Gallery</h3>
                                <span className="text-xs font-semibold text-[var(--color-text-muted)] bg-[var(--color-bg-component-subtle)] px-2 py-1 rounded-full">
                                    {totalPhotos} / {MAX_GALLERY_PHOTOS} photos
                                </span>
                            </div>

                            {/* Existing Uploaded Photos */}
                            {existingGallery.length > 0 && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Uploaded Photos</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                        {existingGallery.map((imgUrl, index) => (
                                            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-[var(--color-border)]">
                                                <img src={imgUrl} alt={`Gallery ${index + 1}`} className="h-full w-full object-cover" />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteExistingImage(imgUrl)}
                                                        disabled={deletingImage === imgUrl}
                                                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg"
                                                        title="Delete this photo"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                {deletingImage === imgUrl && (
                                                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                        <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* New Photo Previews */}
                            {galleryFiles.length > 0 && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-green-400 mb-2">New Photos (will upload on Save)</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                                        {galleryFiles.map((file, index) => (
                                            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-dashed border-green-500/50">
                                                <img src={URL.createObjectURL(file)} alt={`New ${index + 1}`} className="h-full w-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeNewGalleryFile(index)}
                                                    className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white p-1 rounded-full shadow-lg"
                                                    title="Remove"
                                                >
                                                    <X size={12} />
                                                </button>
                                                <p className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-[10px] px-1 py-0.5 truncate">{file.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Upload Area */}
                            {totalPhotos < MAX_GALLERY_PHOTOS && (
                                <div className="mt-4">
                                    <div className="flex justify-center rounded-lg border border-dashed border-[var(--color-border)] px-6 py-8 hover:border-[var(--color-primary)] transition-colors cursor-pointer">
                                        <label htmlFor="galleryImages" className="text-center cursor-pointer">
                                            <ImagePlus className="mx-auto h-10 w-10 text-[var(--color-text-muted)]" />
                                            <p className="mt-2 text-sm font-semibold text-[var(--color-primary)]">
                                                Click to add photos
                                            </p>
                                            <p className="text-xs text-[var(--color-text-muted)] mt-1">
                                                {MAX_GALLERY_PHOTOS - totalPhotos} more photo(s) can be added
                                            </p>
                                            <input id="galleryImages" name="galleryImages" type="file" multiple className="sr-only" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                    </div>
                                </div>
                            )}

                            {totalPhotos >= MAX_GALLERY_PHOTOS && (
                                <p className="mt-3 text-xs text-amber-400 font-medium">⚠️ Maximum {MAX_GALLERY_PHOTOS} photos reached. Delete existing photos to add new ones.</p>
                            )}
                        </section>
                    </>
                )}
                
                <div className="flex justify-end pt-6">
                    <button type="submit" className="btn btn-primary flex items-center gap-2" disabled={loading}>
                        <Save size={18}/> {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileManagement;