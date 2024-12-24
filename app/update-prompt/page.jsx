"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { get } from "mongoose";

function EditPrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  console.log(promptId, "promptId");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const getPrompts = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      console.log(data, "datadfdfd");
      setPost({ prompt: data.prompt, tag: data.tag });
    };
    promptId && getPrompts();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) return alert("Id not found");
    try {
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (res.ok) {
        setPost({ prompt: "", tag: "" });
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    ></Form>
  );
}

const EditPrompt = () => {
  return (
    <Suspense>
      <UpdatePrompt />
    </Suspense>
  );
};

export default EditPrompt;
