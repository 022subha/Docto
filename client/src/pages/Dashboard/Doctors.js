import { Row } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DashboardLayout from "../../components/DashboardLayout.js";
import ItemCard from "../../components/ItemCard";
import { hideLoading, showLoading } from "../../redux/features/alertSlice.js";
export default function Doctors() {
  const [doctors, setDoctors] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDoctors = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          "http://localhost:5000/api/get-doctor"
        );
        dispatch(hideLoading());
        if (response.data.status) setDoctors(response.data.doctors);
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
    };
    getDoctors();
  }, []);
  return (
    <DashboardLayout>
      <Row gutter={20} className="row">
        <ItemCard />
        <ItemCard doctorInfo={doctors} />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </Row>
    </DashboardLayout>
  );
}
