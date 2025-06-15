"use client";
import { useLoading } from "@/context/LoadingContext";
import { Loader2 } from "lucide-react";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <Loader2 size={40} className="animate-spin text-yellow" />
    </div>
  );
};

export default LoadingOverlay;
