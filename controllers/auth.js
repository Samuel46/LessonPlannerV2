const crypto = require("crypto");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // grab token and send to email
  const confirmEmailToken = user.generateEmailConfirmToken();

  // Create reset url
  const confirmEmailURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/confirmemail?token=${confirmEmailToken}`;

  const myMessage = ` <!DOCTYPE html>
  <html
   
  >
    <head>
      
      <title>Verify Email Address</title>
      <link
      href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
      rel="stylesheet"
      media="screen"
    />
     
      <style>
        .hover-underline:hover {
          text-decoration: underline !important;
        }
  
        @media (max-width: 600px) {
          .sm-w-full {
            width: 100% !important;
          }
  
          .sm-px-24 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
  
          .sm-py-32 {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
  
          .sm-leading-32 {
            line-height: 32px !important;
          }
        }
      </style>
    </head>
  
    <body
      style="
        margin: 0;
        width: 100%;
        padding: 0;
        word-break: break-word;
        -webkit-font-smoothing: antialiased;
        background-color: #eceff1;
      "
    >
      <div
        style="
          font-family: 'Montserrat', sans-serif;
          mso-line-height-rule: exactly;
          display: none;
        "
      >
        Please verify your email address
      </div>
      <div
        role="article"
        aria-roledescription="email"
        aria-label="Verify Email Address"
        lang="en"
        style="
          font-family: 'Montserrat', sans-serif;
          mso-line-height-rule: exactly;
        "
      >
        <table
          style="
            width: 100%;
            font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
          "
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td
              align="center"
              style="
                mso-line-height-rule: exactly;
                background-color: #eceff1;
                font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
              "
            >
              <table
                class="sm-w-full"
                style="width: 600px"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td
                    class="sm-py-32 sm-px-24"
                    style="
                      mso-line-height-rule: exactly;
                      padding: 48px;
                      text-align: center;
                      font-family: Montserrat, -apple-system, 'Segoe UI',
                        sans-serif;
                    "
                  ></td>
                </tr>
                <tr>
                  <td
                    align="center"
                    class="sm-px-24"
                    style="
                      font-family: 'Montserrat', sans-serif;
                      mso-line-height-rule: exactly;
                    "
                  >
                    <table
                      style="width: 100%"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td
                          class="sm-px-24"
                          style="
                            mso-line-height-rule: exactly;
                            border-radius: 4px;
                            background-color: #ffffff;
                            padding: 48px;
                            text-align: left;
                            font-family: Montserrat, -apple-system, 'Segoe UI',
                              sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            color: #626262;
                          "
                        >
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin-bottom: 0;
                              font-size: 20px;
                              font-weight: 600;
                            "
                          >
                            Hey🤗
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin-top: 0;
                              font-size: 24px;
                              font-weight: 700;
                              color: #ff5850;
                            "
                          >
                            ${user.name}!
                          </p>
                          <p
                            class="sm-leading-32"
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 16px;
                              font-size: 24px;
                              font-weight: 600;
                              color: #263238;
                            "
                          >
                            Thanks for signing up! 👋
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 24px;
                            "
                          >
                            Please verify your email address by clicking the below
                            button and join our community, start exploring Lesson
                            Planner.
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 24px;
                            "
                          >
                            If you did not sign up to Lesson Planner, please
                            ignore this email or contact us at
                            <a
                              href="#!"
                              class="hover-underline"
                              style="
                                font-family: 'Montserrat', sans-serif;
                                mso-line-height-rule: exactly;
                                color: #7367f0;
                                text-decoration: none;
                              "
                            >
                            info@Lessonplanner.com
                            </a>
                          </p>
                          <a
                            href="\n\n ${confirmEmailURL}"
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin-bottom: 24px;
                              display: block;
                              font-size: 16px;
                              line-height: 100%;
                              color: #7367f0;
                              text-decoration: none;
                            "
                          >
                          \n\n ${confirmEmailURL}
                          </a>
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="
                                  mso-line-height-rule: exactly;
                                  mso-padding-alt: 16px 24px;
                                  border-radius: 4px;
                                  background-color: #7367f0;
                                  font-family: Montserrat, -apple-system,
                                    'Segoe UI', sans-serif;
                                "
                              >
                                <a
                                  href="\n\n ${confirmEmailURL}"
                                  style="
                                    font-family: 'Montserrat', sans-serif;
                                    mso-line-height-rule: exactly;
                                    display: block;
                                    padding-left: 24px;
                                    padding-right: 24px;
                                    padding-top: 16px;
                                    padding-bottom: 16px;
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: 100%;
                                    color: #ffffff;
                                    text-decoration: none;
                                  "
                                >
                                  Verify Email Now &rarr;
                                </a>
                              </td>
                            </tr>
                          </table>
                          <table
                            style="width: 100%"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="
                                  font-family: 'Montserrat', sans-serif;
                                  mso-line-height-rule: exactly;
                                  padding-top: 32px;
                                  padding-bottom: 32px;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Montserrat', sans-serif;
                                    mso-line-height-rule: exactly;
                                    height: 1px;
                                    background-color: #eceff1;
                                    line-height: 1px;
                                  "
                                >
                                  &zwnj;
                                </div>
                              </td>
                            </tr>
                          </table>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 16px;
                            "
                          >
                            Not sure why you received this email? Please
                            <a
                              href="#!""
                              class="hover-underline"
                              style="
                                font-family: 'Montserrat', sans-serif;
                                mso-line-height-rule: exactly;
                                color: #7367f0;
                                text-decoration: none;
                              "
                            >
                              let us know
                            </a>
                            .
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 16px;
                            "
                          >
                            Thanks,
                            <br />
                            The Lesson Planner Team
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            font-family: 'Montserrat', sans-serif;
                            mso-line-height-rule: exactly;
                            height: 20px;
                          "
                        ></td>
                      </tr>
  
                      <tr>
                        <td
                          style="
                            font-family: 'Montserrat', sans-serif;
                            mso-line-height-rule: exactly;
                            height: 16px;
                          "
                        ></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  
  `;

  user.save({ validateBeforeSave: false });

  const sendResult = await sendEmail({
    email: user.email,
    subject: "Email confirmation token",
    myMessage,
  });

  sendTokenResponse(user, 200, res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Public
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc      Get current logged in user
// @route     GET /api/v1/auth/me
// @access    Private
exports.getMe = asyncHandler(async (req, res, next) => {
  // user is already available in req due to the protect middleware
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  console.log(req.user.id, "samuel");

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: false,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check current password
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("Password is incorrect", 401));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse("There is no user with that email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://localhost:3000/api/v1/auth/resetpassword/${resetToken}`;

  const myMessage = `<!DOCTYPE html>
  <html
    lang="en"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <meta charset="utf-8" />
      <meta name="x-apple-disable-message-reformatting" />
      <meta http-equiv="x-ua-compatible" content="ie=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="format-detection"
        content="telephone=no, date=no, address=no, email=no"
      />
      <!--[if mso]>
        <xml>
          <o:officedocumentsettings>
            <o:pixelsperinch>96</o:pixelsperinch>
          </o:officedocumentsettings>
        </xml>
      <![endif]-->
      <title>Reset your Password</title>
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
        rel="stylesheet"
        media="screen"
      />
      <style>
        .hover-underline:hover {
          text-decoration: underline !important;
        }
        @media (max-width: 600px) {
          .sm-w-full {
            width: 100% !important;
          }
          .sm-px-24 {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .sm-py-32 {
            padding-top: 32px !important;
            padding-bottom: 32px !important;
          }
        }
      </style>
    </head>
    <body
      style="
        margin: 0;
        width: 100%;
        padding: 0;
        word-break: break-word;
        -webkit-font-smoothing: antialiased;
        background-color: #eceff1;
      "
    >
      <div
        style="
          font-family: 'Montserrat', sans-serif;
          mso-line-height-rule: exactly;
          display: none;
        "
      >
        A request to reset password was received from your Lesson Planner Account
      </div>
      <div
        role="article"
        aria-roledescription="email"
        aria-label="Reset your Password"
        lang="en"
        style="
          font-family: 'Montserrat', sans-serif;
          mso-line-height-rule: exactly;
        "
      >
        <table
          style="
            width: 100%;
            font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
          "
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td
              align="center"
              style="
                mso-line-height-rule: exactly;
                background-color: #eceff1;
                font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;
              "
            >
              <table
                class="sm-w-full"
                style="width: 600px"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td
                    class="sm-py-32 sm-px-24"
                    style="
                      mso-line-height-rule: exactly;
                      padding: 48px;
                      text-align: center;
                      font-family: Montserrat, -apple-system, 'Segoe UI',
                        sans-serif;
                    "
                  ></td>
                </tr>
                <tr>
                  <td
                    align="center"
                    class="sm-px-24"
                    style="
                      font-family: 'Montserrat', sans-serif;
                      mso-line-height-rule: exactly;
                    "
                  >
                    <table
                      style="width: 100%"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td
                          class="sm-px-24"
                          style="
                            mso-line-height-rule: exactly;
                            border-radius: 4px;
                            background-color: #ffffff;
                            padding: 48px;
                            text-align: left;
                            font-family: Montserrat, -apple-system, 'Segoe UI',
                              sans-serif;
                            font-size: 16px;
                            line-height: 24px;
                            color: #626262;
                          "
                        >
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin-bottom: 0;
                              font-size: 20px;
                              font-weight: 600;
                            "
                          >
                            Hey👋
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin-top: 0;
                              font-size: 24px;
                              font-weight: 700;
                              color: #ff5850;
                            "
                          >
                           ${user.name}!
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 24px;
                            "
                          >
                            A request to reset password was received from your
                            <span style="font-weight: 600">Lesson Planner</span>
                            Account -
                            <a
                              href="${user.email}"
                              class="hover-underline"
                              style="
                                font-family: 'Montserrat', sans-serif;
                                mso-line-height-rule: exactly;
                                color: #7367f0;
                                text-decoration: none;
                              "
                            >
                              ${user.email}
                            </a>
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 24px;
                            "
                          >
                            Use this link to reset your password and login.
                          </p>
                          <a
                            href="\n\n ${resetUrl}"
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin-bottom: 24px;
                              display: block;
                              font-size: 16px;
                              line-height: 100%;
                              color: #7367f0;
                              text-decoration: none;
                            "
                          >
                          \n\n ${resetUrl}
                          </a>
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="
                                  mso-line-height-rule: exactly;
                                  mso-padding-alt: 16px 24px;
                                  border-radius: 4px;
                                  background-color: #7367f0;
                                  font-family: Montserrat, -apple-system,
                                    'Segoe UI', sans-serif;
                                "
                              >
                                <a
                                  href="\n\n ${resetUrl}"
                                  style="
                                    font-family: 'Montserrat', sans-serif;
                                    mso-line-height-rule: exactly;
                                    display: block;
                                    padding-left: 24px;
                                    padding-right: 24px;
                                    padding-top: 16px;
                                    padding-bottom: 16px;
                                    font-size: 16px;
                                    font-weight: 600;
                                    line-height: 100%;
                                    color: #ffffff;
                                    text-decoration: none;
                                  "
                                >
                                  Reset Password &rarr;
                                </a>
                              </td>
                            </tr>
                          </table>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-top: 24px;
                              margin-bottom: 24px;
                            "
                          >
                            <span style="font-weight: 600">Note:</span>
                            This link is valid for 1 hour from the time it was
                            sent to you and can be used to change your password
                            only once.
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                            "
                          >
                            If you did not intend to deactivate your account or
                            need our help keeping the account, please contact us
                            at
                            <a
                              href="#!"
                              class="hover-underline"
                              style="
                                font-family: 'Montserrat', sans-serif;
                                mso-line-height-rule: exactly;
                                color: #7367f0;
                                text-decoration: none;
                              "
                            >
                              info@lessonpalnner.com
                            </a>
                          </p>
                          <table
                            style="width: 100%"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                          >
                            <tr>
                              <td
                                style="
                                  font-family: 'Montserrat', sans-serif;
                                  mso-line-height-rule: exactly;
                                  padding-top: 32px;
                                  padding-bottom: 32px;
                                "
                              >
                                <div
                                  style="
                                    font-family: 'Montserrat', sans-serif;
                                    mso-line-height-rule: exactly;
                                    height: 1px;
                                    background-color: #eceff1;
                                    line-height: 1px;
                                  "
                                >
                                  &zwnj;
                                </div>
                              </td>
                            </tr>
                          </table>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 16px;
                            "
                          >
                            Not sure why you received this email? Please
                            <a
                              href="#!"
                              class="hover-underline"
                              style="
                                font-family: 'Montserrat', sans-serif;
                                mso-line-height-rule: exactly;
                                color: #7367f0;
                                text-decoration: none;
                              "
                            >
                              let us know
                            </a>
                            .
                          </p>
                          <p
                            style="
                              font-family: 'Montserrat', sans-serif;
                              mso-line-height-rule: exactly;
                              margin: 0;
                              margin-bottom: 16px;
                            "
                          >
                            Thanks,
                            <br />
                            The Lesson Planner Team
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            font-family: 'Montserrat', sans-serif;
                            mso-line-height-rule: exactly;
                            height: 20px;
                          "
                        ></td>
                      </tr>
  
                      <tr>
                        <td
                          style="
                            font-family: 'Montserrat', sans-serif;
                            mso-line-height-rule: exactly;
                            height: 16px;
                          "
                        ></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      myMessage,
    });

    res.status(200).json({
      success: true,
      data: `Account activation link sent to  ${user.email}. Please follow the link inside to continue.`,
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("Invalid token", 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    Confirm Email
 * @route   GET /api/v1/auth/confirmemail
 * @access  Public
 */
exports.confirmEmail = asyncHandler(async (req, res, next) => {
  // grab token from email
  const { token } = req.query;

  if (!token) {
    res.redirect(`${req.protocol}://localhost:3000/emailerror`);
    return next(new ErrorResponse("Invalid Token", 400));
  }

  const splitToken = token.split(".")[0];
  const confirmEmailToken = crypto
    .createHash("sha256")
    .update(splitToken)
    .digest("hex");

  // get user by token
  const user = await User.findOne({
    confirmEmailToken,
    isEmailConfirmed: false,
  });

  if (!user) {
    res.redirect(`${req.protocol}://localhost:3000/emailerror`);
    return next(new ErrorResponse("Invalid Token", 400));
  }

  // update confirmed to true
  user.confirmEmailToken = undefined;
  user.isEmailConfirmed = true;

  // save
  user.save({ validateBeforeSave: false });
  res.redirect(`${req.protocol}://localhost:3000/confirmemail`);
  // return token
  sendTokenResponse(user, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};
