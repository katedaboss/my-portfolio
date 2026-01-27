import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ucherikecatherine@gmail.com",
    href: "mailto:ucherikecatherine@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 (704) 588-1719",
    href: "tel:+2347045881719",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Lagos, Nigeria",
    href: "#",
  },
];

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "EmailJS configuration is missing. Please check your environment variables.",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error.text || "Failed to send message. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-highlight/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-secondary-foreground text-xs sm:text-sm font-medium tracking-wider uppercase">
            Get In Touch
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 sm:mt-4 mb-4 sm:mb-6 text-secondary-foreground">
            Let's build{" "}
            <span className="font-serif italic font-normal text-white">
              something great.
            </span>
          </h2>

          <p className="text-muted-foreground text-sm sm:text-base px-4 sm:px-0">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can work together.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-5xl mx-auto w-full">
          {/* Contact Form */}
          <div className="glass p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-primary/30 w-full min-w-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5 sm:space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="Your name..."
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 sm:py-3 bg-surface text-white rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-slate-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 sm:py-3 bg-surface text-white rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm sm:text-base"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Your message..."
                    className="w-full px-4 py-2.5 sm:py-3 bg-surface text-white rounded-xl border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none text-sm sm:text-base"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  className="w-full hover:bg-blue-600 text-sm sm:text-base py-2.5 sm:py-3"
                  type="submit"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Sending...</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  )}
                </Button>

                {/* Status Message */}
                {submitStatus.type && (
                  <div
                    className={`flex items-start sm:items-center gap-3 p-3 sm:p-4 rounded-xl text-sm ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500/20 text-green-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-400"
                    }`}
                  >
                    {submitStatus.type === "success" ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
                    )}
                    <p className="text-xs sm:text-sm">{submitStatus.message}</p>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-5 sm:space-y-6 w-full min-w-0">
            <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 w-full min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold mb-5 sm:mb-6 text-white">
                Contact Information
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-surface transition-colors group w-full min-w-0"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>

                    <div className="min-w-0 flex-1 overflow-hidden">
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="font-medium text-sm sm:text-base text-white break-all">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="glass backdrop-blur-sm rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-primary/30 w-full min-w-0">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
                <span className="font-medium text-sm sm:text-base">
                  Currently Available
                </span>
              </div>

              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                I'm currently open to new opportunities and exciting projects.
                Whether you need a full-time developer or a freelance
                consultant, let's talk!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
