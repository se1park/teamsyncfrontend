import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Settings,
  User,
  Bell,
  Shield,
  CreditCard,
  Building2,
  ChevronLeft,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import "../styles/SettingsPage.css";

export default function SettingsPage({ onBack }) {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Settings
  const [fullName, setFullName] = useState("김민수");
  const [email, setEmail] = useState("minsu.kim@teamsync.app");
  const [jobTitle, setJobTitle] = useState("Product Manager");
  const [bio, setBio] = useState("열정적인 프로덕트 매니저입니다.");

  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [meetingReminders, setMeetingReminders] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Organization Settings
  const [orgName, setOrgName] = useState("TeamSync");
  const [orgDomain, setOrgDomain] = useState("teamsync");

  const handleSaveProfile = () => {
    toast.success("프로필이 저장되었습니다");
  };

  const handleSaveNotifications = () => {
    toast.success("알림 설정이 저장되었습니다");
  };

  const handleSaveOrganization = () => {
    toast.success("조직 설정이 저장되었습니다");
  };

  return (
    <div className="settings-container">
      <div className="settings-layout">
        {/* Header */}
        <div>
          <button onClick={onBack} className="back-button">
            <ChevronLeft className="icon-sm" />
            대시보드로 돌아가기
          </button>
          <div className="settings-header-content">
            <div className="settings-icon-container">
              <Settings className="icon-lg icon-white" />
            </div>
            <div>
              <h1 className="settings-title">설정</h1>
              <p className="settings-desc">계정 및 조직 설정을 관리하세요</p>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="settings-tabs"
        >
          <TabsList className="glass-card settings-tabs-list">
            <TabsTrigger value="profile" className="settings-tab-trigger">
              <User className="icon-sm" />
              <span className="hidden sm:inline">프로필</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="settings-tab-trigger">
              <Bell className="icon-sm" />
              <span className="hidden sm:inline">알림</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="settings-tab-trigger">
              <Building2 className="icon-sm" />
              <span className="hidden sm:inline">조직</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="settings-tab-trigger">
              <Shield className="icon-sm" />
              <span className="hidden sm:inline">보안</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="settings-tab-trigger">
              <CreditCard className="icon-sm" />
              <span className="hidden sm:inline">요금제</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="tab-content">
            <div className="glass-card settings-card">
              <h2 className="section-title">프로필 정보</h2>

              {/* Avatar */}
              <div className="avatar-section">
                <Avatar className="avatar-large">
                  <AvatarFallback className="avatar-fallback-gradient">
                    KM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="field-label">프로필 사진</h3>
                  <p className="field-desc">PNG, JPG 최대 5MB</p>
                  <div className="photo-actions">
                    <Button variant="outline" className="upload-button">
                      <Upload className="icon-sm" />
                      사진 업로드
                    </Button>
                    <Button variant="outline" className="delete-photo-button">
                      <Trash2 className="icon-sm" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="form-stack">
                <div className="form-grid">
                  <div className="form-group">
                    <Label htmlFor="fullName">이름</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <Label htmlFor="jobTitle">직책</Label>
                    <Input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="bio">자기소개</Label>
                  <Input
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="form-input"
                    placeholder="간단한 자기소개를 입력하세요"
                  />
                </div>
              </div>

              <div className="action-bar">
                <Button variant="outline">취소</Button>
                <Button onClick={handleSaveProfile} className="save-button">
                  <Save className="icon-sm" />
                  저장
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="tab-content">
            <div className="glass-card settings-card">
              <h2 className="section-title">알림 설정</h2>

              <div className="notification-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">이메일 알림</h3>
                    <p className="notification-desc">
                      새로운 메시지와 업데이트를 이메일로 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">푸시 알림</h3>
                    <p className="notification-desc">
                      브라우저 푸시 알림을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">회의 리마인더</h3>
                    <p className="notification-desc">
                      예정된 회의 15분 전에 알림을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={meetingReminders}
                    onCheckedChange={setMeetingReminders}
                  />
                </div>

                <div className="notification-item">
                  <div className="notification-info">
                    <h3 className="notification-title">주간 요약</h3>
                    <p className="notification-desc">
                      매주 월요일 활동 요약을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
              </div>

              <div className="action-bar">
                <Button variant="outline">취소</Button>
                <Button
                  onClick={handleSaveNotifications}
                  className="save-button"
                >
                  <Save className="icon-sm" />
                  저장
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization" className="tab-content">
            <div className="glass-card settings-card">
              <h2 className="section-title">조직 설정</h2>

              <div className="form-stack">
                <div className="form-group">
                  <Label htmlFor="orgName">조직 이름</Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="orgDomain">조직 도메인</Label>
                  <div className="domain-input-group">
                    <Input
                      id="orgDomain"
                      value={orgDomain}
                      onChange={(e) => setOrgDomain(e.target.value)}
                      className="form-input flex-1"
                    />
                    <div className="domain-suffix">.teamsync.app</div>
                  </div>
                  <p className="domain-hint">
                    조직 URL: https://{orgDomain}.teamsync.app
                  </p>
                </div>
              </div>

              <div className="action-bar">
                <Button variant="outline">취소</Button>
                <Button
                  onClick={handleSaveOrganization}
                  className="save-button"
                >
                  <Save className="icon-sm" />
                  저장
                </Button>
              </div>
            </div>

            <div className="glass-card settings-card">
              <h2 className="section-title">위험 영역</h2>
              <div className="danger-zone">
                <h3 className="danger-title">조직 삭제</h3>
                <p className="danger-desc">
                  조직을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
                  되돌릴 수 없습니다.
                </p>
                <Button variant="outline" className="danger-button">
                  <Trash2 className="icon-sm mr-2" />
                  조직 삭제
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="tab-content">
            <div className="glass-card settings-card">
              <h2 className="section-title">보안 설정</h2>

              <div className="security-list">
                <div className="security-item">
                  <h3 className="field-label">비밀번호 변경</h3>
                  <p className="field-desc">
                    정기적으로 비밀번호를 변경하여 계정을 안전하게 보호하세요
                  </p>
                  <Button variant="outline">비밀번호 변경</Button>
                </div>

                <div className="security-item">
                  <h3 className="field-label">2단계 인증</h3>
                  <p className="field-desc">
                    추가 보안 레이어로 계정을 보호하세요
                  </p>
                  <Badge variant="outline" className="badge-active">
                    활성화됨
                  </Badge>
                </div>

                <div className="security-item">
                  <h3 className="field-label">활성 세션</h3>
                  <p className="field-desc">
                    현재 로그인된 모든 기기를 확인하고 관리하세요
                  </p>
                  <Button variant="outline">세션 관리</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="tab-content">
            <div className="glass-card settings-card">
              <h2 className="section-title">요금제 및 결제</h2>

              {/* Current Plan */}
              <div className="plan-card">
                <div className="plan-header">
                  <div>
                    <Badge className="plan-badge">현재 플랜</Badge>
                    <h3 className="plan-name">Premium Plan</h3>
                    <p className="plan-features">
                      무제한 팀, 고급 AI 기능, 우선 지원
                    </p>
                  </div>
                  <div className="plan-price-container">
                    <div className="plan-price">₩29,000</div>
                    <div className="plan-period">/월</div>
                  </div>
                </div>
                <div className="plan-footer">
                  <span className="plan-next-date">
                    다음 결제일: 2024년 12월 28일
                  </span>
                  <Button className="change-plan-button">플랜 변경</Button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="form-stack">
                <h3 className="field-label">결제 수단</h3>
                <div className="payment-method">
                  <div className="card-icon">VISA</div>
                  <div className="card-info">
                    <p className="card-number">•••• •••• •••• 1234</p>
                    <p className="card-expiry">만료: 12/25</p>
                  </div>
                  <Button variant="outline" size="sm">
                    변경
                  </Button>
                </div>
              </div>

              {/* Billing History */}
              <div className="form-stack mt-6">
                <h3 className="field-label">결제 내역</h3>
                <div className="billing-list">
                  {[
                    {
                      date: "2024년 11월 28일",
                      amount: "₩29,000",
                      status: "paid",
                    },
                    {
                      date: "2024년 10월 28일",
                      amount: "₩29,000",
                      status: "paid",
                    },
                    {
                      date: "2024년 9월 28일",
                      amount: "₩29,000",
                      status: "paid",
                    },
                  ].map((item, index) => (
                    <div key={index} className="billing-item">
                      <div>
                        <p className="billing-date">{item.date}</p>
                        <p className="billing-plan">Premium Plan</p>
                      </div>
                      <div className="billing-amount-row">
                        <span className="billing-amount">{item.amount}</span>
                        <Badge className="badge-paid">결제완료</Badge>
                        <Button variant="ghost" size="sm">
                          영수증
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
