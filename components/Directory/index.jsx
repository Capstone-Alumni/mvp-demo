import React from 'react';
import { useStyles } from './styles';
import { Avatar, Box, Button, Card, CardContent, Container, InputAdornment, Link, TextField, Typography, useTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { deepPurple } from '@material-ui/core/colors';
import useAxios from '../../hooks/useAxios';
import { useEffect } from 'react';
import { useState } from 'react';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { Pagination } from '@material-ui/lab';

const mockData = [{
  id: 1,
  avatar: '',
  name: 'Nguyen Van A',
  schoolYear: '2011-2015',
  class: '12A8',
}, {
  id: 2,
  avatar: '',
  name: 'Le Van Luyen',
  schoolYear: '2011-2015',
  class: '12A8',
}, {
  id: 3,
  avatar: '',
  name: 'Hap phu',
  schoolYear: '2011-2015',
  class: '12A8',
}];



const Directory = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');

  const { fetchData, response: res, error, loading } = useAxios();

  const onSearch = useCallback(debounce((queryName) => {
    console.log(queryName);
    setPage(1);
    fetchData({
      method: 'get',
      url: `/api/users?page=1&name=${queryName}`
    });
  }, 2000), []);

 
  useEffect(() => {
    fetchData({
      url: `/api/users?page=${page}&name=${query}`,
      method: 'get',
    });
  }, [page])

  return (
    <Container
      style={{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      }}
    >
      <Box style={{ width: '100%', marginBottom: theme.spacing(4) }}>
        <TextField
          id="search-alumni"
          label="Tìm kiếm"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            value: query,
            onChange: (e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }
          }}
        />
      </Box>

      {
        loading
          ? null
          : (
            <>
              <Typography style={{ marginBottom: theme.spacing(2) }}>
                Có {res.filteredUsersCount} kết quả tìm kiếm
              </Typography>
              {
                res.users.map((data) => (
                  <Box
                    key={data.id}
                    style={{
                      backgroundColor: deepPurple[50],
                      borderRadius: theme.spacing(2),
                      padding: theme.spacing(2),
                      marginBottom: theme.spacing(3),
                    }}
                  >
                    <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                      <Box>
                        <Avatar src={data.avatar.url} style={{ marginRight: theme.spacing(2), width: theme.spacing(8), height: theme.spacing(8) }}/>
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <Typography variant="h6">{data.name}</Typography>
                        <Typography variant="subtitle2">Lớp {data.class}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle1">Niên khoá {data.schoolYear}</Typography> 
                      </Box>
                    </Box>
                  </Box>
                ))
              }
            </>
          )
      }

      <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <Pagination
          page={page}
          count={loading ? 1 : Math.ceil(res?.filteredUsersCount / res?.resPerPage)}
          onChange={(e, page) => setPage(page)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default Directory;
