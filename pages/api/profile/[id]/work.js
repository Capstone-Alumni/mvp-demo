import nc from 'next-connect';
import {
  newWorkExperience,
  viewMyWorkExperience,
  deleteWorkExperience,
  editWorkExperience,
} from '../../../../controllers/workController';
import dbConnect from '../../../../config/dbConnect';
import onError from '../../../../middlewares/errors';

const handler = nc({ onError });
dbConnect();
handler.get(viewMyWorkExperience);

export default handler;
