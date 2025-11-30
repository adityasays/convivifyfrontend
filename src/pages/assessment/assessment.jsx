import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp, Clock, CheckCircle2, ArrowRight, ArrowLeft, Home } from "lucide-react";

export default function Assessment() {
  const [state, setState] = useState("loading");
  const [data, setData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/api/assessment/start`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => {
        setData(d);
        if (!d.canRetake) {
          setState("cooldown");
        } else if (d.history?.length > 0) {
          setState("result");
        } else {
          setAnswers(new Array(d.baseQuestions.length).fill(null));
          setState("quiz");
        }
      });
  }, []);

  const selectAnswer = (val) => {
    const newAns = [...answers];
    newAns[currentQ] = val;
    setAnswers(newAns);
  };

  const submit = async () => {
    if (answers.includes(null)) return alert("Answer all questions");

    const res = await fetch(`${API_URL}/api/assessment/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ answers }),
    });

    const d = await res.json();
    setData(d);
    setState("result");
  };

  if (state === "loading") {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingContent}>
          <div style={styles.spinner}>
            <div style={styles.spinnerRing}></div>
            <div style={styles.spinnerRingAnimated}></div>
          </div>
          <p style={styles.loadingText}>Loading your assessment...</p>
        </div>
      </div>
    );
  }

  if (state === "cooldown") {
    const days = data.daysLeft;
    return (
      <div style={styles.cooldownContainer}>
        <div style={styles.cooldownCard}>
          <div style={styles.cooldownIcon}>
            <Clock style={{ width: 48, height: 48, color: 'white' }} />
          </div>
          
          <h1 style={styles.cooldownTitle}>Assessment Complete!</h1>
          
          <p style={styles.cooldownMessage}>
            Come back in <span style={styles.cooldownDays}>{days} day{days > 1 ? "s" : ""}</span>
          </p>
          
          <div style={styles.cooldownDateBox}>
            <p style={styles.cooldownDate}>
              Next available: <span style={{ fontWeight: 600 }}>{new Date(data.nextDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </p>
          </div>
          
          <button onClick={() => navigate("/")} style={styles.cooldownButton}>
            <Home style={{ width: 24, height: 24 }} />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (state === "quiz" && data.baseQuestions) {
    const q = data.baseQuestions[currentQ];
    const progress = ((currentQ + 1) / data.baseQuestions.length) * 100;
    const options = ["Not at all", "Several days", "More than half", "Nearly every day"];

    return (
      <div style={styles.quizContainer}>
        <div style={styles.quizContent}>
          <div style={styles.progressCard}>
            <div style={styles.progressHeader}>
              <span style={styles.progressText}>
                Question {currentQ + 1} of {data.baseQuestions.length}
              </span>
              <span style={styles.progressPercent}>{Math.round(progress)}%</span>
            </div>
            
            <div style={styles.progressBarContainer}>
              <div style={{...styles.progressBar, width: `${progress}%`}}>
                <div style={styles.progressBarGlow}></div>
              </div>
            </div>
          </div>

          <div style={styles.questionCard}>
            <div style={styles.questionHeader}>
              <div style={styles.questionIcon}>
                <Sparkles style={{ width: 24, height: 24, color: 'white' }} />
              </div>
              <h2 style={styles.questionText}>{q}</h2>
            </div>

            <div style={styles.optionsContainer}>
              {options.map((t, i) => (
                <button
                  key={i}
                  onClick={() => selectAnswer(i)}
                  style={{
                    ...styles.optionButton,
                    ...(answers[currentQ] === i ? styles.optionButtonSelected : {})
                  }}
                >
                  <div style={styles.optionContent}>
                    <span style={styles.optionText}>{t}</span>
                    {answers[currentQ] === i && (
                      <CheckCircle2 style={{ width: 24, height: 24 }} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div style={styles.navigationContainer}>
            <button 
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              style={{
                ...styles.backButton,
                ...(currentQ === 0 ? styles.buttonDisabled : {})
              }}
            >
              <ArrowLeft style={{ width: 20, height: 20 }} />
              Back
            </button>

            {currentQ === data.baseQuestions.length - 1 ? (
              <button 
                onClick={submit}
                disabled={answers[currentQ] === null}
                style={{
                  ...styles.submitButton,
                  ...(answers[currentQ] === null ? styles.buttonDisabled : {})
                }}
              >
                <Sparkles style={{ width: 24, height: 24 }} />
                See My Score
              </button>
            ) : (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                disabled={answers[currentQ] === null}
                style={{
                  ...styles.nextButton,
                  ...(answers[currentQ] === null ? styles.buttonDisabled : {})
                }}
              >
                Next
                <ArrowRight style={{ width: 20, height: 20 }} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (state === "result" && data.result) {
    const { result, history, improved } = data;

    return (
      <div style={styles.resultContainer}>
        <div style={styles.resultContent}>
          <div style={styles.resultHeader}>
            <div style={styles.resultHeaderContent}>
              <Sparkles style={{ width: 40, height: 40, color: '#9333ea' }} />
              <h1 style={styles.resultTitle}>Your ConviScore</h1>
              <Sparkles style={{ width: 40, height: 40, color: '#ec4899' }} />
            </div>
          </div>

          {history.length > 1 && (
            <div style={styles.improvementBanner}>
              <div style={styles.improvementContent}>
                <TrendingUp style={{ width: 64, height: 64 }} />
                <div style={styles.improvementScore}>
                  {history[history.length - 2].score} → {result.score}
                </div>
              </div>
              <p style={styles.improvementText}>
                You improved by {improved > 0 ? improved : -improved} points! 🎉
              </p>
            </div>
          )}

          <div style={styles.scoreCard}>
            <div style={styles.scoreDisplay}>
              <div style={styles.scoreGlow}></div>
              <div style={styles.scoreNumber}>
                {result.score}
                <span style={styles.scoreTotal}>/100</span>
              </div>
            </div>
            
            <h2 style={styles.scoreLevel}>{result.level}</h2>
            <p style={styles.scoreMessage}>{result.message}</p>
          </div>

          <div style={styles.tipsCard}>
            <h3 style={styles.tipsTitle}>
              <Sparkles style={{ width: 32, height: 32, color: '#9333ea' }} />
              Your Personalized Action Plan
              <Sparkles style={{ width: 32, height: 32, color: '#ec4899' }} />
            </h3>
            
            <div style={styles.tipsGrid}>
              {result.tips.map((tip, i) => (
                <div key={i} style={styles.tipItem}>
                  <div style={styles.tipNumber}>{i + 1}</div>
                  <p style={styles.tipText}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.resultFooter}>
            <button onClick={() => navigate("/")} style={styles.homeButton}>
              <Home style={{ width: 28, height: 28 }} />
              Back to Home
              <ArrowRight style={{ width: 28, height: 28 }} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

const styles = {
  loadingContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContent: {
    textAlign: 'center',
  },
  spinner: {
    position: 'relative',
    width: 80,
    height: 80,
    margin: '0 auto 24px',
  },
  spinnerRing: {
    position: 'absolute',
    inset: 0,
    border: '4px solid #e9d5ff',
    borderRadius: '50%',
  },
  spinnerRingAnimated: {
    position: 'absolute',
    inset: 0,
    border: '4px solid #9333ea',
    borderRadius: '50%',
    borderTopColor: 'transparent',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 600,
    color: '#581c87',
  },
  cooldownContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  cooldownCard: {
    maxWidth: 600,
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    padding: 48,
    textAlign: 'center',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  cooldownIcon: {
    width: 96,
    height: 96,
    margin: '0 auto 32px',
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cooldownTitle: {
    fontSize: 48,
    fontWeight: 700,
    marginBottom: 24,
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  cooldownMessage: {
    fontSize: 28,
    color: '#374151',
    marginBottom: 16,
  },
  cooldownDays: {
    fontWeight: 700,
    color: '#9333ea',
  },
  cooldownDateBox: {
    display: 'inline-block',
    background: '#f3e8ff',
    borderRadius: 16,
    padding: '16px 32px',
    marginBottom: 32,
  },
  cooldownDate: {
    fontSize: 18,
    color: '#7e22ce',
    margin: 0,
  },
  cooldownButton: {
    marginTop: 24,
    padding: '16px 40px',
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    color: 'white',
    borderRadius: 16,
    fontSize: 20,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.4)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
    transition: 'all 0.3s ease',
  },
  quizContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
    padding: '48px 24px',
  },
  quizContent: {
    maxWidth: 900,
    margin: '0 auto',
  },
  progressCard: {
    marginBottom: 48,
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    padding: 32,
    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 600,
    color: '#581c87',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 700,
    color: '#9333ea',
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    height: 12,
    background: '#f3e8ff',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 100%)',
    borderRadius: 999,
    transition: 'width 0.5s ease',
    boxShadow: '0 0 15px rgba(147, 51, 234, 0.5)',
  },
  progressBarGlow: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(255, 255, 255, 0.3)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  questionCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    padding: 40,
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
    marginBottom: 32,
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  questionHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    marginBottom: 32,
  },
  questionIcon: {
    width: 48,
    height: 48,
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  questionText: {
    fontSize: 28,
    fontWeight: 700,
    color: '#1f2937',
    lineHeight: 1.4,
    margin: 0,
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  optionButton: {
    width: '100%',
    padding: 24,
    textAlign: 'left',
    borderRadius: 16,
    border: '2px solid #e9d5ff',
    background: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: 16,
  },
  optionButtonSelected: {
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    color: 'white',
    borderColor: '#9333ea',
    boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.4)',
  },
  optionContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 20,
    fontWeight: 600,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    padding: '16px 32px',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    color: '#7e22ce',
    borderRadius: 16,
    fontWeight: 600,
    border: '1px solid rgba(168, 85, 247, 0.2)',
    cursor: 'pointer',
    boxShadow: '0 5px 15px -3px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'all 0.3s ease',
    fontSize: 16,
  },
  nextButton: {
    padding: '16px 48px',
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    color: 'white',
    borderRadius: 16,
    fontSize: 20,
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(147, 51, 234, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'all 0.3s ease',
  },
  submitButton: {
    padding: '16px 48px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: 'white',
    borderRadius: 16,
    fontSize: 20,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'all 0.3s ease',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  resultContainer: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #ede9fe 100%)',
    padding: '48px 24px',
  },
  resultContent: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  resultHeader: {
    textAlign: 'center',
    marginBottom: 48,
  },
  resultHeaderContent: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 12,
  },
  resultTitle: {
    fontSize: 60,
    fontWeight: 700,
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: 0,
  },
  improvementBanner: {
    marginBottom: 48,
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: 24,
    padding: 40,
    boxShadow: '0 20px 40px -10px rgba(16, 185, 129, 0.3)',
    color: 'white',
  },
  improvementContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  improvementScore: {
    fontSize: 72,
    fontWeight: 700,
  },
  improvementText: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: 'center',
    margin: 0,
  },
  scoreCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    padding: 64,
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
    marginBottom: 48,
    textAlign: 'center',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  scoreDisplay: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: 32,
  },
  scoreGlow: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    borderRadius: '50%',
    filter: 'blur(60px)',
    opacity: 0.3,
    animation: 'pulse 2s ease-in-out infinite',
  },
  scoreNumber: {
    position: 'relative',
    fontSize: 120,
    fontWeight: 900,
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  scoreTotal: {
    fontSize: 72,
  },
  scoreLevel: {
    fontSize: 48,
    fontWeight: 700,
    color: '#1f2937',
    marginBottom: 24,
  },
  scoreMessage: {
    fontSize: 28,
    color: '#4b5563',
    lineHeight: 1.6,
    maxWidth: 900,
    margin: '0 auto',
  },
  tipsCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: 24,
    padding: 48,
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(168, 85, 247, 0.2)',
  },
  tipsTitle: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 40,
    textAlign: 'center',
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  tipsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    maxWidth: 900,
    margin: '0 auto',
  },
  tipItem: {
    background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
    borderRadius: 16,
    padding: 24,
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    border: '1px solid rgba(168, 85, 247, 0.2)',
    transition: 'all 0.3s ease',
  },
  tipNumber: {
    width: 40,
    height: 40,
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 700,
    fontSize: 18,
    flexShrink: 0,
  },
  tipText: {
    fontSize: 20,
    color: '#374151',
    lineHeight: 1.6,
    margin: 0,
    paddingTop: 8,
  },
  resultFooter: {
    textAlign: 'center',
    marginTop: 48,
  },
  homeButton: {
    padding: '24px 64px',
    background: 'linear-gradient(135deg, #9333ea 0%, #ec4899 100%)',
    color: 'white',
    fontSize: 24,
    fontWeight: 700,
    borderRadius: 16,
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 20px 40px -10px rgba(147, 51, 234, 0.4)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 16,
    transition: 'all 0.3s ease',
  },
};

// Add keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  button:hover:not(:disabled) {
    transform: scale(1.05);
  }
  button:active:not(:disabled) {
    transform: scale(0.98);
  }
`;
document.head.appendChild(styleSheet);