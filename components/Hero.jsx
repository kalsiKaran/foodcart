import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";

const Hero = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 30000,
    };

  return (
      
    <Slider {...settings}>
            <Link href="/menu">
                <div className="relative h-56 my-5 mx-auto w-[calc(100%_-_3rem)] sm:my-0 sm:w-full sm:h-[70vh] w-full overflow-hidden">
                    <div className="hidden sm:block">
                        <Image
                            src={`/images/home-banner-1.png`}
                            alt="home-banner"
                            layout="fill"
                            priority
                            objectFit="cover"
                            className="absolute h-full w-full rounded-xl sm:rounded-none"
                        />
                    </div>

                    <div className="sm:hidden">
                        <Image
                            src={`/images/home-banner-3.png`}
                            alt="home-banner"
                            layout="fill"
                            priority
                            objectFit="cover"
                            className="absolute h-full w-full rounded-xl sm:rounded-none"
                        />
                        
                        <button className="absolute left-3 top-3 bg-amber-400 px-3 py-1 rounded-md text-xs font-bold opacity-90">
                            50% OFF
                        </button>
                    </div>
                </div>
            </Link>

            <Link href="/menu">
                <div className="relative h-56 my-5 mx-auto w-[calc(100%_-_3rem)] sm:my-0 sm:w-full sm:h-[70vh] w-full overflow-hidden">
                    <Image
                        src={`/images/home-banner-2.png`}
                        alt="home-banner"
                        layout="fill"
                        priority
                        objectFit="cover"
                        className="absolute h-full w-full rounded-xl sm:rounded-none"
                    />
                </div>
            </Link>
    </Slider>
  );
};

export default Hero;
