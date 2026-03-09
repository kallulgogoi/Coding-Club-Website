"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";
import NeonButton from "@/components/ui/NeonButton";

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();

  const [data, setData] = useState<any>({
    profile: null,
    solo: [],
    team: [],
  });

  // Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    scholarId: "",
    branch: "",
    year: "",
    phone: "",
  });
  const [editFile, setEditFile] = useState<File | null>(null);

  const fetchProfileData = () => {
    if (isAuthenticated) {
      Promise.all([
        api.get("/auth/me"),
        api.get("/registrations/solo/my"),
        api.get("/registrations/team/my"),
      ]).then(([me, s, t]) =>
        setData({ profile: me.data, solo: s.data, team: t.data }),
      );
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [isAuthenticated]);

  // When Edit is clicked, seed the form with existing data so inputs aren't empty
  const handleEditClick = () => {
    setEditForm({
      name: data.profile.name || "",
      scholarId: data.profile.scholarId || "",
      branch: data.profile.branch || "CSE",
      year: data.profile.year?.toString() || "1",
      phone: data.profile.phone || "",
    });
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(editForm).forEach(([key, value]) =>
      formData.append(key, value),
    );
    if (editFile) formData.append("profilePicture", editFile);

    try {
      await api.put("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile updated successfully!");
      setIsEditing(false);
      fetchProfileData(); // Reload data immediately
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (!data.profile) return null;

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Profile Card */}
      <div className="bg-arena-800 border border-neon-blue rounded p-6 h-max relative">
        {!isEditing ? (
          <>
            <button
              onClick={handleEditClick}
              className="absolute top-4 right-4 text-xs text-neon-blue border border-neon-blue px-2 py-1 rounded hover:bg-neon-blue/20"
            >
              EDIT
            </button>
            <img
              src={
                data.profile.profilePicture || "https://via.placeholder.com/150"
              }
              className="w-24 h-24 rounded-full mx-auto border-2 border-neon-blue mb-4 object-cover"
              alt="pfp"
            />
            <h2 className="text-2xl font-black uppercase text-center mb-4 text-white">
              {data.profile.name}
            </h2>
            <div className="text-sm font-mono text-gray-400 space-y-2 bg-arena-900 p-4 rounded border border-gray-700">
              <p>ID: {data.profile.scholarId}</p>
              <p>
                Class: {data.profile.branch}-{data.profile.year}
              </p>
              <p>Phone NO: {data.profile.phone}</p>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <h3 className="text-neon-blue font-bold uppercase text-center border-b border-gray-700 pb-2">
              Edit Profile
            </h3>

            <input
              type="file"
              onChange={(e) => setEditFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-white file:bg-neon-blue file:border-0 file:rounded file:px-2 file:py-1 file:text-black"
            />

            <input
              required
              placeholder="Name"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
              className="w-full bg-arena-900 p-2 text-white border border-gray-700 rounded text-sm"
            />
            <input
              required
              placeholder="Scholar ID"
              value={editForm.scholarId}
              onChange={(e) =>
                setEditForm({ ...editForm, scholarId: e.target.value })
              }
              className="w-full bg-arena-900 p-2 text-white border border-gray-700 rounded text-sm"
            />

            <select
              value={editForm.branch}
              onChange={(e) =>
                setEditForm({ ...editForm, branch: e.target.value })
              }
              className="w-full bg-arena-900 p-2 text-white border border-gray-700 rounded text-sm"
            >
              <option>CSE</option>
              <option>ECE</option>
              <option>EE</option>
              <option>ME</option>
              <option>CE</option>
              <option>EI</option>
            </select>

            <select
              value={editForm.year}
              onChange={(e) =>
                setEditForm({ ...editForm, year: e.target.value })
              }
              className="w-full bg-arena-900 p-2 text-yellow-400 border border-gray-700 rounded text-sm"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>

            <input
              required
              placeholder="Phone"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              className="w-full bg-arena-900 p-2 text-white border border-gray-700 rounded text-sm"
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 border border-gray-600 text-gray-400 rounded text-sm p-2 hover:bg-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-neon-blue text-black font-bold rounded text-sm p-2 hover:bg-cyan-400"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Battles & Announcements */}
      <div className="md:col-span-2 space-y-8">
        <div className="bg-arena-800 border border-neon-purple p-6 rounded">
          <h3 className="text-xl font-bold uppercase text-neon-purple mb-4">
            My Battles
          </h3>
          {data.solo.length === 0 && data.team.length === 0 && (
            <p className="text-gray-500 font-mono text-sm">
              No battles registered.
            </p>
          )}
          {data.solo.map((r: any) => (
            <p
              key={r._id}
              className="p-3 bg-arena-900 border-l-2 border-neon-blue mb-2 rounded font-bold text-white"
            >
              <span className="text-neon-blue font-normal mr-2">Solo:</span>
              {r.event?.title}
            </p>
          ))}
          {data.team.map((r: any) => (
            <p
              key={r._id}
              className="p-3 bg-arena-900 border-l-2 border-neon-purple mb-2 rounded font-bold text-white"
            >
              <span className="text-neon-purple font-normal mr-2">Team:</span>
              {r.event?.title}{" "}
              <span className="text-gray-400 font-mono text-sm">
                (Crew: {r.teamName})
              </span>
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
