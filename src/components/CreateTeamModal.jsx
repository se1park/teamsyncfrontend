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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <Users className="w-5 h-5" />새 팀 만들기
          </DialogTitle>
          <DialogDescription className="text-indigo-100">
            새로운 팀을 만들고 멤버를 추가하세요
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="teamName" className="text-slate-700">
              팀 이름 *
            </Label>
            <Input
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="예: 개발팀, 디자인팀"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-700">
              팀 설명 (선택사항)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="팀의 목적과 역할을 설명해주세요"
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2 text-slate-700">
              <Palette className="w-4 h-4 text-indigo-600" />팀 색상
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                    selectedColor === color.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full ${color.bg}`}></div>
                    <span className="text-xs text-slate-700">{color.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Add Members */}
          <div className="space-y-3">
            <Label className="text-slate-700">팀 멤버 추가 (선택사항)</Label>
            <div className="glass-card rounded-xl p-4 space-y-3">
              {members.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-3 border-b border-slate-200">
                  {members.map((member, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700 border-indigo-200 pl-3 pr-1 py-1.5 gap-2"
                    >
                      {member}
                      <button
                        onClick={() => handleRemoveMember(index)}
                        className="p-0.5 hover:bg-indigo-200 rounded transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
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
                  className="flex-1 bg-white border-slate-200"
                />
                <Button
                  onClick={handleAddMember}
                  type="button"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  추가
                </Button>
              </div>
              <p className="text-xs text-slate-600">
                나중에 팀 설정에서 멤버를 추가할 수도 있습니다
              </p>
            </div>
          </div>

          {/* Preview */}
          <div className="glass-card rounded-xl p-4">
            <Label className="text-slate-700 mb-3 block">미리보기</Label>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-100">
              <div
                className={`w-12 h-12 rounded-xl bg-${selectedColor}-100 flex items-center justify-center`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-${selectedColor}-500`}
                ></div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 mb-1">{teamName || "팀 이름"}</h3>
                <p className="text-sm text-slate-600 line-clamp-1">
                  {description || "팀 설명"}
                </p>
              </div>
              <div className="text-sm text-slate-600">{members.length}명</div>
            </div>
          </div>

          {/* Team Templates */}
          <div className="space-y-3">
            <Label className="text-slate-700">빠른 시작 템플릿</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setTeamName("개발팀");
                  setDescription("프론트엔드 & 백엔드 개발");
                  setSelectedColor("indigo");
                }}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  </div>
                  <h4 className="text-sm text-slate-900">개발팀</h4>
                </div>
                <p className="text-xs text-slate-600">개발자를 위한 기본 팀</p>
              </button>

              <button
                onClick={() => {
                  setTeamName("디자인팀");
                  setDescription("UI/UX 디자인 및 브랜딩");
                  setSelectedColor("blue");
                }}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <h4 className="text-sm text-slate-900">디자인팀</h4>
                </div>
                <p className="text-xs text-slate-600">
                  디자이너를 위한 기본 팀
                </p>
              </button>

              <button
                onClick={() => {
                  setTeamName("마케팅팀");
                  setDescription("마케팅 & 콘텐츠 제작");
                  setSelectedColor("purple");
                }}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <h4 className="text-sm text-slate-900">마케팅팀</h4>
                </div>
                <p className="text-xs text-slate-600">마케터를 위한 기본 팀</p>
              </button>

              <button
                onClick={() => {
                  setTeamName("운영팀");
                  setDescription("운영 및 지원");
                  setSelectedColor("green");
                }}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-green-300 hover:bg-green-50 transition-all text-left"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                  <h4 className="text-sm text-slate-900">운영팀</h4>
                </div>
                <p className="text-xs text-slate-600">운영자를 위한 기본 팀</p>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-4 border-t border-slate-200 bg-white rounded-b-lg">
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 h-12">
              취소
            </Button>
            <Button
              onClick={handleCreateTeam}
              className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30"
              disabled={!teamName.trim()}
            >
              <Users className="w-4 h-4 mr-2" />팀 생성
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
