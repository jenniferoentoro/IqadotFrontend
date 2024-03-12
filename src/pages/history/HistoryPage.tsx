import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Menu,
  MenuItem,
  Typography,
  ButtonGroup,
  Stack,
} from "@mui/material";
import Header from "../../components/template/Header.tsx";
import HistoryCard from "../../components/history/HistoryCard.tsx";
import { FileResponse } from "../../dto/file/fileResponse.ts";
import { getArticles } from "../../services/getArticles/getArticles.ts";
import { getStatic } from "../../services/getArticles/getStatic.ts";

const HistoryPage: React.FC = () => {
  const [articles, setArticles] = useState<FileResponse[]>([]);
  const [sortingOrder, setSortingOrder] = useState<
    "asc" | "desc" | "timestamp"
  >("asc");
  const [fileTypeFilter, setFileTypeFilter] = useState<string>("All");
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [mode, setMode] = useState("static");

  const fetchData = async () => {
    try {
      const backendResponse = await getArticles();
      const frontendResponse = transformBackendResponse(backendResponse);
      setArticles(frontendResponse);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  const fetchStatic = async () => {
    try {
      const backendResponse = await getStatic();
      const frontendResponse = transformBackendResponse(backendResponse);
      setArticles(frontendResponse);
    } catch (error) {
      console.error("Error fetching statics:", error);
    }
  };

  useEffect(() => {
    if (mode === "static") {
      fetchStatic();
    } else {
      fetchData();
    }
  }, [mode]);

  console.log(articles)

  const transformBackendResponse = (backendResponse: any[]): FileResponse[] => {
    return backendResponse.map((item) => {
      return {
        title: mode === "static" ? item.subject : item.title,
        name: item.pathFile,
        type: item.pathFile != null ? getFileType(item.pathFile) : null,
        date: formatDate(item.dateCreated),
        publish: item.publish,
        isDeleted: item.isDeleted,
        id: mode === "static" ? item.staticItemGuid : item.articleGuid,
      };
    });
  };

  const getFileType = (path: string): string => {
   
      const extension = path.split(".").pop().toLowerCase();
      switch (extension) {
        case "pdf":
          return "PDF";
        case "csv":
          return "CSV";
        case "json":
          return "JSON";
        default:
          return "JSON";
      
    }
  };

  const formatDate = (inputDate: string): string => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(inputDate).toLocaleDateString("en-EU", options);
  };

  const handleSortMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSort = (order: "asc" | "desc" | "timestamp") => {
    setSortingOrder(order);
    setSortAnchorEl(null);
  };

  const handleFileTypeFilter = (selectedFilter: string) => {
    setFileTypeFilter(selectedFilter);
    setFilterAnchorEl(null);
  };

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setSortAnchorEl(null);
    setFilterAnchorEl(null);
  };

  const sortedArticles = [...articles];

  if (sortingOrder === "asc") {
    sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortingOrder === "desc") {
    sortedArticles.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortingOrder === "timestamp") {
    sortedArticles.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  const filteredArticles =
    fileTypeFilter === "All"
      ? [...sortedArticles]
      : sortedArticles.filter((article) => article.type === fileTypeFilter);

  const handleDelete = (mode: string) => {
    if (mode == 'static') {
      fetchStatic();
    } else {
      fetchData();
    }
  }

  return (
    <>
      <Grid
        container
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ mb: 3 }}
      >
        <Grid item>
          <Stack direction="row" spacing={2}>
            <Header text={"History"} />
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              size="small"
            >
              <Button
                onClick={() => {
                  setMode("articles");
                }}
                color={mode === "articles" ? "secondary" : "primary"}
              >
                Articles
              </Button>
              <Button
                onClick={() => {
                  setMode("static");
                }}
                color={mode === "static" ? "secondary" : "primary"}
              >
                Static
              </Button>
            </ButtonGroup>
          </Stack>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems={"center"}>
            <Grid item>
              <Button onClick={handleFilterMenuOpen}>
                {fileTypeFilter === "All" ? "All" : getFileType(fileTypeFilter)}{" "}
                : Filter <img src="src/images/Logo/filter.png" alt="" />
              </Button>
              <Menu
                anchorEl={filterAnchorEl}
                open={Boolean(filterAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleFileTypeFilter("All")}>
                  All
                </MenuItem>
                <MenuItem onClick={() => handleFileTypeFilter("PDF")}>
                  PDF
                </MenuItem>
                <MenuItem onClick={() => handleFileTypeFilter("CSV")}>
                  CSV
                </MenuItem>
                <MenuItem onClick={() => handleFileTypeFilter("JSON")}>
                  JSON
                </MenuItem>
              </Menu>
            </Grid>
            <Grid item>
              <Button onClick={handleSortMenuOpen}>
                {sortingOrder === "asc"
                  ? "A-Z"
                  : sortingOrder === "desc"
                  ? "Z-A"
                  : "Date"}{" "}
                : Sort <img src="src/images/Logo/sort.png" alt="" />
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={handleSortMenuClose}
              >
                <MenuItem onClick={() => handleSort("asc")}>A-Z</MenuItem>
                <MenuItem onClick={() => handleSort("desc")}>Z-A</MenuItem>
                <MenuItem onClick={() => handleSort("timestamp")}>
                  Date
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {filteredArticles.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
          Articles Not Found.
        </Typography>
      ) : (
        filteredArticles.map((article: FileResponse, index: number) => (
          <HistoryCard {...article} key={index} mode= {mode} onDelete={handleDelete}/>
        ))
      )}
    </>
  );
};

export default HistoryPage;
