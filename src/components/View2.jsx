import React, { useEffect, useState } from 'react';
import { HeadlessButton } from "@locoworks/reusejs-react-button";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function View2() {
    const [favPackage, setFavPackage] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editReason, setEditReason] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavoritePackages = async () => {
            try {
                const response = await axios.get('http://localhost:3000/');
                setFavPackage(response.data);
            } catch (error) {
                console.error('Error fetching favorite packages:', error);
            }
        };

        fetchFavoritePackages();
    }, []);

    const handleDelete = async (pkv) => {
        if (window.confirm(`Are you sure you want to delete ${pkv.name}?`)) {
            try {
                await axios.delete(`http://localhost:3000/${pkv.id}`);
                setFavPackage(favPackage.filter(pkg => pkg.package_name !== pkv.name));
            } catch (error) {
                console.error('Error deleting package:', error);
            }
        }
    };

    const handleEdit = (pkg) => {
        setIsEditing(pkg.id);
        setEditReason(pkg.reason);
    };

    const handleSave = async (id) => {
        try {
            console.log(id);
            await axios.put(`http://localhost:3000/${id}`, { reason: editReason });
            setFavPackage(favPackage.map(pkg => 
                pkg.id === id ? { ...pkg, reason: editReason } : pkg
            ));
            setIsEditing(null);
            setEditReason('');
        } catch (error) {
            console.error('Error updating package:', error);
        }
    };

    const handleSubmit = () => {
        navigate('/');
    };

    return (
        <>
            <div className="max-w-md mx-auto my-4 p-4">
                <h1 className='text-center mb-4'>Welcome to Favorite NPM packages.</h1>
                {favPackage.length > 0 ? (
                    <div className='flex flex-col items-center'>
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">Package Name</th>
                                    <th className="py-2 px-4 border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favPackage.map(pkg => (
                                    <tr key={pkg.package_name}>
                                        <td className="py-2 px-4 border-b">{pkg.package_name}</td>
                                        <td className="py-2 px-4 border-b">
                                            <div className='flex justify-around'>
                                                <button onClick={() => alert(`Reason:  ${pkg.reason}`)}>
                                                    <svg
                                                        fill="#000000"
                                                        className="h-5 w-5"
                                                        viewBox="0 0 42 42"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                                        enableBackground="new 0 0 42 42"
                                                        xmlSpace="preserve"
                                                    >
                                                        <path d="M15.3,20.1c0,3.1,2.6,5.7,5.7,5.7s5.7-2.6,5.7-5.7s-2.6-5.7-5.7-5.7S15.3,17,15.3,20.1z M23.4,32.4 C30.1,30.9,40.5,22,40.5,22s-7.7-12-18-13.3c-0.6-0.1-2.6-0.1-3-0.1c-10,1-18,13.7-18,13.7s8.7,8.6,17,9.9 C19.4,32.6,22.4,32.6,23.4,32.4z M11.1,20.7c0-5.2,4.4-9.4,9.9-9.4s9.9,4.2,9.9,9.4S26.5,30,21,30S11.1,25.8,11.1,20.7z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleEdit(pkg)}>
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M20.9888 4.28491L19.6405 2.93089C18.4045 1.6897 16.4944 1.6897 15.2584 2.93089L13.0112 5.30042L18.7416 11.055L21.1011 8.68547C21.6629 8.1213 22 7.33145 22 6.54161C22 5.75176 21.5506 4.84908 20.9888 4.28491Z"
                                                            fill="#030D45"
                                                        />
                                                        <path
                                                            d="M16.2697 10.9422L11.7753 6.42877L2.89888 15.3427C2.33708 15.9069 2 16.6968 2 17.5994V21.0973C2 21.5487 2.33708 22 2.89888 22H6.49438C7.2809 22 8.06742 21.6615 8.74157 21.0973L17.618 12.1834L16.2697 10.9422Z"
                                                            fill="#030D45"
                                                        />
                                                    </svg>
                                                </button>
                                                {/* <button onClick={() => handleDelete(pkg.package_name)}> */}
                                                <button onClick={() => handleDelete(pkg)}>
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M7 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2h4a1 1 0 1 1 0 2h-1.069l-.867 12.142A2 2 0 0 1 17.069 22H6.93a2 2 0 0 1-1.995-1.858L4.07 8H3a1 1 0 0 1 0-2h4V4zm2 2h6V4H9v2zM6.074 8l.857 12H17.07l.857-12H6.074zM10 10a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0v-6a1 1 0 0 1 1-1z"
                                                            fill="#0D0D0D"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {isEditing && (
                            <div className="mt-4">
                                <label htmlFor="editReason" className="block text-gray-700 text-sm font-bold mb-2">
                                    Edit Reason
                                </label>
                                <input
                                    id="editReason"
                                    type="text"
                                    value={editReason}
                                    onChange={(e) => setEditReason(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                <div className="flex justify-end mt-2">
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        onClick={() => handleSave(isEditing)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() => {
                                            setIsEditing(null);
                                            setEditReason('');
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        <HeadlessButton
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white self-end mt-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add More
                        </HeadlessButton>
                    </div>
                ) : (
                    <div className="border rounded p-4 text-center">
                        <p className="mb-4">No favorite packages saved.</p>
                        <HeadlessButton
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-700 text-white self-end mt-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            ADD NOW
                        </HeadlessButton>
                    </div>
                )}
            </div>
        </>
    );
}

export default View2;
