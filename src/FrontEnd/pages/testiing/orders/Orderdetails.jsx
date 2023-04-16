import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import "./orderdetails.css";
import { AiTwotoneStar } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { RxCross2, RxDotFilled } from "react-icons/rx";
import { ImClock } from "react-icons/im";
import { makeStyles } from "@mui/styles";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Review from "./Review";

const useStyles = makeStyles((theme) => ({
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  contentText: {
    color: "red",
    fontSize: 16,
  },
  actionButtonText: {
    fontSize: 14,
  },
  colorPrimary: {
    backgroundColor: "#EDEDED",
  },
  barColorPrimary: {
    backgroundColor: "#0f0f0f",
  },
}));

const Orderdetails = ({ open, handleClose, data }) => {
  const classes = useStyles();
  const [reviewDialogOpen, setDialogReviewOpen] = useState(false);
  const [reviewDialogData, setReviewDialogData] = useState({});

  let handleCloseReviewDialog = () => {
    setDialogReviewOpen(false);
  };

  let onChange = () => {};
  let onClickItem = () => {};
  let onClickThumb = () => {};

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // className={classes.root}
      >
        <Paper style={{ width: 500 }}>
          <DialogTitle className={classes.titleText}>
            {data?.serviceName}
          </DialogTitle>
          <DialogContent dividers={true}>
            <div>
              <div className="dialog-service-image">
                {/* <img className="img-div" src={"/image/serviceImages/" + data?.image} /> */}
                <Carousel
                  showArrows={true}
                  onChange={onChange}
                  onClickItem={onClickItem}
                  onClickThumb={onClickThumb}
                >
                  {data?.items?.map((value, index) => {
                    return (
                      <div key={index}>
                        <img src={"/image/serviceImages/" + value.image} />
                        <p className="legend">Legend 1</p>
                      </div>
                    );
                  })}
                  <div>
                    <img src="/image/categoryImages/image-1680697523611.jpeg" />
                    <p className="legend">Legend 2</p>
                  </div>
                  <div>
                    <img src="/image/categoryImages/image-1680697523611.jpeg" />
                    <p className="legend">Legend 3</p>
                  </div>
                </Carousel>
              </div>
              <div className="py-4 d-flex justify-content-between dialog-service-detail">
                <div>
                  <p className="fw-bold mb-0 dialog-service-name">
                    {data?.serviceId}
                  </p>
                  {/* <p className="fs-5 dialog-service-rating">
                    <AiTwotoneStar />
                    4.83 (81.5K)
                  </p> */}
                  <div className="fs-3 d-flex dialog-service-price_rating">
                    {/* <span>₹{data?.price}</span> */}
                    <span className="ps-3">
                      <ImClock /> {data?.totalTime} mins
                    </span>
                  </div>
                  <div className="mt-3">
                    {(data.status == "pending" || data.status == "cancelled") ? (
                      <span className="text-uppercase m-2 h4 text-danger">
                        BOOKING {data.status}
                      </span>
                    ) : null}
                    {data.status == "confirmed" ||
                    data.status == "completed" ? (
                      <span className="text-uppercase m-2 h4 text-success">
                        BOOKING {data.status}
                      </span>
                    ) : null}
                    {data.status == "working" ? (
                      <span className="text-uppercase m-2 h4 text-info">
                        BOOKING {data.status}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div className="btn fs-4 fw-bold">
                    <span className="">
                      <span>&#8377; </span> {data.grandTotal}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="border-3 border-secondary border-bottom" />
              <div className="py-2 dialog-service-included">
                <p className="fw-bold mb-1 text-capitalize dialog-service-included-title">
                  Payment Summery
                </p>
                <div>
                  {data?.items?.map((item, index) => {
                    return (
                      <div className="d-flex py-1" key={index}>
                        <span className="pe-2">
                          <RxDotFilled size={20} />
                        </span>
                        <span className="ps-2 fs-4 dialog-service-included-text">
                          {item.serviceId} X {item.quantity}
                        </span>
                        <span className="ps-2 fs-4 dialog-service-included-text">
                          {item.price * item.quantity}
                        </span>
                        {data.status == "completed" ? (
                          <>
                            <span
                              className="ps-2 fs-4 link-primary dialog-service-included-text"
                              onClick={() => {
                                if(item.reviewId){
                                  setReviewDialogData({
                                    isEditable: false,
                                    reviewId: item.reviewId
                                  })
                                } else {
                                  setReviewDialogData({
                                    isEditable: true,
                                    serviceId: item.serviceId,
                                    orderId: data._id,
                                    _id: item._id
                                  });
                                }
                                setDialogReviewOpen(true);
                              }}>Review</span>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div className="py-2 dialog-service-excluded">
                <p className="fw-bold mb-1 text-capitalize dialog-service-excluded-title">
                  excluded
                </p>
                <div>
                  {data?.included?.map((item, index) => {
                    return (
                      <div className='d-flex py-1' key={index}>
                        <span className='pe-2'><RxCross2 size={20} /></span>
                        <span className='ps-2 fs-4 dialog-service-excluded-text'>{item}</span>
                      </div>
                    );
                  })
                  }
                </div>
              </div> */}
              <hr className="border-3 border-secondary border-bottom" />
              {(data.status != "confirmed") ? null : (
                <>
                  <div className="py-2 dialog-service-FAQs">
                    <p className="fw-bold mb-1 text-capitalize dialog-service-FAQs-title">
                      OTP to start the service
                    </p>
                    <div>
                      <div class="code-container">
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border-3 border-secondary border-bottom" />
                </>
              )}
              {(data.status != "working") ? null : (
                <>
                  <div className="py-2 dialog-service-FAQs">
                    <p className="fw-bold mb-1 text-capitalize dialog-service-FAQs-title">
                      OTP to end the service
                    </p>
                    <div>
                      <div class="code-container">
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                        <input
                          type="number"
                          class="code"
                          placeholder="0"
                          value={5}
                          min="0"
                          max="9"
                          contentEditable={false}
                        />
                      </div>
                    </div>
                  </div>
                  <hr className="border-3 border-secondary border-bottom" />
                </>
              )}
              {
                (data.status == "pending" ||
              data.status == "cancelled") ? null : 
              <>
              <div>
                <p className="fs-1 fw-bold">Professional assigned</p>
                <div>
                  {/* <p className="fs-5 d-flex align-items-center dialog-service-rating">
                    <AiTwotoneStar />
                    <span className="fs-1 fw-bolder"> 4.83 </span>
                  </p>
                  <p className="fs-5 dialog-service-reviews">81.5K reviews</p> */}
                </div>
                <div className="dialog-service-rating-progress">
                  <section className="container mt-4 mb-4">
                    <div className="container">
                      <div className="row mb-3">
                        {/* <div className="col-md-6"> */}
                        <div className="d-flex flex-row border rounded">
                          <div className="p-0 w-25">
                            <img
                              src="https://c1.staticflickr.com/3/2862/12328317524_18e52b5972_k.jpg"
                              className="img-thumbnail border-0"
                            />
                          </div>
                          <div className="pl-3 pt-2 pr-2 pb-2 w-75 border-left">
                            <h4 className="text-primary">
                              {data?.workerData?.[0].firstName +
                                " " +
                                data?.workerData?.[0].lastName}
                            </h4>
                            <h5 className="text-info">
                              Phone no. : {data?.workerData?.[0].phone}
                            </h5>
                            {/* <p className="text-right m-0">
                                <a href="#" className="btn btn-primary">
                                  <i className="far fa-user"></i> View Profile
                                </a>
                              </p> */}
                            {/* </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* <div>
                    {[...new Array(5)]
                      .map(
                        (value, index) => <div key={index} className='d-flex align-items-center py-2 justify-content-between'>
                          <p className='fs-5 mb-0 d-flex align-items-center dialog-service-rating-star'> <AiTwotoneStar /><span>5</span></p>
                          <div className='dialog-service-progress-bar'>
                            <LinearProgress
                              variant="determinate"
                              value={60}
                              classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }}
                            />
                          </div>
                          <p className='mb-0 dialog-service-rating-count text-end fs-5'>5.7K</p>
                        </div>
                      )}
                  </div> */}
                </div>
              </div>
              </>
                }
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.actionButtonText}
              fullWidth
              variant="contained"
              onClick={handleClose}
            >
              Done
            </Button>
          </DialogActions>
        </Paper>
      </Dialog>
      <Review
        open={reviewDialogOpen}
        data={reviewDialogData}
        handleClose={handleCloseReviewDialog}
      />
    </>
  );
};

export default Orderdetails;
