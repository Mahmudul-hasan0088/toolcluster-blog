"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostAlt from "@/components/postalt";
import { Adsense } from "@ctrl/react-adsense";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function HomePage({ posts }) {
  const postsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="mt-20">
      <div className="w-full my-3 bg-transparent text-center">
        <Adsense
          client="ca-pub-6380030036040607"
          slot="4875438298"
          style={{ display: "block" }}
          layout="in-article"
          format="fluid"
        />
      </div>
      <div className="grid gap-3 md:mx-3 md:grid-cols-2 lg:gap-10">
        {currentPosts.map((post) => (
          <PostAlt key={post._id} post={post} />
        ))}
      </div>
      <div className="mt-10">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber === 1 ||
                pageNumber === totalPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      onClick={() => paginate(pageNumber)}
                      isActive={pageNumber === currentPage}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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