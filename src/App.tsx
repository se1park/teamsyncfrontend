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

export type View =
  | "auth"
  | "dashboard"
  | "teams"
  | "chat"
  | "calendar"
  | "summary"
  | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("auth");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isCreateScheduleModalOpen, setIsCreateScheduleModalOpen] =
    useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);

  const handleLogin = () => {
    setCurrentView("dashboard");
  };

  const handleNavigate = (view: View) => {
    setCurrentView(view);
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
        />
      )}
      {currentView === "teams" && (
        <TeamManagement
          onBack={() => handleNavigate("dashboard")}
          onOpenCreateTeamModal={handleOpenCreateTeamModal}
        />
      )}
      {currentView === "chat" && (
        <ChatRoom
          onBack={() => handleNavigate("dashboard")}
          onOpenScheduleModal={handleOpenScheduleModal}
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
