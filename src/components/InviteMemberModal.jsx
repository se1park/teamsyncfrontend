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
import "../styles/InviteMemberModal.css";

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
      <DialogContent className="invite-member-modal-content">
        <DialogHeader className="invite-member-header">
          <DialogTitle className="invite-member-title">
            <UserPlus className="icon-md" />
            멤버 초대
          </DialogTitle>
          <DialogDescription className="invite-member-desc">
            팀에 새로운 멤버를 초대하세요
          </DialogDescription>
        </DialogHeader>

        <div className="invite-member-body">
          {/* Invite Link */}
          <div className="invite-link-card glass-card">
            <Label className="form-label">초대 링크로 공유</Label>
            <div className="invite-input-row">
              <Input
                value={inviteLink}
                readOnly
                className="invite-link-input"
              />
              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="copy-button"
              >
                {copied ? (
                  <>
                    <Check className="icon-sm" />
                    복사됨
                  </>
                ) : (
                  <>
                    <Copy className="icon-sm" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <p className="helper-text">
              이 링크를 통해 누구나 조직에 참여할 수 있습니다
            </p>
          </div>

          {/* Email Invite */}
          <div className="email-invite-section">
            <div className="divider-row">
              <div className="divider-line"></div>
              <span className="divider-text">또는 이메일로 초대</span>
              <div className="divider-line"></div>
            </div>

            <div className="email-invite-section">
              <div className="form-group">
                <Label htmlFor="email" className="form-label-icon">
                  <Mail className="icon-sm text-indigo-600" />
                  이메일 주소
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="example@email.com"
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <Label htmlFor="role" className="form-label">
                    역할
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="form-input">
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

                <div className="form-group">
                  <Label htmlFor="team" className="form-label">
                    팀
                  </Label>
                  <Select value={team} onValueChange={setTeam}>
                    <SelectTrigger className="form-input">
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
                className="add-button"
                disabled={!email || !role || !team}
              >
                <UserPlus className="icon-sm" />
                초대 목록에 추가
              </Button>
            </div>
          </div>

          {/* Invited Members List */}
          {invitedMembers.length > 0 && (
            <div className="invited-list-section">
              <Label className="form-label">
                초대할 멤버 ({invitedMembers.length}명)
              </Label>
              <div className="invited-list glass-card">
                {invitedMembers.map((member, index) => (
                  <div key={index} className="invited-item">
                    <div className="invited-info">
                      <p className="invited-email">{member.email}</p>
                      <div className="badge-row">
                        <Badge variant="outline" className="role-badge">
                          {member.role === "owner"
                            ? "Owner"
                            : member.role === "admin"
                            ? "Admin"
                            : member.role === "member"
                            ? "Member"
                            : "Guest"}
                        </Badge>
                        <Badge variant="outline" className="team-badge">
                          {member.team}
                        </Badge>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveMember(index)}
                      className="remove-button"
                    >
                      <X className="icon-sm text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Role Descriptions */}
          <div className="role-desc-card glass-card">
            <h3 className="role-desc-title">역할 설명</h3>
            <div className="role-desc-list">
              <div className="role-desc-item">
                <Badge variant="outline" className="role-badge-owner">
                  Owner
                </Badge>
                <span>모든 권한 보유, 조직 삭제 가능</span>
              </div>
              <div className="role-desc-item">
                <Badge variant="outline" className="role-badge-admin">
                  Admin
                </Badge>
                <span>멤버 관리, 팀 생성/삭제 가능</span>
              </div>
              <div className="role-desc-item">
                <Badge variant="outline" className="role-badge-member">
                  Member
                </Badge>
                <span>일반 멤버, 회의 참여 및 콘텐츠 작성</span>
              </div>
              <div className="role-desc-item">
                <Badge variant="outline" className="role-badge-guest">
                  Guest
                </Badge>
                <span>제한된 권한, 특정 회의방만 접근</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="invite-member-footer">
          <div className="footer-buttons">
            <Button
              onClick={onClose}
              variant="outline"
              className="footer-button"
            >
              취소
            </Button>
            <Button
              onClick={handleSendInvites}
              className="footer-button submit-button"
              disabled={invitedMembers.length === 0}
            >
              <Mail className="icon-sm mr-2" />
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
