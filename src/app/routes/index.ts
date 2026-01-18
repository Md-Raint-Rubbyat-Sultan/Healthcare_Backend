import express, { Application } from "express";

const router = express.Router();

interface IModuleRoutes {
  path: string;
  route: Application;
}

const moduleRoutes: IModuleRoutes[] = [
  // {
  //     path: '/user',
  //     route: userRoutes
  // },
  // {
  //     path: '/admin',
  //     route: AdminRoutes
  // },
  // {
  //     path: '/auth',
  //     route: AuthRoutes
  // },
  // {
  //     path: '/specialties',
  //     route: SpecialtiesRoutes
  // },
  // {
  //     path: '/doctor',
  //     route: DoctorRoutes
  // },
  // {
  //     path: '/patient',
  //     route: PatientRoutes
  // },
  // {
  //     path: '/schedule',
  //     route: ScheduleRoutes
  // },
  // {
  //     path: '/doctor-schedule',
  //     route: DoctorScheduleRoutes
  // },
  // {
  //     path: '/appointment',
  //     route: AppointmentRoutes
  // },
  // {
  //     path: '/payment',
  //     route: PaymentRoutes
  // },
  // {
  //     path: '/prescription',
  //     route: PrescriptionRoutes
  // },
  // {
  //     path: '/review',
  //     route: ReviewRoutes
  // },
  // {
  //     path: '/meta',
  //     route: MetaRoutes
  // }
];

moduleRoutes.forEach(({ path, route }) => router.use(path, route));

export default router;
