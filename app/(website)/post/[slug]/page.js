import PostPage from "./default";
import {
  getAllPostsSlugs,
  getPostBySlug,
  getTopCategories,
  getCommentsByPostId
} from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";

// Function to generate static paths for all posts
export async function generateStaticParams() {
  return await getAllPostsSlugs();
}
function generateJsonLd(post, url) {
  const keywords = post?.tags
    ? post.tags.map(tag => tag.name || tag).join(", ")
    : "";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || generateExcerpt(post.body),
    image: post.mainImage ? urlForImage(post.mainImage).src : null,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || "Codewithhridoy"
    },
    publisher: {
      "@type": "Organization",
      name: "Codewithhridoy",
      logo: {
        "@type": "ImageObject",
        url: "https://codewithhridoy.vercel.app/logo.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    keywords: keywords
  };
}

// Function to generate an excerpt from the post body
function generateExcerpt(body) {
  if (!body) return "";

  const block = body.find(block => block._type === "block");
  if (!block) return "";

  const span = block.children.find(child => child._type === "span");
  return span ? span.text.slice(0, 155) + "..." : "";
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  const excerpt = generateExcerpt(post?.body);
  const keywords = post?.tags
    ? post.tags.map(tag => tag.name).join(", ") // Adjust to match the structure of tags
    : "";
  const ogImage = post?.mainImage
    ? urlForImage(post.mainImage)
    : null;
  const title = post?.title;
  const description = post?.excerpt || excerpt;
  const url = `https://codewithhridoy.vercel.app/post/${params.slug}`;

  const jsonLd = generateJsonLd(post, url);

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: ogImage
        ? [
            {
              url: ogImage.src,
              width: ogImage.width,
              height: ogImage.height,
              alt: post?.mainImage?.alt || title
            }
          ]
        : []
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: ogImage ? [ogImage.src] : []
    },
    alternates: {
      canonical: url
    }
  };
}

// Default export for the PostDefault component
export default async function PostDefault({ params }) {
  const post = await getPostBySlug(params.slug);
  const categories = await getTopCategories();
  const comments = await getCommentsByPostId(post?._id);

  if (!post) {
    notFound();
  }

  const url = `https://codewithhridoy.vercel.app/post/${params.slug}`;
  const jsonLd = generateJsonLd(post, url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PostPage
        post={post}
        categories={categories}
        comments={comments}
      />
    </>
  );
}

// Set revalidation time for the page
export const revalidate = 60;