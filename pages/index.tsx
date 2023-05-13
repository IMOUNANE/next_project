import React from "react";
import Image from "next/image";
import "./globals.css";

export function ImageSingle() {
  return (
    <div className="group">
      <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src="https://bit.ly/placeholder-img"
          alt="test"
          className="group-hover:opacity-75"
          width="100"
          height="100"
        />
        <h3 className="mt-4 text-sm text-gray-700">Lee Robinson</h3>
        <p className="mt-1 text-lg font-medium text-gray-900"> @leerob</p>
      </div>
    </div>
  );
}
export default function RootLayout() {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <ImageSingle />
          </div>
        </div>
      </body>
    </html>
  );
}
