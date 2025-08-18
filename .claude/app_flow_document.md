# App Flow Document for Wild West Construction Lead-Gen Website

## Onboarding and Sign-In/Sign-Up

When a brand-new visitor arrives at the Wild West Construction site, there is no account creation or sign-in required to explore services or request a quote. The site is publicly accessible from desktop or mobile through organic search, marketing ads, or direct link. Since the entire experience is centered on capturing leads through forms, chat, and booking, visitors move seamlessly into conversion paths without needing to register or log in. There is no sign-up, no password management, and no user dashboard for customers. The only authentication in play happens behind the scenes for admin and developer access to the CMS, GitHub, and custom CRM, but these are not part of the public user flow.

## Main Dashboard or Home Page

After arriving on the homepage, visitors immediately see a clean header bar with the company logo on the left, the phone number prominently displayed, a “Chat on WhatsApp” button, and a “Book Now” call-to-action. On mobile devices, a sticky footer provides one-tap buttons for calling, chatting, booking, or requesting a quote. The first screen loads quickly to meet Core Web Vitals targets, ensuring the hero section appears within 2.5 seconds on mobile. As the visitor scrolls down, they encounter three service category tiles for Flooring, Demolition, and Junk Removal. Each tile links to its respective category hub page. If the visitor prefers a local page first, they can click a city selector drop-down in the form or navigation menu to jump directly to the hub for their city.

## Detailed Feature Flows and Page Transitions

### Category Hub Pages

When a visitor clicks on Flooring, Demolition, or Junk Removal in the main navigation or service tile, they arrive at a category hub page such as `/flooring/`. This page displays a summary of the service, proof points like project photos or testimonials, and links to city-specific service pages. Every link uses a descriptive anchor text and absolute URL so that users and search engines know what to expect when they click. Breadcrumb navigation at the top keeps users oriented.

### City Hub Pages

If the visitor selects a city, for example `/slc-ut/`, they see a unique H1 and introductory paragraph about Wild West Construction’s presence in Salt Lake County. The page includes a short local notes section, a recent jobs showcase with photos and blurbs, and a services list that links to each service page in that city. Nearby cities are suggested at the bottom. Above the fold, a lead form invites visitors to submit project details. The breadcrumb trail and JSON-LD markup reflect the site hierarchy, reinforcing that this is a city hub.

### Service Pages

Clicking a service link on either a category hub or city hub navigates to a dedicated page such as `/slc-ut/flooring-installation/`. The page title, meta description, and H1 all come from the master service matrix CSV. Visitors read 300 to 700 words of helpful copy tailored to their city, view related services, and see nearby city suggestions. A small FAQ section answers common questions. The unified lead form remains above the fold, and a name-address-phone block ensures NAP consistency. Service JSON-LD and BreadcrumbList JSON-LD are embedded in the head to match the visible content. Internal link blocks render server-side to connect visitors to deeper pages.

### Unified Lead Form

Above the fold on city and service pages, the lead form asks for name, mobile, email, city selector, address, service type, preferred date/time, details, and optional photo or video uploads. Users check boxes to consent to SMS and WhatsApp messages. Cloudflare Turnstile or reCAPTCHA v3 verifies submissions behind the scenes. If a field is invalid or missing, an ARIA live region announces the error and highlights the field. On successful submission, a `form_start` event fires when the user focuses the first field, and `form_submit_success` fires on completion. The lead is created in the custom CRM with UTM data and page path, and notifications go out via Slack and email using Resend.

### WhatsApp Chat Option

At any point, visitors can tap the persistent “Chat on WhatsApp” button in the header or floating footer. A wa.me deep link opens a new chat window with a prefilled greeting to +1-801-691-4065. The user must have explicitly opted in by checking the consent box in the form or confirming when they click the chat button. The chat session logs every message with timestamps and source URL. If the visitor sends a message, an automated acknowledgment responds and a human agent replies within a five-minute SLA for at least 25 percent of leads.

### Calendar Booking Option

Visitors who want to schedule a meeting select “Book Now” in the header or tap the floating calendar widget. They choose from event types—Estimate, Measurement, Site Visit, or Junk Pickup Window—and select a 30-, 60-, or 120-minute slot that includes travel buffers. The inline scheduler loads only after user interaction. Once they confirm, a webhook updates the CRM, and an ICS file is emailed or texted via Resend. Slack receives a notification, and GA4 records `booking_open` and `booking_success` events with city, service, and source properties.

### AI Chatbot Assistance

A floating chatbot icon lets visitors open an AI-powered assistant anytime. The bot, driven by OpenAI GPT-4o mini and loaded with the company’s service matrix and compliance rules, answers FAQs, confirms service areas by city, and captures lead details with explicit consent. If the visitor asks to book an appointment, the bot calls the same scheduling API that triggers webhooks and analytics events. Urgent requests or anything involving binding price quotes escalates to a human agent. All transcript data is saved with source URL and timestamp.

### Thank-You and Post-Submission

After completing any conversion path—lead form, WhatsApp chat, booking, or chatbot—the visitor lands on a thank-you page. This page thanks them for their interest, confirms the next steps, and reminds them how to get in touch. They also receive an email or SMS confirmation with details and an option to opt out. Behind the scenes, analytics track final conversions and the CRM merges duplicate leads by contact hash if they arrive within 30 minutes.

## Settings and Account Management

Since visitors do not create accounts with Wild West Construction, there is no user-accessible settings or profile page. Site-level controls include cookie consent banners for tracking and spam protection, but no personal preference or billing settings are offered. All administrative settings—such as updating the CSV files for city hubs, managing recent jobs content, or configuring Slack and webhook endpoints—are handled by the development and marketing teams through the Git repository, Vercel environment variables, and the custom CRM backend.

## Error States and Alternate Paths

If a visitor loses connectivity while browsing, the browser shows a standard offline message and the visitor can retry loading the page. During form submission, if Cloudflare Turnstile or reCAPTCHA fails, an inline message in the form area explains that verification failed and invites the user to try again. If file uploads exceed size limits or unsupported formats, the form displays a clear error in an ARIA live region and prompts the user to choose a valid file. If the scheduler service is temporarily unavailable, clicking “Book Now” shows a fallback message with a link to the lead form. If the chatbot API returns an error, the widget displays a brief apology and offers to open WhatsApp chat or the lead form instead.

## Conclusion and Overall App Journey

From the moment a visitor arrives, they experience a fast-loading, easy-to-understand site that guides them through choosing a service, exploring local offerings, and converting through the method they prefer. Whether they fill out the unified lead form, start a WhatsApp chat, book an appointment directly, or interact with the AI chatbot, every step is designed to minimize friction and ensure data is captured with consent and the right context. Behind the scenes, Slack and email alerts, CRM updates, and analytics events keep the Wild West Construction team informed so they can follow up quickly. This cohesive flow from discovery to submission is built to hit KPIs for lead volume, booking conversion rate, form abandonment, response times, and Core Web Vitals performance, delivering a reliable and high-quality experience for customers and the internal team alike.
