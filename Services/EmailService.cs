using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using kpi_learning.Models;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Options;

namespace kpi_learning.Services
{
    public class EmailService : IEmailSender
    {
        private readonly SmtpConfigModel _config;
        public EmailService(IOptions<SmtpConfigModel> config)
        {
            _config = config.Value;
        }
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            var client = new SmtpClient(_config.Host)
            {
                Port = _config.Port,
                EnableSsl = _config.UseSSL,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_config.Username, _config.Password),
            };
            var mailMessage = new MailMessage
            {
                From = new MailAddress("account-security-noreply@gmail.com")
            };
            mailMessage.IsBodyHtml = true; 
            mailMessage.To.Add(email);
            mailMessage.Subject = subject;
            mailMessage.Body = htmlMessage;
            return client.SendMailAsync(mailMessage);
        }
    }
}