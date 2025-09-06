import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'; // <-- Import useAuth
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../firebase'; // <-- Import db
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // <-- Import firestore functions
import { FaTrash } from 'react-icons/fa';

// Helper to load the Razorpay script
const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const Spinner = () => (<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>);

const parsePrice = (pricingString) => {
    if (!pricingString) return 0;
    const stringWithoutCommas = pricingString.replace(/,/g, '');
    const match = stringWithoutCommas.match(/(\d+)/);
    return match ? parseInt(match[0], 10) : 0;
};

const CartScreen = ({ openAuthModal }) => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { currentUser } = useAuth(); // Get current user
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    const totalAmount = cartItems.reduce((sum, item) => sum + parsePrice(item.pricing), 0);

    const handleProceedToPay = async () => {
        if (!currentUser) {
            alert("Please log in or sign up to proceed with the payment.");
            openAuthModal('login');
            return;
        }

        setIsProcessing(true);

        try {
            // Step 1: Create a "Pending" order in Firestore
            const ordersColRef = collection(db, 'users', currentUser.uid, 'orders');
            const newOrderRef = await addDoc(ordersColRef, {
                userId: currentUser.uid,
                items: cartItems,
                total: totalAmount,
                status: 'Pending',
                currency: 'INR',
                createdAt: serverTimestamp(),
                orderNumber: `ORD-${Date.now()}`
            });

            // Step 2: Create a Razorpay order via your backend
            const response = await fetch('https://nexgencred-backend.vercel.app/create-razorpay-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: totalAmount,
                    currency: 'INR',
                    user_id: currentUser.uid,
                    firestore_id: newOrderRef.id, // The ID from the new Firestore document
                    type: 'product_order' // <-- Specify the type for the webhook
                }),
            });

            if (!response.ok) {
                throw new Error((await response.json()).message || 'Failed to create payment order.');
            }
            const order = await response.json();

            // Step 3: Open Razorpay Checkout
            const options = {
                key: "rzp_live_VpmCGDKKSriQKK", // Your Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: "NexGenCred",
                description: "Product Purchase",
                order_id: order.id,
                handler: function (response) {
                    alert("Payment successful! You will receive a confirmation email shortly.");
                    clearCart();
                    navigate('/profile'); // Navigate to profile to see the new order
                },
                prefill: {
                    name: currentUser.displayName || '',
                    email: currentUser.email || '',
                    contact: currentUser.phoneNumber || '',
                },
                theme: { color: "#1656A0" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment Error:", error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen pt-28 pb-12 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Your Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-lg">Your cart is currently empty.</p>
                        <Link to="/#regional-solutions" className="mt-4 inline-block bg-[#1656A0] text-white px-6 py-2 rounded-lg hover:bg-[#114683] transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div>
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b">
                                <div>
                                    <h2 className="text-lg md:text-xl font-semibold text-gray-700">{item.name}</h2>
                                    <p className="text-sm text-gray-500">{item.pricing}</p>
                                </div>
                                <div className='flex items-center gap-4'>
                                    <p className="text-lg font-bold text-[#1656A0]">₹{parsePrice(item.pricing).toFixed(2)}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors" title={`Remove ${item.name}`} aria-label={`Remove ${item.name}`}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="text-right mt-6">
                            <h3 className="text-2xl font-bold">Total: ₹{totalAmount.toFixed(2)}</h3>
                        </div>
                        
                        <div className="mt-8 border-t pt-6 text-center">
                            {totalAmount > 0 && (
                                <button onClick={handleProceedToPay} disabled={isProcessing} className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto flex justify-center items-center disabled:bg-gray-400">
                                    {isProcessing ? <><Spinner /> Processing...</> : 'Proceed to Pay'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartScreen;