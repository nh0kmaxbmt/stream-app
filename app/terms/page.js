// /app/about/page.js
// export const revalidate = 3600;
import Breadcrumb from "@/components/Breadcrumb";
const site_name = process.env.NEXT_PUBLIC_site_name;
const site_email = process.env.NEXT_PUBLIC_site_email;
import { createSeoMetadata } from '@/utils/generalUtils'

export const metadata = createSeoMetadata({
  basicTitle: 'Terms of Service',
  description: `Read the Terms of Service governing your use of ${site_name}.`,
  url: '/terms',
  structuredData: {
    '@type': 'Legislation',
    name: 'Terms of Service',
    url: '/terms',
  },
})


export default function About() {
  return (
    <main className="prose mx-auto py-8 px-2">
      <Breadcrumb items={[{ label: "TERMS OF SERVICE", href: `` }]} />
      <h1 className="text-3xl font-bold custom-gradient-a">TERMS OF SERVICE</h1>
      <p>
        <strong>Last updated:</strong> March 2025
      </p>
      <h2 className="text-2xl font-bold pt-2">Eligibility</h2>
      <p>
        You must be 18+ to use this site. By accessing {site_name}, you confirm
        you meet this requirement.
      </p>
      <h2 className="text-2xl font-bold pt-2">Service Description</h2>
      <p>
        {site_name} is a metadata repository only. We do not host or stream
        video content — we provide links to third‑party retailers and studios.
      </p>
      <h2 className="text-2xl font-bold pt-2">User Conduct</h2>
      <p>
        You agree not to upload copyrighted text/images without permission,
        interfere with site functionality, or use data unlawfully.
      </p>
      <h2 className="text-2xl font-bold pt-2">Intellectual Property</h2>
      <p>
        All site content © 2025 {site_name}. Public metadata is free for
        personal/research use; commercial redistribution requires written
        permission.
      </p>
      <h2 className="text-2xl font-bold pt-2">DMCA Policy</h2>
      <p>
        Send takedown notices to{" "}
        <a href={`mailto:${site_email}`}>{site_email}</a> with required details.
      </p>
      <h2 className="text-2xl font-bold pt-2">Disclaimer & Liability</h2>
      <p>
        Data provided “as is.” {site_name} disclaims liability for inaccuracies
        or damages arising from use.
      </p>
      <h2 className="text-2xl font-bold pt-2">Changes to Terms</h2>
      <p>Continued use constitutes acceptance of updates to these Terms.</p>
    </main>
  );
}
