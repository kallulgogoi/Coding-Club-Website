"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import { Megaphone, Calendar, AlertCircle, ChevronRight } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data } = await api.get("/announcements");
        setAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch transmissions", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Custom spinner
  const LoadingSpinner = () => (
    <div className="relative">
      <div className="w-16 h-16 border-3 border-yellow-400/20 border-t-yellow-400 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-yellow-400/40 rounded-full animate-ping"></div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <LoadingSpinner />
        <p className="mt-4 text-sm text-white/50 font-medium uppercase tracking-wider">
          Loading Announcements
        </p>
      </div>
    );

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Simple Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-yellow-400" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Announcements
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Latest updates and important information
            </p>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {announcements.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 border border-yellow-400/20 rounded-2xl bg-[#111111]">
              <AlertCircle className="w-12 h-12 text-yellow-400/40 mx-auto mb-4" />
              <p className="text-white/60 text-lg font-medium">
                No announcements
              </p>
              <p className="text-white/30 text-sm mt-2">
                Check back later for updates
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-[#111111] border border-yellow-400/10 rounded-xl overflow-hidden hover:border-yellow-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/5"
              >
                {/* Header with date */}
                <div className="px-6 pt-6 pb-3 flex items-center justify-between border-b border-yellow-400/10">
                  <h2 className="text-xl font-bold text-white">
                    {announcement.title}
                  </h2>
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      {new Date(announcement.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        },
                      )}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-white/70 text-base leading-relaxed whitespace-pre-wrap">
                    {announcement.message}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-6 pb-6 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                    <span className="text-yellow-400/60 text-xs font-medium uppercase tracking-wider">
                      Official Announcement
                    </span>
                  </div>
                  <div className="flex-1"></div>
                  <div className="text-white/20 text-xs">#{index + 1}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
