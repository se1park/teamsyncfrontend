import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  X,
  FileText,
} from "lucide-react";
import "../styles/CreateScheduleModal.css";

export default function CreateScheduleModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState("");

  const handleAddAttendee = () => {
    if (newAttendee.trim()) {
      setAttendees([...attendees, newAttendee.trim()]);
      setNewAttendee("");
    }
  };

  const handleRemoveAttendee = (index) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const schedule = {
      title,
      date,
      time,
      duration,
      location,
      team,
      description,
      attendees,
    };
    onSave(schedule);
    // Reset form
    setTitle("");
    setDate("");
    setTime("");
    setDuration("");
    setLocation("");
    setTeam("");
    setDescription("");
    setAttendees([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="create-schedule-modal-content">
        <DialogHeader className="create-schedule-header">
          <DialogTitle className="create-schedule-title">
            새 일정 만들기
          </DialogTitle>
          <DialogDescription className="create-schedule-desc">
            새로운 회의 또는 일정을 생성하세요
          </DialogDescription>
        </DialogHeader>

        <div className="create-schedule-body">
          {/* Title */}
          <div className="form-group">
            <Label htmlFor="title" className="form-label">
              <FileText className="icon-sm icon-indigo" />
              일정 제목
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
              placeholder="예: 주간 스프린트 회의"
              required
            />
          </div>

          {/* Date & Time */}
          <div className="form-grid-2">
            <div className="form-group">
              <Label htmlFor="date" className="form-label">
                <CalendarIcon className="icon-sm icon-blue" />
                날짜
              </Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="time" className="form-label">
                <Clock className="icon-sm icon-purple" />
                시간
              </Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Duration & Location */}
          <div className="form-grid-2">
            <div className="form-group">
              <Label htmlFor="duration" className="form-label">
                <Clock className="icon-sm icon-indigo" />
                소요 시간
              </Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="form-input"
                placeholder="예: 1h, 30m"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="location" className="form-label">
                <MapPin className="icon-sm icon-pink" />
                장소
              </Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                placeholder="예: 3층 회의실"
              />
            </div>
          </div>

          {/* Team */}
          <div className="form-group">
            <Label htmlFor="team" className="text-slate-700">
              팀 선택
            </Label>
            <Select value={team} onValueChange={setTeam}>
              <SelectTrigger className="form-input">
                <SelectValue placeholder="팀을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="개발팀">개발팀</SelectItem>
                <SelectItem value="디자인팀">디자인팀</SelectItem>
                <SelectItem value="마케팅팀">마케팅팀</SelectItem>
                <SelectItem value="운영팀">운영팀</SelectItem>
                <SelectItem value="전체">전체</SelectItem>
                <SelectItem value="개인">개인</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Attendees */}
          <div className="space-y-3">
            <Label className="form-label">
              <Users className="icon-sm icon-green" />
              참석자
            </Label>
            <div className="attendees-container glass-card">
              <div className="attendees-list">
                {attendees.map((attendee, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="attendee-badge"
                  >
                    {attendee}
                    <button
                      onClick={() => handleRemoveAttendee(index)}
                      className="remove-attendee-button"
                    >
                      <X className="icon-xs" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="add-attendee-row">
                <Input
                  value={newAttendee}
                  onChange={(e) => setNewAttendee(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddAttendee();
                    }
                  }}
                  placeholder="참석자 이름 입력"
                  className="add-attendee-input"
                />
                <Button
                  onClick={handleAddAttendee}
                  type="button"
                  variant="outline"
                  className="add-attendee-button"
                >
                  <Plus className="icon-sm" />
                  추가
                </Button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <Label htmlFor="description" className="text-slate-700">
              설명 (선택사항)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="회의 안건이나 추가 정보를 입력하세요"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="create-schedule-footer">
          <div className="footer-buttons">
            <Button
              onClick={onClose}
              variant="outline"
              className="footer-button"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              className="footer-button submit-button"
              disabled={!title || !date || !time}
            >
              일정 생성
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
