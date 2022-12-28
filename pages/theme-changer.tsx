import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { GetServerSideProps } from "next";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Layout } from "../components/layouts";
import Cookies from "js-cookie";
import axios from "axios";

interface Props {
  theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
  const [currentTheme, setCurrentTheme] = useState(theme);
  const onChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedTheme = event.target.value;
    setCurrentTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    Cookies.set("theme", selectedTheme);
  };
  const onClick = async () => {
    const { data } = await axios.get("api/hello");
    console.log(data);
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    console.log("Localstorage : ", theme);
    console.log("Cookies", Cookies.get("theme"));

    // if (theme) {
    //   setCurrentTheme(theme);
    // }
  }, []);
  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel></FormLabel>
            <RadioGroup value={currentTheme} onChange={onChangeTheme}>
              <FormControlLabel
                value="light"
                control={<Radio />}
                label="Light"
              />
              <FormControlLabel value="dark" control={<Radio />} label="Dark" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Choose Theme</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = "light" } = req.cookies;
  const isValidTheme = ["light", "dark", "custom"].includes(theme);
  return {
    props: {
      theme: isValidTheme ? theme : "light",
    },
  };
};

export default ThemeChangerPage;
