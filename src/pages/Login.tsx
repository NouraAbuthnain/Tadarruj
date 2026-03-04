import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    navigate("/dashboard");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <a href="/" style={styles.logo}>
          <span style={styles.logoAr}>تدرج</span>
          <span style={styles.logoSep}>|</span>
          <span style={styles.logoEn}>Tadarruj</span>
        </a>
        <h1 style={styles.title}>تسجيل الدخول</h1>
        <p style={styles.subtitle}>مرحباً بعودتك!</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
              dir="ltr"
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              required
              dir="ltr"
              style={styles.input}
            />
          </div>

          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? "جاري الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <p style={styles.switchText}>
          ليس لديك حساب؟{" "}
          <Link to="/signup" style={styles.link}>
            أنشئ حساباً
          </Link>
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
    maxWidth: "440px",
    boxShadow: "0 4px 20px rgba(44,94,232,.13), 0 2px 8px rgba(15,23,42,.06)",
    border: "1px solid #e2e8f0",
  },
  logo: {
    display: "flex",
    alignItems: "baseline",
    gap: "0.4rem",
    justifyContent: "center",
    marginBottom: "1.5rem",
    textDecoration: "none",
  },
  logoAr: { color: "#2c5ee8", fontWeight: 900, fontSize: "1.2rem" },
  logoSep: { color: "#94a3b8", fontWeight: 300 },
  logoEn: { color: "#475569", fontSize: "0.88rem", fontWeight: 300, fontStyle: "italic" },
  title: { fontSize: "1.4rem", fontWeight: 700, textAlign: "center", color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "0.9rem", color: "#475569", textAlign: "center", margin: "0.5rem 0 1.5rem" },
  form: { display: "flex", flexDirection: "column", gap: "0.9rem" },
  field: { display: "flex", flexDirection: "column", gap: "0.3rem" },
  label: { fontSize: "0.82rem", fontWeight: 600, color: "#475569" },
  input: {
    padding: "0.62rem 0.9rem",
    border: "1.5px solid #e2e8f0",
    borderRadius: "12px",
    background: "#f8fafc",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  btn: {
    background: "#2c5ee8",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "0.7rem",
    fontSize: "0.95rem",
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 16px rgba(44,94,232,.28)",
    marginTop: "0.5rem",
  },
  switchText: { textAlign: "center", fontSize: "0.85rem", color: "#475569", marginTop: "1.25rem" },
  link: { color: "#2c5ee8", fontWeight: 600, textDecoration: "none" },
};

export default Login;
