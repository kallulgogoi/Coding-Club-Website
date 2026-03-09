"use client";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

function BeybladeTop({
  size = 120,
  speed = 2,
  accent = false,
  className = "",
}) {
  const color = accent ? "#facc15" : "#ffffff";
  const glowColor = accent ? "rgba(250,204,21,0.6)" : "rgba(255,255,255,0.2)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      style={{
        animation: `bey-spin ${speed}s linear infinite`,
        filter: `drop-shadow(0 0 10px ${glowColor})`,
      }}
    >
      <circle
        cx="60"
        cy="60"
        r="56"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        opacity="0.25"
        strokeDasharray="6 4"
      />

      <circle
        cx="60"
        cy="60"
        r="50"
        fill="#1e1e1e"
        stroke={color}
        strokeWidth="1"
        opacity="0.2"
      />

      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 60 60)`}>
          <path
            d="M60 8 L72 54 L60 62 L48 54 Z"
            fill={color}
            opacity={i % 2 === 0 ? "0.95" : "0.45"}
          />
        </g>
      ))}

      <circle
        cx="60"
        cy="60"
        r="28"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.5"
        strokeDasharray="10 6"
      />

      <circle
        cx="60"
        cy="60"
        r="20"
        fill={`${color}18`}
        stroke={color}
        strokeWidth="1.5"
        opacity="0.8"
      />

      {[0, 90, 180, 270].map((angle, i) => (
        <g key={i} transform={`rotate(${angle} 60 60)`}>
          <rect
            x="57"
            y="43"
            width="6"
            height="9"
            rx="1"
            fill={color}
            opacity="0.9"
          />
        </g>
      ))}

      <circle
        cx="60"
        cy="60"
        r="8"
        fill="#282828"
        stroke={color}
        strokeWidth="2"
      />
      <circle cx="60" cy="60" r="4" fill={color} />
      <circle cx="60" cy="60" r="1.5" fill="white" opacity="0.95" />
    </svg>
  );
}

function Sparks() {
  const sparks = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 100}%`,
    dur: 2.5 + (i % 4) * 0.8,
    delay: (i % 5) * 0.7,
    yellow: i % 3 === 0,
  }));

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {sparks.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            width: s.yellow ? 3 : 2,
            height: s.yellow ? 3 : 2,
            borderRadius: "50%",
            left: s.left,
            top: s.top,
            background: s.yellow ? "#facc15" : "rgba(255,255,255,0.4)",
            boxShadow: s.yellow ? "0 0 6px #facc15" : "none",
            animation: `spark-float ${s.dur}s ease-in-out ${s.delay}s infinite alternate`,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

/* ===================== AUTH PAGE ===================== */

export default function AuthPage() {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const iv = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 700);
    }, 5000);

    return () => clearInterval(iv);
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    setIsLoading(true);
    setError(null);

    try {
      const decoded = jwtDecode(credentialResponse.credential);

      const res = await api.post("/auth/google", {
        googleId: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        profilePicture: decoded.picture,
      });

      const { token, user } = res.data;

      Cookies.set("token", token, { expires: 7 });

      if (!user.profileCompleted) {
        router.push("/onboarding");
      } else {
        router.push("/events");
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        err.response?.data?.message ||
          "Authentication failed. Use your @nits.ac.in email.",
      );
    }
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

        @keyframes bey-spin { 
          from{transform:rotate(0deg)} 
          to{transform:rotate(360deg)} 
        }

        @keyframes spark-float {
          0%{transform:translateY(0) scale(1);opacity:.6}
          100%{transform:translateY(-28px) scale(1.8);opacity:0}
        }

        @keyframes gentle-pulse {
          0%,100%{opacity:0.1;transform:translate(-50%,-50%) scale(1)}
          50%{opacity:0.15;transform:translate(-50%,-50%) scale(1.1)}
        }

        .google-btn-container {
          width: 100%;
          min-width: 240px;
          max-width: 320px;
          margin: 0 auto;
        }

        .google-btn-container > div {
          width: 100% !important;
        }

        .google-btn-container iframe {
          width: 100% !important;
          max-width: 100% !important;
        }
      `}</style>

        <Sparks />

        {/* Centered background glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(80vmin, 500px)",
            height: "min(80vmin, 500px)",
            background:
              "radial-gradient(circle at center, rgba(250,204,21,0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            animation: "gentle-pulse 4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Main card */}
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            margin: "0 auto",
            position: "relative",
            zIndex: 10,
            animation: pulse ? "none" : undefined,
          }}
        >
          <div
            style={{
              borderRadius: "24px",
              padding: "clamp(24px, 5vw, 40px) clamp(20px, 4vw, 32px)",
              background: "#111111",
              border: "1px solid rgba(250,204,21,0.15)",
              textAlign: "center",
              position: "relative",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
              backdropFilter: "blur(4px)",
            }}
          >
            {/* Decorative corners - responsive */}
            <div
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                width: "clamp(16px, 3vw, 24px)",
                height: "clamp(16px, 3vw, 24px)",
                borderTop: "2px solid #facc15",
                borderLeft: "2px solid #facc15",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                width: "clamp(16px, 3vw, 24px)",
                height: "clamp(16px, 3vw, 24px)",
                borderTop: "2px solid #facc15",
                borderRight: "2px solid #facc15",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                width: "clamp(16px, 3vw, 24px)",
                height: "clamp(16px, 3vw, 24px)",
                borderBottom: "2px solid #facc15",
                borderLeft: "2px solid #facc15",
                opacity: 0.3,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                width: "clamp(16px, 3vw, 24px)",
                height: "clamp(16px, 3vw, 24px)",
                borderBottom: "2px solid #facc15",
                borderRight: "2px solid #facc15",
                opacity: 0.3,
              }}
            />

            {/* Centered Beyblade */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "clamp(20px, 4vw, 28px)",
              }}
            >
              <BeybladeTop
                size={window.innerWidth < 480 ? 64 : 80}
                speed={1.8}
                accent
              />
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "clamp(28px, 7vw, 36px)",
                fontWeight: 900,
                color: "white",
                marginBottom: "clamp(4px, 1vw, 8px)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              TOWN<span style={{ color: "#facc15" }}>HALL</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "clamp(11px, 2.5vw, 12px)",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                marginBottom: "clamp(28px, 5vw, 36px)",
              }}
            >
              Sign in to continue
            </p>

            {/* Error message */}
            {error && (
              <div
                style={{
                  marginBottom: "20px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "rgba(250,204,21,0.05)",
                  border: "1px solid rgba(250,204,21,0.2)",
                  color: "#facc15",
                  fontSize: "clamp(12px, 2.5vw, 13px)",
                  textAlign: "left",
                  wordBreak: "break-word",
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {/* Google Button Container - Fully Responsive */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "50px",
                width: "100%",
              }}
            >
              {isLoading ? (
                <div style={{ padding: "12px 0" }}>
                  <BeybladeTop size={36} speed={0.6} accent />
                </div>
              ) : (
                <div className="google-btn-container" style={{ width: "100%" }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => setError("Google Login Failed")}
                    theme="filled_black"
                    shape="rectangular"
                    text="continue_with"
                    width="100%"
                    locale="en"
                  />
                </div>
              )}
            </div>

            {/* Email restriction */}
            <p
              style={{
                marginTop: "clamp(20px, 4vw, 24px)",
                fontSize: "clamp(9px, 2vw, 10px)",
                color: "rgba(255,255,255,0.2)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              @nits.ac.in only
            </p>
          </div>
        </div>

        {/* Add window check for SSR */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if (typeof window !== 'undefined') {
              window.updateBeybladeSize = function() {
                const beyblade = document.querySelector('.beyblade-container svg');
                if (beyblade) {
                  const size = window.innerWidth < 480 ? 64 : 80;
                  beyblade.setAttribute('width', size);
                  beyblade.setAttribute('height', size);
                }
              }
              window.addEventListener('resize', window.updateBeybladeSize);
            }
          `,
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
