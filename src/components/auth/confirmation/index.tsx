import React, { useState } from "react";
//import { useLogin } from "@refinedev/core";
import { NumberOutlined } from "@ant-design/icons";
import { TextField, Button } from "@mui/material";
import axios from 'axios'
import {API_URL, authProvider, EXCHANGE_TOKEN, TOKEN_KEY} from "../../../authProvider";

export interface ILoginForm {
  gsmNumber: string;
  code: string;
}

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
    // @ts-ignore
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
  );
};
