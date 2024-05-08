import { Box, Button, Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
interface Props {
  icon: ReactNode;
  title: string;
  href?: string;
  subtitle?: string;
  isAvailable?: boolean;
  selected?: boolean;
  onUpdateClcik?: () => void;
  onDeleteClcik?: () => void;
  onclick?: () => void;
}

const ItemCard = ({
  icon,
  title,
  href,
  subtitle,
  isAvailable,
  selected,
  onclick,
  onUpdateClcik,
  onDeleteClcik,
}: Props) => {
  if (href) {
    return (
      <Link href={href} style={{ textDecoration: "none", color: "white" }}>
        <Paper
          elevation={2}
          sx={{
            width: { xs: 115, md: 170 },
            height: { xs: 120, md: 170 },
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            mr: 2,
            mt: 3,
            opacity: isAvailable === false ? 0.6 : 1,
            position: "relative",
          }}
          onClick={onclick && onclick}
        >
          {selected && (
            <Box
              sx={{
                position: "absolute",
                right: 3,
                top: 2,
                color: "success.main",
              }}
            >
              <CheckCircleOutlineIcon />
            </Box>
          )}

          {icon}
          <Typography
            sx={{
              color: "#4C4C6D",
              fontWeight: "700",
              textAlign: "center",
              fontSize: { xs: "12px", md: "18px" },
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
              {subtitle}
            </Typography>
          )}
        </Paper>
      </Link>
    );
  }
  return (
    <Paper
      elevation={2}
      sx={{
        width: { xs: 115, md: 170 },
        height: { xs: 120, md: 170 },
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mr: 2,
        mt: 3,
        opacity: isAvailable === false ? 0.6 : 1,
        position: "relative",
      }}
      onClick={onclick && onclick}
    >
      {selected && (
        <Box
          sx={{
            position: "absolute",
            right: 3,
            top: 2,
            color: "success.main",
          }}
        >
          <CheckCircleOutlineIcon />
        </Box>
      )}
      {icon}
      <Typography
        sx={{
          color: "#4C4C6D",
          fontWeight: "700",
          fontSize: { xs: "12px", md: "18px" },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: "#4C4C6D", fontWeight: "700" }}>
          {subtitle}
        </Typography>
      )}
      <Button onClick={onUpdateClcik && onUpdateClcik}>update</Button>
      <Button onClick={onDeleteClcik && onDeleteClcik}>delete</Button>
    </Paper>
  );
};

export default ItemCard;
