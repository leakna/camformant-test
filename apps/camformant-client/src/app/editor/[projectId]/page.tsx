import Editor from "@/features/editor/components/editor";
import React from "react";
import "@/app/globals.css";
const page = () => {
  return (
    <div className="h-full bg-muted-foreground">
      <Editor />
    </div>
  );
};

export default page;
