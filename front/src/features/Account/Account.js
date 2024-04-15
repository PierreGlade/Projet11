import React from 'react';

const Account = ({ title, number, amount, description }) => {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{title} ({number})</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
};

const Accounts = () => {
  return (
    <>
      <h2 className="sr-only">Accounts</h2>
      <Account
        title="Argent Bank Checking"
        number="x8349"
        amount="$2,082.79"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Savings"
        number="x6712"
        amount="$10,928.42"
        description="Available Balance"
      />
      <Account
        title="Argent Bank Credit Card"
        number="x8349"
        amount="$184.30"
        description="Current Balance"
      />
    </>
  );
};

export default Accounts;
