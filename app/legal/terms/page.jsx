import { LegalPage } from "@/components/legal/legal-page";

export const metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the Providence General Hospital website, including medical information disclaimers and acceptable use.",
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

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="August 26, 2026">
      <P>
        These terms govern your use of the Providence General Hospital website
        and patient portal. By using the site you agree to them. If you do not
        agree, please do not use the site.
      </P>

      <Section title="Medical information disclaimer">
        <P>
          The content on this website is for general information only and is not
          a substitute for professional medical advice, diagnosis, or treatment.
          Always seek the advice of a qualified health provider with any
          questions you have about a medical condition. Never disregard
          professional medical advice because of something you read here.
        </P>
        <P>
          In a medical emergency, call 911 or go to the nearest emergency
          department immediately. Do not rely on this website in an emergency.
        </P>
      </Section>

      <Section title="Use of the patient portal">
        <P>
          The patient portal gives you secure access to your own records. You
          agree to keep your login credentials confidential and to notify us
          immediately if you believe your account has been accessed without
          your permission. You are responsible for activity that occurs under
          your account.
        </P>
      </Section>

      <Section title="Acceptable use">
        <P>When using this website you agree not to:</P>
        <List
          items={[
            "Misuse the site, its forms, or its API endpoints.",
            "Attempt to access another person's records or any restricted system.",
            "Use the site to send unlawful, abusive, or misleading communications.",
            "Attempt to disrupt, overload, or damage the site.",
          ]}
        />
      </Section>

      <Section title="Intellectual property">
        <P>
          The name, logo, images, and content on this site are the property of
          Providence General Hospital or its licensors. You may not reproduce,
          distribute, or commercially use them without written permission, except
          for personal, non-commercial use.
        </P>
      </Section>

      <Section title="Third-party links">
        <P>
          The site may link to external resources, including maps and reference
          material. We are not responsible for the content or practices of any
          third-party site, and a link does not imply endorsement.
        </P>
      </Section>

      <Section title="Availability and liability">
        <P>
          We work to keep the site available and accurate, but we do not
          guarantee that it will always be available, error-free, or free of
          harmful components. To the fullest extent permitted by law, Providence
          General Hospital is not liable for damages arising from your use of
          the site.
        </P>
      </Section>

      <Section title="Changes to these terms">
        <P>
          We may update these terms from time to time. Continued use of the site
          after changes are posted means you accept the updated terms.
        </P>
      </Section>
    </LegalPage>
  );
}
