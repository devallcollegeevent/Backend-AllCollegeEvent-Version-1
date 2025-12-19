const prisma = require("../../config/db.config");
import { hashPassword } from "../../utils/hash";
import { ADMIN_USER_MESSAGES } from "../../constants/admin.user.message";

export default class AdminUserService {
  static async listUsers(page = 1, limit = 20) {
    const take = Number(limit);
    const skip = (Number(page) - 1) * take;

    const [rows, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          identity: true,
          name: true,
          email: true,
          phone: true,
          isActive: true,
          isDeleted: true,
          createdAt: true,
        },
      }),
      prisma.user.count(),
    ]);

    return {
      data: rows,
      meta: {
        total,
        page: Number(page),
        limit: take,
      },
    };
  }

  static async getUserById(userID: string) {
    return prisma.user.findUnique({
      where: { identity: userID },
      select: {
        id: true,
        identity: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        isDeleted: true,
        createdAt: true,
      },
    });
  }

  static async createUser(payload: any) {
    // email uniqueness check
    const found = await prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (found) {
      throw new Error(ADMIN_USER_MESSAGES.EMAIL_ALREADY_IN_USE);
    }

    const role = await prisma.role.findFirst({
      where: { name: "user" },
    });

    if (!role) {
      throw new Error(ADMIN_USER_MESSAGES.INVALID_ROLE_NAME);
    }

    if (!payload.password) {
      throw new Error(ADMIN_USER_MESSAGES.PASSWORD_REQUIRED);
    }

    payload.password = await hashPassword(payload.password);

    return prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        roleId: role.id,
      },
      select: {
        identity: true,
        name: true,
        email: true,
        isActive: true,
        roleId: true,
      },
    });
  }

  static async updateUser(userID: string, payload: any) {
    delete payload.identity;
    delete payload.id;
    delete payload.createdAt;

    if (payload.password) {
      payload.password = await hashPassword(payload.password);
    }

    if (payload.phone) {
      payload.phone = String(payload.phone);
    }

    return prisma.user.update({
      where: { identity: userID },
      data: payload,
      select: {
        identity: true,
        name: true,
        email: true,
        phone: true,
        isActive: true,
        isDeleted: true,
      },
    });
  }

  static async deleteUser(userID: string) {
    return prisma.user.update({
      where: { identity: userID },
      data: { isDeleted: true, isActive: false },
      select: {
        identity: true,
        email: true,
        isDeleted: true,
      },
    });
  }
}
