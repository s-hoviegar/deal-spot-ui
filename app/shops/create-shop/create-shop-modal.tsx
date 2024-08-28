"use client";

import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { FormResponse } from "../../common/interfaces/form-response.interface";
import createShop from "../actions/create-shop";

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

interface CreateShopModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function CreateShopModal({
  open,
  handleClose,
}: CreateShopModalProps) {
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
            const response = await createShop(formData);
            setResponse(response);
            if (!response.error) {
              onClose();
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Shop Name"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="website"
              label="Website"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="contact_info"
              label="Contact info"
              variant="outlined"
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="location"
              label="Location"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="address"
              label="Address"
              variant="outlined"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <TextField
              name="average_rating"
              label="Rating"
              variant="outlined"
              type="number"
              required
              helperText={response?.error}
              error={!!response?.error}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
