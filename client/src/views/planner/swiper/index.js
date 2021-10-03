import { Fragment, useEffect } from "react";
import { useRTL } from "@hooks/useRTL";
import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual,
} from "swiper";

import SwiperResponsive from "./SwiperResponsive";
import { Row, Col } from "reactstrap";

import "@styles/react/libs/swiper/swiper.scss";

SwiperCore.use([
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual,
]);

const Slider = ({ handleTaskSidebar, setMainSidebar }) => {
  const [isRtl, setIsRtl] = useRTL();

  return (
    <Fragment>
      <Row>
        <Col sm="12">
          <SwiperResponsive
            isRtl={isRtl}
            setMainSidebar={setMainSidebar}
            handleTaskSidebar={handleTaskSidebar}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Slider;
