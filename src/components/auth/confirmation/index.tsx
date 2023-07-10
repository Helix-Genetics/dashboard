import React, { useState } from "react";
//import { useLogin } from "@refinedev/core";
import { NumberOutlined } from "@ant-design/icons";
import { TextField, Button, Card, CardContent } from "@mui/material";
import axios from 'axios'
import {API_URL, authProvider, EXCHANGE_TOKEN, TOKEN_KEY} from "../../../authProvider";
import { AuthPage } from "../../../pages/auth";
import {Link} from "react-router-dom";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));


export const ConfirmationPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  //const { mutate: login, isLoading } = useLogin<ILoginForm>();
  const token = localStorage.getItem(EXCHANGE_TOKEN)

  const onCodeFormSubmit = async (e: Event) => {
    e.preventDefault()
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const response = await axios.post(`${API_URL}/auth/verify`, { code }, config);
      if (response.status === 201) {
        const result = response.data;

        // Save the authentication token to localStorage or state
        localStorage.setItem(TOKEN_KEY, result.access_token);
        location.href = '/'
      } else {
        location.href = '/login'
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
      <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }} style={{margin: "25% auto", backgroundImage: "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(images/login-bg.png)"}}>
        <StyledPaper
          sx={{
            my: 1,
            mx: 'auto',
            p: 2,
          }}
        >
          <Grid container wrap="nowrap" spacing={2}>

            <Grid item xs>
              <Typography>
                {/* @ts-ignore */}
                <form onSubmit={onCodeFormSubmit}>
                  <TextField
                    name="code"
                    label="Code"
                    variant="outlined"
                    required
                    inputProps={{
                      maxLength: 8,
                    }}
                    InputProps={{
                      type: "tel",
                      startAdornment: <NumberOutlined style={{ color: "#00000040", marginTop: '10px' }} />,
                    }}
                    value={code}
                    onChange={(e) => setCode( e.target.value)}
                    fullWidth
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={code.length !== 8}
                  >
                    Verify
                  </Button>
                </form>
              </Typography>
            </Grid>
          </Grid>
        </StyledPaper>
      </Box>
    );
}
