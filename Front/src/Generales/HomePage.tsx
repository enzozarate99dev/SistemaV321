import { Card, Layout, Tabs } from 'antd';
import 'antd/dist/reset.css';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Chart from "react-apexcharts";
import * as ventasServices from "../Ventas/Services/ventas.services";


export default function HomePage() {
    const [data, setData] = useState<number[]>([])
    const [dataSemanal, setDataSemanal] = useState<chartSemanal[]>([])
    const [dataA, setDataA] = useState<chartProducto[]>([])
    const [dataB, setDataB] = useState<chartProducto[]>([])
    const [dataC, setDataC] = useState<chartProducto[]>([])

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

    useEffect(() => {
        const res = ventasServices.chartProductos()
        res.then((resp: AxiosResponse<chartProducto[]>) => {
            const arrA = resp.data.filter(x=>x.categoria=='A')
            setDataA(arrA)
            const arrB = resp.data.filter(x=>x.categoria=='B')
            setDataB(arrB)
            const arrC = resp.data.filter(x=>x.categoria=='C')
            setDataC(arrC)
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

    function getLabels(nro: number): string[] {
        var array: string[] = []
        if(nro == 1){
            dataA.map((dato, index) => array[index] = dato.nombre)
        }else if(nro==2){
            dataB.map((dato, index) => array[index] = dato.nombre)
        }else{
            dataC.map((dato, index) => array[index] = dato.nombre)
        }   
        return array
    }
    
    function getData(nro: number):number[]{
        var array: number[] = []
        if(nro == 1){
            dataA.map((dato, index) => array[index] = dato.cantidad)
        }else if(nro==2){
            dataB.map((dato, index) => array[index] = dato.cantidad)
        }else{
            dataC.map((dato, index) => array[index] = dato.cantidad)
        }   
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
                <Content style={{ padding: '0 50px', width:'900px' }}>
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
                    </Tabs>
                </Content>
                <Content style={{ padding: '0 50px', width:'900px', marginLeft:'900px', marginBottom:'900px' }}>
                    <Tabs>
                        <Tabs.TabPane tab="Categoria A" key="item-1">
                            <Card title="Productos mas vendidos de la categoria A" bordered style={{ width: 800, height: 450, float: 'left', margin: 10 }} >
                                <Chart type="donut" width={750} height={350} options={{labels:getLabels(1)}} series={getData(1)} />
                            </Card>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Categoria B" key="item-2">
                            <Card title="Productos mas vendidos de la categoria B" bordered style={{ width: 800, height: 450, float: 'left', margin: 10 }} >
                                <Chart type="donut" width={750} height={350} options={{labels:getLabels(2)}} series={getData(2)} />
                            </Card>
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Categoria C" key="item-3">
                            <Card title="Productos mas vendidos de la categoria C" bordered style={{ width: 800, height: 450, float: 'left', margin: 10 }} >
                                <Chart type="donut" width={750} height={350} options={{labels:getLabels(3)}} series={getData(3)} />
                            </Card>
                        </Tabs.TabPane>
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

interface chartProducto {
    idProducto: number;
    cantidad: number;
    categoria: string;
    nombre: string;
}