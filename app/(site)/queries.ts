export const HOMEPAGE_QUERY = `{
  "services": *[_type == "service" && visible != false] | order(order asc, _createdAt asc) {
    _id, title, summary, body
  },
  "work": *[_type == "workItem" && visible != false && coalesce(order, 0) >= 0] | order(order asc, _createdAt asc) {
    _id, title, tagline, href, body, stack, alt, "slug": slug.current,
    image{ ..., asset->{ _id, metadata { dimensions { width, height, aspectRatio } } } }
  },
  "process": *[_type == "processStep"] | order(order asc, _createdAt asc) {
    _id, title, body
  },
  "faqs": *[_type == "faq" && visible != false] | order(order asc, _createdAt asc) {
    _id, question, answer
  },
  "stack": *[_type == "stackTool" && visible != false] | order(order asc, _createdAt asc) {
    _id, name
  },
  "testimonials": *[_type == "testimonial" && status == "approved"] | order(featured desc, approvedAt desc, _createdAt desc)[0...3] {
    _id, name, role, company, body,
    "relatedWork": relatedWork->{ _id, title, href, "slug": slug.current }
  }
}`;

export type HomepageContent = {
  services: { _id: string; title: string; summary: string; body: string }[];
  work: {
    _id: string;
    title: string;
    tagline: string;
    href?: string;
    body: string;
    stack: string[];
    alt?: string;
    slug?: string;
    image?: SanityImage;
  }[];
  process: { _id: string; title: string; body: string }[];
  faqs: { _id: string; question: string; answer: string }[];
  stack: { _id: string; name: string }[];
  testimonials: {
    _id: string;
    name: string;
    role?: string;
    company?: string;
    body: string;
    relatedWork?: { _id: string; title: string; href?: string; slug: string };
  }[];
};

export type SanityImage = {
  asset:
    | { _ref: string; _type: "reference" }
    | {
        _id: string;
        metadata?: {
          dimensions?: {
            width: number;
            height: number;
            aspectRatio: number;
          };
        };
      };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};
