import React from 'react';
import Link from 'next/link';
import { useStyles } from './styles';
import { Avatar, Box, Button, Card, CardContent, Container, IconButton, InputAdornment, MenuItem, TextField, Tooltip, Typography, useTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { deepPurple } from '@material-ui/core/colors';
import useAxios from '../../hooks/useAxios';
import { useEffect } from 'react';
import { useState } from 'react';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { Pagination } from '@material-ui/lab';
import { classes as classesData, schoolYears } from '../../common/staticData';
import LayersClearIcon from '@material-ui/icons/LayersClear';

const prepareUrl = (page, query, year, classes) => {
  let url = '/api/users';
  if (page) {
    url = url + `?page=${page}`;
  } else {
    url = url + "?page=1";
  }

  url = url + `&query=${query}`;

  if (year && year !== 'all') {
    url = url + `&school_year=${year}`;
  }

  if (classes && classes !== 'all') {
    url = url + `&classes=${classes}`;
  }

  return url;
}

const Directory = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [classes, setClasses] = useState('all');
  const [schoolYear, setSchoolYear] = useState('all');

  const { fetchData, response: res, error, loading } = useAxios();

  const onSearch = useCallback(debounce((queryName) => {
    setPage(1);
    fetchData({
      method: 'get',
      url: prepareUrl(page, queryName, schoolYear, classes),
    });
  }, 2000), []);

  useEffect(() => {
    setPage(1);
    fetchData({
      method: 'get',
      url: prepareUrl(page, query, schoolYear, classes),
    });
  }, [schoolYear, classes])

 
  useEffect(() => {
    fetchData({
      url: prepareUrl(page, query, schoolYear, classes),
      method: 'get',
    });
  }, [page]);

  const resetFilter = () => {
    setQuery('');
    setPage(1);
    setClasses('all');
    setSchoolYear('all');
  }

  return (
    <Container
      style={{
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      }}
    >
      <Box style={{ display: 'flex', flexDirection: 'row', width: '100%', marginBottom: theme.spacing(4) }}>
        <Box style={{ flex: 1 }}>
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

        <Box style={{ minWidth: '150px' }}>
          <TextField
            id="select-school-year"
            label="Niên khóa"
            variant="outlined"
            fullWidth
            select
            value={schoolYear}
            onChange={(e) => {
              setSchoolYear(e.target.value);
            }}
          >
            <MenuItem value="all">Tất cả niên khóa</MenuItem>
            {
              schoolYears.map(year => (
                <MenuItem key={year.id} value={year.name}>{year.name}</MenuItem>
              ))
            }
          </TextField>
        </Box>

        <Box style={{ minWidth: '100px' }}>
          <TextField
            id="select-class"
            label="Lớp"
            variant="outlined"
            select
            fullWidth
            value={classes}
            onChange={(e) => {
              setClasses(e.target.value);
            }}
          >
            <MenuItem value="all">Tất cả lớp</MenuItem>
            {
              classesData.map(year => (
                <MenuItem key={year.id} value={year.name}>{year.name}</MenuItem>
              ))
            }
          </TextField>
        </Box>

        <Box>
          <Tooltip title="Xóa bộ lọc" aria-label="add">
            <IconButton onClick={() => resetFilter()}>
              <LayersClearIcon color="error" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {
        loading
          ? (
            <Typography>Đang tìm kiếm...</Typography>
          )
          : (
            <>
              <Typography style={{ marginBottom: theme.spacing(2) }}>
                Có {res?.filteredUsersCount ?? 0} kết quả tìm kiếm
              </Typography>
              {
                res.users.map((data) => (
                  <Link
                    key={data.id}
                    href={`/profile/${data._id}`}
                  >
                    <Box
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
                          <Typography variant="h6">{data.fullname}</Typography>
                          <Typography variant="subtitle2">{`Lớp: ${data.classes ?? 'Không có thông tin'}`}</Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">{`Niên khoá: ${data.school_year ?? 'Không có thông tin'}`}</Typography> 
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                  
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
