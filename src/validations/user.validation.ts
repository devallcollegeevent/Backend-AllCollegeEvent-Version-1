import Joi from "joi";

/**
 * User-related request validations
 * Used with validate() middleware
 */
export const userValidation = {
  /**
   * CREATE USER
   * - Used for user registration
   */
  create: {
    body: Joi.object({
      // Basic user details
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

      // Optional contact & profile details
      phone: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      profileImage: Joi.string().optional(),
    }),
  },

  /**
   * UPDATE USER
   * - User or admin updates user profile
   * - At least ONE field must be provided
   */
  update: {
    params: Joi.object({
      // User UUID
      userId: Joi.string().uuid().required(),
    }),

    body: Joi.object({
      name: Joi.string().min(3).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string().min(6).optional(),

      phone: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      country: Joi.string().optional(),
      profileImage: Joi.string().optional(),

      // Account status flags
      isActive: Joi.boolean().optional(),
      isDeleted: Joi.boolean().optional(),
    })
      // Require at least ONE field to update
      .min(1),
  },

  /**
   * GET SINGLE USER
   */
  getSingle: {
    params: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  },

  /**
   * DELETE USER
   */
  deleteUser: {
    params: Joi.object({
      userId: Joi.string().uuid().required(),
    }),
  },
};
