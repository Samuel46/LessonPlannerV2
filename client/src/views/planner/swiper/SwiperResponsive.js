import { Swiper, SwiperSlide } from "swiper/react";
import { Card, CardHeader, CardTitle, CardBody, Button } from "reactstrap";
import Cards from "../cardInfo/CardAppDesign";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "@components/breadcrumbs";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { CornerLeftDown } from "react-feather";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import PerfectScrollbar from "react-perfect-scrollbar";

const params = {
  slidesPerView: 5,
  spaceBetween: 50,
  navigation: true,
  pagination: {
    clickable: true,
  },

  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
};

const Monday = "Monday";
const Tuesday = "Tuesday";
const Wednesday = "Wednesday";
const Thursday = "Thursday";
const Friday = "Friday";
const Saturday = "Saturday";

const SwiperResponsive = ({ isRtl, handleTaskSidebar, setMainSidebar }) => {
  const lessonDetails = useSelector((state) => state.lessonDetails);
  const { lessons } = lessonDetails;
  // filter based on the days of week for the server
  const mondayLessons =
    lessons &&
    lessons.data.filter((lesson) => {
      if (lesson.week && lesson.week.includes("monday")) return lesson;
    });

  const tuesdayLessons =
    lessons &&
    lessons.data.filter((lesson) => {
      if (lesson.week && lesson.week.includes("tuesday")) return lesson;
    });
  const wednesdayLessons =
    lessons &&
    lessons.data.filter((lesson) => {
      if (lesson.week && lesson.week.includes("wednesday")) return lesson;
    });
  const thurdayLessons =
    lessons &&
    lessons.data.filter((lesson) => {
      if (lesson.week && lesson.week.includes("thursday")) return lesson;
    });
  const fridayLesson =
    lessons &&
    lessons.data.filter((lesson) => {
      if (lesson.week && lesson.week.includes("friday")) return lesson;
    });

  return (
    <PerfectScrollbar
      className="list-group todo-task-list-wrapper"
      options={{ wheelPropagation: true }}
      containerRef={(ref) => {
        if (ref) {
          ref._getBoundingClientRect = ref.getBoundingClientRect;

          ref.getBoundingClientRect = () => {
            const original = ref._getBoundingClientRect();

            return { ...original, height: Math.floor(original.height) };
          };
        }
      }}
    >
      <Fragment>
        <Breadcrumbs
          breadCrumbTitle="Lessons Planner"
          breadCrumbParent="Panner"
          breadCrumbActive="Lessons Planner"
        />
        <Row className="match-height">
          <Swiper
            dir={isRtl ? "rtl" : "ltr"}
            {...params}
            className="match-height"
          >
            <SwiperSlide>
              <Cards
                day={Monday}
                lessons={mondayLessons}
                setMainSidebar={setMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
                id={Monday}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Cards
                day={Tuesday}
                lessons={tuesdayLessons}
                setMainSidebar={setMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
                id={Tuesday}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Cards
                day={Wednesday}
                lessons={wednesdayLessons}
                setMainSidebar={setMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
                id={Wednesday}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Cards
                day={Thursday}
                lessons={thurdayLessons}
                setMainSidebar={setMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
                id={Thursday}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Cards
                day={Friday}
                lessons={fridayLesson}
                setMainSidebar={setMainSidebar}
                handleTaskSidebar={handleTaskSidebar}
                id={Friday}
              />
            </SwiperSlide>
          </Swiper>
        </Row>
      </Fragment>
    </PerfectScrollbar>
  );
};

export default SwiperResponsive;
