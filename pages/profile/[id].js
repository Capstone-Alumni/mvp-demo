import Layout from '../../components/layout/Layout';
import { getSession } from 'next-auth/client';
import { wrapper } from '../../redux/store';
import Profile from '../../components/Profile';
import { loadUserProfile } from '../../redux/actions/userActions';

const Index = () => {
  return (
    <Profile />
  );
};

Index.getLayout = (page) => <Layout title="Profile">{page}</Layout>;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const { id } = params;

      await store.dispatch(loadUserProfile(req, id));
    }
);

export default Index;
