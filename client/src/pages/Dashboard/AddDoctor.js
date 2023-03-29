import { Col, Form, Input, message, Row, TimePicker } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import { hideLoading, showLoading } from "../../redux/features/alertSlice.js";
const AddDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //handle form
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "http://localhost:5000/api/add-doctor",
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          email: values.email,
          address: values.address,
          specialization: values.specialization,
          degree: values.degree,
          experience: values.experience,
          feesPerConsultation: values.feesPerCunsaltation,
          timings: [
            {
              start: values.mondayTimings
                ? values.mondayTimings[0].format("HH:mm")
                : undefined,
              end: values.mondayTimings
                ? values.mondayTimings[1].format("HH:mm")
                : undefined,
            },
            {
              start: values.tuesdayTimings
                ? values.tuesdayTimings[0].format("HH:mm")
                : undefined,
              end: values.tuesdayTimings
                ? values.tuesdayTimings[1].format("HH:mm")
                : undefined,
            },
            {
              start: values.wednesdayTimings
                ? values.wednesdayTimings[0].format("HH:mm")
                : undefined,
              end: values.wednesdayTimings
                ? values.wednesdayTimings[1].format("HH:mm")
                : undefined,
            },
            {
              start: values.thursdayTimings
                ? values.thursdayTimings[0].format("HH:mm")
                : undefined,
              end: values.thursdayTimings
                ? values.thursdayTimings[1].format("HH:mm")
                : undefined,
            },
            {
              start: values.fridayTimings
                ? values.fridayTimings[0].format("HH:mm")
                : undefined,
              end: values.fridayTimings
                ? values.fridayTimings[1].format("HH:mm")
                : undefined,
            },
            {
              start: values.saturdayTimings
                ? values.saturdayTimings[0].format("HH:mm")
                : undefined,
              end: values.saturdayTimings
                ? values.saturdayTimings[1].format("HH:mm")
                : undefined,
            },
            {
              start: values.sundayTimings
                ? values.sundayTimings[0].format("HH:mm")
                : undefined,
              end: values.sundayTimings
                ? values.sundayTimings[1].format("HH:mm")
                : undefined,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      dispatch(hideLoading());

      if (response.data.status) {
        navigate("/dashboard/doctors");
        message.success("Doctor Added Successfully");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Somthing Went Wrong ");
    }
  };
  return (
    <DashboardLayout>
      <Form layout="vertical" className="m-3" onFinish={handleFinish}>
        <h1 className="text-center">Add Doctor</h1>
        <br />
        <h4 className="">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder=" first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder=" last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="clinic address" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Degree"
              name="degree"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="degree" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Fees Per Consaltation"
              name="feesPerCunsaltation"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder=" contact no" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Timings :</h4>
        <Row>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Monday Timings" name="mondayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Tuesday Timings" name="tuesdayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Wednesday Timings" name="wednesdayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Thursday Timings" name="thursdayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Friday Timings" name="fridayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Saturday Timings" name="saturdayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Sunday Timings" name="sundayTimings">
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>
        </Row>
        <Col xs={24} md={24} lg={8}>
          <button className="btn btn-primary form-btn" type="submit">
            Submit
          </button>
        </Col>
      </Form>
    </DashboardLayout>
  );
};

export default AddDoctor;
