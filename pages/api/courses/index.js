import nc from 'next-connect';
import { newCourse, allCourses } from '../../../controllers/courseControllers';
import dbConnect from '../../../config/dbConnect';
import onError from '../../../middlewares/errors';

const handler = nc({ onError });
dbConnect();
handler.post(newCourse);
handler.get(allCourses);

export default handler;
