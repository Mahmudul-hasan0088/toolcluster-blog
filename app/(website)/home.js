"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import PostAlt from "@/components/postalt";
import { Adsense } from "@ctrl/react-adsense";

export default function HomePage({ posts }) {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = pageNumber => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const PaginationButton = ({ onClick, disabled, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
      {children}
    </button>
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mt-20">
      <div className="w-full my-3 w-full bg-transparent text-center">
        <Adsense
          client="ca-pub-6380030036040607"
          slot="4875438298"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </div>
      <div className="grid gap-3 md:mx-3 md:grid-cols-2 lg:gap-10">
        {currentPosts.map(post => (
          <PostAlt key={post._id} post={post} />
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center space-x-2">
        <PaginationButton
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>
          <ChevronLeftIcon className="mr-2 h-5 w-5" />
          Previous
        </PaginationButton>
        <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}>
          Next
          <ChevronRightIcon className="ml-2 h-5 w-5" />
        </PaginationButton>
      </div>
      <div className="mt-10 w-full text-center">
        <Adsense
          client="ca-pub-6380030036040607"
          slot="4875438298"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </div>
    </div>
  );
}