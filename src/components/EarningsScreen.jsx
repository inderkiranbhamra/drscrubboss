import React from 'react';

const EarningsScreenStyles = () => (
    <style>{`
        :root {
            --primary-color: #2563EB;
            --text-dark: #1F2937;
            --text-light: #6B7280;
            --border-light: #E5E7EB;
            --bg-light: #F3F4F6;
            --success-color: #10B981; 
        }

        body {
            background-color: var(--bg-light);
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }

        .earnings-screen-container {
            padding: 0;
            background-color: var(--bg-light);
            min-height: 100vh;
            padding-bottom: 80px; 
        }

        .earnings-header-bg {
            background-image: linear-gradient(to bottom, rgba(67, 56, 202, 0.95), rgba(67, 56, 202, 0.8)), url('https://static.vecteezy.com/system/resources/thumbnails/049/965/031/small_2x/hand-painted-horizontal-landscape-illustration-of-the-city-under-the-blue-and-purple-sky-free-vector.jpg');
            background-size: cover;
            background-position: center;
            padding: 25px 15px; 
            color: white;
            text-align: center;
        }

        .balance-label {
            font-size: 14px;
            font-weight: 400;
            margin: 0 0 5px 0; 
            opacity: 0.8;
        }

        .balance-amount {
            font-size: 32px; 
            font-weight: 700;
            margin: 0;
        }

        .payment-history-section {
            padding: 15px; 
            margin-top: -20px; 
            position: relative;
            z-index: 2;
        }

        .section-title {
            font-size: 16px;
            font-weight: 500;
            margin-top: 0;
            margin-bottom: 12px;
            color: var(--text-dark);
        }

        .transaction-card {
            background-color: #fff;
            border-radius: 12px;
            padding: 12px 15px;
            margin-bottom: 10px; 
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
            border-left: 5px solid var(--success-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .transaction-left {
            display: flex;
            flex-direction: column;
            text-align: left;
        }

        .transaction-id {
            font-size: 15px;
            font-weight: 600;
            color: var(--text-dark);
            margin: 0;
        }

        .transaction-date {
            font-size: 13px;
            color: var(--text-light);
            margin: 3px 0 0 0; 
        }

        .transaction-right {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
        }

        .transaction-amount {
            font-size: 15px;
            font-weight: 600;
            color: var(--success-color);
            margin: 0;
        }

        .transaction-status {
            font-size: 13px;
            color: var(--text-light);
            margin: 3px 0 0 0; 
        }

        .transaction-type {
            font-weight: 500;
            color: var(--text-dark);
            margin-right: 4px;
        }

        .status-success {
            color: var(--success-color);
            font-weight: 500;
        }
    `}</style>
);

// --- ORIGINAL DATA RESTORED ---
const transactions = [
    {
        id: "32902",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹299.00",
        type: "DEBIT",
        status: "Success",
    },
    {
        id: "32912",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹309.00",
        type: "DEBIT",
        status: "Success",
    },
    {
        id: "32988",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹799.00",
        type: "DEBIT",
        status: "Success",
    },
    {
        id: "32976",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹249.00",
        type: "DEBIT",
        status: "Success",
    },
    {
        id: "32945",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹1240.00",
        type: "DEBIT",
        status: "Success",
    },
    {
        id: "32954",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹699.00",
        type: "DEBIT",
        status: "Success",
    },
    {
        id: "32933",
        date: "Sep 6, 2025 - 6:00 AM",
        amount: "₹499.00",
        type: "DEBIT",
        status: "Success",
    },
];

function EarningsScreen() {
    return (
        <>
            <EarningsScreenStyles />
            <div className="earnings-screen-container">
                <div className="earnings-header-bg">
                    <p className="balance-label">Your Balance is</p>
                    <p className="balance-amount">₹4500.50</p>
                </div>
                <br></br>
                <div className="payment-history-section">
                    <h3 className="section-title">Payment History</h3>
                    {transactions.map(transaction => (
                        <div key={transaction.id} className="transaction-card">
                            <div className="transaction-left">
                                <p className="transaction-id"># {transaction.id}</p>
                                <p className="transaction-date">{transaction.date}</p>
                            </div>
                            <div className="transaction-right">
                                <p className="transaction-amount">+ {transaction.amount}</p>
                                <p className="transaction-status">
                                    <span className="transaction-type">{transaction.type}</span> | <span className="status-success">{transaction.status}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default EarningsScreen;