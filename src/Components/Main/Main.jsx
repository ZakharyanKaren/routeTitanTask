import React, { useState, useEffect } from "react";
import * as styles from "./main.module.css";
import PropTypes from "prop-types";
import axios from "axios";
import Map from "../Map/Map";
import * as Mui from "@material-ui/core";
import Routes from "../Routes/Routes";

const theme = Mui.createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#FFFFFF",
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return <div>{value === index && <Mui.Box>{children}</Mui.Box>}</div>;
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = Mui.makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#E5E8E9",
    width: "360px",
    margin: "50px auto 0",
    height: "616px",
    overflow: "scroll",
    overflowX: "hidden",
    backgroundColor: "#53676d",
  },
  tab: {
    width: "180px",
  },
}));

export default function Main() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [routeData, setRouteData] = useState(null);
  let [isFinished, setIsFinished] = useState(null);

  const finishClickHandler = (currentValue) => {
    setIsFinished(currentValue);
  };

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/narzero/849b3190d9cb47503f36c35aee5e7c72/raw/e6c13ccd56cb1cad854ce5fa556229b3e906eb5f/route.json"
      )
      .then((response) => {
        setRouteData(response.data);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {routeData !== null && (
        <Mui.ThemeProvider theme={theme}>
          <Mui.Box className={classes.root}>
            <Mui.AppBar position="static">
              <Mui.Tabs
                indicatorColor="secondary"
                value={value}
                onChange={handleChange}
              >
                <Mui.Tab
                  className={classes.tab}
                  label={`STOPS (${isFinished === null ? 0 : isFinished}/${
                    routeData.stops.length - 1
                  })`}
                  {...a11yProps(0)}
                />
                <Mui.Tab
                  className={classes.tab}
                  label="Map"
                  {...a11yProps(1)}
                />
              </Mui.Tabs>
            </Mui.AppBar>
            <TabPanel component="div" value={value} index={0}>
              <Routes
                stops={routeData.stops}
                isFinished={isFinished}
                finishClickHandler={finishClickHandler}
              />
            </TabPanel>
            <TabPanel p={0} value={value} index={1}>
              <Map routeData={routeData} isFinished={isFinished} />
            </TabPanel>
          </Mui.Box>
        </Mui.ThemeProvider>
      )}
    </>
  );
}
