import { ParsedUrlQuery } from "querystring";

import { getAsString } from "./../utils/getAsString";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPaginatedCars(query: ParsedUrlQuery) {

  const page = getValueNumber(query.page!) || 1;
  const rowsPerPage = getValueNumber(query.rowsPerPage!) || 4;
  const offset = (page - 1) * rowsPerPage;

  const mainQuery = {
    AND: [
      {
        make: {
          equals: getValueStr(query.make!) || undefined,
        },
      },
      {
        model: {
          equals: getValueStr(query.model!) || undefined,
        },
      },
      {
        price: {
          gte: getValueNumber(query.minPrice!) || undefined,
        },
      },
      {
        price: {
          lte: getValueNumber(query.maxPrice!) || undefined,
        },
      },
    ],
  };

  const dbCars = prisma.car.findMany({
    skip: offset,
    take: rowsPerPage,
    where: mainQuery,
    orderBy: {
      price: "asc"
    },
  });

  const dbCarsCount = prisma.car.count({
    where: mainQuery,
  });


  const [cars, count] = await Promise.all([dbCars, dbCarsCount]);

  const totalPages = count ? Math.ceil(count / rowsPerPage) : 0;

  return { cars, totalPages };
}

function getValueNumber(value: string | string[]) {
  const str = getValueStr(value)!;
  const number = parseInt(str);
  return isNaN(number) ? null : number;
}

function getValueStr(value: string | string[]) {
  const str = getAsString(value);
  return !str || str.toLowerCase() === "all" ? null : str;
}
