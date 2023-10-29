import { useState } from "react";
import { Box, Button } from "@mui/material";
import { Modal } from "@/views/admin/components/model/components/dialog";

const Create = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Box pt={2}>
      <Button
        onClick={() => setOpen(true)}
        variant="outlined"
        sx={{ width: "100%", borderStyle: "dotted" }}
      >
        Model qo'shish
      </Button>
      <Modal model={open} handleClose={handleClose} />
    </Box>
  );
};

export default Create;
