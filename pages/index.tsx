import React, { useState } from "react";
import Image from "next/image";
import "./globals.css";
import { createClient } from "@supabase/supabase-js";
type Image = {
  id: number;
  href: string;
  imageSrc: string;
  name: string;
  username: string;
};
export async function getStaticProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPERBASE_SERVICE_ROLE_KEY || ""
  );
  const { data } = await supabaseAdmin.from("images").select("*").order("id");
  return {
    props: {
      images: data,
    },
  };
}

export function ImageSingle({ image }: { image: Image }) {
  const [isLoading, setIsLoading] = useState(true);
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join("");
  };
  return (
    <a href={image.href} className="group">
      <div className="flex flex-col  overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image.imageSrc}
          alt="test"
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out object-cover fill",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={() => {
            setIsLoading(false);
          }}
          width="100"
          height="100"
        />
        <h3 className="mt-4 text-sm text-gray-700">Lee Robinson</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{image.name}</p>
      </div>
    </a>
  );
}

export default function RootLayout({ images }: { images: Image[] }) {
  return (
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <ImageSingle key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
}
