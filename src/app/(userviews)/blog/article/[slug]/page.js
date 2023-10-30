"use client";

import React, { useState, useEffect } from "react";
import { getPost, getSlugList } from "@/services/graphql.services";
import Image from "next/image";
import Link from "next/link";
import JustifyContent from "@/components/JustifyContent";
//cn components
import { Badge } from "@/components/ui/badge";

/**
 * This is a React component that displays a blog post with its title, cover photo, author information,
 * content, and a list of other blog posts.
 * @returns a JSX element, which represents the structure and content of the page being rendered.
 */
export default function Page({ params }) {
  const [post, setPost] = useState(null);
  const [slugList, setSlugList] = useState([]);
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      getPost(slug).then((data) => {
        setPost(data);
      });
    }

    getSlugList().then((data) => {
      setSlugList(data.paths.map((path) => path.params.slug));
    });
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <section className="flex items-center flex-col bg-gray-100 dark:bg-gray-300/10 p-4 lg:py-16 gap-8">
      <div className="w-full max-w-[1200px] bg-white dark:bg-[#020817] shadow-lg rounded-lg p-4 lg:p-8 border border-gray-300 dark:border-gray-300/40">
        {/* title */}
        <h2 className="text-3xl font-semibold mb-4">{post.title}</h2>

        <Image
          src={post?.coverPhoto?.url}
          alt={`Cover of ${post?.title}`}
          className=" mb-4 h-[300px] lg:h-[500px] object-cover rounded-sm"
          width={1200}
          height={600}
        />

        {/* author */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Image
              src={post?.author?.avatar?.url}
              alt={`Avatar of ${post.author.name}`}
              width={60}
              height={60}
              className="rounded-md mr-4 h-[40px] w-[40px] object-cover"
            />
            <h3 className="text-md font-semibold">
              <span className="font-normal">Author:</span> {post.author.name}
            </h3>
          </div>
          <p className=" text-sm text-gray-500">Date: {post.datePublishesd}</p>
        </div>

        {/* content */}
        <div
          className="prose max-w-full mb-2"
          dangerouslySetInnerHTML={{ __html: post.content.html }}
        ></div>
      </div>

      {/* Displaying slug list */}
      <div className="w-full max-w-[1200px] bg-white dark:bg-[#020817] shadow-lg rounded-lg p-4 lg:p-8 border border-gray-300 dark:border-gray-300/40">
        <h3 className="text-lg font-semibold mb-2">Posts</h3>
        <ul className="flex flex-wrap w-full gap-4">
          {slugList.map((slugUrl, index) => (
            <Link href={`/blog/article/${slugUrl}`} key={index}>
              <Badge variant="">{slugUrl}</Badge>
            </Link>
          ))}
        </ul>
      </div>
    </section>
  );
}
