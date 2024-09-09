-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "currentQualifications" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "annualIncome" INTEGER,
    "dob" TEXT NOT NULL,
    "bonafide" TEXT,
    "incomecertificate" TEXT,
    "salaryslip" TEXT,
    "achievements" TEXT[],

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondaryStudentDetails" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "schoolname" TEXT NOT NULL,
    "schoollocation" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "annualScore" TEXT NOT NULL,
    "annualcard" TEXT,
    "grade" INTEGER NOT NULL,

    CONSTRAINT "SecondaryStudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HSCStudentDetails" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "schoolname" TEXT NOT NULL,
    "schoollocation" TEXT NOT NULL,
    "sscgrade" DOUBLE PRECISION NOT NULL,
    "sscmarksheet" TEXT NOT NULL,

    CONSTRAINT "HSCStudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UGCollegeStudentDetails" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "collegename" TEXT NOT NULL,
    "collegelocation" TEXT NOT NULL,
    "sscgrade" DOUBLE PRECISION NOT NULL,
    "sscmarksheet" TEXT NOT NULL,
    "hscgrade" DOUBLE PRECISION NOT NULL,
    "hscmarksheet" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION NOT NULL,
    "styear" INTEGER NOT NULL,
    "endyear" INTEGER NOT NULL,

    CONSTRAINT "UGCollegeStudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PGCollegeStudentDetails" (
    "id" SERIAL NOT NULL,
    "emailId" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "discipline" TEXT NOT NULL,
    "collegename" TEXT NOT NULL,
    "collegelocation" TEXT NOT NULL,
    "ugcgpa" DOUBLE PRECISION NOT NULL,
    "degreecertificate" TEXT NOT NULL,
    "styear" INTEGER NOT NULL,
    "endyear" INTEGER NOT NULL,

    CONSTRAINT "PGCollegeStudentDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "orgname" TEXT NOT NULL,
    "orglocation" TEXT NOT NULL,
    "contactno" TEXT NOT NULL,
    "yearsofservice" INTEGER,
    "certificate" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Scholarship" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "providedby" INTEGER NOT NULL,
    "for" TEXT[],
    "likes" INTEGER NOT NULL,
    "amt" INTEGER NOT NULL,

    CONSTRAINT "Scholarship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- AddForeignKey
ALTER TABLE "SecondaryStudentDetails" ADD CONSTRAINT "SecondaryStudentDetails_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HSCStudentDetails" ADD CONSTRAINT "HSCStudentDetails_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UGCollegeStudentDetails" ADD CONSTRAINT "UGCollegeStudentDetails_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PGCollegeStudentDetails" ADD CONSTRAINT "PGCollegeStudentDetails_emailId_fkey" FOREIGN KEY ("emailId") REFERENCES "Student"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Scholarship" ADD CONSTRAINT "Scholarship_providedby_fkey" FOREIGN KEY ("providedby") REFERENCES "Admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
