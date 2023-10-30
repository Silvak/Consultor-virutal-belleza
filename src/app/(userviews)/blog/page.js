"use client";

import React, { useState, useEffect } from "react";
import JustifyContent from "@/components/JustifyContent";
import { getPosts } from "@/services/graphql.services";
import BlogSection from "@/components/blog/BlogSection";
import Footer from "@/components/Footer";

/**
 * The function is a React component that fetches blog posts and renders them in a section on a web
 * page.
 * @returns a JSX element, specifically a section element with the class name "w-full py-16 px-4".
 * Inside the section element, there is a JustifyContent component which contains a heading element
 * with the class name "text-2xl mt-16 mb-6 font-semibold" and a BlogSection component.
 */
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
    <section className="w-full  py-16 px-4">
      <JustifyContent width={1200}>
        <h3 className="text-2xl mb-6 font-semibold">Blog</h3>
        <BlogSection numPosts={10} />
      </JustifyContent>
    </section>
  );
}
