"use client";

import { TrainingView } from "@/components/training/training-view";
import { useAuth } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TrainingPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return <TrainingView user={user} />;
}