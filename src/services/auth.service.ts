const prisma = require("../config/db.config");
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export class AuthService {
  static async signup(
    name: string,
    email: string,
    password: string,
    type: "user" | "org",
    extra: any
  ) {
    const role = await prisma.role.findFirst({
      where: { name: type },
    });

    if (!role) throw new Error("Role not found in database");

    const existsUser = await prisma.user.findUnique({ where: { email } });
    const existsOrg = await prisma.org.findUnique({
      where: { domEmail: email },
    });

    if (existsUser || existsOrg) throw new Error("Email already registered");

    const hashed = await hashPassword(password);

    if (type === "user") {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          pwd: hashed,
          roleId: role.id,
        },
      });

      return user;
    }

    if (type === "org") {
      const org = await prisma.org.create({
        data: {
          name,
          domEmail: email,
          pwd: hashed,
          roleId: role.id,
          org_name: extra.org_name,
          org_cat: extra.org_cat,
          country: extra.country,
          state: extra.state,
          city: extra.city,
          pImg: extra.pImg ?? null,
        },
      });

      return org;
    }

    throw new Error("Invalid type");
  }

  static async login(email: string, password: string, type: "user" | "org") {
    let user;

    if (type === "user") {
      user = await prisma.user.findUnique({ where: { email } });
    } else if (type === "org") {
      user = await prisma.org.findUnique({ where: { domEmail: email } });
    }

    if (!user) throw new Error("Account not found");

    const ok = await comparePassword(password, user.pwd);
    if (!ok) throw new Error("Invalid password");

    let roleUUID = null;

    if (user.roleId) {
      const role = await prisma.role.findUnique({
        where: { id: user.roleId },
        select: { idnty: true },
      });
      roleUUID = role?.idnty || null;
    }

    const userResponse = {
      ...user,
      roleId: roleUUID, 
    };

    const token = generateToken({
      id: user.id,
      idnty: user.idnty,
      email: email,
      roleId: roleUUID,
      type: type,
    });

    return { user: userResponse, token };
  }
}
