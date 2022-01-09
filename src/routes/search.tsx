import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import TablePagination from "@mui/material/TablePagination";

import SearchBar from "../components/searchBar";
import useDebounce from "../utils/useDebounce";

import AnimeList from "../types/AnimeList";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [results, setResults] = useState<AnimeList>({});
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSearchTerm = (searchTerm: string) => {
    setSearchTerm(searchTerm);
    setPage(0);
  };

  useEffect(() => {
    const searchQuery = searchParams.get("q") || "";
    const pageQuery = searchParams.get("page") || "1";
    const rowsPerPageQuery = searchParams.get("rowsPerPage") || "25";

    setSearchParams({
      q: searchQuery,
      page: pageQuery,
      rowsPerPage: rowsPerPageQuery,
    });

    setSearchTerm(searchQuery);
    setPage(parseInt(pageQuery, 10) - 1);
    setRowsPerPage(parseInt(rowsPerPageQuery, 10));
  }, []);

  useEffect(() => {
    setIsSearching(true);
    setSearchParams({
      q: debouncedSearchTerm,
      page: "" + (page + 1),
      rowsPerPage: "" + rowsPerPage,
    });
    searchAnime(searchTerm, page, rowsPerPage).then((response) => {
      setIsSearching(false);
      window.scrollTo(0, 0);
      setResults(response);
    });
  }, [debouncedSearchTerm, page, rowsPerPage]);

  return (
    <Box>
      <SearchBar
        onChange={handleChangeSearchTerm}
        defaultValue={searchTerm}
        isSearching={isSearching}
      />

      {results && results.data && results.data.length === 0 ? (
        <Box sx={{ pt: 2 }}>
          Sorry, anime with a title "{searchTerm}" not found
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignContent: "flex-start",
              mt: 2,
            }}
          >
            {results.data &&
              results.data.length > 0 &&
              results.data.map((anime, i) => (
                <Card
                  sx={{ width: "225px", m: 2, ml: i % 4 === 0 ? 0 : 2 }}
                  key={anime.mal_id}
                >
                  <Link
                    to={`/anime/${anime.mal_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box>
                      <CardMedia
                        component="img"
                        image={anime.images.jpg.image_url}
                        alt={anime.title}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="body1"
                          component="p"
                          sx={{ color: "black" }}
                        >
                          {anime.title}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Link>
                </Card>
              ))}
          </Box>
          <Box>
            <TablePagination
              showFirstButton
              showLastButton
              component="div"
              count={
                results.pagination && results.data && results.data.length
                  ? results.pagination.last_visible_page === 1
                    ? results.data.length
                    : results.pagination.last_visible_page * rowsPerPage
                  : 0
              }
              page={page}
              rowsPerPageOptions={[10, 15, 20, 25]}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
}

async function searchAnime(
  searchTerm: string = "",
  page: number = 0,
  rowsPerPage: number = 25
): Promise<AnimeList> {
  const response = await axios.get<AnimeList>(
    `https://api.jikan.moe/v4/anime?q=${encodeURI(searchTerm)}&page=${
      page + 1
    }&limit=${rowsPerPage}`
  );
  return response.data;
}
