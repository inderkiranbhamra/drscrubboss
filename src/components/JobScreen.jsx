import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const JobScreenStyles = () => (
    <style>{`
        :root {
            --primary-color: #2563EB;
            --text-dark: #1F2937;
            --text-light: #6B7280;
            --border-light: #E5E7EB;
            --bg-light: #F3F4F6;
        }

        body {
            background-color: var(--bg-light);
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .job-screen-container {
            padding: 0;
            background-color: var(--bg-light);
            min-height: 100vh;
        }

        .top-nav-tabs {
            display: flex;
            justify-content: space-around;
            background-color: #fff;
            padding: 0 15px;
            border-bottom: 1px solid var(--border-light);
        }

        .tab-item {
            flex: 1;
            text-align: center;
            padding: 15px 0;
            font-size: 15px;
            font-weight: 500;
            color: var(--text-light);
            cursor: pointer;
            position: relative;
        }

        .tab-item.active {
            color: var(--primary-color);
        }

        .tab-item.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 2px;
            background-color: var(--primary-color);
            border-radius: 1px;
        }

        .job-list-area {
            padding: 20px 15px;
        }

        .job-card {
            background-color: #fff;
            border-radius: 16px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .job-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        .job-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-dark);
            margin: 0;
        }

        .job-menu-icon {
            color: var(--text-light);
            font-size: 20px;
        }

        .job-subtitle {
            font-size: 13px;
            color: var(--text-light);
            margin: 0 0 15px 0;
        }

        .job-buttons {
            display: flex;
            gap: 12px;
        }

        .btn-view-details,
        .btn-start {
            flex: 1;
            padding: 12px;
            border-radius: 25px; /* Pill shape */
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            border: none;
            transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
        }

        .btn-view-details {
            background-color: #fff;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
        }

        .btn-start {
            background-color: var(--primary-color);
            color: white;
        }
    `}</style>
);

const jobs = [
    {
        id: 1,
        customer: "Melvin | Hyundai Creta",
        service: "Basic Car Wash",
        dateTime: "Sep 6, 2025 - 6:00 AM",
    },
    {
        id: 2,
        customer: "Prakash | Hero Splendor",
        service: "Premium Bike Wash",
        dateTime: "Sep 6, 2025 - 6:00 AM",
    },
    {
        id: 3,
        customer: "Rajesh | KTM 160 Duke",
        service: "Premium Bike Wash",
        dateTime: "Sep 6, 2025 - 6:00 AM",
    },
    {
        id: 4,
        customer: "John | Royal Enfield Hunter 350",
        service: "Premium Bike Wash",
        dateTime: "Sep 6, 2025 - 6:00 AM",
    },
];

function JobScreen() {
    return (
        <>
            <JobScreenStyles />
            <div className="job-screen-container">
                <div className="top-nav-tabs">
                    <div className="tab-item active">Accepted Order</div>
                    <div className="tab-item">Completed Order</div>
                </div>

                <div className="job-list-area">
                    {jobs.map(job => (
                        <div key={job.id} className="job-card">
                            <div className="job-card-header">
                                <p className="job-title">{job.customer}</p>
                                <BsThreeDotsVertical className="job-menu-icon" />
                            </div>
                            <p className="job-subtitle">
                                {job.service} | {job.dateTime}
                            </p>
                            <div className="job-buttons">
                                <button className="btn-view-details">View Details</button>
                                <button className="btn-start">Start</button>
                            </div>
                        </div>
                    ))}
                </div>
                <br></br>
                <br></br>
            </div>
        </>
    );
}

export default JobScreen;