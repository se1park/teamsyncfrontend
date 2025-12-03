import { useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Home,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Plus,
  UserPlus,
  Clock,
  Sparkles,
  ChevronDown,
  MoreHorizontal,
  TrendingUp,
  LogOut,
  Building,
  ArrowLeftRight,
} from "lucide-react";
import "../styles/Dashboard.css";

export default function Dashboard({
  onNavigate,
  onOpenCreateTeamModal,
  onOpenInviteMemberModal,
  onNavigateToTeam,
}) {
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);

  const upcomingEvents = [];

  const recentActivities = [];

  const activeRooms = [
    { id: 1, name: "디자인 리뷰", members: 4, unread: 3, team: "디자인팀" },
    { id: 2, name: "스프린트 플래닝", members: 6, unread: 0, team: "개발팀" },
    { id: 3, name: "마케팅 캠페인", members: 5, unread: 7, team: "마케팅팀" },
  ];

  const teamMembers = [
    { id: 1, name: "김민수", role: "Owner", status: "online", avatar: "KM" },
    { id: 2, name: "이지은", role: "Admin", status: "online", avatar: "LJ" },
    { id: 3, name: "박서준", role: "Member", status: "away", avatar: "PS" },
    { id: 4, name: "최유진", role: "Member", status: "offline", avatar: "CY" },
    { id: 5, name: "정수아", role: "Member", status: "online", avatar: "JS" },
  ];

  const teams = [
    { name: "개발팀", members: 8, color: "indigo" },
    { name: "디자인팀", members: 5, color: "blue" },
    { name: "마케팅팀", members: 6, color: "purple" },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="dashboard-sidebar glass-sidebar">
        {/* Organization Header */}
        <div className="sidebar-header">
          <div className="logo-row">
            <div className="logo-wrapper">
              <Sparkles className="icon-md text-white" />
            </div>
            <div className="app-info">
              <h2 className="app-title">TeamSync</h2>
              <p className="app-plan">Premium Plan</p>
            </div>
            <button
              className="dropdown-button"
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
            >
              <ChevronDown className="icon-sm text-slate-600" />
            </button>

            {showTeamDropdown && (
              <div className="team-dropdown-menu glass-card">
                <button className="dropdown-item">
                  <Avatar className="dropdown-avatar">
                    <AvatarFallback className="dropdown-avatar-fallback">
                      KM
                    </AvatarFallback>
                  </Avatar>
                  <div className="dropdown-user-info">
                    <span className="dropdown-user-name">김민수</span>
                    <span className="dropdown-user-email">
                      minsu@teamsync.com
                    </span>
                  </div>
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item">
                  <ArrowLeftRight className="icon-sm" />
                  워크스페이스 전환
                </button>
                <button className="dropdown-item">
                  <Building className="icon-sm" />
                  조직 설정
                </button>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item text-red-600">
                  <LogOut className="icon-sm" />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="nav-menu">
          <button
            onClick={() => onNavigate("dashboard")}
            className="nav-item active"
          >
            <Home className="icon-md" />
            <span>대시보드</span>
          </button>
          <button
            onClick={() => onNavigate("teams")}
            className="nav-item inactive"
          >
            <Users className="icon-md" />
            <span>팀 관리</span>
          </button>
          <button
            onClick={() => onNavigate("chat")}
            className="nav-item inactive"
          >
            <MessageSquare className="icon-md" />
            <span>회의방</span>
            <Badge className="ml-auto bg-indigo-600 text-white">3</Badge>
          </button>
          <button
            onClick={() => onNavigate("calendar")}
            className="nav-item inactive"
          >
            <Calendar className="icon-md" />
            <span>캘린더</span>
          </button>
          <button
            onClick={() => onNavigate("summary")}
            className="nav-item inactive"
          >
            <Sparkles className="icon-md" />
            <span>회의 요약</span>
          </button>
        </nav>

        {/* Teams Section */}
        <div className="teams-section">
          <div className="teams-header">
            <span className="teams-label">팀</span>
            <button className="add-team-button" onClick={onOpenCreateTeamModal}>
              <Plus className="icon-sm text-slate-600" />
            </button>
          </div>
          <div className="team-list">
            {teams.map((team) => (
              <button
                key={team.name}
                onClick={() =>
                  onNavigateToTeam({ name: team.name, color: team.color })
                }
                className="team-item"
              >
                <div className={`team-dot bg-${team.color}-500`}></div>
                <span className="team-name">{team.name}</span>
                <span className="team-count">{team.members}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="settings-section">
          <button
            onClick={() => onNavigate("settings")}
            className="nav-item inactive"
          >
            <Settings className="icon-md" />
            <span>설정</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="header-title">대시보드</h1>
            <p className="header-desc">
              안녕하세요, 오늘도 좋은 하루 되세요! 👋
            </p>
          </div>
          <div className="header-actions">
            <Button
              variant="outline"
              className="gap-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50"
              onClick={onOpenCreateTeamModal}
            >
              <Plus className="icon-sm" />팀 생성
            </Button>
            <Button
              className="gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30"
              onClick={onOpenInviteMemberModal}
            >
              <UserPlus className="icon-sm" />
              멤버 초대
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <button
            onClick={() => onNavigate("calendar")}
            className="stat-card glass-card"
          >
            <div className="stat-header">
              <div className="stat-icon-wrapper bg-indigo-100">
                <Calendar className="icon-md text-indigo-600" />
              </div>
              <TrendingUp className="icon-sm text-green-500" />
            </div>
            <h3 className="stat-value">12</h3>
            <p className="stat-label">예정된 회의</p>
          </button>

          <button
            onClick={() => onNavigate("teams")}
            className="stat-card glass-card"
          >
            <div className="stat-header">
              <div className="stat-icon-wrapper bg-blue-100">
                <Users className="icon-md text-blue-600" />
              </div>
              <TrendingUp className="icon-sm text-green-500" />
            </div>
            <h3 className="stat-value">24</h3>
            <p className="stat-label">팀 멤버</p>
          </button>

          <button
            onClick={() => onNavigate("chat")}
            className="stat-card glass-card"
          >
            <div className="stat-header">
              <div className="stat-icon-wrapper bg-purple-100">
                <MessageSquare className="icon-md text-purple-600" />
              </div>
              <Badge className="bg-purple-600 text-white text-xs">+5</Badge>
            </div>
            <h3 className="stat-value">8</h3>
            <p className="stat-label">활성 회의방</p>
          </button>

          <button
            onClick={() => onNavigate("summary")}
            className="stat-card glass-card"
          >
            <div className="stat-header">
              <div className="stat-icon-wrapper bg-pink-100">
                <Sparkles className="icon-md text-pink-600" />
              </div>
              <span className="text-xs text-slate-600">이번 주</span>
            </div>
            <h3 className="stat-value">18</h3>
            <p className="stat-label">AI 요약 생성</p>
          </button>
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Upcoming Events */}
          <div className="col-span-2 section-card glass-card">
            <div className="section-header">
              <h2 className="section-title">다가오는 일정</h2>
              <Button
                onClick={() => onNavigate("calendar")}
                variant="ghost"
                size="sm"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                전체 보기 →
              </Button>
            </div>
            <div className="event-list">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="event-item">
                  <div className={`event-icon-wrapper bg-${event.color}-100`}>
                    <Calendar className={`w-6 h-6 text-${event.color}-600`} />
                  </div>
                  <div className="event-info">
                    <h3 className="event-title">{event.title}</h3>
                    <div className="event-meta">
                      <span className="event-time">
                        <Clock className="icon-sm" />
                        {event.time}
                      </span>
                      <span>•</span>
                      <span>{event.team}</span>
                    </div>
                  </div>
                  <div className="attendees-preview">
                    <div className="avatar-stack">
                      {[...Array(Math.min(event.attendees, 3))].map((_, i) => (
                        <Avatar
                          key={i}
                          className="w-8 h-8 border-2 border-white"
                        >
                          <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs">
                            {i + 1}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    {event.attendees > 3 && (
                      <span className="text-xs text-slate-600">
                        +{event.attendees - 3}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members */}
          <div className="section-card glass-card">
            <div className="section-header">
              <h2 className="section-title">팀 멤버</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                <UserPlus className="icon-sm" />
              </Button>
            </div>
            <div className="member-list">
              {teamMembers.map((member) => (
                <div key={member.id} className="member-item">
                  <div className="member-avatar-wrapper">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`status-indicator ${
                        member.status === "online"
                          ? "bg-green-500"
                          : member.status === "away"
                          ? "bg-yellow-500"
                          : "bg-slate-300"
                      }`}
                    ></div>
                  </div>
                  <div className="member-info">
                    <p className="member-name">{member.name}</p>
                    <p className="member-role">{member.role}</p>
                  </div>
                  <button className="more-button">
                    <MoreHorizontal className="icon-sm text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Rooms */}
          <div className="col-span-2 section-card glass-card">
            <div className="section-header">
              <h2 className="section-title">활성 회의방</h2>
              <Button
                onClick={() => onNavigate("chat")}
                variant="ghost"
                size="sm"
                className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                전체 보기 →
              </Button>
            </div>
            <div className="room-list">
              {activeRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => onNavigate("chat")}
                  className="room-item"
                >
                  <div className="room-icon-wrapper">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="room-info">
                    <h3 className="room-name">{room.name}</h3>
                    <p className="room-meta">
                      {room.members}명 참여 중 • {room.team}
                    </p>
                  </div>
                  {room.unread > 0 && (
                    <Badge className="bg-indigo-600 text-white">
                      {room.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="section-card glass-card">
            <h2 className="section-title mb-6">최근 활동</h2>
            <div className="activity-list">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-slate-100 text-slate-700 text-xs">
                      {activity.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="activity-content">
                    <p className="activity-text">
                      <span>{activity.user}</span>{" "}
                      <span className="activity-action">{activity.action}</span>
                    </p>
                    <p className="activity-target">{activity.target}</p>
                    <p className="activity-time">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
