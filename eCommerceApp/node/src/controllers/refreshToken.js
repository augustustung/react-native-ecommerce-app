import jwt from 'jsonwebtoken';
import 'dotenv/config'
import TokenModel from '../models/token.model';

const _onRefreshToken = async (req, res) => {
    const { userId, token } = req.body;

    if (!token || !userId)
        return res.status(401).json({
            errCode: 1,
            errMessage: "Missing required parameter!"
        });

    const refTokenStore = await TokenModel.findOne({ userId: userId })
    if (!refTokenStore.listToken.includes(token))
        return res.status(401).json({
            errCode: 401,
            errMessage: "Forbidden"
        });

    //else
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
        if (err) {
            return res.status(401).json({
                errCode: 401,
                errMessage: "Forbidden"
            });
        }

        const newAccessToken = jwt.sign(
            { email: decode.email },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30m' }
        );
        return res.status(200).json({
            errCode: 0,
            accessToken: newAccessToken
        })
    })
}

export default _onRefreshToken
