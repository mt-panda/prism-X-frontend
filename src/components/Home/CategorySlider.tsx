import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { useNavigate } from "react-router-dom";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const CategorySlider: React.FC = () => {
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const swiperInstance = (swiperRef.current as any)?.swiper;

    if (!swiperInstance) return;

    const updateBorder = () => {
      const slides: HTMLElement[] = swiperInstance.slides;
      slides.forEach((slide: HTMLElement, index: number) => {
        if (index === swiperInstance.activeIndex) {
          slide.style.borderLeft = "none";
        } else {
          slide.style.borderLeft = "1px solid primary.main";
        }
      });
    };

    swiperInstance.on("slideChange", updateBorder);

    updateBorder();

    return () => {
      swiperInstance.off("slideChange", updateBorder);
    };
  }, []);

  const CategorySlideClick = () => {
    navigate("/listings");
  };
  return (
    <div className="swiper-container">
      <Swiper
        ref={swiperRef}
        slidesPerView={6}
        freeMode={true}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          601: {
            slidesPerView: 2,
          },
          720: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 6,
          },
        }}
        onInit={(swiper) => {
          setTimeout(() => {
            if (
              swiper.params.navigation &&
              typeof swiper.params.navigation === "object" &&
              prevRef.current &&
              nextRef.current
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }
          });
        }}
        modules={[FreeMode, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            onClick={CategorySlideClick}
            sx={{
              height: "115px",
              "&:hover": { height: "112px" },
            }}
          >
            <svg
              className="sliderSvg"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              width="60"
              height="60"
              viewBox="0 0 24 24"
            >
              <path d="M22,8V3.79c0-1.04-.626-1.956-1.595-2.332-1.711-.665-4.559-1.458-8.405-1.458S5.306,.793,3.594,1.458c-.968,.376-1.594,1.292-1.594,2.332v4.21H0v4c0,1.103,.897,2,2,2v7h2v3h4v-3h8v3h4v-3h2v-7c1.103,0,2-.897,2-2v-4h-2ZM3,13V6H21v7H3ZM15,5h-6v-1h6v1ZM3.957,2.39c1.336-.519,4.157-1.39,8.043-1.39s6.708,.871,8.044,1.39c.581,.226,.956,.775,.956,1.4v1.21h-5V3H8v2H3v-1.21c0-.625,.375-1.174,.957-1.4ZM1,12v-3h1v4c-.551,0-1-.449-1-1Zm6,11h-2v-2h2v2Zm12,0h-2v-2h2v2Zm2-3H3v-6h3v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h10v1.5c0,.276,.224,.5,.5,.5s.5-.224,.5-.5v-1.5h3v6Zm2-8c0,.551-.448,1-1,1v-4h1v3Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Traveling
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            sx={{ height: "115px", "&:hover": { height: "112px" } }}
          >
            <svg
              className="sliderSvg"
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="60px"
              height="60px"
            >
              <path d="m22,12.05v-4.05h-2C20,2.795,16.119.108,15.959,0h-.959v.5c0,2.412-2.246,2.498-2.5,2.5h-3c-4.449,0-5.299,3.644-5.462,5h-2.038v4.05c-1.14.232-2,1.242-2,2.45v9.5h24v-9.5c0-1.208-.86-2.218-2-2.45ZM9.5,4h3c1.094,0,3.069-.598,3.439-2.756.921.803,3.061,3.064,3.061,6.756H5.036c.144-1.177.866-4,4.464-4Zm-6.5,5h18v3H3v-3Zm20,14H1v-8.5c0-.827.673-1.5,1.5-1.5h19c.827,0,1.5.673,1.5,1.5v8.5Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Beauty
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            sx={{ height: "115px", "&:hover": { height: "112px" } }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="60px"
              height="60px"
              className="sliderSvg"
            >
              <path d="m23.99,10.723c-.045-.024-1.391-.723-3.5-.723-3.031,0-5.307,2.382-6.103,3.343-.556-.206-1.19-.343-1.897-.343-1.869,0-3.642,1.002-4.858,1.903.208-.835.338-1.794.394-2.904,3.296-.015,5.973-2.699,5.973-5.999S11.309,0,8,0,2,2.691,2,6c0,.642.104,1.259.291,1.839C.301,11.987,0,16.304,0,18.419c.156.223,3.993,5.581,11.5,5.581,7.399,0,12.296-3.221,12.491-3.352v-9.925ZM8,1c2.757,0,5,2.243,5,5s-2.243,5-5,5-5-2.243-5-5S5.243,1,8,1Zm3.5,22c-6.358,0-9.899-4.139-10.5-4.905.015-1.936.31-5.44,1.848-9.035.89,1.492,2.404,2.563,4.183,2.854-.089,1.839-.475,3.324-1.007,4.386l.729.686c.028-.03,2.845-2.986,5.738-2.986,2.326,0,3.776,1.877,3.791,1.896l.8-.601c-.042-.056-.669-.859-1.761-1.5.82-.932,2.761-2.796,5.17-2.796,1.271,0,2.104.222,2.5.359v8.743c-.998.592-5.288,2.898-11.49,2.898Zm-3.5-15c1.103,0,2-.897,2-2s-.897-2-2-2-2,.897-2,2,.897,2,2,2Zm0-3c.551,0,1,.449,1,1s-.449,1-1,1-1-.449-1-1,.449-1,1-1Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Fitness
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            sx={{ height: "115px", "&:hover": { height: "112px" } }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="60px"
              height="60px"
              className="sliderSvg"
            >
              <path d="m11,0h1v9.5c0,1.379-1.121,2.5-2.5,2.5h-1.5v12h-1v-12h-1.5c-1.379,0-2.5-1.121-2.5-2.5V0h1v9.5c0,.827.673,1.5,1.5,1.5h1.5V0h1v11h1.5c.827,0,1.5-.673,1.5-1.5V0Zm10,8.767c0,4.717-4.145,9.307-5,10.203v5.03h-1V1.501c0-.658.402-1.217,1.026-1.424.623-.207,1.286.002,1.682.534,1.502,2.014,3.292,5.064,3.292,8.155Zm-5,8.695c1.393-1.652,4-5.211,4-8.695,0-2.816-1.683-5.665-3.095-7.559-.124-.168-.277-.208-.396-.208-.076,0-.138.017-.17.027-.079.026-.34.139-.34.474v15.961Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Restuarant
            </Typography>
          </Box>
        </SwiperSlide>{" "}
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            sx={{ height: "115px", "&:hover": { height: "112px" } }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="60px"
              height="60px"
              className="sliderSvg"
            >
              <path d="m20.95,4.938c-.477-.596-1.188-.938-1.951-.938h-5.412l.357-3h6.056V0h-6.944l-.476,4h-7.579c-.763,0-1.473.341-1.95.936-.477.594-.655,1.36-.499,2.055l2.004,17.01h14.889l1.995-16.955c.166-.744-.012-1.513-.489-2.107Zm-1.951.062c.458,0,.885.205,1.171.562s.394.817.285,1.314l-.368,3.123h-7.215l.596-5h5.531Zm-15.168.562c.286-.357.713-.562,1.17-.562h7.46l-.595,5H3.911l-.375-3.177c-.099-.445.009-.906.295-1.262Zm14.725,17.438H5.444l-1.416-12h15.941l-1.414,12Zm-7.047-10h1.006l-.979,8h-1.006l.978-8Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Nightlife
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            sx={{ height: "115px", "&:hover": { height: "112px" } }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="60px"
              height="60px"
              className="sliderSvg"
            >
              <path d="m20.95,4.938c-.477-.596-1.188-.938-1.951-.938h-5.412l.357-3h6.056V0h-6.944l-.476,4h-7.579c-.763,0-1.473.341-1.95.936-.477.594-.655,1.36-.499,2.055l2.004,17.01h14.889l1.995-16.955c.166-.744-.012-1.513-.489-2.107Zm-1.951.062c.458,0,.885.205,1.171.562s.394.817.285,1.314l-.368,3.123h-7.215l.596-5h5.531Zm-15.168.562c.286-.357.713-.562,1.17-.562h7.46l-.595,5H3.911l-.375-3.177c-.099-.445.009-.906.295-1.262Zm14.725,17.438H5.444l-1.416-12h15.941l-1.414,12Zm-7.047-10h1.006l-.979,8h-1.006l.978-8Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Bars
            </Typography>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box
            component="section"
            className="sliderBox"
            sx={{ height: "115px", "&:hover": { height: "112px" } }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Layer_1"
              data-name="Layer 1"
              viewBox="0 0 24 24"
              width="60px"
              height="60px"
              className="sliderSvg"
            >
              <path d="M23.43,4.92c-.48-.58-1.18-.92-1.93-.92H6.49l-.26-1.84c-.17-1.23-1.23-2.16-2.48-2.16h-1.26c-.28,0-.5,.22-.5,.5s.22,.5,.5,.5h1.26c.75,0,1.38,.56,1.49,1.29l1.78,12.83c.31,2.21,2.22,3.88,4.46,3.88h8.02c.28,0,.5-.22,.5-.5s-.22-.5-.5-.5H11.48c-1.73,0-3.22-1.29-3.46-3h10.64c2.14,0,3.99-1.52,4.41-3.62l.88-4.39c.15-.74-.04-1.49-.52-2.08Zm-.46,1.88l-.88,4.39c-.33,1.63-1.77,2.81-3.43,2.81H7.88l-1.25-9h14.87c.45,0,.87,.2,1.16,.55,.29,.35,.4,.8,.31,1.25Zm-13.97,13.21c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm0,3c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1Zm9-3c-1.1,0-2,.9-2,2s.9,2,2,2,2-.9,2-2-.9-2-2-2Zm0,3c-.55,0-1-.45-1-1s.45-1,1-1,1,.45,1,1-.45,1-1,1ZM0,5.5c0-.28,.22-.5,.5-.5H3.04c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5H.5c-.28,0-.5-.22-.5-.5Zm0,4c0-.28,.22-.5,.5-.5H3.5c.28,0,.5,.22,.5,.5s-.22,.5-.5,.5H.5c-.28,0-.5-.22-.5-.5Zm5,4c0,.28-.22,.5-.5,.5H.5c-.28,0-.5-.22-.5-.5s.22-.5,.5-.5H4.5c.28,0,.5,.22,.5,.5Z" />
            </svg>
            <Typography
              variant="h5"
              style={{
                fontSize: "16px",
                lineHeight: "42px",
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Poppins",
                marginTop: "10px",
                color: theme.palette.primary.hover,
                marginLeft: "-10px",
              }}
            >
              Shopping
            </Typography>
          </Box>
        </SwiperSlide>
      </Swiper>
      <div ref={prevRef} className="custom-prev">
        <ArrowBackIosNewIcon sx={{ fontSize: "40px" }} />
      </div>
      <div ref={nextRef} className="custom-next">
        <ArrowForwardIosIcon sx={{ fontSize: "40px" }} />
      </div>

      <style>
        {`
    .swiper-slide {
      margin-right: 0px !important;
      border-left: 1px solid ${theme.palette.primary.main};
    }
    .swiper-slide:first-child {
      border: none !important;
    }
    .swiper-slide:hover {
      background-color: ${theme.palette.primary.main};
      transition: background-color 0.6s;
      border-bottom: 3px solid ${theme.palette.primary.dark};
    }
    .sliderSvg {
      fill: ${theme.palette.primary.main};
      margin-left: 42px;
    }
    .sliderBox:hover .sliderSvg {
      animation: scaleInOut 0.8s infinite alternate;
    }
    .custom-prev,
    .custom-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1;
      cursor: pointer;
      color: grey;
      height: 45px;
      width: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      transition: background-color 0.6s;
    }
    .custom-prev {
      left: 29px;
    }
    .custom-next {
      right: 29px;
    }
    .custom-prev:hover,
    .custom-next:hover {
      color: ${theme.palette.primary.dark};
    }
    .swiper-container {
      overflow: hidden;
    }
    .mySwiper .swiper-slide {
      transition: transform 0.8s ease-in-out;
    }
    @keyframes scaleInOut {
      0% {
        transform: scale(0.7);
      }
      100% {
        transform: scale(1);
      }
    }
    @media only screen and (max-width: 900px) {
      .sliderSvg {
        margin-left: 0px;
        margin: auto;
        display: flex;
      }
    }
    @media only screen and (max-width: 720px) {
      .sliderSvg {
        margin-left: 0px;
        margin: auto;
        display: flex;
      }
      .swiper-slide {
        border: none;
      }
    }
    @media only screen and (max-width: 200px) {
      .custom-prev,
      .custom-next {
        display: flex;
      }
    }
  `}
      </style>
    </div>
  );
};

export default CategorySlider;
