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
        {[1,2].map((img, _idx)=>(
            <Link href="/menu" key={_idx}>
                <div className="relative h-64 sm:h-[70vh] w-full overflow-hidden">
                    <Image
                        src={`/images/home-banner-${img}.png`}
                        alt="home-banner"
                        layout="fill"
                        priority
                        objectFit="cover"
                    />
                </div>
            </Link>
        ))}
    </Slider>
  );
};

export default Hero;
