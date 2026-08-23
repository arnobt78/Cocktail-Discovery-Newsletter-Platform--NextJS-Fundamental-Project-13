/** Resend content from an existing draft or history entry. */
import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-api-auth";
import {
  getBroadcastDraftById,
  getBroadcastHistoryById,
} from "@/lib/newsletter/repository";
import { dispatchBroadcast } from "@/lib/newsletter/broadcast-dispatch";

export async function POST(request: Request): Promise<NextResponse<{ ok: boolean; message: string; sent?: number }>> {
  if (!(await assertAdminSession())) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const payload = (await request.json()) as { sourceId?: string; sourceType?: "draft" | "history" };
  const sourceId = payload.sourceId?.trim();
  const sourceType = payload.sourceType ?? "history";
  if (!sourceId) {
    return NextResponse.json({ ok: false, message: "sourceId is required." }, { status: 400 });
  }

  const source =
    sourceType === "draft"
      ? await getBroadcastDraftById(sourceId)
      : await getBroadcastHistoryById(sourceId);
  if (!source) {
    return NextResponse.json({ ok: false, message: "Source post not found." }, { status: 404 });
  }

  const sent = (
    await dispatchBroadcast({
      subject: source.subject,
      preheader: source.preheader,
      body: source.body,
      ctaLabel: source.ctaLabel,
      ctaUrl: source.ctaUrl,
      audience: source.audience,
    })
  ).sent;

  return NextResponse.json(
    { ok: true, message: `Resent to ${sent} subscribers.`, sent },
    { status: 200 },
  );
}
