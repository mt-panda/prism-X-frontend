import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Typography, Container, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { FreeMode, Pagination, Navigation } from "swiper/modules";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import bgArrow from "../../assets/images/bg-arrow.png";
import FormatQuoteOutlinedIcon from "@mui/icons-material/FormatQuoteOutlined";

interface Testimonial {
    image: string;
    text: string;
    name: string;
    role: string;
}

const testimonials: Testimonial[] = [
    {
        image:
            "https://img.freepik.com/free-photo/portrait-young-red-haired-woman_273609-14612.jpg?w=996",
        text: "This directory has made it so much easier to find reputable places. It's my trusted resource for finding reliable businesses and services!",
        name: "Emily Davis",
        role: "Client",
    },
    {
        image:
            "https://img.freepik.com/free-photo/close-up-happy-laughing-bearded-man-smiling_176420-18793.jpg?w=996",
        text: "I rely on this directory for finding trustworthy businesses and services. It's my go-to guide for dependable recommendations!",
        name: "Michael Johnson",
        role: "User",
    },
    {
        image:
            "https://img.freepik.com/free-photo/people-beauty-positive-emotions-concept-attractive-smiling-young-woman-with-bobbed-hairdo-dressed-green-casual-sweater-glad-recieve-present_273609-3743.jpg?w=996",
        text: "Before choosing a service provider, I always refer to this directory. It has never let me down!",
        name: "Sarah Williams",
        role: "Patron",
    },
    {
        image:
            "https://img.freepik.com/free-photo/portrait-man-looking-front-him_23-2148422271.jpg?w=996",
        text: "I highly recommend this directory for anyone seeking reliable local businesses. An invaluable resource for me, always pointing me to the best options in my area.",
        name: "David Wilson",
        role: "Customer",
    },
];

const truncateText = (text: string, limit: number): string => {
    return text.length <= limit ? text : text.slice(0, limit) + "...";
};

const TestimonialSlider: React.FC = () => {
    const prevRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);
    const theme = useTheme();
    return (
      <Container maxWidth="lg" sx={{ pb: { xs: 5, md: 8 } }}>
        <div className="testimonail-swiper-container">
          <Swiper
            slidesPerView={2}
            spaceBetween={30}
            freeMode={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper) => {
              if (prevRef.current && nextRef.current) {
                if (
                  swiper.params.navigation &&
                  typeof swiper.params.navigation === "object"
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }
            }}
            loop={true}
            speed={800}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 1 },
              900: { slidesPerView: 2 },
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <Box sx={{ paddingLeft: { xs: "0", sm: "65px" } }}>
                    <Box
                      sx={{
                        height: "170px",
                        padding: {
                          xs: "80px 25px 25px 25px",
                          sm: "60px 45px 55px 95px",
                        },
                        marginTop: { xs: "50px", sm: "0px" },
                        margin: "0 auto",
                        position: "relative",
                        boxShadow: "0px 10px 20px 0px rgba(0,0,0,.07)",
                        borderRadius: "4px",
                        background: "white",
                        "&::after": {
                          content: "''",
                          background: `url(${bgArrow})`,
                          width: "166px",
                          height: "110px",
                          position: "absolute",
                          top: "95%",
                          left: "30px",
                          zIndex: 10,
                        },
                        "&:hover .formatQuoteIcon": {
                          color: theme.palette.primary.focus,
                        },
                        "&:hover .testimonialImageBox": {
                          borderColor: theme.palette.primary.focus,
                        },
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "sans-serif",
                          color: theme.palette.text.secondary,
                          fontSize: { xs: "18px", lg: "18px" },
                          lineHeight: "34px",
                          fontWeight: 400,
                        }}
                      >
                        {truncateText(testimonial.text, 110)}
                      </Typography>
                      <Typography
                        variant="h2"
                        pt={3}
                        sx={{
                          fontFamily: "Barlow",
                          color: theme.palette.primary.hover,
                          fontSize: { xs: "20px" },
                          lineHeight: "29px",
                          fontWeight: 600,
                        }}
                      >
                        {testimonial.name},{" "}
                        <span
                          style={{
                            color: theme.palette.text.secondary,
                            fontFamily: "Barlow",
                            fontSize: "14px",
                            lineHeight: "15px",
                            fontWeight: 700,
                          }}
                        >
                          {testimonial.role}
                        </span>
                      </Typography>
                      <FormatQuoteOutlinedIcon
                        className="formatQuoteIcon"
                        sx={{
                          width: "85px",
                          height: "90px",
                          position: "absolute",
                          bottom: "30px",
                          right: "30px",
                          color: isActive
                            ? theme.palette.primary.focus
                            : theme.palette.primary.main,
                        }}
                      />
                      <Box
                        className="testimonialImageBox"
                        sx={{
                          border: "10px solid",
                          borderColor: isActive
                            ? theme.palette.primary.focus
                            : theme.palette.primary.main,
                          padding: "10px",
                          borderRadius: "50%",
                          position: "absolute",
                          top: { xs: "-65px", sm: "60px" },
                          left: { xs: "12px", sm: "-55px" },
                          transition: "all .35s",
                        }}
                      >
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                    </Box>
                  </Box>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div ref={prevRef} className="testimonial-custom-prev">
            <ArrowBackIosNewIcon sx={{ fontSize: "40px" }} />
          </div>
          <div ref={nextRef} className="testimonial-custom-next">
            <ArrowForwardIosIcon sx={{ fontSize: "40px" }} />
          </div>

          {/* Inline CSS */}
          <style>
            {`
          .testimonail-swiper-container .swiper-wrapper {
            margin-top: 16px;
            margin-bottom: 5rem;
            column-gap: 25px;
            position: relative;
          }
          .testimonail-swiper-container .swiper-slide {
            margin-right: 0px !important;
            border-left: none;
          }
          .testimonial-custom-next,
          .testimonial-custom-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            cursor: pointer;
            color: grey;
            height: 45px;
            width: 45px;
            display: none !important;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            transition: background-color 0.6s;
          }
          .testimonial-custom-prev { left: -50px; }
          .testimonial-custom-next { right: -50px; }

          @media only screen and (min-width: 1200px) {
            .testimonial-custom-next,
            .testimonial-custom-prev {
              display: none !important;
            }
          }
          .testimonial-custom-prev:hover,
          .testimonial-custom-next:hover {
            color: ${theme.palette.primary.focus};
          }
          @media only screen and (max-width: 900px),
          only screen and (max-width: 720px) {
            .swiper-slide { border: none; }
          }
          @media only screen and (max-width: 500px) {
            .testimonial-custom-prev,
            .testimonial-custom-next {
              display: none;
            }
          }
          `}
          </style>
        </div>
      </Container>
    );
};

export default TestimonialSlider;
