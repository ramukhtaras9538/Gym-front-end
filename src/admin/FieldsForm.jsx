import { useState, useEffect } from "react";

/**
 * FieldsForm
 * Edits a single object of scalar fields (hero, contactInfo, mission copy...).
 * Parent owns the save call — this just collects values and hands them back.
 */
export default function FieldsForm({ title, fields, values = {}, onSave, saving }) {
  const [form, setForm] = useState(values);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(values || {});
  }, [values]);

  function handleChange(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      // Handle file uploads: upload any File objects and replace with URL
      const payload = { ...form };
      for (const field of fields) {
        if (field.type === "file" && payload[field.name] instanceof File) {
          const file = payload[field.name];
          const resp = await (await import("../lib/api")).uploadFile(file);
          payload[field.name] = resp.url;
        }
      }
      await onSave(payload);
    } catch (err) {
      setError(err.message || "Save failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-surface p-6 md:p-8">
      <h3 className="font-display text-xl uppercase mb-6">{title}</h3>

      {error && <p className="text-accent text-sm font-mono mb-4">{error}</p>}

      <div className="space-y-5">
        {fields.map((field) => (
          <label key={field.name} className="block">
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
              {field.label}
            </span>
            {field.type === "textarea" ? (
              <textarea
                value={form[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                rows={4}
                className="mt-1 w-full bg-transparent border-b border-line focus:border-accent py-2 outline-none resize-none text-sm"
              />
            ) : field.type === "file" ? (
              <input
                type="file"
                onChange={(e) => handleChange(field.name, e.target.files[0])}
                className="mt-1"
              />
            ) : (
              <input
                type="text"
                value={form[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="mt-1 w-full bg-transparent border-b border-line focus:border-accent py-2 outline-none text-sm"
              />
            )}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-6 bg-accent text-bg font-mono text-[11px] uppercase tracking-widest font-bold px-5 py-2.5 hover:bg-ink transition-colors disabled:opacity-50"
      >
        {saving ? "Saving\u2026" : "Save"}
      </button>
    </form>
  );
}