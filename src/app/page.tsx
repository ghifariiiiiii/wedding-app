"use client";

// ============================================================
// app/page.tsx — Thin wrapper for template-modern-interactive
// Reads ?to=GuestName URL query param for personalization
// ============================================================

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ModernInteractiveTemplate from "@/templates/modern-interactive";
import { weddingData } from "@/config/weddingData";

// Inner component that reads search params
// (needs to be wrapped in Suspense for static export compatibility)
function WeddingPage() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get(weddingData.meta.guestParamKey);

  return <ModernInteractiveTemplate guestName={guestName} />;
}

// Suspense fallback — minimal loading state to avoid layout shift
function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F5F8FF]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated ring */}
        <div
          className="w-16 h-16 rounded-full border-2 border-[#7EA7E8]/30 border-t-[#4A7BC8] animate-spin"
          role="status"
          aria-label="Memuat undangan..."
        />
        <p className="font-great-vibes text-3xl text-[#4A7BC8]/50">Loading...</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <WeddingPage />
    </Suspense>
  );
}
