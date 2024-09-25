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
import UploadProductImageForm from "./upload-product-image";

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
  const [openProduct, toggleOpenProduct] = useState(false);
  const [openImage, toggleOpenImage] = useState(false);
  const [response, setResponse] = useState<FormResponse>();
  const [dialogValue, setDialogValue] = useState({
    id: 0,
    name: "",
    detail: {},
    category_id: 0,
  });

  const handleClose = () => {
    setDialogValue({
      id: 0,
      name: "",
      detail: {},
      category_id: 0,
    });
    setResponse(undefined);
    toggleOpenProduct(false);
    toggleOpenImage(false);
  };

  const handleNext = () => {
    setDialogValue({
      id: 0,
      name: "",
      detail: {},
      category_id: 0,
    });
    setResponse(undefined);
    toggleOpenProduct(false);
    toggleOpenImage(true);
  };

  const handleSubmit = async (formData: FormData) => {
    const response = await createProduct(formData);
    setResponse(response);
    if (!response.error) {
      setValue({
        name: dialogValue.name,
        id: dialogValue.id,
      });
      setProductId(response.product_id);
      handleNext();
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
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpenProduct(true);
              setDialogValue({
                id: 0,
                name: newValue,
                detail: {},
                category_id: 0,
              });
            });
            console.log("teeesssssssttttttttiiii", newValue);
          } else if (newValue && newValue.inputValue) {
            toggleOpenProduct(true);
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
        filterOptions={(options: (string | ProductOptionType)[], params) => {
          const filtered = filter(options as ProductOptionType[], params);

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
      {/* Product dialog */}
      <Dialog open={openProduct} onClose={handleClose}>
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
                required
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
              <Button type="submit">Next</Button>
            </DialogActions>
          </Stack>
        </form>
      </Dialog>
      {/* Image dialog */}
      <Dialog open={openImage} onClose={handleClose}>
        <Stack spacing={2}>
          <DialogTitle>Upload product images</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Upload images showing the product.
            </DialogContentText>
            <UploadProductImageForm
              handleClose={handleClose}
              productId={productId}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
}

interface ProductOptionType {
  inputValue?: string;
  name: string;
  id: number;
}
