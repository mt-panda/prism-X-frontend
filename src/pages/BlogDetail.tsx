import React, { useState, useEffect, useRef, useCallback } from "react";
import PageHeader from "../components/UI/PageHeader";
import BlogDetailCard from "../components/Blog/BlogDetailCard.tsx";
import { Grid, Box } from "@mui/material";
import BlogDetailSideBar from "../components/Blog/BlogDetailSideBar";
import { useParams } from "react-router-dom";
import blogDetailBanner from "../assets/images/blogDetail.jpg";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [sidebarBottom, setSidebarBottom] = useState<number>(0);
  const [sidebarTopWhenSticky, setSidebarTopWhenSticky] = useState<number>(0);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    if (sidebarRef.current) {
      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const sidebarEndBottom = sidebarRect.bottom + currentScrollY;

      if (sidebarBottom === 0) {
        setSidebarBottom(sidebarEndBottom);
      }

      if (currentScrollY + windowHeight >= sidebarBottom) {
        if (!isSticky) {
          setSidebarTopWhenSticky(sidebarRect.top);
          setIsSticky(true);
        }
      } else {
        if (isSticky) {
          setIsSticky(false);
        }
      }
    }

    setLastScrollY(currentScrollY);
  }, [isSticky, lastScrollY, sidebarBottom]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <PageHeader image={blogDetailBanner} page="News" />
      <Grid container sx={{ display: { md: "flex", sm: "flex", xs: "block" } }}>
        <Box sx={{ flex: 1 }}>
          <BlogDetailCard id={id ? parseInt(id) : 0} />
        </Box>
        <Box
          ref={sidebarRef}
          sx={{
            flex: 0.3,
            position: isSticky ? "sticky" : "relative",
            top: isSticky ? sidebarTopWhenSticky : "auto",
            alignSelf: "flex-start",
          }}
        >
          <BlogDetailSideBar />
        </Box>
      </Grid>
    </>
  );
};

export default BlogDetail;
