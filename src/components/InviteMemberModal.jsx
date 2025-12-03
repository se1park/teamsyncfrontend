import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
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
import { Mail, UserPlus, Copy, Check, X } from "lucide-react";
import { toast } from "sonner";

export default function InviteMemberModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [team, setTeam] = useState("");
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [copied, setCopied] = useState(false);

  const inviteLink = "https://teamsync.app/invite/abc123xyz";

  const handleAddMember = () => {
    if (email && role && team) {
      setInvitedMembers([...invitedMembers, { email, role, team }]);
      setEmail("");
      setRole("member");
      setTeam("");
      toast.success("멤버가 초대 목록에 추가되었습니다");
    }
  };

  const handleRemoveMember = (index) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index));
  };

  const handleSendInvites = () => {
    if (invitedMembers.length > 0) {
      toast.success(
        `${invitedMembers.length}명에게 초대 이메일을 발송했습니다`
      );
      setInvitedMembers([]);
      onClose();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    toast.success("초대 링크가 복사되었습니다");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 pb-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <DialogTitle className="text-xl text-white flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            멤버 초대
          </DialogTitle>
          <DialogDescription className="text-indigo-100">
            팀에 새로운 멤버를 초대하세요
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Invite Link */}
          <div className="glass-card rounded-xl p-4 space-y-3">
            <Label className="text-slate-700">초대 링크로 공유</Label>
            <div className="flex gap-2">
              <Input
                value={inviteLink}
                readOnly
                className="flex-1 bg-white border-slate-200 font-mono text-sm"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="gap-2 min-w-[100px]"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <p className="text-xs text-slate-600">
              이 링크를 통해 누구나 조직에 참여할 수 있습니다
            </p>
          </div>

          {/* Email Invite */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-slate-200"></div>
              <span className="text-sm text-slate-600">또는 이메일로 초대</span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-slate-700"
                >
                  <Mail className="w-4 h-4 text-indigo-600" />
                  이메일 주소
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="example@email.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-slate-700">
                    역할
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-12 bg-white border-slate-200">
                      <SelectValue placeholder="역할 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="guest">Guest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team" className="text-slate-700">
                    팀
                  </Label>
                  <Select value={team} onValueChange={setTeam}>
                    <SelectTrigger className="h-12 bg-white border-slate-200">
                      <SelectValue placeholder="팀 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="개발팀">개발팀</SelectItem>
                      <SelectItem value="디자인팀">디자인팀</SelectItem>
                      <SelectItem value="마케팅팀">마케팅팀</SelectItem>
                      <SelectItem value="운영팀">운영팀</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={handleAddMember}
                variant="outline"
                className="w-full h-12 gap-2"
                disabled={!email || !role || !team}
              >
                <UserPlus className="w-4 h-4" />
                초대 목록에 추가
              </Button>
            </div>
          </div>

          {/* Invited Members List */}
          {invitedMembers.length > 0 && (
            <div className="space-y-3">
              <Label className="text-slate-700">
                초대할 멤버 ({invitedMembers.length}명)
              </Label>
              <div className="glass-card rounded-xl p-4 space-y-2 max-h-[200px] overflow-y-auto">
                {invitedMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 truncate">
                        {member.email}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge
                          variant="outline"
                          className="bg-indigo-50 text-indigo-700 border-indigo-200 text-xs"
                        >
                          {member.role === "owner"
                            ? "Owner"
                            : member.role === "admin"
                            ? "Admin"
                            : member.role === "member"
                            ? "Member"
                            : "Guest"}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 text-xs"
                        >
                          {member.team}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(index)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-2"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role Descriptions */}
          <div className="glass-card rounded-xl p-4 space-y-2">
            <h3 className="text-sm text-slate-900 mb-2">역할 설명</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700 border-purple-200"
                >
                  Owner
                </Badge>
                <span>모든 권한 보유, 조직 삭제 가능</span>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  Admin
                </Badge>
                <span>멤버 관리, 팀 생성/삭제 가능</span>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Member
                </Badge>
                <span>일반 멤버, 회의 참여 및 콘텐츠 작성</span>
              </div>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="bg-slate-50 text-slate-700 border-slate-200"
                >
                  Guest
                </Badge>
                <span>제한된 권한, 특정 회의방만 접근</span>
              </div>
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
              onClick={handleSendInvites}
              className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white shadow-lg shadow-indigo-500/30"
              disabled={invitedMembers.length === 0}
            >
              <Mail className="w-4 h-4 mr-2" />
              {invitedMembers.length > 0
                ? `${invitedMembers.length}명에게 초대 발송`
                : "초대 발송"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
