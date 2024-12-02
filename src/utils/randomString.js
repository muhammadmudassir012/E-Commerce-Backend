const generateOtp = () => {
    return Math.floor(1000 + Math.random()*999999).toString()
}

module.exports = {
    generateOtp
}