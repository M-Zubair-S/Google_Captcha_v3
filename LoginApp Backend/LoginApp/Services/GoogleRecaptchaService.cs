using LoginApp.Models;
using Microsoft.Extensions.Options;
using System.Text.Json;

namespace LoginApp.Captcha
{
    public class GoogleRecaptchaService : IGoogleRecaptchaService
    {
        private readonly IOptions<GoogleRecaptchaSettings> _recaptchaSettings;
        private readonly HttpClient _httpClient;

        public GoogleRecaptchaService(IOptions<GoogleRecaptchaSettings> recaptchaSettings, IHttpClientFactory httpClientFactory)
        {
            _recaptchaSettings = recaptchaSettings;
            _httpClient = httpClientFactory.CreateClient();
        }

        public async Task<RecaptchaVerificationResult> VerifyToken(string token)
        {
            var secretKey = _recaptchaSettings.Value.SecretKey;

            var parameters = new Dictionary<string, string>
            {
                { "secret", secretKey },
                { "response", token }
            };

            var response = await _httpClient.PostAsync("https://www.google.com/recaptcha/api/siteverify", new FormUrlEncodedContent(parameters));
            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();

                var verificationResult = JsonSerializer.Deserialize<RecaptchaVerificationResult>(responseBody);
                return verificationResult;
            }

            // Handle unsuccessful response
            return null;
        }
    }
}
