import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-api-auth";
import { getControlRoomSummary } from "@/lib/newsletter/control-room";

export async function GET(): Promise<NextResponse<Awaited<ReturnType<typeof getControlRoomSummary>> | { ok: false }>> {
  if (!(await assertAdminSession())) {
    return NextResponse.json({ ok: false as const }, { status: 401 });
  }
  const summary = await getControlRoomSummary();
  return NextResponse.json(summary);
}
