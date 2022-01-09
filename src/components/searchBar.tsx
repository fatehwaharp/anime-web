import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

function SearchBar({
  onChange,
  defaultValue,
  isSearching,
}: {
  onChange: (searchTerm: string) => void;
  defaultValue: string | undefined;
  isSearching: boolean;
}) {
  return (
    <TextField
      fullWidth
      label="Search"
      id="search"
      value={defaultValue && defaultValue}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {isSearching ? <CircularProgress size={20} /> : <Search />}
          </InputAdornment>
        ),
      }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default SearchBar;
