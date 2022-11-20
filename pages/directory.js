import Layout from '../components/layout/Layout';
import { getSession } from 'next-auth/client';
import { wrapper } from '../redux/store';
import Directory from '../components/Directory';

const Index = () => {
  return (
    <Directory />
  );
};

Index.getLayout = (page) => <Layout title="Alumni">{page}</Layout>;

export default Index;