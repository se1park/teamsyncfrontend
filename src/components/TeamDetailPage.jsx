import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Calendar,
  Clock,
  MessageSquare,
  Users,
  Plus,
  Search,
  TrendingUp,
  BarChart3,
  Target,
  ChevronRight,
} from "lucide-react";

export default function TeamDetailPage({
  teamName,
  teamColor,
  onBack,
  onNavigateToChat,
}) {
  const [activeTab, setActiveTab] = useState("overview");

  // 팀별 데이터
  const teamData = {
    개발팀: {
      description: "프론트엔드 & 백엔드 개발",
      members: [
        {
          id: 1,
          name: "김민수",
          role: "Team Lead",
          avatar: "KM",
          status: "online",
        },
        {
          id: 2,
          name: "박서준",
          role: "Frontend Developer",
          avatar: "PS",
          status: "online",
        },
        {
          id: 3,
          name: "강동원",
          role: "Backend Developer",
          avatar: "KD",
          status: "away",
        },
        {
          id: 4,
          name: "정우성",
          role: "Full Stack Developer",
          avatar: "JW",
          status: "online",
        },
      ],
      projects: [
        {
          id: 1,
          name: "신규 랜딩 페이지",
          progress: 75,
          status: "in-progress",
        },
        { id: 2, name: "API 리팩토링", progress: 40, status: "in-progress" },
        { id: 3, name: "모바일 앱 개발", progress: 20, status: "planning" },
      ],
      upcomingMeetings: [
        {
          id: 1,
          title: "주간 스프린트 회의",
          date: "오늘 오후 2:00",
          room: "개발팀 회의실",
        },
        { id: 2, title: "코드 리뷰", date: "내일 오전 10:00", room: "온라인" },
      ],
      recentActivities: [
        {
          user: "김민수",
          action: "PR을 머지했습니다",
          target: "#142 - 로그인 기능 개선",
          time: "10분 전",
        },
        {
          user: "박서준",
          action: "이슈를 생성했습니다",
          target: "#143 - UI 버그 수정",
          time: "1시간 전",
        },
        {
          user: "강동원",
          action: "코드를 커밋했습니다",
          target: "feat: Add user profile API",
          time: "2시간 전",
        },
      ],
    },
    디자인팀: {
      description: "UI/UX 디자인 및 브랜딩",
      members: [
        {
          id: 1,
          name: "이지은",
          role: "Design Lead",
          avatar: "LJ",
          status: "online",
        },
        {
          id: 2,
          name: "최유진",
          role: "UI Designer",
          avatar: "CY",
          status: "online",
        },
        {
          id: 3,
          name: "송혜교",
          role: "UX Designer",
          avatar: "SH",
          status: "away",
        },
        {
          id: 4,
          name: "한소희",
          role: "Product Designer",
          avatar: "HS",
          status: "offline",
        },
      ],
      projects: [
        {
          id: 1,
          name: "디자인 시스템 구축",
          progress: 85,
          status: "in-progress",
        },
        {
          id: 2,
          name: "모바일 UI 리뉴얼",
          progress: 60,
          status: "in-progress",
        },
        { id: 3, name: "브랜드 가이드라인", progress: 95, status: "review" },
      ],
      upcomingMeetings: [
        {
          id: 1,
          title: "디자인 리뷰",
          date: "오늘 오후 4:00",
          room: "3층 회의실",
        },
        {
          id: 2,
          title: "사용자 테스트 결과 공유",
          date: "금요일 오전 11:00",
          room: "디자인팀 회의실",
        },
      ],
      recentActivities: [
        {
          user: "이지은",
          action: "디자인 파일을 업로드했습니다",
          target: "모바일 메인화면 v2",
          time: "30분 전",
        },
        {
          user: "최유진",
          action: "피드백을 남겼습니다",
          target: "프로필 페이지 디자인",
          time: "1시간 전",
        },
        {
          user: "송혜교",
          action: "프로토타입을 공유했습니다",
          target: "온보딩 플로우",
          time: "3시간 전",
        },
      ],
    },
    마케팅팀: {
      description: "마케팅 & 콘텐츠 제작",
      members: [
        {
          id: 1,
          name: "정수아",
          role: "Marketing Lead",
          avatar: "JS",
          status: "online",
        },
        {
          id: 2,
          name: "윤아라",
          role: "Content Manager",
          avatar: "YA",
          status: "online",
        },
        {
          id: 3,
          name: "김태희",
          role: "Social Media Manager",
          avatar: "KT",
          status: "online",
        },
        {
          id: 4,
          name: "전지현",
          role: "Marketing Analyst",
          avatar: "JJ",
          status: "away",
        },
      ],
      projects: [
        {
          id: 1,
          name: "신규 캠페인 런칭",
          progress: 70,
          status: "in-progress",
        },
        {
          id: 2,
          name: "콘텐츠 캘린더 작성",
          progress: 90,
          status: "in-progress",
        },
        { id: 3, name: "SNS 전략 수립", progress: 50, status: "planning" },
      ],
      upcomingMeetings: [
        {
          id: 1,
          title: "마케팅 전략 회의",
          date: "내일 오후 3:00",
          room: "4층 회의실",
        },
        {
          id: 2,
          title: "월간 성과 리뷰",
          date: "금요일 오후 2:00",
          room: "마케팅팀 회의실",
        },
      ],
      recentActivities: [
        {
          user: "정수아",
          action: "캠페인을 승인했습니다",
          target: "가을 프로모션",
          time: "20분 전",
        },
        {
          user: "윤아라",
          action: "블로그 포스트를 작성했습니다",
          target: "제품 업데이트 소식",
          time: "1시간 전",
        },
        {
          user: "김태희",
          action: "SNS 게시물을 업로드했습니다",
          target: "인스타그램 릴스",
          time: "2시간 전",
        },
      ],
    },
  };

  const currentTeam = teamData[teamName] || teamData["개발팀"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <button
            onClick={onBack}
            className="text-sm text-slate-600 hover:text-indigo-600 transition-colors mb-3"
          >
            ← 대시보드로 돌아가기
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl bg-${teamColor}-100 flex items-center justify-center`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-${teamColor}-500`}
                ></div>
              </div>
              <div>
                <h1 className="text-3xl text-slate-900">{teamName}</h1>
                <p className="text-slate-600">{currentTeam.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={onNavigateToChat}
                variant="outline"
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />팀 채팅
              </Button>
              <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30">
                <Plus className="w-4 h-4" />
                멤버 초대
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-${teamColor}-100 flex items-center justify-center`}
              >
                <Users className={`w-5 h-5 text-${teamColor}-600`} />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-2xl text-slate-900 mb-1">
              {currentTeam.members.length}
            </h3>
            <p className="text-sm text-slate-600">팀 멤버</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <Badge className="bg-blue-600 text-white text-xs">진행중</Badge>
            </div>
            <h3 className="text-2xl text-slate-900 mb-1">
              {currentTeam.projects.length}
            </h3>
            <p className="text-sm text-slate-600">진행 프로젝트</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <span className="text-xs text-slate-600">이번 주</span>
            </div>
            <h3 className="text-2xl text-slate-900 mb-1">
              {currentTeam.upcomingMeetings.length}
            </h3>
            <p className="text-sm text-slate-600">예정된 회의</p>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-pink-600" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="text-2xl text-slate-900 mb-1">92%</h3>
            <p className="text-sm text-slate-600">평균 진행률</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="glass-card p-1">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              개요
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="w-4 h-4" />
              멤버
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Target className="w-4 h-4" />
              프로젝트
            </TabsTrigger>
            <TabsTrigger value="meetings" className="gap-2">
              <Calendar className="w-4 h-4" />
              회의
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Projects */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl text-slate-900 mb-4">
                  진행 중인 프로젝트
                </h2>
                <div className="space-y-4">
                  {currentTeam.projects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-slate-900">{project.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "in-progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : project.status === "review"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }
                        >
                          {project.status === "in-progress"
                            ? "진행중"
                            : project.status === "review"
                            ? "리뷰"
                            : "계획"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">진행률</span>
                          <span className="text-slate-900">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r from-${teamColor}-500 to-${teamColor}-600 h-2 rounded-full transition-all`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Meetings */}
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-xl text-slate-900 mb-4">다가오는 회의</h2>
                <div className="space-y-3">
                  {currentTeam.upcomingMeetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer"
                    >
                      <h3 className="text-slate-900 mb-2">{meeting.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {meeting.date}
                        </span>
                        <span>•</span>
                        <span>{meeting.room}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-xl text-slate-900 mb-4">최근 활동</h2>
              <div className="space-y-4">
                {currentTeam.recentActivities.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarFallback
                        className={`bg-gradient-to-br from-${teamColor}-500 to-${teamColor}-600 text-white`}
                      >
                        {activity.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 mb-0.5">
                        <span>{activity.user}</span>{" "}
                        <span className="text-slate-600">
                          {activity.action}
                        </span>
                      </p>
                      <p className="text-sm text-indigo-600 mb-1">
                        {activity.target}
                      </p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl text-slate-900 mb-1">팀 멤버</h2>
                  <p className="text-sm text-slate-600">
                    {currentTeam.members.length}명의 멤버가 있습니다
                  </p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="멤버 검색..."
                    className="pl-10 w-64 bg-white border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTeam.members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all"
                  >
                    <div className="relative">
                      <Avatar className="w-14 h-14">
                        <AvatarFallback
                          className={`bg-gradient-to-br from-${teamColor}-500 to-${teamColor}-600 text-white`}
                        >
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          member.status === "online"
                            ? "bg-green-500"
                            : member.status === "away"
                            ? "bg-yellow-500"
                            : "bg-slate-300"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-slate-900 mb-1">{member.name}</h3>
                      <p className="text-sm text-slate-600">{member.role}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-slate-900">모든 프로젝트</h2>
                <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30">
                  <Plus className="w-4 h-4" />새 프로젝트
                </Button>
              </div>
              <div className="space-y-4">
                {currentTeam.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-6 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg text-slate-900 mb-2">
                          {project.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "in-progress"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : project.status === "review"
                              ? "bg-purple-50 text-purple-700 border-purple-200"
                              : "bg-slate-50 text-slate-700 border-slate-200"
                          }
                        >
                          {project.status === "in-progress"
                            ? "진행중"
                            : project.status === "review"
                            ? "리뷰"
                            : "계획"}
                        </Badge>
                      </div>
                      <span className="text-2xl text-slate-900">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
                      <div
                        className={`bg-gradient-to-r from-${teamColor}-500 to-${teamColor}-600 h-3 rounded-full transition-all`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4" />
                        <span>3명 참여</span>
                      </div>
                      <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700">
                        자세히 보기
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-slate-900">팀 회의 일정</h2>
                <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30">
                  <Plus className="w-4 h-4" />
                  회의 생성
                </Button>
              </div>
              <div className="space-y-4">
                {currentTeam.upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="p-6 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl bg-${teamColor}-100 flex items-center justify-center`}
                        >
                          <Calendar
                            className={`w-6 h-6 text-${teamColor}-600`}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg text-slate-900 mb-2">
                            {meeting.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {meeting.date}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {meeting.room}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        참여하기
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
