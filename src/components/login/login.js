import "./login.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import { Button, Form, Input } from "antd";
import { useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";


function Login(props) {
  const [loginCount, setLoginCount] = useState(0);
  const navigate = useNavigate();
  const navigateToSignUp = () => {
    // Navigate to a different route
    navigate('/signup');
  };

  // const componentDidMount = (v) => {
  //   const myTimer = setInterval(() => {
  //     this.state.count > 0
  //       ? this.setState({ count: this.state.count - 1 })
  //       : clearInterval(myTimer);
  //   }, 1000);
  // };

  useEffect(() => {
    console.log(props.users, 'inside login');
  })

  const onFinish = (values) => {
    setLoginCount(loginCount + 1);
    const user = props.users && props.users.find((user) => {
      return (user.name === values.username);
    })
    if(user){
      if(values.password === user.password){
        setLoginCount(0);
      navigate('/dashboard')
      }else{
        setLoginCount(loginCount + 1);
        if(loginCount === 3 || loginCount > 3){
          props.removeUser(user);
          toast(`${user.name} has been blocked!`);
        }else{
          toast(`you have only ${loginCount - 3 } attempt left`);
        }
      }
    }else{
      toast( "User not exists!");
    }
  };
  const onFinishFailed = (errorInfo) => {
    toast( "Failed:", errorInfo);
  };
  
  return (
    <div>
        <Header></Header>
        <div className="login">
    <Form
      className="centered"
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button style={{backgroundColor: '#21252c', color: 'white'}} type="primary" htmlType="submit">
          Submit
        </Button>
        <Button style={{marginLeft: 10, backgroundColor: '#21252c', color: 'white'}} htmlType="button" onClick={navigateToSignUp}>
          SignUp
        </Button>
      </Form.Item>
    </Form></div>
    <ToastContainer></ToastContainer>
        <Footer></Footer>
    </div>
  );
}

export default Login;
