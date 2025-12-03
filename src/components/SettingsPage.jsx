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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={onBack}
            className="text-sm text-slate-600 hover:text-indigo-600 transition-colors mb-3 flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            대시보드로 돌아가기
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl text-slate-900">설정</h1>
              <p className="text-slate-600">계정 및 조직 설정을 관리하세요</p>
            </div>
          </div>
        </div>

        {/* Settings Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="glass-card p-1 grid grid-cols-5">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">프로필</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">알림</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">조직</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">보안</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">요금제</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">프로필 정보</h2>

              {/* Avatar */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-slate-200">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-2xl">
                    KM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-slate-900 mb-1">프로필 사진</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    PNG, JPG 최대 5MB
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Upload className="w-4 h-4" />
                      사진 업로드
                    </Button>
                    <Button
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">이름</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="h-12 bg-white border-slate-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">직책</Label>
                    <Input
                      id="jobTitle"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="h-12 bg-white border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-white border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">자기소개</Label>
                  <Input
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="h-12 bg-white border-slate-200"
                    placeholder="간단한 자기소개를 입력하세요"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                <Button variant="outline">취소</Button>
                <Button
                  onClick={handleSaveProfile}
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                >
                  <Save className="w-4 h-4" />
                  저장
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">알림 설정</h2>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100">
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">이메일 알림</h3>
                    <p className="text-sm text-slate-600">
                      새로운 메시지와 업데이트를 이메일로 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100">
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">푸시 알림</h3>
                    <p className="text-sm text-slate-600">
                      브라우저 푸시 알림을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100">
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">회의 리마인더</h3>
                    <p className="text-sm text-slate-600">
                      예정된 회의 15분 전에 알림을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={meetingReminders}
                    onCheckedChange={setMeetingReminders}
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-100">
                  <div className="flex-1">
                    <h3 className="text-slate-900 mb-1">주간 요약</h3>
                    <p className="text-sm text-slate-600">
                      매주 월요일 활동 요약을 받습니다
                    </p>
                  </div>
                  <Switch
                    checked={weeklyDigest}
                    onCheckedChange={setWeeklyDigest}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                <Button variant="outline">취소</Button>
                <Button
                  onClick={handleSaveNotifications}
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                >
                  <Save className="w-4 h-4" />
                  저장
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Organization Tab */}
          <TabsContent value="organization" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">조직 설정</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="orgName">조직 이름</Label>
                  <Input
                    id="orgName"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="h-12 bg-white border-slate-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orgDomain">조직 도메인</Label>
                  <div className="flex gap-2">
                    <Input
                      id="orgDomain"
                      value={orgDomain}
                      onChange={(e) => setOrgDomain(e.target.value)}
                      className="h-12 bg-white border-slate-200 flex-1"
                    />
                    <div className="h-12 px-4 flex items-center bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-600">
                      .teamsync.app
                    </div>
                  </div>
                  <p className="text-xs text-slate-600">
                    조직 URL: https://{orgDomain}.teamsync.app
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                <Button variant="outline">취소</Button>
                <Button
                  onClick={handleSaveOrganization}
                  className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
                >
                  <Save className="w-4 h-4" />
                  저장
                </Button>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-4">위험 영역</h2>
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <h3 className="text-red-900 mb-2">조직 삭제</h3>
                <p className="text-sm text-red-700 mb-4">
                  조직을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은
                  되돌릴 수 없습니다.
                </p>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  조직 삭제
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">보안 설정</h2>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white border border-slate-100">
                  <h3 className="text-slate-900 mb-2">비밀번호 변경</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    정기적으로 비밀번호를 변경하여 계정을 안전하게 보호하세요
                  </p>
                  <Button variant="outline">비밀번호 변경</Button>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-100">
                  <h3 className="text-slate-900 mb-2">2단계 인증</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    추가 보안 레이어로 계정을 보호하세요
                  </p>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    활성화됨
                  </Badge>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-100">
                  <h3 className="text-slate-900 mb-2">활성 세션</h3>
                  <p className="text-sm text-slate-600 mb-4">
                    현재 로그인된 모든 기기를 확인하고 관리하세요
                  </p>
                  <Button variant="outline">세션 관리</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-6">요금제 및 결제</h2>

              {/* Current Plan */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="bg-white/20 text-white border-white/30 mb-3">
                      현재 플랜
                    </Badge>
                    <h3 className="text-2xl mb-2">Premium Plan</h3>
                    <p className="text-indigo-100">
                      무제한 팀, 고급 AI 기능, 우선 지원
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl mb-1">₩29,000</div>
                    <div className="text-indigo-100 text-sm">/월</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <span className="text-indigo-100 text-sm">
                    다음 결제일: 2024년 12월 28일
                  </span>
                  <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                    플랜 변경
                  </Button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="text-slate-900">결제 수단</h3>
                <div className="p-4 rounded-xl bg-white border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-slate-900 flex items-center justify-center text-white text-xs">
                    VISA
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-900">•••• •••• •••• 1234</p>
                    <p className="text-sm text-slate-600">만료: 12/25</p>
                  </div>
                  <Button variant="outline" size="sm">
                    변경
                  </Button>
                </div>
              </div>

              {/* Billing History */}
              <div className="space-y-4 mt-6">
                <h3 className="text-slate-900">결제 내역</h3>
                <div className="space-y-2">
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
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white border border-slate-100 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-slate-900">{item.date}</p>
                        <p className="text-sm text-slate-600">Premium Plan</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-900">{item.amount}</span>
                        <Badge className="bg-green-50 text-green-700 border-green-200">
                          결제완료
                        </Badge>
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
