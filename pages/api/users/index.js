import nc from 'next-connect';
import { allUser } from '../../../controllers/userController';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser } from '../../../middlewares/auth';

const handler = nc({ onError });
dbConnect();
handler.get(allUser);

export default handler;
