import {
  Page,
  RoleEnum,
  StatusEnum,
  UserModel,
  UserResponse,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => "Unknown error");
    throw new Error(`API ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") q.set(k, String(v));
  }
  return q.toString() ? `?${q}` : "";
}

// ─── Users ────────────────────────────────────────────────────────────────────

export async function createOrUpdateUser(
  model: UserModel
): Promise<UserResponse> {
  const res = await fetch(`${BASE_URL}/users/createOrUpdateUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(model),
  });
  return handleResponse<UserResponse>(res);
}

export async function getUsersByStatus(
  status: string,
  page = 0,
  size = 10,
  searchTerm?: string
): Promise<Page<UserResponse>> {
  const q = buildQuery({ status, page, size, searchTerm });
  const res = await fetch(`${BASE_URL}/users/getUsersByStatus${q}`);
  return handleResponse<Page<UserResponse>>(res);
}

export async function getUsersByStatusAndRole(
  status: string,
  role: string,
  page = 0,
  size = 10,
  searchTerm?: string
): Promise<Page<UserResponse>> {
  const q = buildQuery({ status, role, page, size, searchTerm });
  const res = await fetch(`${BASE_URL}/users/getUsersByStatusAndRole${q}`);
  return handleResponse<Page<UserResponse>>(res);
}

export async function getRoleEnum(): Promise<RoleEnum[]> {
  const res = await fetch(`${BASE_URL}/users/getRoleEnum`);
  return handleResponse<RoleEnum[]>(res);
}

export async function getStatus(): Promise<StatusEnum[]> {
  const res = await fetch(`${BASE_URL}/users/getStatus`);
  return handleResponse<StatusEnum[]>(res);
}
