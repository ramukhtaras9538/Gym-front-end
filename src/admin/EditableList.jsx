import { useState } from "react";
import { addItem, updateItem, deleteItem } from "../lib/api";

/**
 * EditableList
 * Renders an array-backed content section (features, stats, trainers, etc.)
 * with inline add/edit/delete. Pass a `fields` config describing the shape
 * of one item — this one component drives every array section across all
 * four admin pages.
 *
 * fields: [{ name, label, type?: "text" | "textarea" | "number" }]
 */
export default function EditableList({ page, section, title, items = [], fields, onChange }) {
  const [adding, setAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function normalizeArrayValue(value) {
    if (Array.isArray(value)) return value.filter(Boolean).map((item) => String(item).trim()).filter(Boolean);
    if (typeof value === "string") return value.split(",").map((item) => item.trim()).filter(Boolean);
    return [];
  }

  function emptyForm() {
    const f = {};
    fields.forEach((field) => {
      if (field.array) {
        f[field.name] = field.type === "file" ? [] : "";
      } else {
        f[field.name] = field.type === "number" ? 0 : "";
      }
    });
    return f;
  }

  function startAdd() {
    setForm(emptyForm());
    setEditingId(null);
    setAdding(true);
    setError("");
  }

  function startEdit(item) {
    const f = {};
    fields.forEach((field) => {
      const rawValue = item[field.name];
      if (field.array) {
        if (field.type === "file") {
          f[field.name] = Array.isArray(rawValue) ? rawValue : (rawValue ? String(rawValue).split(",").map((part) => part.trim()).filter(Boolean) : []);
        } else {
          f[field.name] = Array.isArray(rawValue) ? rawValue.join(", ") : rawValue ?? "";
        }
      } else {
        f[field.name] = rawValue ?? (field.type === "number" ? 0 : "");
      }
    });
    setForm(f);
    setEditingId(item._id);
    setAdding(false);
    setError("");
  }

  function cancel() {
    setAdding(false);
    setEditingId(null);
    setError("");
  }

  function normalizeFileInput(value) {
    if (value instanceof File) return value;
    if (value && typeof value === "object" && value !== null) {
      if (Array.isArray(value)) return value.filter((item) => item instanceof File);
      if (typeof value[0] !== "undefined" && value[0] instanceof File) {
        return value[0];
      }
      if (typeof value.length === "number" && value.length > 0 && value[0] instanceof File) {
        return value[0];
      }
    }
    return value;
  }

  function handleFieldChange(name, type, value, isArray = false) {
    let nextValue = value;

    if (type === "file" && !isArray && value && typeof value === "object" && !(value instanceof File)) {
      nextValue = normalizeFileInput(value);
    }

    if (type === "file" && isArray && value && typeof value === "object" && !(value instanceof File)) {
      nextValue = Array.from(value || []).filter((item) => item instanceof File);
    }

    setForm((f) => ({
      ...f,
      [name]: isArray && type === "file"
        ? nextValue
        : isArray
          ? value
          : type === "number"
            ? Number(value)
            : nextValue,
    }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = { ...form };
      for (const field of fields) {
        const fieldValue = payload[field.name];

        if (field.type === "file" && fieldValue instanceof File) {
          const resp = await (await import("../lib/api")).uploadFile(fieldValue);
          payload[field.name] = resp.url;
        } else if (field.type === "file" && Array.isArray(fieldValue)) {
          const uploaded = [];
          for (const item of fieldValue) {
            const normalized = normalizeFileInput(item);
            if (normalized instanceof File) {
              const resp = await (await import("../lib/api")).uploadFile(normalized);
              uploaded.push(resp.url);
            } else if (typeof item === "string" && item.trim()) {
              uploaded.push(item.trim());
            }
          }
          payload[field.name] = uploaded;
        } else if (field.type === "file" && fieldValue && typeof fieldValue === "object" && !(fieldValue instanceof File)) {
          const normalized = normalizeFileInput(fieldValue);
          if (normalized instanceof File) {
            const resp = await (await import("../lib/api")).uploadFile(normalized);
            payload[field.name] = resp.url;
          }
        }

        if (field.array && typeof payload[field.name] === "string") {
          payload[field.name] = normalizeArrayValue(payload[field.name]);
        }

        if (field.array && Array.isArray(payload[field.name])) {
          payload[field.name] = payload[field.name]
            .map((item) => String(item).trim())
            .filter(Boolean);
        }
      }

      let doc;
      if (editingId) {
        doc = await updateItem(page, section, editingId, payload);
      } else {
        doc = await addItem(page, section, payload);
      }
      onChange(doc);
      cancel();
    } catch (err) {
      setError(err.message || "Save failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(itemId) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    setBusy(true);
    try {
      const doc = await deleteItem(page, section, itemId);
      onChange(doc);
    } catch (err) {
      setError(err.message || "Delete failed");
    } finally {
      setBusy(false);
    }
  }

  const showForm = adding || editingId;

  return (
    <div className="border border-line bg-surface p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-xl uppercase">{title}</h3>
        {!showForm && (
          <button
            onClick={startAdd}
            className="font-mono text-xs uppercase tracking-widest text-accent hover:underline"
          >
            + Add
          </button>
        )}
      </div>

      {error && <p className="text-accent text-sm font-mono mb-4">{error}</p>}

      {showForm && (
        <form onSubmit={handleSave} className="mb-8 border border-line bg-bg p-5 space-y-4">
          {fields.map((field) => (
            <label key={field.name} className="block">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {field.label}
              </span>
                {field.type === "textarea" ? (
                <textarea
                  value={form[field.name] ?? ""}
                  onChange={(e) => handleFieldChange(field.name, field.type, e.target.value, !!field.array)}
                  rows={3}
                  className="mt-1 w-full bg-transparent border-b border-line focus:border-accent py-2 outline-none resize-none text-sm"
                />
                ) : field.type === "file" ? (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      multiple={!!field.array}
                      onChange={(e) => handleFieldChange(field.name, field.type, e.target.files, !!field.array)}
                      className="mt-1"
                    />

                    {field.array && Array.isArray(form[field.name]) && form[field.name].length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {form[field.name].map((url, index) => (
                          <img
                            key={`${field.name}-${index}`}
                            src={url}
                            alt={`${field.label} ${index + 1}`}
                            className="h-24 w-full object-cover rounded-md border border-line"
                          />
                        ))}
                      </div>
                    )}

                    {!field.array && typeof form[field.name] === "string" && form[field.name] && (
                      <img
                        src={form[field.name]}
                        alt="Current file"
                        className="mt-4 h-36 w-full object-cover rounded-md border border-line"
                      />
                    )}
                  </>
                ) : (
                  <input
                    type={field.type === "number" ? "number" : "text"}
                    value={form[field.name] ?? ""}
                    onChange={(e) => handleFieldChange(field.name, field.type, e.target.value)}
                    className="mt-1 w-full bg-transparent border-b border-line focus:border-accent py-2 outline-none text-sm"
                  />
                )}
            </label>
          ))}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={busy}
              className="bg-accent text-bg font-mono text-[11px] uppercase tracking-widest font-bold px-5 py-2.5 hover:bg-ink transition-colors disabled:opacity-50"
            >
              {editingId ? "Save changes" : "Add item"}
            </button>
            <button
              type="button"
              onClick={cancel}
              className="border border-line font-mono text-[11px] uppercase tracking-widest px-5 py-2.5 hover:border-accent hover:text-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p className="text-muted text-sm font-mono">No items yet.</p>
      ) : (
        <ul className="divide-y divide-line">
          {items.map((item) => (
            <li key={item._id} className="py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium text-ink truncate">
                  {item[fields[0].name] || "\u2014"}
                </p>
                {fields[1] && (
                  <p className="text-muted text-sm mt-1 line-clamp-2">
                    {fields[1].array && Array.isArray(item[fields[1].name])
                      ? item[fields[1].name].join(", ")
                      : item[fields[1].name]}
                  </p>
                )}
              </div>
              <div className="flex gap-3 shrink-0 font-mono text-[11px] uppercase tracking-widest">
                <button onClick={() => startEdit(item)} className="text-accent hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-muted hover:text-accent hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}