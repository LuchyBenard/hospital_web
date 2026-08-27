import { hospitalInfo, siteConfig, departments } from "@/constants";

// JSON-LD structured data rendered on every page so search engines can build
// a medical knowledge panel (Hospital / MedicalOrganization schema).
const phoneDigits = (p) => (p || "").replace(/[^0-9]/g, "");

export function HospitalSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${siteConfig.url}/#organization`,
    name: hospitalInfo.name,
    url: siteConfig.url,
    telephone: `+${phoneDigits(hospitalInfo.phone.general)}`,
    email: hospitalInfo.email,
    foundingDate: String(hospitalInfo.establishedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: hospitalInfo.address.street,
      addressLocality: hospitalInfo.address.city,
      addressRegion: hospitalInfo.address.state,
      postalCode: hospitalInfo.address.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.7128,
      longitude: -74.006,
    },
    openingHours: "Mo-Su 00:00-24:00",
    openingHoursSpecialty: [
      {
        "@type": "MedicalSpecialty",
        name: "Emergency Medicine",
        openingHours: "Mo-Su 00:00-24:00",
      },
    ],
    medicalSpecialty: departments.map((d) => ({
      "@type": "MedicalSpecialty",
      name: d.name,
      url: `${siteConfig.url}/departments/${d.slug}`,
    })),
    member: departments.map((d) => ({
      "@type": "MedicalOrganization",
      name: d.name,
      url: `${siteConfig.url}/departments/${d.slug}`,
    })),
    sameAs: [],
  };

  const json = JSON.stringify(schema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
