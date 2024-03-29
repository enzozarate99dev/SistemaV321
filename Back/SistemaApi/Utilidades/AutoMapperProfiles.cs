﻿using AutoMapper;
using SistemaApi.DTOs;
using SistemaApi.Entidades;

namespace SistemaApi.Utilidades
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Producto, ProductoDTO>().ReverseMap();
            CreateMap<ProductoCreacionDTO, Producto>()
                .ForMember(x => x.Foto, options => options.Ignore());

            CreateMap<VentaCreacionDTO, Venta>()
                .ForMember(x => x.VentaProducto, opciones => opciones.MapFrom(MapearVentaProducto));
            CreateMap<Venta, VentaDTO>()
                .ForMember(x => x.Productos, options => options.MapFrom(MapearVentaProducto));

            CreateMap<VentaCreacionCFDTO, VentaConsumidorFinal>()
                .ForMember(x => x.VentaCFProducto, opciones => opciones.MapFrom(MapearVentaCFProducto));
            CreateMap<VentaConsumidorFinal, VentaConsumidorFinalDTO>()
                .ForMember(x => x.Productos, o => o.MapFrom(MapearVentaCFProducto));

            CreateMap<ClienteCreacionDTO, ClienteEntidad>();
            CreateMap<ClienteEntidad, ClienteDTO>().ReverseMap();

            CreateMap<ProveedorCreacionDTO, Proveedor>();
            CreateMap<Proveedor, ProveedorDTO>().ReverseMap();

            CreateMap<CompraCreacionDTO, Compra>()
                .ForMember(x => x.CompraProducto, o => o.MapFrom(MapearCompraProducto));
            CreateMap<Compra, CompraDTO>()
                .ForMember(x => x.Productos, o => o.MapFrom(MapearCompraProducto));

            CreateMap<PresupuestoCreacionDTO, Presupuestos>()
                .ForMember(x => x.PresupuestoProducto, o => o.MapFrom(MapearPresupuestoProducto));
            CreateMap<Presupuestos, PresupuestosDTO>()
                .ForMember(x => x.Productos, o => o.MapFrom(MapearPresupuestoProducto));
        }

        private List<ProductoDTO> MapearCompraProducto(Compra compra, CompraDTO compraDTO)
        {
            var resultado = new List<ProductoDTO>();

            if (compra.CompraProducto != null)
            {
                foreach (var producto in compra.CompraProducto)
                {
                    resultado.Add(new ProductoDTO()
                    {
                        Id = producto.Producto.Id,
                        Nombre = producto.Producto.Nombre,
                        Cantidad = producto.Unidades,
                        Precio = producto.Producto.Precio,
                        Categoria = producto.Producto.Categoria,
                        Codigo = producto.Producto.Codigo,
                        Descripcion = producto.Producto.Descripcion
                    });
                }
            }

            return resultado;
        }

        private List<CompraProducto> MapearCompraProducto(CompraCreacionDTO compraCreacionDTO,
                Compra compras)
        {
            var resultado = new List<CompraProducto>();

            if (compraCreacionDTO.ProductosIds == null) { return resultado; }


            foreach (var tuple in compraCreacionDTO.ProductosIds)
            {
                resultado.Add(new CompraProducto() { ProductoId = tuple[0], Unidades = tuple[1] });
            }

            return resultado;
        }

        private List<ProductoDTO> MapearPresupuestoProducto(Presupuestos presupuestos, PresupuestosDTO presupuestosDTO)
        {
            var resultado = new List<ProductoDTO>();

            if (presupuestos.PresupuestoProducto != null)
            {
                foreach (var producto in presupuestos.PresupuestoProducto)
                {
                    resultado.Add(new ProductoDTO()
                    {
                        Id = producto.Producto.Id,
                        Nombre = producto.Producto.Nombre,
                        Cantidad = producto.Unidades,
                        Precio = producto.Producto.Precio,
                        Categoria = producto.Producto.Categoria,
                        Codigo = producto.Producto.Codigo,
                        Descripcion = producto.Producto.Descripcion
                    });
                }
            }

            return resultado;
        }

        private List<PresupuestoProducto> MapearPresupuestoProducto(PresupuestoCreacionDTO presupuestoCreacionDTO,
                Presupuestos presupuestos)
        {
            var resultado = new List<PresupuestoProducto>();

            if (presupuestoCreacionDTO.ProductosIds == null) { return resultado; }


            foreach (var tuple in presupuestoCreacionDTO.ProductosIds)
            {
                resultado.Add(new PresupuestoProducto() { ProductoId = tuple[0], Unidades = tuple[1] });
            }

            return resultado;
        }

        private List<ProductoDTO> MapearVentaCFProducto(VentaConsumidorFinal ventaConsumidorFinal, VentaConsumidorFinalDTO ventaConsumidorFinalDTO)
        {
            var resultado = new List<ProductoDTO>();

            if (ventaConsumidorFinal.VentaCFProducto != null)
            {
                foreach (var producto in ventaConsumidorFinal.VentaCFProducto)
                {
                    resultado.Add(new ProductoDTO()
                    {
                        Id = producto.Producto.Id,
                        Nombre = producto.Producto.Nombre,
                        Cantidad = producto.Unidades,
                        Precio = producto.Producto.Precio,
                        Categoria = producto.Producto.Categoria,
                        Codigo = producto.Producto.Codigo,
                        Descripcion = producto.Producto.Descripcion
                    });
                }
            }

            return resultado;
        }

        private List<VentaCFProducto> MapearVentaCFProducto(VentaCreacionCFDTO ventaCreacionCFDTO,
                VentaConsumidorFinal ventaConsumidorFinal)
        {
            var resultado = new List<VentaCFProducto>();

            if (ventaCreacionCFDTO.ProductosIds == null) { return resultado; }


            foreach (var tuple in ventaCreacionCFDTO.ProductosIds)
            {
                resultado.Add(new VentaCFProducto() { ProductoId = tuple[0], Unidades = tuple[1] });
            }

            return resultado;
        }

        private List<VentaProducto> MapearVentaProducto(VentaCreacionDTO ventaCreacionDTO,
                Venta venta)
        {
            var resultado = new List<VentaProducto>();

            if (ventaCreacionDTO.ProductosIds == null) { return resultado; }


            foreach (var tuple in ventaCreacionDTO.ProductosIds)
            {
                resultado.Add(new VentaProducto() { ProductoId = tuple[0], Unidades = tuple[1] });
            }

            return resultado;
        }

        private List<ProductoDTO> MapearVentaProducto(Venta venta, VentaDTO ventaDTO)
        {
            var resultado = new List<ProductoDTO>();

            if (venta.VentaProducto != null)
            {
                foreach (var producto in venta.VentaProducto)
                {
                    resultado.Add(new ProductoDTO()
                    {
                        Id = producto.Producto.Id,
                        Nombre = producto.Producto.Nombre,
                        Cantidad = producto.Unidades,
                        Precio = producto.Producto.Precio,
                        Categoria = producto.Producto.Categoria,
                        Codigo = producto.Producto.Codigo,
                        Descripcion = producto.Producto.Descripcion
                    });
                }
            }

            return resultado;
        }
    }
}
