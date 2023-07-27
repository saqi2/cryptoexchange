import "./signup.css";
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Upload } from 'antd';
import { useState } from "react";
import Header from "../header/header";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function Signup(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();
  const navigateToHome = () => {
    // Navigate to a different route
    navigate('/');
  };
  return (
    <>
      <Header></Header>
      <div className="signup">
        <Form 
          className="form"
          labelCol={{span: 10}}
          style={{maxWidth: 1000}}
          layout="horizontal"
          autoComplete="off"
          onFinish={(values) => {
            const newUser ={
              name,
              email,
              password,
              address
            }
            props.addUser(newUser);
            setName('');
            setAddress('');
            setEmail('');
            setPassword('');
            navigateToHome()
            console.log(props.users);
          }}
          onFinishFailed={(error) => {
            console.log({error});
          }}
        >
          <Form.Item name="name" label="UserName: " rules={[
            {required: true, message: "Please enter your name"},
            {whitespace: true},
            {min: 3}
          ]}
          hasFeedback>
            <Input placeholder="Enter your user name" onChange={(e) => setName(e.target.value)}/>
          </Form.Item>
          <Form.Item name="email" label="Email: " rules={[
            {required: true, message: "Please enter your email"},
            {type: "email", message: "Please enter a valid email"}
          ]}
          hasFeedback>
            <Input placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
          </Form.Item>
          <Form.Item name="password" label="Password: " rules={[
            {required: true},
            {min:6}
          ]}
          hasFeedback>
            <Input.Password placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Item>
          <Form.Item name="confirmPassword" label="Confirm Password: "
          dependencies={['password']} 
          rules={[
            {required: true},
            ({getFieldValue})=>({
              validator(_,value){
                if(!value || getFieldValue('password') === value){
                  return Promise.resolve()
                }
                return Promise.reject('The two passwords that you entered does not match.');
              }
            })
          ]}
          hasFeedback>
            <Input.Password placeholder="Enter your confirm password" />
          </Form.Item>
          <Form.Item name="address" label="Address: ">
            <Input placeholder="Enter home address" onChange={(e) => setAddress(e.target.value)}/>
          </Form.Item>
          <Form.Item label="Upload: " valuePropName="fileList" getValueFromEvent={normFile}>
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor: '#21252c', color: 'white'}} type="primary" htmlType="submit">Register</Button>
            <Button style={{marginLeft: 10, backgroundColor: '#21252c', color: 'white'}} type="primary" onClick={navigateToHome}>Back to LogIn</Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Signup;
