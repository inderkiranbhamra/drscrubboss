import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';

// --- Helper Functions to load external scripts ---
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

// --- SVG Icons (unchanged) ---
const PhoneIcon = ({ className }) => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 00-28 6.9l-49.6 60.6A370.66 370.66 0 01130.6 204.11l60.6-49.6a23.94 23.94 0 006.9-28l-48-112A24.16 24.16 0 00122.6.61l-104 24A24 24 0 000 48c0 256.5 207.9 464 464 464a24 24 0 0023.4-18.6l24-104a24.29 24.29 0 00-14.01-27.6z"></path></svg>);
const EnvelopeIcon = ({ className }) => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>);
const MapMarkerIcon = ({ className }) => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 01-43.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>);
const Spinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
const FormStatusMessage = ({ status }) => { if (!status || !status.message) return null; const bgColor = status.type === 'success' ? 'bg-green-100' : 'bg-red-100'; const textColor = status.type === 'success' ? 'text-green-800' : 'text-red-800'; return (<div className={`${bgColor} ${textColor} p-3 rounded-md text-center`}>{status.message}</div>); };


const ContactUs = ({ openAuthModal }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { currentUser } = useAuth();

    const [activeTab, setActiveTab] = useState('message');
    const [invoices, setInvoices] = useState([]);
    const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
    const [payingInvoiceId, setPayingInvoiceId] = useState(null);

    const [contactDetails, setContactDetails] = useState({ firstName: '', lastName: '', email: '', message: '' });
    const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
    const [messageStatus, setMessageStatus] = useState({ type: '', message: '' });

    const [paymentDetails, setPaymentDetails] = useState({ name: '', email: '', phone: '', invoiceNumber: '', amount: '', currency: 'INR' });
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState({ type: '', message: '' });

    // --- NEW: Load Razorpay script ---
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    useEffect(() => {
        const fetchInvoices = async () => {
            if (currentUser && activeTab === 'payment') {
                setIsLoadingInvoices(true);
                try {
                    const invoicesColRef = collection(db, 'users', currentUser.uid, 'invoices');
                    const q = query(invoicesColRef, orderBy('createdAt', 'desc'));
                    const querySnapshot = await getDocs(q);
                    const userInvoices = querySnapshot.docs.map(doc => ({
                        id: doc.id, ...doc.data(),
                        createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A'
                    }));
                    setInvoices(userInvoices);
                } catch (error) {
                    console.error("Error fetching invoices:", error);
                } finally {
                    setIsLoadingInvoices(false);
                }
            } else {
                setInvoices([]);
            }
        };
        fetchInvoices();
    }, [currentUser, activeTab]);

    const handleContactInputChange = (e) => setContactDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handlePaymentInputChange = (e) => setPaymentDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        // ... (This function is unchanged)
    };

    // --- MODIFIED: Generic payment display function ---
    const displayRazorpay = async (invoiceData, firestoreId) => {
        setPaymentStatus({ type: '', message: '' });

        try {
            // Step 1: Create Razorpay Order by calling your backend
            const response = await fetch('https://nexgencred-backend.vercel.app/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: invoiceData.amount,
                    currency: invoiceData.currency,
                    user_id: currentUser.uid,
                    firestore_id: firestoreId,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create payment order.');
            }
            const order = await response.json();

            // Step 2: Set up Razorpay options and open checkout
            const options = {
                key: "rzp_live_VpmCGDKKSriQKK", // Your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "NexGenCred",
                description: `Payment for Invoice #${invoiceData.invoiceNumber}`,
                order_id: order.id,
                handler: function (response) {
                    // This is called on successful payment
                    // The webhook will handle the database update.
                    setPaymentStatus({ type: 'success', message: 'Payment successful! Your invoice will be updated shortly.' });
                    alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: invoiceData.name,
                    email: invoiceData.email,
                    contact: invoiceData.phone,
                },
                notes: {
                    address: "NexGenCred Office"
                },
                theme: {
                    color: "#1656A0"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Razorpay Error:", error);
            setPaymentStatus({ type: 'error', message: error.message || "Could not initiate payment." });
        }
    };


    // --- MODIFIED: Handle paying a NEW invoice ---
    const handlePayNewInvoice = async (e) => {
        e.preventDefault();
        if (!currentUser) return;
        setIsProcessingPayment(true);

        try {
            // Create the invoice in Firestore first
            const invoiceData = { ...paymentDetails, status: 'Pending', createdAt: serverTimestamp() };
            const invoicesColRef = collection(db, 'users', currentUser.uid, 'invoices');
            const newInvoiceRef = await addDoc(invoicesColRef, invoiceData);

            // Now, initiate payment for this new invoice
            await displayRazorpay(invoiceData, newInvoiceRef.id);

        } catch (error) {
            console.error("Error creating new invoice in Firestore:", error);
            setPaymentStatus({ type: 'error', message: 'Failed to save invoice before payment.' });
        } finally {
            setIsProcessingPayment(false);
        }
    };

    // --- MODIFIED: Handle paying an EXISTING invoice ---
    const handlePayExistingInvoice = async (invoiceToPay) => {
        if (!currentUser) return;
        setPayingInvoiceId(invoiceToPay.id);

        try {
            await displayRazorpay(invoiceToPay, invoiceToPay.id);
        } catch (error) {
            // Error is already set inside displayRazorpay
        } finally {
            setPayingInvoiceId(null);
        }
    };

    return (
        <section id="contact" ref={ref} className="bg-gray-50 py-16 px-4 overflow-x-hidden font-sans">
            {/* The rest of your JSX remains exactly the same */}
            <div className="max-w-7xl mx-auto">
                <div className={`text-center mb-12 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-4xl font-bold text-[#1656A0]">Get In Touch</h2>
                    <p className="text-gray-600 text-lg mt-4 max-w-3xl mx-auto">Have a question, want a demo, or need to pay an invoice? We're here to help.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 text-green-600 "><PhoneIcon className="h-5 w-5" /><p className="text-gray-700 text-lg">+91 9780624397</p></div>
                            <div className="flex items-center gap-4 text-green-600 "><EnvelopeIcon className="h-5 w-5" /><p className="text-gray-700 text-lg">info@nexgencred.com</p></div>
                            <div className="flex items-start gap-4 text-green-600 "><MapMarkerIcon className="h-6 w-6 mt-1 flex-shrink-0" /><div><p className="text-gray-700 text-lg font-semibold">Global HQ:</p><p className="text-gray-700 text-lg">The Circle Work, Gurugram, India</p></div></div>
                        </div>
                    </div>
                    <div className={`bg-white p-8 rounded-lg shadow-md transition-all duration-1000 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                        <div className="flex border-b mb-6">
                            <button onClick={() => setActiveTab('message')} className={`py-2 px-4 text-lg font-semibold transition-colors ${activeTab === 'message' ? 'border-b-2 border-[#1656A0] text-[#1656A0]' : 'text-gray-500'}`}>Send a Message</button>
                            <button onClick={() => setActiveTab('payment')} className={`py-2 px-4 text-lg font-semibold transition-colors ${activeTab === 'payment' ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-500'}`}>Pay an Invoice</button>
                        </div>
                        {activeTab === 'message' && (
                            <form onSubmit={handleContactSubmit} className="space-y-5">
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <input type="text" name="firstName" placeholder="First Name" value={contactDetails.firstName} onChange={handleContactInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#1656A0] transition" required />
                                    <input type="text" name="lastName" placeholder="Last Name" value={contactDetails.lastName} onChange={handleContactInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#1656A0] transition" required />
                                </div>
                                <input type="email" name="email" placeholder="Email Address" value={contactDetails.email} onChange={handleContactInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-[#1656A0] transition" required />
                                <textarea name="message" placeholder="Tell us about your needs..." value={contactDetails.message} onChange={handleContactInputChange} className="w-full border p-3 rounded-md h-32 focus:ring-2 focus:ring-[#1656A0] transition" required></textarea>
                                <FormStatusMessage status={messageStatus} />
                                <button type="submit" disabled={isSubmittingMessage} className="bg-[#1656A0] w-full flex justify-center items-center cursor-pointer text-white px-6 py-3 rounded-md hover:bg-[#114683] font-semibold text-lg duration-300 transition-transform hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                    {isSubmittingMessage ? <><Spinner /> Sending...</> : 'Submit Request'}
                                </button>
                            </form>
                        )}
                        {activeTab === 'payment' && (
                            <div>
                                {!currentUser ? (
                                    <div className="text-center py-10">
                                        <p className="text-gray-600 text-lg mb-4">Please log in to view your invoices and make payments.</p>
                                        <button onClick={() => openAuthModal('login')} className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 font-semibold">Login / Sign Up</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="mb-8">
                                            <h4 className="text-xl font-semibold text-gray-700 mb-4">Your Invoice History</h4>
                                            <FormStatusMessage status={paymentStatus} />
                                            {isLoadingInvoices ? (<p className="text-center text-gray-500">Loading invoices...</p>) :
                                                invoices.length > 0 ? (
                                                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                                                        {invoices.map(invoice => (
                                                            <div key={invoice.id} className="p-3 bg-gray-50 rounded-md border">
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <p className="font-semibold">Inv #{invoice.invoiceNumber}</p>
                                                                        <p className="text-sm text-gray-500">{invoice.createdAt}</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-bold text-lg">{invoice.currency} {invoice.amount}</p>
                                                                        <span className={`text-sm font-bold px-2 py-0.5 rounded-full ${invoice.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' : 'bg-green-200 text-green-800'}`}>{invoice.status}</span>
                                                                    </div>
                                                                </div>
                                                                {invoice.status === 'Pending' && (
                                                                    <div className="text-right mt-2 pt-2 border-t">
                                                                        <button
                                                                            onClick={() => handlePayExistingInvoice(invoice)}
                                                                            disabled={payingInvoiceId === invoice.id}
                                                                            className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-md hover:bg-blue-700 disabled:bg-gray-400 flex items-center ml-auto"
                                                                        >
                                                                            {payingInvoiceId === invoice.id ? 'Processing...' : 'Pay Now'}
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (<p className="text-center text-gray-500">You have no invoices.</p>)}
                                        </div>
                                        <form onSubmit={handlePayNewInvoice} className="space-y-5 border-t pt-6">
                                            <h4 className="text-xl font-semibold text-gray-700">Pay a New Invoice</h4>
                                            <input type="text" name="name" placeholder="Full Name" value={paymentDetails.name} onChange={handlePaymentInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-600 transition" required />
                                            <input type="email" name="email" placeholder="Email Address" value={paymentDetails.email} onChange={handlePaymentInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-600 transition" required />
                                            <input type="tel" name="phone" placeholder="Phone Number" value={paymentDetails.phone} onChange={handlePaymentInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-600 transition" required />
                                            <input type="text" name="invoiceNumber" placeholder="Invoice Number" value={paymentDetails.invoiceNumber} onChange={handlePaymentInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-600 transition" required />
                                            <div className="flex gap-5">
                                                <div className="w-2/3"><input type="number" name="amount" placeholder="Amount" min="1" step="any" value={paymentDetails.amount} onChange={handlePaymentInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-600 transition" required /></div>
                                                <div className="w-1/3"><select name="currency" value={paymentDetails.currency} onChange={handlePaymentInputChange} className="w-full border p-3 rounded-md focus:ring-2 focus:ring-green-600 transition h-full" required><option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div>
                                            </div>
                                            <button type="submit" disabled={isProcessingPayment} className="bg-green-600 w-full flex justify-center items-center cursor-pointer text-white px-6 py-3 rounded-md hover:bg-green-700 font-semibold text-lg duration-300 transition-transform hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                                {isProcessingPayment ? <><Spinner /> Processing...</> : 'Proceed to Pay'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;

// import React, { useState, useEffect } from "react";
// import { useInView } from "react-intersection-observer";
// import { useAuth } from '../contexts/AuthContext';
// import { db } from '../firebase';
// import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from 'firebase/firestore';

// const loadScript = (src) => {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;
//         script.onload = () => resolve(true);
//         script.onerror = () => resolve(false);
//         document.body.appendChild(script);
//     });
// };

// const PhoneIcon = ({ className }) => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M497.39 361.8l-112-48a24 24 0 00-28 6.9l-49.6 60.6A370.66 370.66 0 01130.6 204.11l60.6-49.6a23.94 23.94 0 006.9-28l-48-112A24.16 24.16 0 00122.6.61l-104 24A24 24 0 000 48c0 256.5 207.9 464 464 464a24 24 0 0023.4-18.6l24-104a24.29 24.29 0 00-14.01-27.6z"></path></svg>);
// const EnvelopeIcon = ({ className }) => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path></svg>);
// const MapMarkerIcon = ({ className }) => (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className={className} xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 01-43.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>);
// const Spinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);
// const FormStatusMessage = ({ status }) => { if (!status || !status.message) return null; const bgColor = status.type === 'success' ? 'bg-green-200/20' : 'bg-red-200/20'; const textColor = status.type === 'success' ? 'text-green-300' : 'text-red-300'; return (<div className={`${bgColor} ${textColor} p-3 rounded-md text-center text-sm font-medium`}>{status.message}</div>); };


// const ContactUs = ({ openAuthModal }) => {
//     const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
//     const { currentUser } = useAuth();
//     const [activeTab, setActiveTab] = useState('message');
//     const [invoices, setInvoices] = useState([]);
//     const [isLoadingInvoices, setIsLoadingInvoices] = useState(false);
//     const [payingInvoiceId, setPayingInvoiceId] = useState(null);
//     const [contactDetails, setContactDetails] = useState({ firstName: '', lastName: '', email: '', message: '' });
//     const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);
//     const [messageStatus, setMessageStatus] = useState({ type: '', message: '' });
//     const [paymentDetails, setPaymentDetails] = useState({ name: '', email: '', phone: '', invoiceNumber: '', amount: '', currency: 'INR' });
//     const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//     const [paymentStatus, setPaymentStatus] = useState({ type: '', message: '' });

//     useEffect(() => {
//         loadScript("https://checkout.razorpay.com/v1/checkout.js");
//     }, []);

//     useEffect(() => {
//         const fetchInvoices = async () => {
//             if (currentUser && activeTab === 'payment') {
//                 setIsLoadingInvoices(true);
//                 try {
//                     const invoicesColRef = collection(db, 'users', currentUser.uid, 'invoices');
//                     const q = query(invoicesColRef, orderBy('createdAt', 'desc'));
//                     const querySnapshot = await getDocs(q);
//                     const userInvoices = querySnapshot.docs.map(doc => ({
//                         id: doc.id, ...doc.data(),
//                         createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A'
//                     }));
//                     setInvoices(userInvoices);
//                 } catch (error) {
//                     console.error("Error fetching invoices:", error);
//                 } finally {
//                     setIsLoadingInvoices(false);
//                 }
//             } else {
//                 setInvoices([]);
//             }
//         };
//         fetchInvoices();
//     }, [currentUser, activeTab]);

//     const handleContactInputChange = (e) => setContactDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     const handlePaymentInputChange = (e) => setPaymentDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));

//     const handleContactSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmittingMessage(true);
//         setMessageStatus({ type: '', message: '' });
//         try {
//             await addDoc(collection(db, "anonymous_queries"), {
//                 ...contactDetails,
//                 createdAt: serverTimestamp(),
//             });
//             setMessageStatus({ type: 'success', message: "Your message has been sent successfully! We'll get back to you soon." });
//             setContactDetails({ firstName: '', lastName: '', email: '', message: '' });
//         } catch (error) {
//             console.error("Error submitting contact form:", error);
//             setMessageStatus({ type: 'error', message: "Something went wrong. Please try again." });
//         } finally {
//             setIsSubmittingMessage(false);
//         }
//     };

//     const displayRazorpay = async (invoiceData, firestoreId) => {
//         setPaymentStatus({ type: '', message: '' });
//         try {
//             const response = await fetch('https://dashdrobe-backend.vercel.app/create-razorpay-order', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     amount: invoiceData.amount,
//                     currency: invoiceData.currency,
//                     user_id: currentUser.uid,
//                     firestore_id: firestoreId,
//                 }),
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to create payment order.');
//             }
//             const order = await response.json();
//             const options = {
//                 key: "rzp_live_VpmCGDKKSriQKK",
//                 amount: order.amount,
//                 currency: order.currency,
//                 name: "DashDrobe Technologies",
//                 description: `Payment for Invoice #${invoiceData.invoiceNumber}`,
//                 order_id: order.id,
//                 handler: function (response) {
//                     setPaymentStatus({ type: 'success', message: 'Payment successful! Your invoice will be updated shortly.' });
//                     alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
//                 },
//                 prefill: {
//                     name: invoiceData.name,
//                     email: invoiceData.email,
//                     contact: invoiceData.phone,
//                 },
//                 notes: { address: "DashDrobe Technologies Office" },
//                 theme: { color: "#1F2937" } // Dark Theme for Razorpay
//             };
//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error("Razorpay Error:", error);
//             setPaymentStatus({ type: 'error', message: error.message || "Could not initiate payment." });
//         }
//     };

//     const handlePayNewInvoice = async (e) => {
//         e.preventDefault();
//         if (!currentUser) return;
//         setIsProcessingPayment(true);
//         try {
//             const invoiceData = { ...paymentDetails, status: 'Pending', createdAt: serverTimestamp() };
//             const invoicesColRef = collection(db, 'users', currentUser.uid, 'invoices');
//             const newInvoiceRef = await addDoc(invoicesColRef, invoiceData);
//             await displayRazorpay(invoiceData, newInvoiceRef.id);
//         } catch (error) {
//             console.error("Error creating new invoice in Firestore:", error);
//             setPaymentStatus({ type: 'error', message: 'Failed to save invoice before payment.' });
//         } finally {
//             setIsProcessingPayment(false);
//         }
//     };

//     const handlePayExistingInvoice = async (invoiceToPay) => {
//         if (!currentUser) return;
//         setPayingInvoiceId(invoiceToPay.id);
//         try {
//             await displayRazorpay(invoiceToPay, invoiceToPay.id);
//         } catch (error) {
//             // Error is handled inside displayRazorpay
//         } finally {
//             setPayingInvoiceId(null);
//         }
//     };

//     return (
//         <section id="contact" ref={ref} className="bg-gray-900 pt-16 pb-10 px-4 overflow-x-hidden font-sans">
//             <div className="max-w-7xl mx-auto">
//                 <div className={`text-center mb-12 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
//                     <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-400">Let's Build Together</h2>
//                     <p className="text-gray-300 text-lg mt-4 max-w-3xl mx-auto">Ready to start your project, have a question, or need to make a payment? We're here to help.</p>
//                 </div>

//                 <div className="grid md:grid-cols-2 gap-10 items-start">
//                     <div className={`bg-gray-800/50 p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
//                         <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
//                         <div className="space-y-6">
//                             <div className="flex items-center gap-4 text-blue-400"><PhoneIcon className="h-5 w-5" /><p className="text-gray-200 text-lg">+91 98725 00160</p></div>
//                             <div className="flex items-center gap-4 text-blue-400"><EnvelopeIcon className="h-5 w-5" /><p className="text-gray-200 text-lg">contact@dashdrobe.in</p></div>
//                             <div className="flex items-start gap-4 text-blue-400"><MapMarkerIcon className="h-6 w-6 mt-1 flex-shrink-0" /><div><p className="text-gray-200 text-lg font-semibold">DashDrobe Technologies</p><p className="text-gray-300 text-lg">13531 St.No 15, Vishkarma Colony, Ludhiana, 141003</p></div></div>
//                         </div>
//                     </div>

//                     <div className={`bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700 transition-all duration-1000 ease-out delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
//                         <div className="flex border-b border-gray-600 mb-6">
//                             <button onClick={() => setActiveTab('message')} className={`py-2 px-4 text-lg font-semibold transition-colors ${activeTab === 'message' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400 hover:text-white'}`}>Send a Message</button>
//                             <button onClick={() => setActiveTab('payment')} className={`py-2 px-4 text-lg font-semibold transition-colors ${activeTab === 'payment' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400 hover:text-white'}`}>Pay an Invoice</button>
//                         </div>

//                         {activeTab === 'message' && (
//                             <form onSubmit={handleContactSubmit} className="space-y-5">
//                                 <div className="flex flex-col sm:flex-row gap-5">
//                                     <input type="text" name="firstName" placeholder="First Name" value={contactDetails.firstName} onChange={handleContactInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition" required />
//                                     <input type="text" name="lastName" placeholder="Last Name" value={contactDetails.lastName} onChange={handleContactInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition" required />
//                                 </div>
//                                 <input type="email" name="email" placeholder="Email Address" value={contactDetails.email} onChange={handleContactInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-blue-500 transition" required />
//                                 <textarea name="message" placeholder="Tell us about your project or question..." value={contactDetails.message} onChange={handleContactInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md h-32 focus:ring-2 focus:ring-blue-500 transition" required></textarea>
//                                 <FormStatusMessage status={messageStatus} />
//                                 <button type="submit" disabled={isSubmittingMessage} className="bg-blue-600 w-full flex justify-center items-center cursor-pointer text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold text-lg duration-300 transition-transform hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed">
//                                     {isSubmittingMessage ? <><Spinner /> Sending...</> : 'Submit Request'}
//                                 </button>
//                             </form>
//                         )}

//                         {activeTab === 'payment' && (
//                             <div>
//                                 {!currentUser ? (
//                                     <div className="text-center py-10">
//                                         <p className="text-gray-300 text-lg mb-4">Please log in to view invoices and make payments.</p>
//                                         <button onClick={() => openAuthModal('login')} className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 font-semibold">Login / Sign Up</button>
//                                     </div>
//                                 ) : (
//                                     <>
//                                         <div className="mb-8">
//                                             <h4 className="text-lg font-semibold text-gray-200 mb-4">Your Invoice History</h4>
//                                             <FormStatusMessage status={paymentStatus} />
//                                             {isLoadingInvoices ? (<p className="text-center text-gray-400">Loading invoices...</p>) :
//                                                 invoices.length > 0 ? (
//                                                     <div className="space-y-3 max-h-48 overflow-y-auto pr-2 border border-gray-600 rounded-md p-2">
//                                                         {invoices.map(invoice => (
//                                                             <div key={invoice.id} className="p-3 bg-gray-700/50 rounded-md border border-gray-600">
//                                                                 <div className="flex justify-between items-center">
//                                                                     <div>
//                                                                         <p className="font-semibold text-gray-100">Inv #{invoice.invoiceNumber}</p>
//                                                                         <p className="text-sm text-gray-400">{invoice.createdAt}</p>
//                                                                     </div>
//                                                                     <div className="text-right">
//                                                                         <p className="font-bold text-lg text-white">{invoice.currency} {invoice.amount}</p>
//                                                                         <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${invoice.status === 'Pending' ? 'bg-yellow-400/20 text-yellow-300' : 'bg-green-400/20 text-green-300'}`}>{invoice.status}</span>
//                                                                     </div>
//                                                                 </div>
//                                                                 {invoice.status === 'Pending' && (
//                                                                     <div className="text-right mt-2 pt-2 border-t border-gray-700">
//                                                                         <button
//                                                                             onClick={() => handlePayExistingInvoice(invoice)}
//                                                                             disabled={payingInvoiceId === invoice.id}
//                                                                             className="bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-md hover:bg-blue-700 disabled:bg-gray-500 flex items-center ml-auto"
//                                                                         >
//                                                                             {payingInvoiceId === invoice.id ? 'Processing...' : 'Pay Now'}
//                                                                         </button>
//                                                                     </div>
//                                                                 )}
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 ) : (<p className="text-center text-gray-400 p-4 border border-gray-600 rounded-md">You have no invoices.</p>)}
//                                         </div>
//                                         <form onSubmit={handlePayNewInvoice} className="space-y-5 border-t border-gray-600 pt-6">
//                                             <h4 className="text-lg font-semibold text-gray-200">Pay a New Invoice</h4>
//                                             <input type="text" name="name" placeholder="Full Name" value={paymentDetails.name} onChange={handlePaymentInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-purple-500 transition" required />
//                                             <input type="email" name="email" placeholder="Email Address" value={paymentDetails.email} onChange={handlePaymentInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-purple-500 transition" required />
//                                             <input type="tel" name="phone" placeholder="Phone Number" value={paymentDetails.phone} onChange={handlePaymentInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-purple-500 transition" required />
//                                             <input type="text" name="invoiceNumber" placeholder="Invoice Number" value={paymentDetails.invoiceNumber} onChange={handlePaymentInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-purple-500 transition" required />
//                                             <div className="flex gap-5">
//                                                 <div className="w-2/3"><input type="number" name="amount" placeholder="Amount" min="1" step="any" value={paymentDetails.amount} onChange={handlePaymentInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-purple-500 transition" required /></div>
//                                                 <div className="w-1/3"><select name="currency" value={paymentDetails.currency} onChange={handlePaymentInputChange} className="w-full bg-gray-700 text-white border-gray-600 p-3 rounded-md focus:ring-2 focus:ring-purple-500 transition h-full" required><option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option></select></div>
//                                             </div>
//                                             <button type="submit" disabled={isProcessingPayment} className="bg-purple-600 w-full flex justify-center items-center cursor-pointer text-white px-6 py-3 rounded-md hover:bg-purple-700 font-semibold text-lg duration-300 transition-transform hover:-translate-y-1 disabled:bg-gray-500 disabled:cursor-not-allowed">
//                                                 {isProcessingPayment ? <><Spinner /> Processing...</> : 'Proceed to Pay'}
//                                             </button>
//                                         </form>
//                                     </>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default ContactUs;