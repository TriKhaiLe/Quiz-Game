import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Link } from "@mui/material";

const SearchResults = ({ query }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
            query
          )}&cx=${import.meta.env.VITE_GOOGLE_CX}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
        );
        const data = await response.json();
        setResults(data.items || []);
      } catch (err) {
        setError("Failed to fetch search results.");
      }
      setLoading(false);
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <CircularProgress />
        <Typography variant="h6">Loading search results...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      {results.map((result, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ color: "black" }}>
            <Link href={result.link} target="_blank" rel="noopener">
              {result.title}
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            {result.snippet}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SearchResults;