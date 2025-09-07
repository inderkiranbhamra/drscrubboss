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
            width: 80%;
            height: 80%;
            object-fit: contain;
        }

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
            box-shadow: 0 0px 0px rgba(0, 0, 0, 0);
            z-index: 100; 
            border-top: 1px solid #353535ff;
        }
        .bottom-nav button { 
            background: none; 
            border: none; 
            cursor: pointer; 
            display: flex; 
            flex-direction: column; 
            align-items: center; 
            justify-content: center; 
            color: #4A5568; 
            font-size: 24px; 
            height: 100%; 
            width: 25%; 
            position: relative; 
            padding-top: 5px; 
            font-family: 'Roboto', sans-serif;
        }
        .bottom-nav button span { 
            font-size: 12px; 
            margin-top: 4px; 
            font-weight: 500;
        }
        .bottom-nav button.active { 
            color: var(--primary-color); 
        }
        .bottom-nav button.active::after { 
            content: ''; 
            position: absolute; 
            bottom: 0; 
            left: 0; 
            width: 100%; 
            height: 3px; 
            background-color: var(--primary-color);
        }
    `}</style>
);

const SplashScreen = () => (
    <>
        <style>{`
            .splash-screen-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                width: 100vw;
                background-color: #fff;
                position: fixed;
                top: 0;
                left: 0;
                z-index: 9999;
                text-align: center;
                font-family: 'Roboto', sans-serif;
            }

            .splash-main-content {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 20px;
            }

            .splash-logo {
                width: 150px; 
                height: auto;
                margin-bottom: 24px;
            }

            .splash-title {
                font-size: 2.25rem;
                font-weight: 700;
                margin: 0 0 24px 0;
                color: #212529; 
            }

            .splash-title .red-text {
                color: #dc3545; 
            }

            .dot-loader {
                display: flex;
            }

            .dot-loader div {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #dc3545;
                margin: 0 6px;
                animation: dot-pulse 1.4s infinite ease-in-out both;
            }

            .dot-loader div:nth-child(1) {
                animation-delay: -0.32s;
            }

            .dot-loader div:nth-child(2) {
                animation-delay: -0.16s;
            }

            @keyframes dot-pulse {
                0%, 80%, 100% {
                    transform: scale(0);
                }
                40% {
                    transform: scale(1.0);
                }
            }

            .splash-footer {
                width: 100%;
                padding: 20px 0;
                font-weight: 700; 
                font-size: 1rem;
                color: #212529;
            }
        `}</style>

        <div className="splash-screen-container">
            <div className="splash-main-content">
                <img src="logo.png" alt="Dr. Scrub Boss Logo" className="splash-logo" />
                <h1 className="splash-title">
                    Dr. Scrub <span className="red-text">Boss</span>
                </h1>
                <div className="dot-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <br></br>
                <br></br>

            </div>
            <div className="splash-footer">
                Your Trusted Car Service Awaits! 🤝
            </div>
            <br></br>
            <br></br>
            <br></br>
        </div>
    </>
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