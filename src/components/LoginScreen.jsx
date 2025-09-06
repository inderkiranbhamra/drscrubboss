import React from 'react';

const LoginScreenStyles = () => (
    <style>{`
        :root {
            --primary-color: #2563EB; /* Blue color for buttons/accents */
            --text-dark: #1F2937; /* Dark text for headings */
            --text-light: #6B7280; /* Lighter text for labels/subheadings */
            --bg-light: #F9FAFB; /* Light background color for the page */
            --border-color: #D1D5DB; /* Border color for inputs */
        }

        /* Base styles for mobile-first approach */
        body {
            background-color: #fff; /* White background on mobile */
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .login-screen-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
        }

        .login-screen-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px 15px;
            background-color: #fff;
            position: relative;
            box-sizing: border-box;
        }

        .top-bar {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            width: 100%;
            position: absolute;
            top: 20px;
            left: 0;
            padding: 0 15px;
            box-sizing: border-box;
        }

        .customer-login-button {
            background: none;
            border: none;
            color: var(--text-dark);
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            padding: 8px 12px;
            border-radius: 8px;
        }

        .login-content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-top: 60px; /* Space for the top bar */
        }

        .logo-container {
            text-align: center;
            margin-bottom: 40px;
        }

        .logo-image {
            width: 100px;
            height: auto;
            display: block;
            margin: 0 auto 10px auto;
        }

        .logo-text {
            font-size: 28px;
            font-weight: 700;
            color: var(--text-dark);
            margin: 0;
        }

        .login-section-title {
            font-size: 22px;
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 8px;
            align-self: flex-start;
        }

        .login-instructions {
            font-size: 14px;
            color: var(--text-light);
            margin-bottom: 25px;
            align-self: flex-start;
        }

        .input-field {
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            border: 1px solid var(--border-color);
            border-radius: 25px;
            font-size: 16px;
            color: var(--text-dark);
            outline: none;
            box-sizing: border-box;
        }

        .input-field::placeholder {
            color: var(--text-light);
        }

        .login-button {
            width: 100%;
            padding: 15px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 25px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            margin-top: 15px;
            transition: background-color 0.2s ease;
            box-sizing: border-box;
        }

        .login-button:hover {
            background-color: #1D4ED8;
        }

        .footer-text {
            font-size: 11px;
            color: var(--text-light);
            text-align: center;
            line-height: 1.4;
            padding-bottom: 10px;
        }

        /* --- Responsive Styles for Tablets and Desktops --- */
        @media (min-width: 768px) {
            body {
                background-color: var(--bg-light); /* Light gray background on larger screens */
            }

            .login-screen-container {
                max-width: 420px; /* Constrain the width of the login form */
                min-height: auto; /* Height will be based on content */
                border-radius: 16px; /* Rounded corners for the card */
                box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08); /* A subtle shadow */
                padding: 40px 35px;
                margin: 20px; /* Add some space around the card */
                position: static; /* Reset positioning */
            }

            .top-bar {
                /* Reposition inside the card */
                position: static;
                padding: 0;
                margin-bottom: 20px;
            }

            .login-content {
                padding-top: 0; /* No longer need padding for the absolute top bar */
            }

            .footer-text {
                margin-top: 30px; /* Adjust margin for card layout */
            }
        }
    `}</style>
);

function LoginScreen({ onLogin }) {
    return (
        <>
            <LoginScreenStyles />
            {/* Added a wrapper for centering on desktop */}
            <div className="login-screen-wrapper">
                <div className="login-screen-container">
                    <div className="top-bar">
                        <button className="customer-login-button">Customer Login</button>
                    </div>

                    <div className="login-content">
                        <div className="logo-container">
                            <img src="logo.png" alt="Dr. Scrub Boss Logo" className="logo-image" />
                            <p className="logo-text">Dr. Scrub Boss</p>
                        </div>

                        <p className="login-section-title">Staff Login</p>
                        <p className="login-instructions">Enter Your Employee ID and Password</p>

                        <input type="text" placeholder="Employee ID" className="input-field" />
                        <input type="password" placeholder="Password" className="input-field" />

                        <button className="login-button" onClick={onLogin}>
                            Login
                        </button>
                    </div>

                    <p className="footer-text">
                        By Continuing you agree to our <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>Terms of service</a> and <a href="#" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>privacy policy</a> copyright 2025 Dr. Scrub Boss
                    </p>
                </div>
            </div>
        </>
    );
}

export default LoginScreen;