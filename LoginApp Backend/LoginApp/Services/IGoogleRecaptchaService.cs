using LoginApp.Models;

namespace LoginApp.Captcha
{
    public interface IGoogleRecaptchaService
    {
        Task<RecaptchaVerificationResult> VerifyToken(string token);
    }
}
