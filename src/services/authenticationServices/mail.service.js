const nodemailer =  require('nodemailer')

const transporter = nodemailer.createTransport({
    service : 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mudassirmushtaq012@gmail.com",
      pass: "lqrw coww twhm ixfq"  // Change it Always According to Project
    //   pass: "lqrw coww twhm ixfq", Make new project and pass his key this is the ems key
    },
  });

  const sendEmail = async (data) => {
    try {
        const response = await transporter.sendMail({
            from: 'mudassirmushtaq012@gmail.com',
            ...data
        })

        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    sendEmail
}
