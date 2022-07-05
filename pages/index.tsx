import * as React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { getMakes, Make } from "../src/database/getMakes";
import { Field, Form, Formik, useField, useFormikContext } from "formik";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import router, { useRouter } from "next/router";
import { getModels, Model } from "./../src/database/getModels";
import { getAsString } from "./../src/utils/getAsString";
import useSWR from "swr";

interface HomeProps {
  makes: Make[];
  models: Model[];
}
const prices = [500, 1000, 1500, 2500, 5000, 15000, 25000, 50000];

export default function Home({ makes, models }: HomeProps) {
  const { query } = useRouter();
  const initialValues = {
    make: getAsString(query.make!) || "all",
    model: getAsString(query.model!) || "all",
    minPrice: getAsString(query.minPrice!) || "all",
    maxPrice: getAsString(query.maxPrice!) || "all",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: "/",
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Paper
            elevation={5}
            sx={{
              mt: 4,
              p: 2,
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: 500,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="search-make">Make</InputLabel>
                  <Field
                    as={Select}
                    name="make"
                    labelId="search-make"
                    label="Make"
                  >
                    <MenuItem value="all">
                      {" "}
                      <em>All Makes</em>{" "}
                    </MenuItem>
                    {makes.map((make) => (
                      <MenuItem key={make.make} value={make.make}>
                        {`${make.make} (${make.count})`}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <ModelSelect make={values.make} name="model" models={models} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="search-min-price">Min Price</InputLabel>
                  <Field
                    as={Select}
                    name="minPrice"
                    labelId="search-min-price"
                    label="Min Price"
                  >
                    <MenuItem value="all">
                      {" "}
                      <em>No Min</em>{" "}
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="search-max-price">Max Price</InputLabel>
                  <Field
                    as={Select}
                    name="maxPrice"
                    labelId="search-max-price"
                    label="Max Price"
                  >
                    <MenuItem value="all">
                      {" "}
                      <em>No Max</em>{" "}
                    </MenuItem>
                    {prices.map((price) => (
                      <MenuItem key={price} value={price}>
                        {price}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="outlined">
                  Search for Cars
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export interface ModelSelectProps extends SelectProps {
  name: string;
  models: Model[];
  make: string;
}

export function ModelSelect({ models, make, ...props }: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { data } = useSWR<Model[]>("/api/models?make=" + make, {
    onSuccess: (newValues) => {
      if (!newValues.map((a) => a.model).includes(field.value)) {
        setFieldValue("model", "all");
      }
    },
  });
  const newModels = data || models;

  return (
    <FormControl fullWidth>
      <InputLabel id="search-model">Model</InputLabel>
      <Select labelId="search-model" label="Make" {...field} {...props}>
        <MenuItem value="all">
          {" "}
          <em>All Models</em>{" "}
        </MenuItem>
        {newModels.map((model) => (
          <MenuItem key={model.model} value={model.model}>
            {`${model.model} (${model.count})`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make!);
  // const makes = await getMakes();
  // const models = await getModels(make);

  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);

  return { props: { makes, models } };
};
