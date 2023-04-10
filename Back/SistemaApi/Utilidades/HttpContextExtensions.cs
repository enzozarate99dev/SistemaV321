using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;

namespace SistemaApi.Utilidades
{
    public static class HttpContextExtensions
    {
        public async static Task InsertarParametrosPaginacionEnCabecera<T>(this HttpContext httpContext,
            IQueryable<T> queryable)
        {
            if (httpContext == null) { throw new ArgumentNullException(nameof(httpContext)); }

            double cantidad = await queryable.CountAsync();
            httpContext.Response.Headers.Add("cantidadtotalregistros", cantidad.ToString());
        }
    }
}
/*public async Task<PaginationResponse<IndicatorResponse>> GetAll(GetAllIndicatorRequest request)
{
    var query = _context.Indicators
      .Where(x => x.SearchFilter.Equals(request.SearchFilter))
      .Where(x => x.Name.Equals(request.Name) || string.IsNullOrEmpty(request.Name));

    List<Indicator> entities = await query.ToListAsync();
    var paginatedEntities = entities.Paginate(request.Page, request.PageSize);
    int entitiesCount = entities.Count;
    int totalPages = (int)Math.Ceiling((double)entitiesCount / request.PageSize);

    return new PaginationResponse<IndicatorResponse>()
    {
        Page = request.Page,
        PageSize = request.PageSize,
        Total = entitiesCount,
        TotalPages = totalPages,
        Content = _mapper.Map<List<IndicatorResponse>>(paginatedEntities)
    };
}

namespace DashboardApi.Contract.DTOs.Indicator.Response;

public class IndicatorResponse : IndicatorDTO
{
    public int Id { get; set; }
}

using DashboardApi.Contract.Enums;
using System.ComponentModel.DataAnnotations;

namespace DashboardApi.Contract.DTOs.Indicator;

public class IndicatorDTO
{
    [Required]
    public string Name { get; set; }
    [Required]
    public string Unit { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public bool SearchFilter { get; set; }
    [Required]
    public IndicatorType Type { get; set; }
    [Required]
    public int SearchFilterId { get; set; }
    [Required]
    public int SearchFilterSource { get; set; }
}*/