import { Field, Form, Formik, FormikHelpers } from "formik";
import { NavLink } from "react-router-dom";
import * as Yup from 'yup';
import SvgComponent from "../../assets/Login-Icon";
import PasswordIcon from "../../assets/PasswordIcon";
import UsernameIcon from "../../assets/Username-Icon";
import { credencialesUsuario } from "../../Models/auth.model";
import Button from "../../utils/Button";
import makers from "../../assets/makers.jpg"
import "./Login.css"



export default function FormularioAuth(props: formularioAuthProps) {
    return (
        <Formik initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                nombre: Yup.string().required("Este campo es requerido"),
                password: Yup.string().required("Este campo es requerido")

            })}>
            {formikProps => (
                <Form>
                    <div className="container w-75 bgColor mt-5 rounded shadow">
                        <div className="row">
                            <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"></div>
                            <div className="col p-5 rounded-end">
                                <div className="text-end" style={{ marginLeft: '270px' }}>
                                    <img src={makers} width="48px" />
                                </div>
                                <h2 className="fw-bold text-center py-5">Iniciar Sesion</h2>
                                <div className="mb-4">
                                    <div className="input-group mt-4">
                                        <div className="input-group-text bg-transparent" style={{ borderRadius: '20px', marginRight: '5px', marginLeft: '-5px' }}>
                                            <UsernameIcon />
                                        </div>
                                        <Field className="form-control bg-transparent" style={{ borderRadius: '5px' }} name="nombre" type="text" placeholder="Username" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="input-group mt-1">
                                        <div className="input-group-text bg-transparent" style={{ borderRadius: '20px', marginRight: '5px', marginLeft: '-5px' }}>
                                            <PasswordIcon />
                                        </div>
                                        <Field className="form-control bg-transparent" style={{ borderRadius: '5px' }} name="password" type="password" placeholder="Password" />
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <Button disabled={formikProps.isSubmitting} className="btn btn-primary" style={{ marginTop: '1rem', width: '320px', marginBottom: '0.2rem' }} type="submit">Iniciar Sesion</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="bg-white p-5 rounded-5 text-secondary shadow" style={{ width: '25rem', marginLeft:'35rem', marginTop:'10rem', borderRadius:'40px' }}>
                        <div className="d-flex justify-content-center" style={{marginTop:'-10px'}}>
                            <SvgComponent/>
                        </div>
                        <h3 className="text-center fs-1 fw-bold">{props.tipo}</h3>
                        <div className="input-group mt-4">
                            <div className="input-group-text bg-info" style={{borderRadius:'20px', marginRight:'5px', marginLeft:'-5px'}}>
                                <UsernameIcon/>
                            </div>
                            <Field className="form-control bg-light" name="nombre" type="text" placeholder="Username" />
                        </div>
                        <div className="input-group mt-1">
                            <div className="input-group-text bg-info" style={{borderRadius:'20px', marginRight:'5px', marginLeft:'-5px'}}>
                                <PasswordIcon/>
                            </div>
                            <Field className="form-control bg-light" name="password" type="password" placeholder="Password" />
                        </div>
                        <Button disabled={formikProps.isSubmitting} className="btn btn-info text-white w-100 mt-4 fw-semibold shadow-sm" style={{marginTop:'1rem', width:'310px', marginBottom:'0.2rem'}} type="submit">Enviar</Button>
                        <div className="d-flex gap-1 justify-content-center mt-1">
                            <NavLink to="/registro" className="text-decoration-none text-info fw-semibold">Registrarse</NavLink>
                        </div>
                    </div> */}
                </Form>
            )}
        </Formik>
    )
}

interface formularioAuthProps {
    modelo: credencialesUsuario;
    onSubmit(valores: credencialesUsuario, acciones: FormikHelpers<credencialesUsuario>): void;
    tipo: string;
}