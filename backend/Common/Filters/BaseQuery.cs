namespace backend.Common.Filters;

public class BaseQuery : IFilterOptions
{
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 20;

}


