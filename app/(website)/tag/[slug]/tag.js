// pages/tags/[slug]/tag.js
"use client";
import Container from "@/components/container";
import Breadcrumb from "@/components/Breadcrumb";
import PostList from "@/components/postlist";
import { Adsense } from "@ctrl/react-adsense";

export default function Tag({ loading, posts, title }) {
  if (!loading && !posts.length) {
    return (
      <Container>
        <div className="my-3 bg-transparent text-center">
        <Adsense
          client="ca-pub-6380030036040607"
          slot="4875438298"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </div>
        <Breadcrumb title={title} />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-brand-primary text-3xl font-semibold tracking-tight dark:text-white lg:text-5xl lg:leading-tight">
            {title}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            No articles found for this tag
          </p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="my-3 text-center">
        <Adsense
          client="ca-pub-6380030036040607"
          slot="4875438298"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </div>
      <Breadcrumb title={title} />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-brand-primary text-3xl font-semibold tracking-tight dark:text-white lg:text-5xl lg:leading-tight">
          {title}
        </h1>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          {posts.length} Articles
        </p>
      </div>
      <div className="mt-20 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
        {posts.map(post => (
          <PostList key={post._id} post={post} aspect="landscape" />
        ))}
      </div>
    </Container>
  );
}