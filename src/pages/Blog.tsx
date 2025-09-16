import { Box, Grid, Pagination } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../components/UI/PageHeader";
import NotFound from "./NotFound";
import BlogBanerimage from "../assets/images/BlogBanerimage.jpg";
import BlogCard from "../components/Blog/BlogCard";
import BlogSearchBar from "../components/Blog/BlogSearchBar";
import Blogdata from "../components/Blog/BlogData";
import BlogSideBar from "../components/Blog/BlogSideBar.tsx";

// ---------------- Types ----------------
interface BlogItem {
  id: string | number;
  label: string;
  description: string;
  category?: string;
  tags: string[];
  [key: string]: any;
}

interface LocationState {
  selectedCategory?: string;
  selectedTag?: string;
}

const Blog: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState | null;

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<BlogItem[]>(Blogdata);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [, setLastScrollY] = useState<number>(0);
  const [sidebarBottom, setSidebarBottom] = useState<number>(0);
  const [sidebarTopWhenSticky, setSidebarTopWhenSticky] = useState<number>(0);

  useEffect(() => {
    if (state?.selectedCategory) {
      const selectedCategory = state.selectedCategory;
      const filtered = Blogdata.filter((item: BlogItem) =>
        selectedCategory === "Uncategorized"
          ? !item.category
          : item.category === selectedCategory
      );
      setFilteredData(filtered);
    } else if (state?.selectedTag) {
      const selectedTag = state.selectedTag;
      const filtered = Blogdata.filter((item: BlogItem) =>
        item.tags.includes(selectedTag)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(Blogdata);
    }
  }, [state]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const filtered = Blogdata.filter((item: BlogItem) => {
      const lowerCaseQuery = query.toLowerCase();
      return (
        item.label.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery)
      );
    });

    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
  }, [isSticky, sidebarBottom]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <Grid container>
      <PageHeader image={BlogBanerimage} page="LATEST POSTS" />
      <Grid
        container
        sx={{ display: { lg: "flex", sm: "block", xs: "block" } }}
      >
        <Box sx={{ flex: 1 }}>
          {filteredData.length > 0 ? (
            <>
              <Box
                ref={sidebarRef}
                sx={{
                  flex: 1,
                  display: {
                    xs: "block",
                    md: "none",
                  },
                  width: "100%",
                }}
              >
                <BlogSearchBar
                  searchQuery={searchQuery}
                  onSearchChange={handleSearchChange}
                />
                <BlogSideBar />
              </Box>
              <Box>
                <BlogCard data={currentItems as any} itemsPerPage={itemsPerPage} />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "60px",
                }}
              >
                <Pagination
                  count={Math.ceil(filteredData.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  shape="rounded"
                />
              </Box>
            </>
          ) : (
            <NotFound />
          )}
        </Box>
        <Box
          ref={sidebarRef}
          sx={{
            flex: 0.3,
            display: {
              xs: "none",
              md: "block",
            },
            width: {
              md: "40%",
              lg: "30%",
            },
            position: isSticky ? "sticky" : "relative",
            top: isSticky ? sidebarTopWhenSticky : "auto",
            alignSelf: "flex-start",
          }}
        >
          <BlogSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <BlogSideBar />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Blog;
