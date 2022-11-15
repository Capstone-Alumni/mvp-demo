import { Box, Divider, IconButton, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ProfileInfoRow from './ProfileInfoRow';
import WorkIcon from '@material-ui/icons/Work';
import orange from '@material-ui/core/colors/orange';
import WorkForm from './WorkForm';
import { useDispatch, useSelector } from 'react-redux';
import useAxios from '../../hooks/useAxios';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const mockData = [
  {
    id: 1,
    name: "Công ty phần mềm FPT",
    role: "Lập trình viên FE",
    location: 'HCM',
    time: '2011-2012',
  },
  {
    id: 2,
    name: "Ngấn hàng TPBank",
    role: "Nhân viên bảo mật",
    location: 'HCM',
    time: '2012-2014',
  }
]

const WorkSection = ({ editable }) => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const { fetchData, response: res, error, loading } = useAxios();

  const dispatch = useDispatch();

  const currentProfile = useSelector((state) => {
    return state.loadedUser.currentProfile;
  });

  // const { works: workData } = currentProfile;
  const workData = mockData;

  const onAddWork = async (values) => {
    console.log(values);
    await fetchData({
      method: 'post',
      url: '/api/works',
      body: values,
    });
    if (res) {
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: res.user,
      })
    }
    setOpenAddForm(false);
  }

  const onDeleteWork = (id) => {
    console.log(id);
  }

  const onUpdateWork = (id, values) => {
    console.log(id);
    console.log(values);
    setSelectedEditId(null);
  }

  return (
    <div
      style={{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
        borderRadius: theme.spacing(2),
      }} 
    >
      <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
        <Typography variant="h5" style={{ display: 'flex', fontWeight: 'bold', alignItems: 'center' }}>
          <WorkIcon fontSize="large" style={{ color: orange[900], marginRight: theme.spacing(1) }} />
          Công việc
        </Typography>
        {
          editable
            ? (
              <IconButton aria-label="edit-personla-info" onClick={() => setOpenAddForm(true)}>
                <AddCircleIcon />
              </IconButton>
            )
            : null
        }
      </Box>
      
      {
        openAddForm
          ? (
            <WorkForm onSave={() => onAddWork()} />
          )
          : null
      }

      <Box style={{ paddingLeft: theme.spacing(6) }}>
        {
          workData.map((item, index) => (
            <>
              {
                selectedEditId === item.id
                  ? (
                    <WorkForm defaultValues={item} onSave={(values) => onUpdateWork(item.id, values)} />
                  )
                  : (
                    <Box style={{ display: 'flex' }}>
                      <Box style={{ flex: 1 }}>
                        <ProfileInfoRow title="Nơi công tác/Công ty" content={item.name} />
                        <ProfileInfoRow title="Chức vụ" content={item.role} />
                        <ProfileInfoRow title="Tỉnh/Thành phố" content={item.location} />
                        <ProfileInfoRow title="Thời gian" content={item.time} />
                      </Box>
                      
                      {
                        editable
                          ? (
                            <Box>
                              <IconButton onClick={() => setSelectedEditId(item.id)}><EditIcon /></IconButton>
                              <IconButton onClick={() => onDeleteWork(item.id)}><DeleteIcon color="error" /></IconButton>
                            </Box>
                          )
                          : null
                      }
                    </Box>
                  )
              }

              {
                index + 1 < mockData.length
                  ? <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                  : null
              }
            </>
          ))
        }

      </Box>
    </div>
  );
}

export default WorkSection;
