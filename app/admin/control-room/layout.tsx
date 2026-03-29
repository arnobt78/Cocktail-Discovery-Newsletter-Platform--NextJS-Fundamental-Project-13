import { AdminControlRoomLayout } from "@/components/admin/AdminControlRoomLayout";
import { getAdminShellGate } from "@/lib/admin-shell-gate";

export default async function ControlRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shell = await getAdminShellGate();
  if (shell.state !== "authenticated") {
    return <>{children}</>;
  }
  return <AdminControlRoomLayout>{children}</AdminControlRoomLayout>;
}
