import React, { useState, useEffect } from 'react';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import JobScreen from './components/JobScreen';
import EarningsScreen from './components/EarningsScreen';
import ProfileScreen from './components/ProfileScreen';

// --- Final Icon Imports ---
import { GoHome, GoHomeFill } from "react-icons/go";
import { IoNewspaperOutline, IoNewspaper } from "react-icons/io5";
import { RiHandCoinLine, RiHandCoinFill } from "react-icons/ri";
import { BsPerson, BsPersonFill } from 'react-icons/bs';

const AppStyles = () => (
    <style>{`
        /* General App Styles */
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        :root {
            --primary-color: #2159e8;
            --text-dark: #212529;
            --text-light: #6c757d;
            --border-color: #dee2e6;
            --background-light: #f4f5f9;
            --success-color: #28a745;
            --danger-color: #dc3545;
        }

        body {
            margin: 0;
            font-family: 'Roboto', sans-serif;
            background-color: var(--background-light);
            color: var(--text-dark);
        }

        .app-container {
            max-width: 420px;
            margin: auto;
            background-color: var(--background-light);
            min-height: 100vh;
            position: relative;
        }

        .screen-container {
            padding: 20px 15px;
        }

        .splash-screen {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            width: 100vw;
            background-color: #fff;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 9999;
        }
        .splash-screen img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        /* --- EDITED: Bottom Navigation Bar Styles --- */
        .bottom-nav { 
            position: fixed; 
            bottom: 0; 
            left: 50%; 
            transform: translateX(-50%); 
            width: 100%; 
            max-width: 420px; 
            height: 65px; 
            background-color: #fff; 
            display: flex; 
            justify-content: space-around; 
            align-items: center; 
            box-shadow: 0 -1px 5px rgba(0,0,0,0.08);
            z-index: 100; 
            border-top: 1px solid #f0f0f0;
        }
        .bottom-nav button { 
            background: none; 
            border: none; 
            cursor: pointer; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            color: #4A5568; /* Darker gray for inactive text/icons */
            font-size: 24px; 
            height: 100%; 
            width: 25%; 
            position: relative; 
            padding-top: 5px; 
            font-family: 'Roboto', sans-serif;
        }
        .bottom-nav button span { 
            font-size: 12px; /* Adjusted font size */
            margin-top: 4px; 
            font-weight: 500;
        }
        .bottom-nav button.active { 
            color: var(--primary-color); 
        }
        .bottom-nav button.active::after { 
            content: ''; 
            position: absolute; 
            bottom: 0; /* Position at the very bottom */
            left: 0; /* Align to the left edge of the button */
            width: 100%; /* Span the full button width */
            height: 3px; 
            background-color: var(--primary-color);
        }
    `}</style>
);

const SplashScreen = () => (
    <div className="splash-screen">
        <img src="splash.jpg" alt="Loading..." />
    </div>
);

const BottomNavBar = ({ activeScreen, setActiveScreen }) => (
    <nav className="bottom-nav">
        <button onClick={() => setActiveScreen('home')} className={activeScreen === 'home' ? 'active' : ''}>
            {activeScreen === 'home' ? <GoHomeFill /> : <GoHome />}
            <span>Home</span>
        </button>
        <button onClick={() => setActiveScreen('jobs')} className={activeScreen === 'jobs' ? 'active' : ''}>
            {activeScreen === 'jobs' ? <IoNewspaper /> : <IoNewspaperOutline />}
            <span>My Jobs</span>
        </button>
        <button onClick={() => setActiveScreen('earnings')} className={activeScreen === 'earnings' ? 'active' : ''}>
            {activeScreen === 'earnings' ? <RiHandCoinFill /> : <RiHandCoinLine />}
            <span>Earnings</span>
        </button>
        <button onClick={() => setActiveScreen('profile')} className={activeScreen === 'profile' ? 'active' : ''}>
            {activeScreen === 'profile' ? <BsPersonFill /> : <BsPerson />}
            <span>Profile</span>
        </button>
    </nav>
);

function App() {
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [activeScreen, setActiveScreen] = useState('home');

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    const handleLogin = () => setLoggedIn(true);

    const renderScreen = () => {
        switch (activeScreen) {
            case 'home': return <HomeScreen />;
            case 'jobs': return <JobScreen />;
            case 'earnings': return <EarningsScreen />;
            case 'profile': return <ProfileScreen />;
            default: return <HomeScreen />;
        }
    };
    
    return (
        <>
            <AppStyles />
            {loading ? <SplashScreen /> : !loggedIn ? (
                <LoginScreen onLogin={handleLogin} />
            ) : (
                <div className="app-container">
                    <div className="content">{renderScreen()}</div>
                    <BottomNavBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
                </div>
            )}
        </>
    );
}

export default App;

// import React from 'react';

// // --- Maintenance Page Component ---
// // This component contains the visual layout for the maintenance notice.
// const MaintenancePage = () => {
//   return (
//     // Main container to center the content on the screen
//     <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans">
//       <div className="bg-white p-8 sm:p-12 rounded-xl shadow-lg text-center max-w-lg mx-4">

//         {/* Animated Gear Icon using SVG */}
//         <div className="flex justify-center mb-6">
//           <svg
//             className="w-20 h-20 text-gray-400 animate-spin"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="1.5"
//               d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//             />
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="1.5"
//               d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//           </svg>
//         </div>

//         {/* Main Heading */}
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
//           Under Maintenance
//         </h1>

//         {/* Informative Message */}
//         <p className="text-gray-600 text-lg mb-6">
//           We're currently performing scheduled maintenance to improve our services. We apologize for any inconvenience and will be back online shortly.
//         </p>

//         {/* Thank You Note */}
//         <p className="text-gray-700 font-semibold mb-8">
//           Thank you for your patience!
//         </p>

//         {/* Optional Contact Information */}
//         <div className="border-t pt-6">
//           <p className="text-sm text-gray-500">
//             For urgent inquiries, please contact us at:
//             <a href="mailto:info@nexgencred.com" className="text-blue-600 hover:underline ml-1">
//               info@nexgencred.com
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };


// // --- Main App Component ---
// // This now only renders the MaintenancePage component, replacing all previous routes.
// function App() {
//   return (
//     <MaintenancePage />
//   );
// }

// export default App;

// import React, { useState, useLayoutEffect, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';

// // CONTEXT PROVIDERS
// import { AuthProvider } from './contexts/AuthContext';
// import { CartProvider } from './contexts/CartContext';

// // YOUR PAGE COMPONENTS
// import Navbar from './components/NavBar';
// import HeroSection from './components/HeroSection';
// import AboutUs from './components/AboutUs';
// import HowItWorks from './components/HowItWorks';
// import RegionalSolutions from './components/RegionalSolutions';
// import ContactUs from './components/ContactUs';
// import Footer from './components/Footer';

// // NEW & DYNAMIC COMPONENTS
// import AuthModal from './components/AuthModal';
// import CartScreen from './components/CartScreen';
// import ProfileScreen from './components/ProfileScreen';

// // --- Helper component to scroll to top on page change ---
// const ScrollToTopWrapper = ({ children }) => {
//     const location = useLocation();
//     useLayoutEffect(() => {
//         document.documentElement.scrollTo(0, 0);
//     }, [location.pathname]);
//     return children;
// };

// // --- Component for the main page content ---
// const HomePage = ({ openAuthModal }) => (
//     <div className="pt-1">
//         <section id="home"><HeroSection /></section>
//         <section id="about"><AboutUs /></section>
//         <section id="regional-solutions"><RegionalSolutions openAuthModal={openAuthModal} /></section>
//         <section id="process"><HowItWorks /></section>
//         <section id="contact">
//             <ContactUs openAuthModal={openAuthModal} />
//             <Footer />
//         </section>
//     </div>
// );

// // --- 404 Not Found Page (Unchanged) ---
// const NotFoundPage = () => (
//     <>
//         <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-white">
//             <div className="pt-20 pb-10">
//                 <h1 className="text-8xl font-extrabold text-[#1656a0] mb-4">404</h1>
//                 <h2 className="text-4xl font-bold text-gray-800 mb-3">Page Not Found</h2>
//                 <p className="text-lg text-gray-600 mb-8 max-w-md">
//                     Oops! The page you are looking for does not exist. It might have been moved or deleted.
//                 </p>
//                 <Link
//                     to="/"
//                     className="px-8 py-3 bg-[#1656a0] text-white font-semibold rounded-lg shadow-md hover:bg-[#114683] transition-all duration-300"
//                 >
//                     Go Back to Homepage
//                 </Link>
//             </div>
//         </div>
//         <Footer />
//     </>
// );


// // --- Reusable UI component for a section within a policy page ---
// const PolicySection = ({ title, children }) => (
//     <div className="p-8 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
//         <h2 className="text-2xl font-bold text-[#1656A0] mb-4">{title}</h2>
//         <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
//             {children}
//         </div>
//     </div>
// );


// // --- IMPROVED UI: Privacy Policy Page with ORIGINAL TEXT ---
// const PrivacyPolicy = () => (
//     <>
//         <div className="bg-gray-50 py-28 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//                         Privacy Policy
//                     </h1>
//                     <p className="mt-4 text-lg text-gray-600">Last updated: September 5, 2025</p>
//                 </div>
//                 <div className="space-y-10">
//                     <PolicySection title="Introduction and scope">
//                         <p>This Privacy Policy explains how Varsha Enterprises (“we”, “us”, “our”) collects, uses, shares, stores, and protects personal information when individuals access the website, create an account, interact with customer support, or use services and platforms provided by Varsha Enterprises.</p>
//                         <p>This Policy applies globally to visitors, registered users, client representatives, vendors, prospects, and other individuals whose data may be processed in connection with our services.</p>
//                         <p>For client-uploaded datasets processed in our platform or tools, we act as a data processor; for our website, accounts, marketing, and vendor management, we act as a data controller.</p>
//                     </PolicySection>
//                     <PolicySection title="Controller and contact">
//                         <ul className="list-disc list-inside">
//                             <li>Data controller: Varsha Enterprises.</li>
//                             <li>Address: The Circle Work, Huda City Centre Metro Station, Gurugram, Haryana 122002, India.</li>
//                             <li>Privacy contact: info@nexgencred.com | +91 9818867336.</li>
//                             <li>If required by law, details of an EU/UK representative and/or a Data Protection Officer (DPO) will be provided upon request.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Personal data we collect">
//                         <ul className="list-disc list-inside">
//                             <li>Identity and contact data: name, company/organization, role/title, email address, phone number, postal/billing address.</li>
//                             <li>Account and usage data: usernames, roles, preferences, activity logs, IP address, device/browser information, session identifiers, analytics events, cookies and similar technologies.</li>
//                             <li>Service and transactional data: inquiries, support tickets, order or subscription metadata, billing events, notifications, communication preferences, workflow artifacts, and audit trails.</li>
//                             <li>Compliance and verification data (where applicable): Know-Your-Customer (KYC), Anti-Money Laundering (AML), sanctions screening results, and supporting documents required by law or to enable payments/disbursements.</li>
//                             <li>Vendor and partner data: contact details, contracts, performance and compliance records for suppliers and subprocessors.</li>
//                             <li>Public/third-party sources: data from service providers (hosting, communications, analytics, payments, identity verification), public records (such as corporate registries and court records), and referrals consistent with applicable laws.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="How we use personal data">
//                         <ul className="list-disc list-inside">
//                             <li>Service delivery and operations: provide, operate, and secure our website, platform, and services; authenticate users; maintain availability and performance; provide customer support.</li>
//                             <li>Product improvement and analytics: conduct troubleshooting, usage analysis, and aggregated or de-identified analytics to enhance features and user experience.</li>
//                             <li>Communications and marketing: send service notices, administrative messages, security alerts; send marketing communications where permitted or with consent and provide opt-out mechanisms.</li>
//                             <li>Compliance and risk management: comply with applicable laws and regulations (including India’s Digital Personal Data Protection Act, GDPR/UK GDPR where applicable), bookkeeping and tax, AML/KYC where relevant, and respond to lawful requests and legal processes.</li>
//                             <li>Safety and fraud prevention: protect our rights, users, vendors, and the public; detect, prevent, and investigate security incidents, fraud, or abuse.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Legal bases for processing (where applicable)">
//                          <ul className="list-disc list-inside">
//                             <li>Contract performance: to create and administer accounts and deliver requested services.</li>
//                             <li>Legitimate interests: to secure our systems and services, prevent fraud, understand and improve service use, and manage business operations balanced against individual rights.</li>
//                             <li>Consent: for certain marketing communications and non-essential cookies or similar technologies.</li>
//                             <li>Legal obligations: for AML/KYC, tax, bookkeeping, statutory retention, and compliance with lawful requests.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Contact">
//                         <p>Varsha Enterprises, The Circle Work, Huda City Centre Metro Station, Gurugram, Haryana 122002, India.</p>
//                         <p>info@nexgencred.com | +91 9818867336.</p>
//                     </PolicySection>
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </>
// );

// // --- IMPROVED UI: Terms & Conditions Page with ORIGINAL TEXT ---
// const TermsAndConditions = () => (
//     <>
//         <div className="bg-gray-50 py-28 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                  <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//                         Terms & Conditions
//                     </h1>
//                     <p className="mt-4 text-lg text-gray-600">Effective from: September 5, 2025</p>
//                 </div>
//                 <div className="space-y-10">
//                     <PolicySection title="Acceptance of terms">
//                         <p>By accessing the website or using services offered by Varsha Enterprises, the user agrees to these Terms & Conditions. If acting on behalf of an organization, the user represents they have authority to bind that entity.</p>
//                     </PolicySection>
//                     <PolicySection title="Services">
//                         <p>Varsha Enterprises provides a website and, where applicable, software-as-a-service (SaaS) tools and professional services supporting workflows for finance/recovery operations, analytics, and communications.</p>
//                         <p>No guarantee is made regarding specific financial outcomes, approvals, or recovery results unless expressly stated in a separate executed agreement.</p>
//                     </PolicySection>
//                     <PolicySection title="Accounts and security">
//                         <p>Users must provide accurate information and keep credentials confidential. Users are responsible for activity under their accounts and must promptly notify of any suspected unauthorized access.</p>
//                         <p>We may require multi-factor authentication and other security controls.</p>
//                     </PolicySection>
//                     <PolicySection title="Acceptable use">
//                         <ul className="list-disc list-inside">
//                             <li>Users shall not engage in unlawful activity; harass or infringe others’ rights; upload harmful code; scrape or extract data beyond permitted interfaces; reverse engineer or interfere with service operations; or use the services for spam or illegal communications.</li>
//                             <li>Where applicable, users must comply with relevant laws, including consumer protection, debt collection, telemarketing, sanctions/AML, and privacy regulations.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Limitation of liability">
//                          <ul className="list-disc list-inside">
//                             <li>To the maximum extent permitted by law, Varsha Enterprises is not liable for indirect, incidental, consequential, special, punitive, or exemplary damages.</li>
//                             <li>Our total aggregate liability arising out of or related to the services is limited to the fees paid for the services giving rise to the claim in the twelve (12) months preceding the event, subject to mandatory legal rights and any negotiated carve-outs in a signed agreement.</li>
//                         </ul>
//                     </PolicySection>
//                      <PolicySection title="Governing law and dispute resolution">
//                         <ul className="list-disc list-inside">
//                             <li>Governing law: Laws of India. Venue: courts located in Gurugram, Haryana (or insert preferred jurisdiction within India).</li>
//                             <li>For certain plans, the parties may agree to binding arbitration and a class action waiver if permitted by law, as defined in an executed agreement.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Contact">
//                         <p>Varsha Enterprises, The Circle Work, Huda City Centre Metro Station, Gurugram, Haryana 122002, India.</p>
//                         <p>info@nexgencred.com | +91 9818867336.</p>
//                     </PolicySection>
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </>
// );

// // --- IMPROVED UI: Refund Policy Page with ORIGINAL TEXT ---
// const RefundPolicy = () => (
//     <>
//         <div className="bg-gray-50 py-28 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                  <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//                         Refund Policy
//                     </h1>
//                     <p className="mt-4 text-lg text-gray-600">Last updated: September 5, 2025</p>
//                 </div>
//                 <div className="space-y-10">
//                     <PolicySection title="Scope">
//                         <p>This Refund Policy applies to subscriptions, one-time services, training/events (if any), and any credits or refunds issued by Varsha Enterprises.</p>
//                     </PolicySection>
//                     <PolicySection title="Subscriptions">
//                         <ul className="list-disc list-inside">
//                             <li>Subscription fees are billed in advance and are generally non-refundable.</li>
//                             <li>Cancellations take effect at the end of the current billing term; future billing stops upon cancellation.</li>
//                             <li>If a free trial or promotional offer applies, charges begin upon conversion to a paid plan as stated in the order.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Billing errors and overcharges">
//                         <ul className="list-disc list-inside">
//                             <li>Billing discrepancies must be reported within thirty (30) days of the invoice date.</li>
//                             <li>Upon validation, a credit will be applied to the next invoice or a refund will be issued to the original payment method within standard banking timelines.</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="Refund method and timing">
//                         <ul className="list-disc list-inside">
//                             <li>Approved refunds are issued to the original payment instrument.</li>
//                             <li>Processing timelines vary by bank or card network; a confirmation will be provided upon issuance.</li>
//                             <li>Refund will credited to your original payment method with in 7 to 15 days</li>
//                         </ul>
//                     </PolicySection>
//                     <PolicySection title="How to request a refund">
//                         <ul className="list-disc list-inside">
//                             <li>Contact: info@nexgencred.com with the account email, invoice number, amount in dispute, and reason for the request.</li>
//                             <li>We may request additional information to verify identity and evaluate the claim.</li>
//                         </ul>
//                     </PolicySection>
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </>
// );

// // --- IMPROVED UI: Cancellation & Shipping Policy Page with ORIGINAL TEXT ---
// const CancellationPolicy = () => (
//     <>
//         <div className="bg-gray-50 py-28 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 <div className="text-center mb-16">
//                     <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
//                         Cancellation & Shipping Policy
//                     </h1>
//                     <p className="mt-4 text-lg text-gray-600">Last updated: September 5, 2025</p>
//                 </div>
//                 <div className="space-y-10">
//                     <PolicySection title="Cancellation Policy">
//                         <h3 className="text-xl !font-semibold !mt-6 !mb-3 !text-gray-800">Scope</h3>
//                         <p>This Cancellation Policy applies to subscriptions and one-time services purchased from Varsha Enterprises for access to online dashboard products.</p>

//                         <h3 className="text-xl !font-semibold !mt-6 !mb-3 !text-gray-800">How to cancel</h3>
//                         <p>Account owners or authorized admins can cancel at any time from within the billing portal or by emailing info@nexgencred.com from the registered email with the subject “Cancellation Request,” including company name, plan, and next renewal date.</p>

//                         <h3 className="text-xl !font-semibold !mt-6 !mb-3 !text-gray-800">Data access after cancellation</h3>
//                         <p>Following term end, accounts move to suspended status. A standard 30-day data access window is provided for export upon written request by the account owner; extended archival or export assistance may be available under a separate fee. After the access window, data may be deleted or anonymized per retention schedules.</p>
//                     </PolicySection>

//                     <PolicySection title="Shipping Policy (Digital Delivery)">
//                         <h3 className="text-xl !font-semibold !mt-6 !mb-3 !text-gray-800">Nature of products</h3>
//                         <p>All products are digital software services delivered online. No physical goods are shipped. “Shipping” refers to provisioning of accounts, delivery of login credentials, and digital documentation.</p>

//                         <h3 className="text-xl !font-semibold !mt-6 !mb-3 !text-gray-800">Order processing time</h3>
//                         <p>Self-serve plans are provisioned automatically upon successful payment, typically within minutes. For invoiced or enterprise orders, provisioning occurs within 1–3 business days after receipt of payment and any required onboarding information.</p>

//                         <h3 className="text-xl !font-semibold !mt-6 !mb-3 !text-gray-800">Delivery method</h3>
//                         <p>Users receive an email to the registered address with activation instructions, login URL, and any applicable credentials or SSO setup steps. Existing accounts are upgraded in-app and confirmed by email.</p>
//                     </PolicySection>

//                     <PolicySection title="Contact">
//                         <p>Email: info@nexgencred.com. Phone: +91 9818867336. Postal: Varsha Enterprises, The Circle Work, Huda City Centre Metro Station, Gurugram, Haryana 122002, India.</p>
//                     </PolicySection>
//                 </div>
//             </div>
//         </div>
//         <Footer />
//     </>
// );

// // --- Admin Panel Redirect (Unchanged) ---
// const AdminPanelRedirect = () => {
//     useEffect(() => {
//         window.location.href = '/admin-panel/index.html';
//     }, []);
//     return <div>Loading Admin Panel...</div>;
// };


// // --- Main App Component (Unchanged Logic) ---
// function App() {
//     const [authModalConfig, setAuthModalConfig] = useState({
//         isOpen: false,
//         initialMode: 'login',
//     });

//     const openAuthModal = (mode = 'login') => {
//         setAuthModalConfig({ isOpen: true, initialMode: mode });
//     };

//     const closeAuthModal = () => {
//         setAuthModalConfig({ isOpen: false, initialMode: 'login' });
//     };

//     return (
//         <AuthProvider>
//             <CartProvider>
//                 <BrowserRouter>
//                     <ScrollToTopWrapper>
//                         {authModalConfig.isOpen && (
//                             <AuthModal
//                                 setShowModal={closeAuthModal}
//                                 initialMode={authModalConfig.initialMode}
//                             />
//                         )}
//                         <Navbar openAuthModal={openAuthModal} />
//                         <Routes>
//                             <Route path="/" element={<HomePage openAuthModal={openAuthModal} />} />
//                             <Route path="/cart" element={<CartScreen />} />
//                             <Route path="/profile" element={<ProfileScreen />} />
//                             <Route path="/privacy" element={<PrivacyPolicy />} />
//                             <Route path="/terms" element={<TermsAndConditions />} />
//                             <Route path="/refundpolicy" element={<RefundPolicy />} />
//                             <Route path="/cancellationpolicy" element={<CancellationPolicy />} />
//                             <Route path="/admin-panel" element={<AdminPanelRedirect />} />
//                             <Route path="*" element={<NotFoundPage />} />
//                         </Routes>
//                     </ScrollToTopWrapper>
//                 </BrowserRouter>
//             </CartProvider>
//         </AuthProvider>
//     );
// }

// export default App;