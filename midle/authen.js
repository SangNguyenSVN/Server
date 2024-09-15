const jwt = require('jsonwebtoken');



const checkTokenCpanel = (req,res,next)=>{
    const {session} = req;
    const url = req.originalUrl.toLowerCase();//take Url
    

    if(!session){
        // kiem tra session
        // quay ve trang login
        if(url.includes('/login')){
            return next();
        }else{
            return res.redirect('/login');
        }
    }else{
        const {token} = session;
        if(!token){
            // kiem tra tooken
            // quay ve login
            if(url.includes('/login')){
                return next();
            }else{
                return res.redirect('/login');
            }
        }else{
            jwt.verify(token, ' secret', (err, decoded)=>{
                // token het han
                // quay ve login
                if(err){
                    if(url.includes('/login')){
                        return next();
                    }else{
                        return res.redirect('/login');
                    }
                }else{
                    if(url.includes('/login')){
                        // quay ve trang chu
                        return res.redirect('/');
                    }else{
                        return next();
                    }
                }
            });
        }
    }
}


const checkTokenApp = (req,res,next) =>{
    let token = null;
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] == 'Bearer')
        token = req.headers.authorization.split(' ')[1];

    if (token) {
        jwt.verify(token, 'secret', function (error, decoded) {
            if (error) {
                return res.status(401).json({ status: false })
            } else {
                return next();
            }
        })
    } else {
        return res.status(401).json({ status: false })
    }
}
module.exports = {checkTokenApp, checkTokenCpanel};