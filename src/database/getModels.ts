import { prisma } from '../../db';

export interface Model {
  model: string;
  count: number;
}

export const getModels = async (make: string) => {
  const dbModels = await prisma.car.groupBy({
    by: ["model"],
    _count: {
      model: true,
    },
    where: {
      make: {
        equals: make,
      },
    },
  });

  const models = dbModels.map((model) => {
    return {
      model: model.model,
      count: model._count.model,
    };
  });

  return models;
};
