import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, List, NumberField, useDataGrid } from "@refinedev/mui";
import React from "react";

import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {
    HttpError,
    IResourceComponentsProps,
    useShow,
    useTranslate,
} from "@refinedev/core";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import { CustomTooltip } from "components";

import {ICar, IOrder, IOrderFilterVariables } from "interfaces";
const CarInfoText: React.FC<{ children: React.ReactNode }> = ({
                                                                   children,
                                                               }) => (
  <Stack
    direction="row"
    alignItems="center"
    justifyContent={{
        sm: "center",
        lg: "flex-start",
    }}
    gap={1}
  >
      {children}
  </Stack>
);
export const CarsShow: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { queryResult } = useShow<ICar>();
    const car = queryResult.data?.data;

    const { dataGridProps } = useDataGrid<
      IOrder,
      HttpError,
      IOrderFilterVariables
    >({
        resource: "cars",
        initialSorter: [
            {
                field: "created_at",
                order: "desc",
            },
        ],
        permanentFilter: [
            {
                field: "user.id",
                operator: "eq",
                value: car?.id,
            },
        ],
        initialPageSize: 4,
        queryOptions: {
            enabled: car !== undefined,
        },
        syncWithLocation: false,
    });

    const columns = React.useMemo<GridColDef<ICar>[]>(
      () => [
          {
              field: "mileage",
              align: "right",
              headerAlign: "right",
              headerName: t("cars.fields.mileage"),
              renderCell: function render({ row }) {
                console.log('Row data:', row)
                  return (
                    <NumberField
                      options={{
                        notation: "compact",
                      }}
                      value={row.mileage}
                    />
                  );
              },
              width: 100,
          },
          {
              field: "reservations",
              headerName: t("cars.fields.reservations"),

            flex: 1,
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: function render({ row }) {
              return row?.reservations?.length ? (
                <CustomTooltip
                  arrow
                  placement="top"
                  title={
                    <Stack sx={{ padding: "2px" }}>
                      {row.verifications?.map((verification) => (
                        <li key={verification.id}>{verification.verification_id}</li>
                      ))}
                    </Stack>
                  }
                >
                  <Typography sx={{ fontSize: "14px" }}>
                    {t("reservations.fields.itemsCount", {
                      total: row.verifications.length,
                    })}
                  </Typography>
                </CustomTooltip>
              ): (
                <Typography sx={{ fontSize: "14px" }}>
                  {t("reservations.fields.itemsCount", {
                    amount: 0,
                  })}
                </Typography>
              )
            },
          },
          {
              field: "first_name",
              headerName: t("cars.fields.owner"),
              valueGetter: ({ row }) => row?.owner?.first_name,
              sortable: false,
              width: 100
          },

          {
              field: "verifications",
              headerName: t("cars.fields.verifications"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              sortable: false,
              renderCell: function render({ row }) {
                  return row?.verifications?.length ? (
                    <CustomTooltip
                      arrow
                      placement="top"
                      title={
                          <Stack sx={{ padding: "2px" }}>
                              {row.verifications?.map((verification) => (
                                <li key={verification.id}>{verification.verification_id}</li>
                              ))}
                          </Stack>
                      }
                    >
                      <Typography sx={{ fontSize: "14px" }}>
                        {t("verifications.fields.itemsCount", {
                          total: row.verifications.length,
                        })}
                      </Typography>
                    </CustomTooltip>
                  ): (
                    <Typography sx={{ fontSize: "14px" }}>
                      {t("verifications.fields.itemsCount", {
                        amount: 0,
                      })}
                    </Typography>
                  )
              },
          },
          {
              field: "reviews",
              headerName: t("cars.fields.reviews"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              sortable: false,
              renderCell: function render({ row }) {
                  return row?.reviews?.length ? (
                    <CustomTooltip
                      arrow
                      placement="top"
                      title={
                          <Stack sx={{ padding: "2px" }}>
                              {row.reviews.map((review) => (
                                <li key={review.id}>{review.review_id}</li>
                              ))}
                          </Stack>
                      }
                    >
                        <Typography sx={{ fontSize: "14px" }}>
                            {t("reviews.fields.itemsCount", {
                                amount: row.reviews.length,
                            })}
                        </Typography>
                    </CustomTooltip>
                  ): (
                    <Typography sx={{ fontSize: "14px" }}>
                      {t("reviews.fields.itemsCount", {
                        amount: 0,
                      })}
                    </Typography>
                  )
              },
          },
        {
          field: "features",
          headerName: t("cars.fields.features"),
          flex: 1,
          headerAlign: "center",
          align: "center",
          sortable: false,
          renderCell: function render({ row }) {
            return  row?.features?.length ? (
              <CustomTooltip
                arrow
                placement="top"
                title={
                  <Stack sx={{ padding: "2px" }}>
                    {row.features.map((feature) => (
                      <li key={feature.id}>{feature.name}</li>
                    ))}
                  </Stack>
                }
              >
                <Typography sx={{ fontSize: "14px" }}>
                  {t("features.fields.itemsCount", {
                    amount: row.features.length,
                  })}
                </Typography>
              </CustomTooltip>
            ) : (
              <Typography sx={{ fontSize: "14px" }}>
                {t("features.fields.itemsCount", {
                  amount: 0,
                })}
              </Typography>
            )
          },
        },
          {
              field: "created_at",
              headerName: t("cars.fields.created_at"),
              flex: 1,
              renderCell: function render({ row }) {
                  return (
                    <DateField
                      value={row.created_at}
                      format="LLL"
                      sx={{ whiteSpace: "pre-wrap", fontSize: "14px" }}
                    />
                  );
              },
          },
      ],
      [t],
    );

    return (
      <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
              <Paper sx={{ p: 2, paddingX: { xs: 4, md: 2 } }}>
                  <Stack alignItems="center" spacing={1}>
                      <Avatar
                        src={car?.owner?.avatar}
                        sx={{ width: 120, height: 120 }}
                      />
                      <Typography variant="h6">
                          {car?.make} {car?.model}
                      </Typography>
                  </Stack>
                  <br />
                  <Stack spacing={1}>
                      <CarInfoText>
                          <LocalPhoneOutlinedIcon />
                          <Typography variant="body1">{car?.owner?.phone_number}</Typography>
                      </CarInfoText>
                      <CarInfoText>
                          <DateRangeOutlinedIcon />
                          <Typography variant="body1">
                              {car?.year}
                          </Typography>
                      </CarInfoText>
                      <CarInfoText>
                          <CheckOutlinedIcon />
                          <Typography variant="body1">
                              {car?.id
                                ? t("users.fields.isActive.true")
                                : t("users.fields.isActive.false")}
                          </Typography>
                      </CarInfoText>
                  </Stack>
              </Paper>
          </Grid>
          <Grid item xs={12} lg={9}>
              <Stack direction="column" spacing={2}>
                  <List
                    headerProps={{ title: t("orders.orders") }}
                    wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}
                  >
                      <DataGrid
                        {...dataGridProps}
                        columns={columns}
                        autoHeight
                        pageSizeOptions={[4, 10, 20, 100]}
                      />
                  </List>
              </Stack>
          </Grid>
      </Grid>
    );
};
