export default {
  databaseUrl: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT) || 3000,
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
    newUser: process.env.TEMPLATE_ID_NEW_USER,
    forgotPwd: process.env.TEMPLATE_ID_FORGOT_PWD,
  },
}
