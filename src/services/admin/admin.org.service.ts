const prisma = require("../../config/db.config");
import { hashPassword } from "../../utils/hash";
import { ADMIN_ORG_MESSAGES } from "../../constants/admin.org.message";

export default class AdminOrgService {

  static async getAllOrgs() {
    // fetch all organizations (admin view)
    return prisma.org.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  static async getOrgById(identity: string) {
    // retrieve a single organization by identity
    return prisma.org.findUnique({
      where: { identity },
    });
  }

  static async createOrg(payload: any) {
    // check if organization already exists
    const exists = await prisma.org.findUnique({
      where: { domainEmail: payload.domainEmail },
    });

    if (exists) {
      throw new Error(ADMIN_ORG_MESSAGES.ORG_ALREADY_EXISTS);
    }

    // encrypt password
    payload.password = await hashPassword(payload.password);

    // create organization
    return prisma.org.create({
      data: {
        domainEmail: payload.domainEmail,
        password: payload.password,
        organizationName: payload.organizationName,
        organizationCategory: payload.organizationCategory,
        country: payload.country,
        state: payload.state,
        city: payload.city,

        // mark admin-created org
        isAdminCreated: true,
      },
    });
  }

  static async updateOrg(identity: string, data: any) {
    return prisma.org.update({
      where: { identity },
      data,
    });
  }

  static async deleteOrg(identity: string) {
    // soft delete
    return prisma.org.update({
      where: { identity },
      data: { isDeleted: true },
    });
  }
}
