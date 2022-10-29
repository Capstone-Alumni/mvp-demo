import Layout from '../components/layout/Layout';
import { getSession } from 'next-auth/client';
import { wrapper } from '../redux/store';
import Directory from '../components/Directory';

const Index = () => {
  return (
    <Directory />
  );
};

Index.getLayout = (page) => <Layout title="Account | Easy10">{page}</Layout>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const session = await getSession({ req });

      if (!session) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    }
);

export default Index;