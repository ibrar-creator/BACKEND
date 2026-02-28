const express = require('express');
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")

const userRouter = express.Router();


/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post("/follow/:username", identifyUser, userController.followUserController)


/** 
 * @route POST /api/users/unfollow/:userid
 * @description Unfollow a user
 * @access Private
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

/**
 * @route POST /api/users/toggle-follow/:username
 * @description Toggle follow/unfollow a user
 * @access Private
 */
userRouter.post("/toggle-follow/:username", identifyUser, userController.toggleFollowController)

/**
 * @route GET /api/users/followed
 * @description Get users followed by current user
 * @access Private
 */
userRouter.get("/followed", identifyUser, userController.getFollowedUsersController)

/**
 * @route GET /api/users/followers
 * @description Get followers of current user
 * @access Private
 */
userRouter.get("/followers", identifyUser, userController.getFollowersController)




module.exports = userRouter;