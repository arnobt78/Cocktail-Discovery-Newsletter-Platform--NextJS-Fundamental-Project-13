"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BroadcastComposer } from "@/components/admin/BroadcastComposer";
import {
  adminSummaryQueryKey,
  fetchAdminControlRoomSummary,
} from "@/hooks/use-admin-summary-query";
import type {
  BroadcastDraft,
  BroadcastHistoryItem,
  BroadcastQueueItem,
} from "@/types/newsletter";

const EMPTY_DRAFTS: BroadcastDraft[] = [];
const EMPTY_HISTORY: BroadcastHistoryItem[] = [];
const EMPTY_QUEUE: BroadcastQueueItem[] = [];

/**
 * Loads drafts/history/queue on the client so the composer form can render real
 * inputs immediately (no full-page skeleton that mimics fields as pulse blocks).
 */
export function ControlRoomComposerClient() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: adminSummaryQueryKey(),
    queryFn: fetchAdminControlRoomSummary,
    staleTime: 20_000,
    refetchOnWindowFocus: false,
  });

  const initialDrafts = data?.allDrafts ?? EMPTY_DRAFTS;
  const initialHistory = data?.allHistory ?? EMPTY_HISTORY;
  const initialQueue = data?.allQueue ?? EMPTY_QUEUE;

  return (
    <BroadcastComposer
      initialDrafts={initialDrafts}
      initialHistory={initialHistory}
      initialQueue={initialQueue}
      onSummaryInvalidate={() => {
        void queryClient.invalidateQueries({ queryKey: adminSummaryQueryKey() });
      }}
    />
  );
}
