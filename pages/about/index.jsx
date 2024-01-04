import React from "react";
import Image from "next/image";
import Title from "../../components/ui/Title";

const Index = () => {
  return (
    <div>
      <div className="relative mx-auto p-10 h-56 sm:h-72 w-full overflow-hidden after:content-['*'] after:w-full after:h-full after:left-0 after:bottom-0 after:absolute after:bg-secondary/50 after:blur-lg after:z-0">
        <Image src="/images/about.jpg" alt="logo" layout="fill" objectFit="cover" />
        <Title addClass="text-4xl sm:text-5xl absolute left-0 bottom-16 sm:bottom-24 text-center w-full text-white uppercase z-10">About Us</Title>
      </div>

      <div className="container mx-auto mt-10 mb-24 sm:mb-36">
        <div className="grid md:grid-cols-3 gap-5 md:gap-16">
          <h6>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, saepe ex magni reiciendis magnam, aliquid exercitationem asperiores laudantium harum nostrum animi adipisci voluptates voluptas sapiente. Molestias minima, laudantium laboriosam ipsa, quas fuga, tenetur perferendis quo maxime aut repellendus neque quis esse alias modi? Repudiandae temporibus soluta cupiditate delectus. Ducimus, impedit.</h6>

          <h6>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, saepe ex magni reiciendis magnam, aliquid exercitationem asperiores laudantium harum nostrum animi adipisci voluptates voluptas sapiente. Molestias minima, laudantium laboriosam ipsa, quas fuga, tenetur perferendis quo maxime aut repellendus neque quis esse alias modi? Repudiandae temporibus soluta cupiditate delectus. Ducimus, impedit.</h6>

          <h6>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia, saepe ex magni reiciendis magnam, aliquid exercitationem asperiores laudantium harum nostrum animi adipisci voluptates voluptas sapiente. Molestias minima, laudantium laboriosam ipsa, quas fuga, tenetur perferendis quo maxime aut repellendus neque quis esse alias modi? Repudiandae temporibus soluta cupiditate delectus. Ducimus, impedit.</h6>
        </div>
      </div>

    </div>
  );
};

export default Index;
