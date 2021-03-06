/* eslint-disable no-sequences */
import { Facebook, GitHub } from '@material-ui/icons';
import { Checkbox, Input, Button, Form } from 'antd';
import React, { useEffect, useState } from 'react';
import db, { auth } from '../../Firebase/index';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [repasswod, setRepassword] = useState('');
    const [check, setCheck] = useState(false);
    const history = useHistory();

    const handleSigup = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return (
                    db.collection('users').add({
                        displayName: name,
                        email: email,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        uid: authUser.user.uid,
                        notification: []
                    }),
                    authUser.user.updateProfile({
                        displayName: name,
                    }),
                    onFinish()

                )
            }).catch((e) => console.error(e.message));
    }

    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser)
                history.push('/');
        })
    }, [history])

    const onFinish = () => {
        setTimeout(() => {
            history.push('/');
        }, 200)
    };

    const onFinishFailed = (errorInfo) => {
        alert('Failed:', errorInfo);
    };
    return (
        <div className="register">
            <img className="logo" width="120px" src="https://accounts.viblo.asia/assets/webpack/logo.fbfe575.svg" alt="logo" />

            <Form
                className="form__register"
                name="register"
                onFinish={handleSigup}
                onFinishFailed={onFinishFailed}
            >
                <div className="subTitle">
                    <h2>????ng k?? t??i kho???n cho Viblo</h2>
                    <h4>
                        Ch??o m???ng b???n ?????n <strong> N???n t???ng Viblo!</strong> Tham gia c??ng ch??ng t??i ????? t??m ki???m th??ng tin h???u ??ch c???n thi???t ????? c???i thi???n k??? n??ng IT c???a b???n. Vui l??ng ??i???n th??ng tin c???a b???n v??o bi???u m???u b??n d?????i ????? ti???p t???c.
                    </h4>
                </div>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "T??n l?? b???t bu???c!"
                        }
                    ]}
                >
                    <Input value={name} onChange={(e) => setName(e.target.value)} className="input__register" placeholder="T??n c???a b???n" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Email l?? tr?????ng b???t bu???c!"
                        }
                    ]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} className="input__register" placeholder="?????a ch??? email c???a b???n" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={
                        [
                            {
                                required: true,
                                message: "password l?? b???t bu???c!"
                            }

                        ]
                    }
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} className="input__register" placeholder="M???t kh???u c???a b???n" />
                </Form.Item>
                <Form.Item
                    name="re-password"
                    rules={
                        [
                            {
                                required: true,
                                message: "re-password l?? b???t bu???c!"
                            }

                        ]
                    }
                >
                    <Input.Password value={repasswod} onChange={(e) => setRepassword(e.target.value)} className="input__register" placeholder="Nh???p m???t kh???u c???a b???n" />
                </Form.Item>
                <Form.Item
                    name="check"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error("Vui l??ng ?????ng ?? v???i ??i???u kho???n c???a ch??ng t??i!")),

                        },
                    ]}

                >
                    <Checkbox value={check} onChange={() => setCheck(!check)} >T??i ?????ng ?? <span>??i???u kho???n c???a d???ch v???</span></Checkbox>
                </Form.Item>
                <Form.Item >
                    <Button className="button__submit" disabled={!check} type="primary" htmlType="submit">????ng k??</Button>
                </Form.Item>
                <Form.Item className="login__social">
                    <h3 className="title">????ng nh???p b???ng</h3>
                    <div className="login__social--item">
                        <Button icon={<Facebook />} type="default">Facebook</Button>
                        <Button icon={<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                            alt="icon" width="20px" />} type="default">Google</Button>
                        <Button icon={<GitHub />} type="default">Github</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register
