import { LegalPage } from "@/components/legal/legal-page";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Providence General Hospital collects, protects, and shares your personal and health information, and your HIPAA rights.",
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

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 26, 2026">
      <P>
        Providence General Hospital is committed to protecting the privacy of
        the people we serve. This policy explains what information we collect
        through this website and the patient portal, how we use it, and the
        rights you have over it. It follows the Health Insurance Portability
        and Accountability Act (HIPAA) and applicable state law.
      </P>

      <Section title="Information we collect">
        <P>We collect two broad categories of information:</P>
        <List
          items={[
            "Contact and identity information, such as your name, email, phone number, date of birth, and insurance details, when you book an appointment or open a patient account.",
            "Health information, such as your medical records, prescriptions, lab results, and visit history, which you access and manage through the patient portal.",
          ]}
        />
        <P>
          We also collect limited browsing data, such as the pages you visit, to
          understand how the site is used and to keep it working reliably. This
          data is not linked to your health records.
        </P>
      </Section>

      <Section title="How we use your information">
        <List
          items={[
            "To schedule and manage your appointments and care.",
            "To provide you access to your own medical records and prescriptions.",
            "To communicate with you about your care, including appointment reminders.",
            "To improve the safety, quality, and accessibility of our services.",
          ]}
        />
        <P>
          We do not sell your personal or health information. We do not use your
          health information for advertising.
        </P>
      </Section>

      <Section title="How we protect your information">
        <P>
          We use encryption in transit, role-based access controls, and audited
          access to your records. Only caregivers and staff who need your
          information to provide care can see it. Your portal session requires
          sign-in, and you should keep your credentials private.
        </P>
      </Section>

      <Section title="Sharing with third parties">
        <P>
          We share information only where the law requires or permits it, for
          example with your insurance provider to process a claim, with a
          referring provider to coordinate your care, or with regulators as
          required by law. We never share your information for commercial
          purposes without your authorization.
        </P>
      </Section>

      <Section title="Your rights">
        <List
          items={[
            "Access and obtain a copy of your health records.",
            "Request a correction to inaccurate or incomplete records.",
            "Request an accounting of disclosures of your information.",
            "Request restrictions on how your information is used and shared.",
            "Request that we communicate with you by a certain method or address.",
          ]}
        />
        <P>
          To exercise any of these rights, contact our privacy office at
          privacy@providencegeneral.org or call (800) 555-0199. You have the
          right to make a complaint to the U.S. Department of Health and Human
          Services if you believe we have violated your privacy rights.
        </P>
      </Section>

      <Section title="Changes to this policy">
        <P>
          We may update this policy from time to time. The last-reviewed date at
          the top of this page reflects the most recent revision. Significant
          changes will be noted on its next review.
        </P>
      </Section>
    </LegalPage>
  );
}
