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