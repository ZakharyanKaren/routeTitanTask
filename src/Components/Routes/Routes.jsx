import react, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as styles from "./Routes.module.css";
import * as Mui from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { SvgIcon } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  cardActive: {
    margin: "8px 0",
    borderRadius: "2px",
    boxShadow: "none",
  },
  card: {
    margin: "8px",
    boxShadow: "none",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#DEDEDE",
    color: "rgba(40, 40, 40, 0.87)",
  },
  avatarActive: {
    backgroundColor: "#E90052",
    color: "FFFFFF",
    marginTop: "12px",
  },
  route: {
    backgroundColor: "#E5E8E9",
  },
  routeActive: {
    backgroundColor: "FFFFFF",
    padding: "12px 0 12px 24px",
  },
  subHeaderTypography: {
    color: "#9B9B9B",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "5px 0 11px 0",
    display: "flex",
    alignItems: "end",
    justifyContent: "space-between",
  },
  titleTypography: {
    display: "flex",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#282828",
    justifyContent: "space-between",
  },
  titleTypographyActive: {
    display: "flex",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#282828",
    justifyContent: "space-between",
    paddingRight: "24px",
  },
  headerFinished: {
    backgroundColor: "#53676D",
  },
  avatarFinished: {},
  titleTypographyFinished: {},
}));

export default function Routes(props) {
  const classes = useStyles();
  return (
    <div>
      {props.stops.map((stop, currentValue) => {
        const isActive =
          (props.isFinished === null && currentValue === 0) ||
          props.isFinished + 1 === currentValue;

        const isFinished =
          props.isFinished !== null && currentValue <= props.isFinished;

        if (stop.type === "start") return false;

        return (
          <Mui.Card
            className={isActive ? classes.cardActive : classes.card}
            key={currentValue}
          >
            <Mui.CardHeader
              className={
                isActive
                  ? classes.routeActive
                  : isFinished
                  ? classes.headerFinished
                  : classes.route
              }
              avatar={
                <Mui.Avatar
                  aria-label="recipe"
                  className={
                    isActive
                      ? classes.avatarActive
                      : isFinished
                      ? classes.avatarFinished
                      : classes.avatar
                  }
                >
                  {stop.sequence_number}
                </Mui.Avatar>
              }
              title={
                <Mui.Typography
                  component="div"
                  className={
                    isActive
                      ? classes.titleTypographyActive
                      : isFinished
                      ? classes.titleTypographyFinished
                      : classes.titleTypography
                  }
                >
                  <p>{stop.information.name}</p>
                  <p>{stop.arr_time_string}</p>
                </Mui.Typography>
              }
              subheader={
                <div>
                  <Mui.Typography
                    component="div"
                    className={classes.subHeaderTypography}
                  >
                    <div>
                      <p>{stop.information.street}</p>
                      <p>{stop.information.city}</p>
                    </div>
                    <div className={isActive ? styles.timeWrapper : ""}>
                      <p>
                        {stop.time_window_earliest}-{stop.time_window_latest}
                      </p>
                    </div>
                  </Mui.Typography>
                  {isActive && <Mui.Divider light />}
                </div>
              }
            />

            {isActive && (
              <Mui.IconButton
                aria-label="previous"
                onClick={() => props.finishClickHandler(currentValue)}
              >
                Finish
              </Mui.IconButton>
            )}
          </Mui.Card>
        );
      })}
    </div>
  );
}
