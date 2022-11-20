import nc from 'next-connect';
import {
  newWorkExperience,
  viewMyWorkExperience,
  deleteWorkExperience,
  editWorkExperience,
} from '../../../controllers/workController';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';
import { isAuthenticatedUser } from '../../../middlewares/auth';

const handler = nc({ onError });
dbConnect();
handler.use(isAuthenticatedUser).get(viewMyWorkExperience);
handler.use(isAuthenticatedUser).post(newWorkExperience);
handler.use(isAuthenticatedUser).delete(deleteWorkExperience);
handler.use(isAuthenticatedUser).put(editWorkExperience);

export default handler;
