/**
 * Unit tests for admin session verification and API registry doc accuracy.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { PROJECT_API_DOC_GROUPS } from "@/data/project-api-registry";

describe("admin session", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.ADMIN_DASHBOARD_KEY = "112233";
    process.env.ADMIN_SESSION_SECRET = "test-session-secret";
  });

  it("accepts a valid signed session cookie", async () => {
    const { createAdminSessionValue, verifyAdminSessionValue } = await import(
      "@/lib/admin-session"
    );
    const token = createAdminSessionValue();
    expect(verifyAdminSessionValue(token)).toBe(true);
  });

  it("rejects tampered session cookies", async () => {
    const { createAdminSessionValue, verifyAdminSessionValue } = await import(
      "@/lib/admin-session"
    );
    const token = createAdminSessionValue().replace(/.$/, "x");
    expect(verifyAdminSessionValue(token)).toBe(false);
  });

  it("verifies passkey against ADMIN_DASHBOARD_KEY", async () => {
    const { verifyAdminPasskey } = await import("@/lib/admin-session");
    expect(verifyAdminPasskey("112233")).toBe(true);
    expect(verifyAdminPasskey("000000")).toBe(false);
  });
});

describe("project API registry", () => {
  it("documents newsletter subscribe body fields matching types", () => {
    const subscribe = PROJECT_API_DOC_GROUPS
      .flatMap((group) => group.endpoints)
      .find((endpoint) => endpoint.path === "/api/newsletter");
    expect(subscribe?.request).toContain("firstName");
    expect(subscribe?.request).toContain("lastName");
    expect(subscribe?.request).toContain("email");
  });

  it("documents admin login passkey field matching route handler", () => {
    const login = PROJECT_API_DOC_GROUPS
      .flatMap((group) => group.endpoints)
      .find((endpoint) => endpoint.path === "/api/admin/session/login");
    expect(login?.request).toContain("passkey");
    expect(login?.request).not.toContain("password");
  });
});
