import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Users, Plus, X, Palette } from "lucide-react";
import { toast } from "sonner";
import "../styles/CreateTeamModal.css";

const colorOptions = [
  { name: "Indigo", value: "indigo", bg: "bg-indigo-500" },
  { name: "Blue", value: "blue", bg: "bg-blue-500" },
  { name: "Purple", value: "purple", bg: "bg-purple-500" },
  { name: "Pink", value: "pink", bg: "bg-pink-500" },
  { name: "Orange", value: "orange", bg: "bg-orange-500" },
  { name: "Green", value: "green", bg: "bg-green-500" },
  { name: "Red", value: "red", bg: "bg-red-500" },
  { name: "Teal", value: "teal", bg: "bg-teal-500" },
];

export default function CreateTeamModal({ isOpen, onClose, onSave }) {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("indigo");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  const handleAddMember = () => {
    if (newMember.trim()) {
      setMembers([...members, newMember.trim()]);
      setNewMember("");
    }
  };

  const handleRemoveMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      const teamData = {
        name: teamName,
        description,
        color: selectedColor,
        members,
      };

      if (onSave) {
        onSave(teamData);
      }

      toast.success(`"${teamName}" 팀이 생성되었습니다`);
      // Reset form
      setTeamName("");
      setDescription("");
      setSelectedColor("indigo");
      setMembers([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="create-team-modal-content">
        <DialogHeader className="create-team-header">
          <DialogTitle className="create-team-title">
            <Users className="icon-md" />새 팀 만들기
          </DialogTitle>
          <DialogDescription className="create-team-desc">
            새로운 팀을 만들고 멤버를 추가하세요
          </DialogDescription>
        </DialogHeader>

        <div className="create-team-body">
          {/* Team Name */}
          <div className="form-group">
            <Label htmlFor="teamName" className="form-label">
              팀 이름 *
            </Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="form-input"
              placeholder="예: 개발팀, 디자인팀"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <Label htmlFor="description" className="form-label">
              팀 설명 (선택사항)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              placeholder="팀의 목적과 역할을 설명해주세요"
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="form-label-icon">
              <Palette className="icon-sm icon-indigo" />팀 색상
            </Label>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`color-button ${
                    selectedColor === color.value ? "selected" : "unselected"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`color-dot ${color.bg}`}></div>
                    <span className="color-name">{color.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add Members */}
          <div className="space-y-3">
            <Label className="form-label">팀 멤버 추가 (선택사항)</Label>
            <div className="members-container glass-card">
              {members.length > 0 && (
                <div className="members-list">
                  {members.map((member, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="member-badge"
                    >
                      {member}
                      <button
                        onClick={() => handleRemoveMember(index)}
                        className="remove-member-button"
                      >
                        <X className="icon-xs" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="add-member-row">
                <Input
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddMember();
                    }
                  }}
                  placeholder="멤버 이름 또는 이메일 입력"
                  className="add-member-input"
                />
                <Button
                  onClick={handleAddMember}
                  type="button"
                  variant="outline"
                  className="add-member-button"
                >
                  <Plus className="icon-sm" />
                  추가
                </Button>
              </div>
              <p className="helper-text">
                나중에 팀 설정에서 멤버를 추가할 수도 있습니다
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="preview-card glass-card">
            <Label className="form-label mb-3 block">미리보기</Label>
            <div className="preview-content">
              <div className={`preview-icon-wrapper bg-${selectedColor}-100`}>
                <div className={`preview-dot bg-${selectedColor}-500`}></div>
              </div>
              <div className="preview-info">
                <h3 className="preview-title">{teamName || "팀 이름"}</h3>
                <p className="preview-desc">{description || "팀 설명"}</p>
              </div>
              <div className="preview-count">{members.length}명</div>
            </div>
          </div>

          {/* Team Templates */}
          <div className="space-y-3">
            <Label className="form-label">빠른 시작 템플릿</Label>
            <div className="template-grid">
              <button
                onClick={() => {
                  setTeamName("개발팀");
                  setDescription("프론트엔드 & 백엔드 개발");
                  setSelectedColor("indigo");
                }}
                className="template-button"
              >
                <div className="template-header">
                  <div className="template-icon-wrapper bg-indigo-100">
                    <div className="template-dot bg-indigo-500"></div>
                  </div>
                  <h4 className="template-title">개발팀</h4>
                </div>
                <p className="helper-text">개발자를 위한 기본 팀</p>
              </button>

              <button
                onClick={() => {
                  setTeamName("디자인팀");
                  setDescription("UI/UX 디자인 및 브랜딩");
                  setSelectedColor("blue");
                }}
                className="template-button"
              >
                <div className="template-header">
                  <div className="template-icon-wrapper bg-blue-100">
                    <div className="template-dot bg-blue-500"></div>
                  </div>
                  <h4 className="template-title">디자인팀</h4>
                </div>
                <p className="helper-text">디자이너를 위한 기본 팀</p>
              </button>

              <button
                onClick={() => {
                  setTeamName("마케팅팀");
                  setDescription("마케팅 & 콘텐츠 제작");
                  setSelectedColor("purple");
                }}
                className="template-button"
              >
                <div className="template-header">
                  <div className="template-icon-wrapper bg-purple-100">
                    <div className="template-dot bg-purple-500"></div>
                  </div>
                  <h4 className="template-title">마케팅팀</h4>
                </div>
                <p className="helper-text">마케터를 위한 기본 팀</p>
              </button>

              <button
                onClick={() => {
                  setTeamName("운영팀");
                  setDescription("운영 및 지원");
                  setSelectedColor("green");
                }}
                className="template-button"
              >
                <div className="template-header">
                  <div className="template-icon-wrapper bg-green-100">
                    <div className="template-dot bg-green-500"></div>
                  </div>
                  <h4 className="template-title">운영팀</h4>
                </div>
                <p className="helper-text">운영자를 위한 기본 팀</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="create-team-footer">
          <div className="footer-buttons">
            <Button
              onClick={onClose}
              variant="outline"
              className="footer-button"
            >
              취소
            </Button>
            <Button
              onClick={handleCreateTeam}
              className="footer-button submit-button"
              disabled={!teamName.trim()}
            >
              <Users className="icon-sm mr-2" />팀 생성
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
