using System;
using System.IO;
using System.Text;
using System.Xml.Serialization;
using FacturanteMVC.API;
using FacturanteMVC.API.DTOs;

namespace APIExample_NET
{
    public partial class ListadoComprobantes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ComprobantesClient comprobanteClient = new ComprobantesClient();

            ListadoComprobantesRequest request = new ListadoComprobantesRequest();
            request.Autenticacion = new Autenticacion();
            request.Autenticacion.Usuario = "[usuario]";
            request.Autenticacion.Hash = "[contraseña]";
            request.Autenticacion.Empresa = 0; //[Identificador de la empresa a la que pertenece el usuario]
            request.FechaDesde = new DateTime(2014, 11, 19);
            request.FechaHasta = new DateTime(2014, 11, 20);

            ListadoComprobantesResponse response = comprobanteClient.ListadoComprobantes(request);

            txtResult.Text = this.ObjectToXml<ListadoComprobantesResponse>(response);

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