import { useState } from "react";
import { Picture } from "../types";
import Image from "next/image";

export default function CardImage({ image }: { image: Picture }) {
  const [isLoading, setIsLoading] = useState(true);
  const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(" ");
  };
  return (
    <a href={image.href} className="group">
      <div className="flex flex-col  overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={image.imageSrc}
          alt="test"
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out object-cover max-h-[200px]",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={() => {
            setIsLoading(false);
          }}
          width="500"
          height="500"
        />

        <h3 className="mt-4 text-sm text-gray-700">Lee Robinson</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">{image.name}</p>
      </div>
    </a>
  );
}
