-- =====================================================================
-- إنشاء الجداول الأربعة + إدخال المحتوى الافتراضي
-- شغّل هذا الملف كاملاً في Supabase SQL Editor
-- =====================================================================

-- ── 1. محتوى التذييل (footer_content) ──────────────────────────────

create table if not exists footer_content (
  id text primary key,
  tagline text,
  heading text,
  paragraph text,
  closing text,
  tagline_en text,
  heading_en text,
  paragraph_en text,
  closing_en text,
  updated_at timestamptz default now()
);
alter table footer_content enable row level security;
drop policy if exists "public read footer" on footer_content;
drop policy if exists "anon write footer" on footer_content;
create policy "public read footer" on footer_content for select using (true);
create policy "anon write footer" on footer_content for all using (true) with check (true);

insert into footer_content (id, tagline, heading, paragraph, closing, tagline_en, heading_en, paragraph_en, closing_en)
values (
  'main',
  'ابدأ برؤية أوضح لاحتياجك التشغيلي',
  'القيمة التي يحصل عليها العميل',
  'سواء كان احتياجكم مرتبطًا بإمدادات الطاقة والمياه، أو بالتنسيق الميداني والمتابعة التشغيلية، أو ببناء نظام موحد للمراقبة والقياس، يعمل فريق Petrohub على فهم طبيعة عملياتكم وتقديم نطاق يناسب مواقعكم وأولوياتكم ومتطلباتكم.',
  'Petrohub — من الاحتياج إلى التنفيذ، ومن التنفيذ إلى رؤية يمكن الاعتماد عليها.',
  'Start with a clearer view of your operational need',
  'The Value the Client Gets',
  'Whether your need relates to energy and water supply, field coordination and operational follow-up, or building a unified monitoring and measurement system, the Petrohub team works to understand your operations and offer a scope that fits your sites, priorities and requirements.',
  'Petrohub — from need to execution, and from execution to a vision you can rely on.'
)
on conflict (id) do update set
  tagline = excluded.tagline,
  heading = excluded.heading,
  paragraph = excluded.paragraph,
  closing = excluded.closing,
  tagline_en = excluded.tagline_en,
  heading_en = excluded.heading_en,
  paragraph_en = excluded.paragraph_en,
  closing_en = excluded.closing_en,
  updated_at = now();


-- ── 2. بطاقة التحديات (challenges_content) ─────────────────────────

create table if not exists challenges_content (
  id text primary key,
  badge text,
  headline text,
  subheading text,
  paragraph text,
  badge_en text,
  headline_en text,
  subheading_en text,
  paragraph_en text,
  items jsonb default '[]',
  updated_at timestamptz default now()
);
alter table challenges_content enable row level security;
drop policy if exists "public read challenges" on challenges_content;
drop policy if exists "anon write challenges" on challenges_content;
create policy "public read challenges" on challenges_content for select using (true);
create policy "anon write challenges" on challenges_content for all using (true) with check (true);

insert into challenges_content (id, badge, headline, subheading, paragraph, badge_en, headline_en, subheading_en, paragraph_en, items)
values (
  'main',
  'التحديات التي تواجه المنشآت',
  'التحدي ليس في توافر المنتج وحده',
  'إدارة الطاقة تحتاج إلى رؤية قبل التسليم وأثناءه وبعده',
  'تتعامل المنشآت اليوم مع سلسلة مترابطة من الجهات والمواقع ووسائل النقل والمستندات والقراءات. وكلما اتسعت هذه السلسلة، ازدادت الحاجة إلى مسؤوليات واضحة، وبيانات قابلة للتحقق، وتحديثات تصل في الوقت المناسب.',
  'Challenges Facing Facilities',
  'The challenge isn''t product availability alone',
  'Energy management needs visibility before, during and after delivery',
  'Facilities today deal with an interconnected chain of parties, sites, transport methods, documents and readings. As this chain grows, so does the need for clear responsibilities, verifiable data, and updates that arrive at the right time.',
  '[
    {"id":"1","titleAr":"مطابقة الكميات","descAr":"الفروقات بين المطلوب والمحمّل والمستلم تستدعي قياسًا أوضح وسجلًا يمكن الرجوع إليه.","titleEn":"Quantity reconciliation","descEn":"Gaps between requested, loaded and received amounts call for clearer measurement and a traceable record."},
    {"id":"2","titleAr":"استقرار الإمداد","descAr":"أي تأخر أو انقطاع قد ينعكس مباشرة على الإنتاج والخدمة والالتزامات التشغيلية.","titleEn":"Supply stability","descEn":"Any delay or interruption can directly affect production, service, and operational commitments."},
    {"id":"3","titleAr":"تشتت المتابعة","descAr":"تعدد الموردين ووسائل التواصل والمستندات يستهلك الوقت ويزيد احتمالات الخطأ.","titleEn":"Scattered follow-up","descEn":"Multiple suppliers, communication channels and documents consume time and raise the chance of error."},
    {"id":"4","titleAr":"سلامة المنتج","descAr":"تحتاج المنشآت إلى ضمان مطابقة المواد للمواصفات والحد من مخاطر الخلط أو التغيير في خصائصها.","titleEn":"Product integrity","descEn":"Facilities need assurance that materials meet specification, with the risk of mixing or altered properties minimized."},
    {"id":"5","titleAr":"تعدد المواقع والأطراف","descAr":"ارتفاع عدد نقاط التسليم والجهات المشاركة يتطلب تنسيقًا محكمًا ومسؤوليات محددة.","titleEn":"Multiple sites & parties","descEn":"A rising number of delivery points and participating parties requires tight coordination and clear ownership."},
    {"id":"6","titleAr":"تأخر المعلومة","descAr":"غياب القراءات اللحظية يجعل التخطيط وإعادة الطلب أقل دقة ويؤخّر الاستجابة.","titleEn":"Delayed information","descEn":"Without real-time readings, planning and reordering become less accurate and response times slow down."}
  ]'::jsonb
)
on conflict (id) do update set
  badge = excluded.badge,
  headline = excluded.headline,
  subheading = excluded.subheading,
  paragraph = excluded.paragraph,
  badge_en = excluded.badge_en,
  headline_en = excluded.headline_en,
  subheading_en = excluded.subheading_en,
  paragraph_en = excluded.paragraph_en,
  items = excluded.items,
  updated_at = now();


-- ── 3. النموذج التشغيلي (operating_model) ──────────────────────────

create table if not exists operating_model (
  id text primary key,
  badge text,
  tagline text,
  heading text,
  paragraph text,
  cycle_label text,
  badge_en text,
  tagline_en text,
  heading_en text,
  paragraph_en text,
  cycle_label_en text,
  steps jsonb default '[]',
  updated_at timestamptz default now()
);
alter table operating_model enable row level security;
drop policy if exists "public read operating_model" on operating_model;
drop policy if exists "anon write operating_model" on operating_model;
create policy "public read operating_model" on operating_model for select using (true);
create policy "anon write operating_model" on operating_model for all using (true) with check (true);

insert into operating_model (id, badge, tagline, heading, paragraph, cycle_label, badge_en, tagline_en, heading_en, paragraph_en, cycle_label_en, steps)
values (
  'main',
  'نموذج Petrohub التشغيلي',
  'من الاحتياج إلى التنفيذ، ومن التنفيذ إلى معلومة قابلة للاستخدام',
  'مسار واحد يربط الإمداد والمتابعة والمراقبة',
  'صممنا طريقة العمل بحيث يحصل العميل على تجربة مترابطة، لا مجموعة خدمات منفصلة. يبدأ المسار بفهم الاحتياج، ثم تنسيق المصدر والنقل والتوقيت، ومتابعة الطلب ميدانيًا حتى التسليم وتوثيقه، والاستفادة من البيانات في التخطيط وتحسين الأداء.',
  'دورة العمل',
  'Petrohub Operational Framework',
  'From necessity to execution, and from execution to actionable information',
  'A singular pathway connecting supply, tracking, and monitoring',
  'We have structured our workflow to ensure that the client enjoys a cohesive experience rather than a disjointed array of services. The process commences with a thorough understanding of the client''s needs and site specifications, followed by the coordination of sourcing, transport and timing, on-site tracking of the order through delivery and documentation, and the use of that data to plan and improve performance.',
  'The Work Cycle',
  '[
    {"id":"1","number":"01","titleAr":"فهم الاحتياج","descAr":"تحديد المادة والكمية والموقع والتوقيت والمتطلبات الفنية والتشغيلية.","titleEn":"Understanding the need","descEn":"Defining the material, quantity, site, timing and technical/operational requirements."},
    {"id":"2","number":"02","titleAr":"التحقق والتخطيط","descAr":"مراجعة البيانات، وتنسيق المصدر والمسار وآلية التنفيذ.","titleEn":"Verification & planning","descEn":"Reviewing the data and coordinating the source, route and execution method."},
    {"id":"3","number":"03","titleAr":"الجدولة والتأكيد","descAr":"إبلاغ العميل باستلام الطلب واعتماده والموعد المتوقع لبدء التنفيذ.","titleEn":"Scheduling & confirmation","descEn":"Notifying the client the request is received and approved, with an expected start time."},
    {"id":"4","number":"04","titleAr":"التنفيذ والمتابعة","descAr":"متابعة التحرك والوصول والتسليم، ومعالجة الملاحظات فور ظهورها.","titleEn":"Execution & follow-up","descEn":"Tracking movement, arrival and delivery, and handling feedback as soon as it appears."},
    {"id":"5","number":"05","titleAr":"التوثيق والإغلاق","descAr":"تأكيد الاستلام وتوثيق الكميات والقراءات والمستندات ذات الصلة.","titleEn":"Documentation & closeout","descEn":"Confirming receipt and documenting quantities, readings and related documents."},
    {"id":"6","number":"06","titleAr":"القياس والتحسين","descAr":"الاستفادة من البيانات في إعادة الطلب، وضبط الاستهلاك، ورفع كفاءة التشغيل.","titleEn":"Measurement & improvement","descEn":"Using the data for reordering, adjusting consumption, and raising operational efficiency."}
  ]'::jsonb
)
on conflict (id) do update set
  badge = excluded.badge,
  tagline = excluded.tagline,
  heading = excluded.heading,
  paragraph = excluded.paragraph,
  cycle_label = excluded.cycle_label,
  badge_en = excluded.badge_en,
  tagline_en = excluded.tagline_en,
  heading_en = excluded.heading_en,
  paragraph_en = excluded.paragraph_en,
  cycle_label_en = excluded.cycle_label_en,
  steps = excluded.steps,
  updated_at = now();


-- ── 4. القطاعات المخدومة (sectors_content) ─────────────────────────

create table if not exists sectors_content (
  id text primary key,
  badge text,
  heading text,
  paragraph text,
  teams_label text,
  teams_text text,
  coverage_label text,
  coverage_text text,
  commit_label text,
  sectors_ar jsonb default '[]',
  sectors_en jsonb default '[]',
  badge_en text,
  heading_en text,
  paragraph_en text,
  teams_label_en text,
  teams_text_en text,
  coverage_label_en text,
  coverage_text_en text,
  commit_label_en text,
  commitments jsonb default '[]',
  updated_at timestamptz default now()
);
alter table sectors_content enable row level security;
drop policy if exists "public read sectors" on sectors_content;
drop policy if exists "anon write sectors" on sectors_content;
create policy "public read sectors" on sectors_content for select using (true);
create policy "anon write sectors" on sectors_content for all using (true) with check (true);

insert into sectors_content (
  id, badge, heading, paragraph,
  teams_label, teams_text, coverage_label, coverage_text, commit_label,
  sectors_ar, sectors_en,
  badge_en, heading_en, paragraph_en,
  teams_label_en, teams_text_en, coverage_label_en, coverage_text_en, commit_label_en,
  commitments
)
values (
  'main',
  'القطاعات التي نخدمها',
  'خبرة قابلة للتكيف مع طبيعة كل نشاط وموقع',
  'نخدم منشآت ومشروعات ذات متطلبات تشغيلية متنوعة. تتكيف طريقة عمل Petrohub مع حجم المنشأة، وعدد المواقع، وحساسية التشغيل، ومتطلبات كل مشروع.',
  'فرق مؤهلة',
  'فرق يتم استقطابها وتجهيزها بما يتناسب مع احتياجات القطاع والموقع ونطاق العمل.',
  'نطاق التغطية',
  'جميع مدن المملكة العربية السعودية، مع إمكانية تنفيذ الأعمال خارج المملكة وفق طبيعة المشروع ومتطلباته.',
  'التزامنا',
  '["الإنشاءات والمقاولات","القطاع الصناعي","التعدين","النفط والغاز","البنية التحتية والمشاريع الكبرى","الجهات الحكومية","الرعاية الصحية","الضيافة والسياحة","التجارة والخدمات"]'::jsonb,
  '["Construction and Contracting","Industrial sector","Mining","Petroleum and natural gas","Infrastructure and significant initiatives","Governmental organizations","Healthcare","Hospitality and Tourism","Commerce and Services"]'::jsonb,
  'Sectors We Serve',
  'Experience tailored to the specific nature of each activity and location',
  'We cater to facilities and projects with varied operational needs. Petrohub''s approach is tailored to the facility''s size, the number of locations, the sensitivity of the operation, and the specific requirements of each project.',
  'Qualified teams',
  'Teams are assembled and outfitted based on the requirements of the sector, geographical area, and scope of work.',
  'Coverage area',
  'All cities within the Kingdom of Saudi Arabia, with the potential to conduct work outside the Kingdom based on the project''s nature and requirements.',
  'Our dedication',
  '[
    {"id":"1","icon":"CheckCircle2","titleAr":"الجودة","descAr":"إجراءات واضحة وتنفيذ يراعي المتطلبات الفنية.","titleEn":"Quality","descEn":"Clear procedures and implementations that consider technical requirements."},
    {"id":"2","icon":"ShieldCheck","titleAr":"السلامة والامتثال","descAr":"ممارسات تراعي الاشتراطات وتحمي الأفراد والمواقع.","titleEn":"Safety & Compliance","descEn":"Practices that adhere to requirements and safeguard individuals and locations."},
    {"id":"3","icon":"TrendingUp","titleAr":"التحسين المستمر","descAr":"مراجعة الأداء وتطوير الإجراءات والمنتجات التقنية.","titleEn":"Ongoing enhancement","descEn":"Evaluating performance and formulating technical procedures and products."}
  ]'::jsonb
)
on conflict (id) do update set
  badge = excluded.badge,
  heading = excluded.heading,
  paragraph = excluded.paragraph,
  teams_label = excluded.teams_label,
  teams_text = excluded.teams_text,
  coverage_label = excluded.coverage_label,
  coverage_text = excluded.coverage_text,
  commit_label = excluded.commit_label,
  sectors_ar = excluded.sectors_ar,
  sectors_en = excluded.sectors_en,
  badge_en = excluded.badge_en,
  heading_en = excluded.heading_en,
  paragraph_en = excluded.paragraph_en,
  teams_label_en = excluded.teams_label_en,
  teams_text_en = excluded.teams_text_en,
  coverage_label_en = excluded.coverage_label_en,
  coverage_text_en = excluded.coverage_text_en,
  commit_label_en = excluded.commit_label_en,
  commitments = excluded.commitments,
  updated_at = now();
