/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import HttpStatusCodes from "@src/constants/HttpStatusCodes"
import SessionUtil from "@src/util/SessionUtil"
import AuthService from "@src/services/AuthService"

import { IReq, IRes } from "./types/express/misc"

// **** Types **** //

interface ILoginReq {
  email: string
  password: string
}

// **** Functions **** //

/**
 * Login a user.
 */
async function login(req: IReq<ILoginReq>, res: IRes) {
  try {
    const { email, password } = req.body
    // Login
    let user = await AuthService.login(email, password)
     
    if (!user) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).send({ message: "Invalid login credentials." })
    }

    user = user[0]
    // Setup Admin Cookie
    await SessionUtil.addSessionData(res, {
      user_id: user.user_id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
    })

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    res.cookie("userType", user.userType)
    // Return
    return res.status(HttpStatusCodes.OK).json({
      user_id: user.user_id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      userType: user.userType,
      active: user.active,
      hasResetDefaultPassword: user.hasResetDefaultPassword
    })
  } catch (error) {
    console.log(error)
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
  }
}

/**
 * Logout the user.
 */
function logout(_: IReq, res: IRes) {
  SessionUtil.clearCookie(res)
  return res.status(HttpStatusCodes.OK).end()
}

// **** Export default **** //

export default {
  login,
  logout,
} as const
