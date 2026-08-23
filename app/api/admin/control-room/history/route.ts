/** Resend history rows: DELETE by id or clear all. */
import { NextResponse } from "next/server";
import { assertAdminSession } from "@/lib/admin-api-auth";
import {
  clearBroadcastHistory,
  deleteBroadcastHistoryItem,
} from "@/lib/newsletter/repository";

export async function DELETE(request: Request): Promise<NextResponse<{ ok: boolean; message: string }>> {
  if (!(await assertAdminSession())) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    await deleteBroadcastHistoryItem(id);
    return NextResponse.json({ ok: true, message: "History item deleted." }, { status: 200 });
  }

  await clearBroadcastHistory();
  return NextResponse.json({ ok: true, message: "All history deleted." }, { status: 200 });
}
