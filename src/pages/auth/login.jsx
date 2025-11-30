import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({ setShowApp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setShowApp(true);
        setMessage("Welcome back!");
        setTimeout(() => navigate("/"), 1200);
      } else {
        setMessage(data.msg || "Invalid email or password");
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
      background: "linear-gradient(135deg, #f3e7f9 0%, #e6d5f5 25%, #d4b5f0 50%, #c9a8eb 75%, #b898e3 100%)",
      padding: "20px",
      position: "relative",
      overflow: "hidden",
    },
    blob1: {
      position: "absolute",
      top: "80px",
      left: "40px",
      width: "300px",
      height: "300px",
      background: "rgba(167, 139, 250, 0.3)",
      borderRadius: "50%",
      filter: "blur(60px)",
      animation: "blob 7s infinite",
    },
    blob2: {
      position: "absolute",
      top: "160px",
      right: "40px",
      width: "300px",
      height: "300px",
      background: "rgba(196, 181, 253, 0.3)",
      borderRadius: "50%",
      filter: "blur(60px)",
      animation: "blob 7s infinite 2s",
    },
    blob3: {
      position: "absolute",
      bottom: "-32px",
      left: "50%",
      width: "300px",
      height: "300px",
      background: "rgba(139, 92, 246, 0.3)",
      borderRadius: "50%",
      filter: "blur(60px)",
      animation: "blob 7s infinite 4s",
    },
    card: {
      position: "relative",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
      padding: "48px",
      width: "100%",
      maxWidth: "440px",
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
      background: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
      borderRadius: "16px",
      filter: "blur(16px)",
      opacity: 0.5,
    },
    logo: {
      position: "relative",
      background: "linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)",
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
      background: "linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #9333ea 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "12px",
    },
    subtitle: {
      color: "#6b7280",
      fontSize: "14px",
    },
    subtitleHighlight: {
      fontWeight: "600",
      color: "#9333ea",
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
      background: "rgba(255, 255, 255, 0.6)",
      backdropFilter: "blur(10px)",
      boxSizing: "border-box",
    },
    inputFocused: {
      borderColor: "#a78bfa",
      boxShadow: "0 0 0 4px rgba(167, 139, 250, 0.1)",
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
    forgotPassword: {
      textAlign: "right",
    },
    forgotLink: {
      fontSize: "14px",
      color: "#9333ea",
      fontWeight: "500",
      textDecoration: "none",
      transition: "color 0.3s",
    },
    button: {
      position: "relative",
      width: "100%",
      background: "linear-gradient(135deg, #9333ea 0%, #7c3aed 50%, #9333ea 100%)",
      color: "white",
      fontWeight: "600",
      fontSize: "16px",
      padding: "16px",
      borderRadius: "16px",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s",
      boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)",
      overflow: "hidden",
    },
    buttonHover: {
      transform: "scale(1.02)",
      boxShadow: "0 15px 40px rgba(147, 51, 234, 0.4)",
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
      color: "#9333ea",
      textDecoration: "none",
      transition: "opacity 0.3s",
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div style={styles.header}>
            <h1 style={styles.title}>Welcome Back</h1>
            <p style={styles.subtitle}>
              Your identity is{" "}
              <span style={styles.subtitleHighlight}>
                100% encrypted & anonymous
              </span>
            </p>
          </div>

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.inputWrapper}>
              <svg
                style={{...styles.icon, color: emailFocused ? "#9333ea" : "#9ca3af"}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                style={{...styles.input, ...(emailFocused ? styles.inputFocused : {})}}
                required
                disabled={loading}
              />
            </div>

            <div style={styles.inputWrapper}>
              <svg
                style={{...styles.icon, color: passwordFocused ? "#9333ea" : "#9ca3af"}}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                style={{...styles.input, ...styles.passwordInput, ...(passwordFocused ? styles.inputFocused : {})}}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
                onMouseEnter={(e) => e.target.style.color = "#9333ea"}
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

            <div style={styles.forgotPassword}>
              <Link
                to="/forgot-password"
                style={styles.forgotLink}
                onMouseEnter={(e) => e.target.style.opacity = "0.8"}
                onMouseLeave={(e) => e.target.style.opacity = "1"}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{...styles.button, ...(loading ? styles.buttonDisabled : {})}}
              onMouseEnter={(e) => !loading && Object.assign(e.target.style, styles.buttonHover)}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 10px 30px rgba(147, 51, 234, 0.3)";
              }}
            >
              {loading ? (
                <>
                  <span style={styles.spinner}></span>
                  Signing in...
                </>
              ) : (
                "Login Securely"
              )}
            </button>
          </form>

          {message && (
            <div style={{
              ...styles.message,
              ...(message.includes("Welcome") || message.includes("back") ? styles.messageSuccess : styles.messageError)
            }}>
              {message}
            </div>
          )}

          <p style={styles.footer}>
            Don't have an account?{" "}
            <Link
              to="/register"
              style={styles.footerLink}
              onMouseEnter={(e) => e.target.style.opacity = "0.8"}
              onMouseLeave={(e) => e.target.style.opacity = "1"}
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}