const fromAdaptReq = require("../utils/adapt-req");
const translate = require("../i18n/msg");
const crypto = require("../lib/crypto").crypto;
const DataValidator = require("../services").Services.DataValidator;
const CreateError = require("../error/dp-error").CreateError;
const logger = require("../utils/logger").logger;
const db = require("../lib/database").database;
const fromStore = require("../lib/store").store;
const fromEntities = require("../entity");
const fromUseCase = require("../use-cases/auth").authUseCases;
const fromToken = require("../lib/token");
const mailer = require("../lib/mailer").mailer;
const ac = require("../roles");
const notification = require("../services/index").Services.Notification;
const APP_CONFIG = require("../config/app.config.json");

const cookieName = APP_CONFIG.refreshToken.cookie.name;
const cookieConfig = {
  maxAge: parseInt(APP_CONFIG.refreshToken.cookie.config.maxAge),
  httpOnly: APP_CONFIG.refreshToken.cookie.config.httpOnly,
  secure: APP_CONFIG.refreshToken.cookie.config.secure,
  sameSite: APP_CONFIG.refreshToken.cookie.config.sameSite,
};

exports.postSignup = async (req, res, next) => {
  try {
    const request = fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .Signup({
        CreateError,
        DataValidator,
        logger,
        translate,
        crypto,
        request,
        db,
        store: fromStore,
        token: fromToken.token,
        mailer,
      })
      .execute();

    if (result.data.refresh_token !== undefined) {
      res.cookie(cookieName, result.data.refresh_token, cookieConfig);
    }

    return res.status(200).json({
      msg: result.msg,
      data: { ...result.data },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const request = fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .Login({
        CreateError,
        DataValidator,
        logger,
        translate,
        crypto,
        store: fromStore,
        db,
        request,
        token: fromToken.token,
      })
      .execute();

    if (result.data.refresh_token !== undefined) {
      res.cookie(cookieName, result.data.refresh_token, cookieConfig);
    }

    const responseData = {
      user: result.data.user,
      token: result.data.token,
      refresh_token: result.data.refresh_token,
    };
    if (result.data.devices) {
      responseData.devices = result.data.devices;
    }
    return res.status(200).json({
      msg: result.msg,
      data: {
        ...responseData,
      },
    });
  } catch (error) {
    // console.log(error)
    next(error);
  }
};

exports.postlogout = async (req, res, next) => {
  try {
    const request = fromAdaptReq.adaptReq(req, res);
    const result = await fromUseCase
      .Logout({
        CreateError,
        logger,
        translate,
        request,
        store: fromStore,
        db,
      })
      .execute();
    res.clearCookie(cookieName);
    return res.status(200).json({
      msg: result.msg,
      data: {},
    });
  } catch (error) {
    // console.log(error)
    next(error);
  }
};

exports.postGenerateBearerToken = async (req, res, next) => {
  try {
    const request = fromAdaptReq.adaptReq(req, res);
    const result = await fromUseCase
      .GenBearerToken({
        CreateError,
        logger,
        translate,
        request,
        token: fromToken.token,
      })
      .execute();
    return res.status(200).json({
      msg: result.msg,
      data: { token: result.data.token },
    });
  } catch (error) {
    // console.log(error)
    next(error);
  }
};

exports.sendOtp = async (req, res, next) => {
  try {
    const request = await fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .SendOtp({
        CreateError,
        DataValidator,
        logger,
        translate,
        request,
        store: fromStore,
        db,
        crypto,
        mailer,
      })
      .execute();

    return res.status(200).json({
      msg: result.msg,
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postPasswordReset = async (req, res, next) => {
  try {
    const request = await fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .PasswordReset({
        CreateError,
        DataValidator,
        logger,
        translate,
        request,
        store: fromStore,
        db,
        crypto,
        mailer,
      })
      .execute();

    return res.status(200).json({
      msg: result.msg,
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.postPasswordChange = async (req, res, next) => {
  try {
    const request = await fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .PasswordChange({
        CreateError,
        DataValidator,
        logger,
        translate,
        request,
        store: fromStore,
        db,
        crypto,
        mailer,
      })
      .execute();

    return res.status(200).json({
      msg: result.msg,
      data: {},
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.firstLogin = async (req, res, next) => {
  try {
    const request = await fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .FirstLogin({
        CreateError,
        DataValidator,
        logger,
        translate,
        request,
        db,
        ac,
      })
      .execute();

    if (result?.data?.not_found) {
      return res.status(404).json({
        msg: translate(request.locals.lang, "user_not_found"),
        data: {},
      });
    }

    return res.status(200).json({
      msg: result.msg,
      data: { ...result.data },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const request = await fromAdaptReq.adaptReq(req, res);

    const result = await fromUseCase
      .DeleteUser({
        CreateError,
        logger,
        translate,
        request,
        db,
        ac,
      })
      .execute();

    if (result?.data?.not_found) {
      return res.status(404).json({
        msg: translate(request.locals.lang, "user_not_found"),
        data: {},
      });
    }

    return res.status(200).json({
      msg: result.msg,
      data: { ...result.data },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
