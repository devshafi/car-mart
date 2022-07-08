import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { GetServerSideProps } from "next";
import { CarModel } from "../../../../src/models/Car";
import Head from "next/head";

import { PrismaClient } from "@prisma/client";
import { getAsString } from './../../../../src/utils/getAsString';
const prisma = new PrismaClient();

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
                  £{car.price}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Year: {car.year}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  KMs: {car.kilometers}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                  Fuel Type: {car.fuelType}
                </Typography>
                <Typography gutterBottom variant="body1" color="text.secondary">
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
  // const db = await openDB();
  // const car = await db.get<CarModel | undefined>(
  //   "SELECT * FROM Car where id = ?",
  //   id
  // );

  const car = await prisma.car.findFirst({
    where: {
      id: {
        equals: getAsString(id!),
      }
    },
  });
  const car = {}

  return { props: { car: car || null } };
};
