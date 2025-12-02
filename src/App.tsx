import { useState } from "react";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import TeamManagement from "./components/TeamManagement";
import ChatRoom from "./components/ChatRoom";
import CalendarView from "./components/CalendarView";
import MeetingSummary from "./components/MeetingSummary";
import ScheduleModal from "./components/ScheduleModal";
import CreateScheduleModal from "./components/CreateScheduleModal";
import Settings from "./components/SettingsPage";
import CreateTeamModal from "./components/CreateTeamModal";
import InviteMemberModal from "./components/InviteMemberModal";

import TeamDetailPage from "./components/TeamDetailPage";

export type View =
  | "auth"
  | "dashboard"
  | "teams"
  | "chat"
  | "calendar"
  | "summary"
  | "settings"
  | "team-detail";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("auth");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCreateScheduleModalOpen, setIsCreateScheduleModalOpen] =
    useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState<{
    name: string;
    color: string;
  } | null>(null);

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
  };

  const handleNavigateToTeam = (team: { name: string; color: string }) => {
    setSelectedTeam(team);
    setCurrentView("team-detail");
  };

  const handleOpenScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const handleCloseScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const handleOpenCreateScheduleModal = () => {
    setIsCreateScheduleModalOpen(true);
  };

  const handleCloseCreateScheduleModal = () => {
    setIsCreateScheduleModalOpen(false);
  };

  const handleOpenCreateTeamModal = () => {
    setIsCreateTeamModalOpen(true);
  };

  const handleCloseCreateTeamModal = () => {
    setIsCreateTeamModalOpen(false);
  };

  const handleSaveTeam = (teamData: any) => {
    console.log("Team created:", teamData);
    setIsCreateTeamModalOpen(false);
  };

  const handleOpenInviteMemberModal = () => {
    setIsInviteMemberModalOpen(true);
  };

  const handleCloseInviteMemberModal = () => {
    setIsInviteMemberModalOpen(false);
  };

  const handleSaveSchedule = () => {
    // Handle save schedule logic
    console.log("Schedule saved");
  };

  return (
    <>
      {currentView === "auth" && <AuthScreen onLogin={handleLogin} />}
      {currentView === "dashboard" && (
        <Dashboard
          onNavigate={handleNavigate}
          onOpenCreateTeamModal={handleOpenCreateTeamModal}
          onOpenInviteMemberModal={handleOpenInviteMemberModal}
          onNavigateToTeam={handleNavigateToTeam}
        />
      )}
      {currentView === "teams" && (
        <TeamManagement
          onBack={() => handleNavigate("dashboard")}
          onOpenInviteMemberModal={handleOpenInviteMemberModal}
          onOpenCreateTeamModal={handleOpenCreateTeamModal}
        />
      )}
      {currentView === "chat" && (
        <ChatRoom
          onBack={() => handleNavigate("dashboard")}
          onOpenCreateScheduleModal={handleOpenCreateScheduleModal}
        />
      )}
      {currentView === "calendar" && (
        <CalendarView
          onBack={() => handleNavigate("dashboard")}
          onOpenCreateScheduleModal={handleOpenCreateScheduleModal}
        />
      )}
      {currentView === "summary" && (
        <MeetingSummary onBack={() => handleNavigate("dashboard")} />
      )}
      {currentView === "settings" && (
        <Settings onBack={() => handleNavigate("dashboard")} />
      )}
      {currentView === "team-detail" && selectedTeam && (
        <TeamDetailPage
          teamName={selectedTeam.name}
          teamColor={selectedTeam.color}
          onBack={() => handleNavigate("dashboard")}
          onNavigateToChat={() => handleNavigate("chat")}
        />
      )}

      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={handleCloseScheduleModal}
        onSave={handleSaveSchedule}
      />

      <CreateTeamModal
        isOpen={isCreateTeamModalOpen}
        onClose={handleCloseCreateTeamModal}
        onSave={handleSaveTeam}
      />

      <InviteMemberModal
        isOpen={isInviteMemberModalOpen}
        onClose={handleCloseInviteMemberModal}
      />
      <CreateScheduleModal
        isOpen={isCreateScheduleModalOpen}
        onClose={handleCloseCreateScheduleModal}
        onSave={handleSaveSchedule}
      />
    </>
  );
}
