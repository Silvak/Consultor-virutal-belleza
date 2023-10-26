"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function Page() {
  const { toast } = useToast();
  return (
    <div className="grid w-full">
      <div className="w-[4000px] h-[120vh]">
        <p>lorem</p>
        <Button
          variant="outline"
          onClick={() => {
            toast({
              description: "Your message has been sent.",
            });
          }}
        >
          Show Toast
        </Button>
      </div>
    </div>
  );
}
