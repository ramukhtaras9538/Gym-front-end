import { useEffect, useState } from "react";
import { getPage, updatePageFields } from "../lib/api";
import FieldsForm from "./FieldsForm";
import EditableList from "./EditableList";

export default function AdminHome() {
  const [content, setContent] = useState(null);
  const [savingHero, setSavingHero] = useState(false);
  const [savingMarquee, setSavingMarquee] = useState(false);
  const [savingAbout, setSavingAbout] = useState(false);
  const [savingCta, setSavingCta] = useState(false);

  useEffect(() => {
    getPage("home").then(setContent);
  }, []);

  if (!content) return <p className="font-mono text-sm text-muted">Loading\u2026</p>;

  async function saveHero(values) {
    setSavingHero(true);
    try {
      const doc = await updatePageFields("home", { hero: values });
      setContent(doc);
    } finally {
      setSavingHero(false);
    }
  }

  async function saveMarquee(values) {
    setSavingMarquee(true);
    try {
      const doc = await updatePageFields("home", {
        marquee: values.marquee,
        secondaryMarquee: values.secondaryMarquee,
      });
      setContent(doc);
    } finally {
      setSavingMarquee(false);
    }
  }

  async function saveAbout(values) {
    setSavingAbout(true);
    try {
      const doc = await updatePageFields("home", { aboutSection: values });
      setContent(doc);
    } finally {
      setSavingAbout(false);
    }
  }

  async function saveCta(values) {
    setSavingCta(true);
    try {
      const doc = await updatePageFields("home", { ctaImage: values.ctaImage });
      setContent(doc);
    } finally {
      setSavingCta(false);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="font-mono text-xs uppercase tracking-widest text-accent">Editing</span>
        <h2 className="font-display text-3xl uppercase mt-1">Home page</h2>
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
        title="Marquee text"
        values={{ marquee: content.marquee || "", secondaryMarquee: content.secondaryMarquee || "" }}
        saving={savingMarquee}
        onSave={saveMarquee}
        fields={[
          { name: "marquee", label: "Top marquee" },
          { name: "secondaryMarquee", label: "Bottom marquee" },
        ]}
      />

      <FieldsForm
        title="About us section"
        values={content.aboutSection || { eyebrow: "", title: "", body: "", image: "" }}
        saving={savingAbout}
        onSave={saveAbout}
        fields={[
          { name: "eyebrow", label: "Eyebrow" },
          { name: "title", label: "Title" },
          { name: "body", label: "Body", type: "textarea" },
          { name: "image", label: "Image", type: "file" },
        ]}
      />

      <FieldsForm
        title="Closing CTA"
        values={{ ctaImage: content.ctaImage }}
        saving={savingCta}
        onSave={saveCta}
        fields={[{ name: "ctaImage", label: "Background image", type: "file" }]}
      />

      <EditableList
        page="home"
        section="stats"
        title="Stats"
        items={content.stats}
        onChange={setContent}
        fields={[
          { name: "label", label: "Label" },
          { name: "to", label: "Number", type: "number" },
          { name: "suffix", label: "Suffix (e.g. +, sqft)" },
        ]}
      />

      <EditableList
        page="home"
        section="features"
        title="Features"
        items={content.features}
        onChange={setContent}
        fields={[
          { name: "title", label: "Title" },
          { name: "body", label: "Body", type: "textarea" },
          { name: "img", label: "Image", type: "file" },
        ]}
      />

      <EditableList
        page="home"
        section="programs"
        title="Programs"
        items={content.programs}
        onChange={setContent}
        fields={[
          { name: "code", label: "Code (e.g. STR)" },
          { name: "name", label: "Name" },
          { name: "desc", label: "Description", type: "textarea" },
          { name: "img", label: "Image", type: "file" },
        ]}
      />
    </div>
  );
}