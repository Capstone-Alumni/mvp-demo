import nc from 'next-connect';
import { userProfileById } from '../../../controllers/userController';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';
import { updateUserProfile } from '../../../controllers/authControllers';
import { isAuthenticatedUser } from '../../../middlewares/auth';

const handler = nc({ onError });
dbConnect();
handler.get(userProfileById);
handler.use(isAuthenticatedUser).put(updateUserProfile);

export default handler;
