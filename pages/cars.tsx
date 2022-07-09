import Grid from "@mui/material/Grid";
import Search from "./index";
import { GetServerSideProps } from "next";
import { getAsString } from "./../src/utils/getAsString";
import { getMakes } from "../src/database/getMakes";
import { getModels } from "../src/database/getModels";
import { Make } from "./../src/database/getMakes";
import { Model } from "./../src/database/getModels";
import { CarModel, CarsData } from "./../src/models/Car";
import { getPaginatedCars } from "../src/database/getPaginatedCars";
import { stringify } from "querystring";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { isEqual } from "lodash";
import CarPagination from "./../src/components/CarPagination";
import CarCard from "../src/components/CarCard";

export interface CarsListProps {
  makes: Make[];
  models: Model[];
  cars: CarModel[];
  totalPages: number;
}

export default function CarsList({
  makes,
  models,
  cars,
  totalPages,
}: CarsListProps) {
  const { query } = useRouter();
  const [serverQuery] = useState(query);

  const { data } = useSWR<CarsData>("/api/cars?" + stringify(query), {
    fallbackData: isEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined,
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Search singleColumn makes={makes} models={models} />
      </Grid>

      {!data && "loading..."}
      {data && (
        <Grid item xs={12} sm={7} md={8} lg={9}>
          <Grid container spacing={2}>
            {data?.cars.map((car) => (
              <Grid key={car.id} item xs={12} sm={6} md={4}>
                <CarCard car={car} />
              </Grid>
            ))}
          </Grid>
          <Grid container sx={{ my: 2, justifyContent: "center" }}>
            <CarPagination totalPages={data?.totalPages!} />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make!);

  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(ctx.query),
  ]);

  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages,
    },
  };
};
