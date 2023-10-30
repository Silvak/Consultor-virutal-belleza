"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "@/components/card/BlogCard";
import { getPosts } from "@/services/graphql.services";

/* The code is defining a React functional component called `BlogSection`. It takes two optional props:
`numPosts` and `showDescription`. */
export default function BlogSection({ numPosts = 4, showDescription = false }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPosts();
      setPosts(data.slice(0, numPosts)); // Limitar el número de posts aquí
    };
    loadData();
  }, [numPosts]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            title={post.title}
            author={post.author}
            coverPhoto={post.coverPhoto}
            slug={post.slug}
            datePublishesd={post.datePublishesd}
            showDescription={showDescription}
          />
        ))}
      </div>
    </section>
  );
}
