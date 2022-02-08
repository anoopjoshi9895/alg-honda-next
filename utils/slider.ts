const unslick = "unslick" as const;

const slickSettings = {
  breakpoint: 1119,
  settings: {
    slidesToShow: 2,
  },
};
export const sliderSettings = {
  key: "product-slider",
  dots: false,
  draggable: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  // slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: false,
  autoplaySpeed: 2500,
  arrows: true,
  className: "product-slider",
  responsive: [
    slickSettings,
    {
      breakpoint: 767,
      settings: unslick,
    },
  ],
};
