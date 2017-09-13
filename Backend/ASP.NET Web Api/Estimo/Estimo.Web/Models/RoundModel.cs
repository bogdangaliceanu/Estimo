namespace Estimo.Web.Models
{
    public class NewRoundModel
    {
        public string Subject { get; set; }
    }

    public class FinishedRoundModel
    {
        public EstimationValue Consensus { get; set; }
    }
}