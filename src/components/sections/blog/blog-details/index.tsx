"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Typography from "@/components/ui/typography";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import styles from "./style.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type RecentBlog = {
  id: number;
  title: string;
  image: string;
  slug: string;
};

type FaqItem = {
  title: string;
  description: string;
};

type BlogDetailProps = {
  content?: string;
  faq_section?: FaqItem[];
  recent_blogs?: RecentBlog[];
};

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items.length) return null;

  return (
    <div className="mt-8 md:mt-10">
      <Typography size="h4" className="font-bold text-dark mb-4">
        Frequently Asked Questions
      </Typography>
      <div className="border-t border-gray-200">
        {items.map((item, i) => (
          <div key={i} className={styles.faqItem}>
            <button
              className={styles.faqTrigger}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              aria-expanded={openIndex === i}
            >
              <span>{item.title}</span>
              <svg
                className={`${styles.faqIcon} ${openIndex === i ? styles.faqIconOpen : ""}`}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`${styles.faqBody} ${openIndex === i ? styles.faqBodyOpen : ""}`}
            >
              <p className={styles.faqDescription}>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Contact Form ─────────────────────────────────────────────────────────────

const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      <Typography variant="h3" size="h5" className="font-semibold text-dark-400 mb-4">
        Contact us
      </Typography>
      <Input name="fullName" type="text" placeholder="Full name *" value={form.fullName} onChange={handleChange} variant="white" />
      <Input name="company" type="text" placeholder="Company/organization *" value={form.company} onChange={handleChange} variant="white" />
      <Input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} variant="white" />
      <Input name="phone" type="tel" placeholder="Phone number *" value={form.phone} onChange={handleChange} variant="white" />
      <Textarea name="message" placeholder="What you are looking for" value={form.message} onChange={handleChange} variant="white" />
      <Button className="w-full mt-4" variant="default">Submit</Button>
    </div>
  );
};

// ─── BlogDetail ───────────────────────────────────────────────────────────────

const BlogDetail = ({
  content,
  faq_section = [],
  recent_blogs = [],
}: BlogDetailProps = {}) => {
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
            {content && (
              <div
                className={styles.prose}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            <FaqAccordion items={faq_section} />
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <aside className="w-full lg:w-80 xl:w-96 shrink-0">
            {/* Scrollable widgets */}
            <div className="flex flex-col gap-6 mb-6">
              {/* Recent blogs */}
              {recent_blogs.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <Typography variant="h3" size="h6" className="font-semibold text-dark-400">
                      Recent blogs
                    </Typography>
                    <Link href="/blog" className="text-xs text-primary hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="flex flex-col gap-4">
                    {recent_blogs.map(blog => (
                      <Link key={blog.id} href={`/blog/${blog.slug}`} className="flex gap-3 group">
                        <div className="w-16 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                          {blog.image && (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              width={64}
                              height={56}
                              className="w-full h-full object-cover"
                            />
                          )}
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
                <Typography variant="h3" size="h6" className="font-semibold text-dark-400 mb-3">
                  Subscribe to our newsletter
                </Typography>
                <div className="flex gap-2 items-start">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="white"
                    className="flex-1 mb-0!"
                  />
                  <button className="h-12 bg-primary text-white px-3 rounded-md text-sm hover:opacity-90 transition shrink-0">
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Contact form — direct child of aside so sticky works against full page height */}
            <div ref={formWrapRef} className="sticky" style={{ top: stickyTop }}>
              <ContactForm />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
