import {
  // APP_ERROR_MESSAGE,
  ApplicationError,
  HTTP_STATUS_CODE,
  prettyObject,
} from "@sabaicode-dev/camformant-libs";
import { NextFunction, Request, Response } from "express";
import * as Sentry from "@sentry/node";

export function globalErrorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Log the error with Sentry
  Sentry.captureException(error);

  // Handle Error
  if (error instanceof ApplicationError) {
    const status = error.status;
    const message = error.message;
    const errors = error.errors;

    console.error(
      `$UserService - globalErrorHandler() method error: `,
      prettyObject(error)
    );
    return res.status(status).json({ message, error: errors });
  }

  // Unhandle Error
  console.error(
    `$UserService - globalErrorHandler() method unexpected error: `,
    prettyObject(error as {})
  );
  res
    .status(HTTP_STATUS_CODE.SERVER_ERROR)
    .json({ message: "APP ERROR.server error" });
  // .json({ message: APP_ERROR_MESSAGE.serverError });
}
