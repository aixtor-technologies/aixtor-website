"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import ReCAPTCHA from "react-google-recaptcha";
import Typography from "@/components/ui/typography";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import HttpService from "@/shared/services/http.service";
import Toast from "@/components/shared/toast";
import styles from "@/assets/css/content.module.css";
import SafeHtml from "@/components/ui/safe-html";

// ─── Types ────────────────────────────────────────────────────────────────────

type RecentBlog = {
  id: number;
  title: string;
  image: string;
  slug: string;
};

type BlogDetailProps = {
  content?: string;
  recent_blogs?: RecentBlog[];
};

// ─── Contact Form ─────────────────────────────────────────────────────────────

const ContactForm = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
  const [apiError, setApiError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = recaptchaRef.current?.getValue();
    if (!token) {
      setCaptchaError("Please complete the reCAPTCHA.");
      return;
    }
    setLoading(true);
    setCaptchaError("");
    try {
      await HttpService.nativePost("contact-submission", {
        full_name: form.fullName,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message,
        recaptcha_token: token,
        form_type: "blog-contact-us-enquiry",
      });
      setSubmitted(true);
      setForm({ fullName: "", company: "", email: "", phone: "", message: "" });
      recaptchaRef.current?.reset();
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {submitted && <Toast onDismiss={() => setSubmitted(false)} />}
      {apiError && <Toast type="error" message={apiError} onDismiss={() => setApiError("")} />}
      <form
        onSubmit={handleSubmit}
        className="bg-off-white border border-gray-200  p-5"
      >
        <Typography
          variant="h3"
          size="h5"
          className="font-semibold text-dark-400 mb-4"
        >
          Contact us
        </Typography>
        <Input
          name="fullName"
          type="text"
          placeholder="Full name *"
          value={form.fullName}
          onChange={handleChange}
          variant="white"
          required
        />
        <Input
          name="company"
          type="text"
          placeholder="Company/organization *"
          value={form.company}
          onChange={handleChange}
          variant="white"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email *"
          value={form.email}
          onChange={handleChange}
          variant="white"
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone number *"
          value={form.phone}
          onChange={handleChange}
          variant="white"
          required
        />
        <Textarea
          name="message"
          placeholder="What you are looking for"
          value={form.message}
          onChange={handleChange}
          variant="white"
        />
        <div className="mt-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          />
        </div>
        {captchaError && <p className="text-red-500 text-xs mt-2">{captchaError}</p>}
        <Button className="w-full mt-4" variant="default" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

// ─── BlogDetail ───────────────────────────────────────────────────────────────

const BlogDetail = ({ content, recent_blogs = [] }: BlogDetailProps = {}) => {
  const [email, setEmail] = useState("");
  const formWrapRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(96);

  useEffect(() => {
    const recalc = () => {
      if (!formWrapRef.current) return;
      const formH = formWrapRef.current.offsetHeight;
      const viewH = window.innerHeight;
      const computed = viewH - formH - 24;
      setStickyTop(computed > 96 ? computed : 96);
    };
    recalc();
    window.addEventListener("resize", recalc);
    return () => window.removeEventListener("resize", recalc);
  }, []);

  return (
    <section className="common-section bg-white">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
          {/* ── LEFT: Main content ── */}
          <div className="flex-1 min-w-0">
            {content && <SafeHtml html={content} className={styles.prose} />}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            {/* Scrollable widgets */}
            <div className="flex flex-col gap-6 mb-6">
              {/* Recent blogs */}
              {recent_blogs.length > 0 && (
                <div className="bg-off-white  border border-gray-200 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Typography
                      variant="h3"
                      size="h6"
                      className="font-semibold text-dark-400"
                    >
                      Recent blogs
                    </Typography>
                    <Link
                      href="/blog"
                      className="text-xs text-primary hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4">
                    {recent_blogs.map(blog => (
                      <Link
                        key={blog.id}
                        href={`/blog/${blog.slug}`}
                        className="flex gap-3 group"
                      >
                        <div className="w-16 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={
                              blog.image ||
                              "/images/placeholder/placeholder.jpg"
                            }
                            alt={blog.title || "blog-img"}
                            width={64}
                            height={56}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                        <Typography className="text-xs text-dark-400 leading-relaxed group-hover:text-primary transition-colors line-clamp-3">
                          {blog.title}
                        </Typography>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter */}
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <Typography
                  variant="h3"
                  size="h6"
                  className="font-semibold text-dark-400 mb-3"
                >
                  Subscribe to our newsletter
                </Typography>
                <div className="flex gap-2 items-start">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="default"
                  />
                  <button className="h-12  text-black px-3 rounded-md text-xl hover:opacity-90 transition shrink-0">
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Contact form — direct child of aside so sticky works against full page height */}
            <div
              ref={formWrapRef}
              className="sticky"
              style={{ top: stickyTop }}
            >
              <ContactForm />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
