"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
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
}

export default function CreatePricingModal({
  open,
  setModalImageVisible,
  handleClose,
  setPricingId,
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
            <CreateProductOptionDialog />
            {/* <CreateProductOptionDialog /> */}
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
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="sale"
              label="Is it a sale pricing?"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
              select
              defaultValue="No"
            >
              {["Yes", "No"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Availability
              </FormLabel>
              <RadioGroup aria-labelledby="availability" name="availability">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Online"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="In store"
                />
              </RadioGroup>
            </FormControl>
            <Button type="submit" variant="contained">
              Next
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
