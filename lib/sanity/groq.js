// lib/sanity/groq.js:

import { groq } from "next-sanity";

// Get all posts
export const postquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL":asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
  tags[]-> {
    name,
    slug
  }
}
`;
// Corrected query for posts by tag slug
export const postsByTagQuery = groq`
*[_type == "post" && references(*[_type == "tag" && slug.current == $tagSlug]._id)] {
  _id,
  _createdAt,
  publishedAt,
  mainImage {
    ...,
    "blurDataURL": asset->metadata.lqip,
    "ImageColor": asset->metadata.palette.dominant.background,
  },
  featured,
  excerpt,
  slug,
  title,
  author-> {
    _id,
    image,
    slug,
    name
  },
  categories[]->,
  tags[]->{
    name,
    slug
  }
} | order(publishedAt desc, _createdAt desc)
`;
// Get all posts with 0..limit
export const limitquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [0..$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get subsequent paginated posts
export const paginatedquery = groq`
*[_type == "post"] | order(publishedAt desc, _createdAt desc) [$pageIndex...$limit] {
  ...,
  author->,
  categories[]->
}
`;

// Get Site Config
export const configQuery = groq`
*[_type == "settings"][0] {
  ...,
}
`;

// Single Post
export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  tags[]-> {
    name,
    slug
  },
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalLink" => {
        "slug": @.reference->slug
      }
    }
  },
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 ),
"related": *[_type == "post" && _id != ^._id && (
  count((categories[]->_id)[@ in ^.^.categories[]->_id]) > 0 ||
  count((tags[]->slug.current)[@ in ^.^.tags[]->slug.current]) > 0
)] | order(publishedAt desc, _createdAt desc) [0...5] {
  title,
  slug,
  "date": coalesce(publishedAt,_createdAt),
  "image": mainImage,
  excerpt,
  categories[]->,
  tags[]->
}
}
`;

// Paths for generateStaticParams
export const pathquery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;
export const catpathquery = groq`
*[_type == "category" && defined(slug.current)][].slug.current
`;
export const authorsquery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`;

// Get Posts by Authors
export const postsbyauthorquery = groq`
*[_type == "post" && $slug match author->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get Posts by Category
export const postsbycatquery = groq`
*[_type == "post" && $slug in categories[]->slug.current ] {
  ...,
  author->,
  categories[]->,
}
`;

// Get top 5 categories
export const catquery = groq`*[_type == "category"] {
  ...,
  "count": count(*[_type == "post" && references(^._id)])
} | order(count desc) [0...5]`;

export const searchquery = groq`*[_type == "post" && _score > 0]
| score(title match $query || excerpt match $query || pt::text(body) match $query)
| order(_score desc)
{
  _score,
  _id,
  _createdAt,
  mainImage,
  author->,
  categories[]->,
   title,
   slug
}`;

// Get all Authors
export const allauthorsquery = groq`
*[_type == "author"] {
 ...,
 'slug': slug.current,
}
`;

// Get comments by post ID
export const commentsByPostIdQuery = groq`
*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt desc) {
  _id,
  name,
  email,
  comment,
  _createdAt
}
`;

// Get all Tags
export const tagquery = groq`
*[_type == "tag"] {
  ...,
  "slug": slug.current
}
`;

export const FeaturedPosts = groq`*[_type == "post" && featured == true] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  excerpt,
  body,
  author-> {
      _id,
      image,
      slug,
      name
    },
    categories[]->,
    tags[]->{
      name,
      slug
    }
} | order(publishedAt desc)
`;