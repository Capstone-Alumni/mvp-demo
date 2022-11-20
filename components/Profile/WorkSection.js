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
import { useEffect } from 'react';
import { LOAD_PROFILE_SUCCESS } from '../../redux/constants/userConstants';

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

const WorkSection = ({ editable, uid }) => {
  const theme = useTheme();

  const [openAddForm, setOpenAddForm] = useState(false);
  const [selectedEditId, setSelectedEditId] = useState(null);

  const { fetchData, response: res, error, loading } = useAxios();

  const dispatch = useDispatch();

  const currentProfile = useSelector((state) => {
    return state.loadedUser.currentProfile;
  });

  const { work_experience: workData } = currentProfile;

  const onAddWork = async (values) => {
    console.log(values);
    await fetchData({
      method: 'post',
      url: '/api/workExperience',
      body: values,
    });
    setOpenAddForm(false);
  }

  const onDeleteWork = async (id) => {
    const currentData = [...workData];
    const deleteIndex = currentData.findIndex((item) => item.id === id);
    currentData.splice(deleteIndex, 1);
    await fetchData({
      method: 'put',
      url: '/api/workExperience',
      body: {
        work_experience: currentData,
      }
    });
  }

  const onUpdateWork = async (id, values) => {
    const currentData = [...workData];
    const updateIndex = currentData.findIndex((item) => item.id === id);
    currentData[updateIndex] = values;
    await fetchData({
      method: 'put',
      url: '/api/workExperience',
      body: {
        work_experience: currentData,
      }
    });
    setSelectedEditId(null);
  }

  useEffect(() => {
    if (res) {
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: {
          ...currentProfile,
          work_experience: res.data,
        },
      });
    }
  }, [res]);

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
            <WorkForm onSave={(values) => onAddWork(values)} />
          )
          : null
      }

      <Box style={{ paddingLeft: theme.spacing(6) }}>
        {
          workData && workData.length > 0
            ? (
              workData?.map((item, index) => (
                <>
                  {
                    selectedEditId === item.id
                      ? (
                        <WorkForm defaultValues={item} onSave={(values) => onUpdateWork(item.id, values)} />
                      )
                      : (
                        <Box style={{ display: 'flex' }}>
                          <Box style={{ flex: 1 }}>
                            <ProfileInfoRow title="Nơi công tác/Công ty" content={item.company_name} />
                            <ProfileInfoRow title="Chức vụ" content={item.job_name} />
                            <ProfileInfoRow title="Thời gian" content={item.working_time} />
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
                    index + 1 < workData.length
                      ? <Divider style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(2) }} />
                      : null
                  }
                </>
              ))
            )
            : (
              <Typography>Không có công việc</Typography>
            )
        }

      </Box>
    </div>
  );
}

export default WorkSection;
