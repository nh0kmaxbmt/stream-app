import ContactClient from "./ContactClient";
// export const revalidate = 3600;
import { createSeoMetadata } from '@/utils/generalUtils'

const site_name = process.env.NEXT_PUBLIC_site_name;

export const metadata = createSeoMetadata({
  basicTitle: 'Contact Us',
  description: `Get in touch with the ${site_name} team — we’d love to hear from you!`,
  url: '/contactus',
  structuredData: {
    '@type': 'ContactPage',
    contactType: 'Customer Support',
    url: '/contactus',
  },
})

export default function Contact() {
  return <ContactClient/>;
}

