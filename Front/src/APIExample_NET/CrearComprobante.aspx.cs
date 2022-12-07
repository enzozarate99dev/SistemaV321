using System;
using System.IO;
using System.Text;
using System.Xml.Serialization;
using FacturanteMVC.API;
using FacturanteMVC.API.DTOs;
using System.Collections.Generic;

namespace APIExample_NET
{
    public partial class CrearComprobante : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ComprobantesClient comprobanteClient = new ComprobantesClient();

            CrearComprobanteRequest request = new CrearComprobanteRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "[usuario]";
            request.Autenticacion.Hash = "[contraseña]";
            request.Autenticacion.Empresa = 0; //[Identificador de la empresa a la que pertenece el usuario]

            request.Cliente = new Cliente();
            request.Cliente.CodigoPostal = "7600";
            request.Cliente.CondicionPago = 1;
            request.Cliente.Contacto = "Juan Perez";
            request.Cliente.DireccionFiscal = "Calle 1234";
            request.Cliente.EnviarComprobante = true;
            request.Cliente.Localidad = "Mar del Plata";
            request.Cliente.MailContacto = "prueba@prueba.com";
            request.Cliente.MailFacturacion = "prueba@prueba.com";
            request.Cliente.NroDocumento = "12345678";
            request.Cliente.PercibeIIBB = false;
            request.Cliente.PercibeIVA = false;
            request.Cliente.Provincia = "Buenos Aires";
            request.Cliente.RazonSocial = "Juan Perez";
            request.Cliente.Telefono = "5521111";
            request.Cliente.TipoDocumento = 1;
            request.Cliente.TratamientoImpositivo = 3;

            request.Encabezado = new ComprobanteEncabezado();
            request.Encabezado.Bienes = 2;
            request.Encabezado.CondicionVenta = 1;
            request.Encabezado.EnviarComprobante = true;
            request.Encabezado.FechaHora = new DateTime(2015, 09, 30);
            request.Encabezado.FechaServDesde = new DateTime(2015, 09, 30);
            request.Encabezado.FechaServHasta = new DateTime(2015, 10, 05);
            request.Encabezado.FechaVtoPago = new DateTime(2015, 10, 05);
            request.Encabezado.ImporteImpuestosInternos = 0;
            request.Encabezado.ImportePercepcionesMunic = 0;
            request.Encabezado.Moneda = 2;
            request.Encabezado.Observaciones = "";
            request.Encabezado.OrdenCompra = "";
            request.Encabezado.PercepcionIIBB = 0;
            request.Encabezado.PercepcionIVA = 0;
            request.Encabezado.PorcentajeIIBB = 0;
            request.Encabezado.Prefijo = "0002";
            request.Encabezado.Remito = "";
            request.Encabezado.SubTotal = (decimal)664.46;
            request.Encabezado.SubTotalExcento = 0;
            request.Encabezado.SubTotalNoAlcanzado = 0;
            request.Encabezado.TipoComprobante = "FB";
            request.Encabezado.TipoDeCambio = 1;
            request.Encabezado.Total = 804;
            request.Encabezado.TotalConDescuento = 0;
            request.Encabezado.TotalNeto = (decimal)664.46;

            request.Items = new ComprobanteItem[3];

            request.Items[0] = new ComprobanteItem();
            request.Items[0].Bonificacion = 0;
            request.Items[0].Cantidad = 1;
            request.Items[0].Codigo = "CODPROD";
            request.Items[0].Detalle = "Producto Uno";
            request.Items[0].Gravado = true;
            request.Items[0].IVA = 21;
            request.Items[0].PrecioUnitario = 100;
            request.Items[0].Total = 121;

            request.Items[1] = new ComprobanteItem();
            request.Items[1].Bonificacion = 0;
            request.Items[1].Cantidad = 1;
            request.Items[1].Codigo = "CODPROD2";
            request.Items[1].Detalle = "Producto Dos";
            request.Items[1].Gravado = true;
            request.Items[1].IVA = 21;
            request.Items[1].PrecioUnitario = (decimal)164.46;
            request.Items[1].Total = 199;

            request.Items[2] = new ComprobanteItem();
            request.Items[2].Bonificacion = 0;
            request.Items[2].Cantidad = 2;
            request.Items[2].Codigo = "CODPROD3";
            request.Items[2].Detalle = "Producto Tres";
            request.Items[2].Gravado = true;
            request.Items[2].IVA = 21;
            request.Items[2].PrecioUnitario = 200;
            request.Items[2].Total = 484;

            CrearComprobanteResponse response = comprobanteClient.CrearComprobante(request);

            txtResult.Text = this.ObjectToXml<CrearComprobanteResponse>(response);

        }

        private string ObjectToXml<T>(T objectToSerialise)
        {
            StringWriter Output = new StringWriter(new StringBuilder());
            XmlSerializer xs = new XmlSerializer(objectToSerialise.GetType());
            XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
            ns.Add("fac", "http://www.facturante.com.API");
            xs.Serialize(Output, objectToSerialise, ns);
            return Output.ToString();
        }
    }
}