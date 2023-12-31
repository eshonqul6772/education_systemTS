import {Input, Row, Col} from 'antd'
import {Formik} from 'formik';
import * as Yup from 'yup';


const schema = Yup.object().shape({
    email: Yup.string()
        .required('Email is a required field')
        .email('Invalid email format'),
    password: Yup.string()
        .required('Password is a required field')
        .min(8, 'Password must be at least 8 characters'),
});

function Support() {
    return (
        <Row  gutter={16}>
          <Col span={6}>
              <>
                  <Formik
                      validationSchema={schema}
                      initialValues={{email: '', password: ''}}
                      onSubmit={(values) => {
                          alert(JSON.stringify(values));
                      }}
                  >
                      {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        }) => (
                          <div className="login">
                              <div className="form">
                                  <form noValidate onSubmit={handleSubmit}>
                                      <span>Login</span>
                                      <Input
                                          type="email"
                                          name="email"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.email}
                                          placeholder="Enter email id / username"
                                          className="form-control inp_text"
                                          id="email"
                                      />
                                      <p className="error">
                                          {errors.email && touched.email && errors.email}
                                      </p>
                                      <Input
                                          type="password"
                                          name="password"
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                          value={values.password}
                                          placeholder="Enter password"
                                          className="form-control"
                                      />
                                      <p className="error">
                                          {errors.password && touched.password && errors.password}
                                      </p>
                                      <button type="submit">Login</button>
                                  </form>
                              </div>
                          </div>
                      )}
                  </Formik>
              </>
          </Col>index
        </Row>
    );
}

export default Support;