import { useState, useEffect, useRef } from "react";
import axios from "axios";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register states
  const [registerEmail, setRegisterEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [registerPassword, setRegisterPassword] = useState("");
  const [timer, setTimer] = useState(0);

  const otpRefs = useRef([]);

  // --- LOGIN ---
  const handleLogin = async () => {
    alert(`Logging in with ${email}`);
  };

  // --- REGISTER ---
  const sendOtp = async () => {
    if (!registerEmail) return alert("Enter your email");
    try {
      await axios.post("http://127.0.0.1:8000/api/send-otp/", { email: registerEmail });
      setOtpSent(true);
      setTimer(60); // 60 seconds countdown
      alert("OTP sent to your email!");
    } catch (err) {
      console.log(err);
      alert("Failed to send OTP");
    }
  };

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value, idx) => {
    if (!/^[0-9]?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) otpRefs.current[idx + 1].focus();
    if (!value && idx > 0) otpRefs.current[idx - 1].focus();
  };

  const verifyOtp = async () => {
    try {
      const code = otp.join("");
      const res = await axios.post("http://127.0.0.1:8000/api/verify-otp/", { email: registerEmail, code });
      if (res.data.verified) {
        setOtpVerified(true);
        alert("OTP verified! Now set your password.");
        await axios.post("http://127.0.0.1:8000/api/register/", {
          email: registerEmail,
          password: registerPassword
        });

      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.log(err);
      alert("OTP verification failed");
    }
  };

  const createAccount = async () => {
    if (!registerPassword) return alert("Enter a password");
    try {
      alert(`Account created for ${registerEmail}`);
      setOtpSent(false);
      setOtpVerified(false);
      setRegisterEmail("");
      setOtp(Array(6).fill(""));
      setRegisterPassword("");
      setActiveTab("login");
    } catch (err) {
      console.log(err);
    }
  };

  const resendOtp = () => {
    setOtp(Array(6).fill(""));
    sendOtp();
  };

  return (
    <div style={styles.container}>
      {/* Tabs */}
      <div style={styles.tabHeader}>
        <div
          style={activeTab === "login" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("login")}
        >
          Login
        </div>
        <div
          style={activeTab === "register" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("register")}
        >
          Create Account
        </div>
      </div>

      {/* LOGIN */}
      {activeTab === "login" && (
        <div style={styles.box}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button style={styles.button} onClick={handleLogin}>
            Login
          </button>
        </div>
      )}

      {/* REGISTER */}
      {activeTab === "register" && (
        <div style={styles.box}>
          {!otpSent && (
            <>
              <input
                style={styles.input}
                type="email"
                placeholder="Email"
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
              />
              <button style={styles.button} onClick={sendOtp}>
                Send OTP
              </button>
            </>
          )}

          {otpSent && !otpVerified && (
            <>
              <div style={styles.otpContainer}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => (otpRefs.current[idx] = el)}
                    type="text"
                    maxLength={1}
                    style={styles.otpInput}
                    value={digit}
                    onChange={e => handleOtpChange(e.target.value, idx)}
                  />
                ))}
              </div>
              <button style={styles.button} onClick={verifyOtp}>
                Verify OTP
              </button>
              <div style={{ fontSize: "12px", marginTop: "6px" }}>
                {timer > 0
                  ? `Resend OTP in ${timer}s`
                  : <button style={styles.resendBtn} onClick={resendOtp}>Resend OTP</button>}
              </div>
            </>
          )}

          {otpVerified && (
            <>
              <input
                style={styles.input}
                type="password"
                placeholder="Set Password"
                value={registerPassword}
                onChange={e => setRegisterPassword(e.target.value)}
              />
              <button style={styles.button} onClick={createAccount}>
                Create Account
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "420px",
    margin: "80px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    fontFamily: "Arial, sans-serif",
  },
  tabHeader: { 
    display: "flex", 
    marginBottom: "20px" },
  tab: { 
    flex: 1, 
    textAlign: "center", 
    padding: "10px", 
    cursor: "pointer", 
    borderBottom: "2px solid #ccc" },
  activeTab: { 
    flex: 1, 
    textAlign: "center", 
    padding: "10px", 
    cursor: "pointer", 
    borderBottom: "2px solid black", 
    fontWeight: "bold" },
  box: { 
    display: "flex", 
    flexDirection: "column", 
    gap: "12px" },
  input: { 
    padding: "10px", 
    borderRadius: "8px", 
    border: "1px solid #ccc", 
    fontSize: "14px" },
  button: { 
    padding: "12px", 
    borderRadius: "8px", 
    border: "none", 
    background: "black", 
    color: "white", 
    cursor: "pointer", 
    fontSize: "16px" },
  otpContainer: { 
    display: "flex", 
    gap: "8px", 
    justifyContent: "center", 
    marginTop: "10px" },
  otpInput: { 
    width: "40px", 
    height: "40px", 
    textAlign: "center", 
    fontSize: "18px", 
    borderRadius: "8px", 
    border: "1px solid #ccc" },
  resendBtn: { 
    background: "none", 
    border: "none", 
    color: "blue", 
    cursor: "pointer", 
    textDecoration: "underline", 
    fontSize: "12px" }
};

export default AuthPage;
