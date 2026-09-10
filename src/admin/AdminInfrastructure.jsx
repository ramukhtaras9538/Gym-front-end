import { useEffect, useState } from "react";
import { getPage, updatePageFields } from "../lib/api";
import FieldsForm from "./FieldsForm";
import EditableList from "./EditableList";

export default function AdminInfrastructure() {
  const [content, setContent] = useState(null);
  const [savingHero, setSavingHero] = useState(false);

  useEffect(() => {
    getPage("infrastructure").then(setContent);
  }, []);

  if (!content) return <p className="font-mono text-sm text-muted">Loading\u2026</p>;

  async function saveHero(values) {
    setSavingHero(true);
    try {
      setContent(await updatePageFields("infrastructure", { hero: values }));
    } finally {
      setSavingHero(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Editing</span>
        <h2 className="font-display text-3xl uppercase mt-1">Infrastructure page</h2>
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

      <EditableList
        page="infrastructure"
        section="facilities"
        title="Facilities"
        items={content.facilities}
        onChange={setContent}
        fields={[
          { name: "code", label: "Code (e.g. 01)" },
          { name: "name", label: "Name" },
          { name: "sqft", label: "Square footage" },
          { name: "detail", label: "Detail", type: "textarea" },
          { name: "img", label: "Image", type: "file" },
        ]}
      />

      <EditableList
        page="infrastructure"
        section="galleryGroups"
        title="Gallery groups"
        items={content.galleryGroups}
        onChange={setContent}
        fields={[
          { name: "title", label: "Group title" },
          { name: "subtitle", label: "Subtitle" },
          { name: "images", label: "Images (max 5)", type: "file", array: true },
        ]}
      />

      <EditableList
        page="infrastructure"
        section="trainers"
        title="Trainers"
        items={content.trainers}
        onChange={setContent}
        fields={[
          { name: "name", label: "Name" },
          { name: "role", label: "Role" },
          { name: "cert", label: "Certification" },
          { name: "spec", label: "Specialty", type: "textarea" },
          { name: "img", label: "Image", type: "file" },
        ]}
      />
    </div>
  );
}