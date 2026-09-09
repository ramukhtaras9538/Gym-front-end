const BASE_URL = import.meta.env.VITE_API_URL || "";

function authHeaders() {
  const token = localStorage.getItem("forge_admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, { method = "GET", body, auth = false } = {}) {
  const hasBody = !["GET", "HEAD"].includes(method.toUpperCase());
  const init = {
    method,
    headers: {
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(auth ? authHeaders() : {}),
    },
  };

  if (hasBody && body) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, init);

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export async function submitInquiry(data) {
  const res = await fetch(`${BASE_URL}/api/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Submission failed (${res.status})`);
  }

  return res.json();
}

// ---- Public reads ----
export const getPage = (page) => request(`/api/content/${page}`);
export const getAllPages = () => request(`/api/content`);

// ---- Auth ----
export const login = (username, password) =>
  request(`/api/auth/login`, { method: "POST", body: { username, password } });

export const checkSession = () => request(`/api/auth/me`, { auth: true });

// ---- Admin writes ----
export const updatePageFields = (page, fields) =>
  request(`/api/content/${page}`, { method: "PUT", body: fields, auth: true });

export const addItem = (page, section, item) =>
  request(`/api/content/${page}/${section}`, { method: "POST", body: item, auth: true });

export const updateItem = (page, section, itemId, item) =>
  request(`/api/content/${page}/${section}/${itemId}`, { method: "PUT", body: item, auth: true });

export const deleteItem = (page, section, itemId) =>
  request(`/api/content/${page}/${section}/${itemId}`, { method: "DELETE", auth: true });

export async function uploadFile(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE_URL}/api/uploads/`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Upload failed (${res.status})`);
  }
  return res.json();
}