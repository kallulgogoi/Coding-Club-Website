"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { User, ShieldCheck, LayoutDashboard } from "lucide-react";

import ProfileCard from "@/components/profile/ProfileCard";
import MissionLogs from "@/components/profile/MissionLogs";

export default function ProfilePage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState("all");
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<any>({ profile: null, solo: [], team: [] });

  const [editForm, setEditForm] = useState({
    name: "",
    codeforcesHandle: "",
    scholarId: "",
    branch: "",
    year: "",
    phone: "",
  });
  const branches = ["CSE", "ECE", "EI", "EE", "ME", "CE"];

  const fetchProfileData = async () => {
    if (isAuthenticated) {
      try {
        const [me, s, t] = await Promise.all([
          api.get("/auth/me"),
          api.get("/registrations/solo/my"),
          api.get("/registrations/team/my"),
        ]);
        setData({ profile: me.data, solo: s.data, team: t.data });
        setEditForm({
          name: me.data.name || "",
          codeforcesHandle: me.data.codeforcesHandle || "",
          scholarId: me.data.scholarId || "",
          branch: me.data.branch || "",
          year: me.data.year?.toString() || "",
          phone: me.data.phone || "",
        });
      } catch (err) {
        toast.error("Failed to sync profile data");
      }
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [isAuthenticated]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(editForm).forEach(([k, v]) => formData.append(k, v));

    const loadingToast = toast.loading("Updating profile...");
    try {
      await api.put("/auth/profile", formData);
      toast.success("Profile updated", { id: loadingToast });
      setIsEditing(false);
      fetchProfileData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed", {
        id: loadingToast,
      });
    }
  };

  if (authLoading || !data.profile)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
          <p className="text-yellow-400 text-xs animate-pulse tracking-[0.3em]">
            INITIALIZING_SESSION...
          </p>
        </div>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#050505] text-white font-custom selection:bg-yellow-400 selection:text-black">
      <Toaster position="top-right" />

      <header className="border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md p-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
              <LayoutDashboard size={20} className="text-yellow-400" />
            </div>
            <h1 className="text-xl font-black uppercase tracking-tighter">
              Dashboard
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4">
          <ProfileCard
            data={data}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editForm={editForm}
            setEditForm={setEditForm}
            handleUpdate={handleUpdate}
            branches={branches}
          />
        </div>

        <div className="lg:col-span-8">
          <MissionLogs
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
            data={data}
          />
        </div>
      </div>
    </main>
  );
}
