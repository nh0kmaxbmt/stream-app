// /app/about/page.js
// export const revalidate = 3600;
import Breadcrumb from "@/components/Breadcrumb";
import { createSeoMetadata } from '@/utils/generalUtils'
const site_name = process.env.NEXT_PUBLIC_site_name;
const site_email = process.env.NEXT_PUBLIC_site_email;

export const metadata = createSeoMetadata({
  basicTitle: 'Privacy Policy',
  description: `Review how ${site_name} collects, uses, and protects your personal data.`,
  url: '/privacy',
  structuredData: {
    '@type': 'PrivacyPolicy',
    name: `${site_name} Privacy Policy`,
    url: '/privacy',
  },
})

export default function About() {
  return (
    <main className="prose mx-auto py-8 px-2">
      <Breadcrumb items={[{ label: "PRIVACY POLICY", href: `` }]} />
      <h1 className="text-3xl font-bold custom-gradient-a">PRIVACY POLICY</h1>
      <p>
        <strong>Last updated:</strong> March 2025
      </p>
      <h2 className="text-2xl font-bold pt-2">Information We Collect</h2>
      <ul className="list-disc list-inside">
        <li>
          <strong>Automatically:</strong> Non‑identifiable usage data via Google
          Analytics
        </li>
        <li>
          <strong>Voluntarily:</strong> Email if you subscribe to our newsletter
        </li>
      </ul>
      <h2 className="text-2xl font-bold pt-2">How We Use Your Data</h2>
      <p>
        Improve site performance and user experience; send optional newsletter
        updates.
      </p>
      <h2 className="text-2xl font-bold pt-2">Cookies & Tracking</h2>
      <p>
        We use cookies solely for performance monitoring. No advertising cookies
        are used.
      </p>
      <h2 className="text-2xl font-bold pt-2">Data Sharing</h2>
      <p>
        We do not sell, rent, or share personal information — except with
        service providers under confidentiality or legal compliance.
      </p>
      <h2 className="text-2xl font-bold pt-2">Your Rights</h2>
      <p>
        Request access, correction, or deletion of your personal data anytime
        via <a href={`mailto:${site_email}`}>{site_email}</a>.
      </p>
    </main>
  );
}
