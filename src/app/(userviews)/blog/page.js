"use client";

import React, { useState, useEffect } from "react";
import BlogCard from "@/components/card/BlogCard";
import { getPosts } from "@/services/graphql.services";

export default function Page() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getPosts();
      setPosts(data);
    };
    loadData();
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      <div>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
