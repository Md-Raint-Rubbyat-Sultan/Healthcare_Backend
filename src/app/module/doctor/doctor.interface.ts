import { Gender } from "../../../../prisma/generated/prisma/enums";

export type IDoctorUpdateInput = {
  email: string;
  contactNumber: string;
  gender: Gender;
  appointmentFee: number;
  name: string;
  address: string;
  registrationNumber: string;
  experience: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  specialties: {
    specialtyId: string;
    isDeleted?: boolean;
  }[];
};
