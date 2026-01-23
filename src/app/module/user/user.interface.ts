export type ICreatePatient = {
  password: string;
  patinet: {
    email: string;
    name: string;
  };
  file: Express.Multer.File;
};
