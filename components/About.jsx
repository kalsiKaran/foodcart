import Image from "next/image";
import Title from "./ui/Title";
import Link from "next/link";

const About = () => {
  return (
    <div className="bg-secondary py-14">
      <div className="container mx-auto flex flex-col md:flex-row items-center text-white gap-10 sm:gap-20 justify-center">
        <div className="flex justify-center w-full gap-2 rounded-xl overflow-hidden">
            <div className="relative h-56 sm:h-96 w-1/2 sm:w-full">
              <Image src="/images/about-grid-2.jpg" alt="about" layout="fill" objectFit="cover" />
            </div>
            <div className="flex flex-col gap-2 w-1/2 sm:w-full">
              <div className="relative h-1/2 w-full col-span-2">
                <Image src="/images/about-grid-1.jpg" alt="about" layout="fill" objectFit="cover" />
              </div>
              <div className="relative h-1/2 w-full">
                <Image src="/images/about-grid-3.jpg" alt="about" layout="fill" objectFit="cover" />
              </div>
            </div>
        </div>
        <div className="w-full">
          <Title addClass="text-3xl sm:text-4xl">We Are KANGO CASTLE</Title>
          <p className="my-5 flex flex-col items-center">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt fugit animi dignissimos at sunt ad unde nulla ratione placeat, quisquam necessitatibus recusandae, sint laborum esse libero nihil iure dolores! Repudiandae dolorem at nostrum dolorum. Rerum laborum beatae dicta repellendus soluta earum nisi sit totam voluptatem ullam, explicabo modi dolorum facilis placeat nam deserunt delectus nobis impedit voluptate pariatur quo quia. Atque veniam suscipit et sit illum omnis natus vero facere!
          </p>

          <Link href="/about">
            <button className="mt-3 px-4 py-2 bg-amber-400 rounded-md cursor-pointer hover:bg-amber-500 transition duration-500">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
