"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Bell, X, CheckCheck, Inbox } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationWidget({
  onClose,
}: {
  onClose: () => void;
}) {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();

    // Prevent scrolling on the background when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllAsRead = async () => {
    // Optional utility: loop through unread and mark them
    const unread = notifications.filter((n) => !n.isRead);
    for (const n of unread) {
      await markAsRead(n._id);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      >
        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing it
          className="w-full max-w-3xl max-h-[85vh] bg-[#0d0d0d] border border-white/10 rounded-2xl flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden relative"
        >
          {/* Top Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent blur-sm" />

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#111111] shrink-0">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                <Bell className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-xl font-black uppercase tracking-wider text-white leading-none">
                  Command Center
                </h2>
                <p className="text-xs text-white/40 font-medium uppercase tracking-widest mt-1">
                  System Alerts & Notifications
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-xs text-white/60 hover:text-white transition-colors uppercase font-bold tracking-wider"
                >
                  <CheckCheck className="w-4 h-4" />
                  Mark All Read
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 text-white/40 border border-white/5 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Notification List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-3 bg-[#050505]">
            {notifications.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 py-12">
                <Inbox className="w-16 h-16 text-white/20 mb-4" />
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest">
                  Transmission Empty
                </p>
                <p className="text-white/30 text-xs mt-2">
                  You have no new alerts at this time.
                </p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => !n.isRead && markAsRead(n._id)}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                    n.isRead
                      ? "bg-[#0a0a0a] border-white/5 opacity-60"
                      : "bg-[#111111] border-yellow-400/30 hover:border-yellow-400/60 cursor-pointer shadow-lg shadow-yellow-400/5 hover:shadow-yellow-400/10"
                  }`}
                >
                  {!n.isRead && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
                  )}

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h4
                      className={`text-base sm:text-lg font-black uppercase tracking-tight ${
                        n.isRead ? "text-gray-400" : "text-white"
                      }`}
                    >
                      {n.title}
                    </h4>

                    <span className="shrink-0 text-[10px] sm:text-xs text-white/30 font-mono uppercase tracking-widest bg-white/5 px-3 py-1 rounded-md">
                      {new Date(n.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p
                    className={`text-sm sm:text-base leading-relaxed ${n.isRead ? "text-gray-500" : "text-white/80"}`}
                  >
                    {n.message}
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    {!n.isRead && (
                      <span className="text-[10px] text-yellow-400 font-black uppercase tracking-[0.2em] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                        New Alert
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
