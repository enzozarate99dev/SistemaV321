import 'antd/dist/reset.css';
import { Layout, Card, Menu, Breadcrumb, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import SubMenu from 'antd/lib/menu/SubMenu';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts"
import * as ventasServices from "../Ventas/Services/ventas.services"
import { AxiosResponse } from 'axios';
import Button from '../utils/Button';


export default function HomePage() {
    const [data, setData] = useState<number[]>([])
    const [dataSemanal, setDataSemanal] = useState<chartSemanal[]>([])

    const { Header, Footer, Sider, Content } = Layout;

    useEffect(() => {
        const res = ventasServices.chart()
        res.then((resp: AxiosResponse<number[]>) => {
            setData(resp.data)
        })
    }, [])

    useEffect(() => {
        const res = ventasServices.chartSemanal()
        res.then((resp: AxiosResponse<chartSemanal[]>) => {
            setDataSemanal(resp.data)
        })
    }, [])

    function getCategories(): string[] {
        var array: string[] = []
        dataSemanal.map((dato, index) => array[index] = dato.dia)
        return array
    }

    function getDatos(): number[] {
        var array: number[] = []
        dataSemanal.map((dato, index) => array[index] = dato.cantidad)
        return array
    }

    const opt = {
        options: {
            chart: {
                id: "bar"
            },
            xaxis: {
                categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            }
        },
        series: [
            {
                name: "Mensual",
                data: data
            }
        ]
    }

    const optSemanal = {
        options: {
            chart: {
                id: "bar"
            },
            xaxis: {
                categories: getCategories(),
            }
        },
        series: [
            {
                name: "Semanal",
                data: getDatos()
            }
        ]
    }

    return (
        <Layout style={{ height: '850px', marginTop: '20px', width: '1860px', marginLeft: '-370px', background: 'transparent' }}>
            <Layout style={{ height: '850px', marginTop: '20px', width: '1860px', background: 'transparent' }}>
                <Content style={{ padding: '0 50px' }}>
                    <Tabs>
                        <Tabs.TabPane tab="Mensual" key="item-1">
                            <Card title="Ventas Mensuales" bordered style={{ width: 800, height: 450, float: 'left', margin: 10 }} >
                                <Chart type='bar' width={750} height={350} options={opt.options} series={opt.series} />
                            </Card>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Semanal" key="item-2">
                            <Card title="Ultimos 7 días" bordered style={{ width: 800, height: 450, float: 'left', margin: 10 }} >
                                <Chart type='line' width={750} height={350} options={optSemanal.options} series={optSemanal.series} />
                            </Card>
                        </Tabs.TabPane>
                        <Card title="Ultimos 7 días" bordered style={{ width: 800, height: 450, float: 'right', margin: 10 }} >
                            <Chart type='line' width={750} height={350} options={optSemanal.options} series={optSemanal.series} />
                        </Card>
                    </Tabs>
                </Content>
            </Layout>
        </Layout>
    )
}

interface chartSemanal {
    dia: string;
    cantidad: number;
}