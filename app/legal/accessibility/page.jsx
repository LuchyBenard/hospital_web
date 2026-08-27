import { LegalPage } from "@/components/legal/legal-page";

export const metadata = {
  title: "Accessibility",
  description:
    "Providence General Hospital's commitment to web accessibility and how to request assistance or report a barrier.",
};

function Section({ title, children }) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold text-fg mb-3">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed text-fg">{children}</div>
    </section>
  );
}

function P({ children }) {
  return <p>{children}</p>;
}

function List({ items }) {
  return (
    <ul className="list-disc space-y-1.5 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function AccessibilityPage() {
  return (
    <LegalPage title="Accessibility" updated="August 26, 2026">
      <P>
        Providence General Hospital is committed to ensuring our website is
        usable by everyone, including people who rely on assistive technology,
        keyboard-only navigation, or screen readers. We aim to meet the Web
        Content Accessibility Guidelines (WCAG) 2.1 Level AA.
      </P>

      <Section title="What we are doing">
        <List
          items={[
            "Maintaining sufficient color contrast for text and interface elements.",
            "Supporting keyboard navigation throughout the site.",
            "Providing text alternatives for meaningful imagery.",
            "Honoring reduced-motion preferences so animation does not cause discomfort.",
            "Labeling interactive controls and form fields.",
          ]}
        />
      </Section>

      <Section title="Known limits">
        <P>
          Some pages currently use placeholder imagery and prototype
          functionality. As real content and services are added, we review them
          against the same accessibility standards. We welcome feedback that
          helps us improve.
        </P>
      </Section>

      <Section title="Request assistance or share feedback">
        <P>
          If you have trouble using any part of this site, or if you would like
          information in an alternative format, please contact us. We will do
          our best to respond within two business days.
        </P>
        <List
          items={[
            "Email: accessibility@providencegeneral.org",
            "Phone: (800) 555-0199",
            "In person: our front desk can connect you with our web accessibility team.",
          ]}
        />
      </Section>
    </LegalPage>
  );
}
