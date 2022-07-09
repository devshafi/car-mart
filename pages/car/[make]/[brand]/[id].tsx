import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GetServerSideProps } from "next";
import { CarModel } from "../../../../src/models/Car";
import Head from "next/head";
import { getAsString } from "./../../../../src/utils/getAsString";
import { prisma } from "../../../../db";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpeedIcon from "@mui/icons-material/Speed";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";

interface CarDetailsProps {
  car: CarModel | null | undefined;
}

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function CardDetails({ car }: CarDetailsProps) {
  if (!car) return <h1>Sorry, Car not found</h1>;

  return (
    <>
      <Head>
        <title>{car.make + " " + car.model}</title>
      </Head>
      <Paper
        sx={{
          p: 1,
          margin: "auto",
          maxWidth: "100%",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={5}>
            <Img alt={car.model} src={car.photoUrl} />
          </Grid>
          <Grid item xs={12} sm={6} md={7} container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5" component="div">
                  {car.make + " " + car.model}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  ${car.price}
                </Typography>
                <Grid sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <CalendarMonthIcon fontSize="small" color="secondary" />
                  <Typography
                    sx={{ ml: 1 }}
                    variant="body2"
                  >
                    Year: {car.year}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <SpeedIcon fontSize="small" color="secondary" />
                  <Typography
                    sx={{ ml: 1 }}
                    variant="body2"
                  >
                    KMs: {car.kilometers}
                  </Typography>
                </Grid>
                <Grid sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocalGasStationIcon fontSize="small" color="secondary" />
                  <Typography
                    sx={{ ml: 1 }}
                    variant="body2"   
                  >
                    Fuel Type: {car.fuelType}
                  </Typography>
                </Grid>
                <Typography gutterBottom variant="body2">
                  Details Type: {car.details}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id;
  const car = await prisma.car.findFirst({
    where: {
      id: {
        equals: getAsString(id!),
      },
    },
  });

  return { props: { car: car || null } };
};
