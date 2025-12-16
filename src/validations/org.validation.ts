import Joi from "joi";

/**
 * Organization-related request validations
 * Used with validate() middleware
 */
export const orgValidation = {
  /**
   * CREATE ORGANIZATION
   * - Used during organization signup / registration
   */
  create: {
    body: Joi.object({
      // Login credentials
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

      // Account type (ex: org)
      type: Joi.string().min(3).required(),

      // Organization details
      org_name: Joi.string().required(),
      org_cat: Joi.string().required(),

      // Location details
      country: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),

      // Optional profile & social links
      profileImage: Joi.string().optional(),
      whatsapp: Joi.string().optional(),
      instagram: Joi.string().optional(),
      linkedIn: Joi.string().optional(),
      logoUrl: Joi.string().optional(),
      website: Joi.string().optional(),
    }),
  },

  /**
   * UPDATE ORGANIZATION
   * - Organization updates profile details
   */
  update: {
    params: Joi.object({
      // Organization UUID
      orgId: Joi.string().uuid().required(),
    }),

    body: Joi.object({
      org_name: Joi.string(),
      org_cat: Joi.string(),
      country: Joi.string(),
      state: Joi.string(),
      city: Joi.string(),

      // Credentials update (optional)
      password: Joi.string(),

      // Profile & social links
      profileImage: Joi.string(),
      whatsapp: Joi.string(),
      instagram: Joi.string(),
      linkedIn: Joi.string(),
      logoUrl: Joi.string(),
      website: Joi.string(),

      // Account status
      isActive: Joi.boolean(),
    }),
  },

  /**
   * GET SINGLE ORGANIZATION
   */
  getSingle: {
    params: Joi.object({
      orgId: Joi.string().uuid().required(),
    }),
  },

  /**
   * DELETE ORGANIZATION
   */
  deleteOrg: {
    params: Joi.object({
      orgId: Joi.string().uuid().required(),
    }),
  },
};
