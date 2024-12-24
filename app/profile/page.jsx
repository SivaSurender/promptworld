"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";
import Profile from "@components/Profile";

function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleEdit = () => {};
  const handleDelete = async () => {};
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      console.log(session, "postsss");
      setPosts(data);
    };

    session?.user.id && fetchPosts();
  }, []);
  return (
    <Profile
      name="My"
      desc={`Welcome to your personalized profile page ${session?.user.name}`}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></Profile>
  );
}

export default MyProfile;
