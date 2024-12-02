const nodemailer =  require('nodemailer')

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "mudassirmushtaq012@gmail.com",
      pass: "lqrw coww twhm ixfq",
    },
  });

  const ForgetLink = async (data,token) => {
    try {
        const response = await transporter.sendMail({
            from: 'mudassirmushtaq012@gmail.com',
            to: data.email, // list of receivers
            subject: "Forget Password", // Subject line
            text: "According too website"
            // text: `https://mern-expense-management-system.vercel.app/forget-password/${data._id}/${token}`, // According to Website Link
            // ...data
        })

        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    ForgetLink
}
