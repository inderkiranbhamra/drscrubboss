import React from 'react';
// Importing necessary icons from react-icons
import { FiEdit, FiHeadphones, FiMessageSquare, FiSettings, FiLogOut } from 'react-icons/fi';

const ProfileScreenStyles = () => (
    <style>{`
        :root {
            --text-dark: #1F2937;
            --text-light: #6B7280;
            --bg-light: #F9FAFB; /* A slightly off-white for the background */
            --border-light: #E5E7EB;
        }

        body {
            background-color: var(--bg-light);
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .profile-screen-container {
            padding: 20px 15px;
            background-color: var(--bg-light);
            min-height: 100vh;
        }

        .user-info-card {
            background-color: #fff;
            border-radius: 16px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 30px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
            position: relative;
        }

        .profile-picture {
            width: 70px;
            height: 70px;
            border-radius: 12px;
            object-fit: cover;
            flex-shrink: 0;
        }

        .user-details {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .user-name {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-dark);
            margin: 0;
        }

        .user-contact {
            font-size: 14px;
            color: var(--text-light);
            margin: 0;
        }

        .edit-icon {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 18px;
            color: var(--text-light);
            cursor: pointer;
        }

        .menu-options-list {
            display: flex;
            flex-direction: column;
            /* Removed gap to tighten the list */
        }

        .menu-item {
            display: flex;
            align-items: center;
            /* Reduced vertical padding */
            padding: 12px 15px;
            gap: 20px;
            cursor: pointer;
        }

        .menu-icon-container {
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;
            border-radius: 8px;
            border: 1px solid var(--border-light);
            color: var(--text-light);
            font-size: 20px;
        }

        .menu-label {
            font-size: 16px;
            font-weight: 500;
            color: var(--text-dark);
        }
    `}</style>
);

function ProfileScreen() {
    return (
        <>
            <ProfileScreenStyles />
            <div className="profile-screen-container">
                <div className="user-info-card">
                    <img
                        src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                        alt="Ramesh"
                        className="profile-picture"
                    />
                    <div className="user-details">
                        <p className="user-name">Ramesh</p>
                        <p className="user-contact">rameshrk@gmail.com</p>
                        <p className="user-contact">+91 8807635618</p>
                    </div>
                    <FiEdit className="edit-icon" />
                </div>

                <div className="menu-options-list">
                    <div className="menu-item">
                        <div className="menu-icon-container">
                            <FiHeadphones />
                        </div>
                        <span className="menu-label">Help & Support</span>
                    </div>
                    <div className="menu-item">
                        <div className="menu-icon-container">
                            <FiMessageSquare />
                        </div>
                        <span className="menu-label">Report an issue</span>
                    </div>
                    <div className="menu-item">
                        <div className="menu-icon-container">
                            <FiSettings />
                        </div>
                        <span className="menu-label">Settings</span>
                    </div>
                    <div className="menu-item">
                        <div className="menu-icon-container">
                            <FiLogOut />
                        </div>
                        <span className="menu-label">Logout</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileScreen;

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//     signOut,
//     deleteUser,
//     linkWithCredential,
//     EmailAuthProvider,
//     linkWithPopup,
//     GoogleAuthProvider
// } from 'firebase/auth';
// import { auth, db } from '../firebase';
// import { doc, getDoc, collection, getDocs, orderBy, query, writeBatch, updateDoc } from 'firebase/firestore';
// import { useAuth } from '../contexts/AuthContext';
// import { FaUserCircle, FaFileInvoiceDollar, FaQuestionCircle, FaShoppingCart, FaExclamationTriangle, FaEdit, FaKey } from 'react-icons/fa';
// import { FcGoogle } from 'react-icons/fc';

// // --- CONSTANTS ---
// const CSC_API_KEY = "YjdlOVhiUHlzbEJxQ0xWTkdiZjVQbkxyZTM1N1diZVZSb0lkMkp3bA==";
// const CSC_API_HEADERS = { "X-CSCAPI-KEY": CSC_API_KEY };

// // --- HELPER FUNCTIONS ---
// const loadScript = (src) => {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//     });
// };

// const Spinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="http://www.w3.org/2000/svg"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
// const FormStatusMessage = ({ status }) => { if (!status || !status.message) return null; const bgColor = status.type === 'success' ? 'bg-green-100' : 'bg-red-100'; const textColor = status.type === 'success' ? 'text-green-800' : 'text-red-800'; return (<div className={`${bgColor} ${textColor} p-3 rounded-md text-sm my-2`}>{status.message}</div>); };

// // --- Anonymous User Actions Component ---
// const AnonymousUserActions = ({ currentUser }) => {
//     const [isLinking, setIsLinking] = useState(false);
//     const [linkError, setLinkError] = useState('');
//     const [linkEmail, setLinkEmail] = useState('');
//     const [linkPassword, setLinkPassword] = useState('');
//     const [confirmLinkPassword, setConfirmLinkPassword] = useState('');

//     const handleLinkWithGoogle = async () => {
//         setIsLinking(true);
//         setLinkError('');
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await linkWithPopup(currentUser, provider);
//             const userDocRef = doc(db, 'users', currentUser.uid);

//             await updateDoc(userDocRef, {
//                 isAnonymous: false,
//                 email: result.user.email,
//                 name: result.user.displayName,
//             });
//             alert("Account successfully linked with Google!");
//             window.location.reload();
//         } catch (error) {
//             console.error("Error linking with Google:", error);
//             if (error.code === 'auth/credential-already-in-use') {
//                 setLinkError("This Google account is already linked to another user.");
//             } else {
//                 setLinkError("Failed to link with Google. Please try again.");
//             }
//         } finally {
//             setIsLinking(false);
//         }
//     };

//     const handleLinkWithEmail = async (e) => {
//         e.preventDefault();
//         if (linkPassword !== confirmLinkPassword) {
//             setLinkError("Passwords do not match.");
//             return;
//         }
//         setIsLinking(true);
//         setLinkError('');

//         try {
//             const userDocRef = doc(db, 'users', currentUser.uid);
//             const userDocSnap = await getDoc(userDocRef);
//             const currentName = userDocSnap.exists() ? userDocSnap.data().name : 'Guest User';

//             const credential = EmailAuthProvider.credential(linkEmail, linkPassword);
//             await linkWithCredential(currentUser, credential);

//             await updateDoc(userDocRef, {
//                 isAnonymous: false,
//                 email: linkEmail,
//                 name: currentName
//             });
//             alert("Account successfully converted to a permanent account!");
//             window.location.reload();
//         } catch (error) {
//             console.error("Error linking with email:", error);
//             if (error.code === 'auth/email-already-in-use') {
//                 setLinkError("This email is already in use by another account.");
//             } else {
//                 setLinkError("Failed to link account. Please try again.");
//             }
//         } finally {
//             setIsLinking(false);
//         }
//     };

//     return (
//         <div className="p-6 bg-yellow-50 border-2 border-dashed border-yellow-300 rounded-lg mb-8">
//             <h3 className="text-xl font-bold text-yellow-800">This is a Guest Account</h3>
//             <p className="text-yellow-700 mt-1 mb-4">To save your orders and access this account from other devices, please link it to a permanent login method.</p>

//             {linkError && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{linkError}</p>}

//             <form onSubmit={handleLinkWithEmail} className="space-y-3">
//                 <input type="email" value={linkEmail} onChange={(e) => setLinkEmail(e.target.value)} placeholder="Enter your email" required className="w-full px-4 py-2 border rounded-md" />
//                 <input type="password" value={linkPassword} onChange={(e) => setLinkPassword(e.target.value)} placeholder="Create a new password" required className="w-full px-4 py-2 border rounded-md" />
//                 <input type="password" value={confirmLinkPassword} onChange={(e) => setConfirmLinkPassword(e.target.value)} placeholder="Confirm new password" required className="w-full px-4 py-2 border rounded-md" />
//                 <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex justify-center items-center gap-2" disabled={isLinking}>
//                     <FaKey /> {isLinking ? 'Linking...' : 'Create Password & Link'}
//                 </button>
//             </form>

//             <div className="flex items-center my-4"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span><div className="flex-grow border-t border-gray-300"></div></div>

//             <button type="button" onClick={handleLinkWithGoogle} className="w-full flex justify-center items-center gap-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:bg-gray-200" disabled={isLinking}>
//                 <FcGoogle size={22} />
//                 <span className="font-medium text-gray-700">Link with Google</span>
//             </button>
//         </div>
//     );
// };


// const ProfileScreen = () => {
//     const { currentUser } = useAuth();
//     const navigate = useNavigate();

//     const [userDetails, setUserDetails] = useState(null);
//     const [invoices, setInvoices] = useState([]);
//     const [queries, setQueries] = useState([]);
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [formData, setFormData] = useState({});
//     const [editStatus, setEditStatus] = useState({ type: '', message: '' });
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [locationLoading, setLocationLoading] = useState(false);
//     const [payingInvoiceId, setPayingInvoiceId] = useState(null);
//     const [payingOrderId, setPayingOrderId] = useState(null);
//     const [paymentStatus, setPaymentStatus] = useState({ type: '', message: '' });

//     useEffect(() => {
//         loadScript("https://checkout.razorpay.com/v1/checkout.js");
//     }, []);

//     useEffect(() => {
//         if (!currentUser) {
//             navigate('/');
//             return;
//         }
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 const userDocRef = doc(db, 'users', currentUser.uid);
//                 const userDocSnap = await getDoc(userDocRef);
//                 if (userDocSnap.exists()) {
//                     const userData = userDocSnap.data();
//                     setUserDetails(userData);
//                     setFormData(userData);
//                 }

//                 const invoicesQuery = query(collection(db, 'users', currentUser.uid, 'invoices'), orderBy('createdAt', 'desc'));
//                 const invoicesSnapshot = await getDocs(invoicesQuery);
//                 setInvoices(invoicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//                 const queriesQuery = query(collection(db, 'users', currentUser.uid, 'queries'), orderBy('createdAt', 'desc'));
//                 const queriesSnapshot = await getDocs(queriesQuery);
//                 setQueries(queriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//                 const ordersQuery = query(collection(db, 'users', currentUser.uid, 'orders'), orderBy('createdAt', 'desc'));
//                 const ordersSnapshot = await getDocs(ordersQuery);
//                 setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

//             } catch (error) {
//                 console.error("Error fetching user data:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [currentUser, navigate]);

//     const fetchStates = useCallback(async (countryIso) => {
//         if (!countryIso) return;
//         setLocationLoading(true);
//         setStates([]);
//         setCities([]);
//         try {
//             const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`, { headers: CSC_API_HEADERS });
//             const data = await response.json();
//             setStates(data);
//         } catch (error) { console.error("Failed to fetch states", error); }
//         setLocationLoading(false);
//     }, []);

//     const fetchCities = useCallback(async (countryIso, stateIso) => {
//         if (!countryIso || !stateIso) return;
//         setLocationLoading(true);
//         setCities([]);
//         try {
//             const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`, { headers: CSC_API_HEADERS });
//             const data = await response.json();
//             setCities(data);
//         } catch (error) { console.error("Failed to fetch cities", error); }
//         setLocationLoading(false);
//     }, []);

//     useEffect(() => {
//         if (isEditing) {
//             fetch('https://api.countrystatecity.in/v1/countries', { headers: CSC_API_HEADERS })
//                 .then(res => res.json())
//                 .then(data => setCountries(data))
//                 .catch(err => console.error("Failed to fetch countries", err));
//         }
//     }, [isEditing]);

//     useEffect(() => {
//         if (isEditing && formData.country && countries.length > 0) {
//             const currentCountry = countries.find(c => c.name === formData.country);
//             if (currentCountry) {
//                 fetchStates(currentCountry.iso2);
//             }
//         }
//     }, [isEditing, countries, formData.country, fetchStates]);

//     useEffect(() => {
//         if (isEditing && formData.state && states.length > 0) {
//             const currentCountry = countries.find(c => c.name === formData.country);
//             const currentState = states.find(s => s.name === formData.state);
//             if (currentCountry && currentState) {
//                 fetchCities(currentCountry.iso2, currentState.iso2);
//             }
//         }
//     }, [isEditing, states, formData.state, countries, formData.country, fetchCities]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         const newFormData = { ...formData, [name]: value };

//         if (name === 'country') {
//             const selectedCountry = countries.find(c => c.name === value);
//             newFormData.state = '';
//             newFormData.city = '';
//             setStates([]);
//             setCities([]);
//             if (selectedCountry) fetchStates(selectedCountry.iso2);
//         }
//         if (name === 'state') {
//             const selectedCountry = countries.find(c => c.name === formData.country);
//             const selectedState = states.find(s => s.name === value);
//             newFormData.city = '';
//             setCities([]);
//             if (selectedCountry && selectedState) fetchCities(selectedCountry.iso2, selectedState.iso2);
//         }
//         setFormData(newFormData);
//     };

//     const handleSaveChanges = async (e) => {
//         e.preventDefault();
//         setIsSaving(true);
//         setEditStatus({ type: '', message: '' });
//         try {
//             const userDocRef = doc(db, 'users', currentUser.uid);
//             const dataToUpdate = {
//                 name: formData.name || '',
//                 phone: formData.phone || '',
//                 address: formData.address || '',
//                 country: formData.country || '',
//                 state: formData.state || '',
//                 city: formData.city || '',
//             };
//             await updateDoc(userDocRef, dataToUpdate);
//             setUserDetails(prev => ({ ...prev, ...dataToUpdate }));
//             setEditStatus({ type: 'success', message: 'Profile updated successfully!' });
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error updating profile: ", error);
//             setEditStatus({ type: 'error', message: 'Failed to update profile. Please try again.' });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handlePayExistingInvoice = async (invoiceToPay) => {
//         if (!currentUser) return;
//         setPayingInvoiceId(invoiceToPay.id);
//         setPaymentStatus({ type: '', message: '' });
//         try {
//             const response = await fetch('https://nexgencred-backend.vercel.app/create-razorpay-order', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     amount: invoiceToPay.amount,
//                     currency: invoiceToPay.currency,
//                     user_id: currentUser.uid,
//                     firestore_id: invoiceToPay.id,
//                     type: 'invoice'
//                 }),
//             });
//             if (!response.ok) throw new Error((await response.json()).message || 'Payment gateway error.');
//             const order = await response.json();
//             const options = {
//                 key: "rzp_live_VpmCGDKKSriQKK",
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "NexGenCred",
//                 description: `Payment for Invoice #${invoiceToPay.invoiceNumber}`,
//                 order_id: order.id,
//                 handler: function (response) {
//                     setPaymentStatus({ type: 'success', message: 'Payment successful! Your invoice status will update shortly.' });
//                     alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: { name: userDetails.name || '', email: userDetails.email || '', contact: userDetails.phone || '', },
//                 theme: { color: "#1656A0" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error("Error paying existing invoice:", error);
//             setPaymentStatus({ type: 'error', message: `Failed to pay Inv #${invoiceToPay.invoiceNumber}: ${error.message}` });
//         } finally {
//             setPayingInvoiceId(null);
//         }
//     };

//     const handlePayExistingOrder = async (orderToPay) => {
//         if (!currentUser) return;
//         setPayingOrderId(orderToPay.id);
//         setPaymentStatus({ type: '', message: '' });
//         try {
//             const response = await fetch('https://nexgencred-backend.vercel.app/create-razorpay-order', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     amount: orderToPay.total,
//                     currency: orderToPay.currency,
//                     user_id: currentUser.uid,
//                     firestore_id: orderToPay.id,
//                     type: 'product_order'
//                 }),
//             });
//             if (!response.ok) throw new Error((await response.json()).message || 'Payment gateway error.');
//             const order = await response.json();
//             const options = {
//                 key: "rzp_live_VpmCGDKKSriQKK",
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "NexGenCred",
//                 description: `Payment for Order #${orderToPay.orderNumber || orderToPay.id}`,
//                 order_id: order.id,
//                 handler: function (response) {
//                     setPaymentStatus({ type: 'success', message: 'Payment successful! Your order status will update shortly.' });
//                     alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: { name: userDetails.name || '', email: userDetails.email || '', contact: userDetails.phone || '', },
//                 theme: { color: "#1656A0" }
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error("Error paying existing order:", error);
//             setPaymentStatus({ type: 'error', message: `Failed to pay Order #${orderToPay.orderNumber}: ${error.message}` });
//         } finally {
//             setPayingOrderId(null);
//         }
//     };

//     const handleLogout = async () => {
//         await signOut(auth);
//         navigate('/');
//     };

//     const handleDeleteAccount = async () => {
//         if (!window.confirm("Are you sure you want to delete your account? This action is irreversible.")) return;
//         if (!window.confirm("Please confirm one last time. All your data, including invoices and orders, will be permanently deleted.")) return;

//         try {
//             setLoading(true);
//             const batch = writeBatch(db);
//             const collectionsToDelete = ['invoices', 'queries', 'orders', 'cart'];
//             for (const subcollection of collectionsToDelete) {
//                 const snapshot = await getDocs(collection(db, 'users', currentUser.uid, subcollection));
//                 snapshot.forEach(doc => batch.delete(doc.ref));
//             }
//             batch.delete(doc(db, 'users', currentUser.uid));
//             await batch.commit();
//             await deleteUser(currentUser);
//             alert("Your account has been successfully deleted.");
//             navigate('/');
//         } catch (error) {
//             setLoading(false);
//             console.error("Error deleting account:", error);
//             alert("Error deleting account. You may need to sign out and sign back in to perform this operation.");
//         }
//     };

//     const formatDate = (timestamp) => {
//         if (!timestamp) return 'N/A';
//         return timestamp.toDate().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
//     };

//     const StatusBadge = ({ status }) => {
//         const lowerStatus = status?.toLowerCase();
//         let colorClasses = 'bg-gray-200 text-gray-800';
//         if (lowerStatus === 'pending') colorClasses = 'bg-yellow-200 text-yellow-800';
//         else if (lowerStatus === 'completed' || lowerStatus === 'paid') colorClasses = 'bg-green-200 text-green-800';
//         else if (lowerStatus === 'cancelled') colorClasses = 'bg-red-200 text-red-800';
//         return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>{status}</span>;
//     };

//     if (loading) {
//         return <div className="min-h-screen flex items-center justify-center"><p className="text-xl">Loading Profile...</p></div>;
//     }

//     if (!userDetails) {
//         return (
//             <div className="min-h-screen flex items-center justify-center text-center px-4">
//                 <div>
//                     <h1 className="text-2xl font-bold text-red-600">Could not find user profile.</h1>
//                     <p className="text-gray-600 mt-2">The user data might be missing or there was an error.</p>
//                     <button onClick={handleLogout} className="mt-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Logout</button>
//                 </div>
//             </div>
//         )
//     }

//     return (
//         <div className="bg-gray-50 min-h-screen pt-28 pb-12 px-4">
//             <div className="max-w-4xl mx-auto">

//                 {currentUser && currentUser.isAnonymous && <AnonymousUserActions currentUser={currentUser} />}

//                 <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
//                     <div className="flex flex-col sm:flex-row items-center gap-6">
//                         <FaUserCircle className="text-7xl text-gray-400 flex-shrink-0" />
//                         <div className="text-center sm:text-left">
//                             <h1 className="text-3xl font-bold text-gray-800">{userDetails.name}</h1>
//                             <p className="text-gray-600">{userDetails.email || 'No email provided'}</p>
//                             {currentUser.isAnonymous && <span className="mt-1 inline-block bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">Guest Account</span>}
//                         </div>
//                         <div className="sm:ml-auto flex gap-2">
//                             <button onClick={() => { setIsEditing(true); setEditStatus({ type: '', message: '' }); setFormData(userDetails); }} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors font-semibold flex items-center gap-2">
//                                 <FaEdit /> Edit
//                             </button>
//                             <button onClick={handleLogout} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold">
//                                 Logout
//                             </button>
//                         </div>
//                     </div>
//                     <div className="border-t my-6"></div>
//                     {isEditing ? (
//                         <form onSubmit={handleSaveChanges} className="space-y-4">
//                             <h3 className="text-xl font-semibold text-gray-700 mb-2">Edit Details</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                                     <input type="text" name="name" value={formData.name || ''} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded-md shadow-sm" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Phone</label>
//                                     <input type="tel" name="phone" value={formData.phone || ''} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded-md shadow-sm" />
//                                 </div>
//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium text-gray-700">Address</label>
//                                     <input type="text" name="address" value={formData.address || ''} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded-md shadow-sm" />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">Country</label>
//                                     <select name="country" value={formData.country || ''} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded-md shadow-sm bg-white" disabled={locationLoading}>
//                                         <option value="">{locationLoading && !countries.length ? 'Loading...' : 'Select Country'}</option>
//                                         {countries.map(c => <option key={c.iso2} value={c.name}>{c.name}</option>)}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">State</label>
//                                     <select name="state" value={formData.state || ''} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded-md shadow-sm bg-white" disabled={!formData.country || locationLoading}>
//                                         <option value="">{locationLoading && !states.length ? 'Loading...' : 'Select State'}</option>
//                                         {states.map(s => <option key={s.iso2} value={s.name}>{s.name}</option>)}
//                                     </select>
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700">City</label>
//                                     <select name="city" value={formData.city || ''} onChange={handleInputChange} className="mt-1 block w-full border p-2 rounded-md shadow-sm bg-white" disabled={!formData.state || locationLoading}>
//                                         <option value="">{locationLoading && !cities.length ? 'Loading...' : 'Select City'}</option>
//                                         {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
//                                     </select>
//                                 </div>
//                             </div>
//                             <FormStatusMessage status={editStatus} />
//                             <div className="flex justify-end gap-3 pt-4">
//                                 <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 font-semibold">Cancel</button>
//                                 <button type="submit" disabled={isSaving} className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 font-semibold flex items-center disabled:bg-gray-400">
//                                     {isSaving && <Spinner />} {isSaving ? 'Saving...' : 'Save Changes'}
//                                 </button>
//                             </div>
//                         </form>
//                     ) : (
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
//                             <div><strong className="text-gray-500">Phone:</strong> {userDetails.phone || 'N/A'}</div>
//                             <div><strong className="text-gray-500">State:</strong> {userDetails.state || 'N/A'}</div>
//                             <div><strong className="text-gray-500">Address:</strong> {userDetails.address || 'N/A'}</div>
//                             <div><strong className="text-gray-500">City:</strong> {userDetails.city || 'N/A'}</div>
//                             <div><strong className="text-gray-500">Country:</strong> {userDetails.country || 'N/A'}</div>
//                             <div><strong className="text-gray-500">Member Since:</strong> {formatDate(userDetails.createdAt)}</div>
//                         </div>
//                     )}
//                     <div className="border-t mt-6 pt-6">
//                         <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
//                             <div className="flex items-start gap-3">
//                                 <FaExclamationTriangle className="text-red-500 text-xl mt-1 flex-shrink-0" />
//                                 <div>
//                                     <p className="font-semibold">Delete your account</p>
//                                     <p className="text-sm text-red-800">Once you delete your account, there is no going back. Please be certain.</p>
//                                 </div>
//                             </div>
//                             <button onClick={handleDeleteAccount} className="mt-3 sm:mt-0 sm:ml-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold flex-shrink-0">
//                                 Delete Account
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><FaFileInvoiceDollar />My Invoices</h2>
//                     <FormStatusMessage status={paymentStatus} />
//                     {invoices.length > 0 ? (
//                         <div className="space-y-4">
//                             {invoices.map(invoice => (
//                                 <div key={invoice.id} className="p-4 border rounded-lg">
//                                     <div className="flex flex-col sm:flex-row justify-between sm:items-center">
//                                         <div>
//                                             <p className="font-bold">Invoice #{invoice.invoiceNumber}</p>
//                                             <p className="text-sm text-gray-500">Created: {formatDate(invoice.createdAt)}</p>
//                                         </div>
//                                         <div className="text-left sm:text-right mt-2 sm:mt-0">
//                                             <p className="font-semibold text-lg">{invoice.currency} {invoice.amount}</p>
//                                             <StatusBadge status={invoice.status} />
//                                         </div>
//                                     </div>
//                                     {invoice.status === 'Pending' && (
//                                         <div className="text-right mt-2 pt-2 border-t">
//                                             <button
//                                                 onClick={() => handlePayExistingInvoice(invoice)}
//                                                 disabled={payingInvoiceId === invoice.id}
//                                                 className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center ml-auto"
//                                             >
//                                                 {payingInvoiceId === invoice.id && <Spinner />}
//                                                 {payingInvoiceId === invoice.id ? 'Processing...' : 'Pay Now'}
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     ) : <p className="text-gray-500">No invoices found.</p>}
//                 </div>

//                 <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><FaQuestionCircle />My Queries</h2>
//                     {queries.length > 0 ? (
//                         <div className="space-y-4">
//                             {queries.map(q => (
//                                 <div key={q.id} className="p-4 border rounded-lg">
//                                     <p className="text-sm text-gray-500 mb-2">Submitted on: {formatDate(q.createdAt)}</p>
//                                     <p className="text-gray-700">{q.message}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ) : <p className="text-gray-500">You haven't submitted any queries.</p>}
//                 </div>

//                 <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3"><FaShoppingCart />My Orders</h2>
//                     {orders.length > 0 ? (
//                         <div className="space-y-4">
//                             {orders.map(order => (
//                                 <div key={order.id} className="p-4 border rounded-lg">
//                                     <div className="flex flex-col sm:flex-row justify-between sm:items-center">
//                                         <div>
//                                             <p className="font-bold">Order #{order.orderNumber || order.id}</p>
//                                             <p className="text-sm text-gray-500">Placed on: {formatDate(order.createdAt)}</p>
//                                         </div>
//                                         <div className="text-left sm:text-right mt-2 sm:mt-0">
//                                             <p className="font-semibold text-lg">{order.currency || 'INR'} {order.total}</p>
//                                             <StatusBadge status={order.status} />
//                                         </div>
//                                     </div>
//                                     {order.status === 'Pending' && (
//                                         <div className="text-right mt-2 pt-2 border-t">
//                                             <button
//                                                 onClick={() => handlePayExistingOrder(order)}
//                                                 disabled={payingOrderId === order.id}
//                                                 className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center ml-auto"
//                                             >
//                                                 {payingOrderId === order.id ? 'Processing...' : 'Pay Now'}
//                                             </button>
//                                         </div>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     ) : <p className="text-gray-500">You have not placed any orders yet.</p>}
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default ProfileScreen;