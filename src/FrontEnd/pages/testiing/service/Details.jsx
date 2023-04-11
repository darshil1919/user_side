import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Paper from '@mui/material/Paper';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AiFillStar, AiTwotoneStar } from 'react-icons/ai';
import { RxDotFilled } from 'react-icons/rx';
import { MdDone } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import './details.css';
import { makeStyles } from '@mui/styles';
import { FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateCart } from '../../../store/action/cartAction';
import { useSearchParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentText: {
    color: 'red',
    fontSize: 16,
  },
  actionButtonText: {
    fontSize: 14,
  },
  colorPrimary: {
    backgroundColor: '#EDEDED',
  },
  barColorPrimary: {
    backgroundColor: '#0f0f0f',
  }
}));

export default function Details({ open, handleClose, data, qty, handleIncrease, handleDecrease }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");

  const classes = useStyles();
  const dispatch = useDispatch();

  const descriptionElementRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(qty);


  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
    if(qty){
      setQuantity(qty)
    }
  }, [open, qty]);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    // onAdd(quantity);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        // className={classes.root}
      >
        <Paper style={{ width: 500 }}>
          <DialogTitle className={classes.titleText}>{data?.serviceName}</DialogTitle>
          <DialogContent dividers={true} >
            <div>
              <div className='dialog-service-image'>
                <img className="img-div" src={"/image/serviceImages/" + data?.image} />
              </div>
              <div className='py-4 d-flex justify-content-between dialog-service-detail'>
                <div>
                  <p className='fw-bold mb-0 dialog-service-name'>{data?.serviceName}</p>
                  <p className='fs-5 dialog-service-rating'> <AiTwotoneStar />4.83 (81.5K)</p>
                  <div className='fs-5 d-flex dialog-service-price_rating'>
                    <span>₹{data?.price}</span>
                    <span className='ps-3'><RxDotFilled /> ₹{data?.duration} mins</span>
                  </div>
                </div>
                <div>
                  {console.log("quantity in details -->>>", quantity)}
                  {qty < 1  ? (
                    <button className="btn fs-4 fw-bold cart-item_add-btn" onClick={handleIncrease}>
                      <span className=''>Add</span>
                    </button>
                  ) : (
                    <div className="d-flex justify-content-between align-items-center fs-4 fw-bold cart-item_quantity">
                      <button className="btn cart-item_quantity-btn" onClick={handleDecrease}>
                        <FaMinus fill={'gray'} />
                      </button>
                      {/* {console.log(quantity)} */}
                      <span className="cart-item_quantity-value">{quantity}</span>
                      <button className="btn cart-item_quantity-btn" onClick={handleIncrease}>
                        <FaPlus fill={'gray'} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <hr className='border-3 border-secondary border-bottom' />
              <div className='py-2 dialog-service-included'>
                <p className='fw-bold mb-1 text-capitalize dialog-service-included-title'>included</p>
                <div>
                  {data?.included?.map((item, index) => {
                    return (
                      <div className='d-flex py-1' key={index}>
                        <span className='pe-2'><MdDone size={20} /></span>
                        <span className='ps-2 fs-4 dialog-service-included-text'>{item}</span>
                      </div>
                    );
                  })
                  }
                </div>
              </div>
              <div className='py-2 dialog-service-excluded'>
                <p className='fw-bold mb-1 text-capitalize dialog-service-excluded-title'>excluded</p>
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
              </div>
              <hr className='border-3 border-secondary border-bottom' />
              <div className='py-2 dialog-service-FAQs'>
                <p className='fw-bold mb-1 text-capitalize dialog-service-FAQs-title'>Frequently asked questions</p>
                <div>
                  {data?.FAQs?.map((item, index) => {
                    return (
                      <Accordion key={index}
                        elevation={0}
                        expanded={expanded === `FAQs${index}`}
                        onChange={handleChange(`FAQs${index}`)}
                        className='m-0 border-1 border-bottom '>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          style={{ minHeight: '50px' }}
                          className='accordion-summary'
                        >
                          <Typography className='fs-4 dialog-service-accordion-question'>
                            {item?.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography className='fs-4 text-muted'>
                            {item?.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })
                  }

                </div>
              </div>
              <hr className='border-3 border-secondary border-bottom' />
              <div>
                <p className='fs-1 fw-bold'>Customer reviews</p>
                <div>
                  <p className='fs-5 d-flex align-items-center dialog-service-rating'> <AiTwotoneStar /> <span className='fs-1 fw-bolder'> 4.83 </span></p>
                  <p className='fs-5 dialog-service-reviews'>81.5K reviews</p>
                </div>
                <div className='dialog-service-rating-progress'>
                  <div>
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
                  </div>
                </div>
                <div className='pt-5'>
                  {[...new Array(5)]
                    .map(
                      (value, index) =>
                        <div key={index} className='py-3'>
                          <div className='d-flex py-1'>
                            <div className='user-review-avatar'>
                              <img className="rounded-circle" src={"/image/serviceImages/" + data?.image} width={"50px"} height={"50px"} alt="img" />
                            </div>
                            <div className='user-review-detail'>
                              <div className='d-flex justify-content-between'>
                                <p className='mb-0 fs-4 fw-bold'>paras dasadiya</p>
                                <p className='mb-0 fs-4'><AiTwotoneStar /> 5</p>
                              </div>
                              <p className='mb-0 fs-5 text-muted'>Mar 2023</p>
                            </div>
                          </div>
                          <div className='py-1'>
                            <p className='mb-0 fs-4'>Very Good</p>
                          </div>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions >
            <Button className={classes.actionButtonText} fullWidth variant="contained" onClick={handleClose}>Done</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </div >
  );
}