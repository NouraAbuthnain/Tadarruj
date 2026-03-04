import { Link } from "react-router-dom";

const EmailConfirmation = () => {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.iconWrap}>📧</div>
        <h1 style={styles.title}>تحقق من بريدك الإلكتروني</h1>
        <p style={styles.text}>
          أرسلنا رسالة تأكيد إلى بريدك الإلكتروني. يرجى الضغط على رابط التحقق لتفعيل حسابك.
        </p>
        <p style={styles.subtext}>
          بعد التحقق، يمكنك تسجيل الدخول والوصول إلى لوحة التحكم.
        </p>
        <Link to="/login" style={styles.btn}>
          الذهاب لتسجيل الدخول
        </Link>
        <p style={styles.hint}>
          لم تصلك الرسالة؟ تحقق من مجلد البريد العشوائي (Spam).
        </p>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI','Tahoma','Arial Unicode MS',system-ui,sans-serif",
    direction: "rtl",
  },
  card: {
    background: "#fff",
    borderRadius: "20px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "480px",
    boxShadow: "0 4px 20px rgba(44,94,232,.13), 0 2px 8px rgba(15,23,42,.06)",
    border: "1px solid #e2e8f0",
    textAlign: "center",
  },
  iconWrap: { fontSize: "3rem", marginBottom: "1rem" },
  title: { fontSize: "1.3rem", fontWeight: 700, color: "#0f172a", margin: "0 0 0.75rem" },
  text: { fontSize: "0.92rem", color: "#475569", lineHeight: 1.7, margin: "0 0 0.5rem" },
  subtext: { fontSize: "0.85rem", color: "#64748b", margin: "0 0 1.5rem" },
  btn: {
    display: "inline-block",
    background: "#2c5ee8",
    color: "#fff",
    borderRadius: "12px",
    padding: "0.65rem 2rem",
    fontSize: "0.92rem",
    fontWeight: 600,
    textDecoration: "none",
    boxShadow: "0 4px 16px rgba(44,94,232,.28)",
  },
  hint: { fontSize: "0.78rem", color: "#94a3b8", marginTop: "1.25rem" },
};

export default EmailConfirmation;
