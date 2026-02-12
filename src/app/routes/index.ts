import express, { IRouter } from "express";
import { userRouter } from "../module/user/user.routes";
import { authRouter } from "../module/auth/auth.routes";
import { scheduleRoute } from "../module/schedule/schedule.routes";

const router = express.Router();

interface IModuleRoutes {
  path: string;
  route: IRouter;
}

const moduleRoutes: IModuleRoutes[] = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/schedule",
    route: scheduleRoute,
  },
  // {
  //     path: '/admin',
  //     route: AdminRoutes
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
