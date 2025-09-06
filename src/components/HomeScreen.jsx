import React from 'react';
import { FiBell } from 'react-icons/fi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaChevronRight } from 'react-icons/fa';

const HomeStyles = () => (
    <style>{`
        :root {
            --primary-color: #2563EB;
            --text-dark: #1F2937;
            --text-light: #6B7280;
        }
        body {
            background-color: #F3F4F6;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .home-screen-container {
            background-color: #F3F4F6;
            padding: 0;
            padding-bottom: 50px;
        }
        .home-header-bg {
            background-image: linear-gradient(to bottom, rgba(67, 56, 202, 0.95), rgba(67, 56, 202, 0.8)), url('https://images.pexels.com/photos/7293739/pexels-photo-7293739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
            background-size: cover;
            background-position: center;
            padding: 40px 15px 35px 15px;
            /* Removed bottom border-radius to make it rectangular */
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            color: white;
        }
        .header-top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
        }
        .header-greeting {
            font-size: 28px;
            font-weight: 700;
            margin: 4px 0 0;
        }
        .header-sub-greeting {
            font-size: 16px;
            font-weight: 400;
            margin: 0;
            opacity: 0.9;
        }
        .notification-bell { font-size: 24px; }
        .location-card {
            background-color: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 12px;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(5px);
        }
        .location-title { margin: 0; font-weight: 500; font-size: 16px; }
        .location-address { margin: 4px 0 0; font-size: 14px; opacity: 0.8; }
        .location-arrow { font-size: 16px; opacity: 0.8; }
        .home-content-area {
            padding: 20px 15px;
            /* Increased negative margin to pull content higher, effectively making the header background rectangular and not "near" the boxes */
            margin-top: -50px; /* Adjusted to overlap the header more */
            position: relative;
            z-index: 2;
        }
        .job-stats { display: flex; gap: 15px; }
        .stat-card {
            flex: 1;
            background-color: #fff;
            padding: 20px 15px;
            border-radius: 16px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
        }
        .stat-label { margin: 0 0 8px 0; color: var(--text-light); font-size: 14px; }
        .stat-number { font-size: 36px; font-weight: 700; color: var(--text-dark); margin: 0; }
        .section-title { font-size: 16px; font-weight: 500; margin-top: 25px; margin-bottom: 15px; color: var(--text-dark); }
        .job-item-card {
            background-color: #fff;
            border-radius: 16px;
            margin-bottom: 15px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
            padding: 15px;
        }
        .job-item-top { display: flex; align-items: center; gap: 15px; }
        .job-image {
            width: 80px;
            height: 65px;
            object-fit: contain;
            background-color: #f7f7f7;
            border-radius: 8px;
            flex-shrink: 0;
            padding: 5px;
        }
        .job-details { flex-grow: 1; }
        .job-customer { font-weight: 600; margin: 0; font-size: 16px; color: var(--text-dark); }
        .job-service { color: var(--text-light); margin: 4px 0 0; font-size: 14px; }
        .job-menu-icon { color: var(--text-light); font-size: 20px; }
        .job-item-bottom {
            display: flex;
            gap: 15px;
            margin-top: 15px;
        }
        .btn-details, .btn-accept {
            flex: 1;
            padding: 12px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            border: none;
        }
        .btn-details {
            background-color: #fff;
            color: var(--primary-color);
            border: 1px solid var(--primary-color);
        }
        .btn-accept {
            background-color: var(--primary-color);
            color: white;
        }
    `}</style>
);

const jobRequests = [
  {
    id: 1,
    customer: "Melvin | Hyundai Creta",
    service: "Basic Car Wash",
    image: "https://stimg.cardekho.com/images/carexteriorimages/630x420/Hyundai/Creta/8667/1755765115423/front-left-side-47.jpg" // Using a transparent background image
  },
  {
    id: 2,
    customer: "Prakash | Suzuki Swift",
    service: "Premium Car Wash",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/159099/swift-exterior-right-front-three-quarter-31.jpeg" // Using a transparent background image
  },
  {
    id: 3,
    customer: "Praveen | Mahindra Thar",
    service: "Premium Car Wash",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124839/thar-roxx-exterior-left-front-three-quarter-3.jpeg" // Using a transparent background image
  }
];

function HomeScreen() {
    return (
        <>
            <HomeStyles />
            <div className="home-screen-container">
                <div className="home-header-bg">
                    <div className="header-top-row">
                        <div>
                            <p className="header-sub-greeting">Hi Ramesh</p>
                            <p className="header-greeting">Good Morning!</p>
                        </div>
                        <FiBell className="notification-bell" />
                    </div>
                    <div className="location-card">
                        <div>
                            <p className="location-title">RK Car Spa</p>
                            <p className="location-address">Electronic City, Bengaluru, Karnataka</p>
                        </div>
                        <FaChevronRight className="location-arrow" />
                    </div>
                </div>
                <div className="home-content-area">
                  <br></br>
                  <br></br>
                    <div className="job-stats">
                        <div className="stat-card">
                            <p className="stat-label">Job Assigned</p>
                            <p className="stat-number">4</p>
                        </div>
                        <div className="stat-card">
                            <p className="stat-label">Completed</p>
                            <p className="stat-number">1</p>
                        </div>
                    </div>
                    <h3 className="section-title">New Job Requests</h3>
                    <div className="job-card-list">
                        {jobRequests.map(job => (
                            <div key={job.id} className="job-item-card">
                                <div className="job-item-top">
                                    <img src={job.image} alt={job.customer} className="job-image" />
                                    <div className="job-details">
                                        <p className="job-customer">{job.customer}</p>
                                        <p className="job-service">{job.service}</p>
                                    </div>
                                    <BsThreeDotsVertical className="job-menu-icon" />
                                </div>
                                <div className="job-item-bottom">
                                    <button className="btn-details">View Details</button>
                                    <button className="btn-accept">Accept Order</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomeScreen;