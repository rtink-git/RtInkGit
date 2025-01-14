using System.IO.Compression;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Http.Timeouts;
using Alga.wwwcore;

// -- builder

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<GzipCompressionProviderOptions>(options => { options.Level = CompressionLevel.Optimal; });
builder.Services.AddResponseCompression(options => { options.EnableForHttps = true; options.Providers.Add<GzipCompressionProvider>(); }); //options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat( new[] { "text/javascript", "text/css" });

var S5TimeoutPolicy = "S5TimeoutPolicy";
builder.Services.AddRequestTimeouts(options => {
      options.DefaultPolicy = new RequestTimeoutPolicy { 
        Timeout = TimeSpan.FromSeconds(20), 
        TimeoutStatusCode = 503
    };
    options.AddPolicy(S5TimeoutPolicy, TimeSpan.FromSeconds(5));
});

//var ThreeHOutputCachePolicy = "ThreeHOutputCachePolicy";
builder.Services.AddOutputCache(options =>{
    options.DefaultExpirationTimeSpan = TimeSpan.FromMinutes(RtInkGit.Constants.ThreeHInSecForCache);
    //options.AddPolicy(ThreeHOutputCachePolicy, builder => builder.Expire(TimeSpan.FromSeconds( RtInkGit.Constants.ThreeHInSecForCache)));
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddSingleton<Root>(sp => new Root(new ConfigM {
        Name= "RT Dev - Application",
        NameShort= "RT Git",
        Description= "",
        GoogleFontsUrl= "https://fonts.googleapis.com/css2?family=Audiowide&family=Montserrat:wght@500;600;700&family=Nunito:wght@500;700&Mulish:wght@500&display=swap",
        CacheControlInSDefault= RtInkGit.Constants.ThreeHInSecForCache,
        GoogleAnalyticsCode = "G-9M6YD44WE0",
        YandexMetrikaCode = "99212176"
    }, sp.GetRequiredService<IHttpContextAccessor>(), sp.GetRequiredService<ILoggerFactory>()
));

// -- app

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRequestTimeouts();
app.UseResponseCompression();
app.UseOutputCache();
app.UseStaticFiles(new StaticFileOptions { 
    OnPrepareResponse = ctx => { 
        var fileName = ctx.File.Name.ToLower();
        if(fileName.EndsWith(".png")) ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=" + RtInkGit.Constants.ThirtyDInSecForCache);
        else ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=" + RtInkGit.Constants.ThreeHInSecForCache);
    }
});

// -- LoggerFactory

var loggerFactory = LoggerFactory.Create(builder => {
    builder.AddConsole();
    builder.AddDebug();
    builder.SetMinimumLevel(LogLevel.Information);
});

var logger = loggerFactory.CreateLogger<Program>();
logger.LogInformation("RtInkGit project - started");


// -- endpoints: based on activities

app.MapGet("/", async (Root www) => { await www.SendAsync("Index"); });

// -- endpoints: other

// -- run

app.Run();
