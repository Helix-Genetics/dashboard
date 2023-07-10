import {CrudFilters, getDefaultFilter, HttpError, IResourceComponentsProps, useTranslate} from "@refinedev/core";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import {List, ShowButton, useDataGrid} from "@refinedev/mui";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import {ICar, ICarFilterVariables, IUser, IUserFilterVariables} from "../../interfaces";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {Controller} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@refinedev/react-hook-form";

export const CarsList: React.FC<IResourceComponentsProps> = () => {
    const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>(
      [],
    );
    const hasSelected = selectedRowKeys.length > 0;

    const t = useTranslate();
  const { dataGridProps, search, filters } = useDataGrid<
    ICar,
    HttpError,
    ICarFilterVariables
  >({
    onSearch: (params) => {
      const filters: CrudFilters = [];
      const { q, make, model, year, mileage, color } = params;

      filters.push({
        field: "q",
        operator: "eq",
        value: q !== "" ? q : undefined,
      });

      filters.push({
        field: "year",
        operator: "eq",
        value: year !== null ? year : undefined,
      });

      filters.push({
        field: "model",
        operator: "eq",
        value: model !== "" ? model : undefined,
      });
      filters.push({
        field: "year",
        operator: "eq",
        value: year !== null ? year : undefined,
      });
      filters.push({
        field: "mileage",
        operator: "eq",
        value: mileage !== null ? mileage : undefined,
      });
      filters.push({
        field: "color",
        operator: "eq",
        value: color !== "" ? color : undefined,
      });

      return filters;
    },
  });
    const columns = React.useMemo<GridColDef<ICar>[]>(()=> [
      {
        field: "make",
        headerName: t("cars.fields.make"),
        minWidth: 150,
        flex: 1,
      },
      {
        field: "model",
        headerName: t("cars.fields.model"),
        minWidth: 150,
        flex: 1,
      },
      {
        field: "color",
        headerName: t("cars.fields.color"),
        minWidth: 60,
        flex: 1,
      },
      {
        field: "year",
        headerName: t("cars.fields.year"),
        minWidth: 60,
        flex: 1,
      },
      {
        field: "mileage",
        headerName: t("cars.fields.mileage"),
        minWidth: 50,
        flex: 1,
      },
      {
        field: "created_at",
        headerName: t("cars.fields.created_at"),
        minWidth: 150,
        flex: 1,
      },
      {
        field: "updated_at",
        headerName: t("cars.fields.updated_at"),
        minWidth: 150,
        flex: 1,
      },
      {
        field: "actions",
        headerName: t("table.actions"),
        renderCell: function render({ row }) {
          return (
            <ShowButton
              size="small"
              hideText
              recordItemId={row.id}
            />
          );
        },
        align: "center",
        headerAlign: "center",
        flex: 1,
        minWidth: 150,
      },
      // add relations here
    ], [t])
  const { register, handleSubmit, control } = useForm<
    ICar,
    HttpError,
    ICarFilterVariables
  >({
    defaultValues: {
      q: getDefaultFilter("q", filters, "eq"),
      year: getDefaultFilter("year", filters, "eq"),
      make: getDefaultFilter("make", filters, "eq"),
      model: getDefaultFilter("model", filters, "eq") || "",
      color: getDefaultFilter("color", filters, "eq") || "",
      mileage: getDefaultFilter("mileage", filters, "eq") || "",
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={3}>
        <Card sx={{ paddingX: { xs: 2, md: 0 } }}>
          <CardHeader title={t("cars.cars")} />
          <CardContent sx={{ pt: 0 }}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column" }}
              autoComplete="off"
              onSubmit={handleSubmit(search)}
            >
              <TextField
                {...register("q")}
                label={t("cars.filter.search.label")}
                placeholder={t(
                  "cars.filter.search.placeholder",
                )}
                margin="normal"
                fullWidth
                autoFocus
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Controller
                control={control}
                name="color"
                render={({ field }) => (
                  <FormControl margin="normal" size="small">
                    <InputLabel id="gender-select">
                      {t("cars.filter.color.label")}
                    </InputLabel>
                    {/*@ts-ignore */}
                    <Select
                      {...field}
                      labelId="color-select"
                      label={t(
                        "cars.filter.color.label",
                      )}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Make">
                        {t("cars.filter.gender.male")}
                      </MenuItem>
                      <MenuItem value="Female">
                        {t(
                          "users.filter.gender.female",
                        )}
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="mileage"
                render={({ field }) => (
                  <FormControl margin="normal" size="small">
                    <InputLabel id="isActive-select">
                      {t("users.filter.isActive.label")}
                    </InputLabel>
                    {/*@ts-ignore */}
                    <Select
                      {...field}
                      labelId="isActive-select"
                      label={t(
                        "users.filter.isActive.label",
                      )}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="true">
                        {t(
                          "users.filter.isActive.true",
                        )}
                      </MenuItem>
                      <MenuItem value="false">
                        {t(
                          "users.filter.isActive.false",
                        )}
                      </MenuItem>
                    </Select>
                  </FormControl>
                )}
              />

              <br />
              <Button type="submit" variant="contained">
                {t("orders.filter.submit")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={9}>
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
          <DataGrid
            {...dataGridProps}
            columns={columns}
            filterModel={undefined}
            autoHeight
            pageSizeOptions={[10, 20, 50, 100]}
          />
        </List>
      </Grid>
    </Grid>
  );
};
