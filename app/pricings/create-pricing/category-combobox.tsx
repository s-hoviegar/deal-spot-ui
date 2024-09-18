import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { Category } from "../interfaces/category.interface";

interface CategoryComboboxProps {
  helperText: string | undefined;
  error: boolean;
  categories: Category[];
}

export default function CategoryCombobox({
  helperText,
  error,
  categories,
}: CategoryComboboxProps) {
  const categorys = Object.values(
    categories.map((category) => {
      return {
        name: category.name,
        id: category.category_id,
      };
    })
  );
  const [categoryId, setCategoryId] = useState<number | undefined>(
    categorys[0].id
  );
  const [value, setValue] = useState<{ name: string; id: number } | null>(
    categorys[0] || null
  );

  return (
    <Autocomplete
      disablePortal
      options={categorys}
      // Provide a function to compare options by `id`
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      // Label each option by the `name` property
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        return (
          <li {...props} key={option.id}>
            {option.name}
          </li>
        );
      }}
      renderInput={(params) => (
        <>
          <TextField
            {...params}
            required
            label="Category"
            variant="standard"
            helperText={helperText}
            error={error}
          />
          <input
            key={categoryId}
            type="hidden"
            name="category_id"
            value={categoryId}
          />
        </>
      )}
      value={value}
      onChange={(event: any, newValue: { name: string; id: number } | null) => {
        setValue(newValue);
        setCategoryId(newValue?.id); // Updates the hidden input with the selected category ID
      }}
    />
  );
}
