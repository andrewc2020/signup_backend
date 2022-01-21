const jwt = require('express-jwt');

import db from '../_helpers/db';

module.exports = authorize;

function authorize(roles : string[] = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles  = [roles];
    }
    const secret = process.env.SECRET
    return [
        // authenticate JWT token and attach user to request object (req.user)
       
        jwt({ secret , algorithms: ['HS256'] }),

        // authorize based on user role
        async (req: any, res: any, next: any) => {
            const account = await db.Account.findById(req.user.id);
            const refreshTokens = await db.RefreshToken.find({ account: account?.id? account.id : undefined  });

            if (!account || (roles.length && !roles.includes(account.role))) {
                // account no longer exists or role not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            req.user.role = account.role;
            req.user.ownsToken = (token: string) => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}