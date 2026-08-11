import { useEffect, useState } from "react";
import { getPage, updatePageFields } from "../lib/api";
import FieldsForm from "./FieldsForm";
import EditableList from "./Editablelist";

export default function AdminAbout() {
  const [content, setContent] = useState(null);
  const [savingHero, setSavingHero] = useState(false);
  const [savingMission, setSavingMission] = useState(false);
  const [savingClosing, setSavingClosing] = useState(false);

  useEffect(() => {
    getPage("about").then(setContent);
  }, []);

  if (!content) return <p className="font-mono text-sm text-muted">Loading\u2026</p>;

  async function saveHero(values) {
    setSavingHero(true);
    try {
      setContent(await updatePageFields("about", { hero: values }));
    } finally {
      setSavingHero(false);
    }
  }

  async function saveMission(values) {
    setSavingMission(true);
    try {
      setContent(
        await updatePageFields("about", {
          missionTitle: values.missionTitle,
          missionBody: values.missionBody,
          missionImage: values.missionImage,
        })
      );
    } finally {
      setSavingMission(false);
    }
  }

  async function saveClosing(values) {
    setSavingClosing(true);
    try {
      setContent(await updatePageFields("about", { closingImage: values.closingImage }));
    } finally {
      setSavingClosing(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Editing</span>
        <h2 className="font-display text-3xl uppercase mt-1">About page</h2>
      </div>

      <FieldsForm
        title="Hero"
        values={content.hero}
        saving={savingHero}
        onSave={saveHero}
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Headline" },
          { name: "subtitle", label: "Subtitle", type: "textarea" },
          { name: "image", label: "Background image", type: "file" },
        ]}
      />

      <FieldsForm
        title="Mission"
        values={{
          missionTitle: content.missionTitle,
          missionBody: content.missionBody,
          missionImage: content.missionImage,
        }}
        saving={savingMission}
        onSave={saveMission}
        fields={[
          { name: "missionTitle", label: "Mission headline" },
          { name: "missionBody", label: "Mission body", type: "textarea" },
          { name: "missionImage", label: "Mission image", type: "file" },
        ]}
      />

      <EditableList
        page="about"
        section="values"
        title="Values"
        items={content.values}
        onChange={setContent}
        fields={[
          { name: "title", label: "Title" },
          { name: "body", label: "Body", type: "textarea" },
        ]}
      />

      <EditableList
        page="about"
        section="timeline"
        title="Timeline"
        items={content.timeline}
        onChange={setContent}
        fields={[
          { name: "year", label: "Year" },
          { name: "text", label: "Text", type: "textarea" },
          { name: "img", label: "Image URL" },
        ]}
      />

      <FieldsForm
        title="Closing band"
        values={{ closingImage: content.closingImage }}
        saving={savingClosing}
        onSave={saveClosing}
        fields={[{ name: "closingImage", label: "Background image", type: "file" }]}
      />
    </div>
  );
}