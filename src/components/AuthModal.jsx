// src/components/AuthModal.js

import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInAnonymously, // Import signInAnonymously
} from 'firebase/auth';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaTimes, FaUserSecret } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

// --- API Configuration ---
const API_KEY = "YjdlOVhiUHlzbEJxQ0xWTkdiZjVQbkxyZTM1N1diZVZSb0lkMkp3bA==";
const API_HEADERS = new Headers();
API_HEADERS.append("X-CSCAPI-KEY", API_KEY);
const API_REQUEST_OPTIONS = {
  method: 'GET',
  headers: API_HEADERS,
  redirect: 'follow'
};

const AuthModal = ({ setShowModal, initialMode = 'login' }) => {
  const [step, setStep] = useState('auth');
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // --- Location API State ---
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');

  // User details state
  const [uid, setUid] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- useEffect Hooks for API calls ---
  useEffect(() => {
    const getCountries = async () => {
      try {
        const response = await fetch("https://api.countrystatecity.in/v1/countries", API_REQUEST_OPTIONS);
        const result = await response.json();
        setCountries(result);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;
    const getStates = async () => {
      try {
        const response = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, API_REQUEST_OPTIONS);
        const result = await response.json();
        setStates(result);
        setCities([]);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    getStates();
  }, [selectedCountry]);

  useEffect(() => {
    if (!selectedCountry || !selectedState) return;
    const getCities = async () => {
      try {
        const response = await fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states/${selectedState}/cities`, API_REQUEST_OPTIONS);
        const result = await response.json();
        setCities(result);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    getCities();
  }, [selectedCountry, selectedState]);

  const clearMessages = () => { setError(''); setNotification(''); };
  useEffect(() => { setIsVisible(true); }, []);
  const handleClose = () => { setIsVisible(false); setTimeout(() => setShowModal(false), 300); };

  const handleCountryChange = (e) => {
    const [iso2, name] = e.target.value.split('|');
    setSelectedCountry(iso2);
    setCountry(name);
    setState('');
    setCity('');
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    const [iso2, name] = e.target.value.split('|');
    setSelectedState(iso2);
    setState(name);
    setCity('');
    setCities([]);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    clearMessages();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        handleClose();
      } else {
        setUid(user.uid);
        setName(user.displayName || '');
        setEmail(user.email || '');
        setStep('details');
      }
    } catch (err) {
      console.error("Google Sign-In Error:", err);
      setError("Could not sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- NEW: Handler for Anonymous Sign-In ---
  const handleAnonymousSignIn = async () => {
    setLoading(true);
    clearMessages();
    try {
      const userCredential = await signInAnonymously(auth);
      const user = userCredential.user;
      setUid(user.uid);
      setName('Guest User'); // Default name
      setEmail(''); // No email for anonymous users initially
      setStep('details');
    } catch (err) {
      console.error("Anonymous Sign-In Error:", err);
      setError("Could not sign in as a guest. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      setError("User ID is missing. Cannot save profile.");
      return;
    }
    setLoading(true);
    clearMessages();
    try {
      // The current signed-in user object has the 'isAnonymous' flag
      const isGuest = auth.currentUser?.isAnonymous || false;
      await setDoc(doc(db, "users", uid), {
        uid, name, email, phone, address, city, state, country,
        isAnonymous: isGuest, // Save the anonymous status
        createdAt: new Date()
      });

      // Show a special message for new guest users
      if (isGuest) {
        alert("You are now logged in as a guest!\n\nTo save your data and log in on other devices, please go to your Profile and link your account to an email or Google account.");
      }

      handleClose();
    } catch (err) {
      console.error("Profile Save Error:", err);
      setError("Failed to save your details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuthAction = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearMessages();
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        handleClose();
      } catch (err) {
        setError("Invalid email or password. Please try again.");
      } finally {
        setLoading(false);
      }
    } else { // Sign Up Logic
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), {
          uid: userCredential.user.uid, name, email, phone, address, city, state, country,
          isAnonymous: false, // Explicitly set to false for email sign-up
          createdAt: new Date()
        });
        handleClose();
      } catch (err) {
        setError(err.code === 'auth/email-already-in-use' ? "This email address is already in use." : "Failed to create an account.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      clearMessages();
      setError("Please enter your email address to reset your password.");
      return;
    }
    setLoading(true);
    clearMessages();
    try {
      await sendPasswordResetEmail(auth, email);
      setNotification("A password reset link has been sent to your email address.");
    } catch (err) {
      setError("Could not send reset email. Please check the address and try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderLocationFields = () => (
    <>
      <select value={selectedCountry ? `${selectedCountry}|${country}` : ''} onChange={handleCountryChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]">
        <option value="" disabled>Select Country</option>
        {countries.map(c => <option key={c.iso2} value={`${c.iso2}|${c.name}`}>{c.name}</option>)}
      </select>
      <select value={selectedState ? `${selectedState}|${state}` : ''} onChange={handleStateChange} required disabled={!selectedCountry} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0] disabled:bg-gray-100">
        <option value="" disabled>Select State</option>
        {states.map(s => <option key={s.iso2} value={`${s.iso2}|${s.name}`}>{s.name}</option>)}
      </select>
      <select value={city} onChange={(e) => setCity(e.target.value)} required disabled={!selectedState} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0] disabled:bg-gray-100">
        <option value="" disabled>Select City</option>
        {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>
    </>
  );

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-60 z-[1100] flex justify-center items-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto transition-all duration-300 ease-out ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors" aria-label="Close modal"><FaTimes size={20} /></button>

        {step === 'auth' && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{isLogin ? 'Welcome Back' : 'Create an Account'}</h2>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</p>}
            {notification && <p className="bg-blue-100 text-blue-700 p-3 rounded mb-4 text-sm text-center">{notification}</p>}

            {!isLogin && (
              <form onSubmit={handleEmailAuthAction} className="space-y-4">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                {renderLocationFields()}
                <button type="submit" className="w-full bg-[#1656A0] text-white py-2.5 rounded-lg hover:bg-[#114683] transition-colors disabled:bg-gray-400" disabled={loading}>{loading ? 'Processing...' : 'Create Account'}</button>
              </form>
            )}

            {isLogin && (
              <form onSubmit={handleEmailAuthAction} className="space-y-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                <div>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
                  <div className="text-right mt-2"><button type="button" onClick={handleForgotPassword} className="text-sm text-blue-600 hover:underline font-medium">Forgot Password?</button></div>
                </div>
                <button type="submit" className="w-full bg-[#1656A0] text-white py-2.5 rounded-lg hover:bg-[#114683] transition-colors disabled:bg-gray-400" disabled={loading}>{loading ? 'Processing...' : 'Login'}</button>
              </form>
            )}

            <div className="flex items-center my-4"><div className="flex-grow border-t border-gray-300"></div><span className="flex-shrink mx-4 text-gray-400 text-sm">OR</span><div className="flex-grow border-t border-gray-300"></div></div>
            <button type="button" onClick={handleGoogleSignIn} className="w-full flex justify-center items-center gap-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-200" disabled={loading}><FcGoogle size={22} /><span className="font-medium text-gray-700">Continue with Google</span></button>

            {/* Show Guest option only in Sign Up mode */}
            {!isLogin && (
              <button type="button" onClick={handleAnonymousSignIn} className="mt-3 w-full flex justify-center items-center gap-3 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:bg-gray-200" disabled={loading}>
                <FaUserSecret size={20} className="text-gray-600" />
                <span className="font-medium text-gray-700">Continue as Guest</span>
              </button>
            )}

            <div className="text-center mt-6"><button onClick={() => { setIsLogin(!isLogin); clearMessages(); }} className="text-sm text-[#1656A0] hover:underline" disabled={loading}>{isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}</button></div>
          </>
        )}

        {step === 'details' && (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Complete Your Profile</h2>
            <p className="text-center text-gray-600 mb-6 -mt-4 text-sm">Just a few more details to get you started.</p>
            {error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm text-center">{error}</p>}
            <form onSubmit={handleDetailsSubmit} className="space-y-4">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
              {/* Email is optional for guests, disabled if from Google */}
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address (Optional)" disabled={!!email} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0] disabled:bg-gray-100" />
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1656A0]" />
              {renderLocationFields()}
              <button type="submit" className="w-full bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400" disabled={loading}>{loading ? 'Saving...' : 'Save & Continue'}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;