namespace LoginApp.Models
{
    
    public class RecaptchaVerificationResult
{
        public bool success { get; set; }
        public DateTime challenge_ts { get; set; }
        public string hostname { get; set; }
        public double score { get; set; }
        public string action { get; set; }
    }


}
