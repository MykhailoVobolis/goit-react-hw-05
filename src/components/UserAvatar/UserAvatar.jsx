import { Avatar, Tooltip, Typography, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

import { Fragment } from "react";

export default function UserAvatar({ user }) {
  const AvatarTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
    ({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        color: "rgba(240, 244, 249, 0.75)",
        fontSize: theme.typography.pxToRem(12),
      },
    })
  );

  return (
    <AvatarTooltip
      slotProps={{
        popper: {
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [31, 0],
              },
            },
          ],
        },
      }}
      placement="bottom"
      title={
        <Fragment>
          <Typography color="#f0f4f9" fontSize={"12px"} fontWeight={"700"}>
            Обліковий запис Movieplex
          </Typography>
          <b>{user.name}</b>
          <p>{user.email}</p>
        </Fragment>
      }>
      <Avatar
        aria-label="user"
        sx={{
          bgcolor: "#2d2d2f",
          width: 38,
          height: 38,
          cursor: "pointer",
        }}>
        {user.name[0].toUpperCase()}
      </Avatar>
    </AvatarTooltip>
  );
}
