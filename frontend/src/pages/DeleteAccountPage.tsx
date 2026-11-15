
import { useState } from "react";
import api from "../api/axios";

export default function DeleteAccountPage() {
  const [loginID, setLoginID] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState<"login" | "confirm" | "done">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 계정 확인
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/api/login", {
        loginID,
        password,
      });

      setToken(res.data.token);
      setStep("confirm");
    } catch {
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 계정 삭제
  const handleDelete = async () => {
    setLoading(true);
    setError("");

    try {
      await api.delete("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setToken("");
      setPassword("");
      setStep("done");
    } catch {
      setError("계정 삭제에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "440px",
    margin: "80px auto",
    padding: "32px 24px",
    fontFamily: "Arial, sans-serif",
    color: "#3D2C2C",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px",
    marginTop: "8px",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxSizing: "border-box",
    fontSize: "15px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#F47560",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <main style={containerStyle}>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>
        MOMO Account Deletion
      </h1>

      {step === "login" && (
        <>
          <p style={{ lineHeight: 1.6, color: "#777" }}>
            Enter your MOMO account credentials to request account deletion.
          </p>

          <form onSubmit={handleLogin}>
            <label htmlFor="loginID">Username</label>
            <input
              id="loginID"
              style={inputStyle}
              value={loginID}
              onChange={(e) => setLoginID(e.target.value)}
              required
              autoComplete="username"
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />

            {error && (
              <p style={{ color: "red", marginBottom: "16px" }}>
                {error}
              </p>
            )}

            <button style={buttonStyle} disabled={loading}>
              {loading ? "Checking..." : "Continue"}
            </button>
          </form>
        </>
      )}

      {step === "confirm" && (
        <>
          <h2>Confirm Account Deletion</h2>

          <p style={{ lineHeight: 1.7, color: "#777" }}>
            Are you sure you want to delete your MOMO account?
            Your account and associated data will be permanently deleted.
            This action cannot be undone.
          </p>

          {error && (
            <p style={{ color: "red" }}>{error}</p>
          )}

          <button
            style={{ ...buttonStyle, background: "#D9534F" }}
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete My Account"}
          </button>

          <button
            style={{
              ...buttonStyle,
              marginTop: "12px",
              background: "#eee",
              color: "#333",
            }}
            onClick={() => {
              setToken("");
              setPassword("");
              setStep("login");
              setError("");
            }}
            disabled={loading}
          >
            Cancel
          </button>
        </>
      )}

      {step === "done" && (
        <div style={{ textAlign: "center" }}>
          <h2>Account Deleted</h2>
          <p style={{ lineHeight: 1.7, color: "#777" }}>
            Your MOMO account deletion has been completed successfully.
          </p>
        </div>
      )}

      <p
        style={{
          marginTop: "40px",
          fontSize: "12px",
          color: "#aaa",
          textAlign: "center",
        }}
      >
        MOMO - Expense Tracker
      </p>
    </main>
  );
}
