import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LazyProjectScrollTracker } from "@/components/marketing/lazy-project-scroll-tracker";
import { ProjectDetailTemplate } from "@/components/marketing/project-detail-template";
import { buildMetadata } from "@/lib/seo";
import { createAbsoluteUrl } from "@/lib/utils";
import {
  getProjectBySlug,
  getProjects,
  getTestimonials,
} from "@/lib/site-content";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project Not Found | Maykell Interactive",
      description: "The requested case study could not be found.",
      path: `/work/${slug}`,
      openGraphType: "article",
    });
  }

  const shareMedia = project.galleryMedia.find(
    (item) => item.imageUrl || item.posterUrl,
  );
  const imagePath = shareMedia?.imageUrl || shareMedia?.posterUrl;

  return buildMetadata({
    title: project.seo.title,
    description: project.seo.description,
    path: `/work/${project.slug}`,
    imagePath,
    twitterImagePath: imagePath,
    imageAlt: shareMedia?.alt || project.title,
    openGraphType: "article",
  });
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const [project, projects, testimonials] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
    getTestimonials(),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter(
    (candidate) => candidate.slug !== project.slug,
  );
  const testimonial = testimonials.find(
    (item) => item.id === project.testimonialId,
  );
  const projectUrl = createAbsoluteUrl(`/work/${project.slug}`);
  const shareMedia = project.galleryMedia.find(
    (item) => item.imageUrl || item.posterUrl,
  );

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        about: project.projectType,
        creator: "Maykell Interactive",
        abstract: project.headline,
        contributor: project.clientName ?? "Confidential partner",
        url: projectUrl,
        image: shareMedia?.imageUrl || shareMedia?.posterUrl,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: createAbsoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: createAbsoluteUrl("/work"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: projectUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="page-stack pb-20 pt-6 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="site-container">
        <nav aria-label="Breadcrumb" className="text-xs text-[var(--color-fog-500)]">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/work" className="transition hover:text-white">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--color-fog-300)]">{project.title}</li>
          </ol>
        </nav>
      </section>
      <LazyProjectScrollTracker slug={project.slug} />
      <ProjectDetailTemplate
        project={project}
        relatedProjects={relatedProjects}
        testimonial={testimonial}
      />
    </div>
  );
}
