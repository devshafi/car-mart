import { openDB } from "../../pages/openDB";

export interface Make {
  make: string;
  count: number;
}

export const getMakes = async () => {
  const db = await openDB();
  const makes = db.all<Make[]>(`
    SELECT make, count(*) as count
    FROM Car
    GROUP BY make
    `);

  return makes;
};
