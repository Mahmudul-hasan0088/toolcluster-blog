import React from "react";
import Link from "next/link";

export default function TagList({ tags }) {
    return (
        <div className="my-4">
            {tags && tags.length > 0 && (
                <ul className="flex flex-wrap *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
                    {tags.map((tag, index) => (
                        <li
                            key={tag?._id || `tag-${index}`}
                            className="mb-2 mr-2 flex flex-wrap">
                            <Link href={`/tag/${tag.slug?.current}`}>
                                {tag?.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}