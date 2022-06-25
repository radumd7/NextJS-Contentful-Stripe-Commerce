import Image from "next/image";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { MdChevronLeft, MdPhotoCamera, MdChevronRight } from 'react-icons/md';

interface ImageSliderProps {
    images: Array<{
        url: string;
        alt: string;
    }>;
};

interface ImageSliderSlideProps {
    children: React.ReactNode;
};

const ImageSlider: React.FC<ImageSliderProps> = ({
    images
}) => {
    const [ currentSlide, setCurrentSlide ] = React.useState<number>(0);

    const [ref, slider] = useKeenSlider<HTMLDivElement>({
        initial: 0,
        loop: true,
        animationEnded(s) {
            setCurrentSlide(s.track.details.rel)
        }
    });

    const onPrev = React.useCallback(() => { slider.current?.prev() }, [slider]);
    const onNext = React.useCallback(() => { slider.current?.next() }, [slider]);

    return(
        <div className="relative w-full">
            <div ref={ref} className="keen-slider w-full lg:rounded-xl shadow-lg">
                {images.map((image, index) => (
                    <React.Fragment key={image.url}>
                        <ImageSliderSlide>
                            <Image
                                src={image.url}
                                alt={image.alt}
                                layout="fill"
                                objectFit="cover"
                                className="lg:rounded-xl"
                                priority={index===0}
                            />
                        </ImageSliderSlide>
                    </React.Fragment>
                ))}
            </div>
            <div className="absolute bottom-4 right-4 flex items-center">
                <button className="w-20 h-20 flex items-center justify-center border-2 border-black rounded-l-xl text-2xl" onClick={onPrev}>
                    <MdChevronLeft/>
                </button>
                <button className="w-20 h-20 flex items-center justify-center border-2 border-l-0 border-black rounded-r-xl text-2xl" onClick={onNext}>
                    <MdChevronRight/>
                </button>
            </div>
            <div className="absolute top-4 left-4 flex items-center bg-black rounded-full text-white px-4 py-2 space-x-2">
                <MdPhotoCamera/>
                <p className="text-sm font-bold">{currentSlide+1+' / '+images.length}</p>
            </div>
        </div>
    );
};

const ImageSliderSlide: React.FC<ImageSliderSlideProps> = ({
    children
}) => {
    return(
        <div
            className="keen-slider__slide w-full aspect-w-1 aspect-h-1 relative lg:rounded-xl"
        >
            {children}
        </div>
    );
};

export default ImageSlider;