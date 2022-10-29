import React from 'react';
import { useStyles } from './styles';
import { Avatar, Box, Button, Card, CardContent, Container, InputAdornment, Link, TextField, Typography, useTheme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { deepPurple } from '@material-ui/core/colors';

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
          }}
        />
      </Box>
      <Typography style={{ marginBottom: theme.spacing(2) }}>Có 10 kết quả tìm kiếm</Typography>
      {
        mockData.map((data) => (
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
                <Avatar style={{ marginRight: theme.spacing(2), width: theme.spacing(8), height: theme.spacing(8) }}/>
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
    </Container>
  );
};

export default Directory;
