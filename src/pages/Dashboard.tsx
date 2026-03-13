import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isGuest = searchParams.get("guest") === "1";

  useEffect(() => {
    if (!loading && !user && !isGuest) {
      navigate("/login", { replace: true });
    }
  }, [user, loading, navigate, isGuest]);

  // Pass user info to dashboard iframe via postMessage
  useEffect(() => {
    const iframe = document.getElementById("dashboard-iframe") as HTMLIFrameElement;
    if (!iframe) return;

    const sendUserData = () => {
      if (user) {
        const profile = {
          name: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
          email: user.email || "",
          grade: user.user_metadata?.grade || "",
          city: user.user_metadata?.city || "",
          confirmed: true,
        };
        iframe.contentWindow?.postMessage(
          { type: "TADARRUJ_AUTH", mode: "account", profile },
          "*"
        );
      } else if (isGuest) {
        iframe.contentWindow?.postMessage(
          { type: "TADARRUJ_AUTH", mode: "guest", profile: { name: "ضيف", email: "", confirmed: false } },
          "*"
        );
      }
    };

    iframe.addEventListener("load", sendUserData);
    sendUserData();

    return () => iframe.removeEventListener("load", sendUserData);
  }, [user, isGuest]);

  const handleIframeMessage = (e: MessageEvent) => {
    if (e.data?.type === "TADARRUJ_LOGOUT") {
      signOut();
    }
    if (e.data?.type === "TADARRUJ_GO_HOME") {
      navigate("/");
    }
  };

  useEffect(() => {
    window.addEventListener("message", handleIframeMessage);
    return () => window.removeEventListener("message", handleIframeMessage);
  }, []);

  if (loading && !isGuest) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <p style={{ color: "#64748b", fontFamily: "'Segoe UI',system-ui,sans-serif" }}>جاري التحميل...</p>
      </div>
    );
  }

  return (
    <iframe
      id="dashboard-iframe"
      src="/dashboard.html"
      title="تدرج | Dashboard"
      style={{ width: "100%", height: "100vh", border: "none", display: "block" }}
    />
  );
};

export default Dashboard;
