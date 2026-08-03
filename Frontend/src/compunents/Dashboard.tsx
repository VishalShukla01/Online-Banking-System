import React, { useState, useEffect } from "react";

type DashboardProps = {
  user: string;
  setLoggedInUser: (user: string | null) => void;
};

type Transaction = {
  _id: string;
  type: "debit" | "credit";
  amount: number;
  recipient?: string;
  date: string;
  description: string;
};

const Dashboard: React.FC<DashboardProps> = ({ user, setLoggedInUser }) => {
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<string[]>([]);

  // Load user data when component mounts
  useEffect(() => {
    loadUserData();
    loadTransactions();
  }, [user]);

  const loadUserData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/user/${user}`);
      const data = await response.json();
      setBalance(data.balance);
      setLoading(false);
    } catch (error) {
      console.error('Error loading user data:', error);
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/${user}`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    
    if (!recipient || isNaN(amt) || amt <= 0) {
      alert("Please enter valid details.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: user,
          recipient,
          amount: amt
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`₹${amt} transferred to ${recipient}!`);
        setBalance(data.balance);
        setRecipient("");
        setAmount("");
        loadTransactions(); // Reload transactions
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Transfer failed! Make sure server is running.');
      console.error(error);
    }
  };

  const handleDeposit = async () => {
    const depositAmount = prompt("Enter deposit amount:");
    if (depositAmount) {
      const amt = Number(depositAmount);
      if (!isNaN(amt) && amt > 0) {
        try {
          const response = await fetch('http://localhost:5000/api/transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user,
              type: 'credit',
              amount: amt,
              description: 'Cash deposit'
            })
          });

          const data = await response.json();

          if (response.ok) {
            alert(`₹${amt} deposited successfully!`);
            setBalance(data.balance);
            loadTransactions();
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert('Deposit failed!');
          console.error(error);
        }
      } else {
        alert("Invalid amount");
      }
    }
  };

  const handleWithdraw = async () => {
    const withdrawAmount = prompt("Enter withdrawal amount:");
    if (withdrawAmount) {
      const amt = Number(withdrawAmount);
      if (!isNaN(amt) && amt > 0) {
        try {
          const response = await fetch('http://localhost:5000/api/transaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: user,
              type: 'debit',
              amount: amt,
              description: 'Cash withdrawal'
            })
          });

          const data = await response.json();

          if (response.ok) {
            alert(`₹${amt} withdrawn successfully!`);
            setBalance(data.balance);
            loadTransactions();
          } else {
            alert(data.message);
          }
        } catch (error) {
          alert('Withdrawal failed!');
          console.error(error);
        }
      } else {
        alert("Invalid amount");
      }
    }
  };

  const handleLogout = () => setLoggedInUser(null);

  if (loading) {
    return <div style={{ padding: "2em", textAlign: "center" }}>Loading...</div>;
  }

  return (
    <div style={{ 
      padding: "2em", 
      maxWidth: "900px", 
      margin: "auto",
      minHeight: "calc(100vh - 80px)",
    }}>
      <h2 style={{ color: "#2c3e50", marginBottom: "1em" }}>Dashboard</h2>
      
      <div style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "1.5em", 
        borderRadius: "12px", 
        marginBottom: "1.5em",
        color: "white",
        boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
      }}>
        <p style={{ fontSize: "1.1em", marginBottom: "0.5em" }}>
          <strong>Account Holder:</strong> {user}
        </p>
        <p style={{ fontSize: "1.8em", fontWeight: "bold", margin: 0 }}>
          ₹{balance.toLocaleString()}
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "2em" }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "1em" }}>Quick Actions</h3>
        <div style={{ display: "flex", gap: "0.5em", flexWrap: "wrap" }}>
          <button 
            onClick={handleDeposit}
            style={{
              padding: "0.8em 1.5em",
              background: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            💰 Deposit
          </button>
          <button 
            onClick={handleWithdraw}
            style={{
              padding: "0.8em 1.5em",
              background: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            💵 Withdraw
          </button>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            style={{
              padding: "0.8em 1.5em",
              background: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            📜 {showHistory ? "Hide" : "View"} History
          </button>
        </div>
      </div>

      {/* Transaction History */}
      {showHistory && (
        <div style={{ 
          background: "#fff", 
          padding: "1.5em", 
          borderRadius: "12px", 
          marginBottom: "2em",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}>
          <h3 style={{ color: "#2c3e50", marginBottom: "1em" }}>Transaction History</h3>
          {transactions.length === 0 ? (
            <p style={{ color: "#666" }}>No transactions yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                    <th style={{ padding: "0.75em", textAlign: "left" }}>Date</th>
                    <th style={{ padding: "0.75em", textAlign: "left" }}>Description</th>
                    <th style={{ padding: "0.75em", textAlign: "right" }}>Amount</th>
                    <th style={{ padding: "0.75em", textAlign: "center" }}>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn._id} style={{ borderBottom: "1px solid #eee" }}>
                      <td style={{ padding: "0.75em", fontSize: "0.9em" }}>
                        {new Date(txn.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "0.75em" }}>
                        {txn.description}
                        {txn.recipient && ` (${txn.recipient})`}
                      </td>
                      <td style={{ 
                        padding: "0.75em", 
                        textAlign: "right",
                        color: txn.type === "credit" ? "#28a745" : "#dc3545",
                        fontWeight: "bold",
                      }}>
                        {txn.type === "credit" ? "+" : "-"}₹{txn.amount.toLocaleString()}
                      </td>
                      <td style={{ padding: "0.75em", textAlign: "center" }}>
                        <span style={{
                          padding: "0.3em 0.8em",
                          borderRadius: "20px",
                          fontSize: "0.85em",
                          background: txn.type === "credit" ? "#d4edda" : "#f8d7da",
                          color: txn.type === "credit" ? "#155724" : "#721c24",
                          fontWeight: "600",
                        }}>
                          {txn.type === "credit" ? "Credit" : "Debit"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Transfer Form */}
      <form onSubmit={handleTransfer} style={{ 
        background: "#fff", 
        padding: "2em", 
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "1em" }}>Transfer Money</h3>
        
        <div style={{ marginBottom: "1.5em" }}>
          <label>
            <span style={{ fontWeight: "600", color: "#2c3e50", display: "block", marginBottom: "0.5em" }}>
              Recipient Username
            </span>
            <input
              type="text"
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              required
              placeholder="Enter recipient username"
              style={{
                width: "100%",
                padding: "0.8em",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1em",
              }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: "1.5em" }}>
          <label>
            <span style={{ fontWeight: "600", color: "#2c3e50", display: "block", marginBottom: "0.5em" }}>
              Amount (₹)
            </span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
              style={{
                width: "100%",
                padding: "0.8em",
                border: "2px solid #e0e0e0",
                borderRadius: "8px",
                fontSize: "1em",
              }}
            />
          </label>
        </div>
        
        <div style={{ display: "flex", gap: "1em" }}>
          <button 
            type="submit"
            style={{
              flex: 1,
              padding: "1em",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "1em",
            }}
          >
            Transfer
          </button>
          <button 
            type="button"
            onClick={handleLogout}
            style={{
              padding: "1em 2em",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
