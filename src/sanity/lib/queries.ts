import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    studioName,
    tagline,
    heroEyebrow,
    heroHeadline,
    heroDescription,
    primaryEmail,
    timezone,
    responseSla,
    "socials": socials[]{
      label,
      href
    },
    proofChips,
    "heroMetrics": heroMetrics[]{
      label,
      value
    },
    "navLinks": navLinks[]{
      label,
      href
    }
  }
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    heroBackgroundImage,
    "heroBackgroundImageUrl": heroBackgroundImage.asset->url,
    "heroBackgroundImageAlt": heroBackgroundImage.alt,
    scrollStory{
      eyebrow,
      title,
      intro,
      "chapters": chapters[]{
        "id": coalesce(_key, title),
        eyebrow,
        title,
        body,
        "points": proofPoints,
        ctaLabel,
        ctaHref,
        media,
        "mediaUrl": media.asset->url,
        "mediaAlt": media.alt
      }
    },
    "outcomeCards": outcomeCards[]{
      eyebrow,
      title,
      body,
      href,
      label
    },
    "buyerTypes": buyerTypes[]{
      title,
      body
    },
    serviceOverview{
      eyebrow,
      title,
      body,
      points
    },
    resultsSection{
      eyebrow,
      title,
      "metrics": metrics[]{
        label,
        value
      }
    },
    "processSteps": processSteps[]{
      title,
      body
    },
    studioSection{
      eyebrow,
      title,
      body
    },
    faqSection{
      eyebrow,
      title
    },
    finalCta{
      eyebrow,
      title,
      primaryLabel,
      primaryHref,
      secondaryLabel,
      secondaryHref
    }
  }
`;

const projectSelection = `
  "slug": slug.current,
  title,
  clientName,
  projectType,
  platform,
  genreTags,
  serviceTags,
  year,
  featured,
  coverImage,
  "coverImageUrl": coverImage.asset->url,
  summary,
  challenge,
  goals,
  outcomes,
  solution,
  gameplayFeatures,
  productionProcess,
  "resultsMetrics": resultsMetrics[]{
    label,
    value,
    accent
  },
  "galleryMedia": galleryMedia[]{
    label,
    description,
    type,
    "alt": coalesce(image.alt, poster.alt),
    "caption": coalesce(image.caption, poster.caption),
    "imageRole": coalesce(image.imageRole, poster.imageRole),
    videoUrl,
    image,
    poster,
    "imageUrl": image.asset->url,
    "posterUrl": poster.asset->url
  },
  confidentialityNote,
  palette,
  headline,
  "testimonialId": testimonial->_id,
  cta{
    primaryLabel,
    primaryHref,
    secondaryLabel,
    secondaryHref
  },
  seo{
    title,
    description
  }
`;

export const projectsQuery = groq`
  *[_type == "project"] | order(featured desc, year desc, _updatedAt desc) {
    ${projectSelection}
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0]{
    ${projectSelection}
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(category asc, title asc) {
    "slug": slug.current,
    category,
    title,
    summary,
    outcomes,
    timeline,
    engagementModel,
    idealFor,
    deliverables,
    inquiryLabel,
    featuredImage,
    "featuredImageUrl": featuredImage.asset->url,
    "featuredImageAlt": featuredImage.alt
  }
`;

export const teamQuery = groq`
  *[_type == "teamMember"] | order(_createdAt asc) {
    name,
    role,
    bio,
    skills,
    focus,
    portrait,
    "portraitUrl": portrait.asset->url,
    "portraitAlt": portrait.alt
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt asc) {
    _id,
    quote,
    name,
    role,
    company,
    portrait,
    "portraitUrl": portrait.asset->url,
    "portraitAlt": portrait.alt
  }
`;

export const faqItemsQuery = groq`
  *[_type == "faqItem"] | order(orderRank asc, _createdAt asc) {
    question,
    answer,
    category
  }
`;
