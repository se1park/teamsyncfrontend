import { useState } from "react";
import { Sparkles, Users, Calendar, MessageSquare } from "lucide-react";
import "../styles/AuthScreen.css";
import axios from "axios";

export default function AuthScreen({ onLogin }) {
  const [authMode, setAuthMode] = useState("login"); // "login", "signup", "forgot-password"

  // 단계 관리
  const [resetStep, setResetStep] = useState(0); // 비밀번호 찾기 단계
  const [signupStep, setSignupStep] = useState(0); // 회원가입 단계 (0:Email, 1:Code, 2:Info)

  // 입력 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState(""); // 조직명

  // 인증 및 변경 관련 상태
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ★ [핵심 수정] 전역 인터셉터(Authorization 헤더 자동 주입)의 영향을 받지 않는
  // 깨끗한 Axios 인스턴스를 생성합니다.
  const publicApi = axios.create();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ----------------------------------------------------
      // 1. 로그인
      // ----------------------------------------------------
      if (authMode === "login") {
        // publicApi 사용 (토큰 없이 요청)
        const res = await publicApi.post("/api/auth/login", {
          email,
          password,
        });

        console.log("로그인 성공:", res.data);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        localStorage.setItem("userName", res.data.name);
        localStorage.setItem("userEmail", res.data.email);

        onLogin();
      }
      // ----------------------------------------------------
      // 2. 회원가입 (단계별)
      // ----------------------------------------------------
      else if (authMode === "signup") {
        // Step 0: 인증 코드 전송 요청
        if (signupStep === 0) {
          // publicApi 사용
          // ※ 주의: 백엔드 주소가 /api/auth/code/send 인지 /api/auth/send-code 인지 확인 필요
          // 작성해주신 코드 기반으로 /api/auth/send-code 로 요청합니다.
          await publicApi.post("/api/auth/send-code", { email });
          alert(`[${email}]로 인증 코드가 발송되었습니다.`);
          setSignupStep(1);
        }

        // Step 1: 인증 코드 검증 (verify-code)
        else if (signupStep === 1) {
          // publicApi 사용 -> 헤더 간섭 없이 전송
          await publicApi.post("/api/auth/verify-code", {
            email,
            code: verificationCode,
          });

          alert("이메일 인증이 완료되었습니다. 정보를 입력해주세요.");
          setSignupStep(2);
        }

        // Step 2: 최종 회원가입 요청 (signup)
        else if (signupStep === 2) {
          // publicApi 사용
          const res = await publicApi.post("/api/auth/signup", {
            email,
            name,
            organization,
            password,
          });

          console.log("회원가입 성공:", res.data);
          alert("회원가입 완료! 로그인 해주세요.");

          // 로그인 화면으로 복귀 및 초기화
          setAuthMode("login");
          setSignupStep(0);
          setVerificationCode("");
          setOrganization("");
          setName("");
          setPassword("");
        }
      }
      // ----------------------------------------------------
      // 3. 비밀번호 찾기 (단계별)
      // ----------------------------------------------------
      else if (authMode === "forgot-password") {
        // Step 0: 인증 코드 전송
        if (resetStep === 0) {
          await publicApi.post("/api/auth/password/send", { email });
          alert("인증 코드가 이메일로 발송되었습니다.");
          setResetStep(1);
        }
        // Step 1: 인증 코드 검증
        else if (resetStep === 1) {
          await publicApi.post("/api/auth/password/verify", {
            email,
            code: verificationCode,
          });
          alert("인증되었습니다. 새 비밀번호를 설정해주세요.");
          setResetStep(2);
        }
        // Step 2: 비밀번호 변경
        else if (resetStep === 2) {
          if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
          }
          await publicApi.post("/api/auth/password/change", {
            email,
            code: verificationCode,
            newPassword,
          });

          alert("비밀번호가 변경되었습니다. 로그인해주세요.");
          setAuthMode("login");
          setResetStep(0);
          setVerificationCode("");
        }
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === "string"
          ? err.response?.data
          : "오류가 발생했습니다.");
      alert(errorMessage);
    }
  };

  // --- UI Helper Functions ---

  const getTitle = () => {
    if (authMode === "login") return "로그인";

    if (authMode === "signup") {
      if (signupStep === 0) return "회원가입";
      if (signupStep === 1) return "이메일 인증";
      if (signupStep === 2) return "정보 입력";
    }

    if (authMode === "forgot-password") {
      if (resetStep === 0) return "비밀번호 찾기";
      if (resetStep === 1) return "인증 코드 입력";
      if (resetStep === 2) return "새 비밀번호 설정";
    }
    return "로그인";
  };

  const getSubtitle = () => {
    if (authMode === "login") return "계정으로 로그인하세요";

    if (authMode === "signup") {
      if (signupStep === 0) return "새로운 계정을 만드세요";
      if (signupStep === 1) return "이메일로 전송된 코드를 입력하세요";
      if (signupStep === 2) return "조직 정보를 입력하세요";
    }

    if (authMode === "forgot-password") {
      if (resetStep === 0) return "가입한 이메일로 인증 코드를 보냅니다";
      if (resetStep === 1) return "전송된 코드를 입력하세요";
      if (resetStep === 2) return "변경할 비밀번호를 입력하세요";
    }
    return "";
  };

  const getSubmitButtonText = () => {
    if (authMode === "login") return "로그인";

    if (authMode === "signup") {
      if (signupStep === 0) return "인증 코드 전송";
      if (signupStep === 1) return "인증하기";
      if (signupStep === 2) return "조직 생성하기";
    }

    if (authMode === "forgot-password") {
      if (resetStep === 0) return "인증 코드 전송";
      if (resetStep === 1) return "인증하기";
      if (resetStep === 2) return "비밀번호 변경 완료";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-grid">
        {/* Left Side - Branding */}
        <div className="auth-branding">
          <div className="auth-branding-content">
            <div className="brand-header">
              <div className="brand-logo-large">
                <div className="logo-icon-box">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h1 className="brand-title">TeamSync</h1>
              </div>
              <p className="brand-subtitle">
                AI 기반 협업 플랫폼으로
                <br />
                팀의 생산성을 극대화하세요
              </p>
            </div>

            <div className="feature-cards">
              <div className="glass-card feature-card">
                <div className="feature-content">
                  <div className="feature-icon-box bg-indigo-100">
                    <MessageSquare className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="feature-text">
                    <h3>스마트 회의실</h3>
                    <p>채팅 중 일정을 자동 감지</p>
                  </div>
                </div>
              </div>

              <div className="glass-card feature-card">
                <div className="feature-content">
                  <div className="feature-icon-box bg-blue-100">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="feature-text">
                    <h3>AI 일정 생성</h3>
                    <p>자동으로 일정과 할 일 정리</p>
                  </div>
                </div>
              </div>

              <div className="glass-card feature-card">
                <div className="feature-content">
                  <div className="feature-icon-box bg-purple-100">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="feature-text">
                    <h3>팀 협업</h3>
                    <p>조직과 팀을 효율적으로 관리</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="glass-card auth-form-card">
          <div className="mobile-brand">
            <div className="mobile-brand-content">
              <div className="logo-icon-box-sm">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="mobile-brand-title">TeamSync</h1>
            </div>
          </div>

          <div className="form-header">
            <h2 className="form-title">{getTitle()}</h2>
            <p className="form-subtitle">{getSubtitle()}</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* --- 1. 이메일 입력 (공통) --- */}
            {(authMode === "login" ||
              (authMode === "signup" && signupStep === 0) ||
              (authMode === "forgot-password" && resetStep === 0)) && (
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            )}

            {/* --- 2. 인증 코드 입력 (공통) --- */}
            {((authMode === "signup" && signupStep === 1) ||
              (authMode === "forgot-password" && resetStep === 1)) && (
              <div className="form-group">
                <div className="flex justify-between mb-1">
                  <label className="form-label">이메일</label>
                  <span className="text-xs text-gray-500">{email}</span>
                </div>
                <label htmlFor="verificationCode" className="form-label">
                  인증 코드
                </label>
                <input
                  id="verificationCode"
                  type="text"
                  placeholder="인증 코드 6자리"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            )}

            {/* --- 3. 로그인 모드 전용 (비밀번호) --- */}
            {authMode === "login" && (
              <div className="form-group">
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="form-label mb-0">
                    비밀번호
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("forgot-password");
                      setResetStep(0);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    비밀번호 찾기
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            )}

            {/* --- 4. 회원가입 최종 정보 입력 (Step 2) --- */}
            {authMode === "signup" && signupStep === 2 && (
              <>
                <div className="form-group">
                  <label className="form-label">이메일</label>
                  <input
                    type="text"
                    value={email}
                    disabled
                    className="form-input bg-gray-50 text-gray-500"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    비밀번호
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    사용자명
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="사용자명"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="organization" className="form-label">
                    조직(회사)명
                  </label>
                  <input
                    id="organization"
                    type="text"
                    placeholder="예: TeamSync Corp"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </>
            )}

            {/* --- 5. 비밀번호 재설정 최종 입력 (Step 2) --- */}
            {authMode === "forgot-password" && resetStep === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="newPassword" className="form-label">
                    새 비밀번호
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="새로운 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="form-label">
                    비밀번호 확인
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="비밀번호 다시 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
              </>
            )}

            <button type="submit" className="submit-button">
              {getSubmitButtonText()}
            </button>
          </form>

          <div className="divider">
            <div className="divider-line">
              <div className="divider-border"></div>
            </div>
            <div className="divider-text-wrapper">
              <span className="divider-text">또는</span>
            </div>
          </div>

          <div className="toggle-auth-wrapper text-center">
            {authMode === "login" ? (
              <button
                onClick={() => {
                  setAuthMode("signup");
                  setSignupStep(0);
                }}
                className="toggle-auth-button"
              >
                계정이 없으신가요?{" "}
                <span className="text-highlight">회원가입</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setResetStep(0);
                  setSignupStep(0);
                }}
                className="toggle-auth-button"
              >
                이미 계정이 있으신가요?{" "}
                <span className="text-highlight">로그인</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
