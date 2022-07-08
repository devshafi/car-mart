-- CreateTable
CREATE TABLE "Faq" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Car" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "kilometers" TEXT NOT NULL,
    "fuelType" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "details" TEXT NOT NULL
);
