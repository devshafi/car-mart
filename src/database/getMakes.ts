import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export interface Make {
  make: string;
  count: number;
}

export const getMakes = async () => {

  const dbMakes = await prisma.car.groupBy({
    by: ["make"],
    _count: {
      make: true,
    },
  });

  const makes = dbMakes.map((make) => {
    return {
      make: make.make,
      count: make._count.make,
    };
  });
  return makes;
};
