import React, {useState, FC, useEffect} from 'react';
// @ts-ignore
import { connect } from 'react-redux'
import { getLogin, getLogout } from '../redux/actions'
// @ts-ignore
import { NavLink } from 'react-router-dom'
import { Button, Modal, Form, Input, Checkbox } from 'antd'

// @ts-ignore
const Layout: FC<any> = ({children, ...props}) => {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const onFinish = async (values: any) => {
		console.log('Success:', values);
		props.onLogin(values.username, values.password)
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	useEffect(()=>{
		if(props.isLogin === true) setIsModalVisible(false);
		console.log(props.isLogin, "props.isLogin")
	}, [props.isLogin])

	// @ts-ignore
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container">
				<NavLink to={'/'} className="navbar-brand">Trang Chủ</NavLink>
				<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<NavLink to={'/demo/1'} className="nav-item nav-link">Trang demo 1</NavLink>
						<NavLink to={'/demo'} className="nav-item nav-link">Trang demo 2</NavLink>
						{!props.isLogin && <a><Button onClick={showModal} type="primary">Login</Button></a>}
						{props.isLogin && <a><Button onClick={props.onLogout} type="primary">{props.data && props.data.name}</Button></a>}
					</div>
					<Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
						<Form
							name="basic"
							labelCol={{ span: 4 }}
							wrapperCol={{ span: 20 }}
							initialValues={{ remember: true }}
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							autoComplete="off"
						>
							<Form.Item
								label="Username"
								name="username"
								rules={[{ required: true, message: 'Please input your username!' }]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[{ required: true, message: 'Please input your password!' }]}
							>
								<Input.Password />
							</Form.Item>

							<Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 4, span: 20 }}>
								<Checkbox>Remember me</Checkbox>
							</Form.Item>

							<Form.Item wrapperCol={{ offset: 4, span: 20 }}>
								<Button type="primary" htmlType="submit">
									Submit
								</Button>
							</Form.Item>
						</Form>

					</Modal>
				</div>
				</div>
			</nav>
			<div className="container">
				{children}
			</div>
		</div>
	);
}

const mapStateToProps = (state: any) => {
	return {
		isLogin: state.reducerUser.isLogin,
		data: state.reducerUser.data
	}
}

const mapDispatchToProps = (dispatch: any) => {
	return {
		onLogin: (username: string, password: string) => {
			dispatch(getLogin(username, password))
		},
		onLogout: () => {
			dispatch(getLogout())
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

