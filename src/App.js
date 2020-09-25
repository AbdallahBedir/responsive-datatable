import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const mobileScreen = "sm";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  zepra:{
    '&:nth-of-type(4n+1)': {
      backgroundColor: '#f5f5f5',
    },
  }
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(mobileScreen));

  return (
    <React.Fragment>
      <TableRow className={classes.root + " " + classes.zepra}>
        {isMobile && (
          <TableCell style={{width: '70px'}}>  
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        {!isMobile && (
          <React.Fragment>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
            <TableCell align="right">{row.price}</TableCell>
          </React.Fragment>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow className={classes.root}>
                    <TableCell variant="head" component="th" scope="col">
                      Fat (g)
                    </TableCell>
                    <TableCell>{row.fat}</TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell variant="head" component="th" scope="row">
                      Carbs (g)
                    </TableCell>
                    <TableCell>{row.carbs}</TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell variant="head" component="th" scope="row">
                      Protein (g)
                    </TableCell>
                    <TableCell>{row.protein}</TableCell>
                  </TableRow>
                  <TableRow className={classes.root}>
                    <TableCell variant="head" component="th" scope="row">
                      Price
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
  createData("Frozen yoghurts", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwichs", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclairs", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcakes", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbreads", 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [page, setPage] = React.useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(mobileScreen));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {isMobile && <TableCell />}
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              {!isMobile && (
                <React.Fragment>
                  <TableCell align="right">Fat&nbsp;(g)</TableCell>
                  <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                  <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  <TableCell align="right">Price&nbsp;</TableCell>
                </React.Fragment>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
