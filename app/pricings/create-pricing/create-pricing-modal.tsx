"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createPricing from "../actions/create-pricing";
import CreateProductOptionDialog from "./create-product-option-dialog";
import RetailerCombobox from "./retailer-combobox";
import { Product } from "../interfaces/product.interface";
import { Shop } from "../../shops/interfaces/shop.interface";
import { Category } from "../interfaces/category.interface";

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreatePricingModalProps {
  open: boolean;
  setModalImageVisible: (arg: boolean) => void;
  handleClose: () => void;
  setPricingId: (arg: number) => void;
  products: Product[];
  shops: Shop[];
  categories: Category[];
}

export default function CreatePricingModal({
  open,
  setModalImageVisible,
  handleClose,
  setPricingId,
  products,
  shops,
  categories,
}: CreatePricingModalProps) {
  const [response, setResponse] = useState<FormResponse>();

  const onClose = () => {
    setResponse(undefined);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles}>
        <form
          className="w-full max-w-xs"
          action={async (formData) => {
            console.log(formData);
            const response = await createPricing(formData);
            setResponse(response);
            if (!response.error) {
              onClose();
              setPricingId(response.retailer_id);
              setModalImageVisible(true);
            }
          }}
        >
          <Stack spacing={2}>
            <CreateProductOptionDialog
              helperText={response?.error}
              error={!!response?.error}
              products={products}
              categories={categories}
            />
            <RetailerCombobox
              helperText={response?.error}
              error={!!response?.error}
              shops={shops}
            />
            <TextField
              name="price"
              label="Price"
              type="number"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="currency"
              label="Currency"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="sale"
              label="Is it a sale pricing?"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
              select
              defaultValue="No"
            >
              {["Yes", "No"].map((option) => (
                <MenuItem
                  key={option}
                  value={option === "Yes" ? "true" : "false"}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <FormControl error={!!response?.error} required>
              <FormLabel
                id="demo-controlled-radio-buttons-group"
                error={!!response?.error}
              >
                Availability
              </FormLabel>
              <RadioGroup
                aria-labelledby="availability"
                name="availability"
                defaultValue="ONLINE"
              >
                <FormControlLabel
                  value="ONLINE"
                  control={<Radio />}
                  label="Online"
                />
                <FormControlLabel
                  value="IN_STORE"
                  control={<Radio />}
                  label="In store"
                />
              </RadioGroup>
              <FormHelperText>{response?.error}</FormHelperText>
            </FormControl>
            <Button type="submit" variant="contained">
              Add pricing
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
