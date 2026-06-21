/*
  Warnings:

  - Changed the type of `type` on the `Coupon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `updatedAt` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('PERCENTAGE', 'FIXED');

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "isDefault" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "usageCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "usageLimit" INTEGER,
DROP COLUMN "type",
ADD COLUMN     "type" "CouponType" NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingComplement" TEXT,
ADD COLUMN     "shippingDistrict" TEXT,
ADD COLUMN     "shippingNumber" TEXT,
ADD COLUMN     "shippingState" TEXT,
ADD COLUMN     "shippingStreet" TEXT,
ADD COLUMN     "shippingZipcode" TEXT;

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Order_userId_idx" ON "Order"("userId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "ProductVariant_productId_idx" ON "ProductVariant"("productId");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");
