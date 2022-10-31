import nc from 'next-connect';
import { userProfileById } from '../../../controllers/userController';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });
dbConnect();
handler.get(userProfileById);

export default handler;
