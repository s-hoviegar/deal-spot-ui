import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Product } from "../interfaces/product.interface";
import { useState } from "react";
import { Category } from "../interfaces/category.interface";
import CategoryCombobox from "./category-combobox";
import { Stack } from "@mui/material";
import createProduct from "../actions/create-product";
import { FormResponse } from "@/app/common/interfaces/form-response.interface";

const filter = createFilterOptions<ProductOptionType>();

interface CreateProductOptionDialogProps {
  helperText: string | undefined;
  error: boolean;
  products: Product[];
  categories: Category[];
}

export default function CreateProductOptionDialog({
  helperText,
  error,
  products,
  categories,
}: CreateProductOptionDialogProps) {
  const [productId, setProductId] = useState<number | undefined>();
  const [value, setValue] = useState<ProductOptionType | null>(null);
  const [open, toggleOpen] = useState(false);
  const [response, setResponse] = useState<FormResponse>();

  const handleClose = () => {
    setDialogValue({
      id: 0,
      name: "",
      detail: {},
      category_id: 0,
    });
    setResponse(undefined);
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    id: 0,
    name: "",
    detail: {},
    category_id: 0,
  });

  const handleSubmit = async (formData: FormData) => {
    const response = await createProduct(formData);
    setResponse(response);
    if (!response.error) {
      setValue({
        name: dialogValue.name,
        id: dialogValue.id,
      });
      handleClose();
      setProductId(response.product_id);
    }
  };

  const productsItems = Object.values(
    products.map((product) => {
      return {
        name: product.name,
        id: product.product_id,
      };
    })
  );

  return (
    <>
      <Autocomplete
        disablePortal
        value={value}
        onChange={(event, newValue: ProductOptionType) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                id: 0,
                name: newValue,
                detail: {},
                category_id: 0,
              });
            });
            console.log("teeesssssssttttttttiiii", newValue);
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              id: 0,
              name: newValue.inputValue,
              detail: {},
              category_id: 0,
            });
            console.log(newValue.inputValue);
          } else {
            setValue(newValue);
            setProductId(newValue?.id);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              id: 0,
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog"
        options={productsItems}
        getOptionLabel={(option: string | ProductOptionType) => {
          // for example value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option: string | ProductOptionType) => {
          const { key, ...optionProps } = props;
          option = option as ProductOptionType;
          return (
            <li key={key} {...optionProps}>
              {option.name}
            </li>
          );
        }}
        freeSolo
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              required
              label="Product name"
              helperText={helperText}
              error={error}
            />
            <input
              key={productId}
              type="hidden"
              name="product_id"
              value={productId}
            />
          </>
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form action={handleSubmit} className="w-full max-w-xs">
          <Stack spacing={2}>
            <DialogTitle>Add a new product</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Did you miss any product in our list? Please, add it!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                name="name"
                className="w-full max-w-xs"
                value={dialogValue.name}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    name: event.target.value,
                  })
                }
                label="Name"
                type="text"
                variant="standard"
                helperText={response?.error}
                error={!!response?.error}
              />
              <TextField
                margin="dense"
                id="detail"
                name="detail"
                className="w-full max-w-xs"
                value={JSON.stringify(dialogValue.detail)}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    detail: event.target.value,
                  })
                }
                label="Detail"
                type="text"
                variant="standard"
                helperText={response?.error}
                error={!!response?.error}
              />
              <CategoryCombobox
                categories={categories}
                helperText={response?.error}
                error={!!response?.error}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
    </>
  );
}

interface ProductOptionType {
  inputValue?: string;
  name: string;
  id: number;
}
