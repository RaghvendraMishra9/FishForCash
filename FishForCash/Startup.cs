using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using FishForCash.Business.Intrastructure;
using FishForCash.Repository.DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using FishForCash.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Logging;
using System;
using Microsoft.AspNetCore.Http;

namespace FishForCash.Web
{
    public class Startup
    {
      
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
   
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {                      
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddDistributedMemoryCache(); // Adds a default in-memory implementation of IDistributedCache
            services.AddSession();
            //services.AddSession(options =>
            //{           
            //    options.IdleTimeout = TimeSpan.FromMinutes(1);
            //});
            services.AddMvc().AddSessionStateTempDataProvider(); 
            services.AddSingleton<IConfiguration>(Configuration);
            //services.AddScoped<MXEntities>(_ => 
            //new MXEntities());
            //services.AddDbContext<MXEntities>(options => 
            //options.UseSqlServer(Configuration.GetConnectionString("MXEntities")));
            Helpers.AppSettings.Load(Configuration);
            services.AddDbContext<ApplicationDbContext>(options =>
                  options.UseSqlServer(Configuration.GetConnectionString("MXEntities")));

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
            //    options.DefaultChallengeScheme = CookieAuthenticationDefaults.AuthenticationScheme;

            //}).AddCookie(options => { options.LoginPath = "/Login"; });
           
            //services.AddAuthentication("AdminScheme")
            //       .AddCookie("AdminScheme", options =>
            //       {
            //           options.AccessDeniedPath = new PathString("/Admin/Index");
            //           options.LoginPath = new PathString("/Admin/Login");

            //       });
            services.AddAuthentication("FiverSecurityScheme")
                   .AddCookie("FiverSecurityScheme", options =>
                   {
                       options.AccessDeniedPath = new PathString("/Home/Index");
                       options.LoginPath = new PathString("/Home/Index");

                   });
            services.AddMvc().AddRazorPagesOptions(options =>
            {
                options.Conventions.AuthorizeFolder("/");             
                options.Conventions.AllowAnonymousToPage("/Home/Index");
            });

            Bindings.AddBindings(services);
            Mapping.RegisterBusinessMap();


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
          
            app.UseStaticFiles();
            app.UseSession();
            app.UseCors(builder => builder.AllowAnyOrigin());
            app.UseAuthentication();
            app.UseCookiePolicy();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                  name: "areas",
                  template: "{area:exists}/{controller=Home}/{action=Index}/{id?}"
                );
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }
       
    }
}
