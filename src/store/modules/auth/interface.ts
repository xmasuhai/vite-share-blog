export default interface AuthModuleTypes {
  user: string | null,
  isLogin: boolean
}

export type logString = {
  username: string,
  password: string
}

export type authState = Partial<AuthModuleTypes>
