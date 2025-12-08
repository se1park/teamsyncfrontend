import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  MoreHorizontal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import "../styles/CalendarView.css";

export default function CalendarView({ onBack, onOpenCreateScheduleModal }) {
  const [viewMode, setViewMode] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date(2024, 10, 28));

  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilter = () => {
    toast.info("필터 옵션");
  };

  const handleEventClick = (eventTitle) => {
    toast.info(`${eventTitle} 상세 보기`);
  };

  const handleEventMore = (eventTitle) => {
    toast.info(`${eventTitle} 옵션`);
  };

  const events = [
    {
      id: 1,
      title: "주간 스프린트 회의",
      date: 28,
      time: "14:00",
      duration: "1h",
      team: "개발팀",
      color: "indigo",
      attendees: 5,
      location: "2층 회의실",
    },
    {
      id: 2,
      title: "디자인 리뷰",
      date: 28,
      time: "16:00",
      duration: "45m",
      team: "디자인팀",
      color: "blue",
      attendees: 4,
      location: "3층 회의실",
    },
    {
      id: 3,
      title: "프로젝트 킥오프",
      date: 29,
      time: "10:00",
      duration: "2h",
      team: "전체",
      color: "purple",
      attendees: 12,
      location: "대회의실",
    },
    {
      id: 4,
      title: "마케팅 전략 회의",
      date: 29,
      time: "15:00",
      duration: "1.5h",
      team: "마케팅팀",
      color: "pink",
      attendees: 6,
      location: "4층 회의실",
    },
    {
      id: 5,
      title: "1:1 미팅",
      date: 30,
      time: "11:00",
      duration: "30m",
      team: "개인",
      color: "green",
      attendees: 2,
      location: "소회의실",
    },
    {
      id: 6,
      title: "월간 리뷰",
      date: 1,
      time: "16:00",
      duration: "2h",
      team: "전체",
      color: "orange",
      attendees: 24,
      location: "대회의실",
    },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getWeekDays = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + i);
      weekDays.push(currentDay);
    }
    return weekDays;
  };

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];

  const days = getDaysInMonth(currentDate);
  const weekDaysList = getWeekDays(new Date(currentDate));

  const getEventsForDay = (day) => {
    const dayNumber = typeof day === "number" ? day : day.getDate();
    return events.filter((event) => event.date === dayNumber);
  };

  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const previousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const isToday = (day) => {
    const today = new Date();
    const dayNumber = typeof day === "number" ? day : day.getDate();
    return (
      dayNumber === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const handleDateClick = (day) => {
    if (day === null) return;

    const dayEvents = getEventsForDay(day);
    setSelectedDate({
      day: day,
      month: currentDate.getMonth(),
      year: currentDate.getFullYear(),
      events: dayEvents,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-content">
        {/* Header */}
        <div className="calendar-header">
          <div className="calendar-title-section">
            <button onClick={onBack} className="back-button">
              ← 대시보드로 돌아가기
            </button>
            <h1 className="calendar-title">캘린더</h1>
          </div>
          <div className="calendar-actions">
            <Button variant="outline" className="gap-2" onClick={handleFilter}>
              <Filter className="w-4 h-4" />
              필터
            </Button>
            <Button
              className="primary-button"
              onClick={onOpenCreateScheduleModal}
            >
              <Plus className="w-4 h-4" />새 일정 만들기
            </Button>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="glass-card calendar-controls-card">
          <div className="calendar-controls-header">
            <div className="calendar-navigation">
              <div className="calendar-nav-group">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={viewMode === "month" ? previousMonth : previousWeek}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <h2 className="current-date-display">
                  {currentDate.getFullYear()}년{" "}
                  {monthNames[currentDate.getMonth()]}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={viewMode === "month" ? nextMonth : nextWeek}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                오늘
              </Button>
            </div>

            <div className="view-toggle-group">
              <Button
                variant={viewMode === "month" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("month")}
                className={`view-toggle-button ${
                  viewMode === "month" ? "active" : "inactive"
                }`}
              >
                월간
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("week")}
                className={`view-toggle-button ${
                  viewMode === "week" ? "active" : "inactive"
                }`}
              >
                주간
              </Button>
            </div>
          </div>

          {/* Month View */}
          {viewMode === "month" && (
            <div>
              <div className="month-view-grid mb-2">
                {weekDays.map((day, index) => (
                  <div key={index} className="weekday-header">
                    {day}
                  </div>
                ))}
              </div>

              <div className="month-view-grid">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className={`day-cell ${
                      day === null
                        ? "empty"
                        : isToday(day)
                        ? "today"
                        : "default"
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day !== null && (
                      <>
                        <div className="day-number">
                          <span
                            className={`${
                              isToday(day)
                                ? "w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center"
                                : "text-slate-900"
                            }`}
                          >
                            {day}
                          </span>
                        </div>
                        <div className="day-events">
                          {getEventsForDay(day)
                            .slice(0, 2)
                            .map((event) => (
                              <div
                                key={event.id}
                                className={`event-item event-${event.color}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event.title);
                                }}
                              >
                                <div className="flex items-start justify-between gap-1">
                                  <p className="event-title">{event.title}</p>
                                </div>
                                <p className="event-time">{event.time}</p>
                              </div>
                            ))}
                          {getEventsForDay(day).length > 2 && (
                            <button
                              className="more-events-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDateClick(day);
                              }}
                            >
                              +{getEventsForDay(day).length - 2}개 더보기
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Week View */}
          {viewMode === "week" && (
            <div>
              <div className="week-view-grid mb-2">
                <div className="weekday-header"></div>
                {weekDaysList.map((day, index) => (
                  <div
                    key={index}
                    className={`week-day-header ${
                      isToday(day) ? "today" : "default"
                    }`}
                  >
                    <div className="week-day-name">
                      {weekDays[day.getDay()]}
                    </div>
                    <div className="week-day-date">{day.getDate()}</div>
                  </div>
                ))}
              </div>

              <div className="week-view-grid">
                <div className="time-column">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="time-label">
                      {i + 8}:00
                    </div>
                  ))}
                </div>

                {weekDaysList.map((day, dayIndex) => (
                  <div key={dayIndex} className="week-day-column">
                    <div className="space-y-1">
                      {getEventsForDay(day).map((event, eventIndex) => {
                        const hour = parseInt(event.time.split(":")[0]);
                        const topPosition = (hour - 8) * 4;
                        return (
                          <div
                            key={event.id}
                            className={`week-event-item event-${event.color}`}
                            style={{
                              top: `${topPosition}rem`,
                            }}
                            onClick={() => handleEventClick(event.title)}
                          >
                            <h4 className="event-title">{event.title}</h4>
                            <div className="flex items-center gap-2 event-time">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {event.time}
                              </span>
                              <span>•</span>
                              <span>{event.duration}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="week-grid-lines">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="grid-line"></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Events List */}
        <div className="glass-card upcoming-events-card">
          <h2 className="section-title">다가오는 일정</h2>
          <div className="upcoming-events-list">
            {events.slice(0, 4).map((event) => (
              <div
                key={event.id}
                className={`upcoming-event-item event-${event.color}`}
                onClick={() => handleEventClick(event.title)}
              >
                <div className="event-icon-box">
                  <Calendar className={`w-6 h-6 text-${event.color}-600`} />
                </div>
                <div className="event-details">
                  <h3 className="event-title text-lg">{event.title}</h3>
                  <div className="event-meta">
                    <span className="event-meta-item">
                      <Clock className="w-4 h-4" />
                      {event.time} ({event.duration})
                    </span>
                    <span>•</span>
                    <span className="event-meta-item">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <div className="event-actions">
                  <Badge
                    variant="outline"
                    className={`bg-${event.color}-50 text-${event.color}-700 border-${event.color}-200`}
                  >
                    {event.team}
                  </Badge>
                  <div className="attendees-count">
                    <Users className="w-4 h-4" />
                    {event.attendees}
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="glass-card legend-card">
          <h3 className="section-title">팀별 색상</h3>
          <div className="legend-grid">
            {[
              { name: "개발팀", color: "indigo" },
              { name: "디자인팀", color: "blue" },
              { name: "마케팅팀", color: "pink" },
              { name: "운영팀", color: "purple" },
              { name: "전체", color: "orange" },
              { name: "개인", color: "green" },
            ].map((team) => (
              <div key={team.name} className="legend-item">
                <div className={`legend-color bg-${team.color}-500`}></div>
                <span className="legend-label">{team.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Event Modal */}
      <div
        className={`mobile-event-modal-overlay ${isModalOpen ? "active" : ""}`}
      >
        <div className="mobile-event-modal-content">
          <div className="modal-header">
            <span className="modal-date-title">
              {selectedDate
                ? `${monthNames[selectedDate.month]} ${selectedDate.day}일`
                : ""}
            </span>
            <button className="modal-close-btn" onClick={closeModal}>
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="modal-body">
            {selectedDate && selectedDate.events.length > 0 ? (
              selectedDate.events.map((event) => (
                <div
                  key={event.id}
                  className={`upcoming-event-item event-${event.color}`}
                  onClick={() => handleEventClick(event.title)}
                >
                  <div className="event-details">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="event-title text-base font-semibold">
                        {event.title}
                      </h3>
                      <Badge
                        variant="outline"
                        className={`text-xs bg-${event.color}-50 text-${event.color}-700 border-${event.color}-200`}
                      >
                        {event.team}
                      </Badge>
                    </div>
                    <div className="event-meta text-xs">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                      </span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-events-message">
                <p>등록된 일정이 없습니다.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={() => {
                    closeModal();
                    onOpenCreateScheduleModal();
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" /> 새 일정 추가
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
