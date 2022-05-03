import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Models } from "../../components/organisms/Models/Models";
import { OptionalExtras } from "../../components/organisms/Optional/OptionalExtras";
import { Place } from "../../components/organisms/Place/Place";
import { Total } from "../../components/organisms/Total/Total";
import { getCompiledOrder } from "../../store/compiledOrder/selectors";
import { getPoint } from "../../store/point/selectors";

export const OrderRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const point = useSelector(getPoint);
  const idOrder = useSelector(getCompiledOrder);

  useEffect(() => {
    if (location.pathname !== "/order/place" && point === "") {
      navigate("/order/place");
    }
  }, []);

  const arrOrderIdOutput = [
    idOrder.idOrder,
    idOrder.orderStatusId.name === "Подтвержденные",
  ];

  const orderIdOutput = arrOrderIdOutput.every((check) => check);

  return (
    <Routes>
      <Route path="/order/place" element={<Place />} />
      <Route path="/order/models" element={<Models />} />
      <Route path="order/options" element={<OptionalExtras />} />
      <Route path="order/total" element={<Total />} />
      <Route
        path={`order/total/id${orderIdOutput && idOrder.idOrder}`}
        element={<Total />}
      />
    </Routes>
  );
};
