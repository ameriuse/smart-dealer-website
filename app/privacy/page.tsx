import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Ameriuse',
  description:
    'Ameriuse privacy policy. Learn how we collect, use, and protect your personal information when you use our dealership platform.',
  robots: 'index, follow',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 min-h-0 min-w-0">
            <span className="text-2xl font-extrabold tracking-tight text-gray-900" style={{ fontFamily: '"DM Sans", sans-serif' }}>
              ameriuse
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/terms" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Terms
            </Link>
            <a href="mailto:support@ameriuse.com" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 min-h-0 min-w-0">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-500">Effective Date: March 26, 2026 &middot; Last Updated: March 26, 2026</p>

        <div className="prose prose-gray mt-10 max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">

          <p>
            Ameriuse (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the Ameriuse dealership management platform, including the website at ameriuse.com, associated mobile applications, and backend services (collectively, the &quot;Platform&quot;). This Privacy Policy explains how we collect, use, disclose, and protect personal information when you use our Platform — whether you are a dealership operator, a dealership employee, or a consumer interacting with a dealership powered by Ameriuse.
          </p>
          <p>
            By using the Platform, you agree to the practices described in this policy. If you do not agree, please do not use the Platform.
          </p>

          <h2>1. Information We Collect</h2>

          <h3>1.1 Information You Provide Directly</h3>
          <ul>
            <li><strong>Account registration data:</strong> name, email address, phone number, dealership name, business address, and password.</li>
            <li><strong>Customer inquiry data:</strong> when a consumer submits a lead, contact form, financing application, or appointment request through a dealer&apos;s website, we collect the consumer&apos;s first name, last name, email address, phone number, vehicle of interest, preferred contact method, and any notes or messages the consumer provides.</li>
            <li><strong>Vehicle data:</strong> VIN, year, make, model, trim, mileage, condition, photos, videos, pricing, inspection scores, and reconditioning records entered by dealership users.</li>
            <li><strong>Communication content:</strong> SMS messages, email messages, and in-platform messaging content exchanged between dealership users and their customers.</li>
            <li><strong>Payment and billing data:</strong> if you subscribe to a paid plan, we collect billing details processed securely by our payment processor (Stripe). We do not store full credit card numbers on our servers.</li>
          </ul>

          <h3>1.2 Information Collected Automatically</h3>
          <ul>
            <li><strong>Device and browser data:</strong> device type, operating system, browser type, screen resolution, and app version.</li>
            <li><strong>Usage data:</strong> pages visited, features used, actions taken, timestamps, and session duration.</li>
            <li><strong>Network data:</strong> IP address, approximate geographic location (city/region level), and referring URL.</li>
            <li><strong>GPS and location data:</strong> if the dealership enables vehicle tracking features, we collect real-time GPS coordinates, speed, heading, and geofence events for tracked vehicles. Dealership users may also share device location for lot management features.</li>
          </ul>

          <h3>1.3 Information from Third Parties</h3>
          <ul>
            <li><strong>VIN decoding services:</strong> vehicle specification data from the NHTSA vPIC database and third-party VIN decoders.</li>
            <li><strong>SMS delivery status:</strong> message delivery and read receipt data from our SMS provider (Twilio).</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>Platform operations:</strong> to provide, maintain, and improve the Ameriuse platform, including CRM features, inventory management, website hosting, and analytics dashboards.</li>
            <li><strong>Customer communication:</strong> to facilitate SMS and email communication between dealerships and their customers, including appointment reminders, vehicle status updates, follow-up messages, and inquiry responses.</li>
            <li><strong>Dealership workflow:</strong> to support inspection management, reconditioning task tracking, vendor coordination, and deal processing.</li>
            <li><strong>Account management:</strong> to manage your account, authenticate your identity, enforce access controls, and provide customer support.</li>
            <li><strong>Analytics and reporting:</strong> to generate dealership performance dashboards, inventory analytics, lead funnel metrics, and operational reports.</li>
            <li><strong>Security and compliance:</strong> to detect and prevent fraud, enforce our terms of service, comply with legal obligations, and protect the rights and safety of our users.</li>
            <li><strong>Platform improvement:</strong> to analyze usage patterns, diagnose technical issues, and develop new features.</li>
          </ul>

          <h2>3. SMS and Messaging Disclosure</h2>
          <p>
            Ameriuse provides SMS and email messaging tools that dealerships use to communicate with their customers. These messages are transactional and relationship-based — they are sent in response to customer inquiries, appointment requests, vehicle status changes, and other customer-initiated interactions.
          </p>
          <p>
            <strong>SMS consent is not shared with third parties or affiliates for marketing purposes.</strong>
          </p>
          <p>
            When a consumer submits an inquiry or appointment request through a dealer&apos;s website and provides their phone number, the consumer consents to receive SMS messages from that dealership related to their inquiry. Consumers can opt out of SMS messages at any time by replying <strong>STOP</strong> to any message. For help, consumers can reply <strong>HELP</strong> or contact us at <a href="mailto:support@ameriuse.com">support@ameriuse.com</a>.
          </p>
          <p>
            Message frequency varies based on customer interactions and dealership communication practices. Message and data rates may apply.
          </p>

          <h2>4. How We Share Information</h2>
          <p>We do not sell personal information. We share information only in the following circumstances:</p>
          <ul>
            <li><strong>With the dealership:</strong> consumer inquiry data (name, email, phone, vehicle interest) is shared with the specific dealership the consumer contacted. Each dealership is responsible for its own use of customer data in accordance with applicable laws.</li>
            <li><strong>Service providers:</strong> we use third-party services to operate the Platform. These providers process data on our behalf under contractual obligations to protect your information:
              <ul>
                <li><strong>Twilio</strong> — SMS message delivery and phone number verification</li>
                <li><strong>Resend</strong> — transactional email delivery</li>
                <li><strong>Cloudinary</strong> — vehicle photo and media storage and delivery</li>
                <li><strong>OpenAI</strong> — AI-powered features such as chat assistance, inspection summaries, and message drafting</li>
                <li><strong>Google Cloud</strong> — Maps, Places, Vision OCR, and Time Zone APIs</li>
                <li><strong>Stripe</strong> — payment processing and subscription billing</li>
                <li><strong>Vercel</strong> — application hosting and edge delivery</li>
                <li><strong>Neon</strong> — managed PostgreSQL database</li>
                <li><strong>Upstash</strong> — serverless Redis for rate limiting and caching</li>
                <li><strong>Pusher</strong> — real-time event delivery</li>
                <li><strong>Firebase</strong> — push notifications and web analytics</li>
              </ul>
            </li>
            <li><strong>Legal compliance:</strong> we may disclose information when required by law, court order, or government request, or when necessary to protect the rights, safety, or property of Ameriuse, our users, or others.</li>
            <li><strong>Business transfers:</strong> in the event of a merger, acquisition, or sale of assets, user data may be transferred as part of the transaction. We will notify affected users of any change in ownership or use of personal information.</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your data, including:
          </p>
          <ul>
            <li>TLS/HTTPS encryption for all data in transit</li>
            <li>AES-256 encryption for sensitive database fields</li>
            <li>Hashed and salted passwords (bcrypt)</li>
            <li>Role-based access control (RBAC) to limit data access by user role</li>
            <li>JWT-based authentication with configurable token expiration</li>
            <li>Webhook signature verification for inbound third-party requests</li>
            <li>Regular security reviews and infrastructure monitoring</li>
          </ul>
          <p>
            No system is 100% secure. While we take reasonable precautions, we cannot guarantee absolute security of your data.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain personal information for as long as your account is active or as needed to provide services. Dealership account data, vehicle records, and communication history are retained for the duration of the dealership&apos;s subscription. We use soft deletion — records are marked as deleted rather than permanently removed — to allow recovery and maintain audit trails.
          </p>
          <p>
            When a dealership cancels its subscription, we retain data for a reasonable period (up to 90 days) to allow for reactivation, after which data is permanently deleted. Consumer inquiry data is retained according to each dealership&apos;s configured retention policy, subject to a maximum retention period.
          </p>
          <p>
            SMS message logs are retained for compliance and dispute resolution purposes. Automated data retention jobs regularly clean up expired records.
          </p>

          <h2>7. Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the following rights:</p>
          <ul>
            <li><strong>Access:</strong> request a copy of the personal information we hold about you.</li>
            <li><strong>Correction:</strong> request correction of inaccurate or incomplete information.</li>
            <li><strong>Deletion:</strong> request deletion of your personal information, subject to legal retention requirements.</li>
            <li><strong>Opt-out of SMS:</strong> reply STOP to any SMS message to immediately stop receiving messages from that dealership.</li>
            <li><strong>Data portability:</strong> request your data in a structured, machine-readable format.</li>
          </ul>
          <p>
            To exercise any of these rights, contact us at <a href="mailto:support@ameriuse.com">support@ameriuse.com</a>. We will respond within 30 days.
          </p>

          <h2>8. Children&apos;s Privacy</h2>
          <p>
            The Platform is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If you believe a child has provided personal information to us, please contact us immediately at <a href="mailto:support@ameriuse.com">support@ameriuse.com</a> and we will delete the information.
          </p>

          <h2>9. Cookies and Tracking</h2>
          <p>
            We use essential cookies and local storage for authentication, session management, and user preferences (such as dark mode settings). We may use analytics tools (such as Firebase Analytics) to understand usage patterns and improve the Platform. We do not use advertising cookies or cross-site tracking.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make material changes, we will update the &quot;Last Updated&quot; date at the top of this page and, where appropriate, notify you via email or in-platform notification. Continued use of the Platform after changes constitutes acceptance of the updated policy.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <ul>
            <li><strong>Email:</strong> <a href="mailto:support@ameriuse.com">support@ameriuse.com</a></li>
            <li><strong>Company:</strong> Ameriuse</li>
            <li><strong>Website:</strong> <a href="https://ameriuse.com">https://ameriuse.com</a></li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Ameriuse. All rights reserved.</p>
            <nav className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-500 transition-colors hover:text-gray-900 min-h-0 min-w-0">Home</Link>
              <Link href="/terms" className="text-sm text-gray-500 transition-colors hover:text-gray-900 min-h-0 min-w-0">Terms & Conditions</Link>
              <a href="mailto:support@ameriuse.com" className="text-sm text-gray-500 transition-colors hover:text-gray-900 min-h-0 min-w-0">Support</a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
