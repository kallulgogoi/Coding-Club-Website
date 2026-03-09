"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth"; // Added security
import api from "@/lib/api";
import NeonButton from "@/components/ui/NeonButton";

export default function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const router = useRouter();

  const [tab, setTab] = useState("events");
  const [data, setData] = useState({ events: [], ann: [] });
  const [regs, setRegs] = useState([]);

  // Forms
  const [evForm, setEvForm] = useState({
    title: "",
    description: "",
    startDateIST: "",
    endDateIST: "",
    mode: "solo",
    maxTeamSize: "1",
  });
  const [evFile, setEvFile] = useState<File | null>(null);
  const [annForm, setAnnForm] = useState({ title: "", message: "" });

  const fetchData = () =>
    Promise.all([api.get("/events"), api.get("/announcements")]).then(
      ([e, a]) => setData({ events: e.data, ann: a.data }),
    );

  useEffect(() => {
    // Security Guard: Boot non-admins out to the events page
    if (!loading && !isAdmin) {
      router.push("/events");
    } else if (isAdmin) {
      fetchData();
    }
  }, [loading, isAdmin, router]);

  const createEvent = async (e: any) => {
    e.preventDefault();
    if (!evFile) return alert("Please upload a poster image!"); // Safety check

    const fd = new FormData();
    Object.entries(evForm).forEach(([k, v]) => fd.append(k, v));
    fd.append("poster", evFile);

    try {
      await api.post("/events", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event deployed successfully!");
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  const createAnn = async (e: any) => {
    e.preventDefault();
    try {
      await api.post("/announcements", annForm);
      setAnnForm({ title: "", message: "" }); // Clear form
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to post");
    }
  };

  const delEvent = async (id: string) => {
    await api.delete(`/events/${id}`);
    fetchData();
  };

  const toggleEvent = async (id: string, st: string) => {
    await api.put(`/events/${id}/registration-status`, {
      registrationStatus: st === "open" ? "closed" : "open",
    });
    fetchData();
  };

  const fetchRegs = async (id: string) => {
    const ev: any = data.events.find((e: any) => e._id === id);
    if (ev)
      api
        .get(`/registrations/${ev.mode}/event/${id}`)
        .then((res) => setRegs(res.data));
  };

  if (loading || !isAdmin) return <div className="min-h-screen bg-arena-900" />;

  return (
    <main className="min-h-screen p-8 flex flex-col md:flex-row gap-8">
      <div className="md:w-64 space-y-4 font-mono">
        <h1 className="text-2xl font-black text-neon-red mb-8">
          Master Control
        </h1>
        {["events", "announcements", "registrations"].map((t) => (
          <p
            key={t}
            onClick={() => setTab(t)}
            className={`cursor-pointer uppercase ${tab === t ? "text-neon-red border-l-2 border-neon-red pl-2" : "text-gray-400"}`}
          >
            {t}
          </p>
        ))}
      </div>

      <div className="flex-1">
        {tab === "events" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.events.map((e: any) => (
                <div
                  key={e._id}
                  className="border border-gray-600 p-4 rounded bg-arena-800"
                >
                  <h3 className="font-bold text-white">{e.title}</h3>
                  <button
                    onClick={() => toggleEvent(e._id, e.registrationStatus)}
                    className="text-xs text-neon-blue block mt-2"
                  >
                    Toggle Status (Current: {e.registrationStatus})
                  </button>
                  <button
                    onClick={() => delEvent(e._id)}
                    className="text-xs text-neon-red block mt-2"
                  >
                    Delete Event
                  </button>
                </div>
              ))}
            </div>

            <form
              onSubmit={createEvent}
              className="bg-arena-800 p-6 grid grid-cols-2 gap-4 rounded border border-gray-700"
            >
              <input
                required
                placeholder="Title"
                onChange={(e) =>
                  setEvForm({ ...evForm, title: e.target.value })
                }
                className="col-span-2 bg-arena-900 p-2 text-white border border-gray-700"
              />
              <select
                onChange={(e) => setEvForm({ ...evForm, mode: e.target.value })}
                className="bg-arena-900 p-2 text-white border border-gray-700"
              >
                <option value="solo">Solo</option>
                <option value="team">Team</option>
              </select>
              <input
                type="number"
                placeholder="Max Team Size"
                onChange={(e) =>
                  setEvForm({ ...evForm, maxTeamSize: e.target.value })
                }
                className="bg-arena-900 p-2 text-white border border-gray-700"
              />
              <input
                type="datetime-local"
                onChange={(e) =>
                  setEvForm({ ...evForm, startDateIST: e.target.value })
                }
                className="bg-arena-900 p-2 text-white border border-gray-700"
              />
              <input
                type="datetime-local"
                onChange={(e) =>
                  setEvForm({ ...evForm, endDateIST: e.target.value })
                }
                className="bg-arena-900 p-2 text-white border border-gray-700"
              />
              <textarea
                placeholder="Description"
                onChange={(e) =>
                  setEvForm({ ...evForm, description: e.target.value })
                }
                className="col-span-2 bg-arena-900 p-2 text-white border border-gray-700"
              />
              <input
                type="file"
                onChange={(e) => setEvFile(e.target.files?.[0] || null)}
                className="col-span-2 text-white file:bg-neon-blue file:border-0 file:rounded file:px-2 file:py-1 file:text-black"
              />
              <div className="col-span-2 flex justify-end">
                <NeonButton type="submit" text="Create Event" color="blue" />
              </div>
            </form>
          </div>
        )}

        {tab === "announcements" && (
          <div>
            <form
              onSubmit={createAnn}
              className="bg-arena-800 p-6 mb-6 space-y-4 rounded border border-gray-700"
            >
              <input
                required
                placeholder="Title"
                value={annForm.title}
                onChange={(e) =>
                  setAnnForm({ ...annForm, title: e.target.value })
                }
                className="w-full bg-arena-900 p-2 text-white border border-gray-700"
              />
              <textarea
                required
                placeholder="Message"
                value={annForm.message}
                onChange={(e) =>
                  setAnnForm({ ...annForm, message: e.target.value })
                }
                className="w-full bg-arena-900 p-2 text-white border border-gray-700"
              />
              <NeonButton type="submit" text="Post Transmission" color="red" />
            </form>
            {data.ann.map((a: any) => (
              <div
                key={a._id}
                className="p-4 border-l-4 border-neon-red bg-arena-800 mb-2 rounded"
              >
                <p className="font-bold text-white">{a.title}</p>
                <button
                  onClick={async () => {
                    await api.delete(`/announcements/${a._id}`);
                    fetchData();
                  }}
                  className="text-red-500 text-xs mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "registrations" && (
          <div>
            <select
              onChange={(e) => fetchRegs(e.target.value)}
              className="w-full bg-arena-800 p-4 text-white border border-neon-purple rounded mb-4"
            >
              <option value="">Select Event</option>
              {data.events.map((e: any) => (
                <option key={e._id} value={e._id}>
                  {e.title}
                </option>
              ))}
            </select>
            <div className="space-y-2">
              {regs.map((r: any, i) => (
                <div
                  key={i}
                  className="p-4 bg-arena-800 border-l-2 border-neon-purple rounded font-mono"
                >
                  {r.teamName
                    ? `Team: ${r.teamName} | Leader: ${r.teamLeader}`
                    : `Solo: ${r.user?.name} (${r.user?.email})`}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
