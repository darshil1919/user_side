import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  addReview,
  getReviewDetails,
} from "../../../store/action/reviewAction";
import { getOrderList } from "../../../store/action/orderAction";

const labels = {
  // 0.5: "Useless",
  1: "Useless",
  // 1.5: "Poor",
  2: "Poor",
  // 2.5: "Ok",
  3: "Ok",
  // 3.5: "Good",
  4: "Good",
  // 4.5: "Excellent",
  5: "Excellent",
};

const Review = ({ open, handleClose, data }) => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const [description, setDescription] = useState("");
  const { error, loading, review } = useSelector(
    (state) => state.reviewDetails
  );

  useEffect(() => {
    if (data?.reviewId) {
      dispatch(getReviewDetails({ reviewId: data?.reviewId }));
    }
  }, [data]);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  let onSubmitReview = () => {
    dispatch(
      addReview({
        serviceId: data.serviceId,
        orderId: data.orderId,
        rating: value,
        description,
        _id: data._id,
      })
    );
    setTimeout(() => {
      dispatch(getOrderList());
    }, 200);
    handleClose();
  };

  return loading ? null : !data?.isEditable ? (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="fs-4 pb-2">Review</DialogTitle>
        <DialogContent className="pb-3">
          <DialogContentText id="alert-dialog-description">
            <Rating
              sx={{ fontSize: "20px" }}
              name="read-only"
              value={0 || review?.rating}
              // size="large"
              readOnly
            />
            {value !== null && (
              <Box sx={{ ml: 2, fontSize: "12px" }}>
                {labels[hover !== -1 ? hover : value]}
              </Box>
            )}
          </DialogContentText>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              style={{
                width: 200,
                height: 125,
                fontSize: "14px",
                padding: "7px",
              }}
              value={review.description}
              readOnly={true}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="fs-4">Close</Button>
          {/* <Button onClick={() => {}}>
            Delete
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">{data.serviceId}</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <Box
              sx={{
                width: 200,
                display: "flex",
                alignItems: "center",
              }}
            > */}
            {/* <Rating name="read-only" value={value} readOnly /> */}
            <Rating
              name="hover-feedback"
              value={value}
              // precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
            {/* </Box> */}
          </DialogContentText>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Empty"
              style={{ width: 200, height: 125 }}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancle</Button>
          <Button onClick={onSubmitReview}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Review;
