import { useState } from "react";
import { createReport } from "../services/reportService";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TranslatedText } from "@/components/TranslatedText";
import { FileText, MapPin, AlertCircle, Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { PageHeader } from "@/components/layout/PageHeader";

export default function ReportForm() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !location || !description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await createReport({ title, location, description, type, priority });
      setSubmitted(true);
      toast({
        title: "Report Submitted",
        description: "Your safety report has been submitted successfully.",
      });
      // Reset form after 2 seconds
      setTimeout(() => {
        setTitle("");
        setLocation("");
        setDescription("");
        setType("");
        setPriority("");
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.msg || "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout
      title={{
        en: "Submit Incident Report",
        hi: "घटना रिपोर्ट जमा करें",
        pa: "ਘਟਨਾ ਰਿਪੋਰਟ ਜਮ੍ਹਾ ਕਰੋ",
      }}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <PageHeader
          title={{
            en: "Submit Incident Report",
            hi: "घटना रिपोर्ट जमा करें",
            pa: "ਘਟਨਾ ਰਿਪੋਰਟ ਜਮ੍ਹਾ ਕਰੋ",
          }}
          description={{
            en: "Document safety incidents, hazards, or concerns so response teams can act fast.",
            hi: "सुरक्षा घटनाओं, खतरों या चिंताओं को दस्तावेज़ित करें ताकि प्रतिक्रिया टीमें तेजी से कार्रवाई कर सकें।",
            pa: "ਸੁਰੱਖਿਆ ਘਟਨਾਵਾਂ, ਖ਼ਤਰਿਆਂ ਜਾਂ ਚਿੰਤਾਵਾਂ ਦਾ ਦਸਤਾਵੇਜ਼ ਬਣਾਓ ਤਾਂ ਕਿ ਜਵਾਬੀ ਟੀਮਾਂ ਤੁਰੰਤ ਕਾਰਵਾਈ ਕਰ ਸਕਣ।",
          }}
          badge={{
            en: "Trusted channel",
            hi: "विश्वसनीय चैनल",
            pa: "ਭਰੋਸੇਮੰਦ ਚੈਨਲ",
          }}
          icon={<FileText className="h-6 w-6" />}
          highlights={[
            {
              label: { en: "Avg. review time", hi: "औसत समीक्षा समय", pa: "ਔਸਤ ਸਮੀਖਿਆ ਸਮਾਂ" },
              value: "2h 15m",
              helper: "Safety desk response",
            },
            {
              label: { en: "Escalation rate", hi: "एस्केलेशन दर", pa: "ਏਸਕੇਲੇਸ਼ਨ ਦਰ" },
              value: "8%",
              helper: "Requiring on-site support",
            },
            {
              label: { en: "Reports this month", hi: "इस महीने रिपोर्ट", pa: "ਇਸ ਮਹੀਨੇ ਦੀਆਂ ਰਿਪੋਰਟਾਂ" },
              value: "34",
              helper: "Campus-wide",
            },
          ]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-panel border-white/60">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl">
                    <TranslatedText
                      en="Safety Incident Report"
                      hi="सुरक्षा घटना रिपोर्ट"
                      pa="ਸੁਰੱਖਿਆ ਘਟਨਾ ਰਿਪੋਰਟ"
                    />
                  </CardTitle>
                  <CardDescription className="mt-1">
                    <TranslatedText
                      en="Report safety incidents, hazards, or concerns to help maintain a safe environment"
                      hi="सुरक्षित वातावरण बनाए रखने में मदद के लिए सुरक्षा घटनाओं, खतरों या चिंताओं की रिपोर्ट करें"
                      pa="ਸੁਰੱਖਿਤ ਵਾਤਾਵਰਣ ਬਣਾਈ ਰੱਖਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਸੁਰੱਖਿਆ ਘਟਨਾਵਾਂ, ਖ਼ਤਰਿਆਂ ਜਾਂ ਚਿੰਤਾਵਾਂ ਦੀ ਰਿਪੋਰਟ ਕਰੋ"
                    />
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12"
                >
                  <div className="rounded-full bg-accent/10 p-4 mb-4">
                    <CheckCircle2 className="h-12 w-12 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    <TranslatedText
                      en="Report Submitted Successfully!"
                      hi="रिपोर्ट सफलतापूर्वक जमा की गई!"
                      pa="ਰਿਪੋਰਟ ਸਫਲਤਾਪੂਰਵਕ ਜਮ੍ਹਾ ਕੀਤੀ ਗਈ!"
                    />
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-sm">
                    <TranslatedText
                      en="Thank you for reporting. Our team will review your submission shortly."
                      hi="रिपोर्ट करने के लिए धन्यवाद। हमारी टीम जल्द ही आपके सबमिशन की समीक्षा करेगी।"
                      pa="ਰਿਪੋਰਟ ਕਰਨ ਲਈ ਧੰਨਵਾਦ। ਸਾਡੀ ਟੀਮ ਜਲਦੀ ਹੀ ਤੁਹਾਡੇ ਸਬਮਿਸ਼ਨ ਦੀ ਸਮੀਖਿਆ ਕਰੇਗੀ।"
                    />
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Report Type */}
                  <div className="space-y-2">
                    <Label htmlFor="type">
                      <TranslatedText
                        en="Report Type"
                        hi="रिपोर्ट प्रकार"
                        pa="ਰਿਪੋਰਟ ਕਿਸਮ"
                      />
                    </Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="incident">
                          <TranslatedText en="Safety Incident" hi="सुरक्षा घटना" pa="ਸੁਰੱਖਿਆ ਘਟਨਾ" />
                        </SelectItem>
                        <SelectItem value="hazard">
                          <TranslatedText en="Hazard" hi="खतरा" pa="ਖ਼ਤਰਾ" />
                        </SelectItem>
                        <SelectItem value="near-miss">
                          <TranslatedText en="Near Miss" hi="निकट चूक" pa="ਨੇੜੇ ਚੁਕ" />
                        </SelectItem>
                        <SelectItem value="concern">
                          <TranslatedText en="General Concern" hi="सामान्य चिंता" pa="ਸਾਮਾਨ્ય ਚਿੰਤਾ" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <Label htmlFor="priority">
                      <TranslatedText
                        en="Priority Level"
                        hi="प्राथमिकता स्तर"
                        pa="ਪ੍ਰਾਥਮਿਕਤਾ ਪੱਧਰ"
                      />
                    </Label>
                    <Select value={priority} onValueChange={setPriority}>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">
                          <TranslatedText en="Low" hi="कम" pa="ਘੱਟ" />
                        </SelectItem>
                        <SelectItem value="medium">
                          <TranslatedText en="Medium" hi="मध्यम" pa="ਮੱਧਮ" />
                        </SelectItem>
                        <SelectItem value="high">
                          <TranslatedText en="High" hi="उच्च" pa="ਉੱਚ" />
                        </SelectItem>
                        <SelectItem value="urgent">
                          <TranslatedText en="Urgent" hi="जरूरी" pa="ਜ਼ਰੂਰੀ" />
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      <TranslatedText
                        en="Report Title"
                        hi="रिपोर्ट शीर्षक"
                        pa="ਰਿਪੋਰਟ ਸਿਰਲੇਖ"
                      />{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Enter a brief title for the incident"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">
                      <TranslatedText
                        en="Location"
                        hi="स्थान"
                        pa="ਸਥਾਨ"
                      />{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="location"
                        placeholder="Enter the location where the incident occurred"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      <TranslatedText
                        en="Description"
                        hi="विवरण"
                        pa="ਵੇਰਵਾ"
                      />{" "}
                      <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of the incident, including what happened, when it occurred, and any relevant details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      <TranslatedText
                        en="Please include as much detail as possible to help our team respond effectively."
                        hi="कृपया हमारी टीम को प्रभावी ढंग से प्रतिक्रिया देने में मदद करने के लिए यथासंभव विवरण शामिल करें।"
                        pa="ਕਿਰਪਾ ਕਰਕੇ ਸਾਡੀ ਟੀਮ ਨੂੰ ਪ੍ਰਭਾਵਸ਼ੀਲ ਢੰਗ ਨਾਲ ਜਵਾਬ ਦੇਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਲਈ ਜਿੰਨਾ ਸੰਭਵ ਹੋ ਸਕੇ ਵੇਰਵੇ ਸ਼ਾਮਲ ਕਰੋ।"
                      />
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 gap-2 rounded-2xl"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <TranslatedText
                            en="Submitting..."
                            hi="जमा किया जा रहा है..."
                            pa="ਜਮ੍ਹਾ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ..."
                          />
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <TranslatedText
                            en="Submit Report"
                            hi="रिपोर्ट जमा करें"
                            pa="ਰਿਪੋਰਟ ਜਮ੍ਹਾ ਕਰੋ"
                          />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="glass-panel border-white/60 border-dashed">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold text-sm">
                    <TranslatedText
                      en="Important Information"
                      hi="महत्वपूर्ण जानकारी"
                      pa="ਮਹੱਤਵਪੂਰਨ ਜਾਣਕਾਰੀ"
                    />
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    <TranslatedText
                      en="All reports are reviewed by our safety team. For emergencies, please contact emergency services immediately."
                      hi="सभी रिपोर्ट हमारी सुरक्षा टीम द्वारा समीक्षा की जाती हैं। आपात स्थितियों के लिए, कृपया तुरंत आपातकालीन सेवाओं से संपर्क करें।"
                      pa="ਸਾਰੀਆਂ ਰਿਪੋਰਟਾਂ ਸਾਡੀ ਸੁਰੱਖਿਆ ਟੀਮ ਦੁਆਰਾ ਸਮੀਖਿਆ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ। ਐਮਰਜੈਂਸੀਆਂ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।"
                    />
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
