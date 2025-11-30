import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register({ setShowApp }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setShowApp(true);
        setMessage("Account created successfully!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage(data.msg || "Registration failed");
      }
    } catch (err) {
      setMessage("Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #faf5ff 0%, #f3e7f9 25%, #e9d5f5 50%, #dfc4f0 75%, #d4b5eb 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },
    blob1: {
      position: "absolute",
      top: "60px",
      right: "60px",
      width: "350px",
      height: "350px",
      background: "rgba(216, 180, 254, 0.4)",
      borderRadius: "50%",
      filter: "blur(70px)",
      animation: "blob 8s infinite",
    },
    blob2: {
      position: "absolute",
      bottom: "80px",
      left: "60px",
      width: "350px",
      height: "350px",
      background: "rgba(196, 181, 253, 0.4)",
      borderRadius: "50%",
      filter: "blur(70px)",
      animation: "blob 8s infinite 3s",
    },
    blob3: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "350px",
      height: "350px",
      background: "rgba(167, 139, 250, 0.3)",
      borderRadius: "50%",
      filter: "blur(70px)",
      animation: "blob 8s infinite 5s",
    },
    card: {
      position: "relative",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(139, 92, 246, 0.25)",
      padding: "48px",
      width: "100%",
      maxWidth: "460px",
      border: "1px solid rgba(167, 139, 250, 0.2)",
      zIndex: 1,
    },
    logoContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "32px",
    },
    logoWrapper: {
      position: "relative",
    },
    logoGlow: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
      borderRadius: "16px",
      filter: "blur(16px)",
      opacity: 0.5,
    },
    logo: {
      position: "relative",
      background: "linear-gradient(135deg, #a855f7 0%, #9333ea 100%)",
      padding: "16px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    sparkle: {
      width: "32px",
      height: "32px",
      color: "white",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      background: "linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #a855f7 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "12px",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "14px",
      lineHeight: "1.6",
    },
    subtitleHighlight: {
      fontWeight: "600",
      color: "#a855f7",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    inputWrapper: {
      position: "relative",
    },
    icon: {
      position: "absolute",
      left: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      width: "20px",
      height: "20px",
      transition: "color 0.3s",
    },
    input: {
      width: "100%",
      paddingLeft: "48px",
      paddingRight: "16px",
      paddingTop: "16px",
      paddingBottom: "16px",
      fontSize: "15px",
      border: "2px solid #e5e7eb",
      borderRadius: "16px",
      outline: "none",
      transition: "all 0.3s",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      boxSizing: "border-box",
    },
    inputFocused: {
      borderColor: "#c084fc",
      boxShadow: "0 0 0 4px rgba(192, 132, 252, 0.15)",
    },
    passwordInput: {
      paddingRight: "48px",
    },
    eyeButton: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      color: "#9ca3af",
      transition: "color 0.3s",
      padding: "4px",
    },
    button: {
      position: "relative",
      width: "100%",
      background: "linear-gradient(135deg, #a855f7 0%, #9333ea 50%, #a855f7 100%)",
      color: "white",
      fontWeight: "600",
      fontSize: "16px",
      padding: "16px",
      borderRadius: "16px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s",
      boxShadow: "0 10px 30px rgba(168, 85, 247, 0.35)",
      overflow: "hidden",
      marginTop: "8px",
    },
    buttonHover: {
      transform: "scale(1.02)",
      boxShadow: "0 15px 40px rgba(168, 85, 247, 0.45)",
    },
    buttonDisabled: {
      background: "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)",
      cursor: "not-allowed",
      transform: "scale(1)",
      boxShadow: "none",
    },
    spinner: {
      display: "inline-block",
      width: "20px",
      height: "20px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
      borderTop: "3px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      marginRight: "8px",
      verticalAlign: "middle",
    },
    message: {
      marginTop: "24px",
      textAlign: "center",
      fontWeight: "500",
      fontSize: "15px",
      padding: "16px",
      borderRadius: "12px",
    },
    messageSuccess: {
      background: "rgba(16, 185, 129, 0.1)",
      color: "#059669",
      border: "1px solid rgba(16, 185, 129, 0.3)",
    },
    messageError: {
      background: "rgba(239, 68, 68, 0.1)",
      color: "#dc2626",
      border: "1px solid rgba(239, 68, 68, 0.3)",
    },
    footer: {
      textAlign: "center",
      marginTop: "32px",
      color: "#6b7280",
      fontSize: "15px",
    },
    footerLink: {
      fontWeight: "600",
      color: "#a855f7",
      textDecoration: "none",
      transition: "opacity 0.3s",
    },
    securityBadge: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginTop: "20px",
      padding: "12px",
      background: "rgba(168, 85, 247, 0.08)",
      borderRadius: "12px",
      border: "1px solid rgba(168, 85, 247, 0.15)",
    },
    securityIcon: {
      width: "18px",
      height: "18px",
      color: "#a855f7",
    },
    securityText: {
      fontSize: "13px",
      color: "#6b7280",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(40px, -60px) scale(1.15); }
            66% { transform: translate(-30px, 30px) scale(0.9); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.container}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
        <div style={styles.blob3}></div>

        <div style={styles.card}>
          <div style={styles.logoContainer}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoGlow}></div>
              <div style={styles.logo}>
                <svg style={styles.sparkle} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div style={styles.header}>
            <h1 style={styles.title}>Join Convivify</h1>
            <p style={styles.subtitle}>
              Your name & email are{" "}
              <span style={styles.subtitleHighlight}>
                fully encrypted
              </span>
              {" "}in our database
            </p>
          </div>

          <form onSubmit={handleRegister} style={styles.form}>
            <div style={styles.inputWrapper}>
              <svg
                style={{...styles.icon, color: nameFocused ? "#a855f7" : "#9ca3af"}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                style={{...styles.input, ...(nameFocused ? styles.inputFocused : {})}}
                required
                disabled={loading}
              />
            </div>

            <div style={styles.inputWrapper}>
              <svg
                style={{...styles.icon, color: emailFocused ? "#a855f7" : "#9ca3af"}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={{...styles.input, ...(emailFocused ? styles.inputFocused : {})}}
                required
                disabled={loading}
              />
            </div>

            <div style={styles.inputWrapper}>
              <svg
                style={{...styles.icon, color: passwordFocused ? "#a855f7" : "#9ca3af"}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Choose a Password (6+ characters)"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={{...styles.input, ...styles.passwordInput, ...(passwordFocused ? styles.inputFocused : {})}}
                required
                minLength="6"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                onMouseEnter={(e) => e.target.style.color = "#a855f7"}
                onMouseLeave={(e) => e.target.style.color = "#9ca3af"}
              >
                {showPassword ? (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
              onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 10px 30px rgba(168, 85, 247, 0.35)";
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div style={styles.securityBadge}>
            <svg style={styles.securityIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span style={styles.securityText}>
              End-to-end encrypted & secure
            </span>
          </div>

          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes("success") ? styles.messageSuccess : styles.messageError)
            }}>
              {message}
            </div>
          )}

          <p style={styles.footer}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.opacity = "0.8"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}