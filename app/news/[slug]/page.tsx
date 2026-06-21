"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Calendar, Tag, ChevronLeft, ArrowLeft } from "lucide-react";
import { getPosts } from "@/lib/db";
import type { BlogPost } from "@/lib/types";

export default function PostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<BlogPost[]>([]);

  useEffect(() => {
    getPosts().then((all) => {
      const found = all.find((p) => p.slug === slug) ?? null;
      setPost(found);
      if (found) setRelated(all.filter((p) => p.id !== found.id).slice(0, 2));
    });
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-brand-charcoal-light text-lg mb-4">المقال غير موجود</p>
          <Button href="/news">العودة للأخبار</Button>
        </div>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-green-dark to-brand-green-mid pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 dot-bg opacity-20" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <nav className="flex items-center gap-2 mb-8 text-white/50 text-sm" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <ChevronLeft size={14} className="rotate-180" />
            <Link href="/news" className="hover:text-white transition-colors">الأخبار</Link>
            <ChevronLeft size={14} className="rotate-180" />
            <span className="text-white/70 truncate max-w-xs">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-5">
            <Badge variant="gold" className="!bg-brand-gold/20 !text-brand-gold !border-brand-gold/30">
              <Tag size={11} className="ml-1" />
              {post.category}
            </Badge>
            <span className="text-white/50 text-sm flex items-center gap-1">
              <Calendar size={13} />
              {new Date(post.date).toLocaleDateString("ar-SA", { year: "numeric", month: "long", day: "numeric" })}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none"
          >
            {/* Excerpt */}
            <p className="text-brand-charcoal-light text-xl leading-relaxed mb-8 border-r-4 border-brand-green pr-5 font-medium">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="space-y-5 text-brand-charcoal leading-loose">
              {paragraphs.map((para, i) => {
                if (para.startsWith("## ")) {
                  return (
                    <h2 key={i} className="text-2xl font-black text-brand-charcoal mt-8 mb-4">
                      {para.replace("## ", "")}
                    </h2>
                  );
                }
                if (para.startsWith("- ")) {
                  const items = para.split("\n").filter((l) => l.startsWith("- "));
                  return (
                    <ul key={i} className="space-y-2 mr-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-brand-green mt-1.5 flex-shrink-0">●</span>
                          <span>{item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (para.match(/^\d\./)) {
                  const items = para.split("\n").filter((l) => l.match(/^\d\./));
                  return (
                    <ol key={i} className="space-y-2 mr-4">
                      {items.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-brand-green font-bold flex-shrink-0">{j + 1}.</span>
                          <span>{item.replace(/^\d\.\s/, "")}</span>
                        </li>
                      ))}
                    </ol>
                  );
                }
                return <p key={i}>{para}</p>;
              })}
            </div>
          </motion.div>

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/news" className="inline-flex items-center gap-2 text-brand-green font-black hover:gap-3 transition-all duration-200">
              <ArrowLeft size={18} />
              العودة للأخبار
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-black text-brand-charcoal mb-8">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/news/${p.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:border-brand-green/20 hover:shadow-lg transition-all duration-300"
                >
                  <span className="text-xs font-bold text-brand-green bg-brand-green-light px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                  <h3 className="font-black text-brand-charcoal mt-3 mb-2 group-hover:text-brand-green-dark transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-brand-charcoal-light text-sm line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
