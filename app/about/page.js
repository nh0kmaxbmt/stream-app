// /app/about/page.js
// export const revalidate = 3600;
import Breadcrumb from "@/components/Breadcrumb";
import { createSeoMetadata } from '@/utils/generalUtils'

const site_name = process.env.NEXT_PUBLIC_site_name;
const site_email = process.env.NEXT_PUBLIC_site_email;

export const metadata = createSeoMetadata({
  basicTitle: 'About Us',
  description: `Learn more about ${site_name} — our mission, story, and team.`,
  url: '/about',
  structuredData: {
    '@type': 'AboutPage',
    name: `About ${site_name}`,
    description: `Learn more about ${site_name} — our mission, story, and team.`,
  },
})

export default function About() {
  return (
    <main className="prose mx-auto py-8 px-2">
      <Breadcrumb items={[{ label: "ABOUT US", href: `` }]} />
      <h1 className="text-3xl font-bold custom-gradient-a">
        ABOUT {site_name.toUpperCase()}
      </h1>
      <p>
        {site_name} is the definitive, free-to-use database of Japanese gay
        video releases. Our mission is to centralize accurate metadata — from
        release dates, studios, and cast profiles to genre tags and user ratings
        — into one easy-to-search hub. Whether you’re a collector, researcher,
        industry professional, or fan, {site_name} helps you discover new
        titles, track upcoming releases, and explore the rich history of
        Japanese gay cinema.
      </p>
      <h2 className="text-2xl font-bold pt-2">Our Vision</h2>
      <p>
        We believe in celebrating LGBTQ+ media by making its information
        accessible, transparent, and searchable. {site_name} empowers users to
        learn, share, and engage with content responsibly.
      </p>
      <h2 className="text-2xl font-bold pt-2">What We Provide</h2>
      <ul className="list-disc list-inside">
        <li>Comprehensive searchable catalog of Japanese gay video releases</li>
        <li>Actor and studio profiles with filmographies</li>
        <li>Community ratings, reviews, and watchlists</li>
      </ul>
      <p>
        {site_name} is maintained by volunteers passionate about archiving
        LGBTQ+ media history. We welcome your feedback — email us anytime at{" "}
        <a href={`mailto:${site_email}`}>{site_email}</a>.
      </p>
    </main>
  );
}
