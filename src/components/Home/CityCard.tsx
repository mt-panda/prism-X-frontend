import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, CardMedia, Typography, Container, useTheme } from "@mui/material";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { FreeMode, Pagination, Navigation, Autoplay } from "swiper/modules";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import cityBanner1 from "../../assets/images/banner-dubai.png"
import cityBanner2 from "../../assets/images/banner-europe.webp"
import cityBanner3 from "../../assets/images/banner-london.jpg"
import cityBanner4 from "../../assets/images/banner-turkey.jpg";
import cityBanner5 from "../../assets/images/banner-nyc.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface Slide {
  id: number;
  listings: number;
  city: string;
  image: string;
}

const slidesData: Slide[] = [
  { id: 1, listings: 0, city: "Dubai", image: cityBanner1 },
  { id: 2, listings: 2, city: "London", image: cityBanner3 },
  { id: 3, listings: 5, city: "Europe", image: cityBanner2 },
  { id: 4, listings: 1, city: "New York", image: cityBanner5 },
  { id: 5, listings: 3, city: "Turkey", image: cityBanner4 },
];

const CityCard: React.FC = () => {
  const navigate = useNavigate();
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const handleSlideClick = () => {
    navigate("/listings");
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5, px: { md: 0, sm: 0, xs: 3 } }}>
      <div className="city-swiper-container">
        <Swiper
          slidesPerView={4}
          slidesPerGroup={1}
          spaceBetween={25}
          freeMode={true}
          pagination={{
            clickable: true,
            dynamicBullets: false,
          }}
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
              slidesPerGroup: 1,
            },
            601: {
              slidesPerView: 2,
              slidesPerGroup: 1,
            },
            720: {
              slidesPerView: 3,
              slidesPerGroup: 1,
            },
            900: {
              slidesPerView: 4,
              slidesPerGroup: 1,
            },
          }}
          onInit={(swiper) => {
            setTimeout(() => {
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
            });
          }}
          modules={[FreeMode, Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {slidesData.map((slide) => (
            <SwiperSlide key={slide.id} onClick={handleSlideClick}>
              <Box
                component="section"
                style={{
                  display: "inline-block",
                  background: theme.palette.primary.focus,
                  color: theme.palette.primary.main,
                  position: "absolute",
                  top: "-15px",
                  left: "30px",
                  zIndex: 11,
                  fontSize: "12px",
                  padding: "7px 20px",
                  borderRadius: "4px",
                }}
              >
                {slide.listings} Listings
              </Box>
              <Box
                component="section"
                className="citySliderBox"
                sx={{
                  position: "relative",
                  overflow: "hidden",
                  "&:hover .banner-content::before, &:hover .banner-content::after":
                    {
                      width: "100%",
                    },
                  "&:hover .banner-content::after": {
                    right: 0,
                  },
                  "&:hover .banner-content::before": {
                    left: 0,
                  },
                  "&:hover": {
                    boxShadow: "0px 10px 20px 0px rgba(0,0,0,.05)",
                  },
                }}
              >
                <Box
                  className="banner-image"
                  sx={{
                    position: "relative",
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      backgroundImage:
                        "linear-gradient(to bottom, transparent 30%, rgba(0, 0, 0, .9) 100%)",
                      width: "100%",
                      height: "100%",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      transition: "all .35s",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="500px"
                    image={slide.image}
                  />
                </Box>
                <Box
                  className="banner-content"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "auto",
                    zIndex: 11,
                    padding: "30px",
                    paddingLeft: "0px",
                    textAlign: "center",
                    "&::before": {
                      content: "''",
                      position: "absolute",
                      width: "100%",
                      height: "50%",
                      background: theme.palette.primary.main,
                      transition: "all .35s",
                      zIndex: 1,
                      left: "-100%",
                      top: "18px",
                    },
                    "&::after": {
                      content: "''",
                      position: "absolute",
                      width: "100%",
                      height: "60px",
                      background: theme.palette.primary.main,
                      transition: "all .35s",
                      zIndex: 1,
                      right: "-100%",
                      bottom: 0,
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "Sacramento",
                      color: theme.palette.primary.focus,
                      fontSize: "34px",
                      position: "relative",
                      zIndex: 11,
                      fontWeight: 500,
                    }}
                  >
                    Places in
                  </Typography>
                  <Typography
                    variant="h2"
                    className="CityName"
                    sx={{
                      fontFamily: "sans-serif",
                      color: theme.palette.primary.main,
                      fontSize: { xs: "32px", lg: "42px" },
                      position: "relative",
                      zIndex: 11,
                      fontWeight: 700,
                    }}
                  >
                    {slide.city}
                  </Typography>
                  <Link
                    to={"/"}
                    className="navigateLink"
                    style={{
                      background: theme.palette.primary.focus,
                      color: theme.palette.primary.main,
                      fontSize: "23px",
                      height: "45px",
                      width: "45px",
                      margin: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "50px",
                      position: "absolute",
                      zIndex: "11",
                      top: "25px",
                      right: "40px",
                      opacity: 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowForwardIcon />
                  </Link>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <div ref={prevRef} className="city-custom-prev">
          <ArrowBackIcon />
        </div>
        <div ref={nextRef} className="city-custom-next">
          <ArrowForwardIcon />
        </div>
        <style>
          {`
          .city-custom-prev, .city-custom-next{
           display:none !important;
          }
          span.swiper-pagination-bullet {
            width:12px;
            height:12px;
            background: ${theme.palette.primary.hero};
        }
        span.swiper-pagination-bullet.swiper-pagination-bullet-active {
            background:  ${theme.palette.primary.focus};
        }
          .city-swiper-container .swiper-wrapper{
            margin-top: 16px;
            margin-bottom: 5rem;
          }
        .citySliderBox:hover .navigateLink{
            top: 0 !important;
            opacity: 1 !important;
        }
        .citySliderBox:hover .CityName {
            color: ${theme.palette.primary.hover} !important;
        }
        .citySliderBox{
            position: relative !important;
            }
        .city-swiper-container  .swiper-wrapper {
            column-gap: 25px;
        }
        .city-swiper-container {
            position: relative !important;
        }
        .city-swiper-container  .swiper-slide {
            margin-right: 0px !important;
            border-left: none;
          }
        
          .city-swiper-container .swiper-slide-next {
            background-color: ${theme.palette.primary.main};
            transition: background-color 0.6s;
          
            border-bottom: none;
          }
          .sliderSvg {
            transform-origin: center;
            transition: transform 0.5s ease-in-out;
          }
          
          .sliderBox:hover .sliderSvg {
            animation: scaleInOut 0.8s infinite alternate;
          }
          
          @keyframes scaleInOut {
            0% {
              transform: scale(0.7);
            }
            100% {
              transform: scale(1);
            }
          }
          
          .sliderBox {
            cursor: pointer;
            padding-left: 10px;
            padding-right: 10px;
            padding-bottom: 28px;
            padding-top: 40px;
          }
          .sliderSvg {
            fill: ${theme.palette.primary.focus};
            margin-left: 42px;
          }
          .city-swiper-container .swiper-pagination.swiper-pagination-clickable.swiper-pagination-bullets.swiper-pagination-horizontal {
            display: block;
          }
          
          .city-custom-next,
          .city-custom-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 1;
            cursor: pointer;
            color: white;
            background: ${theme.palette.primary.main};
            height: 45px;
            width: 45px;
            margin: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50px;
            transition: background-color 0.6s;
          }
          .city-custom-prev {
            left: 29px;
          }
          .city-custom-next{
            right: 29px;
          }
          
          .city-swiper-container {
            overflow: hidden;
          }
          
          .mySwiper .swiper-slide {
            transition: transform 0.8s ease-in-out;
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
          @media only screen and (max-width: 500px) {
            .custom-prev,
            .custom-next {
              display: none;
            }
          }
          
        `}
        </style>
      </div>
    </Container>
  );
};

export default CityCard;
