import { LoginErrorResult } from '@wepin/login-js'

export const isLoginError = (res: any): res is LoginErrorResult => {
  return (res as LoginErrorResult).error !== undefined
}
