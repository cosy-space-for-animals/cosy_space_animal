import React from 'react';
import Image from 'next/image';

const Page = () => {
  return (
    <main className="w-full min-h-screen">
      <Image
        src={'/images/logo.svg'}
        alt="logo"
        width={120}
        height={40}
        priority={true}
        className="mx-auto mt-[48px] mb-[36px]"
      />
      <section className="flex justify-center">
      </section>
    </main>
  );
};

export default Page;
