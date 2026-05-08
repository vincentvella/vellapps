export const HOMEPAGE_QUERY = `{
  "services": *[_type == "service" && visible != false] | order(order asc, _createdAt asc) {
    _id, title, summary, body
  },
  "work": *[_type == "workItem" && visible != false] | order(order asc, _createdAt asc) {
    _id, title, tagline, href, body, stack, image
  },
  "process": *[_type == "processStep"] | order(order asc, _createdAt asc) {
    _id, title, body
  },
  "faqs": *[_type == "faq" && visible != false] | order(order asc, _createdAt asc) {
    _id, question, answer
  },
  "stack": *[_type == "stackTool" && visible != false] | order(order asc, _createdAt asc) {
    _id, name
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
    image?: SanityImage;
  }[];
  process: { _id: string; title: string; body: string }[];
  faqs: { _id: string; question: string; answer: string }[];
  stack: { _id: string; name: string }[];
};

export type SanityImage = {
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};
