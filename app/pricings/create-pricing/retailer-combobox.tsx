import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Shop } from "@/app/shops/interfaces/shop.interface";
import { useState } from "react";

interface RetailerComboboxProps {
  helperText: string | undefined;
  error: boolean;
  shops: Shop[];
}

export default function RetailerCombobox({
  helperText,
  error,
  shops,
}: RetailerComboboxProps) {
  const retailers = Object.values(
    shops.map((shop) => {
      return {
        name: shop.name,
        id: shop.retailer_id,
      };
    })
  );
  const [shopId, setShopId] = useState<number | undefined>(retailers[0].id);
  const [value, setValue] = useState<{ name: string; id: number } | null>(
    retailers[0] || null
  );

  return (
    <Autocomplete
      disablePortal
      options={retailers}
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
            label="Shop"
            helperText={helperText}
            error={error}
          />
          <input key={shopId} type="hidden" name="retailer_id" value={shopId} />
        </>
      )}
      value={value}
      onChange={(event: any, newValue: { name: string; id: number } | null) => {
        setValue(newValue);
        setShopId(newValue?.id); // Updates the hidden input with the selected shop ID
      }}
    />
  );
}
