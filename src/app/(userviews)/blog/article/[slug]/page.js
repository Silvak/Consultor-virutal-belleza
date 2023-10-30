"use client";

import React, { useState, useEffect } from "react";
import { getPost, getSlugList } from "@/services/graphql.services";
import Image from "next/image";

// blog component
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

    // Fetch slug list
    getSlugList().then((data) => {
      setSlugList(data.paths.map((path) => path.params.slug));
    });
  }, [slug]);

  if (!post) return <p>Loading...</p>;

  return (
    <section>
      {/* title */}
      <h2>{post.title}</h2>
      <p>Date: {post.datePublished}</p>
      <img src={post.coverPhoto.url} alt={`Cover of ${post.title}`} />
      <div dangerouslySetInnerHTML={{ __html: post.content.html }} />

      {/* author */}
      <div>
        <h3>Author: {post.author.name}</h3>
        <Image
          src={post?.author?.avatar?.url}
          alt={`Avatar of ${post.author.name}`}
          width={100}
          height={100}
        />
      </div>

      {/* content */}
      <div dangerouslySetInnerHTML={{ __html: post.content.html }}></div>

      {/* Displaying slug list */}
      <div>
        <h3>Available Slugs:</h3>
        <ul>
          {slugList.map((s, index) => (
            <li key={index}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
