-- CreateTable
CREATE TABLE "ScholarshipApplied" (
    "id" SERIAL NOT NULL,
    "scholarshipid" INTEGER NOT NULL,
    "studentid" INTEGER NOT NULL,

    CONSTRAINT "ScholarshipApplied_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScholarshipApplied" ADD CONSTRAINT "ScholarshipApplied_scholarshipid_fkey" FOREIGN KEY ("scholarshipid") REFERENCES "Scholarship"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipApplied" ADD CONSTRAINT "ScholarshipApplied_studentid_fkey" FOREIGN KEY ("studentid") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
