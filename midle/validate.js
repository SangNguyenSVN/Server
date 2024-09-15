


const validationRegister = async (req, res, next) => {
    const { email, pass, name } = req.body;
    try {
        if (!email || !pass || !name) {
            return res.status(400).json({
                result: false,
                message: 'Vui long nhap du thong tin'
            });
        } else {

            let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            if (!regex.test(email)) {
                return res.status(400).json({ result: false,
                     message: 'Email ko hop le' });
            }
            regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if (!regex.test(pass)) {
                return res.status(400).json({ result: false,
                     message: 'mat khau phai it nhat 8 ky tu' });
            }
            return next();
        }
    } catch (error) {
        console.log("err vali: ", error);
    }

}



module.exports = { validationRegister };
