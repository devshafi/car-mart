import { openDB } from "../../pages/openDB";

export interface Model {
  model: string;
  count: number;
}

export const getModels = async (make: string) => {
  const db = await openDB();
  const models = db.all<Model[]>(
    `
    SELECT model, count(*) as count
    FROM Car
    WHERE make = @make
    GROUP BY model
    `,
    { "@make": make }
  );

  return models;
};
