import type { EGender, IUser } from "~/interfaces/db.interface";
import _ from "lodash";
import { SignUpInput } from "~/layout/auth/dtos/signup.dto";
import { SignInInput } from "~/layout/auth/dtos/signin.dto";
import { ITransitMessage } from "~/interfaces/common.interface";

export class User {
  table: "users";
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  dob: string;
  gender: EGender;
  active: boolean;
  created_at: Date;
  constructor(obj: IUser) {
    const data = _.pick(obj, [
      "id",
      "first_name",
      "last_name",
      "email",
      "password",
      "dob",
      "gender",
      "active",
      "created_at",
    ]);
    Object.assign(this, data);
  }
}
