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

var ThreeHOutputCachePolicy = "ThreeHOutputCachePolicy";
builder.Services.AddOutputCache(options =>{
    options.AddPolicy(ThreeHOutputCachePolicy, builder => builder.Expire(TimeSpan.FromSeconds( RtInk.Constants.ThreeHInSecForCache)));
});

// -- app

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}

var IsDebug = true;

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    IsDebug = false;
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
        if(fileName.EndsWith(".png")) ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=" + RtInk.Constants.ThirtyDInSecForCache);
        else ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=" + RtInk.Constants.ThreeHInSecForCache);
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

// -- Alga.wwwcore

var www = new Root(new ConfigM(
    IsDebug: IsDebug,
    Url: RtInk.Constants.Url,
    Name: "RT Dev - Application",
    NameShort: "RT Dev",
    Description: "",
    GoogleFontsUrl: "https://fonts.googleapis.com/css2?family=Audiowide&family=Montserrat:wght@500;600;700&family=Nunito:wght@500;700&Mulish:wght@500&display=swap",
    CacheControlInSDefault: RtInk.Constants.ThreeHInSecForCache
), loggerFactory);

// -- endpoints: based on activities

app.MapGet("/", async (context) => { 
    await www.SendAsync(context, "Index"); 
}).CacheOutput(ThreeHOutputCachePolicy);

// -- endpoints: other

// -- run

app.Run();
