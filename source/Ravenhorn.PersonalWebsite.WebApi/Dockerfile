FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["source/Ravenhorn.PersonalWebsite.WebApi/Ravenhorn.PersonalWebsite.WebApi.csproj", "source/Ravenhorn.PersonalWebsite.WebApi/"]
COPY ["source/Ravenhorn.PersonalWebsite.DependencyInjection/Ravenhorn.PersonalWebsite.DependencyInjection.csproj", "source/Ravenhorn.PersonalWebsite.DependencyInjection/"]
COPY ["source/Ravenhorn.PersonalWebsite.Application/Ravenhorn.PersonalWebsite.Application.csproj", "source/Ravenhorn.PersonalWebsite.Application/"]
COPY ["source/Ravenhorn.PersonalWebsite.Infrastructure/Ravenhorn.PersonalWebsite.Infrastructure.csproj", "source/Ravenhorn.PersonalWebsite.Infrastructure/"]
RUN dotnet restore "source/Ravenhorn.PersonalWebsite.WebApi/Ravenhorn.PersonalWebsite.WebApi.csproj"
COPY . .
WORKDIR "/src/source/Ravenhorn.PersonalWebsite.WebApi"
RUN dotnet build "Ravenhorn.PersonalWebsite.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Ravenhorn.PersonalWebsite.WebApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
#ENTRYPOINT ["dotnet", "Ravenhorn.PersonalWebsite.WebApi.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet Ravenhorn.PersonalWebsite.WebApi.dll
