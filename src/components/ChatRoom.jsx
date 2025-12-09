import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  Settings,
  Users,
  Hash,
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Edit,
  FileText,
  ChevronRight,
  Menu, // 추가됨: 모바일 왼쪽 메뉴 아이콘
  PanelRight, // 추가됨: 모바일 오른쪽 메뉴 아이콘
} from "lucide-react";
import { toast } from "sonner";
import "../styles/ChatRoom.css";

export default function ChatRoom({ onBack, onOpenCreateScheduleModal }) {
  const [message, setMessage] = useState("");
  const [showAISuggestion, setShowAISuggestion] = useState(true);
  const [showAISummary, setShowAISummary] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  // ★ 반응형 제어를 위한 상태 추가
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  const rooms = [
    { id: 1, name: "디자인 리뷰", team: "디자인팀", unread: 0 },
    { id: 2, name: "스프린트 플래닝", team: "개발팀", unread: 3 },
    { id: 3, name: "마케팅 캠페인", team: "마케팅팀", unread: 7 },
    { id: 4, name: "주간 미팅", team: "전체", unread: 0 },
  ];

  const messages = [
    {
      id: 1,
      user: "김민수",
      avatar: "KM",
      message: "안녕하세요! 이번 주 프로젝트 진행 상황 공유드립니다.",
      time: "오전 10:30",
      isMe: false,
    },
    {
      id: 2,
      user: "이지은",
      avatar: "LJ",
      message: "네, 좋습니다. 디자인 작업은 거의 완료되었어요.",
      time: "오전 10:32",
      isMe: false,
    },
    {
      id: 3,
      user: "나",
      avatar: "ME",
      message:
        "그럼 내일 오후 2시에 회의실에서 만나서 최종 리뷰 진행하면 어떨까요?",
      time: "오전 10:35",
      isMe: true,
    },
    {
      id: 4,
      user: "박서준",
      avatar: "PS",
      message: "좋아요! 참석자는 김민수님, 이지은님, 저 이렇게 3명이면 될까요?",
      time: "오전 10:36",
      isMe: false,
    },
    {
      id: 5,
      user: "최유진",
      avatar: "CY",
      message: "저도 참여하고 싶어요. 4명으로 진행해요.",
      time: "오전 10:37",
      isMe: false,
    },
    {
      id: 6,
      user: "김민수",
      avatar: "KM",
      message: "확인했습니다. 그럼 내일 오후 2시에 3층 회의실에서 봬요!",
      time: "오전 10:38",
      isMe: false,
    },
  ];

  const aiSuggestion = {
    title: "최종 프로젝트 리뷰 회의",
    date: "2024년 11월 29일",
    time: "오후 2:00",
    location: "3층 회의실",
    attendees: ["김민수", "이지은", "박서준", "최유진"],
    tasks: [
      "디자인 최종 검토",
      "개발 진행 상황 공유",
      "다음 스프린트 계획 수립",
    ],
  };

  const aiSummary = {
    title: "디자인 리뷰 회의 요약",
    date: "2024년 11월 28일 오전 10:00 - 11:00",
    attendees: 4,
    keyPoints: [
      "신규 랜딩 페이지 디자인 최종 승인",
      "모바일 반응형 디자인 수정 필요",
      "A/B 테스트 계획 수립",
    ],
    decisions: [
      "랜딩 페이지 메인 컬러를 인디고로 변경",
      "다음 주 월요일까지 모바일 디자인 완료",
    ],
    tasks: [
      { assignee: "이지은", task: "모바일 디자인 수정", dueDate: "12월 2일" },
      {
        assignee: "김민수",
        task: "A/B 테스트 계획서 작성",
        dueDate: "12월 1일",
      },
      {
        assignee: "박서준",
        task: "개발 일정 업데이트",
        dueDate: "11월 30일",
      },
    ],
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      toast.success("메시지가 전송되었습니다");
      setMessage("");
    }
  };

  const handleCreateRoom = () => {
    toast.success("새 회의방 만들기 기능은 준비 중입니다");
  };

  const handleShowParticipants = () => {
    setShowParticipants(!showParticipants);
    if (!showParticipants) {
      toast.info("참여자 목록을 표시합니다");
    }
  };

  const handleSettings = () => {
    toast.info("회의방 설정");
  };

  const handleAttachFile = () => {
    toast.info("파일 첨부 기능");
  };

  const handleAddEmoji = () => {
    toast.info("이모지 선택");
  };

  const handleEditSchedule = () => {
    toast.info("AI 제안을 수정합니다");
  };

  const handleViewFullSummary = () => {
    toast.success("전체 회의 요약으로 이동합니다");
  };

  const handleCreateSchedule = () => {
    onOpenCreateScheduleModal?.();
  };

  const handleEndMeeting = () => {
    toast.success("회의를 종료하고 AI 요약을 생성합니다");
    setTimeout(() => {
      setShowAISummary(true);
    }, 500);
  };

  return (
    <div className="chat-room-container">
      {/* ★ 모바일용 오버레이 (사이드바 열렸을 때 배경 어둡게 처리) */}
      {(isLeftSidebarOpen || isRightSidebarOpen) && (
        <div
          className="mobile-overlay visible"
          onClick={() => {
            setIsLeftSidebarOpen(false);
            setIsRightSidebarOpen(false);
          }}
        />
      )}

      <div className="chat-layout">
        {/* Left Sidebar - Room List */}
        {/* 모바일 상태 클래스 추가 */}
        <aside
          className={`chat-sidebar glass-sidebar ${
            isLeftSidebarOpen ? "mobile-open" : ""
          }`}
        >
          {/* 모바일용 닫기 버튼 */}
          <button
            className="mobile-close-btn md:hidden"
            onClick={() => setIsLeftSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>

          <div className="sidebar-header">
            <button onClick={onBack} className="back-button">
              ← 대시보드로 돌아가기
            </button>
            <div className="sidebar-title-row">
              <h2 className="sidebar-title">회의방</h2>
              <Button
                size="sm"
                onClick={handleCreateRoom}
                className="new-chat-button"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="room-list">
            {rooms.map((room) => (
              <button
                key={room.id}
                className={`room-item ${room.id === 1 ? "active" : "inactive"}`}
                onClick={() => setIsLeftSidebarOpen(false)} // 모바일에서 방 선택 시 메뉴 닫기
              >
                <div className="room-item-content">
                  <div className="room-icon-box">
                    <Hash className="w-5 h-5 text-white" />
                  </div>
                  <div className="room-info">
                    <h3 className="room-name">{room.name}</h3>
                    <p className="room-team">{room.team}</p>
                  </div>
                  {room.unread > 0 && (
                    <Badge className="unread-badge">{room.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="sidebar-footer">
            <button
              onClick={() => {
                setShowAISummary(!showAISummary);
                setIsLeftSidebarOpen(false);
              }}
              className="ai-summary-button"
            >
              <div className="ai-summary-header">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="ai-summary-title">AI 회의 요약</span>
              </div>
              <p className="ai-summary-desc">최근 회의 요약을 확인하세요</p>
            </button>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="chat-main">
          {/* Chat Header */}
          <header className="chat-header glass-card">
            <div className="chat-header-content">
              <div className="chat-header-info">
                {/* ★ 모바일용 왼쪽 사이드바 토글 버튼 */}
                <button
                  className="mobile-menu-btn"
                  onClick={() => setIsLeftSidebarOpen(true)}
                >
                  <Menu className="w-6 h-6 text-slate-700" />
                </button>

                <div className="chat-header-icon">
                  <Hash className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="chat-title">디자인 리뷰</h1>
                  <p className="chat-subtitle">디자인팀 • 4명 참여 중</p>
                </div>
              </div>
              <div className="chat-header-actions">
                {/* 모바일에서는 '참여자' 텍스트 숨김 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 hidden sm:flex"
                  onClick={handleShowParticipants}
                >
                  <Users className="w-4 h-4" />
                  참여자
                </Button>

                {/* ★ 모바일용 오른쪽 AI 사이드바 토글 버튼 */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setIsRightSidebarOpen(true)}
                >
                  <PanelRight className="w-5 h-5 text-indigo-600" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSettings}
                  className="hidden sm:flex"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Messages */}
          <div className="messages-area">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message-row ${msg.isMe ? "me" : "others"}`}
              >
                {!msg.isMe && (
                  <Avatar className="message-avatar">
                    <AvatarFallback className="avatar-fallback">
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className="message-content">
                  {!msg.isMe && <p className="message-sender">{msg.user}</p>}
                  <div
                    className={`message-bubble ${msg.isMe ? "me" : "others"}`}
                  >
                    <p>{msg.message}</p>
                  </div>
                  <p className="message-time">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="input-area glass-card">
            <div className="input-wrapper">
              <div className="input-container">
                <div className="input-box glass-card">
                  <Input
                    placeholder="메시지를 입력하세요..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="message-input"
                  />
                  <div className="input-actions">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      onClick={handleAttachFile}
                    >
                      <Paperclip className="w-4 h-4" />
                      <span className="hidden sm:inline">파일</span>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleAddEmoji}>
                      <Smile className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <Button onClick={handleSendMessage} className="send-button">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </main>

        {/* Right Sidebar - AI Suggestions */}
        {/* 모바일 상태 클래스 추가 */}
        <aside
          className={`ai-sidebar glass-sidebar ${
            isRightSidebarOpen ? "mobile-open" : ""
          }`}
        >
          {/* 모바일용 닫기 버튼 */}
          <button
            className="mobile-close-btn lg:hidden absolute top-4 right-4"
            onClick={() => setIsRightSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>

          {/* AI Schedule Suggestion */}
          {showAISuggestion && (
            <div className="ai-card glass-card animate-in fade-in slide-in-from-right">
              <div className="ai-card-header">
                <div className="ai-card-title-group">
                  <div className="ai-card-icon">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="ai-card-title">AI 일정 제안</h3>
                    <p className="ai-card-subtitle">
                      채팅에서 일정을 감지했습니다
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAISuggestion(false)}
                  className="close-button"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="ai-content-group">
                <div className="ai-info-item">
                  <div className="ai-info-label">
                    <FileText className="w-4 h-4 text-indigo-600" />
                    <span className="ai-info-text">제목</span>
                  </div>
                  <p className="ai-info-value">{aiSuggestion.title}</p>
                </div>

                <div className="ai-info-grid">
                  <div className="ai-info-item">
                    <div className="ai-info-label">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="ai-info-text">날짜</span>
                    </div>
                    <p className="ai-info-value">{aiSuggestion.date}</p>
                  </div>

                  <div className="ai-info-item">
                    <div className="ai-info-label">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <span className="ai-info-text">시간</span>
                    </div>
                    <p className="ai-info-value">{aiSuggestion.time}</p>
                  </div>
                </div>

                <div className="ai-info-item">
                  <div className="ai-info-label">
                    <MapPin className="w-4 h-4 text-pink-600" />
                    <span className="ai-info-text">장소</span>
                  </div>
                  <p className="ai-info-value">{aiSuggestion.location}</p>
                </div>

                <div className="ai-info-item">
                  <div className="ai-info-label">
                    <Users className="w-4 h-4 text-green-600" />
                    <span className="ai-info-text">참석자</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aiSuggestion.attendees.map((attendee, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 border-indigo-200"
                      >
                        {attendee}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="ai-info-item">
                  <div className="ai-info-label">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                    <span className="ai-info-text">할 일</span>
                  </div>
                  <ul className="ai-task-list">
                    {aiSuggestion.tasks.map((task, index) => (
                      <li key={index} className="ai-task-item">
                        <div className="ai-task-dot"></div>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="ai-actions">
                <Button
                  onClick={onOpenCreateScheduleModal}
                  className="create-schedule-btn"
                >
                  일정 생성
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleEditSchedule}
                >
                  <Edit className="w-4 h-4" />
                  수정
                </Button>
              </div>
            </div>
          )}

          {/* AI Meeting Summary */}
          {showAISummary && (
            <div className="ai-summary-card glass-card animate-in fade-in slide-in-from-right">
              <div className="ai-card-header">
                <div className="ai-card-title-group">
                  <div className="ai-card-icon summary-header-icon">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="ai-card-title">회의 요약</h3>
                    <p className="ai-card-subtitle">{aiSummary.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAISummary(false)}
                  className="close-button"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              <div className="ai-content-group">
                <div className="summary-section-purple">
                  <h4 className="ai-summary-title mb-2">주요 내용</h4>
                  <ul className="summary-list">
                    {aiSummary.keyPoints.map((point, index) => (
                      <li key={index} className="summary-item text-purple-800">
                        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="summary-section-blue">
                  <h4 className="text-sm text-blue-900 mb-2">결정 사항</h4>
                  <ul className="summary-list">
                    {aiSummary.decisions.map((decision, index) => (
                      <li key={index} className="summary-item text-blue-800">
                        <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="summary-section-white">
                  <h4 className="text-sm text-slate-900 mb-3">할 일 목록</h4>
                  <div className="summary-list">
                    {aiSummary.tasks.map((task, index) => (
                      <div key={index} className="summary-task-item">
                        <div className="summary-task-header">
                          <span className="text-sm text-slate-900">
                            {task.task}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200"
                          >
                            {task.dueDate}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600">
                          담당자: {task.assignee}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="full-summary-btn"
                onClick={handleViewFullSummary}
              >
                <FileText className="w-4 h-4" />
                전체 요약 보기
              </Button>
            </div>
          )}

          {/* Quick Actions */}
          <div className="quick-actions-card glass-card">
            <h3 className="text-slate-900 mb-3">빠른 작업</h3>
            <Button
              variant="outline"
              className="quick-action-btn"
              onClick={handleCreateSchedule}
            >
              <Calendar className="w-5 h-5 text-indigo-600" />
              <div className="quick-action-text">
                <p className="quick-action-title">새 일정 만들기</p>
                <p className="quick-action-desc">수동으로 일정 추가</p>
              </div>
            </Button>
            <Button
              variant="outline"
              className="quick-action-btn"
              onClick={handleEndMeeting}
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
              <div className="quick-action-text">
                <p className="quick-action-title">회의 종료</p>
                <p className="quick-action-desc">AI 요약 생성</p>
              </div>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}
