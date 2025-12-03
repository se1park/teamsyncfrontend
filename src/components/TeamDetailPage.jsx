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
import "../styles/TeamDetailPage.css";

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
    <div
      className="team-detail-container"
      style={{
        "--theme-100": `var(--${teamColor}-100)`,
        "--theme-500": `var(--${teamColor}-500)`,
        "--theme-600": `var(--${teamColor}-600)`,
      }}
    >
      <div className="team-detail-content">
        {/* Header */}
        <div>
          <button onClick={onBack} className="team-header-back-btn">
            ← 대시보드로 돌아가기
          </button>
          <div className="team-header-row">
            <div className="team-info-group">
              <div className="team-icon-box">
                <div className="team-icon-dot"></div>
              </div>
              <div>
                <h1 className="team-title">{teamName}</h1>
                <p className="team-description">{currentTeam.description}</p>
              </div>
            </div>
            <div className="team-actions">
              <Button
                onClick={onNavigateToChat}
                variant="outline"
                className="gap-2"
              >
                <MessageSquare className="w-4 h-4" />팀 채팅
              </Button>
              <Button className="invite-btn gap-2">
                <Plus className="w-4 h-4" />
                멤버 초대
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="glass-card stats-card">
            <div className="stats-card-header">
              <div className="stats-icon-box theme">
                <Users className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="stats-value">{currentTeam.members.length}</h3>
            <p className="stats-label">팀 멤버</p>
          </div>

          <div className="glass-card stats-card">
            <div className="stats-card-header">
              <div className="stats-icon-box blue">
                <Target className="w-5 h-5" />
              </div>
              <Badge className="bg-blue-600 text-white text-xs">진행중</Badge>
            </div>
            <h3 className="stats-value">{currentTeam.projects.length}</h3>
            <p className="stats-label">진행 프로젝트</p>
          </div>

          <div className="glass-card stats-card">
            <div className="stats-card-header">
              <div className="stats-icon-box purple">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs text-slate-600">이번 주</span>
            </div>
            <h3 className="stats-value">
              {currentTeam.upcomingMeetings.length}
            </h3>
            <p className="stats-label">예정된 회의</p>
          </div>

          <div className="glass-card stats-card">
            <div className="stats-card-header">
              <div className="stats-icon-box pink">
                <BarChart3 className="w-5 h-5" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <h3 className="stats-value">92%</h3>
            <p className="stats-label">평균 진행률</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="tabs-container"
        >
          <TabsList className="glass-card tabs-list">
            <TabsTrigger value="overview" className="tab-trigger">
              <BarChart3 className="w-4 h-4" />
              개요
            </TabsTrigger>
            <TabsTrigger value="members" className="tab-trigger">
              <Users className="w-4 h-4" />
              멤버
            </TabsTrigger>
            <TabsTrigger value="projects" className="tab-trigger">
              <Target className="w-4 h-4" />
              프로젝트
            </TabsTrigger>
            <TabsTrigger value="meetings" className="tab-trigger">
              <Calendar className="w-4 h-4" />
              회의
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="overview-grid">
              {/* Projects */}
              <div className="glass-card section-card">
                <h2 className="section-title">진행 중인 프로젝트</h2>
                <div className="projects-list">
                  {currentTeam.projects.map((project) => (
                    <div key={project.id} className="project-item">
                      <div className="project-header">
                        <h3 className="project-name">{project.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "in-progress"
                              ? "badge-in-progress"
                              : project.status === "review"
                              ? "badge-review"
                              : "badge-planning"
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
                        <div className="project-progress-row">
                          <span className="text-slate-600">진행률</span>
                          <span className="text-slate-900">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="progress-bar-bg">
                          <div
                            className="progress-bar-fill"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Meetings */}
              <div className="glass-card section-card">
                <h2 className="section-title">다가오는 회의</h2>
                <div className="meetings-list">
                  {currentTeam.upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="meeting-item">
                      <h3 className="meeting-title">{meeting.title}</h3>
                      <div className="meeting-info">
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
            <div className="glass-card section-card">
              <h2 className="section-title">최근 활동</h2>
              <div className="activities-list">
                {currentTeam.recentActivities.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <Avatar className="activity-avatar">
                      <AvatarFallback className="activity-avatar-fallback">
                        {activity.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="activity-content">
                      <p className="activity-text">
                        <span>{activity.user}</span>{" "}
                        <span className="text-slate-600">
                          {activity.action}
                        </span>
                      </p>
                      <p className="activity-target">{activity.target}</p>
                      <p className="activity-time">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members" className="space-y-6">
            <div className="glass-card section-card">
              <div className="members-header">
                <div>
                  <h2 className="section-title mb-1">팀 멤버</h2>
                  <p className="text-sm text-slate-600">
                    {currentTeam.members.length}명의 멤버가 있습니다
                  </p>
                </div>
                <div className="members-search-wrapper">
                  <Search className="search-icon" />
                  <Input placeholder="멤버 검색..." className="search-input" />
                </div>
              </div>

              <div className="members-grid">
                {currentTeam.members.map((member) => (
                  <div key={member.id} className="member-card">
                    <div className="member-avatar-wrapper">
                      <Avatar className="member-avatar">
                        <AvatarFallback className="activity-avatar-fallback">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`member-status-dot ${member.status}`}
                      ></div>
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-role">{member.role}</p>
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
            <div className="glass-card section-card">
              <div className="projects-header">
                <h2 className="section-title mb-0">모든 프로젝트</h2>
                <Button className="invite-btn gap-2">
                  <Plus className="w-4 h-4" />새 프로젝트
                </Button>
              </div>
              <div className="projects-list">
                {currentTeam.projects.map((project) => (
                  <div key={project.id} className="project-card-lg">
                    <div className="project-card-header">
                      <div>
                        <h3 className="project-title-lg">{project.name}</h3>
                        <Badge
                          variant="outline"
                          className={
                            project.status === "in-progress"
                              ? "badge-in-progress"
                              : project.status === "review"
                              ? "badge-review"
                              : "badge-planning"
                          }
                        >
                          {project.status === "in-progress"
                            ? "진행중"
                            : project.status === "review"
                            ? "리뷰"
                            : "계획"}
                        </Badge>
                      </div>
                      <span className="project-progress-lg">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="progress-bar-bg mb-4">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="project-footer">
                      <div className="project-participants">
                        <Users className="w-4 h-4" />
                        <span>3명 참여</span>
                      </div>
                      <button className="project-detail-btn">
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
            <div className="glass-card section-card">
              <div className="meetings-header">
                <h2 className="section-title mb-0">팀 회의 일정</h2>
                <Button className="invite-btn gap-2">
                  <Plus className="w-4 h-4" />
                  회의 생성
                </Button>
              </div>
              <div className="meetings-list">
                {currentTeam.upcomingMeetings.map((meeting) => (
                  <div key={meeting.id} className="meeting-card-lg">
                    <div className="meeting-content-lg">
                      <div className="meeting-info-wrapper">
                        <div className="meeting-icon-box">
                          <Calendar className="meeting-icon" />
                        </div>
                        <div>
                          <h3 className="meeting-title-lg">{meeting.title}</h3>
                          <div className="meeting-info">
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
