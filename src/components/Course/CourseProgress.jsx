import React, { Fragment, useEffect, useState } from "react";
import {
  clearErrors,
  enrollCourse,
  getCourseDetails,
  newReview,
} from "../../actions/courseAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader";
import Rating from "@mui/material/Rating";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AttachmentIcon from "@mui/icons-material/Attachment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ENROLL_COURSE_RESET,
  NEW_REVIEW_RESET,
} from "../../constants/courseConstants";
import { enrolledCourse } from "../../actions/userAction";
import AllReviews from "./AllReviews";

const CourseProgress = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();

  const { user } = useSelector((state) => state.user);

  const { course, loading, error } = useSelector(
    (state) => state.courseDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  // const { isEnrolled, error: enrollError } = useSelector(
  //   (state) => state.enrollCourse
  // );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [flag, setFlag] = useState(false);

  //   const {instructor, error:instructorError} = useSelector((state) => state.userDetails);

//   const options = {
//     value: course.courseRating,
//     readOnly: true,
//     precision: 0.5,
//     size: "large",
//   };

  const extend = () => {
    Array.from(document.getElementsByClassName("dropdown")).forEach((e, i) => {
      e.addEventListener("click", () => {
        if (
          document.getElementById(`ext_drop_${i}`).classList.contains("hidden")
        ) {
          document.getElementById(`ext_drop_${i}`).classList.remove("hidden");
          e.classList.add("rotate-180");
        } else {
          document.getElementById(`ext_drop_${i}`).classList.add("hidden");
          e.classList.remove("rotate-180");
        }
      });
    });
  };

  // const addToCartHandler = () => {
  //   dispatch(addItemsToCart(id));
  //   alert.success("Item Added To Cart");
  // };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("courseId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    // console.log(course.enrolled.length);
    // console.log(user._id, course.enrolled[0].user);
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    //   if (enrollError) {
    //     alert.error(enrollError);
    //     dispatch(clearErrors());
    //   }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    // setTimeout(enrollCheck, 100);
    dispatch(getCourseDetails(id));
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    // dispatch(getUserDetails(course.user));
  }, [dispatch, error, alert, id, reviewError, success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={`${user.name.split(" ")[0]}'s Courses | ${course.courseName}`} />
          <div className="mt-5">
            <span className="text-4xl ml-10">
              {course.courseName} - By{" "}
              <span className="text-blue-500 font-semibold">
                {course.author}
              </span>
            </span>
          </div>
          <div className="flex justify-center items-center mx-20 mt-10 bg-slate-100">
            <div className="bg-blue-500 h-10 w-full flex items-center">
              <span className="ml-5 text-white font-semibold">My Progress</span>
            </div>
            <div>
              <Link
                to=""
                className="hover:text-blue-500 hover:cursor-pointer mx-5"
              >
                Assignments
              </Link>
            </div>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Syllabus</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <div className="bg-slate-100 flex justify-center flex-col items-center">
            <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center mt-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="">
                  <span className="text-3xl font-semibold">Module 1</span>
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center">
                      <PlayCircleOutlineIcon />
                      <span className="ml-1">3 Videos</span>
                    </div>
                    <div className="flex items-center">
                      <AttachmentIcon className="ml-3" />
                      <span className="ml-1">1 Assignment</span>
                    </div>
                  </div>
                </div>
                <KeyboardArrowDownIcon
                  fontSize="large"
                  className="hover:cursor-pointer dropdown"
                  onClick={extend}
                />
              </div>
              <div className="hidden mt-5" id="ext_drop_0">
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 1</span>
                  <div>
                    <span className="text-xl">07:33 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 2</span>
                  <div>
                    <span className="text-xl">10:09 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 3</span>
                  <div>
                    <span className="text-xl">02:57 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex items-center py-3 justify-between">
                  <div className="flex items-center">
                    <AttachmentIcon className="" />
                    <span className="text-xl ml-1">Assignment</span>
                  </div>
                  <div>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Attempt Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 flex justify-center flex-col items-center">
            <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center mt-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="">
                  <span className="text-3xl font-semibold">Module 2</span>
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center">
                      <PlayCircleOutlineIcon />
                      <span className="ml-1">3 Videos</span>
                    </div>
                    <div className="flex items-center">
                      <AttachmentIcon className="ml-3" />
                      <span className="ml-1">1 Assignment</span>
                    </div>
                  </div>
                </div>
                <KeyboardArrowDownIcon
                  fontSize="large"
                  className="hover:cursor-pointer dropdown"
                  onClick={extend}
                />
              </div>
              <div className="hidden mt-5" id="ext_drop_1">
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 1</span>
                  <div>
                    <span className="text-xl">07:33 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 2</span>
                  <div>
                    <span className="text-xl">10:09 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 3</span>
                  <div>
                    <span className="text-xl">02:57 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex items-center py-3 justify-between">
                  <div className="flex items-center">
                    <AttachmentIcon className="" />
                    <span className="text-xl ml-1">Assignment</span>
                  </div>
                  <div>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Attempt Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 flex justify-center flex-col items-center">
            <div className="mx-24 bg-blue-300 px-10 py-3 w-5/6 flex flex-col justify-center my-5 rounded-lg">
              <div className="flex justify-between items-center">
                <div className="">
                  <span className="text-3xl font-semibold">Module 3</span>
                  <div className="flex mt-2 items-center">
                    <div className="flex items-center">
                      <PlayCircleOutlineIcon />
                      <span className="ml-1">3 Videos</span>
                    </div>
                    <div className="flex items-center">
                      <AttachmentIcon className="ml-3" />
                      <span className="ml-1">1 Assignment</span>
                    </div>
                  </div>
                </div>
                <KeyboardArrowDownIcon
                  fontSize="large"
                  className="hover:cursor-pointer dropdown"
                  onClick={extend}
                />
              </div>
              <div className="hidden mt-5" id="ext_drop_2">
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 1</span>
                  <div>
                    <span className="text-xl">07:33 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 2</span>
                  <div>
                    <span className="text-xl">10:09 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex justify-between py-3">
                  <span className="text-xl">Video 3</span>
                  <div>
                    <span className="text-xl">02:57 - </span>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Play Video
                    </Link>
                  </div>
                </div>
                <div className="border-t-2 border-black flex items-center py-3 justify-between">
                  <div className="flex items-center">
                    <AttachmentIcon className="" />
                    <span className="text-xl ml-1">Assignment</span>
                  </div>
                  <div>
                    <Link to="" className="hover:text-blue-500 text-xl">
                      Attempt Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center my-10">
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
            <span className="font-semibold text-4xl mx-2">Reviews</span>
            <div className="w-2/5 h-0.5 bg-slate-500"></div>
          </div>

          <div className="flex items-center justify-evenly mb-10">
            <button
              className="w-5/12 hover:bg-blue-700 py-3 text-center bg-blue-500 text-white rounded-md text-xl font-semibold"
              onClick={submitReviewToggle}
            >
              Submit Review
            </button>
            <Link to="/allreviews" className="w-5/12 hover:bg-blue-700 py-3 text-center bg-blue-500 text-white rounded-md text-xl font-semibold">
              See All Reviews
            </Link>
          </div>

          <Dialog open={open} onClose={submitReviewToggle}>
            <DialogTitle>Write Review</DialogTitle>
            <DialogContent className="flex flex-col">
              <div className="flex items-center justify-between">
                <Rating
                  className=""
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />
                <Button onClick={() => {setRating(0); setComment("")}} color="secondary">
                  Reset
                </Button>
              </div>
              <textarea
                className="submitDialogTextArea resize-none outline-none border-2 p-2 pl-4 mt-5"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write here..."
              ></textarea>
              {/* <DialogContentText>
        To subscribe to this website, please enter your email address
        here. We will send updates occasionally.
      </DialogContentText> */}
              {/* <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        fullWidth
        variant="standard"
      /> */}
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CourseProgress;
