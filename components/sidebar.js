import SearchInput from "@/components/ui/search";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";
import Label from "@/components/ui/label";
import DateTime from "@/components/ui/time";

export default function Sidebar(props) {
  return (
    <div className="min-w-full w-full mt-5 font-sans">
      <Searchbar />
      {props.related && (
        <RelatedPosts
          related={props.related}
          pathPrefix={props.pathPrefix}
        />
      )}
      {props.categories && (
        <Categories categories={props.categories} />
      )}
    </div>
  );
}

function Searchbar() {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold dark:text-white">
        Search Posts
      </h3>
      <form action="/search" method="GET" className="mt-4">
        <SearchInput placeholder="Search" />
      </form>
    </div>
  );
}

function RelatedPosts({ related }) {
  return (
    <div className="mt-10 w-full">
      <h3 className="text-center text-2xl font-bold dark:text-white">
        RELATED ARTICLES
      </h3>
      <div className="mt-6 grid gap-6">
        {related.slice(0, 5).map((item, index) => {
          const imageProps = item?.image
            ? urlForImage(item?.image)
            : null;
          return (
            <Link
              key={index}
              href={`/post/${item.slug.current}`}
              className="group">
              <div className="flex gap-5">
                <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    alt={item.title || "Thumbnail"}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium group-hover:underline dark:text-white md:line-clamp-2 md:text-ellipsis">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    <DateTime date={item.date} />
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Categories({ categories }) {
  const nonEmptyCategories = categories.filter(
    category => category.count > 0
  );

  return (
    <div className="mt-10 w-full">
      <h3 className="text-2xl font-bold dark:text-white">
        Categories
      </h3>
      {nonEmptyCategories.length > 0 ? (
        <ul className="mt-4 grid">
          {nonEmptyCategories.map(item => (
            <li key={item._id}>
              <Link
                href={`/category/${item.slug.current}`}
                className="group flex items-center justify-between py-2">
                <h4 className="text-gray-800 group-hover:text-blue-500 group-hover:underline dark:text-gray-400">
                  {item.title}
                </h4>
                <Label pill={true} color={item.color}>
                  {item.count}
                </Label>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-gray-500">No categories available</p>
      )}
    </div>
  );
}