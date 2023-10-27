"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import notFound from "@/components/notFound";

export default function Page() {
  const { toast } = useToast();

  return (
    <div className="grid w-full">
      <div className="w-[1200px] h-[120vh]">
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
