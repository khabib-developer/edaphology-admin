/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Dialog,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CheckIcon from "@mui/icons-material/Check";
import { useModelHook } from "@/hooks/models/model.hook";
import { useModelStore } from "@/store/model.store";
import { IModel } from "@/types";
import DownloadIcon from "@mui/icons-material/Download";

interface IModal {
  model: IModel | boolean;
  handleClose: () => void;
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ButtonFile = ({ name, register, watch, errors, link, size, publicName }: any) => {
  const files = watch(name);

  const sizeKb =
    link.trim() !== "" &&
    Math.round(files && files.length ? +files[0].size / 1024 : size / 1024);

  return (
    <>
      <Button
        component="label"
        variant={validationFile(watch(name)) ? "contained" : "outlined"}
        sx={{ width: "100%" }}
        color={
          errors[name]
            ? "error"
            : validationFile(watch(name))
            ? "success"
            : "primary"
        }
        startIcon={
          validationFile(watch(name)) ? <CheckIcon /> : <CloudUploadIcon />
        }
      >
        {publicName}
        <VisuallyHiddenInput {...register(name)} type="file" />
      </Button>
      {link.trim() !== "" && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Typography variant="overline">{sizeKb}kb</Typography>
          <a href={import.meta.env.VITE_URL + link} target="_blank">
            <DownloadIcon fontSize="small" />
          </a>
        </Box>
      )}
    </>
  );
};

const validationFile = (
  value: string | any[],
  updateMode?: boolean | undefined
) => (updateMode ? updateMode : value && Boolean(value.length));

export const Modal: React.FC<IModal> = ({ model, handleClose }) => {
  const updateMode = useMemo(() => typeof model === "object", [model]);

  const { createModel } = useModelHook();

  const { models } = useModelStore();

  const [checked, setChecked] = React.useState(updateMode ? true : false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(
      yup.object({
        name: yup
          .string()
          .required()
          .matches(/^[A-Za-z][A-Za-z0-9]*$/, "Wrong name for folder name")
          .min(2),
        description: yup.string().required().min(2),
        file1: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file2: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file3: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file4: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file5: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file1norm: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file2norm: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file3norm: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file4norm: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
        file5norm: (yup as any)
          .mixed()
          .test("file", "You need to provide a file", (value: any) =>
            validationFile(value, updateMode)
          ),
      })
    ),
  });

  const submitForm = async (data: { [x: string]: any }) => {
    const order = models.length
      ? Math.max(...models.map((model) => model.order)) + 1
      : 0;
    const formData = new FormData();
    for (const formDataKey in data) {
      const file = formDataKey.slice(0, 4) === "file";
      if (file) {
        data[formDataKey][0] &&
          formData.append(formDataKey, data[formDataKey][0]);
      } else {
        formData.append(formDataKey, data[formDataKey]);
      }
    }
    formData.append("is_dl", String(Number(checked)));
    if (!updateMode) formData.append("order", String(order));
    handleClose();
    reset();
    await createModel(formData, updateMode ? (model as IModel).id! : undefined);
  };

  useEffect(() => {
    if (updateMode && model) {
      setValue("name", (model as IModel).name);
      setValue("description", (model as IModel).description);
    }
    if (!model) reset();
  }, [model, updateMode]);

  return (
    <Dialog fullWidth={true} maxWidth="sm" open={!!model} onClose={handleClose}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          noValidate
          component="form"
          onSubmit={handleSubmit(submitForm)}
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            flex: 1,
            width: "100%",
          }}
        >
          <Box p={4}>
            <TextField
              {...register("name")}
              error={!!errors.name}
              id="standard-basic"
              label="Modelning nomlanishi"
              sx={{ width: "100%" }}
              variant="standard"
            />
          </Box>
          <Box px={4}>
            <TextField
              error={!!errors.description}
              {...register("description", {
                required: "Model nomlanishsiz yaratilishi mumkin emas",
              })}
              id="standard-basic"
              label="Description"
              sx={{ width: "100%" }}
              variant="standard"
            />
          </Box>
          <Box
            p={4}
            pb={0}
            sx={{ display: "flex", alignItems: "end", flexDirection: "column" }}
          >
            <Typography>Machine/Deep learning</Typography>
            <Switch
              disabled={updateMode}
              checked={updateMode ? (model as IModel).is_dl : checked}
              onChange={handleChange}
            />
          </Box>
          <Box p={4}>
            <Grid container columnSpacing={3}>
              <Grid item xs={6}>
                <Typography variant="body2">
                  Model
                  {updateMode && model ? (model as IModel).name : ""}
                </Typography>
                <Box pt={2}>
                  <ButtonFile
                    name="file1"
                    publicName={"Gumus"}
                    link={updateMode && model ? (model as IModel).file1 : ""}
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file1_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file2"
                    publicName={"fosfor"}
                    link={updateMode && model ? (model as IModel).file2 : ""}
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file2_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file3"
                    publicName={"kaliy"}
                    link={updateMode && model ? (model as IModel).file3 : ""}
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file3_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file4"
                    publicName={"mexanika"}
                    link={updateMode && model ? (model as IModel).file4 : ""}
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file4_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file5"
                    publicName={"tuzlanish"}
                    link={updateMode && model ? (model as IModel).file5 : ""}
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file5_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2">Preprocessing model</Typography>
                <Box pt={2}>
                  <ButtonFile
                    name="file1norm"
                    publicName={"gumus normalization"}
                    link={
                      updateMode && model ? (model as IModel).file1norm : ""
                    }
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file1norm_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file2norm"
                    publicName={"fosfor normalization"}
                    link={
                      updateMode && model ? (model as IModel).file2norm : ""
                    }
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file2norm_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file3norm"
                    publicName={"kaliy normalization"}
                    link={
                      updateMode && model ? (model as IModel).file3norm : ""
                    }
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file3norm_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file4norm"
                    publicName={"mexanika norm..."}
                    link={
                      updateMode && model ? (model as IModel).file4norm : ""
                    }
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file4norm_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
                <Box pt={2}>
                  <ButtonFile
                    name="file5norm"
                    publicName={"tuzlanish norm..."}
                    link={
                      updateMode && model ? (model as IModel).file5norm : ""
                    }
                    register={register}
                    size={
                      updateMode && model ? (model as IModel).file5norm_size : 1
                    }
                    errors={errors}
                    watch={watch}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Grid container justifyContent="end" p={3}>
            {updateMode ? (
              <Button type="submit">Yangilash</Button>
            ) : (
              <Button type="submit">Yaratish</Button>
            )}
            <Button onClick={handleClose}>Yopish</Button>
          </Grid>
        </Box>
      </Box>
    </Dialog>
  );
};
