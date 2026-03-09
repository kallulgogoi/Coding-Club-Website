"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import NeonButton from "@/components/ui/NeonButton";

export default function OnboardingPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    scholarId: "",
    branch: "CSE",
    year: "1",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.put("/auth/onboarding", { ...form, year: Number(form.year) });
      router.push("/events");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      {/* Added suppressHydrationWarning to the form to quiet extensions */}
      <form
        suppressHydrationWarning
        onSubmit={handleSubmit}
        className="max-w-lg w-full bg-arena-800 border border-gray-700 p-8 rounded-lg"
      >
        <h2 className="text-2xl font-black uppercase text-neon-blue mb-6">
          Configure Profile
        </h2>

        <div className="space-y-4">
          <input
            suppressHydrationWarning
            required
            placeholder="Scholar ID"
            className="w-full bg-arena-900 border border-gray-600 p-3 text-white rounded"
            onChange={(e) => setForm({ ...form, scholarId: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <select
              suppressHydrationWarning
              className="bg-arena-900 border border-gray-600 p-3 text-white rounded"
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
            >
              {["CSE", "ECE", "EE", "ME", "CE", "EI"].map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            <select
              suppressHydrationWarning
              className="bg-arena-900 border border-gray-600 p-3 text-white rounded"
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            >
              {[1, 2, 3, 4].map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>
          </div>

          <input
            suppressHydrationWarning
            required
            placeholder="Phone Number"
            className="w-full bg-arena-900 border border-gray-600 p-3 text-white rounded"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div suppressHydrationWarning className="mt-6 text-right">
          <NeonButton type="submit" text="Initialize" color="blue" />
        </div>
      </form>
    </main>
  );
}
