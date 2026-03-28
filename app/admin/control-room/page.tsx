import { cookies } from "next/headers";
import { Card } from "@/components/ui/card";
import { getControlRoomSummary } from "@/lib/newsletter/control-room";
import {
  getAdminSessionCookieName,
  verifyAdminSessionValue,
} from "@/lib/admin-session";
import { AdminAccessDialog } from "@/components/admin/AdminAccessDialog";
import { ControlRoomClient } from "@/components/admin/ControlRoomClient";

export default async function ControlRoomPage() {
  const expectedKey = process.env.ADMIN_DASHBOARD_KEY;
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(getAdminSessionCookieName())?.value;
  const isAllowed = verifyAdminSessionValue(sessionValue);

  if (!expectedKey) {
    return (
      <section className="mx-auto w-full max-w-9xl px-4 py-10 sm:px-8">
        <Card className="glass-panel border-amber-300/30 bg-amber-500/10 p-6 text-amber-100">
          Set `ADMIN_DASHBOARD_KEY` in `.env` to enable the admin control room.
        </Card>
      </section>
    );
  }

  if (!isAllowed) {
    return <AdminAccessDialog />;
  }

  const summary = await getControlRoomSummary();
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "Not configured";
  const replyToEmail = process.env.RESEND_REPLY_TO_EMAIL ?? "Not configured";

  return (
    <ControlRoomClient summary={summary} fromEmail={fromEmail} replyToEmail={replyToEmail} />
  );
}
