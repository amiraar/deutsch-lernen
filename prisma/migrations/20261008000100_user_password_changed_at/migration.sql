-- AlterTable
-- Records the last password change so JWT sessions minted before it can be rejected.
ALTER TABLE "User" ADD COLUMN     "passwordChangedAt" TIMESTAMP(3);
