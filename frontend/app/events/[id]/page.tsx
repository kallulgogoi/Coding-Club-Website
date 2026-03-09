"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Trophy,
  Sword,
  Shield,
  UserPlus,
  ChevronLeft,
  AlertCircle,
} from "lucide-react";

export default function EventDetailPage() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [teamName, setTeamName] = useState("");
  const [emails, setEmails] = useState<string[]>([""]);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    api.get(`/events/${id}`).then((res) => setEvent(res.data));
  }, [id]);

  const handleRegister = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isAuthenticated) return router.push("/auth");

    setIsRegistering(true);
    try {
      if (event.mode === "solo") {
        await api.post(`/registrations/solo/${id}`);
      } else {
        await api.post(`/registrations/team/${id}`, {
          teamName,
          members: emails.filter((e) => e.trim() !== ""),
        });
      }
      alert("Registration Successful!");
      router.push("/profile");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsRegistering(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-2 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border border-yellow-400/40 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    );
  }

  const isOpen = event.registrationStatus === "open";

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Header with breadcrumb - Repositioned */}
      <div className="border-b border-yellow-400/20 bg-[#111111] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => router.push("/events")}
              className="flex items-center gap-2 text-white/60 hover:text-yellow-400 transition-colors text-sm font-medium uppercase tracking-wider group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>BACK TO EVENTS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Reorganized Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title at top - Moved up for better hierarchy */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            <span className="text-white">{event.title}</span>
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <div className="h-1 w-16 bg-yellow-400"></div>
            <span className="text-yellow-400/80 text-sm font-bold uppercase tracking-wider">
              EVENT DETAILS
            </span>
          </div>
        </div>

        {/* Two Column Layout - Reorganized */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Poster (now 1/3 width) */}
          <div className="lg:col-span-1">
            <div className="relative group sticky top-24">
              {/* Decorative corners */}
              <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-yellow-400/40 group-hover:border-yellow-400/80 transition-colors z-10"></div>
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-yellow-400/40 group-hover:border-yellow-400/80 transition-colors z-10"></div>
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-yellow-400/40 group-hover:border-yellow-400/80 transition-colors z-10"></div>
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-yellow-400/40 group-hover:border-yellow-400/80 transition-colors z-10"></div>

              <div className="relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-gradient-to-b from-[#111111] to-[#0a0a0a] shadow-xl">
                <img
                  src={event.posterUrl}
                  alt={event.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Status badge */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 text-sm font-bold uppercase tracking-wider rounded-lg border-2 z-20 ${
                    isOpen
                      ? "bg-yellow-400 text-black border-yellow-400 shadow-lg shadow-yellow-400/20"
                      : "bg-red-500/10 text-red-500 border-red-500/30"
                  }`}
                >
                  {isOpen ? "● OPEN" : "● CLOSED"}
                </div>

                {/* Mode badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-yellow-400/30 rounded-lg z-20">
                  <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                    {event.mode === "solo" ? "SOLO BATTLE" : "TEAM BATTLE"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Content (now 2/3 width) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Grid - Now horizontal */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#111111] border border-yellow-400/20 rounded-lg p-4 hover:border-yellow-400/40 transition-colors">
                <Calendar className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-white/60 text-xs font-medium mb-1">DATE</p>
                <p className="text-white font-bold text-sm">
                  {new Date(event.startDateIST).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div className="bg-[#111111] border border-yellow-400/20 rounded-lg p-4 hover:border-yellow-400/40 transition-colors">
                <Clock className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-white/60 text-xs font-medium mb-1">TIME</p>
                <p className="text-white font-bold text-sm">
                  {new Date(event.startDateIST).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>

              <div className="bg-[#111111] border border-yellow-400/20 rounded-lg p-4 hover:border-yellow-400/40 transition-colors">
                <Users className="w-5 h-5 text-yellow-400 mb-2" />
                <p className="text-white/60 text-xs font-medium mb-1">FORMAT</p>
                <p className="text-white font-bold text-sm">
                  {event.mode === "solo"
                    ? "SOLO"
                    : `TEAM (${event.maxTeamSize})`}
                </p>
              </div>

              {event.location && (
                <div className="bg-[#111111] border border-yellow-400/20 rounded-lg p-4 hover:border-yellow-400/40 transition-colors">
                  <MapPin className="w-5 h-5 text-yellow-400 mb-2" />
                  <p className="text-white/60 text-xs font-medium mb-1">
                    VENUE
                  </p>
                  <p className="text-white font-bold text-sm truncate">
                    {event.location}
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-white font-bold text-base uppercase tracking-wider mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-white/90">ABOUT THIS EVENT</span>
              </h2>
              <div className="bg-[#111111] border border-yellow-400/20 rounded-xl p-6">
                <p className="text-white/80 text-base leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>
            </div>

            {/* Registration Section */}
            {!isOpen ? (
              <div className="bg-[#111111] border-2 border-red-500/20 rounded-xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/10 mb-4">
                  <Shield className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-red-500 text-2xl font-black uppercase tracking-wider mb-3">
                  Registration Closed
                </h3>
                <p className="text-white/60 text-base max-w-md mx-auto">
                  This battlefield is no longer accepting challengers
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>Check other available events</span>
                </div>
              </div>
            ) : event.mode === "solo" ? (
              <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] border-2 border-yellow-400/20 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <UserPlus className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 text-2xl font-black uppercase tracking-wider mb-1">
                      Solo Registration
                    </h3>
                    <p className="text-white/60 text-sm">
                      Enter the arena as a lone warrior
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleRegister()}
                  disabled={isRegistering}
                  className="w-full relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <div
                    className={`relative px-8 py-5 bg-yellow-400 rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-400/20 ${
                      isRegistering ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="text-black text-lg font-black uppercase tracking-wider">
                      {isRegistering ? "REGISTERING..." : "REGISTER NOW →"}
                    </span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-b from-[#111111] to-[#0a0a0a] border-2 border-yellow-400/20 rounded-xl p-6 sm:p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
                    <Users className="w-7 h-7 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-yellow-400 text-2xl font-black uppercase tracking-wider mb-1">
                      Team Registration
                    </h3>
                    <p className="text-white/60 text-sm">
                      Form your squad (max {event.maxTeamSize} members)
                    </p>
                  </div>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                  <div>
                    <label className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-2">
                      Team Name <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g., Thunder Warriors"
                      className="w-full bg-[#0a0a0a] border-2 border-yellow-400/20 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-yellow-400/60 focus:outline-none transition-colors text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-bold uppercase tracking-wider mb-2">
                      Team Members <span className="text-yellow-400">*</span>
                    </label>
                    <p className="text-white/40 text-xs mb-3">
                      NITS email addresses only
                    </p>
                    <div className="space-y-3">
                      {emails.map((email, index) => (
                        <input
                          key={index}
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            const newEmails = [...emails];
                            newEmails[index] = e.target.value;
                            setEmails(newEmails);
                          }}
                          placeholder={`member${index + 1}@nits.ac.in`}
                          className="w-full bg-[#0a0a0a] border-2 border-yellow-400/20 rounded-xl px-5 py-4 text-white placeholder-white/30 focus:border-yellow-400/60 focus:outline-none transition-colors text-base"
                        />
                      ))}
                    </div>

                    {emails.length < event.maxTeamSize && (
                      <button
                        type="button"
                        onClick={() => setEmails([...emails, ""])}
                        className="mt-4 text-yellow-400 hover:text-yellow-300 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-2"
                      >
                        <span>+ ADD MEMBER</span>
                      </button>
                    )}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isRegistering}
                      className="w-full relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <div
                        className={`relative px-8 py-5 bg-yellow-400 rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg shadow-yellow-400/20 ${
                          isRegistering ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <span className="text-black text-lg font-black uppercase tracking-wider">
                          {isRegistering ? "REGISTERING..." : "REGISTER TEAM →"}
                        </span>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
