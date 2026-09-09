import { useEffect, useState } from "react";
import { getPage, updatePageFields } from "../lib/api";
import FieldsForm from "./FieldsForm";
import EditableList from "./EditableList";

export default function AdminContact() {
  const [content, setContent] = useState(null);
  const [savingHero, setSavingHero] = useState(false);
  const [savingInfo, setSavingInfo] = useState(false);

  useEffect(() => {
    getPage("contact").then(setContent);
  }, []);

  if (!content) return <p className="font-mono text-sm text-muted">Loading\u2026</p>;

  async function saveHero(values) {
    setSavingHero(true);
    try {
      setContent(await updatePageFields("contact", { hero: values }));
    } finally {
      setSavingHero(false);
    }
  }

  async function saveInfo(values) {
    setSavingInfo(true);
    try {
      setContent(await updatePageFields("contact", { contactInfo: values }));
    } finally {
      setSavingInfo(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Editing</span>
        <h2 className="font-display text-3xl uppercase mt-1">Contact page</h2>
      </div>

      <FieldsForm
        title="Hero"
        values={content.hero}
        saving={savingHero}
        onSave={saveHero}
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Headline" },
          { name: "image", label: "Background image", type: "file" },
        ]}
      />

      <FieldsForm
        title="Contact info"
        values={content.contactInfo}
        saving={savingInfo}
        onSave={saveInfo}
        fields={[
          { name: "address", label: "Address", type: "textarea" },
          { name: "phone", label: "Phone" },
          { name: "email", label: "Email" },
          { name: "website", label: "Website URL" },
          { name: "mapImage", label: "Location photo", type: "file" },
        ]}
      />

      <EditableList
        page="contact"
        section="hours"
        title="Hours"
        items={content.hours}
        onChange={setContent}
        fields={[
          { name: "day", label: "Day / range" },
          { name: "time", label: "Time" },
        ]}
      />

      <EditableList
        page="contact"
        section="whyChooseUs"
        title="Why choose us"
        items={content.whyChooseUs || []}
        onChange={setContent}
        fields={[
          { name: "title", label: "Title" },
          { name: "body", label: "Body", type: "textarea" },
        ]}
      />
    </div>
  );
}