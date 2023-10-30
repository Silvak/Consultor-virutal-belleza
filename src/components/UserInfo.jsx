"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      console.log(session.user.user);
      setUser(session.user.user);
    }
  }, [session]);

  if (status === "loading") return null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg-p-0">
      <Image
        src={user?.image || "/assets/skin.jpg"}
        className="bg-gray-200 rounded-md shadow-lg h-[250px] w-full lg:min-w-[250px] lg:max-w-[250px] object-cover"
        width={300}
        height={300}
      />

      <div className="flex flex-col w-full gap-8">
        <div className="bg-white dark:bg-[#020817] w-full shadow-lg py-4 px-6 rounded-md">
          <p className="text-xl font-semibold">{user?.displayName}</p>
        </div>
        <div className="flex flex-col justify-center items-start gap-1 bg-white dark:bg-[#020817] w-full h-full shadow-lg py-4 px-6 rounded-md">
          <p>Email: {user?.email}</p>
          <p>Genero: {user?.gender}</p>
          <p>Edad: {user?.age}</p>
          <p>Tipo de piel: {user.skinType}</p>
        </div>
      </div>
    </div>
  );
}
